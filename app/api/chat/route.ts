import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { retrieve } from '@/lib/rag';

// Configure for Vercel serverless functions
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// const MODEL = 'gpt-4o-mini';
const MODEL_FALLBACKS = ['gpt-4o-mini', 'gpt-4o', 'gpt-3.5-turbo'];

// Add CORS headers to response
function addCorsHeaders(response: NextResponse) {
	response.headers.set('Access-Control-Allow-Origin', '*');
	response.headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
	response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
	return response;
}

// Handle CORS preflight requests
export async function OPTIONS() {
	const response = new NextResponse(null, { status: 200 });
	return addCorsHeaders(response);
}

export async function POST(req: Request) {
	try {
		if (!process.env.OPENAI_API_KEY) {
			const errorResponse = NextResponse.json({ error: 'Server missing OPENAI_API_KEY' }, { status: 500 });
			return addCorsHeaders(errorResponse);
		}

		const body = await req.json().catch(() => ({}));
		const messages = Array.isArray(body?.messages) ? body.messages : [];
		const user = messages.length ? messages[messages.length - 1]?.content ?? '' : body?.content ?? '';

		if (typeof user !== 'string' || user.trim().length === 0) {
			const errorResponse = NextResponse.json({ error: 'Invalid request' }, { status: 400 });
			return addCorsHeaders(errorResponse);
		}

		const contexts = await retrieve(user, 3);
		const contextText = contexts.map((c, i) => `Chunk ${i + 1} (${c.source}):\n${c.text}`).join('\n\n');

		const system = [
			'You are a warm, conversational AI assistant for the personal site of Saakshi Munot.',
			'Speak naturally with a friendly, concise tone and use contractions. Avoid sounding robotic or overly formal.',
			'Answer ONLY using the provided context about Saakshi. If something is not covered by the context, say you do not know and suggest asking a related question.',
			'When asked about personality or "what kind of person is Saakshi", synthesize an answer grounded in the context without inventing facts.',
			'In your first reply of a new conversation (no prior assistant messages), begin with ONE friendly sentence introducing yourself as Saakshi\'s AI assistant. State that you will answer as Saakshi would, but you will refer to Saakshi in the third person (she/her). Add a light joke such as: "promise I\'m not trying to steal her identity!". After that sentence, immediately answer the user\'s question.',
			'After your first reply, continue speaking in the third person about Saakshi (she/her) for the rest of the chat, and do not repeat the introduction again.',
		].join(' ');

		// Keep a small conversational window for natural replies
		const MAX_HISTORY = 6;
		const chatHistory = messages
			.filter((m: any) => typeof m?.content === 'string' && (m?.role === 'user' || m?.role === 'assistant'))
			.slice(-MAX_HISTORY)
			.map((m: any) => ({ role: m.role, content: String(m.content) }));

		const hasAssistantBefore = chatHistory.some((m: any) => m.role === 'assistant');
		const introDirective = hasAssistantBefore
			? 'Do not introduce yourself again. Continue to speak in the third person about Saakshi (she/her).'
			: 'This is your first reply in a new chat: start with one brief, friendly sentence such as: "Hi! I\'m Saakshi\'s AI assistant. I\'ll answer as Saakshi would—while referring to her in the third person (promise I\'m not trying to steal her identity!)." Then immediately answer the user\'s question.';

		const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

		let completion;
		let usedModel = '';
		let lastError: any = null;

		for (const model of MODEL_FALLBACKS) {
			try {
				console.log(`Trying ${model}...`);
				completion = await openai.chat.completions.create({
					model,
					messages: [
						{ role: 'system', content: system },
						{ role: 'system', content: introDirective },
						{ role: 'system', content: `Context about Saakshi (use this to answer):\n${contextText}` },
						...chatHistory,
					],
					temperature: 0.4,
				});

				usedModel = model;
				console.log(`Successfully used ${model}`);
				break;
			} catch (err: any) {
				console.error(`Error with ${model}:`, err);
				lastError = err;
				const status = Number(err?.status) || 500;
				const code = err?.code || err?.error?.type || '';
				const message = String(err?.message || err?.error?.message || '');

				const isRateLimited = status === 429 || /rate[_-]?limit/i.test(code) || /rate limit/i.test(message);

				if (isRateLimited) {
					console.log(`Rate limited on ${model}, trying next model...`);
					continue; // Try next model
				} else {
					// Non-rate-limit error, don't retry
					console.error(`Non-rate-limit error on ${model}:`, err);
					break;
				}
			}
		}

		if (!completion) {
			// All models failed
			console.error('All models failed:', lastError);
			const errorResponse = NextResponse.json({ 
				error: 'All available models are currently unavailable. Please try again later.' 
			}, { status: 503 });
			return addCorsHeaders(errorResponse);
		}

		// Log token usage and model used
		const promptTokens = completion.usage?.prompt_tokens || 0;
		const completionTokens = completion.usage?.completion_tokens || 0;
		const totalTokens = completion.usage?.total_tokens || 0;
		
		console.log(`Model: ${usedModel}, Tokens - Prompt: ${promptTokens}, Completion: ${completionTokens}, Total: ${totalTokens}`);

		const baseReply = completion.choices[0]?.message?.content ?? 'Sorry, I could not generate a response.';

		// Append one relevant CTA link only when the user's latest message explicitly asks about it
		const buildCtaFromUserQuery = (u: string, r: string): string => {
			const text = String(u || '').toLowerCase();
			const alreadyHasAnyLink = ['/projects', '/experience', '/about', '/photography'].some(p => r.includes(p));
			if (alreadyHasAnyLink) return '';

			const rules: Array<{ match: RegExp; cta: string; path: string }> = [
				{ match: /\b(projects?|portfolio|case\s*stud(y|ies)|side\s*projects?)\b/i, cta: 'Explore more in [Projects](/projects).', path: '/projects' },
				{ match: /\b(experiences?|intern(ships?)?|work\s*history|roles?|jobs?)\b/i, cta: 'See roles in [Experience](/experience).', path: '/experience' },
				{ match: /\b(about(\s*me)?|bio|background|fun\s*facts?|interests?|hobbies|personality)\b/i, cta: 'Learn more on [About](/about).', path: '/about' },
				{ match: /\b(photo(graphy)?|pictures?|gallery|camera|shots?)\b/i, cta: 'Browse photos in [Photography](/photography).', path: '/photography' },
			];

			for (const rule of rules) {
				if (rule.match.test(text)) {
					return `\n\n${rule.cta}`;
				}
			}
			return '';
		};

		const reply = baseReply + buildCtaFromUserQuery(user, baseReply);
		const response = NextResponse.json({ 
			reply,
			model: usedModel,
			tokens: { prompt: promptTokens, completion: completionTokens, total: totalTokens }
		});
		return addCorsHeaders(response);
	} catch (e) {
		console.error(e);
		const errorResponse = NextResponse.json({ error: 'Unexpected error' }, { status: 500 });
		return addCorsHeaders(errorResponse);
	}
}