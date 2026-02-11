"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface Metric {
    label: string;
    value: number;
    max: number;
    color?: string;
}

interface RadarChartProps {
    metrics: Metric[];
    size?: number;
    className?: string;
}

export const RadarChart = ({
    metrics,
    size = 200,
    className
}: RadarChartProps) => {
    const center = size / 2;
    const radius = size * 0.4;
    const numMetrics = metrics.length;

    // Calculate coordinates for polygon
    const points = metrics.map((m, i) => {
        const angle = (Math.PI * 2 * i) / numMetrics - Math.PI / 2;
        const dist = (m.value / m.max) * radius;
        return {
            x: center + Math.cos(angle) * dist,
            y: center + Math.sin(angle) * dist
        };
    });

    const pathData = `M ${points.map(p => `${p.x},${p.y}`).join(" L ")} Z`;

    // Calculate background grid lines
    const gridLevels = [0.25, 0.5, 0.75, 1];

    return (
        <div className={cn("relative flex items-center justify-center", className)}>
            <svg width={size} height={size} className="overflow-visible">
                {/* Background Grid */}
                {gridLevels.map((level, idx) => {
                    const gridPoints = Array.from({ length: numMetrics }).map((_, i) => {
                        const angle = (Math.PI * 2 * i) / numMetrics - Math.PI / 2;
                        const dist = level * radius;
                        return `${center + Math.cos(angle) * dist},${center + Math.sin(angle) * dist}`;
                    });
                    return (
                        <polygon
                            key={idx}
                            points={gridPoints.join(" ")}
                            fill="rgba(255,255,255,0.03)"
                            stroke="rgba(255,255,255,0.12)"
                            strokeWidth="1"
                        />
                    );
                })}

                {/* Axis lines */}
                {Array.from({ length: numMetrics }).map((_, i) => {
                    const angle = (Math.PI * 2 * i) / numMetrics - Math.PI / 2;
                    return (
                        <line
                            key={i}
                            x1={center}
                            y1={center}
                            x2={center + Math.cos(angle) * radius}
                            y2={center + Math.sin(angle) * radius}
                            stroke="rgba(255,255,255,0.12)"
                            strokeWidth="1"
                        />
                    );
                })}

                {/* Animated Data Shape */}
                <motion.path
                    initial={{ pathLength: 0, opacity: 0, scale: 0.8 }}
                    animate={{ pathLength: 1, opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    d={pathData}
                    fill="rgba(16, 185, 129, 0.2)"
                    stroke="#10b981"
                    strokeWidth="2.5"
                    strokeLinejoin="round"
                    className="drop-shadow-[0_0_12px_rgba(16,185,129,0.4)]"
                />

                {/* Labels */}
                {metrics.map((m, i) => {
                    const angle = (Math.PI * 2 * i) / numMetrics - Math.PI / 2;
                    const x = center + Math.cos(angle) * (radius + 24);
                    const y = center + Math.sin(angle) * (radius + 24);
                    return (
                        <text
                            key={i}
                            x={x}
                            y={y}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            className="text-[11px] font-semibold fill-zinc-400 uppercase tracking-[0.15em] font-sans"
                        >
                            {m.label}
                        </text>
                    );
                })}
            </svg>
        </div>
    );
};
