
import fs from 'fs/promises';
import path from 'path';
import OpenAI from 'openai';

type RAGItem = {
	id: string;
	source: string;
	text: string;
	embedding: number[];
};

let cache: { items: RAGItem[] } | null = null;
let cachedEmbeddingDim: number | null = null;
let cachedEmbeddingModel: string | null = null;
let localExtractor: any | null = null;

function cosineSim(a: number[], b: number[]): number {
	let dot = 0, na = 0, nb = 0;
	for (let i = 0; i < a.length; i++) {
		const x = a[i], y = b[i];
		dot += x * y;
		na += x * x;
		nb += y * y;
	}
	return dot / (Math.sqrt(na) * Math.sqrt(nb));
}

export async function loadEmbeddings(): Promise<RAGItem[]> {
	if (cache?.items) return cache.items;
	const file = path.resolve(process.cwd(), 'data', 'rag', 'embeddings.json');
	const raw = await fs.readFile(file, 'utf8');
	const parsed = JSON.parse(raw) as { model?: string; items: RAGItem[] };
	cache = { items: parsed.items };
	cachedEmbeddingModel = parsed.model ?? null;
	cachedEmbeddingDim = parsed.items?.[0]?.embedding?.length ?? null;
	return cache.items;
}

function normalize(vec: number[]): number[] {
	let norm = 0;
	for (const v of vec) norm += v * v;
	norm = Math.sqrt(norm) || 1;
	return vec.map((v) => v / norm);
}

async function getLocalExtractor(): Promise<any> {
	if (localExtractor) return localExtractor;
	const mod: any = await import('@xenova/transformers');
	const pipeline = (mod as any)["pipeline"] as any;
	localExtractor = await pipeline('feature-extraction', process.env.LOCAL_EMBEDDING_MODEL || 'Xenova/all-MiniLM-L6-v2');
	return localExtractor;
}

async function embedQueryLocal(query: string): Promise<number[]> {
	const extractor = await getLocalExtractor();
	const output = await extractor(query, { pooling: 'mean', normalize: true }) as any;
	return Array.from(output.data);
}

async function embedQueryOpenAI(query: string): Promise<number[]> {
	const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
	const res = await openai.embeddings.create({
		model: process.env.EMBEDDING_MODEL || 'text-embedding-3-small',
		input: query,
	});
	return res.data[0].embedding;
}

export async function embedQuery(query: string): Promise<number[]> {
	// Prefer local if explicitly requested or if embeddings on disk were created with a local-sized model (e.g., 384)
	const items = cache?.items ?? await loadEmbeddings();
	const dim = cachedEmbeddingDim ?? items?.[0]?.embedding?.length ?? null;
	const forceLocal = process.env.USE_LOCAL_EMBEDDINGS === '1';
	const preferLocalByDim = typeof dim === 'number' && dim <= 512; // MiniLM is 384; OpenAI is typically 1536+

	if (forceLocal || !process.env.OPENAI_API_KEY || preferLocalByDim) {
		try {
			return await embedQueryLocal(query);
		} catch (err) {
			// Fallback to a simple pseudo embedding to avoid total failure
			const length = dim ?? Number(process.env.PSEUDO_EMBEDDING_DIM || 384);
			const vec = new Array(length).fill(0);
			for (let i = 0; i < query.length; i++) vec[i % length] += query.charCodeAt(i);
			return normalize(vec);
		}
	}

	return embedQueryOpenAI(query);
}

export async function retrieve(query: string, k = 5): Promise<RAGItem[]> {
	const [items, qvec] = await Promise.all([loadEmbeddings(), embedQuery(query)]);
	const scored = items.map((it) => ({ it, score: cosineSim(qvec, it.embedding) }));
	scored.sort((a, b) => b.score - a.score);
	return scored.slice(0, k).map((s) => s.it);
}