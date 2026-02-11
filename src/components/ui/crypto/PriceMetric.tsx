"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface PriceMetricProps {
    label: string;
    value: number;
    symbol?: string;
    currency?: string;
    change24h?: number;
    className?: string;
}

export const PriceMetric = ({
    label,
    value,
    symbol,
    currency = "$",
    change24h,
    className
}: PriceMetricProps) => {
    const [prevValue, setPrevValue] = useState(value);
    const [pulseColor, setPulseColor] = useState<"none" | "up" | "down">("none");
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (value > prevValue) {
            setPulseColor("up");
        } else if (value < prevValue) {
            setPulseColor("down");
        }

        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => setPulseColor("none"), 1000);

        setPrevValue(value);
    }, [value]);

    return (
        <div className={cn(
            "relative p-5 rounded-3xl bg-zinc-950 border border-zinc-800/80 shadow-xl overflow-hidden group hover:border-zinc-700 transition-all duration-500",
            className
        )}>
            {/* Dynamic Background Glow on Change */}
            <AnimatePresence>
                {pulseColor !== "none" && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 0.15, scale: 1.2 }}
                        exit={{ opacity: 0, scale: 1.5 }}
                        className={cn(
                            "absolute inset-0 blur-3xl pointer-events-none",
                            pulseColor === "up" ? "bg-emerald-500" : "bg-rose-500"
                        )}
                        transition={{ duration: 0.5 }}
                    />
                )}
            </AnimatePresence>

            <div className="relative z-10 flex flex-col gap-3">
                {/* Label & Type */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
                        <h4 className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">{label}</h4>
                    </div>
                    {symbol && (
                        <span className="text-[10px] font-mono text-zinc-600 bg-white/5 px-2 py-0.5 rounded border border-white/5">
                            {symbol}
                        </span>
                    )}
                </div>

                {/* Value Display */}
                <div className="flex flex-col">
                    <div className="flex items-baseline gap-1">
                        <span className="text-zinc-500 font-mono text-lg font-light">{currency}</span>
                        <motion.span
                            key={value}
                            initial={{ opacity: 0.5, y: -2 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={cn(
                                "text-3xl font-bold font-mono tracking-tighter tabular-nums transition-colors duration-500",
                                pulseColor === "up" ? "text-emerald-400" : pulseColor === "down" ? "text-rose-400" : "text-white"
                            )}
                        >
                            {value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </motion.span>
                    </div>

                    {/* Change Indicator */}
                    {change24h !== undefined && (
                        <div className="flex items-center gap-1.5 mt-1">
                            <div className={cn(
                                "flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[10px] font-mono font-bold",
                                change24h > 0 ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                            )}>
                                {change24h > 0 ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                                {Math.abs(change24h)}%
                            </div>
                            <span className="text-[9px] font-sans text-zinc-600 uppercase tracking-wide">24h Change</span>
                        </div>
                    )}
                </div>

                {/* Mini Infrastructure Details */}
                <div className="grid grid-cols-2 gap-2 mt-2 pt-3 border-t border-zinc-900">
                    <div className="flex flex-col">
                        <span className="text-[8px] font-mono text-zinc-600 uppercase tracking-tighter text-center">Volume</span>
                        <span className="text-[10px] font-mono text-zinc-300 text-center">4.2M</span>
                    </div>
                    <div className="flex flex-col border-l border-zinc-900">
                        <span className="text-[8px] font-mono text-zinc-600 uppercase tracking-tighter text-center">Nodes</span>
                        <span className="text-[10px] font-mono text-zinc-300 text-center">1,204</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
