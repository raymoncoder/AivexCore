"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { motion } from "framer-motion";
import { Shield, Lock, Eye, FileText } from "lucide-react";

export default function PrivacyPage() {
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
                            <Shield size={20} />
                        </div>
                        <span className="text-xs font-mono text-emerald-500 border border-emerald-500/30 px-2 py-0.5 rounded uppercase tracking-widest">Legal Document</span>
                    </div>

                    <h1 className="text-5xl font-bold tracking-tighter mb-4">Privacy Policy</h1>
                    <p className="text-zinc-500 font-mono text-xs uppercase tracking-[0.2em] mb-12">Last Updated: March 6, 2024</p>

                    <div className="space-y-12 prose prose-invert prose-emerald max-w-none font-light leading-relaxed">
                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                                <span className="text-emerald-500 font-mono text-sm">01.</span> Introduction
                            </h2>
                            <p className="text-zinc-400">
                                At AivexCore, we prioritize the protection of your intellectual property and personal data. This Privacy Policy outlines how we handle information in the context of our UI library and CLI tools. We are committed to transparency and security in every node of our infrastructure.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                                <span className="text-emerald-500 font-mono text-sm">02.</span> Data Collection
                            </h2>
                            <p className="text-zinc-400">
                                As a copy-paste component library, AivexCore is designed to be as private as possible. We do not track the components you integrate into your private repositories. Our CLI tool may collect anonymous telemetry limited to:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-zinc-400">
                                <li>The version of the CLI being used.</li>
                                <li>The components successfully added to your project.</li>
                                <li>Error logs related to the installation process.</li>
                            </ul>
                            <div className="p-4 rounded-2xl bg-zinc-900/50 border border-white/5 flex gap-4 items-start mt-6">
                                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500 shrink-0">
                                    <Lock size={16} />
                                </div>
                                <p className="text-xs text-zinc-500 leading-relaxed font-sans">
                                    <strong>Agentic Privacy:</strong> We never collect your environment variables, API keys, or project-specific business logic. All components reside locally within your project infrastructure after installation.
                                </p>
                            </div>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                                <span className="text-emerald-500 font-mono text-sm">03.</span> Cookies & Local Storage
                            </h2>
                            <p className="text-zinc-400">
                                Our documentation site uses local storage to maintain your theme preferences and cached documentation states. We use minimal, privacy-focused analytics to understand documentation traffic without tracking individual user identities.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                                <span className="text-emerald-500 font-mono text-sm">04.</span> Third-Party Services
                            </h2>
                            <p className="text-zinc-400">
                                We utilize GitHub and NPM for distribution. These platforms have their own privacy policies. When you run our installation script via NPX, the connection is handled by the NPM registry.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                                <span className="text-emerald-500 font-mono text-sm">05.</span> Contact Infrastructure
                            </h2>
                            <p className="text-zinc-400">
                                If you have questions regarding our data primitives or security protocols, please contact our Registry Maintenance team at <span className="text-emerald-400 border-b border-emerald-500/30 font-mono">legal@AivexCore.com</span>.
                            </p>
                        </section>
                    </div>
                </motion.div>
            </main>

            {/* Subtle background glow */}
            <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none z-[-1]" />
        </div>
    );
}
