"use client";

import { NeuralButton } from "@/components/ui/core/NeuralButton";
import { NeuralInput } from "@/components/ui/core/NeuralInput";
import { NeuralBadge } from "@/components/ui/core/NeuralBadge";
import { NeuralMarquee } from "@/components/ui/core/NeuralMarquee";
import { NeuralToastProvider, useNeuralToast } from "@/components/ui/core/NeuralToaster";
import { NeuralSwitch } from "@/components/ui/core/NeuralSwitch";
import { NeuralPasswordInput } from "@/components/ui/core/NeuralPasswordInput";
import { NeuralOTPInput } from "@/components/ui/core/NeuralOTPInput";
import { NeuralSelect } from "@/components/ui/core/NeuralSelect";
import { NeuralTabs } from "@/components/ui/core/NeuralTabs";
import { NeuralCard, NeuralCardHeader, NeuralCardTitle, NeuralCardDescription, NeuralCardContent } from "@/components/ui/core/NeuralCard";
import { AnalyticsCard } from "@/components/ui/patterns/AnalyticsCard";
import { SwapCard } from "@/components/ui/crypto/SwapCard";
import { AIChatInterface } from "@/components/ui/ai/AIChatInterface";
import { NeuralSkeleton } from "@/components/ui/core/NeuralSkeleton";
import { Box, PieChart, Sparkles, ToggleLeft, Copy, Check, Terminal, Layout, Layers, Menu, Grid, Magnet, Loader2, MousePointer2, Info, MoveHorizontal, Wallet, AlertCircle, ChevronRight, User, Search, Percent, Table as TableIcon, Github, ExternalLink, ArrowRight, ArrowLeft, Play, Eye, Code, Plus, Database, Cpu, Shield, Globe, Coins, Calendar, GripVertical, Zap, Brain } from "lucide-react";
import { XIcon } from "@/components/icons/XIcon";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { differenceInDays } from "date-fns";
import { NeuralCheckbox } from "@/components/ui/core/NeuralCheckbox";
import { NeuralSlider } from "@/components/ui/core/NeuralSlider";
import { NeuralTooltip } from "@/components/ui/core/NeuralTooltip";
import { NeuralLoader } from "@/components/ui/core/NeuralLoader";
import { Magnetic } from "@/components/ui/ex/Magnetic";
import { AddressBadge } from "@/components/ui/crypto/AddressBadge";
import { StreamingText } from "@/components/ui/ai/StreamingText";
import { WalletConnectModal } from "@/components/ui/crypto/WalletConnectModal";
import { NeuralAccordion } from "@/components/ui/core/NeuralAccordion";
import { NeuralAlert } from "@/components/ui/core/NeuralAlert";
import { NeuralAvatar } from "@/components/ui/core/NeuralAvatar";
import { NeuralBreadcrumb } from "@/components/ui/core/NeuralBreadcrumb";
import { NeuralProgress } from "@/components/ui/core/NeuralProgress";
import { CommandPalette } from "@/components/ui/data/CommandPalette";
import { NeuralDataTable } from "@/components/ui/data/NeuralDataTable";
import { NeuralDialog, NeuralDialogContent, NeuralDialogHeader, NeuralDialogTitle, NeuralDialogDescription, NeuralDialogFooter } from "@/components/ui/core/NeuralDialog";
import { SpotlightCard } from "@/components/ui/ex/SpotlightCard";
import { StepProcess } from "@/components/ui/ai/StepProcess";
import { NeuralCommandBar } from "@/components/ui/ex/NeuralCommandBar";
import { NeuralCodeEditor } from "@/components/ui/data/NeuralCodeEditor";
import { RadarChart } from "@/components/ui/data/RadarChart";
import { MiniSparkline } from "@/components/ui/data/MiniSparkline";
import { NeuralExportButton } from "@/components/ui/data/NeuralExportButton";
import { NeuralLoader as NeuralLoaderVariants } from "@/components/ui/core/NeuralLoaderVariants";
import { FileUploadZone } from "@/components/ui/core/FileUploadZone";
import { NeuralDatePicker } from "@/components/ui/core/NeuralDatePicker";
import { DragDropList } from "@/components/ui/core/DragDropCard";
import { CustomScrollBar } from "@/components/ui/core/CustomScrollBar";
import { AgentThoughtFlow } from "@/components/ui/ai/AgentThoughtFlow";
import { ModelParameters } from "@/components/ui/ai/ModelParameters";
import { PriceMetric } from "@/components/ui/crypto/PriceMetric";
import { TokenPerformance } from "@/components/ui/crypto/TokenPerformance";
import { AgentActivityFeed } from "@/components/ui/ai/AgentActivityFeed";
import { NeuralCarousel } from "@/components/ui/patterns/NeuralCarousel";
import { NeuralBentoGrid, NeuralBentoCard } from "@/components/ui/patterns/NeuralBentoGrid";
import Link from "next/link";

// --- Types & Data ---

interface ComponentVariant {
    id: string;
    title: string;
    description: string;
    component: React.ReactNode;
    code: string;
}

interface ComponentDoc {
    id: string;
    title: string;
    description: string;
    component: React.ReactNode;
    code: string;
    variants?: ComponentVariant[];
    addedAt?: string; // ISO string for tracking freshness
}

interface Category {
    id: string;
    title: string;
    icon: React.ReactNode;
    components: ComponentDoc[];
    isGettingStarted?: boolean;
}

// --- Sub-components (Defined BEFORE usage in categories) ---

const WalletConnectPreview = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <NeuralButton onClick={() => setIsOpen(true)} icon={<Wallet size={16} />}>Connect Wallet</NeuralButton>
            <WalletConnectModal isOpen={isOpen} onClose={() => setIsOpen(false)} onConnect={(id) => alert(`Connected to ${id}`)} />
        </>
    );
};

const CommandPalettePreview = () => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setIsOpen(true);
            }
        }
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    return (
        <>
            <div className="flex flex-col items-center gap-4 text-center">
                <p className="text-sm text-zinc-500 font-sans">Press <kbd className="bg-zinc-800 border border-zinc-700 px-1.5 py-0.5 rounded text-zinc-300 font-mono text-xs">⌘K</kbd> or click below</p>
                <NeuralButton onClick={() => setIsOpen(true)} variant="secondary" icon={<Search size={14} />}>Open Command Palette</NeuralButton>
            </div>
            <CommandPalette isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </>
    )
};

const NeuralToastDemo = () => {
    const { toast } = useNeuralToast();
    return (
        <div className="flex flex-wrap gap-4">
            <NeuralButton onClick={() => toast("Handshake Successful", { type: "success", description: "Agent node connected." })}>
                Success
            </NeuralButton>
            <NeuralButton onClick={() => toast("Anomalous Activity", { type: "error", description: "Node rejected connection." })}>
                Error
            </NeuralButton>
        </div>
    );
};

const DialogPreview = () => {
    const [open, setOpen] = useState(false);
    return (
        <>
            <NeuralButton onClick={() => setOpen(true)}>Open Dialog</NeuralButton>
            <NeuralDialog open={open} onOpenChange={setOpen}>
                <NeuralDialogContent>
                    <NeuralDialogHeader>
                        <NeuralDialogTitle>Edit Profile</NeuralDialogTitle>
                        <NeuralDialogDescription>
                            Make changes to your profile here. Click save when you're done.
                        </NeuralDialogDescription>
                    </NeuralDialogHeader>
                    <div className="grid gap-4 py-4">
                        <NeuralInput label="Name" defaultValue="Pedro Duarte" />
                        <NeuralInput label="Username" defaultValue="@peduarte" />
                    </div>
                    <NeuralDialogFooter>
                        <NeuralButton type="submit" onClick={() => setOpen(false)}>Save changes</NeuralButton>
                    </NeuralDialogFooter>
                </NeuralDialogContent>
            </NeuralDialog>
        </>
    )
}

const LoadingInterfaceDemo = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsLoading(prev => !prev);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full relative min-h-[360px] flex items-center justify-center p-4">
            <div className="absolute top-0 right-0 z-30 flex items-center gap-2 p-4">
                <div className={cn(
                    "w-2 h-2 rounded-full transition-colors duration-500 animate-pulse",
                    isLoading ? "bg-amber-500" : "bg-emerald-500"
                )} />
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                    {isLoading ? "Fetching Data..." : "System Sync Complete"}
                </span>
            </div>

            <AnimatePresence mode="wait">
                {isLoading ? (
                    <motion.div
                        key="loading-card"
                        initial={{ opacity: 0, filter: "blur(4px)" }}
                        animate={{ opacity: 1, filter: "blur(0px)" }}
                        exit={{ opacity: 0, filter: "blur(10px)", scale: 0.95 }}
                        transition={{ duration: 0.4 }}
                        className="w-full max-w-sm p-6 rounded-3xl bg-[#09090b] border border-zinc-900 shadow-2xl space-y-6"
                    >
                        <div className="flex items-center gap-4">
                            <NeuralSkeleton className="w-16 h-16 rounded-2xl" />
                            <div className="space-y-2 flex-1">
                                <NeuralSkeleton className="h-4 w-3/4" />
                                <NeuralSkeleton className="h-3 w-1/2 opacity-50" />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <NeuralSkeleton className="h-3 w-full" />
                            <NeuralSkeleton className="h-3 w-full" />
                            <NeuralSkeleton className="h-3 w-2/3 opacity-50" />
                        </div>

                        <div className="grid grid-cols-2 gap-3 pt-2">
                            <NeuralSkeleton className="h-10 w-full rounded-xl" />
                            <NeuralSkeleton className="h-10 w-full rounded-xl" />
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="ready-card"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="w-full max-w-sm p-6 rounded-3xl bg-zinc-950 border border-emerald-500/20 shadow-[0_20px_50px_-15px_rgba(16,185,129,0.2)] space-y-6 relative overflow-hidden"
                    >
                        {/* Smooth entrance for internal elements */}
                        <motion.div
                            className="flex items-center gap-4"
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.1, type: "spring", damping: 20 }}
                        >
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-blue-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 overflow-hidden relative">
                                <User size={32} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white tracking-tight">Alex Rivera</h3>
                                <p className="text-sm text-emerald-500/70 font-mono">@neural_prime</p>
                            </div>
                        </motion.div>

                        <motion.div
                            className="space-y-2"
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2, type: "spring", damping: 20 }}
                        >
                            <p className="text-sm text-zinc-400 leading-relaxed font-sans">
                                Senior Neural Architect specializing in encrypted data streams and autonomous интерфейс logic.
                            </p>
                        </motion.div>

                        <motion.div
                            className="grid grid-cols-2 gap-3 pt-2"
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3, type: "spring", damping: 20 }}
                        >
                            <NeuralButton variant="secondary" className="rounded-xl border-zinc-800 text-zinc-400 hover:text-white">
                                Edit Profile
                            </NeuralButton>
                            <NeuralButton className="rounded-xl bg-emerald-500 text-black hover:bg-emerald-400 font-bold">
                                View Activity
                            </NeuralButton>
                        </motion.div>

                        {/* Decorative glow that settles */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 1 }}
                            className="absolute -bottom-12 -right-12 w-32 h-32 bg-emerald-500/10 blur-3xl rounded-full"
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const TablePreview = () => {
    const data = [
        { id: 1, name: "Neural Interface", status: "Active", users: "1.2k", revenue: "$4,200" },
        { id: 2, name: "Crypto Module", status: "Active", users: "850", revenue: "$2,100" },
        { id: 3, name: "AI Engine", status: "Beta", users: "300", revenue: "$0" },
        { id: 4, name: "Analytics Dashboard", status: "Inactive", users: "120", revenue: "$500" },
        { id: 5, name: "Legacy System", status: "Deprecated", users: "50", revenue: "$100" },
        { id: 6, name: "Payment Gateway", status: "Active", users: "2.5k", revenue: "$12,500" },
        { id: 7, name: "User Auth", status: "Active", users: "5k", revenue: "$5,000" },
    ];

    const columns = [
        { key: "name" as const, header: "Product Name" },
        {
            key: "status" as const,
            header: "Status",
            render: (val: any) => (
                <NeuralBadge status={val === "Active" ? "success" : val === "Beta" ? "warning" : "default"} dot>
                    {val}
                </NeuralBadge>
            )
        },
        {
            key: "users" as const,
            header: "Users",
            render: (val: any) => <span className="font-mono">{val}</span>
        },
        {
            key: "revenue" as const,
            header: "Revenue",
            render: (val: any) => <span className="font-mono text-emerald-400">{val}</span>
        },
    ];

    return (
        <NeuralDataTable data={data} columns={columns as any} pageSize={4} />
    )
}

