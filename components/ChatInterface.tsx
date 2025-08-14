import { useState, useRef, useEffect } from "react";
import { Send, User, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  content: string;
  sender: "user" | "assistant";
  timestamp: Date;
}

const initialMessages: Message[] = [
  {
    id: "1",
    content: "Hi there! I'm here to answer any questions you might have about my background, skills, projects, and experience. What would you like to know?",
    sender: "assistant",
    timestamp: new Date(),
  },
];

const sampleResponses = [
  "I'm a passionate full-stack developer with 5+ years of experience building modern web applications using React, TypeScript, and Node.js.",
  "My expertise includes frontend development with React and Vue.js, backend development with Express and FastAPI, and cloud deployment on AWS and Vercel.",
  "I've worked on diverse projects ranging from e-commerce platforms to AI-powered applications, always focusing on clean code and user experience.",
  "I love learning new technologies and contributing to open-source projects. Recently, I've been exploring AI integration and serverless architectures.",
  "I hold a Computer Science degree and several certifications in cloud computing and modern JavaScript frameworks.",
];

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const simulateResponse = (userMessage: string) => {
    setIsTyping(true);
    
    setTimeout(() => {
      const response = sampleResponses[Math.floor(Math.random() * sampleResponses.length)];
      const newMessage: Message = {
        id: Date.now().toString(),
        content: response,
        sender: "assistant",
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, newMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    
    simulateResponse(inputValue);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="glass rounded-2xl border border-glass-border overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-glass-border">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center">
              <Bot size={16} className="text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">AI Assistant</h3>
              <p className="text-sm text-muted-foreground">Ask me anything about my background</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="h-96 overflow-y-auto p-4 space-y-4">
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
                  "max-w-xs lg:max-w-md px-4 py-2 rounded-2xl text-sm",
                  message.sender === "user"
                    ? "bg-primary text-primary-foreground"
                    : "glass border border-glass-border"
                )}
              >
                {message.content}
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
              <div className="glass border border-glass-border px-4 py-2 rounded-2xl">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-glass-border">
          <div className="flex space-x-2">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me about my skills, projects, or experience..."
              className="flex-1 bg-transparent border border-glass-border rounded-xl px-4 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent"
              disabled={isTyping}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping}
              size="sm"
              className="rounded-xl bg-primary hover:bg-primary/90"
            >
              <Send size={16} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
