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
        <div className={cn("flex flex-col gap-0", className)}>
            {steps.map((step, index) => (
                <div key={step.id} className="relative group">
                    {/* Enhanced Progress Line */}
                    {index !== steps.length - 1 && (
                        <div className="absolute left-[36px] top-12 bottom-[-16px] w-[2px] -ml-[1px] z-0">
                            <div className="absolute inset-0 bg-zinc-800/30" />
                            {step.status === "completed" && (
                                <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: "100%" }}
                                    transition={{ duration: 0.4, ease: "easeInOut" }}
                                    className="absolute inset-0 bg-gradient-to-b from-emerald-500/60 to-emerald-500/20"
                                />
                            )}
                            {step.status === "running" && (
                                <motion.div
                                    animate={{
                                        opacity: [0.3, 0.6, 0.3],
                                        height: ["0%", "100%", "0%"],
                                        top: ["0%", "0%", "100%"]
                                    }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                    className="absolute inset-0 bg-blue-500/40 blur-[1px]"
                                />
                            )}
                        </div>
                    )}

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={cn(
                            "flex gap-4 relative rounded-2xl p-4 transition-all duration-300 mb-4",
                            "bg-zinc-950/20 backdrop-blur-sm border",
                            step.status === "running" && "bg-blue-500/[0.03] border-blue-500/30 shadow-[0_0_20px_-10px_rgba(59,130,246,0.3)]",
                            step.status === "completed" && "bg-emerald-500/[0.02] border-emerald-500/20",
                            step.status === "error" && "bg-red-500/[0.03] border-red-500/30",
                            step.status === "pending" && "border-zinc-900/50 opacity-60"
                        )}
                    >
                        {/* Icon Node */}
                        <div className="relative z-10 shrink-0">
                            <AnimatePresence mode="wait">
                                {step.status === "completed" ? (
                                    <motion.div
                                        key="completed"
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        exit={{ scale: 0.8, opacity: 0 }}
                                        className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-[0_0_15px_-3px_rgba(16,185,129,0.4)]"
                                    >
                                        <Check size={18} strokeWidth={3} />
                                    </motion.div>
                                ) : step.status === "running" ? (
                                    <motion.div
                                        key="running"
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        exit={{ scale: 0.8, opacity: 0 }}
                                        className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/50 flex items-center justify-center text-blue-400 shadow-[0_0_20px_-3px_rgba(59,130,246,0.5)]"
                                    >
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                        >
                                            <Loader2 size={18} strokeWidth={2.5} />
                                        </motion.div>
                                    </motion.div>
                                ) : step.status === "error" ? (
                                    <motion.div
                                        key="error"
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        exit={{ scale: 0.8, opacity: 0 }}
                                        className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/40 flex items-center justify-center text-red-400 shadow-[0_0_15px_-3px_rgba(239,68,68,0.4)]"
                                    >
                                        <AlertCircle size={18} strokeWidth={2.5} />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="pending"
                                        className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-600 transition-all"
                                    >
                                        <Circle size={4} fill="currentColor" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0 flex flex-col justify-center">
                            <div className="flex items-center justify-between gap-3">
                                <div className="flex-1 min-w-0">
                                    <h4 className={cn(
                                        "font-bold font-sans tracking-tight text-sm transition-colors",
                                        step.status === "running" && "text-blue-100",
                                        step.status === "completed" && "text-emerald-500",
                                        step.status === "error" && "text-red-400",
                                        step.status === "pending" && "text-zinc-500"
                                    )}>
                                        {step.title}
                                    </h4>
                                    {step.description && (
                                        <p className={cn(
                                            "text-[11px] font-sans leading-relaxed mt-0.5 transition-colors",
                                            step.status === "running" && "text-blue-400/70",
                                            step.status === "completed" && "text-emerald-600/70",
                                            step.status === "error" && "text-red-400/70",
                                            step.status === "pending" && "text-zinc-600"
                                        )}>
                                            {step.description}
                                        </p>
                                    )}
                                </div>

                                {/* Status and Duration */}
                                <div className="flex items-center gap-2 shrink-0">
                                    {step.duration && (
                                        <span className="text-[10px] font-mono text-zinc-600 bg-zinc-900/30 px-1.5 py-0.5 rounded border border-zinc-800/50">
                                            {step.duration}
                                        </span>
                                    )}
                                    <div className={cn(
                                        "text-[9px] font-black uppercase tracking-tighter px-2 py-0.5 rounded",
                                        step.status === "running" && "bg-blue-500/10 text-blue-400 border border-blue-500/20",
                                        step.status === "completed" && "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
                                        step.status === "error" && "bg-red-500/10 text-red-400 border border-red-500/20",
                                        step.status === "pending" && "bg-zinc-900 text-zinc-700 border border-zinc-800"
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
