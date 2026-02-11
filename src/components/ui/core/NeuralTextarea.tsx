"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface NeuralTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    wrapperClassName?: string;
    label?: string;
}

export const NeuralTextarea = React.forwardRef<HTMLTextAreaElement, NeuralTextareaProps>(
    ({ className, wrapperClassName, label, ...props }, ref) => {
        return (
            <div className={cn("relative group flex flex-col gap-1.5", wrapperClassName)}>
                {label && (
                    <label className="text-xs font-medium text-zinc-400 font-sans group-focus-within:text-zinc-50 transition-colors">
                        {label}
                    </label>
                )}
                <motion.div
                    initial={false}
                    className="relative flex items-start bg-zinc-900 border border-zinc-800 rounded-xl shadow-sm transition-all duration-200 group-hover:border-zinc-700 group-focus-within:border-zinc-500 group-focus-within:ring-1 group-focus-within:ring-zinc-500/20"
                >
                    <textarea
                        ref={ref}
                        className={cn(
                            "w-full bg-transparent px-3 py-3 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 min-h-[80px] resize-none font-sans scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent rounded-xl",
                            className
                        )}
                        {...props}
                    />
                </motion.div>
            </div>
        );
    }
);
NeuralTextarea.displayName = "NeuralTextarea";
