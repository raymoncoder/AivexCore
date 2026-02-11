"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface NeuralProgressProps {
    value?: number;
    max?: number;
    className?: string;
    showValue?: boolean;
    color?: string; // Base color name like "emerald", "blue", "indigo"
    variant?: "default" | "gradient" | "glass";
}

export const NeuralProgress = ({
    value = 0,
    max = 100,
    className,
    showValue = false,
    color = "emerald",
    variant = "default"
}: NeuralProgressProps) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    const getColors = () => {
        switch (color) {
            case "blue": return { bg: "bg-blue-500", glow: "shadow-[0_0_15px_-3px_rgba(59,130,246,0.5)]", gradient: "from-blue-600 via-blue-400 to-blue-600" };
            case "purple": return { bg: "bg-purple-500", glow: "shadow-[0_0_15px_-3px_rgba(168,85,247,0.5)]", gradient: "from-purple-600 via-purple-400 to-purple-600" };
            case "amber": return { bg: "bg-amber-500", glow: "shadow-[0_0_15px_-3px_rgba(245,158,11,0.5)]", gradient: "from-amber-600 via-amber-400 to-amber-600" };
            case "rose": return { bg: "bg-rose-500", glow: "shadow-[0_0_15px_-3px_rgba(244,63,94,0.5)]", gradient: "from-rose-600 via-rose-400 to-rose-600" };
            default: return { bg: "bg-emerald-500", glow: "shadow-[0_0_15px_-3px_rgba(16,185,129,0.5)]", gradient: "from-emerald-600 via-emerald-400 to-emerald-600" };
        }
    };

    const style = getColors();

    return (
        <div className="w-full space-y-2">
            <div className={cn(
                "relative w-full h-2.5 rounded-full bg-zinc-900/50 border border-white/[0.03] backdrop-blur-sm overflow-hidden",
                className
            )}>
                {/* Progress bar background pattern */}
                <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(45deg,rgba(255,255,255,1)_25%,transparent_25%,transparent_50%,rgba(255,255,255,1)_50%,rgba(255,255,255,1)_75%,transparent_75%,transparent)] bg-[size:10px_10px]" />

                <motion.div
                    className={cn(
                        "absolute h-full left-0 top-0 rounded-full z-10",
                        style.bg,
                        style.glow,
                        variant === "gradient" && `bg-gradient-to-r ${style.gradient} bg-[length:200%_100%]`
                    )}
                    initial={{ width: 0 }}
                    animate={{
                        width: `${percentage}%`,
                        backgroundPosition: variant === "gradient" ? ["0% 0%", "200% 0%"] : "0% 0%"
                    }}
                    transition={{
                        width: { duration: 1, ease: "circOut" },
                        backgroundPosition: { duration: 3, repeat: Infinity, ease: "linear" }
                    }}
                >
                    {/* Animated Shine Effect */}
                    <motion.div
                        initial={{ left: "-100%" }}
                        animate={{ left: "100%" }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 0.5 }}
                        className="absolute top-0 bottom-0 w-24 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                    />
                </motion.div>
            </div>
            {showValue && (
                <div className="flex justify-between items-center px-1">
                    <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold font-onest">Status</span>
                    <span className="text-[10px] font-mono text-zinc-300 bg-zinc-900 px-1.5 py-0.5 rounded border border-white/5 shadow-sm">
                        {Math.round(percentage)}%
                    </span>
                </div>
            )}
        </div>
    );
};
