"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, Sparkles, ChevronDown, Cpu, Plus, Paperclip, MoreHorizontal, Settings, Trash2 } from "lucide-react";
import { AivexButton } from "@/components/ui/core/AivexButton";
import { AivexBadge } from "@/components/ui/core/AivexBadge";
import { AivexTextarea } from "@/components/ui/core/AivexTextarea";
import { AivexSelect } from "@/components/ui/core/AivexSelect";
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
            content: "Hello! I'm AivexAI v4. How can I assist you with your code today?",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [selectedModel, setSelectedModel] = useState("gpt-4"); // Controlled state for AivexSelect

    const scrollRef = useRef<HTMLDivElement>(null);
    const isFirstMount = useRef(true);

    const scrollToBottom = (behavior: "auto" | "smooth" = "smooth") => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({
                top: scrollRef.current.scrollHeight,
                behavior
            });
        }
    };

    useEffect(() => {
        if (isFirstMount.current) {
            // First mount: scroll immediately without animation to show latest, 
            // but we use "auto" and it's localized to the container.
            scrollToBottom("auto");
            isFirstMount.current = false;
            return;
        }
        scrollToBottom("smooth");
    }, [messages]);

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

    // Auto-resize textarea logic could go here, but AivexTextarea handles basic sizing.
    // For a chat input specifically, we often want auto-growing height.
    // We can achieve this by using a hidden div or just raw TextareaAutosize library.
    // For this demo, let's keep it simple with AivexTextarea fixed min-height but allow scroll.

    return (
        <div className="flex flex-col h-full w-full max-w-2xl mx-auto rounded-xl bg-[#09090b] border border-zinc-800/50 overflow-hidden shadow-2xl relative ring-1 ring-white/5">

            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-900 bg-zinc-950/80 backdrop-blur-md z-10 sticky top-0 shrink-0">
                <div className="flex items-center gap-3">
                    <AivexButton variant="ghost" size="icon" className="h-8 w-8 text-zinc-500 hover:text-zinc-100">
                        <Plus size={18} />
                    </AivexButton>

                    <div className="h-4 w-[1px] bg-zinc-800 mx-1 hidden sm:block"></div>

                    <div className="w-[140px]">
                        <AivexSelect
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
                    <AivexBadge status="success" dot className="font-mono">
                        Online
                    </AivexBadge>
                    <AivexButton variant="ghost" size="icon" className="h-8 w-8 text-zinc-500 hover:text-zinc-100">
                        <MoreHorizontal size={18} />
                    </AivexButton>
                </div>
            </div>

            {/* Messages Area */}
            <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-4 space-y-6"
            >
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
                                    <span className="font-medium text-zinc-400 text-xs font-sans">
                                        {msg.role === "user" ? "You" : "Aivex AI"}
                                    </span>
                                    <span className="text-[10px] text-zinc-600 font-mono">
                                        {msg.timestamp}
                                    </span>
                                </div>

                                <div className={cn(
                                    "px-4 py-3 rounded-2xl shadow-sm border text-sm leading-relaxed font-sans break-words",
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
                            <div className="flex items-center gap-1.5 font-medium text-xs mb-1 px-1 font-sans text-emerald-400/80 tracking-wide">
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
            </div>

            {/* Input Area */}
            <div className="p-4 bg-zinc-950 border-t border-zinc-900 shrink-0">
                <div className="relative flex items-end gap-2 bg-zinc-900/50 p-2 rounded-2xl border border-zinc-800 focus-within:border-zinc-700 hover:border-zinc-700/80 focus-within:ring-4 focus-within:ring-emerald-500/10 transition-all shadow-sm">
                    <AivexButton variant="ghost" size="icon" className="h-[44px] w-[44px] text-zinc-500 hover:text-zinc-300 rounded-xl shrink-0">
                        <Paperclip size={20} />
                    </AivexButton>

                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSend();
                            }
                        }}
                        placeholder="Message Aivex..."
                        className="flex-1 bg-transparent text-zinc-200 placeholder:text-zinc-600 px-2 py-[10px] focus:outline-none resize-none min-h-[44px] max-h-[120px] text-base font-sans"
                        rows={1}
                    />

                    <AivexButton
                        onClick={handleSend}
                        disabled={!input.trim()}
                        size="icon"
                        className={cn(
                            "h-[44px] w-[44px] rounded-xl shrink-0 transition-all shadow-none",
                            input.trim() ? "bg-emerald-500 text-emerald-950 hover:bg-emerald-400" : "bg-zinc-800 text-zinc-500 hover:bg-zinc-800 cursor-not-allowed"
                        )}
                    >
                        <Send size={18} className={cn("transition-transform", input.trim() && "ml-0.5")} />
                    </AivexButton>
                </div>
                <div className="text-center mt-3 flex justify-center items-center gap-2">
                    <p className="text-[10px] text-zinc-600 font-medium tracking-wide font-sans">
                        Powered by Aivex v4 • AI can be inaccurate
                    </p>
                </div>
            </div>
        </div>
    );
};
