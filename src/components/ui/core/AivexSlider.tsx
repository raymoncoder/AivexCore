"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { motion, useMotionValue, useTransform } from "framer-motion";

interface AivexSliderProps extends React.InputHTMLAttributes<HTMLInputElement> {
    min: number;
    max: number;
    step?: number;
    label?: string;
    onValueChange?: (value: number) => void;
}

export const AivexSlider = React.forwardRef<HTMLInputElement, AivexSliderProps>(
    ({ className, min, max, step = 1, label, value, defaultValue, onValueChange, ...props }, ref) => {
        const [internalValue, setInternalValue] = React.useState<number>(
            value !== undefined ? (value as number) : (defaultValue as number) || min
        );

        React.useEffect(() => {
            if (value !== undefined) {
                setInternalValue(value as number);
            }
        }, [value]);

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const num = parseFloat(e.target.value);
            if (value === undefined) {
                setInternalValue(num);
            }
            onValueChange?.(num);
            props.onChange?.(e);
        };

        const progress = ((internalValue - min) / (max - min)) * 100;

        return (
            <div className={cn("flex flex-col gap-2 w-full select-none group", className)}>
                {label && (
                    <div className="flex justify-between items-center text-xs text-zinc-400 font-medium font-sans">
                        <span>{label}</span>
                        <span className="font-mono text-zinc-100">{internalValue}</span>
                    </div>
                )}

                <div className="relative h-6 flex items-center">
                    {/* Track Background */}
                    <div className="absolute inset-x-0 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                        {/* Fill */}
                        <motion.div
                            className="bg-emerald-500 h-full origin-left"
                            style={{ width: `${progress}%` }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                    </div>

                    {/* Thumb (Visual Only - follows progress) */}
                    <motion.div
                        className="absolute h-4 w-4 bg-zinc-100 rounded-full border border-zinc-300 shadow-md flex items-center justify-center top-1/2 -translate-y-1/2 pointer-events-none z-10"
                        style={{ left: `calc(${progress}% - 8px)` }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                    </motion.div>

                    {/* Actual Input */}
                    <input
                        type="range"
                        ref={ref}
                        min={min}
                        max={max}
                        step={step}
                        value={internalValue}
                        onChange={handleChange}
                        className="absolute inset-0 w-full opacity-0 cursor-pointer z-20"
                        {...props}
                    />
                </div>
            </div>
        );
    }
);
AivexSlider.displayName = "AivexSlider";
