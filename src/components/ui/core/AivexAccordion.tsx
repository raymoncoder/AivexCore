"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface AivexAccordionItemProps {
    value: string;
    title: string;
    children: React.ReactNode;
    isOpen?: boolean;
    onClick?: () => void;
}

const AivexAccordionItem = ({ value, title, children, isOpen, onClick }: AivexAccordionItemProps) => {
    return (
        <div className="border-b border-zinc-800 last:border-0 overflow-hidden">
            <button
                onClick={onClick}
                className={cn(
                    "w-full flex items-center justify-between py-4 text-left transition-all group",
                    isOpen ? "text-emerald-400" : "text-zinc-300 hover:text-zinc-100"
                )}
            >
                <span className="font-medium font-sans text-sm">{title}</span>
                <ChevronDown
                    size={16}
                    className={cn(
                        "transition-transform duration-300 text-zinc-500 group-hover:text-zinc-300",
                        isOpen && "rotate-180 text-emerald-500"
                    )}
                />
            </button>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                    >
                        <div className="pb-4 text-sm text-zinc-400 font-sans leading-relaxed">
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

interface AivexAccordionProps {
    items: { value: string; title: string; content: React.ReactNode }[];
    type?: "single" | "multiple";
    defaultValue?: string | string[];
    className?: string;
}

export const AivexAccordion = ({ items, type = "single", defaultValue, className }: AivexAccordionProps) => {
    // State management for single/multiple
    const [openItems, setOpenItems] = useState<string[]>(() => {
        if (defaultValue) {
            return Array.isArray(defaultValue) ? defaultValue : [defaultValue];
        }
        return [];
    });

    const handleItemClick = (value: string) => {
        if (type === "single") {
            setOpenItems(prev => prev.includes(value) ? [] : [value]);
        } else {
            setOpenItems(prev =>
                prev.includes(value)
                    ? prev.filter(item => item !== value)
                    : [...prev, value]
            );
        }
    };

    return (
        <div className={cn("w-full bg-zinc-950/40 backdrop-blur-md border border-zinc-800/50 rounded-xl px-4 overflow-hidden shadow-lg", className)}>
            {items.map((item) => (
                <AivexAccordionItem
                    key={item.value}
                    value={item.value}
                    title={item.title}
                    isOpen={openItems.includes(item.value)}
                    onClick={() => handleItemClick(item.value)}
                >
                    {item.content}
                </AivexAccordionItem>
            ))}
        </div>
    );
};
