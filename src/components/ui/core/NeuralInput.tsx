"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface NeuralInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    icon?: React.ReactNode;
    wrapperClassName?: string;
    label?: string;
    variant?: "default" | "underlined" | "glass";
}

export const NeuralInput = React.forwardRef<HTMLInputElement, NeuralInputProps>(
    ({ className, wrapperClassName, icon, label, variant = "default", ...props }, ref) => {
        const [isFocused, setIsFocused] = React.useState(false);

        return (
            <div className={cn("relative group flex flex-col gap-1.5", wrapperClassName)}>
                {label && (
                    <label className="text-xs font-medium text-zinc-400 group-focus-within:text-zinc-50 transition-colors">
                        {label}
                    </label>
                )}
                <motion.div
                    initial={false}
                    className={cn(
                        "relative flex items-center transition-all duration-300",
                        variant === "default" && "bg-zinc-900/50 border border-zinc-800/50 rounded-lg backdrop-blur-sm group-hover:border-zinc-700/50 group-focus-within:border-emerald-500/50 group-focus-within:ring-2 group-focus-within:ring-emerald-500/10",
                        variant === "underlined" && "bg-transparent border-b border-zinc-800 group-hover:border-zinc-700 group-focus-within:border-transparent",
                        variant === "glass" && "bg-white/5 border border-white/10 rounded-xl backdrop-blur-md group-hover:bg-white/10 group-focus-within:border-emerald-500/30"
                    )}
                >
                    {icon && (
                        <div className={cn(
                            "absolute left-3 transition-colors",
                            isFocused ? "text-emerald-500" : "text-zinc-500"
                        )}>
                            {icon}
                        </div>
                    )}
                    <input
                        ref={ref}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        className={cn(
                            "w-full bg-transparent px-3 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
                            icon ? "pl-9" : "",
                            className
                        )}
                        {...props}
                    />

                    {variant === "underlined" && (
                        <motion.div
                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: isFocused ? 1 : 0 }}
                            transition={{ duration: 0.3, ease: "circOut" }}
                        />
                    )}
                </motion.div>
            </div>
        );
    }
);
NeuralInput.displayName = "NeuralInput";
