"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Search, X } from "lucide-react";

interface NeuralSearchInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
    label?: string;
    wrapperClassName?: string;
    onSearchChange?: (value: string) => void;
    showClearButton?: boolean;
}

export const NeuralSearchInput = React.forwardRef<HTMLInputElement, NeuralSearchInputProps>(
    ({ className, wrapperClassName, label, onSearchChange, showClearButton = true, value, ...props }, ref) => {
        const [internalValue, setInternalValue] = React.useState(value || "");
        const inputRef = React.useRef<HTMLInputElement>(null);

        React.useImperativeHandle(ref, () => inputRef.current!);

        const currentValue = value !== undefined ? value : internalValue;

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const newValue = e.target.value;
            setInternalValue(newValue);
            onSearchChange?.(newValue);
        };

        const handleClear = () => {
            setInternalValue("");
            onSearchChange?.("");
            inputRef.current?.focus();
        };

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
                    <div className="absolute left-3 text-zinc-500 group-focus-within:text-emerald-400 transition-colors">
                        <Search size={16} />
                    </div>
                    <input
                        ref={inputRef}
                        type="text"
                        value={currentValue}
                        onChange={handleChange}
                        className={cn(
                            "w-full bg-transparent pl-10 pr-10 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
                            className
                        )}
                        {...props}
                    />
                    {showClearButton && currentValue && (
                        <motion.button
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            type="button"
                            onClick={handleClear}
                            className="absolute right-3 p-1 rounded-full hover:bg-zinc-800 text-zinc-500 hover:text-zinc-300 transition-colors"
                        >
                            <X size={14} />
                        </motion.button>
                    )}
                </motion.div>
            </div>
        );
    }
);
NeuralSearchInput.displayName = "NeuralSearchInput";
