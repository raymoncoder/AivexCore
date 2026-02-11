"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Loader2, Circle } from "lucide-react";

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
        <div className={cn("space-y-6", className)}>
            {steps.map((step, index) => (
                <div key={step.id} className="relative group">
                    {/* Progress Line */}
                    {index !== steps.length - 1 && (
                        <div
                            className={cn(
                                "absolute left-4 top-10 bottom-0 w-[2px] -ml-[1px] bg-zinc-800",
                                step.status === "completed" && "bg-emerald-500/30"
                            )}
                        />
                    )}

                    <div className="flex gap-6 relative">
                        {/* Icon Node */}
                        <div className="relative z-10">
                            <AnimatePresence mode="wait">
                                {step.status === "completed" ? (
                                    <motion.div
                                        key="completed"
                                        initial={{ scale: 0.5, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-emerald-400"
                                    >
                                        <Check size={16} />
                                    </motion.div>
                                ) : step.status === "running" ? (
                                    <motion.div
                                        key="running"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500/50 flex items-center justify-center text-blue-400 shadow-[0_0_15px_-3px_rgba(59,130,246,0.5)]"
                                    >
                                        <Loader2 size={16} className="animate-spin" />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="pending"
                                        className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-600 group-hover:border-zinc-700 transition-colors"
                                    >
                                        <Circle size={8} fill="currentColor" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Content */}
                        <div className="flex-1 pb-4">
                            <div className="flex items-center justify-between mb-1">
                                <h4 className={cn(
                                    "font-bold font-onest tracking-tight transition-colors",
                                    step.status === "running" ? "text-white" : "text-zinc-400",
                                    step.status === "completed" && "text-emerald-400"
                                )}>
                                    {step.title}
                                </h4>
                                {step.duration && (
                                    <span className="text-[10px] font-mono text-zinc-600 bg-zinc-900/50 px-1.5 py-0.5 rounded border border-white/5">
                                        {step.duration}
                                    </span>
                                )}
                            </div>
                            {step.description && (
                                <p className="text-sm text-zinc-500 font-onest leading-relaxed">
                                    {step.description}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
