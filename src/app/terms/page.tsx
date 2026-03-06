"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { motion } from "framer-motion";
import { FileText, Hammer, Scale, Info, Rocket } from "lucide-react";

export default function TermsPage() {
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
                            <Scale size={20} />
                        </div>
                        <span className="text-xs font-mono text-emerald-500 border border-emerald-500/30 px-2 py-0.5 rounded uppercase tracking-widest">Legal Document</span>
                    </div>

                    <h1 className="text-5xl font-bold tracking-tighter mb-4">Terms of Service</h1>
                    <p className="text-zinc-500 font-mono text-xs uppercase tracking-[0.2em] mb-12">Effective Date: March 6, 2024</p>

                    <div className="space-y-12 prose prose-invert prose-emerald max-w-none font-light leading-relaxed">
                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                                <span className="text-emerald-500 font-mono text-sm">01.</span> Acceptance of Terms
                            </h2>
                            <p className="text-zinc-400">
                                By installing AivexCore via our NPX CLI or manually integrating our components into your project, you agree to be bound by these Terms of Service. If you do not agree to these terms, you should terminate your use of our library and remove all source code nodes from your local environment.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                                <span className="text-emerald-500 font-mono text-sm">02.</span> License Grant
                            </h2>
                            <p className="text-zinc-400">
                                AivexCore components and CLI tools are licensed under the MIT License. This grants you the right to:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-zinc-400">
                                <li>Use the components in commercial projects.</li>
                                <li>Modify and distribute our source code within your applications.</li>
                                <li>Create derivative works based on our primitive states.</li>
                            </ul>
                            <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 flex gap-4 items-start mt-6 group hover:border-emerald-500/40 transition-colors">
                                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500 shrink-0">
                                    <Rocket size={16} />
                                </div>
                                <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                                    <strong>Agentic Freedom:</strong> Unlike restrictive ecosystems, AivexCore code is fully decentralized. Once copied into your repository, you own the implementation node and its future evolution.
                                </p>
                            </div>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                                <span className="text-emerald-500 font-mono text-sm">03.</span> Usage Restrictions
                            </h2>
                            <p className="text-zinc-400">
                                While our license is open, we maintain a strict policy against using AivexCore for:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-zinc-400">
                                <li>Building competing UI component libraries based on our proprietary design logic.</li>
                                <li>Automated heavy scraping of our documentation system.</li>
                                <li>Using our brand and logo in a way that suggests endorsement.</li>
                            </ul>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                                <span className="text-emerald-500 font-mono text-sm">04.</span> Limitation of Liability
                            </h2>
                            <p className="text-zinc-400 italic">
                                UNDER NO CIRCUMSTANCES SHALL Aivex INC. BE HELD LIABLE FOR ANY INDIRECT, INCIDENTAL, OR CONSEQUENTIAL DAMAGES ARISING OUT OF YOUR USE OF OUR AGENTIC PRIMITIVES. OUR SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE".
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                                <span className="text-emerald-500 font-mono text-sm">05.</span> Governing Law
                            </h2>
                            <p className="text-zinc-400">
                                These terms and any disputes arising out of your relationship with our infrastructure are governed by the laws of our digital jurisdiction of incorporation, without regard to its conflict of law principles.
                            </p>
                        </section>
                    </div>
                </motion.div>
            </main>

            {/* Subtle background glow */}
            <div className="fixed top-0 right-1/4 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none z-[-1]" />
        </div>
    );
}
