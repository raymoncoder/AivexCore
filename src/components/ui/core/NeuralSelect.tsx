"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface NeuralSelectOption {
    value: string;
    label: string;
}

interface NeuralSelectProps {
    options: NeuralSelectOption[];
    onValueChange: (value: string) => void;
    defaultValue?: string;
    placeholder?: string;
    className?: string; // Container class
    triggerClassName?: string; // Button class
    disabled?: boolean;
}

export const NeuralSelect = ({ options, onValueChange, defaultValue, placeholder = "Select...", className, triggerClassName, disabled }: NeuralSelectProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState<NeuralSelectOption | null>(
        options.find((opt) => opt.value === defaultValue) || null
    );
    const ref = useRef<HTMLDivElement>(null);

    // Close on click outside
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    const handleSelect = (option: NeuralSelectOption) => {
        setSelected(option);
        onValueChange(option.value);
        setIsOpen(false);
    };

    return (
        <div className={cn("relative w-full min-w-[180px]", className)} ref={ref}>
            <button
                onClick={() => !disabled && setIsOpen(!isOpen)}
                disabled={disabled}
                className={cn(
                    "w-full flex items-center justify-between px-3 py-2 text-sm bg-zinc-900/50 border border-zinc-800/50 rounded-lg shadow-sm transition-all text-zinc-300 font-sans backdrop-blur-sm",
                    "hover:border-zinc-700/50 hover:bg-zinc-800/60",
                    "focus:outline-none focus:ring-2 focus:ring-zinc-700/30",
                    disabled && "opacity-50 cursor-not-allowed",
                    isOpen && "border-zinc-700/50 bg-zinc-800/70",
                    triggerClassName
                )}
            >
                <span className={cn(!selected && "text-zinc-500")}>
                    {selected ? selected.label : placeholder}
                </span>
                <ChevronDown
                    size={16}
                    className={cn("text-zinc-500 transition-transform duration-200", isOpen && "rotate-180")}
                />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -5 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -5 }}
                        transition={{ duration: 0.1 }}
                        className="absolute z-50 w-full mt-2 bg-zinc-950/90 backdrop-blur-xl border border-zinc-700/50 rounded-lg shadow-2xl overflow-hidden py-1 max-h-60 overflow-y-auto scrollbar-none"
                    >
                        {options.map((option) => (
                            <div
                                key={option.value}
                                onClick={() => handleSelect(option)}
                                className={cn(
                                    "flex items-center justify-between px-3 py-2 text-sm cursor-pointer transition-colors font-sans",
                                    "hover:bg-zinc-800 hover:text-zinc-100",
                                    selected?.value === option.value ? "bg-zinc-800/50 text-zinc-50 font-medium" : "text-zinc-400"
                                )}
                            >
                                <span>{option.label}</span>
                                {selected?.value === option.value && (
                                    <Check size={14} className="text-emerald-500" />
                                )}
                            </div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
