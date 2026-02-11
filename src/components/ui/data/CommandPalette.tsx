"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, Command, Calculator, User, CreditCard, Settings, Smile, Calendar, Hash, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { NeuralInput } from "@/components/ui/core/NeuralInput";

interface CommandItem {
    id: string;
    icon: React.ReactNode;
    label: string;
    shortcut?: string;
    group: string;
}

const SAMPLE_ITEMS: CommandItem[] = [
    { id: "calendar", icon: <Calendar className="mr-2 h-4 w-4" />, label: "Calendar", group: "Suggestions" },
    { id: "search-emoji", icon: <Smile className="mr-2 h-4 w-4" />, label: "Search Emoji", group: "Suggestions" },
    { id: "calculator", icon: <Calculator className="mr-2 h-4 w-4" />, label: "Calculator", group: "Suggestions" },
    { id: "profile", icon: <User className="mr-2 h-4 w-4" />, label: "Profile", shortcut: "⌘P", group: "Settings" },
    { id: "billing", icon: <CreditCard className="mr-2 h-4 w-4" />, label: "Billing", shortcut: "⌘B", group: "Settings" },
    { id: "settings", icon: <Settings className="mr-2 h-4 w-4" />, label: "Settings", shortcut: "⌘S", group: "Settings" },
];

export const CommandPalette = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    const [query, setQuery] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);

    const filteredItems = SAMPLE_ITEMS.filter(item =>
        item.label.toLowerCase().includes(query.toLowerCase())
    );

    // Group items
    const grouped = filteredItems.reduce((acc, item) => {
        if (!acc[item.group]) acc[item.group] = [];
        acc[item.group].push(item);
        return acc;
    }, {} as Record<string, CommandItem[]>);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isOpen) {
                if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                    e.preventDefault();
                    // In a real app, this would toggle open. 
                    // Here we rely on the parent to pass isOpen, but for the showcase we might need a trigger.
                }
                return;
            }

            if (e.key === "ArrowDown") {
                e.preventDefault();
                setSelectedIndex(prev => (prev + 1) % filteredItems.length);
            } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setSelectedIndex(prev => (prev - 1 + filteredItems.length) % filteredItems.length);
            } else if (e.key === "Enter") {
                e.preventDefault();
                const item = filteredItems[selectedIndex];
                if (item) {
                    alert(`Selected: ${item.label}`);
                    onClose();
                }
            } else if (e.key === "Escape") {
                onClose();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, filteredItems, selectedIndex, onClose]);

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-start justify-center pt-[20vh]"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: -20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full max-w-lg bg-zinc-950/80 backdrop-blur-xl border border-zinc-800/50 rounded-xl shadow-2xl overflow-hidden flex flex-col"
                        >
                            <div className="flex items-center border-b border-zinc-800/50 px-3 bg-white/5">
                                <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                                <input
                                    ref={inputRef}
                                    value={query}
                                    onChange={(e) => {
                                        setQuery(e.target.value);
                                        setSelectedIndex(0);
                                    }}
                                    className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-zinc-500 disabled:cursor-not-allowed disabled:opacity-50"
                                    placeholder="Type a command or search..."
                                />
                            </div>
                            <div className="max-h-[300px] overflow-y-auto overflow-x-hidden p-2 scrollbar-none">
                                {Object.keys(grouped).length === 0 ? (
                                    <div className="py-6 text-center text-sm text-zinc-500">No results found.</div>
                                ) : (
                                    Object.entries(grouped).map(([group, items]) => (
                                        <div key={group} className="mb-2">
                                            <div className="px-2 py-1.5 text-xs font-medium text-zinc-500">{group}</div>
                                            {items.map((item) => {
                                                const simpleIndex = filteredItems.indexOf(item);
                                                const isSelected = simpleIndex === selectedIndex;

                                                return (
                                                    <div
                                                        key={item.id}
                                                        onClick={() => {
                                                            alert(`Selected: ${item.label}`);
                                                            onClose();
                                                        }}
                                                        className={cn(
                                                            "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                                                            isSelected ? "bg-zinc-800 text-zinc-100" : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-300"
                                                        )}
                                                    >
                                                        {item.icon}
                                                        <span>{item.label}</span>
                                                        {item.shortcut && (
                                                            <span className="ml-auto text-xs tracking-widest text-zinc-500">
                                                                {item.shortcut}
                                                            </span>
                                                        )}
                                                        {isSelected && (
                                                            <motion.div
                                                                layoutId="command-highlight"
                                                                className="absolute inset-0 bg-zinc-800 rounded-sm -z-10"
                                                                transition={{ duration: 0.15 }}
                                                            />
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    ))
                                )}
                            </div>
                            <div className="border-t border-zinc-800 px-4 py-2 text-[10px] text-zinc-500 flex justify-between">
                                <span><kbd className="bg-zinc-900 border border-zinc-700 px-1 rounded mx-1">↑↓</kbd> to navigate</span>
                                <span><kbd className="bg-zinc-900 border border-zinc-700 px-1 rounded mx-1">↵</kbd> to select</span>
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
