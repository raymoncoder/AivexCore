"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight, MoreHorizontal, Calendar, Activity } from "lucide-react";
import { NeuralCard, NeuralCardHeader, NeuralCardTitle, NeuralCardContent } from "@/components/ui/core/NeuralCard";
import { NeuralButton } from "@/components/ui/core/NeuralButton";
import { NeuralBadge } from "@/components/ui/core/NeuralBadge";
import { cn } from "@/lib/utils";

const dataPoints = [30, 45, 35, 55, 45, 70, 60, 75, 50, 90, 80, 100]; // Mock data 0-100

export const AnalyticsCard = () => {
    const [view, setView] = useState<"weekly" | "monthly">("weekly");

    // Generate SVG path for the chart
    const width = 300;
    const height = 100;
    const stepX = width / (dataPoints.length - 1);

    const points = dataPoints.map((val, i) => {
        const x = i * stepX;
        const y = height - (val / 100) * height; // Invert Y
        return `${x},${y}`;
    }).join(" ");

    // For area fill, we close the path
    const areaPath = `M0,${height} L${points} L${width},${height} Z`;
    const linePath = `M${points.split(" ")[0]} L${points.substring(points.indexOf(" ") + 1)}`;

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
                            "px-2 py-1 rounded-md text-xs font-medium transition-colors font-onest",
                            view === "weekly" ? "bg-zinc-800 text-zinc-100" : "text-zinc-500 hover:text-zinc-300"
                        )}
                    >
                        Weekly
                    </button>
                    <button
                        onClick={() => setView("monthly")}
                        className={cn(
                            "px-2 py-1 rounded-md text-xs font-medium transition-colors font-onest",
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
                    <h2 className="text-4xl font-bold text-zinc-50 font-mono tracking-tighter">
                        $45,231.89
                    </h2>
                    <NeuralBadge status="success" variant="soft" dot className="mb-1.5 font-mono">
                        +12.5%
                    </NeuralBadge>
                </div>

                {/* Chart Area */}
                <div className="relative h-[120px] w-full mt-4 group/chart">
                    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
                        <defs>
                            <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
                                <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                            </linearGradient>
                        </defs>
                        {/* Area Fill */}
                        <motion.path
                            d={areaPath}
                            fill="url(#gradient)"
                            initial={{ opacity: 0, pathLength: 0 }}
                            animate={{ opacity: 1, pathLength: 1 }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                        />
                        {/* Line Stroke */}
                        <motion.path
                            d={linePath}
                            fill="none"
                            stroke="#10b981"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 2, ease: "easeInOut" }}
                        />
                    </svg>
                    {/* Interactive overlay tooltip (Visual only for demo) */}
                    <div className="absolute top-0 right-10 h-full w-[1px] bg-zinc-700/50 opacity-0 group-hover/chart:opacity-100 transition-opacity">
                        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 bg-zinc-900 border border-zinc-700 rounded-md px-2 py-1 text-[10px] text-zinc-100 whitespace-nowrap shadow-xl">
                            $1,230.45
                        </div>
                        <div className="absolute top-3/4 left-1/2 -translate-x-1/2 w-2 h-2 bg-emerald-500 rounded-full ring-4 ring-zinc-950" />
                    </div>
                </div>

                {/* Recent Transactions List */}
                <div className="space-y-3 pt-2">
                    <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider font-onest">Recent Activity</h4>
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
                                    <p className="text-sm font-medium text-zinc-200 font-onest">
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
