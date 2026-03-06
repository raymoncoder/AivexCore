"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AivexLoaderProps {
    variant?: "spinner" | "dots" | "pulse" | "bars" | "orbit" | "wave";
    size?: "sm" | "md" | "lg";
    color?: string;
    className?: string;
}

const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-10 h-10",
    lg: "w-16 h-16"
};

export const AivexLoader = ({
    variant = "spinner",
    size = "md",
    color = "emerald-500",
    className
}: AivexLoaderProps) => {
    const baseSize = sizeClasses[size];

    if (variant === "spinner") {
        return (
            <div className={cn(baseSize, className)}>
                <motion.div
                    className={cn("w-full h-full rounded-full border-2", `border-${color}/20`)}
                    style={{ borderTopColor: `rgb(var(--color-${color}) / 1)` }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
            </div>
        );
    }

    if (variant === "dots") {
        return (
            <div className={cn("flex gap-2", className)}>
                {[0, 1, 2].map((i) => (
                    <motion.div
                        key={i}
                        className={cn(
                            "rounded-full",
                            size === "sm" && "w-2 h-2",
                            size === "md" && "w-3 h-3",
                            size === "lg" && "w-4 h-4",
                            `bg-${color}`
                        )}
                        animate={{
                            y: [0, -10, 0],
                            opacity: [0.5, 1, 0.5]
                        }}
                        transition={{
                            duration: 0.6,
                            repeat: Infinity,
                            delay: i * 0.2,
                            ease: "easeInOut"
                        }}
                    />
                ))}
            </div>
        );
    }

    if (variant === "pulse") {
        return (
            <motion.div
                className={cn(baseSize, `bg-${color}/20 rounded-full`, className)}
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5]
                }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
        );
    }

    if (variant === "bars") {
        return (
            <div className={cn("flex gap-1 items-end", className)}>
                {[0, 1, 2, 3].map((i) => (
                    <motion.div
                        key={i}
                        className={cn(
                            `bg-${color}`,
                            size === "sm" && "w-1",
                            size === "md" && "w-1.5",
                            size === "lg" && "w-2"
                        )}
                        animate={{
                            height: [
                                size === "sm" ? "8px" : size === "md" ? "16px" : "24px",
                                size === "sm" ? "20px" : size === "md" ? "32px" : "48px",
                                size === "sm" ? "8px" : size === "md" ? "16px" : "24px"
                            ]
                        }}
                        transition={{
                            duration: 0.8,
                            repeat: Infinity,
                            delay: i * 0.15,
                            ease: "easeInOut"
                        }}
                    />
                ))}
            </div>
        );
    }

    if (variant === "orbit") {
        return (
            <div className={cn(baseSize, "relative", className)}>
                <motion.div
                    className="absolute inset-0"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                    {[0, 1, 2].map((i) => (
                        <motion.div
                            key={i}
                            className={cn(
                                `absolute rounded-full bg-${color}`,
                                size === "sm" && "w-1.5 h-1.5",
                                size === "md" && "w-2 h-2",
                                size === "lg" && "w-3 h-3"
                            )}
                            style={{
                                top: "50%",
                                left: "50%",
                                marginTop: "-0.25rem",
                                marginLeft: "-0.25rem"
                            }}
                            animate={{
                                x: Math.cos((i * 2 * Math.PI) / 3) * (size === "sm" ? 12 : size === "md" ? 20 : 32),
                                y: Math.sin((i * 2 * Math.PI) / 3) * (size === "sm" ? 12 : size === "md" ? 20 : 32)
                            }}
                        />
                    ))}
                </motion.div>
            </div>
        );
    }

    if (variant === "wave") {
        return (
            <div className={cn("flex gap-1 items-center", className)}>
                {[0, 1, 2, 3, 4].map((i) => (
                    <motion.div
                        key={i}
                        className={cn(
                            "rounded-full",
                            size === "sm" && "w-1.5 h-1.5",
                            size === "md" && "w-2 h-2",
                            size === "lg" && "w-3 h-3",
                            `bg-${color}`
                        )}
                        animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.5, 1, 0.5]
                        }}
                        transition={{
                            duration: 1,
                            repeat: Infinity,
                            delay: i * 0.1,
                            ease: "easeInOut"
                        }}
                    />
                ))}
            </div>
        );
    }

    return null;
};
