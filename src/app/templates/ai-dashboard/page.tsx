"use client";

import React, { useState, useEffect } from "react";
import { AIChatInterface } from "@/components/ui/ai/AIChatInterface";
import { AgentActivityFeed, type ActivityItem } from "@/components/ui/ai/AgentActivityFeed";
import { ModelParameters } from "@/components/ui/ai/ModelParameters";
import { RadarChart } from "@/components/ui/data/RadarChart";
import { AivexBadge } from "@/components/ui/core/AivexBadge";
import { AivexButton } from "@/components/ui/core/AivexButton";
import { AddressBadge } from "@/components/ui/crypto/AddressBadge";
import { LayoutDashboard, Settings, BrainCircuit, Shield, Database, LayoutGrid, Zap, Activity } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// --- Mock Data ---

const initialActivities: ActivityItem[] = [
    { id: "1", type: "thought", message: "Initializing Aivex pathways...", timestamp: "08:14:02" },
    { id: "2", type: "data", message: "Context window loaded (124k tokens)", timestamp: "08:14:05", metadata: "cache_hit: true" },
    { id: "3", type: "success", message: "Security protocol handshakes verified", timestamp: "08:14:06" },
];

const radarMetrics = [
    { label: 'Reasoning', value: 95, max: 100 },
    { label: 'Speed', value: 88, max: 100 },
    { label: 'Accuracy', value: 92, max: 100 },
    { label: 'Creativity', value: 70, max: 100 },
    { label: 'Context', value: 98, max: 100 },
];

