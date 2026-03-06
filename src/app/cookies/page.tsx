"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { motion } from "framer-motion";
import { Cookie, Info, Settings, ShieldCheck } from "lucide-react";

export default function CookiePolicyPage() {
    return (
        <div className="min-h-screen bg-[#050505] text-zinc-100 font-sans selection:bg-emerald-500/30 selection:text-emerald-50">
            <Navbar />

            <main className="relative pt-32 pb-20 px-6 max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500">
                            <Cookie size={20} />
                        </div>
                        <span className="text-xs font-mono text-emerald-500 border border-emerald-500/30 px-2 py-0.5 rounded uppercase tracking-widest">Legal Document</span>
                    </div>

                    <h1 className="text-5xl font-bold tracking-tighter mb-4">Cookie Policy</h1>
                    <p className="text-zinc-500 font-mono text-xs uppercase tracking-[0.2em] mb-12">Registry Node: CK-2024-01</p>

                    <div className="space-y-12 prose prose-invert prose-emerald max-w-none font-light leading-relaxed">
                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                                <span className="text-emerald-500 font-mono text-sm">01.</span> Use of Tracking Nodes
                            </h2>
                            <p className="text-zinc-400">
                                AivexCore uses cookies and similar technologies to enhance your documentation experience. Cookies are small data nodes stored on your device that help us remember your preferences and optimize our system performance.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                                <span className="text-emerald-500 font-mono text-sm">02.</span> Categories of Cookies
                            </h2>
                            <div className="grid gap-6">
                                <div className="p-6 rounded-2xl bg-zinc-900/40 border border-white/5 space-y-2">
                                    <div className="flex items-center gap-2 text-white font-bold">
                                        <Settings size={16} className="text-emerald-500" />
                                        Essential Primitives
                                    </div>
                                    <p className="text-xs text-zinc-500">Required for basic site functionality, such as maintaining your authentication state and theme preferences. These cannot be disabled.</p>
                                </div>
                                <div className="p-6 rounded-2xl bg-zinc-900/40 border border-white/5 space-y-2">
                                    <div className="flex items-center gap-2 text-white font-bold">
                                        <Info size={16} className="text-blue-500" />
                                        Analytical Nodes
                                    </div>
                                    <p className="text-xs text-zinc-500">Help us understand how users interact with our documentation. We use this data to improve our component registry and optimize load times.</p>
                                </div>
                            </div>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                                <span className="text-emerald-500 font-mono text-sm">03.</span> Controlling Your Data
                            </h2>
                            <p className="text-zinc-400">
                                Most modern browsers allow you to manage cookie settings in their preferences infrastructure. Please note that disabling essential cookies may impact the performance of our interactive component playgrounds.
                            </p>
                            <div className="p-4 rounded-xl border border-blue-500/20 bg-blue-500/5 text-blue-400 text-sm flex gap-3 items-start mt-6">
                                <ShieldCheck size={18} className="shrink-0" />
                                <p>We respect "Do Not Track" signals and prioritize user anonymity whenever possible within our data architecture.</p>
                            </div>
                        </section>
                    </div>
                </motion.div>
            </main>
        </div>
    );
}
