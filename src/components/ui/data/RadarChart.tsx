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

    // Calculate background grid levels
    const gridLevels = [0.25, 0.5, 0.75, 1];

    return (
        <div className={cn("relative flex items-center justify-center p-4", className)}>
            <svg width={size} height={size} className="overflow-visible">
                <defs>
                    <linearGradient id="radarGradient" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#059669" stopOpacity="0.1" />
                    </linearGradient>
                    <filter id="radarGlow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="4" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                </defs>

                {/* Background Grid - Circular/Polygonal */}
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
                            fill="transparent"
                            stroke="white"
                            strokeOpacity={0.05 + level * 0.05}
                            strokeWidth="1"
                            strokeDasharray={idx === 3 ? "none" : "2,2"}
                        />
                    );
                })}

                {/* Axis lines - radiating from center */}
                {Array.from({ length: numMetrics }).map((_, i) => {
                    const angle = (Math.PI * 2 * i) / numMetrics - Math.PI / 2;
                    return (
                        <line
                            key={i}
                            x1={center}
                            y1={center}
                            x2={center + Math.cos(angle) * radius}
                            y2={center + Math.sin(angle) * radius}
                            stroke="white"
                            strokeOpacity="0.08"
                            strokeWidth="1"
                        />
                    );
                })}

                {/* Main Data Shape */}
                <motion.path
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    d={pathData}
                    fill="url(#radarGradient)"
                    stroke="#10b981"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                    filter="url(#radarGlow)"
                    className="drop-shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                />

                {/* Vertex Points (Glowy Dots) */}
                {points.map((p, i) => (
                    <motion.circle
                        key={i}
                        cx={p.x}
                        cy={p.y}
                        r="2.2"
                        fill="#064e3b"
                        stroke="#34d399"
                        strokeWidth="1"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5 + i * 0.1 }}
                        className="filter drop-shadow-[0_0_5px_rgba(52,211,153,0.8)]"
                    />
                ))}

                {/* Labels with enhanced positioning */}
                {metrics.map((m, i) => {
                    const angle = (Math.PI * 2 * i) / numMetrics - Math.PI / 2;
                    const x = center + Math.cos(angle) * (radius + 32);
                    const y = center + Math.sin(angle) * (radius + 32);
                    return (
                        <g key={i}>
                            <text
                                x={x}
                                y={y}
                                textAnchor="middle"
                                dominantBaseline="middle"
                                className="text-[10px] font-black fill-zinc-200 uppercase tracking-[0.2em] font-sans"
                            >
                                {m.label}
                            </text>
                            <text
                                x={x}
                                y={y + 12}
                                textAnchor="middle"
                                dominantBaseline="middle"
                                className="text-[9px] font-mono fill-emerald-500/70 font-bold"
                            >
                                {m.value}%
                            </text>
                        </g>
                    );
                })}
            </svg>
        </div>
    );
};
