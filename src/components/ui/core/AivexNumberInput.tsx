"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";

interface AivexNumberInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
    label?: string;
    wrapperClassName?: string;
    min?: number;
    max?: number;
    step?: number;
    onValueChange?: (value: number) => void;
}

export const AivexNumberInput = React.forwardRef<HTMLInputElement, AivexNumberInputProps>(
    ({ className, wrapperClassName, label, min, max, step = 1, onValueChange, value, ...props }, ref) => {
        const [internalValue, setInternalValue] = React.useState<number>(
            typeof value === "number" ? value : typeof value === "string" ? parseFloat(value) || 0 : 0
        );

        const currentValue = value !== undefined ? (typeof value === "number" ? value : parseFloat(value as string) || 0) : internalValue;

        const handleIncrement = () => {
            const newValue = currentValue + step;
            if (max === undefined || newValue <= max) {
                setInternalValue(newValue);
                onValueChange?.(newValue);
            }
        };

        const handleDecrement = () => {
            const newValue = currentValue - step;
            if (min === undefined || newValue >= min) {
                setInternalValue(newValue);
                onValueChange?.(newValue);
            }
        };

        const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const newValue = parseFloat(e.target.value) || 0;
            setInternalValue(newValue);
            onValueChange?.(newValue);
        };

        return (
            <div className={cn("relative group flex flex-col gap-1.5", wrapperClassName)}>
                {label && (
                    <label className="text-xs font-medium text-zinc-400 group-focus-within:text-zinc-50 transition-colors">
                        {label}
                    </label>
                )}
                <div className="relative flex items-center bg-zinc-900/50 border border-zinc-800/50 rounded-lg shadow-sm backdrop-blur-sm transition-all duration-200 group-hover:border-zinc-700/50 group-focus-within:border-emerald-500/50 group-focus-within:ring-2 group-focus-within:ring-emerald-500/10">
                    <input
                        ref={ref}
                        type="number"
                        value={currentValue}
                        onChange={handleInputChange}
                        min={min}
                        max={max}
                        step={step}
                        className={cn(
                            "w-full bg-transparent px-3 py-2.5 text-sm text-zinc-100 text-center font-mono focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
                            className
                        )}
                        {...props}
                    />
                    <div className="absolute right-1 flex flex-col">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            type="button"
                            onClick={handleIncrement}
                            disabled={max !== undefined && currentValue >= max}
                            className="p-1 rounded hover:bg-emerald-500/10 text-zinc-500 hover:text-emerald-400 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                            <Plus size={12} />
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            type="button"
                            onClick={handleDecrement}
                            disabled={min !== undefined && currentValue <= min}
                            className="p-1 rounded hover:bg-emerald-500/10 text-zinc-500 hover:text-emerald-400 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                            <Minus size={12} />
                        </motion.button>
                    </div>
                </div>
            </div>
        );
    }
);
AivexNumberInput.displayName = "AivexNumberInput";
