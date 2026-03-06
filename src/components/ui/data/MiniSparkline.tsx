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

    // Generate smoothed path helper
    const generatePath = (isClosed = false) => {
        let path = "";
        points.forEach((p, i) => {
            if (i === 0) {
                path = `M ${p.x},${p.y}`;
            } else {
                const prev = points[i - 1];
                const cp1x = prev.x + (p.x - prev.x) / 2;
                path += ` C ${cp1x},${prev.y} ${cp1x},${p.y} ${p.x},${p.y}`;
            }
        });
        if (isClosed) {
            path += ` L ${width},${height} L 0,${height} Z`;
        }
        return path;
    };

    const linePath = generatePath();
    const areaPath = generatePath(true);

    return (
        <div className={cn("relative inline-block group/spark", className)} style={{ width, height }}>
            <svg width={width} height={height} className="overflow-visible" preserveAspectRatio="none">
                <defs>
                    <linearGradient id={`spark-grad-${color}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={color} stopOpacity="0.3" />
                        <stop offset="100%" stopColor={color} stopOpacity="0" />
                    </linearGradient>
                    <filter id={`spark-glow-${color}`} x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="1.5" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                </defs>

                {/* Area under the line */}
                <motion.path
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    d={areaPath}
                    fill={`url(#spark-grad-${color})`}
                />

                {/* The line itself - Smoothed */}
                <motion.path
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                    d={linePath}
                    fill="transparent"
                    stroke={color}
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    filter={showGlow ? `url(#spark-glow-${color})` : "none"}
                    className="will-change-[pathLength]"
                />

                {/* End point Highlight */}
                <motion.circle
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1, duration: 0.3 }}
                    cx={points[points.length - 1].x}
                    cy={points[points.length - 1].y}
                    r="1.8"
                    fill="#064e3b"
                    stroke={color}
                    strokeWidth="0.8"
                    className="filter drop-shadow-[0_0_3px_rgba(0,0,0,0.5)]"
                />
            </svg>
        </div>
    );
};
