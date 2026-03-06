"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Command, CornerDownLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface CommandBarProps {
    className?: string;
}

export const AivexCommandBar = ({ className }: CommandBarProps) => {
    const [isVisible, setIsVisible] = useState(false);
    const [query, setQuery] = useState("");

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setIsVisible((prev) => !prev);
            }
            if (e.key === "Escape") {
                setIsVisible(false);
            }
        };

        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);

    return (
        <>
            <AnimatePresence>
                {isVisible && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-8">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsVisible(false)}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className={cn(
                                "relative w-full max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 shadow-2xl",
                                className
                            )}
                        >
                            <div className="flex items-center gap-3 px-6 py-5 border-b border-white/5">
                                <Search size={20} className="text-zinc-500" />
                                <input
                                    autoFocus
                                    placeholder="Search commands or docs..."
                                    className="flex-1 bg-transparent border-none outline-none text-zinc-100 placeholder:text-zinc-600 font-sans text-lg"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                />
                                <div className="flex items-center gap-1 px-2 py-1 rounded bg-zinc-800 border border-white/5 text-[10px] font-mono text-zinc-400">
                                    <kbd>ESC</kbd>
                                </div>
                            </div>

                            <div className="p-2">
                                <div className="px-4 py-3">
                                    <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2 font-sans">Suggestions</h4>
                                    <div className="space-y-1">
                                        {["Browse Components", "View Documentation", "Copy CLI Command", "Open GitHub Repository"].map((item) => (
                                            <div
                                                key={item}
                                                className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-white/5 cursor-pointer group transition-colors"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-500 group-hover:text-emerald-400 group-hover:bg-emerald-500/10 transition-colors">
                                                        <Command size={16} />
                                                    </div>
                                                    <span className="text-sm font-medium text-zinc-300 group-hover:text-zinc-100 font-sans">{item}</span>
                                                </div>
                                                <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-[10px] text-zinc-500">
                                                    <span>Select</span>
                                                    <CornerDownLeft size={10} />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="px-6 py-4 bg-zinc-950 border-t border-white/5 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-1 text-xs text-zinc-600">
                                        <kbd className="px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800">↓↑</kbd>
                                        <span>to navigate</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-xs text-zinc-600">
                                        <kbd className="px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800">↵</kbd>
                                        <span>to select</span>
                                    </div>
                                </div>
                                <div className="text-[10px] font-mono text-zinc-700">
                                    AivexCore v2.1.0
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Hint Trigger */}
            {!isVisible && (
                <div
                    onClick={() => setIsVisible(true)}
                    className="fixed bottom-8 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full border border-white/10 bg-zinc-900/80 backdrop-blur-md text-xs text-zinc-400 font-sans cursor-pointer hover:bg-zinc-800 hover:border-white/20 transition-all flex items-center gap-3 shadow-2xl z-40"
                >
                    <Command size={14} />
                    <span>Press <kbd className="font-mono text-zinc-500">⌘K</kbd> to search</span>
                </div>
            )}
        </>
    );
};
