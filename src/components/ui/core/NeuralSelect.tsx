"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export interface NeuralSelectOption {
    value: string;
    label: string;
    description?: string;
    icon?: React.ReactNode;
}

interface NeuralSelectProps {
    options: NeuralSelectOption[];
    onValueChange: (value: string) => void;
    defaultValue?: string;
    placeholder?: string;
    className?: string; // Container class
    triggerClassName?: string; // Button class
    disabled?: boolean;
    label?: string;
    helpText?: string;
    variant?: "default" | "glass" | "ghost" | "neon";
}

export const NeuralSelect = ({
    options,
    onValueChange,
    defaultValue,
    placeholder = "Select...",
    className,
    triggerClassName,
    disabled,
    label,
    helpText,
    variant = "default"
}: NeuralSelectProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState<NeuralSelectOption | null>(
        options.find((opt) => opt.value === defaultValue) || null
    );
    const ref = useRef<HTMLDivElement>(null);

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

    const variants = {
        default: "bg-zinc-900/50 border-zinc-800/50 hover:border-zinc-700/50 hover:bg-zinc-800/60 shadow-sm",
        glass: "bg-white/[0.03] border-white/5 backdrop-blur-xl hover:bg-white/[0.05] hover:border-white/10 shadow-2xl",
        ghost: "bg-transparent border-transparent hover:bg-white/5 hover:border-white/5",
        neon: "bg-emerald-500/5 border-emerald-500/20 hover:border-emerald-500/40 hover:bg-emerald-500/10 shadow-[0_0_20px_rgba(16,185,129,0.05)]"
    };

    return (
        <div className={cn("relative w-full min-w-[180px] space-y-2", className)} ref={ref}>
            {label && (
                <label className="text-[11px] font-mono text-zinc-500 uppercase tracking-[0.2em] font-bold block ml-1">
                    {label}
                </label>
            )}

            <div className="relative">
                <button
                    type="button"
                    onClick={() => !disabled && setIsOpen(!isOpen)}
                    disabled={disabled}
                    className={cn(
                        "w-full flex items-center justify-between px-4 py-2.5 text-sm rounded-xl transition-all duration-300 text-zinc-300 font-sans border",
                        variants[variant],
                        "focus:outline-none focus:ring-2 focus:ring-emerald-500/20",
                        disabled && "opacity-50 cursor-not-allowed",
                        isOpen && (variant === "neon" ? "border-emerald-500/50 bg-emerald-500/10" : "border-zinc-600 bg-zinc-800/80"),
                        triggerClassName
                    )}
                >
                    <div className="flex items-center gap-3 overflow-hidden">
                        {selected?.icon && <span className="text-zinc-500">{selected.icon}</span>}
                        <span className={cn("truncate", !selected && "text-zinc-500")}>
                            {selected ? selected.label : placeholder}
                        </span>
                    </div>
                    <ChevronDown
                        size={16}
                        className={cn(
                            "text-zinc-50 transition-transform duration-300 ease-out flex-shrink-0 opacity-40",
                            isOpen && "rotate-180 opacity-100 text-emerald-400"
                        )}
                    />
                </button>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -10, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.98 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className={cn(
                                "absolute z-[100] w-full mt-2 border rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden p-1.5",
                                variant === "neon" ? "bg-zinc-950 border-emerald-500/20" : "bg-zinc-950/95 backdrop-blur-2xl border-zinc-800"
                            )}
                        >
                            <div className="max-h-60 overflow-y-auto scrollbar-none space-y-1">
                                {options.map((option) => (
                                    <div
                                        key={option.value}
                                        onClick={() => handleSelect(option)}
                                        className={cn(
                                            "group flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-200 font-sans",
                                            "hover:bg-zinc-800/80 hover:translate-x-1",
                                            selected?.value === option.value
                                                ? "bg-emerald-500/10 text-emerald-400"
                                                : "text-zinc-400 hover:text-zinc-100"
                                        )}
                                    >
                                        {option.icon && (
                                            <div className={cn(
                                                "flex-shrink-0 transition-colors",
                                                selected?.value === option.value ? "text-emerald-400" : "text-zinc-600 group-hover:text-zinc-400"
                                            )}>
                                                {option.icon}
                                            </div>
                                        )}
                                        <div className="flex flex-col flex-1 overflow-hidden text-left">
                                            <span className="text-sm font-medium truncate">{option.label}</span>
                                            {option.description && (
                                                <span className="text-[11px] text-zinc-500 truncate group-hover:text-zinc-400 transition-colors">
                                                    {option.description}
                                                </span>
                                            )}
                                        </div>
                                        {selected?.value === option.value && (
                                            <motion.div layoutId="select-indicator">
                                                <Check size={14} className="text-emerald-500" />
                                            </motion.div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {helpText && (
                <p className="text-[11px] text-zinc-600 font-sans leading-relaxed ml-1">
                    {helpText}
                </p>
            )}
        </div>
    );
};
