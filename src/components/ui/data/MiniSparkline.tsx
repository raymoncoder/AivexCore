"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface DataPoint {
    label: string;
    value: number;
}

interface MiniSparklineProps {
    data: DataPoint[];
    width?: number;
    height?: number;
    color?: string;
    className?: string;
    showGlow?: boolean;
}

export const MiniSparkline = ({
    data,
    width = 120,
    height = 40,
    color = "#10b981", // emerald-500
    className,
    showGlow = true
}: MiniSparklineProps) => {
    if (data.length < 2) return null;

    const values = data.map(d => d.value);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = max - min || 1;

    const points = data.map((d, i) => ({
        x: (i / (data.length - 1)) * width,
        y: height - ((d.value - min) / range) * height
    }));

    const pathData = `M ${points.map(p => `${p.x},${p.y}`).join(" L ")}`;

    // Create an area path that goes to the bottom
    const areaData = `${pathData} L ${width},${height} L 0,${height} Z`;

    return (
        <div className={cn("relative inline-block", className)} style={{ width, height }}>
            <svg width={width} height={height} className="overflow-visible">
                <defs>
                    <linearGradient id="sparkline-gradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={color} stopOpacity="0.2" />
                        <stop offset="100%" stopColor={color} stopOpacity="0" />
                    </linearGradient>
                    <filter id="glow">
                        <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Area under the line */}
                <motion.path
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    d={areaData}
                    fill="url(#sparkline-gradient)"
                />

                {/* The line itself */}
                <motion.path
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    d={pathData}
                    fill="transparent"
                    stroke={color}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ filter: showGlow ? "url(#glow)" : "none" }}
                />

                {/* Last point dot */}
                <motion.circle
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1.2, duration: 0.3 }}
                    cx={points[points.length - 1].x}
                    cy={points[points.length - 1].y}
                    r="3"
                    fill={color}
                    className="shadow-sm"
                />
            </svg>
        </div>
    );
};
