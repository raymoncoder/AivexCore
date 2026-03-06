"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { SpotlightCard } from "@/components/ui/ex/SpotlightCard";
import { AivexButton } from "@/components/ui/core/AivexButton";
import { ArrowRight, Cpu, Database, Wallet, Sparkles } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const templates = [
    {
        id: "ai-dashboard",
        title: "AI Agent Dashboard",
        description: "A professional, cinematic interface for managing autonomous agents, streaming thought processes, and monitoring LLM metrics.",
        icon: <Cpu size={24} />,
        href: "/templates/ai-dashboard",
        preview: "from-emerald-500/20 to-teal-500/20",
        isNew: true
    },
    {
        id: "crypto-wallet",
        title: "Crypto Management",
        description: "A premium Web3-ready interface with wallet connection states, currency swaps, and real-time performance tracking.",
        icon: <Wallet size={24} />,
        href: "/templates/crypto-wallet",
        preview: "from-blue-500/20 to-indigo-500/20",
        isNew: true
    },
    {
        id: "ai-playground",
        title: "Agentic Playground",
        description: "Interactive environment to test and debug LLM chains and autonomous agent workflows.",
        icon: <Sparkles size={24} />,
        href: "#",
        preview: "from-purple-500/10 to-transparent",
        isComingSoon: true
    },
    {
        id: "data-vault",
        title: "Knowledge Vault",
        description: "Document management and vector database exploration interface with built-in semantic search.",
        icon: <Database size={24} />,
        href: "#",
        preview: "from-orange-500/10 to-transparent",
        isComingSoon: true
    }
];

export default function TemplatesPage() {
    return (
        <div className="min-h-screen bg-black text-white font-sans">
            <Navbar />

            <main className="max-w-[1400px] mx-auto pt-32 pb-20 px-6">
                <div className="max-w-3xl mb-16">
                    <h1 className="text-5xl font-bold tracking-tight mb-6">Built-in Templates</h1>
                    <p className="text-xl text-zinc-400 leading-relaxed font-light">
                        Accelerate your development cycle with our curated collection of industry-specific layouts.
                        Fully responsive, AI-native, and production-ready.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {templates.map((template, i) => (
                        <motion.div
                            key={template.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <Link href={template.href}>
                                <SpotlightCard className="p-8 group h-full flex flex-col relative overflow-hidden">
                                    {/* Background Cinematic Glows */}
                                    <div className="absolute -top-12 -right-12 w-48 h-48 bg-emerald-500/10 blur-[80px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                                    <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-blue-500/5 blur-[80px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                                    <div className="flex justify-between items-start mb-6">
                                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${template.preview} border border-white/5 flex items-center justify-center`}>
                                            <span className="text-zinc-100 group-hover:scale-110 transition-transform">{template.icon}</span>
                                        </div>
                                        {template.isNew && (
                                            <span className="px-2 py-1 rounded bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest shadow-[0_0_20px_-5px_rgba(16,185,129,0.3)]">
                                                NEW
                                            </span>
                                        )}
                                        {template.isComingSoon && (
                                            <span className="px-2 py-1 rounded bg-white/5 border border-white/10 text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest">
                                                COMING SOON
                                            </span>
                                        )}
                                    </div>

                                    <h3 className="text-2xl font-bold mb-4 font-sans tracking-tight group-hover:text-emerald-400 transition-colors">{template.title}</h3>
                                    <p className="text-zinc-400 mb-8 flex-1 leading-relaxed font-light text-sm">
                                        {template.description}
                                    </p>

                                    <AivexButton
                                        variant={template.isComingSoon ? "ghost" : "secondary"}
                                        disabled={template.isComingSoon}
                                        className="w-full gap-2 mt-auto group-hover:border-white/20"
                                    >
                                        {template.isComingSoon ? "Locked in Orbit" : "View Template"}
                                        {!template.isComingSoon && <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />}
                                    </AivexButton>
                                </SpotlightCard>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </main>
        </div>
    );
}
