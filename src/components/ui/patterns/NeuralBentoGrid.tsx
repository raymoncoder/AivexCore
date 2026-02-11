"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface BentoGridProps {
    children: React.ReactNode;
    className?: string;
}

interface BentoCardProps {
    children: React.ReactNode;
    className?: string;
    title?: string;
    description?: string;
    header?: React.ReactNode;
    icon?: React.ReactNode;
}

export const NeuralBentoGrid = ({ children, className }: BentoGridProps) => {
    return (
        <div className={cn(
            "grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto",
            className
        )}>
            {children}
        </div>
    );
};

export const NeuralBentoCard = ({
    children,
    className,
    title,
    description,
    header,
    icon
}: BentoCardProps) => {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
            className={cn(
                "group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-zinc-800/80 bg-zinc-950 p-6 shadow-2xl transition-all hover:border-zinc-700 hover:shadow-emerald-500/5",
                className
            )}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            {header && (
                <div className="mb-4 h-full min-h-[140px] flex items-center justify-center">
                    {header}
                </div>
            )}

            <div className="z-10 mt-auto">
                <div className="flex items-center gap-2 mb-2">
                    {icon && <div className="text-emerald-500">{icon}</div>}
                    {title && <h3 className="text-sm font-bold text-white uppercase tracking-wider font-sans">{title}</h3>}
                </div>
                {description && <p className="text-xs text-zinc-500 leading-relaxed max-w-[200px]">{description}</p>}
                <div className="mt-4">
                    {children}
                </div>
            </div>

            {/* Decorative Corner */}
            <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none opacity-20">
                <div className="absolute top-4 right-4 w-[1px] h-4 bg-zinc-700" />
                <div className="absolute top-4 right-4 w-4 h-[1px] bg-zinc-700" />
            </div>
        </motion.div>
    );
};
