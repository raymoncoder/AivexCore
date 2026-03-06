"use client";

import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Activity, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";

interface TokenPerformanceProps {
    symbol: string;
    name: string;
    price: number;
    change24h: number;
    volume24h: string;
    marketCap: string;
    iconComponent?: React.ElementType;
    className?: string;
}

export const TokenPerformance = ({
    symbol,
    name,
    price,
    change24h,
    volume24h,
    marketCap,
    iconComponent: IconComponent,
    className
}: TokenPerformanceProps) => {
    const isPositive = change24h > 0;

    return (
        <div className={cn(
            "group relative p-6 rounded-[2rem] bg-zinc-950 border border-zinc-800/80 shadow-2xl overflow-hidden hover:border-zinc-700 transition-all duration-500",
            className
        )}>
            {/* Background Accent */}
            <div className={cn(
                "absolute -right-8 -top-8 w-32 h-32 blur-[80px] opacity-20 transition-opacity duration-500 group-hover:opacity-30",
                isPositive ? "bg-emerald-500" : "bg-rose-500" // Use full CSS class names instead of hex
            )} />

            <div className="relative z-10 flex flex-col gap-6">
                {/* Header: Identity */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700 flex items-center justify-center font-bold text-white shadow-lg overflow-hidden">
                            {IconComponent ? <IconComponent className="w-6 h-6 rounded-full" /> : symbol[0]}
                        </div>
                        <div className="flex flex-col">
                            <h3 className="text-sm font-bold text-white uppercase tracking-wider">{name}</h3>
                            <span className="text-[10px] font-mono text-zinc-500">{symbol}/USDT</span>
                        </div>
                    </div>
                    <div className={cn(
                        "flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold border",
                        isPositive
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                            : "bg-rose-500/10 text-rose-400 border-rose-500/20"
                    )}>
                        {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                        {isPositive ? "+" : ""}{change24h}%
                    </div>
                </div>

                {/* Main Price */}
                <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">Live Price</span>
                    <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold font-mono text-white tabular-nums tracking-tighter">
                            ${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                    </div>
                </div>

                {/* Secondary Metrics */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5 p-3 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
                        <div className="flex items-center gap-1.5 text-zinc-500">
                            <BarChart3 size={10} />
                            <span className="text-[8px] font-mono uppercase tracking-tight">Volume 24h</span>
                        </div>
                        <span className="text-xs font-mono text-zinc-300 font-bold">{volume24h}</span>
                    </div>
                    <div className="flex flex-col gap-1.5 p-3 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
                        <div className="flex items-center gap-1.5 text-zinc-500">
                            <Activity size={10} />
                            <span className="text-[8px] font-mono uppercase tracking-tight">Market Cap</span>
                        </div>
                        <span className="text-xs font-mono text-zinc-300 font-bold">{marketCap}</span>
                    </div>
                </div>

                {/* Fake Sparkline / Visual Element */}
                <div className="h-10 w-full flex items-end gap-[2px] opacity-40 group-hover:opacity-100 transition-opacity duration-700">
                    {[40, 70, 45, 90, 65, 80, 50, 60, 85, 40, 55, 75, 95, 60, 45, 70, 85, 90, 50, 65].map((h, i) => (
                        <motion.div
                            key={i}
                            initial={{ height: 0 }}
                            animate={{ height: `${h}%` }}
                            transition={{ delay: i * 0.02, duration: 0.5 }}
                            className={cn(
                                "flex-1 rounded-full",
                                isPositive ? "bg-emerald-500/30" : "bg-rose-500/30"
                            )}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};