export default function AIDashboardTemplate() {
    const [activities, setActivities] = useState<ActivityItem[]>(initialActivities);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const interval = setInterval(() => {
            if (Math.random() > 0.6) {
                const newActivity: ActivityItem = {
                    id: Date.now().toString(),
                    type: "action",
                    message: "Vector embedding synchronization",
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
                    metadata: `docs_synced: ${Math.floor(Math.random() * 80) + 10}ms`
                };
                setActivities(prev => [...prev.slice(-8), newActivity]);
            }
        }, 6000);
        return () => clearInterval(interval);
    }, []);

    if (!mounted) return null;

    return (
        <div className="min-h-screen bg-[#030303] text-zinc-100 font-sans selection:bg-emerald-500/30 selection:text-emerald-50 p-2 sm:p-4 md:p-6 overflow-hidden flex flex-col">

            {/* Global Background Particles & Glow */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.03] mix-blend-screen mix-blend-overlay" />
                <div className="absolute top-[-20%] left-[20%] w-[60vw] h-[60vw] bg-emerald-500/10 blur-[150px] rounded-full mix-blend-screen opacity-50" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-blue-500/5 blur-[120px] rounded-full mix-blend-screen opacity-40" />
            </div>

            {/* Top Navigation - Floating Pill */}
            <motion.header
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative z-20 flex items-center justify-between px-6 py-4 mx-auto w-full max-w-[1600px] mb-6 rounded-3xl bg-zinc-950/60 backdrop-blur-2xl border border-white/[0.04] shadow-2xl"
            >
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-3">
                        <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-zinc-900 border border-emerald-500/30 shadow-[0_0_20px_-5px_rgba(16,185,129,0.3)] group cursor-pointer transition-all hover:scale-105">
                            <BrainCircuit size={20} className="text-emerald-400" />
                        </div>
                        <div>
                            <h1 className="font-bold text-lg tracking-tight text-white leading-tight">AivexOS</h1>
                            <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                <p className="text-[10px] text-emerald-500/80 font-mono uppercase tracking-widest">System Bound</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Compact Crypto Metrics */}
                <div className="hidden lg:flex items-center gap-4 border-x border-white/[0.05] px-6">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900/50 border border-zinc-800/50">
                        <span className="text-[10px] font-mono text-zinc-500">ETH</span>
                        <span className="text-sm font-mono font-bold text-zinc-200">3,425.60</span>
                        <span className="text-[10px] font-mono text-emerald-400">+2.4%</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900/50 border border-zinc-800/50">
                        <span className="text-[10px] font-mono text-zinc-500">NRL</span>
                        <span className="text-sm font-mono font-bold text-zinc-200">12.40</span>
                        <span className="text-[10px] font-mono text-emerald-400">+15.2%</span>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <AddressBadge address="0x71C...976F" className="hidden sm:flex bg-zinc-900/50" />
                    <AivexButton variant="ghost" size="icon" className="text-zinc-400 rounded-full hover:bg-white/5">
                        <Settings size={18} />
                    </AivexButton>
                </div>
            </motion.header>

            {/* Main Application Window */}
            <div className="relative z-10 w-full max-w-[1600px] mx-auto grid grid-cols-1 xl:grid-cols-[340px_1fr_360px] gap-6 h-[calc(100vh-140px)] min-h-[600px] pb-4">

                {/* Left Panel: Settings & Modules */}
                <motion.aside
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                    className="flex flex-col gap-6 h-full min-h-0"
                >
                    {/* Module Nav */}
                    <div className="p-4 rounded-[28px] bg-zinc-950/40 backdrop-blur-xl border border-white/[0.03] shadow-xl flex flex-col gap-2 relative overflow-hidden group">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                        <div className="text-[10px] font-mono font-bold text-zinc-600 uppercase tracking-widest px-3 mb-2 mt-2">Active Modules</div>

                        <button className="flex items-center justify-between px-4 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-transparent text-emerald-400 border border-emerald-500/20 transition-all hover:bg-emerald-500/20 w-full">
                            <div className="flex items-center gap-3">
                                <Zap size={16} className="text-emerald-400" />
                                <span className="text-sm font-medium font-sans">Command Center</span>
                            </div>
                            <AivexBadge status="success" dot className="scale-75 origin-right">Active</AivexBadge>
                        </button>

                        <button className="flex items-center gap-3 px-4 py-3.5 rounded-2xl text-zinc-400 hover:text-zinc-100 hover:bg-white/5 border border-transparent transition-all w-full group/btn">
                            <Database size={16} className="group-hover/btn:text-blue-400 transition-colors" />
                            <span className="text-sm font-medium font-sans">Vector Registry</span>
                        </button>
                    </div>

                    {/* Params Panel */}
                    <div className="flex-1 rounded-[28px] bg-zinc-950/40 backdrop-blur-xl border border-white/[0.03] shadow-xl overflow-hidden relative p-4 flex flex-col">
                        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
                        <ModelParameters className="border-none shadow-none bg-transparent p-2 h-full" />
                    </div>
                </motion.aside>

                {/* Center Panel: The Agent Interface */}
                <motion.main
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }} // smooth spring
                    className="flex flex-col h-full rounded-[32px] border border-zinc-800/60 bg-gradient-to-b from-zinc-900/50 to-zinc-950/80 backdrop-blur-2xl shadow-2xl relative overflow-hidden ring-1 ring-white/5"
                >
                    {/* Inner bezel glow */}
                    <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                    {/* Tool header */}
                    <div className="h-14 shrink-0 flex items-center justify-between px-6 border-b border-white/[0.03]">
                        <div className="flex items-center gap-3">
                            <div className="px-2 py-1 rounded-md bg-zinc-800/50 border border-zinc-700/50 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                <span className="text-[10px] font-mono font-bold text-zinc-300">KERNEL_READY</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 opacity-50">
                            <span className="text-[10px] font-mono text-zinc-400">WS://LOCALHOST:8080</span>
                        </div>
                    </div>

                    <div className="flex-1 overflow-hidden p-4 sm:p-8 flex justify-center items-center relative">
                        {/* Dramatic backlight behind chat */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-emerald-500/5 blur-[100px] rounded-full pointer-events-none" />

                        <div className="w-full h-full max-w-3xl relative z-10 transition-all duration-500 shadow-[0_0_80px_-20px_rgba(0,0,0,0.5)]">
                            <AIChatInterface />
                        </div>
                    </div>
                </motion.main>

                {/* Right Panel: Telemetry & Logs */}
                <motion.aside
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                    className="flex flex-col gap-6 h-full min-h-0"
                >
                    {/* Radar & Metrics */}
                    <div className="rounded-[28px] bg-zinc-950/40 backdrop-blur-xl border border-white/[0.03] shadow-xl p-5 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-tl from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <Activity size={14} className="text-zinc-500" />
                                <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest">Topology</span>
                            </div>
                        </div>

                        <div className="flex justify-center -my-2 transform scale-110">
                            <RadarChart metrics={radarMetrics} size={220} />
                        </div>

                        <div className="grid grid-cols-2 gap-3 mt-4">
                            <div className="bg-zinc-900/60 border border-white/[0.02] rounded-2xl p-4 flex flex-col justify-between overflow-hidden relative">
                                <div className="absolute top-0 right-0 p-2"><Sparkles size={12} className="text-emerald-500/30" /></div>
                                <div className="text-[9px] text-zinc-500 font-mono uppercase tracking-widest mb-1 shadow-sm">Latency</div>
                                <div className="text-xl font-bold font-mono text-emerald-400 tracking-tight">42<span className="text-[10px] text-zinc-600 ml-1 tracking-normal">ms</span></div>
                            </div>
                            <div className="bg-zinc-900/60 border border-white/[0.02] rounded-2xl p-4 flex flex-col justify-between">
                                <div className="text-[9px] text-zinc-500 font-mono uppercase tracking-widest mb-1 shadow-sm">Compute</div>
                                <div className="text-xl font-bold font-mono text-zinc-200 tracking-tight">128<span className="text-[10px] text-zinc-600 ml-1 tracking-normal">t/s</span></div>
                            </div>
                        </div>
                    </div>

                    {/* Real-time Activity Logs */}
                    <div className="flex-1 min-h-0 rounded-[28px] bg-zinc-950/40 backdrop-blur-xl border border-white/[0.03] shadow-xl overflow-hidden flex flex-col relative">
                        <AgentActivityFeed
                            activities={activities}
                            maxHeight="100%"
                            title="Live Protocol Feed"
                            className="bg-transparent border-none shadow-none flex-1 min-h-0"
                        />
                    </div>
                </motion.aside>

            </div>
        </div>
    );
}

function Sparkles(props: any) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
        </svg>
    )
}
