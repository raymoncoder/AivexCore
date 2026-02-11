"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Circle, Loader2, BrainCircuit, Sparkles, MessageSquare, Database, Search, Code, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ThoughtStep {
    id: string;
    label: string;
    status: "complete" | "active" | "pending";
    description?: string;
    timestamp?: string;
    type?: "analyze" | "search" | "process" | "code" | "plan";
}

interface AgentThoughtFlowProps {
    steps: ThoughtStep[];
    className?: string;
    title?: string;
}

const typeIcons = {
    analyze: BrainCircuit,
    search: Search,
    process: Database,
    code: Code,
    plan: Sparkles,
};

export const AgentThoughtFlow = ({ steps, className, title = "Agent Reasoning" }: AgentThoughtFlowProps) => {
    return (
        <div className={cn(
            "relative p-6 rounded-3xl bg-zinc-950 border border-zinc-800/50 shadow-2xl overflow-hidden group",
            className
        )}>
            {/* Cinematic Background Glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-[60px] rounded-full -translate-y-1/2 translate-x-1/2" />

            <div className="relative z-10 space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-zinc-900 pb-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                            <BrainCircuit size={18} className="text-emerald-400" />
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-white tracking-tight uppercase font-sans">{title}</h3>
                            <p className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase">Initializing Cognitive Bridge</p>
                        </div>
                    </div>
                    <div className="px-2 py-0.5 rounded-full bg-emerald-500/5 border border-emerald-500/10 flex items-center gap-2">
                        <span className="relative flex h-1.5 w-1.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                        </span>
                        <span className="text-[11px] font-mono text-emerald-500/80 font-bold tracking-widest uppercase">Processing</span>
                    </div>
                </div>

                {/* Steps List */}
                <div className="relative space-y-0">
                    <AnimatePresence mode="popLayout">
                        {steps.map((step, idx) => {
                            const Icon = step.type ? typeIcons[step.type] : Circle;
                            const isActive = step.status === "active";
                            const isComplete = step.status === "complete";

                            return (
                                <motion.div
                                    key={step.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                                    className="relative pl-8 pb-8 last:pb-0"
                                >
                                    {/* Vertical Line */}
                                    {idx !== steps.length - 1 && (
                                        <div className={cn(
                                            "absolute left-[11px] top-6 bottom-0 w-[1px] transition-colors duration-500",
                                            isComplete ? "bg-emerald-500/30" : "bg-zinc-800"
                                        )} />
                                    )}

                                    {/* Icon Node */}
                                    <div className={cn(
                                        "absolute left-0 top-1 w-6 h-6 rounded-full flex items-center justify-center z-10 transition-all duration-500",
                                        isComplete
                                            ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400"
                                            : isActive
                                                ? "bg-zinc-900 border border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.2)] text-emerald-400"
                                                : "bg-zinc-950 border border-zinc-800 text-zinc-600"
                                    )}>
                                        {isActive ? (
                                            <motion.div
                                                animate={{ rotate: 360 }}
                                                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                            >
                                                <Loader2 size={12} />
                                            </motion.div>
                                        ) : isComplete ? (
                                            <CheckCircle2 size={12} />
                                        ) : (
                                            <div className="w-1.5 h-1.5 rounded-full bg-current" />
                                        )}
                                    </div>

                                    {/* Step Content */}
                                    <div className={cn(
                                        "p-3 rounded-2xl border transition-all duration-500",
                                        isActive
                                            ? "bg-zinc-900/50 border-white/5 shadow-xl translate-x-1"
                                            : isComplete
                                                ? "bg-transparent border-transparent opacity-60"
                                                : "bg-transparent border-transparent opacity-30"
                                    )}>
                                        <div className="flex items-center justify-between mb-1">
                                            <div className="flex items-center gap-2">
                                                {step.type && <Icon size={12} className={cn(isComplete ? "text-emerald-400/50" : "text-zinc-400")} />}
                                                <span className={cn(
                                                    "text-xs font-bold font-sans tracking-tight uppercase",
                                                    isActive ? "text-emerald-400" : isComplete ? "text-zinc-200" : "text-zinc-500"
                                                )}>
                                                    {step.label}
                                                </span>
                                            </div>
                                            {step.timestamp && (
                                                <span className="text-[10px] font-mono text-zinc-500 tracking-tighter">
                                                    {step.timestamp}
                                                </span>
                                            )}
                                        </div>
                                        {step.description && (
                                            <p className="text-[11px] text-zinc-400 leading-relaxed font-sans font-light">
                                                {step.description}
                                            </p>
                                        )}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>

                {/* Footer Metrics */}
                <div className="pt-4 border-t border-zinc-900 flex items-center justify-between">
                    <div className="flex gap-4">
                        <div className="flex flex-col">
                            <span className="text-[10px] text-zinc-500 uppercase font-mono tracking-widest">Cognition Rate</span>
                            <span className="text-xs font-mono text-zinc-300">92.4 <span className="text-[10px] text-emerald-500">TPS</span></span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] text-zinc-500 uppercase font-mono tracking-widest">Latent Delay</span>
                            <span className="text-xs font-mono text-zinc-300">14 <span className="text-[10px] text-zinc-500 uppercase">ms</span></span>
                        </div>
                    </div>
                    <motion.div
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-[10px] font-mono text-emerald-500 cursor-help"
                    >
                        LOGS_ID: 8F7D2
                    </motion.div>
                </div>
            </div>
        </div>
    );
};
