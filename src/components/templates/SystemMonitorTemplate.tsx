"use client";

import React from "react";
import { SpotlightCard } from "@/components/ui/ex/SpotlightCard";
import { RadarChart } from "@/components/ui/data/RadarChart";
import { MiniSparkline } from "@/components/ui/data/MiniSparkline";
import { StepProcess } from "@/components/ui/ai/StepProcess";
import { NeuralBadge } from "@/components/ui/core/NeuralBadge";
import { NeuralButton } from "@/components/ui/core/NeuralButton";
import { Activity, Cpu, Database, Globe, RefreshCcw, Bell } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const SystemMonitorTemplate = () => {
    return (
        <div className="w-full min-h-screen bg-black p-4 md:p-8 space-y-8 font-onest">
            {/* Top Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white mb-1">System Nexus</h1>
                    <p className="text-zinc-500">Real-time cognitive engine monitoring and resource allocation.</p>
                </div>
                <div className="flex items-center gap-3">
                    <NeuralBadge status="success" dot>System Online</NeuralBadge>
                    <NeuralButton variant="ghost" size="sm" icon={<RefreshCcw size={14} />}>Reset Logs</NeuralButton>
                    <NeuralButton size="sm" icon={<Bell size={14} />}>Alerts (2)</NeuralButton>
                </div>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

                {/* Latency & Metrics */}
                <div className="md:col-span-8 flex flex-col gap-6">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <SpotlightCard className="p-6 border-emerald-500/10">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500">
                                    <Activity size={18} />
                                </div>
                                <span className="text-sm font-medium text-zinc-400">Response Latency</span>
                            </div>
                            <div className="flex items-end gap-3">
                                <span className="text-3xl font-bold font-mono">24ms</span>
                                <MiniSparkline
                                    data={[{ label: "1", value: 40 }, { label: "2", value: 42 }, { label: "3", value: 38 }, { label: "4", value: 45 }, { label: "5", value: 24 }]}
                                    width={100} height={30}
                                />
                            </div>
                        </SpotlightCard>

                        <SpotlightCard className="p-6 border-blue-500/10">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
                                    <Cpu size={18} />
                                </div>
                                <span className="text-sm font-medium text-zinc-400">Memory Cluster</span>
                            </div>
                            <div className="flex items-end gap-3">
                                <span className="text-3xl font-bold font-mono text-blue-400">88.2%</span>
                                <MiniSparkline
                                    color="#60a5fa"
                                    data={[{ label: "1", value: 70 }, { label: "2", value: 75 }, { label: "3", value: 82 }, { label: "4", value: 85 }, { label: "5", value: 88 }]}
                                    width={100} height={30}
                                />
                            </div>
                        </SpotlightCard>

                        <SpotlightCard className="p-6 border-purple-500/10">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 rounded-lg bg-purple-500/10 text-purple-500">
                                    <Database size={18} />
                                </div>
                                <span className="text-sm font-medium text-zinc-400">Node Sync</span>
                            </div>
                            <div className="flex items-end gap-3">
                                <span className="text-3xl font-bold font-mono text-purple-400">SYNCED</span>
                            </div>
                        </SpotlightCard>
                    </div>

                    <SpotlightCard className="flex-1 p-8 min-h-[400px]">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h3 className="text-lg font-bold">Neural Distribution</h3>
                                <p className="text-sm text-zinc-500">Load balancing across cognitive nodes.</p>
                            </div>
                            <div className="flex gap-2">
                                <span className="text-[10px] font-bold font-mono text-zinc-600 bg-zinc-900 px-2 py-0.5 rounded border border-white/5 uppercase">Global</span>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row items-center justify-center gap-12 py-8">
                            <RadarChart
                                size={280}
                                metrics={[
                                    { label: "Stability", value: 92, max: 100 },
                                    { label: "Sync", value: 85, max: 100 },
                                    { label: "Security", value: 95, max: 100 },
                                    { label: "Elastic", value: 70, max: 100 },
                                    { label: "Latency", value: 98, max: 100 },
                                    { label: "Compute", value: 88, max: 100 },
                                ]}
                            />
                            <div className="grid grid-cols-2 gap-x-12 gap-y-6">
                                {['US-East', 'EU-West', 'AS-Tokyo', 'AU-Syd'].map((region, i) => (
                                    <div key={region} className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <div className={cn("w-1.5 h-1.5 rounded-full", i === 0 ? "bg-emerald-500" : "bg-zinc-800")} />
                                            <span className="text-xs font-bold text-zinc-300 uppercase tracking-tighter">{region}</span>
                                        </div>
                                        <div className="text-xl font-mono font-bold">{Math.floor(Math.random() * 50 + 10)}ms</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </SpotlightCard>
                </div>

                {/* Right Column: Steps & Tasks */}
                <div className="md:col-span-4 flex flex-col gap-6">
                    <SpotlightCard className="p-6">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-2">
                                <Globe size={16} className="text-zinc-500" />
                                <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-300">Agent Trace</h3>
                            </div>
                            <div className="animate-pulse w-2 h-2 rounded-full bg-emerald-500" />
                        </div>
                        <StepProcess
                            steps={[
                                { id: "1", title: "Ingesting Telemetry", status: "completed", duration: "0.2s" },
                                { id: "2", title: "Anomaly Detection", status: "completed", duration: "1.4s" },
                                { id: "3", title: "Vector Analysis", status: "running" },
                                { id: "4", title: "Route Optimization", status: "pending" },
                            ]}
                        />
                    </SpotlightCard>

                    <SpotlightCard className="p-6 flex-1 bg-gradient-to-br from-emerald-500/5 to-transparent">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-300 mb-6">Threat Mitigation</h3>
                        <div className="space-y-4">
                            {[1, 2, 3].map((_, i) => (
                                <div key={i} className="p-3 rounded-lg bg-white/[0.03] border border-white/5 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center text-red-500">
                                            <Bell size={14} />
                                        </div>
                                        <div className="text-xs">
                                            <div className="font-bold text-zinc-200">Unauthorized Node Access</div>
                                            <div className="text-zinc-500">IP: 192.168.1.{Math.floor(Math.random() * 255)}</div>
                                        </div>
                                    </div>
                                    <NeuralButton variant="ghost" size="sm" className="text-[10px] h-7">Block</NeuralButton>
                                </div>
                            ))}
                        </div>
                    </SpotlightCard>
                </div>

            </div>
        </div>
    );
};
