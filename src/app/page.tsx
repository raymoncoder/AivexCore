"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Layout, Zap, Layers, Box, Terminal, Cpu, ChevronRight, Star, Globe, Shield, Activity, BarChart3, Bot, Coins, Sparkles, Rocket } from "lucide-react";
import { NeuralButton } from "@/components/ui/core/NeuralButton";
import { Navbar } from "@/components/layout/Navbar";
import Link from "next/link";
import { useRef } from "react";
import { AnalyticsCard } from "@/components/ui/patterns/AnalyticsCard";
import { SwapCard } from "@/components/ui/crypto/SwapCard";
import { AIChatInterface } from "@/components/ui/ai/AIChatInterface";
import { NeuralBadge } from "@/components/ui/core/NeuralBadge";
import { NeuralCard, NeuralCardHeader, NeuralCardTitle, NeuralCardContent } from "@/components/ui/core/NeuralCard";
import { NeuralInput } from "@/components/ui/core/NeuralInput";
import { NeuralSwitch } from "@/components/ui/core/NeuralSwitch";
import { NeuralProgress } from "@/components/ui/core/NeuralProgress";
import { NeuralAvatar } from "@/components/ui/core/NeuralAvatar";
import { SpotlightCard } from "@/components/ui/ex/SpotlightCard";
import { MiniSparkline } from "@/components/ui/data/MiniSparkline";
import { RadarChart } from "@/components/ui/data/RadarChart";
import { NeuralCodeEditor } from "@/components/ui/data/NeuralCodeEditor";
import { StepProcess } from "@/components/ui/ai/StepProcess";
import { cn } from "@/lib/utils";

// --- Components for the Landing Page ---

const FeatureCard = ({ icon: Icon, title, description, delay = 0 }: any) => (
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

const WindowControl = ({ color }: { color: string }) => (
  <div className={`w-3 h-3 rounded-full ${color} border border-white/10`} />
);

const CodePreview = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9, rotateX: 20 }}
    whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 50 }}
    className="h-full"
  >
    <NeuralCodeEditor
      title="neural-ai.tsx"
      language="tsx"
      initialCode={`import { NeuralAgent } from "neural-ui";\n\nconst agent = new NeuralAgent({\n  model: "neural-pro-v2",\n  config: {\n    streaming: true,\n    cognitive_bridge: true,\n  },\n});\n\nexport default function App() {\n  return (\n    <ChatInterface \n      agent={agent} \n      theme="cinematic" \n    />\n  );\n}`}
      className="h-full border-none shadow-none"
    />
  </motion.div>
);

