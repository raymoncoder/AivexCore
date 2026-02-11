"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Loader2, Circle, AlertCircle } from "lucide-react";

export type StepStatus = "pending" | "running" | "completed" | "error";

interface Step {
    id: string;
    title: string;
    description?: string;
    status: StepStatus;
    duration?: string;
}

interface StepProcessProps {
    steps: Step[];
    className?: string;
}

export const StepProcess = ({ steps, className }: StepProcessProps) => {
    return (
        <div className={cn("space-y-4", className)}>
            {steps.map((step, index) => (
                <div key={step.id} className="relative group">
                    {/* Enhanced Progress Line */}
                    {index !== steps.length - 1 && (
                        <div className="absolute left-5 top-12 bottom-0 w-[2px] -ml-[1px]">
                            <div className="absolute inset-0 bg-zinc-800/50" />
                            {step.status === "completed" && (
                                <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: "100%" }}
                                    transition={{ duration: 0.3, delay: 0.2 }}
                                    className="absolute inset-0 bg-gradient-to-b from-emerald-500/60 to-emerald-500/20"
                                />
                            )}
                        </div>
                    )}

                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={cn(
                            "flex gap-4 relative rounded-xl p-4 transition-all duration-300",
                            "hover:bg-white/[0.02] border border-transparent",
                            step.status === "running" && "bg-blue-500/5 border-blue-500/20",
                            step.status === "completed" && "bg-emerald-500/5 border-emerald-500/10",
                            step.status === "error" && "bg-red-500/5 border-red-500/20"
                        )}
                    >
                        {/* Icon Node with enhanced styling */}
                        <div className="relative z-10 shrink-0">
                            <AnimatePresence mode="wait">
                                {step.status === "completed" ? (
                                    <motion.div
                                        key="completed"
                                        initial={{ scale: 0, rotate: -180 }}
                                        animate={{ scale: 1, rotate: 0 }}
                                        exit={{ scale: 0 }}
                                        transition={{ type: "spring", stiffness: 200, damping: 15 }}
                                        className="w-10 h-10 rounded-xl bg-emerald-500/10 border-2 border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-[0_0_20px_-5px_rgba(16,185,129,0.5)]"
                                    >
                                        <Check size={18} strokeWidth={3} />
                                    </motion.div>
                                ) : step.status === "running" ? (
                                    <motion.div
                                        key="running"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        exit={{ scale: 0 }}
                                        className="w-10 h-10 rounded-xl bg-blue-500/10 border-2 border-blue-500/40 flex items-center justify-center text-blue-400 shadow-[0_0_25px_-5px_rgba(59,130,246,0.6)]"
                                    >
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                        >
                                            <Loader2 size={18} strokeWidth={2.5} />
                                        </motion.div>
                                    </motion.div>
                                ) : step.status === "error" ? (
                                    <motion.div
                                        key="error"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: [1, 1.1, 1] }}
                                        transition={{ duration: 0.5 }}
                                        className="w-10 h-10 rounded-xl bg-red-500/10 border-2 border-red-500/30 flex items-center justify-center text-red-400 shadow-[0_0_20px_-5px_rgba(239,68,68,0.5)]"
                                    >
                                        <AlertCircle size={18} strokeWidth={2.5} />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="pending"
                                        className="w-10 h-10 rounded-xl bg-zinc-900/50 border-2 border-zinc-800/50 flex items-center justify-center text-zinc-600 group-hover:border-zinc-700 transition-all"
                                    >
                                        <Circle size={6} fill="currentColor" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Content with improved layout */}
                        <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-3 mb-2">
                                <div className="flex-1 min-w-0">
                                    <h4 className={cn(
                                        "font-semibold font-sans tracking-tight text-sm transition-colors leading-tight",
                                        step.status === "running" && "text-blue-100",
                                        step.status === "completed" && "text-emerald-300",
                                        step.status === "error" && "text-red-300",
                                        step.status === "pending" && "text-zinc-500"
                                    )}>
                                        {step.title}
                                    </h4>
                                    {step.description && (
                                        <p className={cn(
                                            "text-xs font-sans leading-relaxed mt-1 transition-colors",
                                            step.status === "running" && "text-blue-300/60",
                                            step.status === "completed" && "text-emerald-400/60",
                                            step.status === "error" && "text-red-300/60",
                                            step.status === "pending" && "text-zinc-600"
                                        )}>
                                            {step.description}
                                        </p>
                                    )}
                                </div>

                                {/* Status indicator and duration */}
                                <div className="flex flex-col items-end gap-1.5 shrink-0">
                                    {step.duration && (
                                        <span className="text-[10px] font-mono text-zinc-500 bg-zinc-900/50 px-2 py-0.5 rounded-md border border-zinc-800/50">
                                            {step.duration}
                                        </span>
                                    )}
                                    <div className={cn(
                                        "text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-md",
                                        step.status === "running" && "bg-blue-500/10 text-blue-400 border border-blue-500/20",
                                        step.status === "completed" && "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
                                        step.status === "error" && "bg-red-500/10 text-red-400 border border-red-500/20",
                                        step.status === "pending" && "bg-zinc-800/30 text-zinc-600 border border-zinc-800/50"
                                    )}>
                                        {step.status}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            ))}
        </div>
    );
};
