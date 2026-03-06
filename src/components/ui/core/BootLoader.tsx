"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export const BootLoader = ({ onComplete }: { onComplete: () => void }) => {
    const [progress, setProgress] = useState(0);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        // Simpler, faster progress animation
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => {
                        setIsComplete(true);
                        setTimeout(onComplete, 800);
                    }, 200);
                    return 100;
                }
                const step = Math.random() * 15;
                return Math.min(prev + step, 100);
            });
        }, 80);

        return () => clearInterval(interval);
    }, [onComplete]);

    return (
        <motion.div
            className="fixed inset-0 z-[100] bg-[#050505] flex flex-col items-center justify-center overflow-hidden"
            animate={isComplete ? {
                opacity: 0,
                transition: { duration: 0.5, ease: "easeInOut" }
            } : {
                opacity: 1
            }}
        >
            {/* Subtle glow background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.05),transparent_70%)]" />

            <div className="w-full max-w-[240px] relative z-10 flex flex-col items-center gap-12">

                {/* Simplified Logo */}
                <div className="relative">
                    <motion.div
                        animate={{
                            scale: [1, 1.05, 1],
                            opacity: [0.5, 1, 0.5]
                        }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shadow-[0_0_30px_-5px_rgba(16,185,129,0.2)]"
                    >
                        <div className="w-6 h-6 rounded-full bg-emerald-500 shadow-[0_0_20px_#10b981]" />
                    </motion.div>
                </div>

                {/* Progress Group */}
                <div className="w-full space-y-4">
                    <div className="flex justify-between items-end px-1">
                        <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.2em] font-bold">Initializing</span>
                        <span className="text-sm font-mono text-emerald-500 font-bold">{Math.round(progress)}%</span>
                    </div>

                    <div className="relative h-[2px] w-full bg-zinc-900 rounded-full overflow-hidden">
                        <motion.div
                            className="absolute inset-y-0 left-0 bg-emerald-500 shadow-[0_0_10px_#10b981]"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>
            </div>

            {/* Simple build version info */}
            <div className="absolute bottom-12 text-[9px] font-mono text-zinc-600 tracking-[0.3em] uppercase font-bold opacity-50">
                NeuralUI // System v1.0
            </div>
        </motion.div>
    );
};
