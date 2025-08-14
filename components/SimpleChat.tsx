'use client'

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Send, User, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { apiEndpoints } from "@/lib/api-config";

interface Message {
	id: string;
	content: string;
	sender: "user" | "assistant";
	timestamp: Date;
}

function MarkdownText({ text }: { text: string }) {
    const router = useRouter();
	const normalize = (input: string) => input.replace(/\r\n/g, "\n");
	const renderInline = (line: string): Array<string | JSX.Element> => {
		const nodes: Array<string | JSX.Element> = [];
		const pattern = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|`([^`]+)`|\*([^*]+)\*|_([^_]+)_/g;
		let lastIndex = 0;
		let match: RegExpExecArray | null;
		let key = 0;
		while ((match = pattern.exec(line)) !== null) {
			if (match.index > lastIndex) {
				nodes.push(line.slice(lastIndex, match.index));
			}
            if (match[1] && match[2]) {
                const href = match[2];
                const label = match[1];
                const isInternal = href.startsWith("/");
                nodes.push(
                    isInternal ? (
                        <a
                            key={`a-${key++}`}
                            href={href}
                            onClick={(e) => {
                                e.preventDefault();
                                try { router.push(href); } catch { window.location.href = href; }
                            }}
                            className="underline text-primary cursor-pointer"
                        >
                            {label}
                        </a>
                    ) : (
                        <a
                            key={`a-${key++}`}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline text-primary"
                        >
                            {label}
                        </a>
                    )
                );
			} else if (match[3]) {
				nodes.push(<strong key={`b-${key++}`}>{match[3]}</strong>);
			} else if (match[4]) {
				nodes.push(
					<code key={`c-${key++}`} className="px-1 py-0.5 rounded bg-muted text-muted-foreground font-mono text-sm">
						{match[4]}
					</code>
				);
			} else if (match[5]) {
				nodes.push(<em key={`i-${key++}`}>{match[5]}</em>);
			} else if (match[6]) {
				nodes.push(<em key={`i2-${key++}`}>{match[6]}</em>);
			}
			lastIndex = pattern.lastIndex;
		}
		if (lastIndex < line.length) {
			nodes.push(line.slice(lastIndex));
		}
		return nodes;
	};

	const paragraphs = normalize(text).split(/\n{2,}/);
	return (
		<div>
			{paragraphs.map((para, pIdx) => {
				const lines = para.split("\n");
				return (
					<p key={`p-${pIdx}`} className="m-0">
						{lines.map((ln, lIdx) => (
							<span key={`l-${pIdx}-${lIdx}`}>
								{renderInline(ln)}
								{lIdx < lines.length - 1 ? <br /> : null}
							</span>
						))}
					</p>
				);
			})}
		</div>
	);
}

export function SimpleChat() {
	const [messages, setMessages] = useState<Message[]>([]);
	const [inputValue, setInputValue] = useState("");
	const [isTyping, setIsTyping] = useState(false);
	const messagesContainerRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);
	const STORAGE_KEY = "simpleChat:history";
	const RESET_KEY = "simpleChat:lastReset";
	const MAX_EXCHANGES = 4;
	const MAX_MESSAGES = MAX_EXCHANGES * 2;

	const trimToLastExchanges = (list: Message[]): Message[] => {
		if (!Array.isArray(list) || list.length <= MAX_MESSAGES) return list;
		return list.slice(-MAX_MESSAGES);
	};

	// Load last chats from localStorage on mount and clear daily
	useEffect(() => {
		try {
			// Daily reset using local date (user's timezone)
			const now = new Date();
			const todayKey = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
			const lastReset = localStorage.getItem(RESET_KEY);
			if (lastReset !== todayKey) {
				localStorage.removeItem(STORAGE_KEY);
				localStorage.setItem(RESET_KEY, todayKey);
			}

			const raw = localStorage.getItem(STORAGE_KEY);
			if (raw) {
				const parsed = JSON.parse(raw) as Array<{ id: string; content: string; sender: "user" | "assistant"; timestamp: string }>;
				const restored: Message[] = parsed.map((m) => ({ ...m, timestamp: new Date(m.timestamp) }));
				setMessages(trimToLastExchanges(restored));
			}
		} catch {
			// ignore
		}
	}, []);

	const scrollToBottom = () => {
		const container = messagesContainerRef.current;
		if (container) {
			container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
		}
	};

	useEffect(() => {
		scrollToBottom();
	}, [messages]);

	// Persist trimmed chat to localStorage whenever messages change
	useEffect(() => {
		try {
			const trimmed = trimToLastExchanges(messages);
			const serializable = trimmed.map(m => ({ ...m, timestamp: m.timestamp.toISOString() }));
			localStorage.setItem(STORAGE_KEY, JSON.stringify(serializable));
		} catch {
			// ignore
		}
	}, [messages]);

	const handleSendMessage = async () => {
		if (!inputValue.trim() || isTyping) return;

		const userContent = inputValue;
		const userMessage: Message = {
			id: Date.now().toString(),
			content: userContent,
			sender: "user",
			timestamp: new Date(),
		};

		setMessages(prev => [...prev, userMessage]);
		setInputValue("");
		setIsTyping(true);

		try {
			const res = await fetch(apiEndpoints.chat, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					messages: [
						...messages.map(m => ({
							role: m.sender === "user" ? "user" : "assistant",
							content: m.content,
						})),
						{ role: "user", content: userContent },
					],
				}),
			});

			const data = await res.json();
			const replyText = typeof data?.reply === "string" ? data.reply : "Sorry, I couldn't respond.";

			const newMessage: Message = {
				id: (Date.now() + 1).toString(),
				content: replyText,
				sender: "assistant",
				timestamp: new Date(),
			};

			setMessages(prev => [...prev, newMessage]);
		} catch {
			const errMessage: Message = {
				id: (Date.now() + 2).toString(),
				content: "There was an error contacting the assistant.",
				sender: "assistant",
				timestamp: new Date(),
			};
			setMessages(prev => [...prev, errMessage]);
		} finally {
			setIsTyping(false);
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			e.stopPropagation();
			// Ensure focus stays on input and prevent any parent key handlers
			inputRef.current?.focus({ preventScroll: true } as any);
			window?.scrollTo?.({ top: window.scrollY, behavior: "instant" as ScrollBehavior });
			void handleSendMessage();
		}
	};

	// Capture-phase handler to keep Enter from reaching page-level listeners
	// but allow the input/button handlers inside this component to run.
	const handleContainerKeyDownCapture = (e: React.KeyboardEvent<HTMLDivElement>) => {
		if (e.key === "Enter" && !e.shiftKey) {
			const target = e.target as HTMLElement | null;
			if (target instanceof HTMLInputElement || target instanceof HTMLButtonElement) {
				return; // let the inner handler handle sending
			}
			e.preventDefault();
			e.stopPropagation();
		}
	};

	return (
		<div className="w-full max-w-2xl space-y-6" onKeyDownCapture={handleContainerKeyDownCapture}>
			{/* Simple Input */}
			<div className="glass rounded-2xl border border-glass-border p-2 w-auto self-stretch">
				<div className="flex space-x-3">
					<input
						ref={inputRef}
						type="text"
						value={inputValue}
						onChange={(e) => setInputValue(e.target.value)}
						onKeyDown={handleKeyDown}
						placeholder="Hi! I am an AI assistant. Ask me anything about Saakshi!!"
						className="flex-1 bg-transparent border-0 px-0 py-1 pl-2 text-md placeholder:text-muted-foreground focus:outline-none"
						disabled={isTyping}
					/>
					<Button
						onClick={handleSendMessage}
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								e.preventDefault();
								e.stopPropagation();
								void handleSendMessage();
							}
						}}
						disabled={!inputValue.trim() || isTyping}
						size="lg"
						className="rounded-xl bg-primary hover:bg-primary/90 px-6"
					>
						<Send size={18} />
					</Button>
				</div>
			</div>

			{/* Messages - only show if there are any */}
					{messages.length > 0 && (
						<div className="glass rounded-2xl border border-glass-border overflow-hidden">
							<div ref={messagesContainerRef} className="max-h-96 overflow-y-auto glass-scrollbar p-6 space-y-4">
						{messages.map((message) => (
							<div
								key={message.id}
								className={cn(
									"flex space-x-3",
									message.sender === "user" ? "justify-end" : "justify-start"
								)}
							>
								{message.sender === "assistant" && (
									<div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center flex-shrink-0">
										<Bot size={16} className="text-white" />
									</div>
								)}
								
								<div
									className={cn(
										"max-w-xs lg:max-w-md px-4 py-3 rounded-2xl",
										message.sender === "user"
											? "bg-primary text-primary-foreground"
											: "glass border border-glass-border"
									)}
								>
						<MarkdownText text={message.content} />
								</div>
								
								{message.sender === "user" && (
									<div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
										<User size={16} className="text-muted-foreground" />
									</div>
								)}
							</div>
						))}
						
						{isTyping && (
							<div className="flex space-x-3">
								<div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center flex-shrink-0">
									<Bot size={16} className="text-white" />
								</div>
								<div className="glass border border-glass-border px-4 py-3 rounded-2xl">
									<div className="flex space-x-1">
										<div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
										<div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
										<div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
									</div>
								</div>
							</div>
						)}
						
							{/* End anchor no longer needed since we scroll the container */}
					</div>
				</div>
			)}
		</div>
	);
}