"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ArrowDownRight, MoreHorizontal, Calendar, Activity } from "lucide-react";
import { NeuralCard, NeuralCardHeader, NeuralCardTitle, NeuralCardContent } from "@/components/ui/core/NeuralCard";
import { NeuralButton } from "@/components/ui/core/NeuralButton";
import { NeuralBadge } from "@/components/ui/core/NeuralBadge";
import { cn } from "@/lib/utils";

const dataPoints = [30, 45, 35, 55, 45, 70, 60, 75, 50, 90, 80, 100]; // Mock data 0-100

export const AnalyticsCard = () => {
    const [view, setView] = useState<"weekly" | "monthly">("weekly");
    const [hoverIndex, setHoverIndex] = useState<number | null>(null);

    // Generate SVG path for the chart
    const width = 300;
    const height = 100;
    const stepX = width / (dataPoints.length - 1);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const index = Math.round(x / (rect.width / (dataPoints.length - 1)));
        if (index >= 0 && index < dataPoints.length) {
            setHoverIndex(index);
        }
    };

    return (
        <NeuralCard className="w-full max-w-lg bg-zinc-950/80 border-zinc-800/50 backdrop-blur-xl ring-1 ring-white/5 relative overflow-hidden group">
            {/* Top Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent opacity-50" />

            <NeuralCardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                    <NeuralCardTitle className="text-zinc-100 font-medium tracking-tight">Revenue</NeuralCardTitle>
                    <p className="text-xs text-zinc-500 font-mono mt-1">Real-time overview</p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => setView("weekly")}
                        className={cn(
                            "px-2 py-1 rounded-md text-xs font-medium transition-colors font-sans",
                            view === "weekly" ? "bg-zinc-800 text-zinc-100" : "text-zinc-500 hover:text-zinc-300"
                        )}
                    >
                        Weekly
                    </button>
                    <button
                        onClick={() => setView("monthly")}
                        className={cn(
                            "px-2 py-1 rounded-md text-xs font-medium transition-colors font-sans",
                            view === "monthly" ? "bg-zinc-800 text-zinc-100" : "text-zinc-500 hover:text-zinc-300"
                        )}
                    >
                        Monthly
                    </button>
                </div>
            </NeuralCardHeader>

            <NeuralCardContent className="space-y-6">
                {/* Big Number */}
                <div className="flex items-end gap-3">
                    <h2 className="text-4xl font-bold text-zinc-50 font-mono">
                        $45,231.89
                    </h2>
                    <NeuralBadge status="success" variant="soft" dot className="mb-1.5 font-mono">
                        +12.5%
                    </NeuralBadge>
                </div>

                {/* Chart Area */}
                <div
                    className="relative h-[160px] w-full mt-4 group/chart px-1 cursor-crosshair"
                    onMouseMove={handleMouseMove}
                    onMouseLeave={() => setHoverIndex(null)}
                >
                    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible" preserveAspectRatio="none">
                        <defs>
                            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
                                <stop offset="50%" stopColor="#10b981" stopOpacity="0.1" />
                                <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                            </linearGradient>
                            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                                <feGaussianBlur stdDeviation="3" result="blur" />
                                <feComposite in="SourceGraphic" in2="blur" operator="over" />
                            </filter>
                        </defs>

                        {/* Grid Lines */}
                        {[0, 25, 50, 75, 100].map((v) => (
                            <line
                                key={v}
                                x1="0"
                                y1={height - (v / 100) * height}
                                x2={width}
                                y2={height - (v / 100) * height}
                                stroke="white"
                                strokeOpacity="0.03"
                                strokeWidth="1"
                            />
                        ))}
                        {[0, 25, 50, 75, 100].map((v) => (
                            <line
                                key={v}
                                x1={(v / 100) * width}
                                y1="0"
                                x2={(v / 100) * width}
                                y2={height}
                                stroke="white"
                                strokeOpacity="0.03"
                                strokeWidth="1"
                            />
                        ))}

                        {/* Area Fill - Smoothed */}
                        <motion.path
                            d={(() => {
                                const path = dataPoints.reduce((acc, val, i, arr) => {
                                    const x = i * stepX;
                                    const y = height - (val / 100) * height;
                                    if (i === 0) return `M ${x},${y}`;
                                    const prevX = (i - 1) * stepX;
                                    const prevY = height - (arr[i - 1] / 100) * height;
                                    const cp1x = prevX + (x - prevX) / 2;
                                    return `${acc} C ${cp1x},${prevY} ${cp1x},${y} ${x},${y}`;
                                }, "");
                                return `${path} L ${width},${height} L 0,${height} Z`;
                            })()}
                            fill="url(#chartGradient)"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1 }}
                        />

                        {/* Line Stroke - Smoothed (TradingView Style) */}
                        <motion.path
                            d={dataPoints.reduce((acc, val, i, arr) => {
                                const x = i * stepX;
                                const y = height - (val / 100) * height;
                                if (i === 0) return `M ${x},${y}`;
                                const prevX = (i - 1) * stepX;
                                const prevY = height - (arr[i - 1] / 100) * height;
                                const cp1x = prevX + (x - prevX) / 2;
                                return `${acc} C ${cp1x},${prevY} ${cp1x},${y} ${x},${y}`;
                            }, "")}
                            fill="none"
                            stroke="#10b981"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            filter="url(#glow)"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 2, ease: "easeInOut" }}
                        />

                        {/* Active Point Highlight (Only on hover) */}
                        {hoverIndex !== null && (
                            <motion.circle
                                cx={hoverIndex * stepX}
                                cy={height - (dataPoints[hoverIndex] / 100) * height}
                                r="3"
                                fill="#fff"
                                stroke="#10b981"
                                strokeWidth="2"
                                className="drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                            />
                        )}
                    </svg>

                    {/* Interactive tracker */}
                    <AnimatePresence>
                        {hoverIndex !== null && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 pointer-events-none"
                            >
                                <motion.div
                                    className="absolute top-0 h-full w-[1px] bg-emerald-500/20"
                                    animate={{ left: `${(hoverIndex / (dataPoints.length - 1)) * 100}%` }}
                                    transition={{ type: "spring", bounce: 0, duration: 0.2 }}
                                >
                                    {/* Tooltip */}
                                    <div
                                        className="absolute -translate-x-1/2 bg-zinc-900 border border-emerald-500/20 rounded-xl px-3 py-2 text-[11px] text-zinc-100 shadow-2xl ring-1 ring-white/10 z-50 min-w-[120px]"
                                        style={{
                                            top: `calc(${height - (dataPoints[hoverIndex] / 100) * height}% - 64px)`,
                                        }}
                                    >
                                        <div className="flex flex-col gap-1">
                                            <div className="flex items-center justify-between gap-4">
                                                <span className="text-zinc-500 font-medium">Revenue</span>
                                                <span className="text-emerald-400 font-bold font-mono text-[11px]">
                                                    ${(dataPoints[hoverIndex] * 452.31).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between text-[10px]">
                                                <span className="text-zinc-500">Date</span>
                                                <span className="text-zinc-400 font-mono">Feb {hoverIndex + 10}, 2024</span>
                                            </div>
                                        </div>
                                        {/* Tooltip Corner */}
                                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-zinc-900 border-r border-b border-emerald-500/20 rotate-45" />
                                    </div>

                                    {/* Dot Indicator */}
                                    <div
                                        className="absolute -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-emerald-500 rounded-full shadow-[0_0_20px_rgba(16,185,129,0.8)] ring-4 ring-zinc-950 flex items-center justify-center z-10"
                                        style={{ top: `${height - (dataPoints[hoverIndex] / 100) * height}%` }}
                                    >
                                        <div className="w-1.5 h-1.5 bg-white rounded-full" />
                                    </div>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Recent Transactions List */}
                <div className="space-y-3 pt-2">
                    <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider font-sans">Recent Activity</h4>
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center justify-between p-2 rounded-lg hover:bg-zinc-900/50 transition-colors group/item">
                            <div className="flex items-center gap-3">
                                <div className={cn(
                                    "w-8 h-8 rounded-full flex items-center justify-center border",
                                    i === 2 ? "bg-rose-500/10 border-rose-500/20 text-rose-500" : "bg-emerald-500/10 border-emerald-500/20 text-emerald-500"
                                )}>
                                    {i === 2 ? <ArrowDownRight size={14} /> : <ArrowUpRight size={14} />}
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-zinc-200 font-sans">
                                        {i === 2 ? "AWS Infrastructure" : i === 1 ? "Stripe Settlement" : "Enterprise Plan"}
                                    </p>
                                    <p className="text-xs text-zinc-500 font-mono">Today, 2:34 PM</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className={cn("text-sm font-medium font-mono", i === 2 ? "text-zinc-100" : "text-emerald-400")}>
                                    {i === 2 ? "-$240.00" : "+$1,250.00"}
                                </p>
                                <div className="opacity-0 group-hover/item:opacity-100 transition-opacity">
                                    <MoreHorizontal size={14} className="text-zinc-600 ml-auto cursor-pointer hover:text-zinc-300" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </NeuralCardContent>
        </NeuralCard>
    );
};
