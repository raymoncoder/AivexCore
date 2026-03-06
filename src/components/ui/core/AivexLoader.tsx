"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface AivexLoaderProps {
    className?: string;
    size?: "sm" | "md" | "lg";
    variant?: "spinner" | "dots" | "pulse";
    color?: string;
}

export const AivexLoader = ({ className, size = "md", variant = "spinner", color = "emerald-500" }: AivexLoaderProps) => {
    const sizeClasses = {
        sm: "w-4 h-4",
        md: "w-6 h-6",
        lg: "w-10 h-10",
    };

    if (variant === "spinner") {
        return (
            <motion.div
                className={cn(
                    "rounded-full border-2 border-transparent border-t-emerald-500 border-r-emerald-500",
                    sizeClasses[size],
                    className
                )}
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
        );
    }

    if (variant === "dots") {
        return (
            <div className="flex space-x-1 items-center">
                {[0, 1, 2].map((i) => (
                    <motion.div
                        key={i}
                        className={cn("bg-emerald-500 rounded-full", size === "sm" ? "w-1 h-1" : size === "md" ? "w-1.5 h-1.5" : "w-2.5 h-2.5")}
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
                    />
                ))}
            </div>
        );
    }

    if (variant === "pulse") {
        return (
            <div className={cn("relative flex items-center justify-center", sizeClasses[size])}>
                <div className="absolute inset-0 bg-emerald-500/20 rounded-full animate-ping" />
                <div className="relative w-full h-full bg-emerald-500 rounded-full scale-75" />
            </div>
        );
    }

    return null;
};
