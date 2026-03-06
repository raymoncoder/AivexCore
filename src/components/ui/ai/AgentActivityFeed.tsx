"use client";

import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Cpu, Zap, Search, ShieldCheck, Database } from "lucide-react";
import { cn } from "@/lib/utils";

export type ActivityType = "thought" | "action" | "success" | "warning" | "error" | "data";

export interface ActivityItem {
    id: string;
    type: ActivityType;
    message: string;
    timestamp: string;
    metadata?: string;
}

interface AgentActivityFeedProps {
    activities: ActivityItem[];
    className?: string;
    title?: string;
    maxHeight?: string;
}

const IconMap = {
    thought: Cpu,
    action: Zap,
    success: ShieldCheck,
    warning: Zap,
    error: Zap,
    data: Database,
};

export const AgentActivityFeed = ({
    activities,
    className,
    title = "Agent Protocol Feed",
    maxHeight = "400px"
}: AgentActivityFeedProps) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [activities]);

    return (
        <div className={cn(
            "flex flex-col rounded-3xl border border-zinc-800 bg-zinc-950/50 backdrop-blur-md overflow-hidden shadow-2xl",
            className
        )}>
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-zinc-800 bg-zinc-900/30">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-[0.2em]">{title}</span>
                </div>
                <div className="flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-zinc-800" />
                    <div className="w-2 h-2 rounded-full bg-zinc-800" />
                </div>
            </div>

            {/* Feed Content */}
            <div
                ref={scrollRef}
                className="overflow-y-auto p-5 space-y-4 scrollbar-hide"
                style={{ maxHeight }}
            >
                <AnimatePresence initial={false}>
                    {activities.map((activity) => {
                        const Icon = IconMap[activity.type] || Terminal;

                        return (
                            <motion.div
                                key={activity.id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="flex gap-4 group"
                            >
                                <div className="flex flex-col items-center">
                                    <div className={cn(
                                        "w-8 h-8 rounded-lg flex items-center justify-center border transition-colors",
                                        activity.type === "success" ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-500" :
                                            activity.type === "error" ? "bg-rose-500/10 border-rose-500/20 text-rose-500" :
                                                "bg-zinc-900 border-zinc-800 text-zinc-500"
                                    )}>
                                        <Icon size={14} />
                                    </div>
                                    <div className="w-[1px] h-full bg-zinc-800 mt-2 min-h-[16px] group-last:hidden" />
                                </div>

                                <div className="flex flex-col gap-1 pb-4">
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] font-mono text-zinc-500 tabular-nums">
                                            [{activity.timestamp}]
                                        </span>
                                        <span className={cn(
                                            "text-[9px] font-mono px-1.5 py-0.5 rounded uppercase font-bold",
                                            activity.type === "thought" && "bg-blue-500/10 text-blue-400 border border-blue-500/20",
                                            activity.type === "action" && "bg-amber-500/10 text-amber-400 border border-amber-500/20",
                                            activity.type === "success" && "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
                                            activity.type === "data" && "bg-purple-500/10 text-purple-400 border border-purple-500/20",
                                            activity.type === "error" && "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                                        )}>
                                            {activity.type}
                                        </span>
                                    </div>
                                    <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                                        {activity.message}
                                    </p>
                                    {activity.metadata && (
                                        <div className="mt-1 p-2 rounded-md bg-zinc-900/50 border border-zinc-800/50">
                                            <code className="text-[10px] font-mono text-zinc-500 break-all">
                                                {activity.metadata}
                                            </code>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>

            {/* Bottom Status */}
            <div className="px-5 py-2 border-t border-zinc-900 bg-zinc-950 flex items-center justify-between">
                <div className="flex gap-4">
                    <div className="flex flex-col">
                        <span className="text-[8px] font-mono text-zinc-600 uppercase">Process</span>
                        <span className="text-[10px] font-mono text-emerald-500 font-bold">ACTIVE</span>
                    </div>
                </div>
                <div className="text-[9px] font-mono text-zinc-700 uppercase tracking-widest">
                    v0.4.2-stable
                </div>
            </div>
        </div>
    );
};