const IntroductionSection = () => (
    <div className="space-y-12">
        <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight font-sans">Introduction</h1>
            <p className="text-xl text-zinc-400 font-light font-sans leading-relaxed">
                Neural UI is a collection of re-usable components built for the next generation of AI and Crypto applications.
                Designed with a premium dark-mode aesthetic, buttery smooth animations, and high-performance in mind.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl border border-white/5 bg-zinc-900/20 backdrop-blur-md">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-4">
                    <Sparkles size={20} className="text-emerald-500" />
                </div>
                <h3 className="text-lg font-bold mb-2 font-sans">Premium Aesthetics</h3>
                <p className="text-sm text-zinc-500 font-sans">Glassmorphism, subtle glows, and refined typography at the core.</p>
            </div>
            <div className="p-6 rounded-2xl border border-white/5 bg-zinc-900/20 backdrop-blur-md">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-4">
                    <MousePointer2 size={20} className="text-blue-500" />
                </div>
                <h3 className="text-lg font-bold mb-2 font-sans">AI-Ready</h3>
                <p className="text-sm text-zinc-500 font-sans">Built-in support for streaming text, chat interfaces, and GPU-accelerated effects.</p>
            </div>
        </div>

        <div className="space-y-6">
            <h2 className="text-2xl font-bold font-sans">Core Philosophy</h2>
            <div className="space-y-4 border-l border-zinc-800 pl-6 text-zinc-400 font-sans italic leading-relaxed">
                "We believe that AI software shouldn't just be functional; it should feel alive.
                Neural UI provides the building blocks for interfaces that respond to intelligence with fluid precision."
            </div>
        </div>
    </div>
);

const InstallationSection = () => (
    <div className="space-y-12">
        <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight font-sans">Installation</h1>
            <p className="text-xl text-zinc-400 font-light font-sans leading-relaxed">
                Seamlessly integrate Neural UI into your Next.js application.
            </p>
        </div>

        <div className="space-y-12">
            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-400 font-bold border border-zinc-700 font-mono">1</div>
                    <h3 className="text-xl font-bold font-sans text-zinc-100">Prerequisites</h3>
                </div>
                <div className="ml-12 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800 flex items-center gap-3 hover:border-zinc-700 transition-colors">
                        <div className="p-2 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                            <Terminal size={18} className="text-emerald-500" />
                        </div>
                        <span className="text-zinc-300 font-mono text-sm">Node.js 18+</span>
                    </div>
                    <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800 flex items-center gap-3 hover:border-zinc-700 transition-colors">
                        <div className="p-2 bg-blue-500/10 rounded-lg border border-blue-500/20">
                            <Code size={18} className="text-blue-500" />
                        </div>
                        <span className="text-zinc-300 font-mono text-sm">React 18+</span>
                    </div>
                    <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800 flex items-center gap-3 hover:border-zinc-700 transition-colors">
                        <div className="p-2 bg-purple-500/10 rounded-lg border border-purple-500/20">
                            <Layout size={18} className="text-purple-500" />
                        </div>
                        <span className="text-zinc-300 font-mono text-sm">Tailwind CSS 3+</span>
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-400 font-bold border border-zinc-700 font-mono">2</div>
                    <div>
                        <h3 className="text-xl font-bold font-sans text-zinc-100">Install Dependencies</h3>
                        <p className="text-sm text-zinc-500 font-sans mt-1">Neural UI is built on top of robust foundations.</p>
                    </div>
                </div>
                <div className="ml-12">
                    <NeuralCodeEditor
                        initialCode="npm install framer-motion lucide-react clsx tailwind-merge date-fns"
                        language="bash"
                        title="Terminal"
                        readOnly
                    />
                </div>
            </div>

            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-400 font-bold border border-zinc-700 font-mono">3</div>
                    <div>
                        <h3 className="text-xl font-bold font-sans text-zinc-100">Configure Tailwind</h3>
                        <p className="text-sm text-zinc-500 font-sans mt-1">Extend your theme in <code className="text-emerald-500 bg-emerald-500/10 px-1 rounded">tailwind.config.ts</code>.</p>
                    </div>
                </div>
                <div className="ml-12">
                    <NeuralCodeEditor
                        initialCode={`import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
      },
       fontFamily: {
        sans: ["var(--font-inter)"],
        mono: ["var(--font-jetbrains-mono)"],
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [],
};
export default config;`}
                        language="typescript"
                        title="tailwind.config.ts"
                        readOnly
                    />
                </div>
            </div>

            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-400 font-bold border border-zinc-700 font-mono">4</div>
                    <div>
                        <h3 className="text-xl font-bold font-sans text-zinc-100">Usage</h3>
                        <p className="text-sm text-zinc-500 font-sans mt-1">Import components and start building.</p>
                    </div>
                </div>
                <div className="ml-12">
                    <NeuralCodeEditor
                        initialCode={`import { NeuralButton } from "@/components/ui/core/NeuralButton";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-950 gap-4">
      <h1 className="text-2xl font-bold text-white">Welcome to Neural UI</h1>
      
      <NeuralButton variant="neon" size="lg">
        Initialize Core
      </NeuralButton>
      
      <NeuralButton variant="ghost">
        View Documentation
      </NeuralButton>
    </div>
  );
}`}
                        language="tsx"
                        title="src/app/page.tsx"
                        readOnly
                    />
                </div>
            </div>
        </div>
    </div>
);

