"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface NeuralMarqueeProps {
    children: React.ReactNode;
    direction?: "left" | "right" | "up" | "down";
    speed?: number;
    pauseOnHover?: boolean;
    className?: string;
    gap?: string;
}

export const NeuralMarquee = ({
    children,
    direction = "left",
    speed = 40,
    pauseOnHover = true,
    className,
    gap = "2rem"
}: NeuralMarqueeProps) => {
    const isVertical = direction === "up" || direction === "down";

    return (
        <div
            className={cn(
                "group relative flex overflow-hidden",
                isVertical ? "flex-col h-full items-center" : "flex-row w-full items-center",
                className
            )}
            style={{
                maskImage: isVertical
                    ? "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)"
                    : "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
                WebkitMaskImage: isVertical
                    ? "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)"
                    : "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
            }}
        >
            <motion.div
                className={cn(
                    "flex shrink-0",
                    isVertical ? "flex-col items-center" : "flex-row items-center"
                )}
                style={{ gap }}
                animate={{
                    x: direction === "left" ? ["0%", "-50%"] : direction === "right" ? ["-50%", "0%"] : 0,
                    y: direction === "up" ? ["0%", "-50%"] : direction === "down" ? ["-50%", "0%"] : 0,
                }}
                transition={{
                    duration: speed,
                    repeat: Infinity,
                    ease: "linear",
                }}
                {...(pauseOnHover && {
                    whileHover: {
                        transition: { duration: 0.8, ease: "easeOut" }
                    },
                })}
            >
                {/* Duplicate children for seamless scroll */}
                <div className={cn("flex shrink-0", isVertical ? "flex-col items-center" : "flex-row items-center")} style={{ gap }}>
                    {children}
                </div>
                <div className={cn("flex shrink-0", isVertical ? "flex-col items-center" : "flex-row items-center")} style={{ gap }}>
                    {children}
                </div>
            </motion.div>

            {/* Depth Gradients & Glow */}
            <div className={cn(
                "absolute inset-0 pointer-events-none transition-opacity duration-500",
                "bg-[radial-gradient(circle_at_50%_0%,rgba(16,185,129,0.05)_0%,transparent_50%),radial-gradient(circle_at_50%_100%,rgba(16,185,129,0.05)_0%,transparent_50%)]",
                !isVertical && "bg-[radial-gradient(circle_at_0%_50%,rgba(16,185,129,0.05)_0%,transparent_50%),radial-gradient(circle_at_100%_50%,rgba(16,185,129,0.05)_0%,transparent_50%)]"
            )} />
        </div>
    );
};
