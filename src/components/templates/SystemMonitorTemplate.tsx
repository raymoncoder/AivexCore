"use client";

import React from "react";
import { SpotlightCard } from "@/components/ui/ex/SpotlightCard";
import { RadarChart } from "@/components/ui/data/RadarChart";
import { MiniSparkline } from "@/components/ui/data/MiniSparkline";
import { StepProcess } from "@/components/ui/ai/StepProcess";
import { NeuralBadge } from "@/components/ui/core/NeuralBadge";
import { NeuralButton } from "@/components/ui/core/NeuralButton";
import { Activity, Cpu, Database, Globe, RefreshCcw, Bell } from "lucide-react";
import { cn } from "@/lib/utils";

export const SystemMonitorTemplate = () => {
    return (
        <div className="w-full min-h-screen bg-black p-4 md:p-8 space-y-6 font-sans antialiased text-zinc-200">
            {/* Header: Clean & Organized */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
                <div>
                    <h1 className="text-2xl font-bold text-white tracking-tight">System Nexus</h1>
                    <p className="text-zinc-400 text-sm">Real-time node monitoring and infrastructure control.</p>
                </div>
                <div className="flex items-center gap-2">
                    <NeuralBadge status="success" dot className="bg-emerald-500/5 border-emerald-500/10">Connected</NeuralBadge>
                    <div className="w-[1px] h-4 bg-zinc-800 mx-2" />
                    <NeuralButton variant="ghost" size="sm" icon={<RefreshCcw size={14} />}>Reset</NeuralButton>
                    <NeuralButton variant="secondary" size="sm" icon={<Bell size={14} />}>Alerts (2)</NeuralButton>
                </div>
            </div>

            {/* Metrics Row: Simple Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <SpotlightCard className="p-6 bg-zinc-900/40 border-zinc-800">
                    <div className="flex justify-between items-start mb-4">
                        <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Latency</span>
                        <div className="p-1.5 rounded-md bg-zinc-800 text-zinc-400">
                            <Activity size={14} />
                        </div>
                    </div>
                    <div className="flex items-end justify-between">
                        <div>
                            <div className="text-3xl font-bold text-white">24<span className="text-sm font-normal text-zinc-500 ml-1">ms</span></div>
                            <div className="text-[10px] text-emerald-500 font-medium mt-1">−4% vs last hour</div>
                        </div>
                        <MiniSparkline
                            data={[{ label: "1", value: 40 }, { label: "2", value: 42 }, { label: "3", value: 38 }, { label: "4", value: 45 }, { label: "5", value: 24 }]}
                            width={80} height={30}
                        />
                    </div>
                </SpotlightCard>

                <SpotlightCard className="p-6 bg-zinc-900/40 border-zinc-800">
                    <div className="flex justify-between items-start mb-4">
                        <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Resource Load</span>
                        <div className="p-1.5 rounded-md bg-zinc-800 text-zinc-400">
                            <Cpu size={14} />
                        </div>
                    </div>
                    <div className="flex items-end justify-between">
                        <div>
                            <div className="text-3xl font-bold text-white">88.2<span className="text-sm font-normal text-zinc-500 ml-1">%</span></div>
                            <div className="text-[10px] text-zinc-500 font-medium mt-1">Stabile throughput</div>
                        </div>
                        <MiniSparkline
                            color="#3b82f6"
                            data={[{ label: "1", value: 70 }, { label: "2", value: 75 }, { label: "3", value: 82 }, { label: "4", value: 85 }, { label: "5", value: 88 }]}
                            width={80} height={30}
                        />
                    </div>
                </SpotlightCard>

                <SpotlightCard className="p-6 bg-zinc-900/40 border-zinc-800">
                    <div className="flex justify-between items-start mb-4">
                        <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Global Nodes</span>
                        <div className="p-1.5 rounded-md bg-zinc-800 text-zinc-400">
                            <Globe size={14} />
                        </div>
                    </div>
                    <div className="flex items-baseline gap-2">
                        <div className="text-3xl font-bold text-white uppercase tracking-tight">Active</div>
                        <span className="text-xs text-zinc-500 ml-2">14 Clusters Sync</span>
                    </div>
                    <div className="flex gap-1 mt-4">
                        {[1, 2, 3, 4, 5].map(i => <div key={i} className="flex-1 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500 w-[80%]" />
                        </div>)}
                    </div>
                </SpotlightCard>
            </div>

            {/* Main Content: 2-column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Visual Data (Radar) */}
                <div className="lg:col-span-2">
                    <SpotlightCard className="p-8 bg-zinc-900/20 border-zinc-800 h-full">
                        <div className="flex justify-between items-center mb-8 border-b border-zinc-800/50 pb-4">
                            <h3 className="text-sm font-bold text-zinc-300 uppercase tracking-widest">Network Distribution</h3>
                            <button className="text-[10px] font-bold text-zinc-500 hover:text-white transition-colors underline underline-offset-4">Advanced Analytics</button>
                        </div>
                        <div className="flex flex-col xl:flex-row items-center gap-12 pt-4">
                            <RadarChart
                                size={260}
                                metrics={[
                                    { label: "Stability", value: 92, max: 100 },
                                    { label: "Sync", value: 85, max: 100 },
                                    { label: "Security", value: 95, max: 100 },
                                    { label: "Elastic", value: 70, max: 100 },
                                    { label: "Latency", value: 98, max: 100 },
                                    { label: "Compute", value: 88, max: 100 },
                                ]}
                            />
                            <div className="flex-1 w-full space-y-3">
                                <h4 className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-4">Node Health Matrix</h4>
                                {[
                                    { name: "North America", ping: "21ms", status: "Optimal" },
                                    { name: "Europe West", ping: "32ms", status: "Optimal" },
                                    { name: "Asia Pacific", ping: "58ms", status: "Stabile" },
                                ].map(node => (
                                    <div key={node.name} className="flex justify-between items-center p-3 rounded-xl bg-zinc-800/20 border border-zinc-800/50">
                                        <div className="flex items-center gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                            <span className="text-sm font-medium text-zinc-300">{node.name}</span>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className="text-xs font-mono text-zinc-500">{node.ping}</span>
                                            <span className="text-[10px] font-bold text-zinc-400 bg-zinc-800 px-2 py-0.5 rounded uppercase">{node.status}</span>
                                        </div>
                                    </div>
                                ))}
                                <NeuralButton variant="secondary" className="w-full h-10 mt-4 text-xs">Run Diagnostic</NeuralButton>
                            </div>
                        </div>
                    </SpotlightCard>
                </div>

                {/* Status Column */}
                <div className="flex flex-col gap-6">
                    {/* Step Tracker */}
                    <SpotlightCard className="p-6 bg-zinc-900/40 border-zinc-800">
                        <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-6">Execution Pipeline</h3>
                        <StepProcess
                            steps={[
                                { id: "1", title: "API Initialization", status: "completed" },
                                { id: "2", title: "Security Handshake", status: "completed" },
                                { id: "3", title: "Data Processing", status: "running" },
                                { id: "4", title: "Final Validation", status: "pending" },
                            ]}
                        />
                    </SpotlightCard>

                    {/* Quick Logs */}
                    <SpotlightCard className="p-6 bg-zinc-900/40 border-zinc-800 flex-1">
                        <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-6">Incident Logs</h3>
                        <div className="space-y-4">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="flex gap-3 items-start p-3 rounded-xl bg-black border border-zinc-800/50">
                                    <div className="w-8 h-8 rounded-lg bg-zinc-900 flex items-center justify-center text-zinc-500 border border-zinc-800">
                                        <Activity size={14} />
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-xs font-bold text-zinc-300">Node Sync Complete</div>
                                        <div className="text-[10px] text-zinc-500 mt-0.5">Cluster-0{i} initialized successfully.</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </SpotlightCard>
                </div>
            </div>
        </div>
    );
};
