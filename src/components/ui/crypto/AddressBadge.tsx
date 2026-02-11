"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Copy, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { NeuralButton } from "@/components/ui/core/NeuralButton";

interface AddressBadgeProps {
    address: string;
    className?: string;
    showAvatar?: boolean;
}

export const AddressBadge = ({ address, className, showAvatar = true }: AddressBadgeProps) => {
    const [copied, setCopied] = React.useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(address);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const truncated = `${address.slice(0, 6)}...${address.slice(-4)}`;

    return (
        <div className={cn(
            "inline-flex items-center gap-2 px-2 py-1 rounded-full bg-zinc-900 border border-zinc-800 transition-all hover:bg-zinc-800/50 hover:border-zinc-700 select-none",
            className
        )}>
            {showAvatar && (
                <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 shadow-inner ring-1 ring-zinc-950/20" />
            )}
            <span className="text-xs font-mono font-medium text-zinc-300">{truncated}</span>
            <button
                onClick={handleCopy}
                className="ml-1 p-1 rounded-full hover:bg-zinc-700 text-zinc-500 hover:text-zinc-200 transition-colors"
            >
                <AnimatePresence mode="wait" initial={false}>
                    {copied ? (
                        <motion.div
                            key="check"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                        >
                            <Check size={12} strokeWidth={3} className="text-emerald-500" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="copy"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                        >
                            <Copy size={12} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </button>
        </div>
    );
};
