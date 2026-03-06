"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { motion } from "framer-motion";
import { FileCode, Globe, Users, Scroll } from "lucide-react";

export default function LicensePage() {
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
                            <Scroll size={20} />
                        </div>
                        <span className="text-xs font-mono text-emerald-500 border border-emerald-500/30 px-2 py-0.5 rounded uppercase tracking-widest">Legal Document</span>
                    </div>

                    <h1 className="text-5xl font-bold tracking-tighter mb-4">Licenses</h1>
                    <p className="text-zinc-500 font-mono text-xs uppercase tracking-[0.2em] mb-12">Registry Node: MIT-OSS-2024</p>

                    <div className="space-y-12 prose prose-invert prose-emerald max-w-none font-light leading-relaxed">
                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                                <span className="text-emerald-500 font-mono text-sm">01.</span> AivexCore License (MIT)
                            </h2>
                            <div className="p-8 rounded-3xl bg-zinc-900/30 border border-white/5 font-mono text-sm text-zinc-400 overflow-hidden relative">
                                <div className="absolute top-0 right-0 p-4 opacity-10">
                                    <FileCode size={120} />
                                </div>
                                <p className="mb-4">Copyright (c) 2024 Aivex Inc. & Contributors</p>
                                <p className="mb-4">
                                    Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
                                </p>
                                <p className="mb-4">
                                    The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
                                </p>
                                <p>
                                    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
                                </p>
                            </div>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                                <span className="text-emerald-500 font-mono text-sm">02.</span> Third Party Primitives
                            </h2>
                            <p className="text-zinc-400">
                                AivexCore is built on several high-quality open-source primitives. We acknowledge and respect the following core dependencies:
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                                <div className="p-4 rounded-xl border border-white/5 bg-zinc-900/20">
                                    <h4 className="font-bold text-white mb-1">Tailwind CSS</h4>
                                    <p className="text-xs text-zinc-500">MIT License</p>
                                </div>
                                <div className="p-4 rounded-xl border border-white/5 bg-zinc-900/20">
                                    <h4 className="font-bold text-white mb-1">Framer Motion</h4>
                                    <p className="text-xs text-zinc-500">MIT License</p>
                                </div>
                                <div className="p-4 rounded-xl border border-white/5 bg-zinc-900/20">
                                    <h4 className="font-bold text-white mb-1">Radix UI</h4>
                                    <p className="text-xs text-zinc-500">MIT License</p>
                                </div>
                                <div className="p-4 rounded-xl border border-white/5 bg-zinc-900/20">
                                    <h4 className="font-bold text-white mb-1">Lucide Icons</h4>
                                    <p className="text-xs text-zinc-500">ISC License</p>
                                </div>
                            </div>
                        </section>
                    </div>
                </motion.div>
            </main>
        </div>
    );
}