const PipelineStep = ({ icon: Icon, title, description, tasks, status, index, delay = 0, isLast = false }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
    className="relative flex flex-col items-center group flex-1 w-full lg:w-auto"
  >
    {/* Bridge connection to next step (Desktop) */}
    {!isLast && (
      <div className="hidden lg:block absolute top-10 left-[60%] right-[-40%] h-[1px] bg-gradient-to-r from-zinc-800 via-zinc-800 to-transparent z-0">
        <motion.div
          animate={{ x: ["-100%", "200%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="w-20 h-full bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent blur-[1px]"
        />
      </div>
    )}

    {/* Step Number Decorative */}
    <div className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-[0.03] text-8xl font-black font-sans pointer-events-none group-hover:opacity-10 transition-opacity duration-700">
      {index < 10 ? `0${index}` : index}
    </div>

    {/* The Node */}
    <div className="relative z-10">
      <div className="w-20 h-20 rounded-[2rem] bg-zinc-950 border border-zinc-800/80 flex items-center justify-center relative shadow-2xl group-hover:border-emerald-500/50 group-hover:shadow-[0_0_40px_rgba(16,185,129,0.1)] transition-all duration-700 overflow-hidden group-hover:-translate-y-1">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

        {/* Pulsing Aura if Active */}
        {status === "active" && (
          <div className="absolute inset-[-20%] rounded-full bg-emerald-500/5 blur-2xl animate-pulse" />
        )}

        <Icon size={32} className="text-zinc-600 group-hover:text-emerald-400 transition-all duration-700 z-10 group-hover:scale-110" />
      </div>

      {/* Status Badge */}
      <div className="absolute -top-2 -right-6 scale-90">
        <div className={cn(
          "px-2.5 py-1 rounded-full text-[9px] font-mono border backdrop-blur-xl flex items-center gap-2 shadow-2xl",
          status === "active" ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" : "bg-zinc-900/80 border-zinc-800 text-zinc-500"
        )}>
          {status === "active" && (
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
            </span>
          )}
          {status === "active" ? "ACTIVE" : "STANDBY"}
        </div>
      </div>
    </div>

    {/* Content */}
    <div className="mt-8 text-center space-y-5">
      <div className="space-y-2">
        <h4 className="text-[13px] font-black text-white uppercase tracking-[0.25em] group-hover:text-emerald-400 transition-colors duration-500">{title}</h4>
        <p className="text-[11px] text-zinc-500 font-medium leading-relaxed max-w-[160px] mx-auto group-hover:text-zinc-400 transition-colors duration-500">{description}</p>
      </div>

      {/* Interactive Task List */}
      <div className="flex flex-col gap-1.5 items-center">
        {tasks.map((task: string, i: number) => (
          <div key={i} className="flex items-center gap-2 group/task opacity-40 group-hover:opacity-100 transition-all duration-500">
            <div className="w-1 h-1 rounded-full bg-zinc-700 group-hover/task:bg-emerald-500 ring-4 ring-transparent group-hover/task:ring-emerald-500/10 transition-all" />
            <span className="text-[9px] font-mono uppercase tracking-[0.1em] text-zinc-500 group-hover:text-zinc-300 transition-colors">{task}</span>
          </div>
        ))}
      </div>
    </div>
  </motion.div>
);

const CinematicDivider = () => (
  <div className="relative w-full pt-4 pb-24 flex items-center justify-center overflow-hidden">
    {/* Background Grid Accent */}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#10b98105_0%,transparent_70%)] opacity-50" />

    {/* Left Line with Pings */}
    <div className="absolute left-0 right-[55%] h-[1px] bg-gradient-to-r from-transparent via-zinc-800 to-zinc-700 flex items-center justify-end">
      <motion.div
        animate={{ opacity: [0, 1, 0], x: [-10, -50] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
        className="w-1 h-1 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]"
      />
      <div className="w-1.5 h-1.5 rounded-full bg-zinc-800 border border-zinc-700 translate-x-1" />
    </div>

    {/* Right Line with Pings */}
    <div className="absolute right-0 left-[55%] h-[1px] bg-gradient-to-l from-transparent via-zinc-800 to-zinc-700 flex items-center justify-start">
      <div className="w-1.5 h-1.5 rounded-full bg-zinc-800 border border-zinc-700 -translate-x-1" />
      <motion.div
        animate={{ opacity: [0, 1, 0], x: [10, 50] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 1 }}
        className="w-1 h-1 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]"
      />
    </div>

    {/* Center Tech Hub */}
    <div className="relative z-10 flex flex-col items-center gap-3">
      <div className="relative">
        <div className="absolute inset-0 bg-emerald-500/20 blur-xl rounded-full scale-150 animate-pulse" />
        <div className="w-12 h-12 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center shadow-2xl relative">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="text-emerald-500/50"
          >
            <Cpu size={24} />
          </motion.div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-1 h-1 bg-emerald-400 rounded-full animate-ping" />
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <span className="text-[10px] font-mono text-emerald-400 font-bold tracking-[0.4em] uppercase">
          UI Infrastructure
        </span>
        <div className="items-center gap-2 mt-1 hidden sm:flex">
          <span className="w-8 h-[1px] bg-emerald-500/20" />
          <span className="text-[8px] font-mono text-zinc-600 uppercase tracking-widest animate-pulse">
            Deploying Component Registry...
          </span>
          <span className="w-8 h-[1px] bg-emerald-500/20" />
        </div>
      </div>
    </div>

    {/* Floating Data Bits */}
    {[...Array(4)].map((_, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, y: 0 }}
        animate={{
          opacity: [0, 0.5, 0],
          y: i % 2 === 0 ? [20, -20] : [-20, 20],
          x: i % 2 === 0 ? [100, 120] : [-100, -120]
        }}
        transition={{ duration: 4, repeat: Infinity, delay: i * 0.5 }}
        className="absolute text-[8px] font-mono text-emerald-500/30 select-none"
      >
        {["bc21", "ef8b", "a4d2", "19c3"][i]}
      </motion.div>
    ))}
  </div>
);

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#050505] text-zinc-100 font-sans selection:bg-emerald-500/30 selection:text-emerald-50 overflow-x-hidden" style={{ fontFamily: 'var(--font-sans), sans-serif' }}>
      <Navbar />

      <main className="relative pt-32 pb-20 px-6 max-w-[1400px] mx-auto flex flex-col items-center">

        {/* Cinematic Background */}
        <div className="fixed inset-0 pointer-events-none z-0">
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
              <span className="tracking-wide">v2.1 is now available</span>
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

        <CinematicDivider />

        {/* Developer Workflow Section */}
        <section className="relative w-full z-10 mb-40 max-w-[1400px]">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 font-sans tracking-tight">The Builder's Pipeline</h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto font-light">
              From atomic primitives to complex cinematic interfaces. Build faster with a library designed for professional AI applications.
            </p>
          </div>

          <div className="relative flex flex-col lg:flex-row items-center justify-between gap-20 lg:gap-8 px-6 lg:px-12">
            {/* Background Connection Path (Mobile) */}
            <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-zinc-800 to-transparent lg:hidden -translate-x-1/2" />

            <PipelineStep
              index={1}
              icon={Layout}
              title="Primitives"
              description="A library of reusable, low-level UI elements."
              tasks={["Tokens", "Layout", "Typography"]}
              status="active"
              delay={0.1}
            />

            <PipelineStep
              index={2}
              icon={Box}
              title="Components"
              description="Interactive blocks for data visualization & AI."
              tasks={["Charts", "Chat UI", "Forms"]}
              status="active"
              delay={0.3}
            />

            <PipelineStep
              index={3}
              icon={Sparkles}
              title="Aesthetics"
              description="High-end cinematic effects and glassmorphism."
              tasks={["Glows", "Smooth Curves", "Glass"]}
              status="active"
              delay={0.5}
            />

            <PipelineStep
              index={4}
              icon={Rocket}
              title="Production"
              description="Optimized for performance and accessibility."
              tasks={["GPU Sync", "Edge Ready", "A11y"]}
              status="active"
              delay={0.7}
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
      <footer className="relative border-t border-white/5 bg-[#050505] pt-24 pb-12 z-10">
        <div className="w-full max-w-[1400px] mx-auto px-6">
          <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center">
                  <Layers size={16} className="text-black" />
                </div>
                <span className="text-lg font-bold text-white font-sans tracking-tight">Neural<span className="text-zinc-600">UI</span></span>
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed">
                The definitive component library for building modern, high-performance web applications.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-6">Product</h4>
              <ul className="space-y-4 text-sm text-zinc-400">
                <li><Link href="#" className="hover:text-emerald-400 transition-colors">Components</Link></li>
                <li><Link href="#" className="hover:text-emerald-400 transition-colors">Templates</Link></li>
                <li><Link href="#" className="hover:text-emerald-400 transition-colors">Showcase</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-6">Resources</h4>
              <ul className="space-y-4 text-sm text-zinc-400">
                <li><Link href="#" className="hover:text-emerald-400 transition-colors">Documentation</Link></li>
                <li><Link href="#" className="hover:text-emerald-400 transition-colors">GitHub</Link></li>
                <li><Link href="#" className="hover:text-emerald-400 transition-colors">Figma</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-6">Legal</h4>
              <ul className="space-y-4 text-sm text-zinc-400">
                <li><Link href="#" className="hover:text-emerald-400 transition-colors">Privacy</Link></li>
                <li><Link href="#" className="hover:text-emerald-400 transition-colors">Terms</Link></li>
                <li><Link href="#" className="hover:text-emerald-400 transition-colors">License</Link></li>
              </ul>
            </div>
          </div>

          <div className="w-full border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-zinc-600 font-mono">
              © 2024 Neural Inc. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="#" className="text-zinc-600 hover:text-white transition-colors"><Shield size={16} /></Link>
              <Link href="#" className="text-zinc-600 hover:text-white transition-colors"><Globe size={16} /></Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
