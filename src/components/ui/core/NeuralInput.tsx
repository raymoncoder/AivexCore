"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface NeuralInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    icon?: React.ReactNode;
    wrapperClassName?: string;
    label?: string;
}

export const NeuralInput = React.forwardRef<HTMLInputElement, NeuralInputProps>(
    ({ className, wrapperClassName, icon, label, ...props }, ref) => {

        return (
            <div className={cn("relative group flex flex-col gap-1.5", wrapperClassName)}>
                {label && (
                    <label className="text-xs font-medium text-zinc-400 group-focus-within:text-zinc-50 transition-colors">
                        {label}
                    </label>
                )}
                <motion.div
                    initial={false}
                    className="relative flex items-center bg-zinc-900/50 border border-zinc-800/50 rounded-lg shadow-sm backdrop-blur-sm transition-all duration-200 group-hover:border-zinc-700/50 group-hover:bg-zinc-900/70 group-focus-within:border-emerald-500/50 group-focus-within:ring-2 group-focus-within:ring-emerald-500/10 group-focus-within:bg-zinc-950/80"
                >
                    {icon && (
                        <div className="absolute left-3 text-zinc-500 group-focus-within:text-zinc-300 transition-colors">
                            {icon}
                        </div>
                    )}
                    <input
                        ref={ref}
                        className={cn(
                            "w-full bg-transparent px-3 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
                            icon ? "pl-9" : "",
                            className
                        )}
                        {...props}
                    />
                </motion.div>
            </div>
        );
    }
);
NeuralInput.displayName = "NeuralInput";