const categories: Category[] = [
    {
        id: "getting-started",
        title: "Getting Started",
        icon: <Magnet size={18} />,
        isGettingStarted: true,
        components: [
            {
                id: "introduction",
                title: "Introduction",
                description: "The core design philosophy and goals of Neural UI.",
                component: <IntroductionSection />,
                code: ""
            },
            {
                id: "installation",
                title: "Installation",
                description: "Quick setup guide for Next.js projects.",
                component: <InstallationSection />,
                code: ""
            }
        ]
    },
    {
        id: "primitives",
        title: "Primitives",
        icon: <Box size={18} />,
        components: [
            {
                id: "button",
                title: "Button",
                description: "Interactive button with multiple variants, sizes and loading states. Built on top of Radix UI Slot for seamless composition.",
                component: <NeuralButton>Primary Action</NeuralButton>,
                code: `<NeuralButton>Primary Action</NeuralButton>`,
                variants: [
                    {
                        id: "secondary",
                        title: "Secondary Variant",
                        description: "Used for less prominent actions. Uses a subtle background and border.",
                        component: <NeuralButton variant="secondary">Secondary Action</NeuralButton>,
                        code: `<NeuralButton variant="secondary">Secondary Action</NeuralButton>`
                    },
                    {
                        id: "ghost",
                        title: "Ghost Variant",
                        description: "Minimalist style, often used in toolbars or secondary navigation.",
                        component: <NeuralButton variant="ghost">Ghost Button</NeuralButton>,
                        code: `<NeuralButton variant="ghost">Ghost Button</NeuralButton>`
                    },
                    {
                        id: "loading",
                        title: "Loading State",
                        description: "Built-in loading indicator that maintains layout width.",
                        component: <NeuralButton isLoading>Processing...</NeuralButton>,
                        code: `<NeuralButton isLoading>Processing...</NeuralButton>`
                    },
                    {
                        id: "icon",
                        title: "With Icon",
                        description: "Enhanced with Lucide icons for better visual cues.",
                        component: <NeuralButton icon={<Plus size={16} />}>Create New</NeuralButton>,
                        code: `<NeuralButton icon={<Plus size={16} />}>Create New</NeuralButton>`
                    }
                ]
            },
            {
                id: "badge",
                title: "Badge",
                description: "Compact status indicators using system tints and micro-animations.",
                component: <NeuralBadge>Default Badge</NeuralBadge>,
                code: `<NeuralBadge>Default Badge</NeuralBadge>`,
                variants: [
                    {
                        id: "success",
                        title: "Success State",
                        description: "Indicates a positive or completed process.",
                        component: <NeuralBadge status="success" dot>Operational</NeuralBadge>,
                        code: `<NeuralBadge status="success" dot>Operational</NeuralBadge>`
                    },
                    {
                        id: "warning",
                        title: "Warning State",
                        description: "Used for alerts or attention-requiring items.",
                        component: <NeuralBadge status="warning">Degraded</NeuralBadge>,
                        code: `<NeuralBadge status="warning">Degraded</NeuralBadge>`
                    },
                    {
                        id: "error",
                        title: "Error State",
                        description: "Indicates failure or critical system issues.",
                        component: <NeuralBadge status="error">Downtime</NeuralBadge>,
                        code: `<NeuralBadge status="error">Downtime</NeuralBadge>`
                    }
                ]
            },
            {
                id: "avatar",
                title: "Avatar",
                description: "User profile image with fallback and status indicators.",
                component: (
                    <div className="flex items-center gap-6">
                        <NeuralAvatar src="https://api.dicebear.com/7.x/bottts/svg?seed=Neural" size="lg" status="online" />
                        <NeuralAvatar fallback="JD" size="md" status="busy" />
                        <NeuralAvatar fallback="??" size="sm" status="offline" />
                    </div>
                ),
                code: `<NeuralAvatar src="https://api.dicebear.com/7.x/bottts/svg?seed=Neural" size="lg" status="online" />
<NeuralAvatar fallback="JD" size="md" status="busy" />`
            },
            {
                id: "loader",
                title: "Loader",
                description: "Versatile loading indicators for different contexts. From subtle line animations to complex orbital systems.",
                component: (
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                        {[
                            { v: "spinner", l: "Spinner" },
                            { v: "dots", l: "Dots" },
                            { v: "pulse", l: "Pulse" },
                            { v: "bars", l: "Bars" },
                            { v: "orbit", l: "Orbit" },
                            { v: "wave", l: "Wave" }
                        ].map(({ v, l }) => (
                            <div key={v} className="flex flex-col items-center justify-center p-8 rounded-2xl bg-zinc-900/40 border border-white/5 backdrop-blur-sm group hover:border-emerald-500/20 transition-all duration-300">
                                <NeuralLoaderVariants variant={v as any} size="md" />
                                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mt-6 group-hover:text-zinc-300 transition-colors">{l}</span>
                            </div>
                        ))}
                    </div>
                ),
                code: `<NeuralLoader variant="spinner" size="md" />
<NeuralLoader variant="orbit" size="lg" color="blue-400" />`,
                variants: [
                    {
                        id: "loader-sizes",
                        title: "Responsive Sizes",
                        description: "Three scaled sizes designed to fit everything from buttons to full-page overlays.",
                        component: (
                            <div className="flex items-center justify-around w-full p-8 rounded-2xl bg-zinc-900/20 border border-white/5">
                                <div className="text-center space-y-4">
                                    <NeuralLoaderVariants variant="spinner" size="sm" />
                                    <div className="text-[10px] text-zinc-600 font-mono">SMALL</div>
                                </div>
                                <div className="text-center space-y-4">
                                    <NeuralLoaderVariants variant="spinner" size="md" />
                                    <div className="text-[10px] text-zinc-600 font-mono">MEDIUM</div>
                                </div>
                                <div className="text-center space-y-4">
                                    <NeuralLoaderVariants variant="spinner" size="lg" />
                                    <div className="text-[10px] text-zinc-600 font-mono">LARGE</div>
                                </div>
                            </div>
                        ),
                        code: `<NeuralLoader size="sm" />\n<NeuralLoader size="md" />\n<NeuralLoader size="lg" />`
                    },
                ]
            },
            {
                id: "progress",
                title: "Progress",
                description: "Premium linear indicators with glassmorphism, animated gradients, and matching glows.",
                component: (
                    <div className="w-full max-w-sm space-y-8">
                        <NeuralProgress value={33} color="emerald" showValue />
                        <NeuralProgress value={65} color="blue" variant="gradient" showValue />
                        <NeuralProgress value={85} color="purple" variant="gradient" showValue />
                    </div>
                ),
                code: `<NeuralProgress value={33} color="emerald" showValue />
<NeuralProgress value={65} color="blue" variant="gradient" showValue />`,
                variants: [
                    {
                        id: "gradient-variant",
                        title: "Gradient Variant",
                        description: "Uses a multi-stop animated gradient for a dynamic feel.",
                        component: <NeuralProgress value={75} color="blue" variant="gradient" showValue />,
                        code: `<NeuralProgress variant="gradient" color="blue" value={75} />`
                    },
                    {
                        id: "colors",
                        title: "Semantic Colors",
                        description: "Pre-configured semantic tints with matching glows.",
                        component: (
                            <div className="w-full space-y-4">
                                <NeuralProgress value={90} color="rose" />
                                <NeuralProgress value={45} color="amber" />
                            </div>
                        ),
                        code: `<NeuralProgress color="rose" value={90} />`
                    }
                ]
            },
            {
                id: "tooltip",
                title: "Tooltip",
                description: "Contextual information accessible on hover.",
                component: (
                    <div className="flex items-center gap-4">
                        <NeuralTooltip content="This is a helpful tip" position="top">
                            <NeuralButton variant="secondary" size="sm">Hover Me</NeuralButton>
                        </NeuralTooltip>
                        <NeuralTooltip content="Quick Info" position="right">
                            <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center border border-zinc-700">
                                <Info size={16} className="text-zinc-400" />
                            </div>
                        </NeuralTooltip>
                    </div>
                ),
                code: `<NeuralTooltip content="This is a helpful tip" position="top">
    <NeuralButton>Hover Me</NeuralButton>
</NeuralTooltip>`
            },
            {
                id: "alert",
                title: "Alert",
                description: "Contextual feedback messages for user actions.",
                component: (
                    <div className="w-full max-w-md space-y-4">
                        <NeuralAlert title="Heads up!" description="You can add components to your app using the CLI." />
                        <NeuralAlert variant="destructive" title="Error" description="Something went wrong while fetching data." />
                        <NeuralAlert variant="success" title="Success" description="Your changes have been saved successfully." />
                    </div>
                ),
                code: `<NeuralAlert title="Heads up!" description="Info message." />
<NeuralAlert variant="destructive" title="Error" description="Something went wrong." />`
            },
            {
                id: "tabs",
                title: "Tabs",
                description: "Animated segmented controls with layout transitions. Supports multiple styling variants from minimal underlines to premium glassmorphism.",
                component: (
                    <div className="w-full max-w-md mx-auto p-8 rounded-3xl bg-zinc-950 border border-zinc-900 shadow-2xl relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="relative z-10 space-y-6">
                            <h4 className="text-sm font-medium text-zinc-400">Workspace Settings</h4>
                            <NeuralTabs
                                tabs={[
                                    { id: "account", label: "Account" },
                                    { id: "password", label: "Security" },
                                    { id: "billing", label: "Billing" },
                                ]}
                            />
                            <div className="h-24 rounded-xl bg-zinc-900/30 border border-zinc-800/50 flex items-center justify-center">
                                <span className="text-xs text-zinc-600">Adaptive content area</span>
                            </div>
                        </div>
                    </div>
                ),
                code: `<NeuralTabs
    tabs={[
        { id: "account", label: "Account" },
        { id: "security", label: "Security" },
        { id: "billing", label: "Billing" },
    ]}
/>`,
                variants: [
                    {
                        id: "pill-tabs",
                        title: "Pill Variant",
                        description: "Modern pill-shaped tabs with high-contrast active state and matching glow. Perfect for dashboard filters.",
                        component: (
                            <div className="w-full space-y-4">
                                <div className="flex items-center justify-between px-2">
                                    <h5 className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Market Feed</h5>
                                    <div className="flex gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                        <span className="text-[10px] text-zinc-400 font-mono text-emerald-500">LIVE</span>
                                    </div>
                                </div>
                                <NeuralTabs
                                    variant="pill"
                                    tabs={[
                                        { id: "all", label: "All" },
                                        { id: "btc", label: "BTC" },
                                        { id: "eth", label: "ETH" },
                                        { id: "sol", label: "SOL" },
                                    ]}
                                />
                                <div className="grid grid-cols-2 gap-3 pt-2">
                                    {[1, 2].map(i => (
                                        <div key={i} className="p-3 rounded-xl bg-zinc-900/50 border border-zinc-800 flex flex-col gap-1">
                                            <div className="flex justify-between">
                                                <span className="text-[10px] text-zinc-500 font-bold uppercase">Price</span>
                                                <span className="text-[10px] text-emerald-500 font-mono">+2.{i}%</span>
                                            </div>
                                            <span className="text-sm font-mono text-zinc-200">$5{i},234.00</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ),
                        code: `<NeuralTabs variant="pill" tabs={assets} />`
                    },
                    {
                        id: "underline-tabs",
                        title: "Underline Variant",
                        description: "Minimalist baseline-aligned tabs with animated progress indicator. Ideal for profile or long-form navigation.",
                        component: (
                            <div className="w-full max-w-sm space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-900 border border-zinc-800 p-0.5">
                                        <div className="w-full h-full rounded-full bg-zinc-950 flex items-center justify-center">
                                            <User size={20} className="text-zinc-500" />
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-white">Alex Rivera</h4>
                                        <p className="text-xs text-zinc-500 font-mono">PRO MEMBER</p>
                                    </div>
                                </div>
                                <NeuralTabs
                                    variant="underline"
                                    className="w-full"
                                    tabs={[
                                        { id: "general", label: "Profile" },
                                        { id: "security", label: "Security" },
                                        { id: "notifications", label: "Activity" },
                                    ]}
                                />
                                <div className="pt-2 space-y-3">
                                    <div className="h-2 w-3/4 rounded bg-zinc-900/50 animate-pulse" />
                                    <div className="h-2 w-1/2 rounded bg-zinc-800/50" />
                                </div>
                            </div>
                        ),
                        code: `<NeuralTabs variant="underline" tabs={navItems} />`
                    },
                    {
                        id: "glass-tabs",
                        title: "Glass Variant",
                        description: "Premium glassmorphism effect with background blur and soft borders. Best used over colorful backgrounds.",
                        component: (
                            <div className="relative p-12 rounded-[2rem] bg-zinc-950 border border-zinc-900 overflow-hidden group">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
                                <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/20 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2" />
                                <div className="relative z-10 flex flex-col items-center gap-8">
                                    <div className="text-center space-y-2">
                                        <h3 className="text-lg font-bold text-white">Neural Cluster</h3>
                                        <p className="text-xs text-zinc-400">Select active processing node</p>
                                    </div>
                                    <NeuralTabs
                                        variant="glass"
                                        tabs={[
                                            { id: "v1", label: "Node Alpha" },
                                            { id: "v2", label: "Node Beta" },
                                            { id: "v3", label: "Node Gamma" },
                                        ]}
                                    />
                                    <div className="w-full grid grid-cols-3 gap-3">
                                        {[84, 91, 76].map((progress, i) => (
                                            <div key={i} className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex flex-col items-center gap-2">
                                                <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-tighter text-center">Load</div>
                                                <div className="text-xs font-mono text-zinc-200">{progress}%</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ),
                        code: `<NeuralTabs variant="glass" tabs={nodes} />`
                    }
                ]
            },
            {
                id: "marquee",
                title: "Neural Marquee",
                description: "GPU-accelerated scrolling ticker for text, images, or log data. Supports vertical and horizontal orientations.",
                addedAt: "2026-02-27",
                component: (
                    <div className="w-full py-4 border-y border-zinc-900 bg-zinc-950/30">
                        <NeuralMarquee speed={30}>
                            {["BLOCKCHAIN", "NEURAL", "AGENTIC", "AUTONOMOUS", "CRYPTO"].map((s) => (
                                <span key={s} className="text-xl font-bold font-mono text-zinc-600 px-4">{s}</span>
                            ))}
                        </NeuralMarquee>
                    </div>
                ),
                code: `<NeuralMarquee speed={30}>\n  {items.map(i => <div key={i}>{i}</div>)}\n</NeuralMarquee>`,
                variants: [
                    {
                        id: "vertical-marquee",
                        title: "Vertical Orientation",
                        description: "Scrolls vertically, useful for logs or sidebars.",
                        component: (
                            <div className="h-40 border border-zinc-800 rounded-xl overflow-hidden bg-zinc-950">
                                <NeuralMarquee direction="up" speed={15} className="h-full">
                                    {[1, 2, 3, 4, 5].map(i => (
                                        <div key={i} className="text-[10px] font-mono text-emerald-500 py-1 px-3">
                                            PROTOCOL_SYNC_NODE_{i}
                                        </div>
                                    ))}
                                </NeuralMarquee>
                            </div>
                        ),
                        code: `<NeuralMarquee direction="up" />`
                    }
                ]
            },
            {
                id: "toast",
                title: "Neural Toaster",
                description: "Premium notification system with status-specific styling and smooth entry animations.",
                addedAt: "2026-02-27",
                component: (
                    <div className="flex gap-4">
                        <NeuralToastDemo />
                    </div>
                ),
                code: `// Wrap app in <NeuralToastProvider />\nconst { toast } = useNeuralToast();\ntoast("System Online", { type: "success" });`
            },
            {
                id: "dialog",
                title: "Dialog",
                description: "A window overlaid on existing content.",
                component: (
                    <div className="flex justify-center">
                        <DialogPreview />
                    </div>
                ),
                code: `<NeuralDialog>
  <NeuralDialogTrigger>Open</NeuralDialogTrigger>
  <NeuralDialogContent>
    <NeuralDialogHeader>
      <NeuralDialogTitle>Title</NeuralDialogTitle>
    </NeuralDialogHeader>
    {/* Content */}
  </NeuralDialogContent>
</NeuralDialog>`
            }
        ]
    },
    {
        id: "forms",
        title: "Forms & Inputs",
        icon: <ToggleLeft size={18} />,
        components: [
            {
                id: "input",
                title: "Input Fields",
                description: "Text inputs with clean borders, focus rings, and icon support. Includes specialized types for passwords and authentication with real-time feedback.",
                component: (
                    <div className="w-full max-w-md mx-auto p-12 rounded-[2.5rem] bg-zinc-950 border border-zinc-900 shadow-2xl relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                        <div className="relative z-10 space-y-8">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.4)]">
                                    <Search size={18} className="text-black" />
                                </div>
                                <h4 className="text-sm font-bold text-white tracking-tight">Neural Search</h4>
                            </div>
                            <NeuralInput
                                variant="default"
                                placeholder="Search for components, files, or users..."
                                className="h-12"
                            />
                            <div className="flex flex-wrap gap-2">
                                {['⌘K', '⌘P', '⌘O'].map(k => (
                                    <span key={k} className="px-2 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-[10px] text-zinc-500 font-mono">{k}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                ),
                code: `<NeuralInput 
  icon={<Search size={14} />} 
  placeholder="Search..." 
/>`,
                variants: [
                    {
                        id: "input-variants",
                        title: "Visual Variants",
                        description: "Three distinct styles designed for different interface contexts.",
                        component: (
                            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="p-6 rounded-2xl bg-zinc-900/30 border border-zinc-800/50 space-y-4">
                                    <h5 className="text-[10px] font-bold text-zinc-500 uppercase">Modern Underline</h5>
                                    <NeuralInput variant="underlined" placeholder="Write something..." />
                                </div>
                                <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-white/5 backdrop-blur-md space-y-4">
                                    <h5 className="text-[10px] font-bold text-blue-400 uppercase">Glass Morphic</h5>
                                    <NeuralInput variant="glass" placeholder="Overlay input..." />
                                </div>
                            </div>
                        ),
                        code: `<NeuralInput variant="underlined" />\n<NeuralInput variant="glass" />`
                    },
                    {
                        id: "password-input",
                        title: "Security Shield",
                        description: "Full-featured authentication component with visibility toggle and automatic strength analysis.",
                        component: (
                            <div className="w-full max-w-sm mx-auto p-10 rounded-[2rem] bg-zinc-950 border border-zinc-900 relative overflow-hidden">
                                <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/10 blur-[60px] rounded-full" />
                                <div className="relative z-10 space-y-6">
                                    <div className="text-center space-y-1">
                                        <h4 className="text-lg font-bold text-white">Unlock Access</h4>
                                        <p className="text-xs text-zinc-500">Minimum 8 characters with symbols</p>
                                    </div>
                                    <NeuralPasswordInput
                                        label="Personal Ledger Key"
                                        placeholder="Enter key"
                                        showStrengthIndicator
                                    />
                                    <NeuralButton className="w-full rounded-xl bg-zinc-50 text-black hover:bg-white">Authorize Access</NeuralButton>
                                </div>
                            </div>
                        ),
                        code: `<NeuralPasswordInput showStrengthIndicator />`
                    },
                    {
                        id: "otp-input",
                        title: "Zero-Trust Verification",
                        description: "High-precision TOTP input for mission-critical authentication flows.",
                        component: (
                            <div className="w-full p-12 rounded-[2rem] bg-gradient-to-b from-zinc-900 to-black border border-zinc-800/50 flex flex-col items-center gap-8 shadow-inner">
                                <div className="space-y-2 text-center">
                                    <div className="inline-flex px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-bold text-emerald-500 uppercase tracking-widest mb-2">
                                        Security Check
                                    </div>
                                    <h4 className="text-xl font-black text-white">Confirm Identity</h4>
                                    <p className="text-xs text-zinc-500">We sent a 6-digit code to your mobile</p>
                                </div>
                                <NeuralOTPInput length={6} />
                                <div className="flex gap-4">
                                    <button className="text-[10px] text-zinc-500 hover:text-zinc-300 font-bold uppercase underline underline-offset-4 decoration-zinc-800">Resend Code</button>
                                    <button className="text-[10px] text-zinc-500 hover:text-zinc-300 font-bold uppercase underline underline-offset-4 decoration-zinc-800">Support</button>
                                </div>
                            </div>
                        ),
                        code: `<NeuralOTPInput length={6} />`
                    }
                ]
            },
            {
                id: "checkbox",
                title: "Checkbox",
                description: "Minimalist checkbox with micro-animations.",
                component: (
                    <div className="flex flex-col gap-4">
                        <NeuralCheckbox label="Accept Terms" description="You agree to our Terms of Service." defaultChecked />
                        <NeuralCheckbox label="Subscribe to Newsletter" />
                        <NeuralCheckbox label="Disabled Option" disabled />
                    </div>
                ),
                code: `<NeuralCheckbox label="Accept Terms" defaultChecked />
<NeuralCheckbox label="Subscribe" />`
            },
            {
                id: "slider",
                title: "Slider",
                description: "Range slider for numeric values.",
                component: (
                    <div className="w-full max-w-xs space-y-6">
                        <NeuralSlider min={0} max={100} defaultValue={50} label="Volume" />
                        <NeuralSlider min={10} max={200} step={10} defaultValue={120} label="Capacity" />
                    </div>
                ),
                code: `<NeuralSlider min={0} max={100} defaultValue={50} label="Volume" />`
            },
            {
                id: "select",
                title: "Select",
                description: "Deeply customizable dropdown systems with multiple cinematic variants and support for metadata context.",
                addedAt: "2026-02-11",
                component: (
                    <div className="w-full max-w-sm p-12 rounded-[2.5rem] bg-zinc-950 border border-zinc-900 shadow-2xl relative group overflow-visible">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-[60px] rounded-full -translate-y-1/2 translate-x-1/2" />
                        <NeuralSelect
                            label="Neural Architecture"
                            variant="neon"
                            options={[
                                { value: "gpt-4", label: "GPT-4 Turbo", icon: <Cpu size={14} />, description: "Advanced reasoning & logic" },
                                { value: "claude-3", label: "Claude 3 Opus", icon: <Sparkles size={14} />, description: "Creative synthesis" },
                                { value: "gemini", label: "Gemini Pro", icon: <Globe size={14} />, description: "Multimodal processing" },
                            ]}
                            onValueChange={() => { }}
                            defaultValue="gpt-4"
                            helpText="Proprietary cognition modules"
                        />
                    </div>
                ),
                code: `<NeuralSelect
    label="Architecture"
    variant="neon"
    options={[
        { value: "gpt-4", label: "GPT-4 Turbo", icon: <Cpu />, description: "Advanced reasoning" },
        // ...
    ]}
/>`,
                variants: [
                    {
                        id: "select-variants",
                        title: "Visual Stacks",
                        description: "Standard, Glass, and Ghost variations to fit into any layer of your UI.",
                        component: (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                                <div className="space-y-2">
                                    <span className="text-[9px] font-mono text-zinc-600 uppercase">Standard</span>
                                    <NeuralSelect
                                        variant="default"
                                        options={[{ value: '1', label: 'Option 1' }]}
                                        onValueChange={() => { }}
                                        defaultValue="1"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <span className="text-[9px] font-mono text-zinc-600 uppercase">Glass</span>
                                    <NeuralSelect
                                        variant="glass"
                                        options={[{ value: '1', label: 'Glass View' }]}
                                        onValueChange={() => { }}
                                        defaultValue="1"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <span className="text-[9px] font-mono text-zinc-600 uppercase">Ghost</span>
                                    <NeuralSelect
                                        variant="ghost"
                                        options={[{ value: '1', label: 'Minimalist' }]}
                                        onValueChange={() => { }}
                                        defaultValue="1"
                                    />
                                </div>
                            </div>
                        ),
                        code: `<NeuralSelect variant="glass" />\n<NeuralSelect variant="ghost" />`
                    },
                    {
                        id: "select-metadata",
                        title: "High-Density Context",
                        description: "Enhance decision making with integrated icons and descriptions for every option.",
                        component: (
                            <div className="w-full max-w-sm">
                                <NeuralSelect
                                    variant="default"
                                    options={[
                                        { value: "eth", label: "Ethereum", icon: <Coins size={14} className="text-blue-400" />, description: "ERC-20 Ecosystem" },
                                        { value: "btc", label: "Bitcoin", icon: <Coins size={14} className="text-amber-500" />, description: "Digital Gold" },
                                        { value: "sol", label: "Solana", icon: <Coins size={14} className="text-purple-400" />, description: "High-throughput chain" },
                                    ]}
                                    onValueChange={() => { }}
                                    defaultValue="eth"
                                />
                            </div>
                        ),
                        code: `<NeuralSelect\n  options={[\n    { label: "ETH", icon: <Coins />, description: "Chain" },\n    // ...\n  ]}\n/>`
                    }
                ]
            },
            {
                id: "switch",
                title: "Switch",
                description: "Spring-animated toggle switch with glow effects.",
                component: (
                    <div className="flex flex-col gap-4">
                        <NeuralSwitch label="Airplane Mode" checked />
                        <NeuralSwitch label="Do Not Disturb" />
                        <NeuralSwitch label="Disabled" disabled />
                    </div>
                ),
                code: `<NeuralSwitch label="Airplane Mode" checked />\n<NeuralSwitch label="Do Not Disturb" />\n<NeuralSwitch label="Disabled" disabled />`
            },
            {
                id: "date-picker",
                title: "Date Picker",
                description: "Technical calendar system for scheduling and temporal selection.",
                addedAt: "2026-02-11",
                component: (
                    <div className="w-full max-w-sm">
                        <NeuralDatePicker label="Deployment Schedule" variant="neon" />
                    </div>
                ),
                code: `<NeuralDatePicker label="Schedule" variant="neon" />`,
                variants: [
                    {
                        id: "date-glass",
                        title: "Glass Variation",
                        description: "Soft aesthetic for transparent layouts.",
                        component: <NeuralDatePicker variant="glass" />,
                        code: `<NeuralDatePicker variant="glass" />`
                    }
                ]
            },
            {
                id: "file-upload",
                title: "File Upload Zone",
                description: "High-security transmission portal for data ingestion.",
                addedAt: "2026-02-11",
                component: (
                    <div className="w-full max-w-md">
                        <FileUploadZone />
                    </div>
                ),
                code: `<FileUploadZone maxFiles={5} />`
            },
            {
                id: "drag-drop",
                title: "Drag & Drop",
                description: "Interactive reordering systems for cluster and node management.",
                addedAt: "2026-02-11",
                component: (
                    <div className="w-full max-w-md p-8 rounded-[2rem] bg-zinc-950 border border-zinc-900 shadow-2xl">
                        <DragDropList
                            items={[
                                { id: "1", title: "Node Alpha", status: "Active", type: "node", icon: Cpu },
                                { id: "2", title: "Gateway Gamma", status: "Standby", type: "bridge", icon: Zap },
                                { id: "3", title: "Storage Shard", status: "Syncing", type: "module", icon: Database },
                            ]}
                        />
                    </div>
                ),
                code: `<DragDropList items={clusterNodes} />`
            }
        ]
    },
    {
        id: "effects",
        title: "Visual Effects",
        icon: <Magnet size={18} />,
        components: [
            {
                id: "magnetic",
                title: "Magnetic Wrapper",
                description: "Wraps any element to add a magnetic cursor effect. Perfect for focus elements, icons, and interactive cards.",
                component: (
                    <div className="p-20 flex justify-center items-center bg-zinc-950 rounded-[3rem] border border-zinc-900 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                        <Magnetic strength={0.25}>
                            <div className="relative">
                                <div className="absolute inset-[-15px] bg-emerald-500/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                                <NeuralButton size="lg" className="rounded-full h-20 w-20 p-0 flex items-center justify-center shadow-2xl border-emerald-500/20">
                                    <Sparkles size={32} className="text-emerald-400" />
                                </NeuralButton>
                            </div>
                        </Magnetic>
                    </div>
                ),
                code: `<Magnetic strength={0.3}>\n  <NeuralButton>Magnetic</NeuralButton>\n</Magnetic>`,
                variants: [
                    {
                        id: "magnetic-dock",
                        title: "Social Dock",
                        description: "High-density dock with subtle magnetic attraction for precision interaction.",
                        component: (
                            <div className="flex gap-4 p-6 bg-zinc-900/40 rounded-3xl border border-white/5 backdrop-blur-sm">
                                {[
                                    { icon: <Github size={20} />, color: "hover:text-white" },
                                    { icon: <XIcon size={18} />, color: "hover:text-white" },
                                    { icon: <ExternalLink size={20} />, color: "hover:text-emerald-400" }
                                ].map((item, i) => (
                                    <Magnetic key={i} strength={0.4}>
                                        <button className={cn("w-12 h-12 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-center text-zinc-500 transition-colors duration-300", item.color)}>
                                            {item.icon}
                                        </button>
                                    </Magnetic>
                                ))}
                            </div>
                        ),
                        code: `<div className="flex gap-4">\n  {items.map(item => (\n    <Magnetic strength={0.4}>\n      <IconButton icon={item.icon} />\n    </Magnetic>\n  ))}\n</div>`
                    },
                    {
                        id: "magnetic-card",
                        title: "Interactive Surface",
                        description: "Applying magnetic effects to larger surface areas for a weightless, premium feel.",
                        component: (
                            <div className="w-full flex justify-center py-8">
                                <Magnetic strength={0.15}>
                                    <div className="p-8 rounded-[2rem] bg-gradient-to-br from-zinc-900 to-black border border-zinc-800 shadow-xl cursor-pointer group/card max-w-[280px]">
                                        <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-6 group-hover/card:scale-110 transition-transform">
                                            <Layers size={22} />
                                        </div>
                                        <h4 className="text-lg font-bold text-white mb-2">Neural Link</h4>
                                        <p className="text-xs text-zinc-500 leading-relaxed font-sans">
                                            A weightless interface element that reacts to the cursor presence.
                                        </p>
                                    </div>
                                </Magnetic>
                            </div>
                        ),
                        code: `<Magnetic strength={0.15}>\n  <div className="p-8 rounded-3xl bg-zinc-900">...</div>\n</Magnetic>`
                    }
                ]
            },
            {
                id: "spotlight-card",
                title: "Spotlight Card",
                description: "Interactive card with dynamic glassmorphic radial glow.",
                component: (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full px-4">
                        <SpotlightCard className="p-8 min-h-[200px] flex flex-col justify-end">
                            <h4 className="text-xl font-bold font-sans mb-2">Neural Card</h4>
                            <p className="text-sm text-zinc-500 font-sans">Hover to see the spotlight.</p>
                        </SpotlightCard>
                        <SpotlightCard spotlightColor="rgba(59, 130, 246, 0.15)" className="p-8 min-h-[200px] flex flex-col justify-end">
                            <h4 className="text-xl font-bold font-sans mb-2 text-blue-400">Blue Flux</h4>
                            <p className="text-sm text-zinc-500 font-sans">Custom spotlight colors.</p>
                        </SpotlightCard>
                    </div>
                ),
                code: `<SpotlightCard>
  {/* Content */}
</SpotlightCard>`
            },
            {
                id: "command-bar",
                title: "Command Bar",
                description: "A professional ⌘K interface for power users.",
                component: (
                    <div className="flex flex-col items-center gap-4 py-8">
                        <p className="text-sm text-zinc-500 font-sans">The command bar is active on this site. Try the shortcut.</p>
                        <NeuralButton onClick={() => document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }))}>
                            Open Command Bar (⌘K)
                        </NeuralButton>
                    </div>
                ),
                code: `<NeuralCommandBar />`
            },
            {
                id: "skeleton",
                title: "Skeleton Loader",
                description: "Clean, animated placeholders for loading states. Supports shimmer and pulse animations.",
                component: (
                    <div className="w-full max-w-sm space-y-6">
                        {/* Standard Variants */}
                        <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-900 space-y-4">
                            <div className="flex items-center gap-3">
                                <NeuralSkeleton className="w-10 h-10 rounded-xl" />
                                <div className="space-y-1.5 flex-1">
                                    <NeuralSkeleton className="h-3 w-1/2" />
                                    <NeuralSkeleton className="h-2 w-1/3 opacity-50" />
                                </div>
                            </div>
                            <NeuralSkeleton className="h-24 w-full rounded-xl" />
                            <div className="flex justify-between items-center pt-2">
                                <NeuralSkeleton className="h-2 w-16" />
                                <NeuralSkeleton className="h-8 w-24 rounded-lg" />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest pl-1">Pulse Variant</span>
                                <NeuralSkeleton variant="pulse" className="h-12 w-full" />
                            </div>
                            <div className="space-y-2">
                                <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest pl-1">Shimmer (Default)</span>
                                <NeuralSkeleton variant="default" className="h-12 w-full" />
                            </div>
                        </div>
                    </div>
                ),
                code: `<NeuralSkeleton className="w-full h-24" />\n<NeuralSkeleton variant="pulse" className="w-full h-24" />`,
                variants: [
                    {
                        id: "skeleton-interactive",
                        title: "Loading Transition",
                        description: "Example of how skeletons bridge the gap during data fetching.",
                        component: (
                            <div className="w-full space-y-4">
                                <LoadingInterfaceDemo />
                            </div>
                        ),
                        code: `// loading state toggles visibility of skeletons\n{isLoading ? <NeuralSkeleton /> : <Content />}`
                    }
                ]
            },
        ]
    },
    {
        id: "layouts",
        title: "Layouts & Dashboards",
        icon: <PieChart size={18} />,
        components: [
            {
                id: "card",
                title: "Card",
                description: "Composable card architecture for standard UI patterns.",
                component: (
                    <NeuralCard className="w-full max-w-sm">
                        <NeuralCardHeader>
                            <NeuralCardTitle>Project Settings</NeuralCardTitle>
                            <NeuralCardDescription>Manage your deployment keys.</NeuralCardDescription>
                        </NeuralCardHeader>
                        <NeuralCardContent>
                            <div className="space-y-2">
                                <NeuralInput placeholder="Project Name" defaultValue="NeuralUI" />
                                <div className="flex justify-end gap-2 mt-4">
                                    <NeuralButton variant="ghost" size="sm">Cancel</NeuralButton>
                                    <NeuralButton size="sm">Save</NeuralButton>
                                </div>
                            </div>
                        </NeuralCardContent>
                    </NeuralCard>
                ),
                code: `<NeuralCard>
  <NeuralCardHeader>
    <NeuralCardTitle>Project Settings</NeuralCardTitle>
    <NeuralCardDescription>Manage keys.</NeuralCardDescription>
  </NeuralCardHeader>
  <NeuralCardContent>
    {/* Content */}
  </NeuralCardContent>
</NeuralCard>`
            },
            {
                id: "accordion",
                title: "Accordion",
                description: "Vertically stacked interactive headings that reveal details.",
                component: (
                    <div className="w-full max-w-md">
                        <NeuralAccordion
                            items={[
                                { value: "item-1", title: "Is it accessible?", content: "Yes. It adheres to the WAI-ARIA design pattern." },
                                { value: "item-2", title: "Is it styled?", content: "Yes. It comes with default styles that matches the other components' aesthetic." },
                                { value: "item-3", title: "Is it animated?", content: "Yes. It's animated by default, but you can disable it if you prefer." },
                            ]}
                        />
                    </div>
                ),
                code: `<NeuralAccordion 
    items={[
        { value: "item-1", title: "Question?", content: "Answer." },
        { value: "item-2", title: "Another?", content: "Yes." },
    ]}
/>`
            },
            {
                id: "breadcrumb",
                title: "Breadcrumb",
                description: "Displays the path to the current resource.",
                component: (
                    <div className="p-4 bg-zinc-900/50 rounded-lg border border-zinc-800">
                        <NeuralBreadcrumb
                            items={[
                                { label: "Dashboard", href: "#" },
                                { label: "Components", href: "#" },
                                { label: "Breadcrumb" }
                            ]}
                        />
                    </div>
                ),
                code: `<NeuralBreadcrumb 
    items={[
        { label: "Dashboard", href: "/dashboard" },
        { label: "Components", href: "/docs" },
        { label: "Breadcrumb" }
    ]}
/>`
            },
            {
                id: "command",
                title: "Command Palette",
                description: "Fast, composable, unstyled command menu for React.",
                component: (
                    <div className="h-48 flex items-center justify-center border border-zinc-800 rounded-xl bg-zinc-950/50 w-full relative overflow-hidden">
                        <CommandPalettePreview />
                    </div>
                ),
                code: `<CommandPalette isOpen={isOpen} onClose={() => setIsOpen(false)} />`
            },
            {
                id: "table",
                title: "Data Table",
                description: "Advanced table with filtering, sorting, and pagination.",
                component: (
                    <div className="w-full">
                        <TablePreview />
                    </div>
                ),
                code: `<NeuralDataTable 
    data={users} 
    columns={columns} 
    pageSize={5} 
/>`
            },
            {
                id: "analytics",
                title: "Analytics Card",
                description: "Complex dashboard widget with interactive SVG chart.",
                component: (
                    <div className="w-full max-w-lg">
                        <AnalyticsCard />
                    </div>
                ),
                code: `<AnalyticsCard />`
            },
            {
                id: "swap",
                title: "Swap Interface",
                description: "High-density crypto trading interface example.",
                component: <SwapCard />,
                code: `<SwapCard />`
            },
            {
                id: "wallet-modal",
                title: "Wallet Modal",
                description: "Connect wallet modal with list and QR views.",
                component: (
                    <div className="h-64 flex items-center justify-center border border-zinc-800 rounded-xl bg-zinc-950/50 w-full relative overflow-hidden">
                        {/* We use a stateful wrapper to simulate the modal within the preview */}
                        <WalletConnectPreview />
                    </div>
                ),
                code: `<WalletConnectModal 
    isOpen={isOpen} 
    onClose={() => setIsOpen(false)} 
    onConnect={(id) => console.log(id)} 
/>`
            },
            {
                id: "code-editor",
                title: "Code Editor",
                description: "Interactive PrismJS powered editor with custom syntax highlighting.",
                component: (
                    <div className="w-full max-w-2xl">
                        <NeuralCodeEditor
                            initialCode={`function NeuralAI() {\n  const [state, setState] = useState("active");\n\n  return (\n    <div className="neural-node">\n      Cognitive bridge: {state}\n    </div>\n  );\n}`}
                            language="tsx"
                        />
                    </div>
                ),
                code: `<NeuralCodeEditor \n  initialCode={code} \n  language="tsx" \n/>`
            },
            {
                id: "radar-chart",
                title: "Radar Chart",
                description: "Multivariate data visualization for model performance comparison.",
                component: (
                    <div className="flex justify-center p-8 bg-zinc-900/20 rounded-3xl border border-white/5">
                        <RadarChart
                            size={240}
                            metrics={[
                                { label: "Speed", value: 85, max: 100 },
                                { label: "Accuracy", value: 92, max: 100 },
                                { label: "Safety", value: 78, max: 100 },
                                { label: "Reasoning", value: 95, max: 100 },
                                { label: "Context", value: 88, max: 100 },
                            ]}
                        />
                    </div>
                ),
                code: `<RadarChart \n  metrics={[\n    { label: "Speed", value: 85, max: 100 },\n    // ...\n  ]} \n/>`
            },
            {
                id: "sparkline",
                title: "Mini Sparkline",
                description: "Compact line charts with glow effects for dashboard metrics.",
                component: (
                    <div className="flex gap-12 p-8 bg-zinc-900/20 rounded-3xl border border-white/5">
                        <div className="space-y-2 text-center">
                            <div className="text-2xl font-bold font-mono">$3,451</div>
                            <MiniSparkline
                                data={[
                                    { label: "1", value: 10 }, { label: "2", value: 15 }, { label: "3", value: 8 },
                                    { label: "4", value: 20 }, { label: "5", value: 18 }, { label: "6", value: 25 }
                                ]}
                            />
                        </div>
                        <div className="space-y-2 text-center">
                            <div className="text-2xl font-bold font-mono text-blue-400">98.2%</div>
                            <MiniSparkline
                                color="#60a5fa"
                                data={[
                                    { label: "1", value: 80 }, { label: "2", value: 85 }, { label: "3", value: 90 },
                                    { label: "4", value: 88 }, { label: "5", value: 95 }, { label: "6", value: 98 }
                                ]}
                            />
                        </div>
                    </div>
                ),
                code: `<MiniSparkline data={data} color="#10b981" />`
            },
            {
                id: "address-badge",
                title: "Address Badge",
                description: "Truncated crypto address with copy functionality.",
                component: (
                    <div className="flex flex-col gap-4">
                        <AddressBadge address="0x71C7656EC7ab88b098defB751B7401B5f6d8976F" />
                        <AddressBadge address="0xAbCd...EfGh" showAvatar={false} className="bg-emerald-500/10 border-emerald-500/50 text-emerald-400" />
                    </div>
                ),
                code: `<AddressBadge address="0x71C...976F" />`
            },
            {
                id: "export-button",
                title: "Export Button",
                description: "Premium client-side data downloader supporting CSV and JSON formats.",
                component: (
                    <NeuralExportButton
                        data={[
                            { id: 1, name: "Neural Node A", status: "Active", throughput: "1.2GB/s" },
                            { id: 2, name: "Neural Node B", status: "Idle", throughput: "0GB/s" },
                            { id: 3, name: "Neural Node C", status: "Active", throughput: "4.5GB/s" },
                        ]}
                        filename="neural-system-export"
                    />
                ),
                code: `<NeuralExportButton 
    data={data} 
    filename="system-report" 
/>`
            },
            {
                id: "scrollbar",
                title: "Custom ScrollBar",
                description: "Styled scrollbar replacement with smooth animations and auto-hide functionality.",
                component: (
                    <div className="w-full max-w-sm">
                        <CustomScrollBar maxHeight="320px" className="border border-zinc-800 rounded-xl bg-zinc-950/50 shadow-inner">
                            <div className="p-4 space-y-1">
                                <div className="flex items-center justify-between px-2 py-2 mb-2 sticky top-0 bg-zinc-950/95 backdrop-blur-sm z-10 border-b border-zinc-800/50">
                                    <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">System Activity</span>
                                    <span className="text-[10px] bg-emerald-500/10 text-emerald-500 px-1.5 py-0.5 rounded border border-emerald-500/20">Live</span>
                                </div>
                                {Array.from({ length: 12 }).map((_, i) => (
                                    <div key={i} className="group relative flex gap-3 p-3 rounded-lg hover:bg-zinc-900/50 transition-colors border border-transparent hover:border-zinc-800/50">
                                        <div className={cn(
                                            "mt-1 w-2 h-2 rounded-full ring-2 ring-opacity-20",
                                            i % 4 === 0 ? "bg-emerald-500 ring-emerald-500" :
                                                i % 4 === 1 ? "bg-blue-500 ring-blue-500" :
                                                    i % 4 === 2 ? "bg-amber-500 ring-amber-500" : "bg-zinc-500 ring-zinc-500"
                                        )} />
                                        <div className="flex-1 space-y-0.5">
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs font-medium text-zinc-200">
                                                    {i % 4 === 0 ? "Deployment Successful" :
                                                        i % 4 === 1 ? "New Connection" :
                                                            i % 4 === 2 ? "High Latency Detected" : "Routine Maintenance"}
                                                </span>
                                                <span className="text-[10px] text-zinc-600 font-mono">{i * 2 + 1}m ago</span>
                                            </div>
                                            <p className="text-[11px] text-zinc-500 line-clamp-1">
                                                {i % 4 === 0 ? "v2.4.0 pushed to production node-gamma." :
                                                    i % 4 === 1 ? "Client 192.168.0.1 established secure link." :
                                                        i % 4 === 2 ? "Response time > 400ms on shard-04." : "Optimizing database indexes."}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CustomScrollBar>
                    </div>
                ),
                code: `<CustomScrollBar maxHeight="320px">
    <div className="p-4">
        {logs.map((log) => (
            <LogItem key={log.id} data={log} />
        ))}
    </div>
</CustomScrollBar>`,
                variants: [
                    {
                        id: "horizontal-scrollbar",
                        title: "Horizontal Orientation",
                        description: "Full support for horizontal scrolling with matching track and thumb positioning.",
                        component: (
                            <div className="w-full max-w-sm">
                                <CustomScrollBar orientation="horizontal" maxWidth="100%" className="border border-zinc-800 rounded-xl bg-zinc-950/50">
                                    <div className="flex gap-4 p-6 w-max">
                                        {Array.from({ length: 8 }).map((_, i) => (
                                            <div key={i} className="group w-[240px] flex-shrink-0 p-5 bg-zinc-900/40 hover:bg-zinc-900/80 rounded-xl border border-zinc-800 hover:border-zinc-700 transition-all cursor-pointer">
                                                <div className={cn(
                                                    "w-10 h-10 rounded-lg mb-4 flex items-center justify-center border bg-gradient-to-br",
                                                    i % 3 === 0 ? "from-emerald-500/10 to-emerald-900/10 border-emerald-500/20 text-emerald-500" :
                                                        i % 3 === 1 ? "from-blue-500/10 to-blue-900/10 border-blue-500/20 text-blue-500" :
                                                            "from-purple-500/10 to-purple-900/10 border-purple-500/20 text-purple-500"
                                                )}>
                                                    <Box size={20} />
                                                </div>
                                                <div className="space-y-2">
                                                    <div className="flex items-center justify-between">
                                                        <h4 className="text-sm font-bold text-zinc-200 group-hover:text-white transition-colors">Neural Module {i + 1}</h4>
                                                        <ArrowRight size={14} className="text-zinc-600 group-hover:text-zinc-400 group-hover:translate-x-0.5 transition-all" />
                                                    </div>
                                                    <p className="text-xs text-zinc-500 leading-relaxed">
                                                        Pre-trained transformer model for {i % 3 === 0 ? "natural language tasks" : i % 3 === 1 ? "image synthesis" : "predictive analytics"} and data processing.
                                                    </p>
                                                    <div className="pt-2 flex items-center gap-2">
                                                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-950 border border-zinc-800 text-zinc-500 font-mono">v1.{i}.0</span>
                                                        <span className="text-[10px] text-zinc-600">Updated 2h ago</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CustomScrollBar>
                            </div>
                        ),
                        code: `<CustomScrollBar orientation="horizontal" maxWidth="100%">
    <div className="flex gap-4 w-max p-4">
        {/* Horizontal items */}
    </div>
</CustomScrollBar>`
                    }
                ]
            }
        ]
    },
    {
        id: "patterns",
        title: "Premium Patterns",
        icon: <Layers size={18} />,
        components: [
            {
                id: "bento",
                title: "Neural Bento Grid",
                description: "Swiss-design inspired grid layout for cinematic dashboards.",
                addedAt: "2026-02-11",
                component: (
                    <div className="w-full scale-[0.85] origin-top bg-zinc-950/50 p-8 rounded-[2rem] border border-zinc-900">
                        <NeuralBentoGrid>
                            <NeuralBentoCard
                                className="md:col-span-2"
                                title="Neural Core"
                                description="Real-time infrastructure monitoring."
                                icon={<Cpu size={18} />}
                            >
                                <div className="h-24 flex items-end gap-1">
                                    {[40, 70, 45, 90, 65, 80, 40, 55].map((h, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ height: 0 }}
                                            animate={{ height: `${h}%` }}
                                            className="flex-1 bg-emerald-500/20 rounded-t-sm border-t border-emerald-500/30"
                                        />
                                    ))}
                                </div>
                            </NeuralBentoCard>
                            <NeuralBentoCard
                                title="Security Status"
                                description="Guardian protocols active."
                                icon={<Shield size={18} />}
                            >
                                <div className="flex flex-col gap-2">
                                    <div className="h-1 w-full bg-zinc-900 rounded-full overflow-hidden">
                                        <div className="h-full w-[80%] bg-emerald-500" />
                                    </div>
                                    <span className="text-[10px] font-mono text-zinc-600">ENCRYPTION: AES-256</span>
                                </div>
                            </NeuralBentoCard>
                        </NeuralBentoGrid>
                    </div>
                ),
                code: `<NeuralBentoGrid>\n  <NeuralBentoCard title="Core" icon={<Cpu />}>\n    {/* Content */}\n  </NeuralBentoCard>\n</NeuralBentoGrid>`
            },
            {
                id: "price-metric",
                title: "Price Metric",
                description: "High-end cryptocurrency data display with change dynamics.",
                addedAt: "2026-02-11",
                component: (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
                        <PriceMetric
                            label="Ethereum / USD"
                            symbol="ETH"
                            value={3451.24}
                            change24h={5.8}
                        />
                        <PriceMetric
                            label="Bitcoin / USD"
                            symbol="BTC"
                            value={68210.45}
                            change24h={-1.2}
                        />
                    </div>
                ),
                code: `<PriceMetric \n  label="ETH/USD" \n  value={3451.24} \n  change24h={5.8} \n/>`
            },
            {
                id: "token-performance",
                title: "Token Performance",
                description: "Pro-level token tracking card with change metrics and volume visualization.",
                addedAt: "2026-02-27",
                component: (
                    <TokenPerformance
                        symbol="BTC"
                        name="Bitcoin"
                        price={62450.21}
                        change24h={2.45}
                        volume24h="34.2B"
                        marketCap="1.2T"
                        className="w-full max-w-sm"
                    />
                ),
                code: `<TokenPerformance \n  symbol="BTC" \n  name="Bitcoin" \n  price={62450} \n  change24h={2.45} \n/>`
            },
            {
                id: "carousel",
                title: "Neural Carousel",
                description: "High-performance slider with Draggable support and spotlight effects.",
                addedAt: "2026-02-27",
                component: (
                    <NeuralCarousel
                        className="w-full max-w-lg"
                        items={[
                            <div key="1" className="p-8 text-center space-y-4">
                                <Brain className="mx-auto text-emerald-500" size={32} />
                                <p className="text-zinc-400 italic">"Autonomous precision redefined."</p>
                            </div>,
                            <div key="2" className="p-8 text-center space-y-4">
                                <Shield className="mx-auto text-blue-500" size={32} />
                                <p className="text-zinc-400 italic">"The gold standard for security."</p>
                            </div>
                        ]}
                    />
                ),
                code: `<NeuralCarousel items={[<Item1 />, <Item2 />]} />`
            }
        ]
    },
    {
        id: "ai",
        title: "AI Modules",
        icon: <Sparkles size={18} />,
        components: [
            {
                id: "chat",
                title: "Chat Interface",
                description: "Full-featured AI chat UI with streaming simulation.",
                component: (
                    <div className="w-full h-[600px] relative">
                        <div className="absolute inset-0 scale-90 origin-top">
                            <AIChatInterface />
                        </div>
                    </div>
                ),
                code: `<AIChatInterface />`
            },
            {
                id: "streaming-text",
                title: "Streaming Text",
                description: "simulated AI text generation effect.",
                component: (
                    <div className="max-w-md p-4 bg-zinc-900 rounded-lg border border-zinc-800">
                        <StreamingText speed={40}>
                            Analysis complete. The market sentiment is currently bullish with a strong resistance at $3,600. Recommended action: Accumulate on dips.
                        </StreamingText>
                    </div>
                ),
                code: `<StreamingText>
    Analysis complete. The market sentiment is currently bullish...
</StreamingText>`
            },
            {
                id: "step-process",
                title: "Step Process",
                description: "Tracing AI agent activities with real-time status updates.",
                component: (
                    <div className="w-full max-w-sm">
                        <StepProcess
                            steps={[
                                { id: "1", title: "Analyzing Query", description: "Parsing natural language intent...", status: "completed", duration: "1.2s" },
                                { id: "2", title: "Knowledge Retrieval", description: "Searching vector database...", status: "running" },
                                { id: "3", title: "Synthesis", status: "pending" }
                            ]}
                        />
                    </div>
                ),
                code: `<StepProcess 
    steps={[
        { id: "1", title: "Init", status: "completed" },
        { id: "2", title: "Processing", status: "running" }
    ]} 
/>`
            },
            {
                id: "thought-flow",
                title: "Agent Reasoning",
                description: "Deep visualization of agentic cognitive processes.",
                addedAt: "2026-02-11",
                component: (
                    <div className="w-full max-w-md">
                        <AgentThoughtFlow
                            steps={[
                                { id: "1", label: "Semantic Analysis", status: "complete", type: "analyze", description: "Resolved 4 potential intents.", timestamp: "10:22:04" },
                                { id: "2", label: "Vector Retrieval", status: "complete", type: "search", description: "Fetched 12 relevant shards.", timestamp: "10:22:06" },
                                { id: "3", label: "Decision Engine", status: "active", type: "process", description: "Evaluating best response path...", timestamp: "10:22:08" },
                                { id: "4", label: "Safe Synthesis", status: "pending", type: "plan" }
                            ]}
                        />
                    </div>
                ),
                code: `<AgentThoughtFlow \n  steps={[ \n    { id: "1", label: "Analysis", status: "complete", type: "analyze" }, \n    // ... \n  ]} \n/>`
            },
            {
                id: "model-params",
                title: "Model Parameters",
                description: "Technical configuration interfaces for neural model orchestration.",
                addedAt: "2026-02-11",
                component: (
                    <div className="w-full max-w-sm">
                        <ModelParameters />
                    </div>
                ),
                code: `<ModelParameters />`
            },
            {
                id: "activity-feed",
                title: "Agent Activity Feed",
                description: "Scrolling protocol feed for AI agent thoughts and operations.",
                addedAt: "2026-02-27",
                component: (
                    <AgentActivityFeed
                        className="w-full max-w-md"
                        activities={[
                            { id: "1", type: "thought", message: "Analyzing shard...", timestamp: "12:00:01" },
                            { id: "2", type: "action", message: "Syncing node...", timestamp: "12:00:05" },
                            { id: "3", type: "success", message: "Protocol active.", timestamp: "12:00:10" }
                        ]}
                    />
                ),
                code: `<AgentActivityFeed activities={data} />`
            }
        ]
    }
]


const DocsNavbar = ({ toggleSidebar }: { toggleSidebar?: () => void }) => {
    return (
        <header className="fixed top-0 left-0 right-0 z-[60] border-b border-zinc-800 bg-zinc-950/90 backdrop-blur-md">
            <div className="w-full h-14 flex items-center justify-between px-4 lg:px-6">
                <div className="flex items-center gap-4 lg:gap-6">
                    <button
                        onClick={toggleSidebar}
                        className="p-2 hover:bg-zinc-900 rounded-lg lg:hidden text-zinc-400 hover:text-white transition-colors"
                    >
                        <Menu size={20} />
                    </button>
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-6 h-6 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                            <Layers size={14} className="text-emerald-500" />
                        </div>
                        <span className="text-sm font-bold tracking-tight text-zinc-100 font-sans">
                            Neural<span className="text-zinc-500">Docs</span>
                        </span>
                    </Link>
                    <div className="hidden md:flex h-4 w-[1px] bg-zinc-800" />
                    <nav className="hidden md:flex items-center gap-4 text-sm font-medium text-zinc-400">
                        <Link href="/docs" className="text-zinc-100">Components</Link>
                        <Link href="/templates" className="hover:text-zinc-100 transition-colors">Templates</Link>
                        <Link href="#" className="hover:text-zinc-100 transition-colors">Examples</Link>
                    </nav>
                </div>

                <div className="flex items-center gap-3">
                    <div className="hidden md:flex relative group">
                        <Search className="absolute left-2 top-1.5 text-zinc-500 w-4 h-4 pointer-events-none group-focus-within:text-zinc-300" />
                        <input
                            placeholder="Search docs..."
                            className="bg-zinc-900 border border-zinc-800 rounded-md py-1.5 pl-8 pr-12 text-xs text-zinc-200 w-64 focus:outline-none focus:ring-1 focus:ring-emerald-500/50 transition-all font-sans placeholder:text-zinc-600"
                        />
                        <div className="absolute right-1.5 top-1.5 flex gap-1">
                            <span className="text-[10px] bg-zinc-800 text-zinc-500 px-1 rounded border border-zinc-700 font-mono">⌘K</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-1 border-l border-zinc-800 pl-3 ml-1">
                        <Link href="https://github.com" className="p-2 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 rounded-md transition-colors">
                            <Github size={16} />
                        </Link>
                        <Link href="https://x.com" className="p-2 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 rounded-md transition-colors">
                            <XIcon size={14} />
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    )
}

const SidebarItem = ({
    active,
    onClick,
    children,
    icon,
    isNew
}: {
    active: boolean,
    onClick: () => void,
    children: React.ReactNode,
    icon?: React.ReactNode,
    isNew?: boolean
}) => (
    <button
        onClick={onClick}
        className={cn(
            "w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-all font-sans group",
            active
                ? "bg-emerald-500/10 text-emerald-500"
                : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/50"
        )}
    >
        <div className="flex items-center gap-2 overflow-hidden">
            {icon && <span className={cn("transition-colors flex-shrink-0", active ? "text-emerald-500" : "text-zinc-500 group-hover:text-zinc-300")}>{icon}</span>}
            <span className="truncate">{children}</span>
        </div>
        {isNew && (
            <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex-shrink-0 text-[9px] font-black bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded-full font-mono border border-emerald-500/20 tracking-tight"
            >
                NEW
            </motion.span>
        )}
    </button>
);

const StoryCanvas = ({
    component,
    isGettingStarted = false,
    prevComponent,
    nextComponent,
    onNavigate
}: {
    component: ComponentDoc,
    isGettingStarted?: boolean,
    prevComponent?: { id: string, title: string },
    nextComponent?: { id: string, title: string },
    onNavigate: (id: string) => void
}) => {
    const [view, setView] = useState<"preview" | "code" | "docs">("preview");
    const [copied, setCopied] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // Scroll to top when component changes
    useEffect(() => {
        if (contentRef.current) {
            contentRef.current.scrollTop = 0;
        }
    }, [component.id]);

    if (isGettingStarted) {
        return (
            <div className="flex-1 overflow-auto bg-zinc-950">
                <div className="max-w-5xl mx-auto p-8 md:p-12 lg:p-16 pb-32 space-y-12">
                    <motion.div
                        key={component.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {component.component}
                    </motion.div>

                    {/* Pagination Footer for Getting Started */}
                    <div className="pt-12 mt-12 border-t border-zinc-900 flex justify-between items-center gap-4">
                        {prevComponent ? (
                            <button
                                onClick={() => onNavigate(prevComponent.id)}
                                className="group flex flex-col items-start gap-1"
                            >
                                <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest ml-1">Previous</span>
                                <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-zinc-900/50 border border-zinc-800 group-hover:border-emerald-500/30 group-hover:bg-emerald-500/5 transition-all text-sm font-medium text-zinc-400 group-hover:text-white">
                                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                                    {prevComponent.title}
                                </div>
                            </button>
                        ) : <div />}

                        {nextComponent ? (
                            <button
                                onClick={() => onNavigate(nextComponent.id)}
                                className="group flex flex-col items-end gap-1 text-right"
                            >
                                <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest mr-1">Next</span>
                                <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-zinc-900/50 border border-zinc-800 group-hover:border-emerald-500/30 group-hover:bg-emerald-500/5 transition-all text-sm font-medium text-zinc-400 group-hover:text-white">
                                    {nextComponent.title}
                                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                </div>
                            </button>
                        ) : <div />}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 min-h-0 flex flex-col h-full bg-zinc-950">
            {/* Component Header */}
            <div className="px-8 py-6 border-b border-zinc-900 bg-zinc-950/50">
                <div className="max-w-5xl mx-auto">
                    <div className="flex items-center gap-3 mb-2">
                        <NeuralBadge status="success" dot className="text-[10px] h-5 px-1.5 font-mono">STABLE</NeuralBadge>
                        <span className="text-zinc-500 text-[11px] font-mono">@neural-ui/core/{component.id}</span>
                    </div>
                    <h1 className="text-3xl font-bold text-white font-sans mb-2 tracking-tight">{component.title}</h1>
                    <p className="text-base text-zinc-400 font-sans max-w-2xl leading-relaxed">{component.description}</p>

                    <div className="flex gap-4 mt-6">
                        <button
                            onClick={() => setView("preview")}
                            className={cn(
                                "flex items-center gap-2 px-1 py-2 text-sm font-medium border-b-2 transition-all font-sans",
                                view === "preview" ? "border-emerald-500 text-emerald-500" : "border-transparent text-zinc-500 hover:text-zinc-300"
                            )}
                        >
                            <Eye size={16} /> Preview
                        </button>
                        <button
                            onClick={() => setView("code")}
                            className={cn(
                                "flex items-center gap-2 px-1 py-2 text-sm font-medium border-b-2 transition-all font-sans",
                                view === "code" ? "border-emerald-500 text-emerald-500" : "border-transparent text-zinc-500 hover:text-zinc-300"
                            )}
                        >
                            <Code size={16} /> Code
                        </button>
                        <button
                            onClick={() => setView("docs")}
                            className={cn(
                                "flex items-center gap-2 px-1 py-2 text-sm font-medium border-b-2 transition-all font-sans",
                                view === "docs" ? "border-emerald-500 text-emerald-500" : "border-transparent text-zinc-500 hover:text-zinc-300"
                            )}
                        >
                            <Info size={16} /> Documentation
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div ref={contentRef} className="flex-1 overflow-auto">
                <div className="max-w-5xl mx-auto p-8 pb-32 space-y-12">
                    <AnimatePresence mode="wait">
                        {view === "preview" && (
                            <motion.div
                                key="preview"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 10 }}
                                className="space-y-8"
                            >
                                <div className="p-12 rounded-2xl border border-white/5 bg-zinc-900/10 bg-[url('/grid.svg')] bg-center flex flex-col items-center justify-center min-h-[300px] shadow-inner relative group">
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 pointer-events-none" />
                                    <div className="relative z-10 w-full flex justify-center">
                                        {component.component}
                                    </div>
                                </div>

                                {/* Variants Section */}
                                {component.variants && component.variants.length > 0 && (
                                    <div className="space-y-6">
                                        <h3 className="text-xl font-bold font-sans">Variants & States</h3>
                                        <div className="grid gap-4">
                                            {component.variants.map((variant) => (
                                                <div key={variant.id} className="p-6 rounded-xl border border-zinc-800 bg-zinc-900/20 group hover:border-zinc-700 transition-all">
                                                    <div className="flex justify-between items-start mb-4">
                                                        <div>
                                                            <h4 className="font-bold text-zinc-100 font-sans">{variant.title}</h4>
                                                            <p className="text-sm text-zinc-500 font-sans mt-1">{variant.description}</p>
                                                        </div>
                                                        <button
                                                            onClick={() => handleCopy(variant.code)}
                                                            className="p-2 rounded-md bg-zinc-800 opacity-0 group-hover:opacity-100 transition-opacity"
                                                        >
                                                            <Copy size={14} className="text-zinc-400" />
                                                        </button>
                                                    </div>
                                                    <div className="py-4 flex justify-center border-t border-zinc-800/50 mt-4">
                                                        {variant.component}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        )}

                        {view === "code" && (
                            <motion.div
                                key="code"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 10 }}
                                className="relative group"
                            >
                                <pre className="p-8 rounded-2xl bg-zinc-950 border border-zinc-900 text-sm font-mono text-zinc-300 overflow-x-auto leading-relaxed">
                                    <code>{component.code}</code>
                                </pre>
                                <button
                                    onClick={() => handleCopy(component.code)}
                                    className="absolute top-4 right-4 p-2 rounded-md bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-zinc-100 border border-zinc-700 transition-all shadow-sm"
                                >
                                    {copied ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
                                </button>
                            </motion.div>
                        )}

                        {view === "docs" && (
                            <motion.div
                                key="docs"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 10 }}
                                className="space-y-8"
                            >
                                <div className="space-y-4">
                                    <h3 className="text-xl font-bold font-sans">Properties</h3>
                                    <div className="overflow-hidden rounded-xl border border-zinc-800">
                                        <table className="w-full text-left text-sm font-sans">
                                            <thead className="bg-zinc-900 text-zinc-400 border-b border-zinc-800">
                                                <tr>
                                                    <th className="px-4 py-3 font-medium">Prop</th>
                                                    <th className="px-4 py-3 font-medium">Type</th>
                                                    <th className="px-4 py-3 font-medium">Default</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-zinc-800">
                                                <tr>
                                                    <td className="px-4 py-3 font-mono text-emerald-500">className</td>
                                                    <td className="px-4 py-3 text-zinc-500">string</td>
                                                    <td className="px-4 py-3 text-zinc-500">-</td>
                                                </tr>
                                                <tr>
                                                    <td className="px-4 py-3 font-mono text-emerald-500">variant</td>
                                                    <td className="px-4 py-3 text-zinc-500">"primary" | "secondary" | "ghost"</td>
                                                    <td className="px-4 py-3 text-zinc-500">"primary"</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                <div className="p-6 rounded-2xl border border-blue-500/20 bg-blue-500/5 text-blue-400 text-sm font-sans flex gap-3">
                                    <Info size={18} className="shrink-0" />
                                    <p>All components support standard HTML attributes and are fully composable with Tailwind CSS classes.</p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Pagination Footer */}
                    <div className="pt-12 mt-12 border-t border-zinc-900 flex justify-between items-center gap-4">
                        {prevComponent ? (
                            <button
                                onClick={() => onNavigate(prevComponent.id)}
                                className="group flex flex-col items-start gap-1"
                            >
                                <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest ml-1">Previous</span>
                                <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-zinc-900/50 border border-zinc-800 group-hover:border-emerald-500/30 group-hover:bg-emerald-500/5 transition-all text-sm font-medium text-zinc-400 group-hover:text-white">
                                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                                    {prevComponent.title}
                                </div>
                            </button>
                        ) : <div />}

                        {nextComponent ? (
                            <button
                                onClick={() => onNavigate(nextComponent.id)}
                                className="group flex flex-col items-end gap-1 text-right"
                            >
                                <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest mr-1">Next</span>
                                <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-zinc-900/50 border border-zinc-800 group-hover:border-emerald-500/30 group-hover:bg-emerald-500/5 transition-all text-sm font-medium text-zinc-400 group-hover:text-white">
                                    {nextComponent.title}
                                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                </div>
                            </button>
                        ) : <div />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function DocsPage() {
    const allComponents = categories.flatMap(c => c.components);
    const [selectedId, setSelectedId] = useState<string>(allComponents[0].id);
    const [isSidebarOpen, setSidebarOpen] = useState(false); // Default closed on mobile

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) setSidebarOpen(true);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const activeCategory = categories.find(c => c.components.some(comp => comp.id === selectedId));
    const activeComponent = allComponents.find(c => c.id === selectedId) || allComponents[0];

    const currentIndex = allComponents.findIndex(c => c.id === selectedId);
    const prevComponent = currentIndex > 0 ? allComponents[currentIndex - 1] : undefined;
    const nextComponent = currentIndex < allComponents.length - 1 ? allComponents[currentIndex + 1] : undefined;

    return (
        <div className="flex flex-col h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-zinc-800 selection:text-zinc-50 overflow-hidden" style={{ fontFamily: 'var(--font-sans), sans-serif' }}>
            <NeuralCommandBar />
            <DocsNavbar toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />

            <div className="flex flex-1 pt-14 h-full overflow-hidden relative">
                {/* Mobile Sidebar Overlay */}
                <AnimatePresence>
                    {isSidebarOpen && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSidebarOpen(false)}
                            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden mt-14"
                        />
                    )}
                </AnimatePresence>

                {/* Sidebar */}
                <aside className={cn(
                    "fixed inset-y-0 left-0 z-50 w-64 border-r border-zinc-900 bg-zinc-950 mt-14 flex flex-col transition-transform duration-300 lg:static lg:mt-0 lg:translate-x-0",
                    !isSidebarOpen && "-translate-x-full"
                )}>
                    {/* Padding top is handled by the main layout pt-14, but sidebar needs to scroll independently */}
                    <div className="p-4 border-b border-zinc-900 flex items-center justify-between">
                        <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider font-sans">Library</span>
                        <div className="text-xs text-emerald-500 font-mono bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">v1.0.0-BETA</div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-3 pb-24 space-y-6 scrollbar-hide">
                        {categories.map((category) => (
                            <div key={category.id}>
                                <div className="flex items-center gap-2 px-3 mb-2 text-zinc-100 font-medium text-sm font-sans">
                                    <span className="text-zinc-500">{category.icon}</span>
                                    {category.title}
                                </div>
                                <div className="space-y-0.5 ml-2 border-l border-zinc-800 pl-2">
                                    {category.components.map((comp) => {
                                        const isNew = comp.addedAt ? differenceInDays(new Date(), new Date(comp.addedAt)) < 7 : false;
                                        return (
                                            <SidebarItem
                                                key={comp.id}
                                                active={selectedId === comp.id}
                                                isNew={isNew}
                                                onClick={() => {
                                                    setSelectedId(comp.id);
                                                    if (window.innerWidth < 1024) setSidebarOpen(false);
                                                }}
                                            >
                                                {comp.title}
                                            </SidebarItem>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 flex flex-col min-w-0 bg-black relative">
                    {/* Toggle Sidebar Button (visible when sidebar is closed) */}
                    <button
                        onClick={() => setSidebarOpen(!isSidebarOpen)}
                        className={cn(
                            "absolute bottom-4 z-50 p-2 rounded-full bg-zinc-800/50 hover:bg-zinc-700 text-zinc-400 backdrop-blur-md border border-zinc-700/50 shadow-lg transition-all",
                            isSidebarOpen ? "left-4 md:hidden" : "left-4"
                        )}
                        title="Toggle Sidebar"
                    >
                        <Menu size={18} />
                    </button>

                    <StoryCanvas
                        component={activeComponent}
                        isGettingStarted={activeCategory?.isGettingStarted}
                        prevComponent={prevComponent}
                        nextComponent={nextComponent}
                        onNavigate={setSelectedId}
                    />
                </main>
            </div>
        </div>
    );
}
