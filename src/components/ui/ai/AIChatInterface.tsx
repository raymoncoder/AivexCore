"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, Sparkles, ChevronDown, Cpu, Plus, Paperclip, MoreHorizontal, Settings, Trash2 } from "lucide-react";
import { NeuralButton } from "@/components/ui/core/NeuralButton";
import { NeuralBadge } from "@/components/ui/core/NeuralBadge";
import { NeuralTextarea } from "@/components/ui/core/NeuralTextarea";
import { NeuralSelect } from "@/components/ui/core/NeuralSelect";
import { cn } from "@/lib/utils";

interface Message {
    id: string;
    role: "user" | "assistant";
    content: string;
    timestamp: string;
}

export const AIChatInterface = () => {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            role: "assistant",
            content: "Hello! I'm NeuralAI v4. How can I assist you with your code today?",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [selectedModel, setSelectedModel] = useState("gpt-4"); // Controlled state for NeuralSelect

    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            role: "user",
            content: input,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages(prev => [...prev, userMsg]);
        setInput("");
        setIsTyping(true);

        // Mock AI response streaming
        setTimeout(() => {
            const aiMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: "I'm processing using " + selectedModel.toUpperCase() + ". This is a simulated response demonstrating the clean UI updates.",
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages(prev => [...prev, aiMsg]);
            setIsTyping(false);
        }, 1500);
    };

    // Auto-resize textarea logic could go here, but NeuralTextarea handles basic sizing.
    // For a chat input specifically, we often want auto-growing height.
    // We can achieve this by using a hidden div or just raw TextareaAutosize library.
    // For this demo, let's keep it simple with NeuralTextarea fixed min-height but allow scroll.

    return (
        <div className="flex flex-col h-full w-full max-w-2xl mx-auto rounded-xl bg-[#09090b] border border-zinc-800/50 overflow-hidden shadow-2xl relative ring-1 ring-white/5">

            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-900 bg-zinc-950/80 backdrop-blur-md z-10 sticky top-0 shrink-0">
                <div className="flex items-center gap-3">
                    <NeuralButton variant="ghost" size="icon" className="h-8 w-8 text-zinc-500 hover:text-zinc-100">
                        <Plus size={18} />
                    </NeuralButton>

                    <div className="h-4 w-[1px] bg-zinc-800 mx-1 hidden sm:block"></div>

                    <div className="w-[140px]">
                        <NeuralSelect
                            options={[
                                { value: "gpt-4", label: "GPT-4 Turbo" },
                                { value: "claude-3", label: "Claude 3 Opus" },
                                { value: "gemini", label: "Gemini Pro" },
                            ]}
                            onValueChange={setSelectedModel}
                            defaultValue="gpt-4"
                            triggerClassName="border-none shadow-none bg-transparent"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <NeuralBadge status="success" dot className="font-mono">
                        Online
                    </NeuralBadge>
                    <NeuralButton variant="ghost" size="icon" className="h-8 w-8 text-zinc-500 hover:text-zinc-100">
                        <MoreHorizontal size={18} />
                    </NeuralButton>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
                <AnimatePresence mode="popLayout">
                    {messages.map((msg) => (
                        <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className={cn(
                                "flex gap-4 max-w-[90%]",
                                msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                            )}
                        >
                            <div className={cn(
                                "w-8 h-8 rounded-full flex items-center justify-center shrink-0 border shadow-sm mt-1",
                                msg.role === "user"
                                    ? "bg-zinc-100 border-zinc-200 text-zinc-900"
                                    : "bg-zinc-900 border-zinc-800 text-zinc-100"
                            )}>
                                {msg.role === "user" ? <User size={14} /> : <Bot size={14} />}
                            </div>

                            <div className={cn(
                                "flex flex-col gap-1 min-w-0", // min-w-0 ensuring text wraps
                                msg.role === "user" ? "items-end" : "items-start"
                            )}>
                                <div className="flex items-center gap-2 px-1">
                                    <span className="font-medium text-zinc-400 text-xs font-onest">
                                        {msg.role === "user" ? "You" : "Neural AI"}
                                    </span>
                                    <span className="text-[10px] text-zinc-600 font-mono">
                                        {msg.timestamp}
                                    </span>
                                </div>

                                <div className={cn(
                                    "px-4 py-3 rounded-2xl shadow-sm border text-sm leading-relaxed font-onest break-words",
                                    msg.role === "user"
                                        ? "bg-zinc-800 border-zinc-700 text-zinc-50 rounded-tr-sm"
                                        : "bg-zinc-900 border-zinc-800 text-zinc-300 rounded-tl-sm"
                                )}>
                                    {msg.content}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {isTyping && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex gap-4 mr-auto max-w-[80%]"
                    >
                        <div className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 flex items-center justify-center shrink-0 mt-1">
                            <Bot size={14} />
                        </div>
                        <div>
                            <div className="flex items-center gap-1.5 font-medium text-xs mb-1 px-1 font-onest text-emerald-400/80 tracking-wide">
                                <Sparkles size={10} />
                                Thinking...
                            </div>
                            <div className="flex items-center gap-1.5 px-3 py-2.5 rounded-2xl bg-zinc-900 border border-zinc-800 rounded-tl-sm h-[40px]">
                                <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 animate-bounce" style={{ animationDelay: "0ms" }} />
                                <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 animate-bounce" style={{ animationDelay: "150ms" }} />
                                <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 animate-bounce" style={{ animationDelay: "300ms" }} />
                            </div>
                        </div>
                    </motion.div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-zinc-950 border-t border-zinc-900 shrink-0">
                <div className="relative flex items-end gap-2 bg-zinc-900 p-2 rounded-xl border border-zinc-800 focus-within:border-zinc-700 focus-within:ring-1 focus-within:ring-zinc-700/50 transition-all shadow-sm">
                    <NeuralButton variant="ghost" size="icon" className="h-9 w-9 text-zinc-500 hover:text-zinc-300 rounded-lg shrink-0 mb-0.5">
                        <Paperclip size={18} />
                    </NeuralButton>

                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSend();
                            }
                        }}
                        placeholder="Message Neural..."
                        className="w-full bg-transparent text-zinc-200 placeholder:text-zinc-600 px-2 py-2.5 focus:outline-none resize-none min-h-[44px] max-h-[120px] scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent text-sm font-onest"
                        rows={1}
                    />

                    <NeuralButton
                        onClick={handleSend}
                        disabled={!input.trim()}
                        size="icon"
                        className={cn(
                            "h-9 w-9 rounded-lg shrink-0 mb-0.5 transition-all",
                            input.trim() ? "bg-zinc-100 text-zinc-950 hover:bg-zinc-200" : "bg-zinc-800 text-zinc-500 hover:bg-zinc-800 cursor-not-allowed opacity-50"
                        )}
                    >
                        <div className={cn(!input.trim() && "opacity-50")}>
                            <Send size={16} className={cn(input.trim() && "ml-0.5")} />
                        </div>
                    </NeuralButton>
                </div>
                <div className="text-center mt-3 flex justify-center items-center gap-2">
                    <p className="text-[10px] text-zinc-600 font-medium tracking-wide font-onest">
                        Powered by Neural v4 • AI can be inaccurate
                    </p>
                </div>
            </div>
        </div>
    );
};
