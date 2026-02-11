"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";

interface NeuralDatePickerProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
    label?: string;
    wrapperClassName?: string;
    onDateChange?: (date: string) => void;
}

export const NeuralDatePicker = React.forwardRef<HTMLInputElement, NeuralDatePickerProps>(
    ({ className, wrapperClassName, label, onDateChange, ...props }, ref) => {
        const [isFocused, setIsFocused] = React.useState(false);

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            onDateChange?.(e.target.value);
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
                    className={cn(
                        "relative flex items-center bg-zinc-900/50 border border-zinc-800/50 rounded-lg shadow-sm backdrop-blur-sm transition-all duration-200",
                        "group-hover:border-zinc-700/50 group-hover:bg-zinc-900/70",
                        isFocused && "border-emerald-500/50 ring-2 ring-emerald-500/10 bg-zinc-950/80"
                    )}
                >
                    <div className={cn(
                        "absolute left-3 text-zinc-500 transition-colors",
                        isFocused && "text-emerald-400"
                    )}>
                        <Calendar size={16} />
                    </div>
                    <input
                        ref={ref}
                        type="date"
                        onChange={handleChange}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        className={cn(
                            "w-full bg-transparent pl-10 pr-3 py-2.5 text-sm text-zinc-100 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
                            "[&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-3 [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:w-4 [&::-webkit-calendar-picker-indicator]:h-4",
                            className
                        )}
                        {...props}
                    />
                </motion.div>
            </div>
        );
    }
);
NeuralDatePicker.displayName = "NeuralDatePicker";
