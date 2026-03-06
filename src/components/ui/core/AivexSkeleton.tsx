"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface AivexSkeletonProps {
    className?: string;
    variant?: "default" | "pulse";
    style?: React.CSSProperties;
}

/**
 * AivexSkeleton - A refined, minimalistic placeholder component.
 * Supports a subtle shimmer (default) and a soft pulse animation.
 */
export const AivexSkeleton = ({ className, variant = "default", style }: AivexSkeletonProps) => {
    return (
        <div
            className={cn(
                "rounded-lg overflow-hidden relative shadow-[inset_0_1px_4px_rgba(255,255,255,0.02)]",
                variant === "pulse" ? "animate-pulse bg-zinc-900/60" : "bg-zinc-900/40",
                className
            )}
            style={style}
        >
            {variant === "default" && (
                <motion.div
                    initial={{ x: "-100%" }}
                    animate={{ x: "100%" }}
                    transition={{
                        repeat: Infinity,
                        duration: 1.8,
                        ease: "circOut"
                    }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-zinc-800/40 to-transparent shadow-[0_0_20px_rgba(0,0,0,0.2)]"
                />
            )}

            {/* Subtle inner glass-like overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
        </div>
    );
};
