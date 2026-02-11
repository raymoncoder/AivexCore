"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { SpotlightCard } from "@/components/ui/ex/SpotlightCard";
import { NeuralButton } from "@/components/ui/core/NeuralButton";
import { ArrowRight, Layout, Monitor, Cpu, Database } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const templates = [
    {
        id: "system-monitor",
        title: "System Nexus",
        description: "A high-density dashboard for monitoring AI agents, cognitive loads, and system health in real-time.",
        icon: <Monitor size={24} />,
        href: "/templates/system-monitor",
        preview: "bg-emerald-500/10"
    },
    {
        id: "ai-playground",
        title: "Agentic Playground (Soon)",
        description: "Interactive environment to test and debug LLM chains and autonomous agent workflows.",
        icon: <Cpu size={24} />,
        href: "#",
        preview: "bg-blue-500/10"
    },
    {
        id: "data-vault",
        title: "Knowledge Vault (Soon)",
        description: "Document management and vector database exploration interface with built-in semantic search.",
        icon: <Database size={24} />,
        href: "#",
        preview: "bg-purple-500/10"
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
                                <SpotlightCard className="p-8 group h-full flex flex-col">
                                    <div className={`w-14 h-14 rounded-2xl ${template.preview} border border-white/5 flex items-center justify-center mb-6`}>
                                        <span className="text-zinc-100 group-hover:scale-110 transition-transform">{template.icon}</span>
                                    </div>
                                    <h3 className="text-2xl font-bold mb-4">{template.title}</h3>
                                    <p className="text-zinc-400 mb-8 flex-1 leading-relaxed">
                                        {template.description}
                                    </p>
                                    <NeuralButton variant="ghost" className="w-full gap-2 group-hover:bg-white/5">
                                        View Template
                                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                    </NeuralButton>
                                </SpotlightCard>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </main>
        </div>
    );
}
