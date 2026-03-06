"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Layout, Zap, Layers, Box, Terminal, Cpu, ChevronRight, Star, Globe, Shield, Activity, Sparkles, Rocket, type LucideIcon } from "lucide-react";
import { NeuralButton } from "@/components/ui/core/NeuralButton";
import { Navbar } from "@/components/layout/Navbar";
import Link from "next/link";
import { useState } from "react";
import { BootLoader } from "@/components/ui/core/BootLoader";
import { NeuralProgress } from "@/components/ui/core/NeuralProgress";
import { SpotlightCard } from "@/components/ui/ex/SpotlightCard";
import { cn } from "@/lib/utils";

// --- Components for the Landing Page ---

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FeatureCard = ({ icon: Icon, title, description, delay = 0 }: { icon: LucideIcon; title: string; description: string; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="h-full"
  >
    <SpotlightCard className="p-8 h-full">
      <div className="relative z-10">
        <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-emerald-500/20 group-hover:border-emerald-500/20 transition-all duration-300 shadow-inner">
          <Icon size={24} className="text-zinc-400 group-hover:text-emerald-300 transition-colors duration-300" />
        </div>
        <h3 className="text-xl font-bold text-white mb-3 font-sans tracking-tight">{title}</h3>
        <p className="text-zinc-400 leading-relaxed font-sans text-sm font-light">{description}</p>
      </div>
    </SpotlightCard>
  </motion.div>
);

interface PipelineStepProps {
  icon: LucideIcon;
  title: string;
  description: string;
  tasks: string[];
  index: number;
  isLast?: boolean;
}

const PipelineStep = ({ icon: Icon, title, description, tasks, index, isLast = false }: PipelineStepProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="relative flex-1 w-full"
  >
    {/* Connector (Desktop) */}
    {!isLast && (
      <div className="hidden lg:block absolute top-[48px] left-[100%] w-6 h-[1px] bg-zinc-800 z-0">
        <div className="absolute inset-0 bg-emerald-500/30 w-full animate-pulse opacity-50" />
      </div>
    )}

    <div className="relative h-full bg-zinc-900/40 border border-white/5 p-6 rounded-2xl hover:bg-zinc-900/60 hover:border-emerald-500/20 transition-all duration-500 group overflow-hidden backdrop-blur-sm shadow-sm hover:shadow-2xl hover:shadow-emerald-900/10">

      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10 flex flex-col h-full">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div className="w-12 h-12 rounded-xl bg-black/40 border border-white/10 flex items-center justify-center text-zinc-400 group-hover:text-emerald-400 group-hover:bg-emerald-500/10 group-hover:border-emerald-500/20 transition-all duration-300 shadow-inner">
            <Icon size={22} strokeWidth={1.5} />
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[9px] font-mono text-zinc-600 font-bold uppercase tracking-widest mb-1">Step</span>
            <span className="text-2xl font-bold font-mono text-zinc-800 group-hover:text-emerald-500/20 transition-colors">0{index}</span>
          </div>
        </div>

        {/* Content */}
        <div className="mb-8 space-y-3">
          <h3 className="text-lg font-bold text-white font-sans tracking-tight group-hover:text-emerald-400 transition-colors">{title}</h3>
          <p className="text-xs text-zinc-400 leading-relaxed font-light">{description}</p>
        </div>

        {/* Footer / Modules */}
        <div className="mt-auto pt-6 border-t border-white/5">
          <div className="flex flex-wrap gap-2">
            {tasks.map((task: string) => (
              <span key={task} className="px-2 py-1 rounded bg-white/5 border border-white/5 text-[10px] text-zinc-500 font-mono hover:bg-emerald-500/10 hover:text-emerald-400 hover:border-emerald-500/20 transition-colors cursor-default">
                {task}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);



export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  if (isLoading) {
    return <BootLoader onComplete={() => setIsLoading(false)} />;
  }

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 font-sans selection:bg-emerald-500/30 selection:text-emerald-50 overflow-x-hidden" style={{ fontFamily: 'var(--font-sans), sans-serif' }}>
      <Navbar />

      <main className="relative pt-32 pb-20 px-6 max-w-[1400px] mx-auto flex flex-col items-center">

        {/* Cinematic Background */}
        <div className="fixed inset-0 pointer-events-none z-0">
          {/* Animated Noise Layer */}
          <div className="absolute inset-0 z-[-1] opacity-[0.03] pointer-events-none mix-blend-overlay">
            <div className="absolute inset-0 bg-[url('/noise.svg')] bg-repeat animate-noise" />
          </div>

          {/* Center Spotlight */}
          <div className="absolute top-[-10%] left-[50%] -translate-x-[50%] w-[80vw] h-[600px] bg-white/[0.03] blur-[120px] rounded-[100%] pointer-events-none" />

          {/* Color Orbs */}
          <div className="absolute top-[10%] left-[10%] w-[500px] h-[500px] bg-emerald-500/10 blur-[150px] rounded-full animate-pulse-slow mix-blend-screen" />
          <div className="absolute top-[20%] right-[10%] w-[600px] h-[600px] bg-indigo-500/10 blur-[150px] rounded-full animate-pulse-slow mix-blend-screen" />

          {/* Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-50" />
        </div>

        {/* Hero Section */}
        <div className="relative z-10 text-center w-full max-w-5xl mx-auto mt-12 mb-24">

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/5 bg-white/[0.02] text-zinc-300 text-xs font-medium backdrop-blur-xl font-mono hover:bg-white/5 hover:border-white/10 transition-all cursor-pointer group shadow-2xl shadow-emerald-900/10">
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400">
                <Star size={10} fill="currentColor" />
              </span>
              <span className="tracking-wide">v1.0 Beta is now available</span>
              <ChevronRight size={12} className="text-zinc-400 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-6xl sm:text-7xl lg:text-8xl font-bold tracking-[-0.04em] mb-8 font-sans leading-[0.95] text-white drop-shadow-2xl"
          >
            The UI Library for <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-emerald-400 via-teal-200 to-white">Agentic AI.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-zinc-400 max-w-2xl mx-auto mb-12 leading-relaxed font-light font-sans tracking-wide"
          >
            The interface primitives for the next generation of AI applications.
            <span className="text-zinc-400 block mt-2 text-lg">Accessible. Composable. Unstoppable.</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row justify-center gap-5 items-center mb-8"
          >
            <Link href="/docs">
              <NeuralButton size="lg" className="rounded-full px-10 py-7 text-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 shadow-[0_0_50px_-10px_rgba(16,185,129,0.5)] hover:shadow-[0_0_80px_-20px_rgba(16,185,129,0.7)] transition-all font-bold tracking-tight group border-none">
                Start Building
                <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </NeuralButton>
            </Link>

            <Link href="/docs">
              <NeuralButton variant="ghost" size="lg" className="rounded-full px-8 py-7 text-lg text-zinc-300 hover:text-white hover:bg-white/5 transition-all font-medium tracking-tight">
                <span className="mr-2"><Box size={20} /></span>
                View Components
              </NeuralButton>
            </Link>
          </motion.div>
        </div>




        {/* Simple Divider */}
        <div className="w-full max-w-2xl mx-auto h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent my-24" />

        {/* Developer Workflow Section */}
        <section className="relative w-full z-10 mb-40 max-w-[1400px]">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 font-sans tracking-tight">The Builder's Pipeline</h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto font-light">
              From atomic primitives to complex cinematic interfaces. Build faster with a library designed for professional AI applications.
            </p>
          </div>

          <div className="relative flex flex-col lg:flex-row items-stretch justify-between gap-6 px-6 lg:px-12">
            {/* Background Connection Path (Mobile) */}
            <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-zinc-800 to-transparent lg:hidden -translate-x-1/2" />

            <PipelineStep
              index={1}
              icon={Layout}
              title="Primitives"
              description="A library of reusable, low-level UI elements."
              tasks={["Tokens", "Layout", "Typography"]}
            />

            <PipelineStep
              index={2}
              icon={Box}
              title="Components"
              description="Interactive blocks for data visualization & AI."
              tasks={["Charts", "Chat UI", "Forms"]}
            />

            <PipelineStep
              index={3}
              icon={Sparkles}
              title="Aesthetics"
              description="High-end cinematic effects and glassmorphism."
              tasks={["Glows", "Smooth Curves", "Glass"]}
            />

            <PipelineStep
              index={4}
              icon={Rocket}
              title="Production"
              description="Optimized for performance and accessibility."
              tasks={["GPU Sync", "Edge Ready", "A11y"]}
              isLast={true}
            />
          </div>

          {/* Interactive Detail Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-24"
          >
            <SpotlightCard className="p-12 relative overflow-hidden group">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold uppercase tracking-widest bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                    <Zap size={12} className="animate-pulse" />
                    <span>Performance Stats</span>
                  </div>
                  <h3 className="text-3xl font-bold font-sans">Build 10x Faster with Primitives</h3>
                  <p className="text-zinc-400 leading-relaxed font-light">
                    Stop reinventing common AI interface patterns. NeuralUI provides pre-built, high-fidelity components like Chat Interfaces, Radar Charts, and Spotlight Cards that you can drop into any Next.js project.
                  </p>
                  <div className="flex gap-4 pt-4">
                    <Link href="/docs">
                      <NeuralButton size="lg" className="gap-2">
                        Browse Components
                        <ArrowRight size={18} />
                      </NeuralButton>
                    </Link>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute inset-0 bg-emerald-500/20 blur-[100px] rounded-full opacity-20" />
                  <div className="relative rounded-2xl border border-white/5 bg-black/40 p-8 shadow-2xl">
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs font-mono text-zinc-400">
                          <span>IMPLEMENTATION SPEED</span>
                          <span className="text-white">~10x Gain</span>
                        </div>
                        <NeuralProgress value={95} variant="gradient" className="h-1.5" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs font-mono text-zinc-400">
                          <span>VISUAL FIDELITY</span>
                          <span className="text-white">Premium Grade</span>
                        </div>
                        <NeuralProgress value={100} variant="gradient" className="h-1.5" />
                      </div>
                      <div className="grid grid-cols-2 gap-4 pt-4">
                        <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-center">
                          <div className="text-[10px] text-zinc-400 font-mono uppercase mb-1">Animation</div>
                          <div className="text-xl font-bold text-white">60 FPS</div>
                        </div>
                        <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-center">
                          <div className="text-[10px] text-zinc-400 font-mono uppercase mb-1">Accessibility</div>
                          <div className="text-xl font-bold text-white">100 / 100</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SpotlightCard>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="relative w-full z-10 py-32 border-t border-white/5">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-medium">
              <Zap size={12} />
              <span>PERFORMANCE</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-sans tracking-tight">Engineered for perfection.</h2>
            <p className="text-zinc-400 text-lg leading-relaxed">
              We obsessed over every pixel, animation, and interaction so you don't have to.
              NeuralUI delivers a native-feel experience on the web.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={Layout}
              title="Swiss Design System"
              description="A complete design language inspired by the International Typographic Style. Clean, mathematical, and timeless."
              delay={0.2}
            />
            <FeatureCard
              icon={Cpu}
              title="Radix Primitive"
              description="Uncompromised accessibility. Built on top of Radix UI to ensure screen reader support and keyboard navigation."
              delay={0.4}
            />
            <FeatureCard
              icon={Zap}
              title="GPU Authenticated"
              description="Animations running at 60fps. Heavy use of hardware acceleration for buttery smooth micro-interactions."
              delay={0.6}
            />
            <FeatureCard
              icon={Globe}
              title="Edge Ready"
              description="Zero runtime styling overhead. Components are optimized for Edge environments and minimal bundle size."
              delay={0.3}
            />
            <FeatureCard
              icon={Box}
              title="Composable"
              description="Blocks can be easily composed to create complex interfaces without fighting the library. Includes layout primitives."
              delay={0.5}
            />
            <FeatureCard
              icon={Terminal}
              title="Type Safe"
              description="Written in TypeScript with strict mode enabled. Autocomplete, props validation, and TSDoc support out of the box."
              delay={0.7}
            />
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full max-w-[1400px] mx-auto relative rounded-3xl overflow-hidden border border-white/10 bg-zinc-900/30 backdrop-blur-md p-12 md:p-24 text-center">
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/10 via-transparent to-transparent opacity-50" />
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 font-sans">Ready to build?</h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto mb-10">
              Join thousands of developers building the future of AI and Crypto with NeuralUI.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/docs">
                <NeuralButton size="lg" className="rounded-full px-12 py-6 text-lg bg-white text-black hover:bg-zinc-200 border-none font-bold">
                  Get Started Now
                </NeuralButton>
              </Link>
              <Link href="https://github.com" target="_blank">
                <NeuralButton size="lg" variant="secondary" className="rounded-full px-12 py-6 text-lg border-white/10 bg-white/5 hover:bg-white/10">
                  GitHub Repository
                </NeuralButton>
              </Link>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="relative border-t border-white/5 bg-[#020202] pt-24 pb-12 z-10 overflow-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

        {/* Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[1px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent shadow-[0_0_20px_rgba(16,185,129,0.3)]" />

        <div className="w-full max-w-[1400px] mx-auto px-6 relative z-10">
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-20">
            {/* Brand Column */}
            <div className="lg:col-span-3 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center relative group">
                  <div className="absolute inset-0 bg-emerald-400 blur-lg opacity-40 group-hover:opacity-60 transition-opacity" />
                  <Layers size={16} className="text-black relative z-10" />
                </div>
                <span className="text-xl font-bold text-white font-sans tracking-tight">Neural<span className="text-zinc-600">UI</span></span>
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed max-w-sm font-light">
                The definitive component library for building modern, high-performance web applications. Designed for the future of AI.
              </p>

            </div>

            {/* Links Columns */}
            <div className="lg:col-start-4">
              <h4 className="font-bold text-white mb-6 text-sm uppercase tracking-wider font-mono text-zinc-500">Product</h4>
              <ul className="space-y-3 text-sm text-zinc-400 font-light">
                <li><Link href="#" className="hover:text-emerald-400 transition-colors flex items-center gap-2 group"><span className="w-1 h-1 rounded-full bg-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />Components</Link></li>
                <li><Link href="#" className="hover:text-emerald-400 transition-colors flex items-center gap-2 group"><span className="w-1 h-1 rounded-full bg-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />Templates</Link></li>

                <li><Link href="#" className="hover:text-emerald-400 transition-colors flex items-center gap-2 group"><span className="w-1 h-1 rounded-full bg-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />Pricing</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-6 text-sm uppercase tracking-wider font-mono text-zinc-500">Resources</h4>
              <ul className="space-y-3 text-sm text-zinc-400 font-light">
                <li><Link href="#" className="hover:text-emerald-400 transition-colors flex items-center gap-2 group"><span className="w-1 h-1 rounded-full bg-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />Documentation</Link></li>
                <li><Link href="#" className="hover:text-emerald-400 transition-colors flex items-center gap-2 group"><span className="w-1 h-1 rounded-full bg-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />GitHub</Link></li>
                <li><Link href="#" className="hover:text-emerald-400 transition-colors flex items-center gap-2 group"><span className="w-1 h-1 rounded-full bg-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />Figma Kit</Link></li>
                <li><Link href="#" className="hover:text-emerald-400 transition-colors flex items-center gap-2 group"><span className="w-1 h-1 rounded-full bg-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />Changelog</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-6 text-sm uppercase tracking-wider font-mono text-zinc-500">Legal</h4>
              <ul className="space-y-3 text-sm text-zinc-400 font-light">
                <li><Link href="#" className="hover:text-emerald-400 transition-colors">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-emerald-400 transition-colors">Terms of Service</Link></li>
                <li><Link href="#" className="hover:text-emerald-400 transition-colors">Cookie Policy</Link></li>
                <li><Link href="#" className="hover:text-emerald-400 transition-colors">Licenses</Link></li>
              </ul>
            </div>
          </div>

          <div className="w-full border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <p className="text-xs text-zinc-600 font-mono">
                © 2024 Neural Inc. All rights reserved.
              </p>

              {/* System Status */}
              <div className="flex items-center gap-2 px-3 py-1 bg-zinc-900/50 rounded-full border border-zinc-800">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-[10px] font-mono text-emerald-500 font-medium">All Systems Normal</span>
              </div>
            </div>

            <div className="flex gap-6 items-center">
              <Link href="#" className="text-zinc-600 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full"><Shield size={16} /></Link>
              <Link href="#" className="text-zinc-600 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full"><Globe size={16} /></Link>
              <Link href="#" className="text-zinc-600 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full"><Activity size={16} /></Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
