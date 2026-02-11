"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface NeuralBadgeProps {
    status?: "default" | "success" | "warning" | "error" | "info";
    variant?: "solid" | "outline" | "soft";
    className?: string;
    dot?: boolean;
    children: React.ReactNode;
}

export const NeuralBadge = ({ status = "default", variant = "soft", className, dot = false, children }: NeuralBadgeProps) => {

    const statusColors = {
        default: "bg-zinc-800/40 text-zinc-300 border-zinc-700/50 backdrop-blur-sm shadow-sm",
        success: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 backdrop-blur-sm shadow-[0_0_10px_-4px_rgba(16,185,129,0.3)]",
        warning: "bg-amber-500/10 text-amber-400 border-amber-500/20 backdrop-blur-sm shadow-[0_0_10px_-4px_rgba(245,158,11,0.3)]",
        error: "bg-red-500/10 text-red-400 border-red-500/20 backdrop-blur-sm shadow-[0_0_10px_-4px_rgba(239,68,68,0.3)]",
        info: "bg-blue-500/10 text-blue-400 border-blue-500/20 backdrop-blur-sm shadow-[0_0_10px_-4px_rgba(59,130,246,0.3)]",
    };

    const dotColors = {
        default: "bg-zinc-400",
        success: "bg-emerald-500",
        warning: "bg-amber-500",
        error: "bg-red-500",
        info: "bg-blue-500",
    };

    return (
        <div
            className={cn(
                "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-medium border transition-colors",
                statusColors[status],
                className
            )}
        >
            {dot && (
                <span className="relative flex h-1.5 w-1.5">
                    <motion.span
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className={cn("absolute inline-flex h-full w-full rounded-full opacity-75", dotColors[status])}
                    />
                    <span className={cn("relative inline-flex rounded-full h-1.5 w-1.5", dotColors[status])} />
                </span>
            )}
            {children}
        </div>
    );
};
