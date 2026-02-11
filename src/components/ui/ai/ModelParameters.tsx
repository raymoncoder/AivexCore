"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sliders, Zap, Sparkles, Cpu, Shield, ZapOff } from "lucide-react";
import { NeuralSlider } from "@/components/ui/core/NeuralSlider";
import { NeuralSwitch } from "@/components/ui/core/NeuralSwitch";
import { cn } from "@/lib/utils";

interface ModelParametersProps {
    className?: string;
    onConfigChange?: (config: any) => void;
}

export const ModelParameters = ({ className, onConfigChange }: ModelParametersProps) => {
    const [temp, setTemp] = useState(0.7);
    const [topP, setTopP] = useState(0.9);
    const [maxTokens, setMaxTokens] = useState(2048);
    const [streaming, setStreaming] = useState(true);
    const [securityFilter, setSecurityFilter] = useState(true);

    return (
        <div className={cn(
            "relative p-6 rounded-3xl bg-zinc-950 border border-zinc-800/50 shadow-2xl space-y-8 min-w-[320px]",
            className
        )}>
            {/* Background Hub Accent */}
            <div className="absolute top-0 left-1/4 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />

            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-emerald-400 transition-colors">
                        <Sliders size={20} />
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-white tracking-tight leading-none mb-1 uppercase font-sans">Core Configuration</h3>
                        <p className="text-[11px] text-zinc-500 font-mono tracking-widest uppercase">Agentic Primitives v4</p>
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                {/* Creativity Slider */}
                <div className="space-y-3">
                    <div className="flex items-center gap-2 mb-1">
                        <Sparkles size={14} className="text-emerald-400" />
                        <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-widest">Temperature</span>
                    </div>
                    <NeuralSlider
                        min={0}
                        max={2}
                        step={0.1}
                        value={temp}
                        onValueChange={setTemp}
                        className="[&_.font-mono]:text-emerald-400"
                    />
                    <p className="text-[11px] text-zinc-600 font-sans leading-relaxed">
                        Controls randomness. Higher values increase variants but decrease precision.
                    </p>
                </div>

                {/* Top-P Slider */}
                <div className="space-y-3">
                    <div className="flex items-center gap-2 mb-1">
                        <Zap size={14} className="text-zinc-400" />
                        <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-widest">Nucleus Sampling</span>
                    </div>
                    <NeuralSlider
                        min={0}
                        max={1}
                        step={0.05}
                        value={topP}
                        onValueChange={setTopP}
                        className="[&_.font-mono]:text-zinc-200"
                    />
                </div>

                {/* Max Tokens Slider */}
                <div className="space-y-3">
                    <div className="flex items-center gap-2 mb-1">
                        <Cpu size={14} className="text-zinc-400" />
                        <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-widest">Token Quota</span>
                    </div>
                    <NeuralSlider
                        min={256}
                        max={4096}
                        step={128}
                        value={maxTokens}
                        onValueChange={setMaxTokens}
                        className="[&_.font-mono]:text-zinc-200"
                    />
                </div>
            </div>

            {/* Switches Grid */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-zinc-900">
                <div className="flex flex-col gap-3 p-3 rounded-2xl bg-white/[0.02] border border-white/[0.03]">
                    <div className="flex items-center justify-between">
                        <Zap size={14} className={cn("transition-colors", streaming ? "text-emerald-400" : "text-zinc-600")} />
                        <NeuralSwitch checked={streaming} onCheckedChange={setStreaming} />
                    </div>
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Streaming</span>
                </div>

                <div className="flex flex-col gap-3 p-3 rounded-2xl bg-white/[0.02] border border-white/[0.03]">
                    <div className="flex items-center justify-between">
                        <Shield size={14} className={cn("transition-colors", securityFilter ? "text-emerald-400" : "text-zinc-600")} />
                        <NeuralSwitch checked={securityFilter} onCheckedChange={setSecurityFilter} />
                    </div>
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Safeguards</span>
                </div>
            </div>

            {/* Footer Info */}
            <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Dynamic Sync</span>
                </div>
                <span className="text-[10px] font-mono text-zinc-700">MOD: GPT-4-TURBO</span>
            </div>
        </div>
    );
};
