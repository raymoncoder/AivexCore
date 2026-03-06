"use client";

import { AivexButton } from "@/components/ui/core/AivexButton";
import { AivexInput } from "@/components/ui/core/AivexInput";
import { AivexBadge } from "@/components/ui/core/AivexBadge";
import { AivexMarquee } from "@/components/ui/core/AivexMarquee";
import { AivexToastProvider, useAivexToast } from "@/components/ui/core/AivexToaster";
import { AivexSwitch } from "@/components/ui/core/AivexSwitch";
import { AivexPasswordInput } from "@/components/ui/core/AivexPasswordInput";
import { AivexOTPInput } from "@/components/ui/core/AivexOTPInput";
import { AivexSelect } from "@/components/ui/core/AivexSelect";
import { AivexTabs } from "@/components/ui/core/AivexTabs";
import { AivexCard, AivexCardHeader, AivexCardTitle, AivexCardDescription, AivexCardContent } from "@/components/ui/core/AivexCard";
import { AnalyticsCard } from "@/components/ui/patterns/AnalyticsCard";
import { SwapCard } from "@/components/ui/crypto/SwapCard";
import { AIChatInterface } from "@/components/ui/ai/AIChatInterface";
import { AivexSkeleton } from "@/components/ui/core/AivexSkeleton";
import { Box, PieChart, Sparkles, ToggleLeft, Copy, Check, Terminal, Layout, Layers, Menu, Grid, Magnet, Loader2, MousePointer2, Info, MoveHorizontal, Wallet, AlertCircle, ChevronRight, User, Search, Percent, Table as TableIcon, Github, ExternalLink, ArrowRight, ArrowLeft, Play, Eye, Code, Plus, Database, Cpu, Shield, Globe, Coins, Calendar, GripVertical, Zap, Brain } from "lucide-react";
import { XIcon } from "@/components/icons/XIcon";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { differenceInDays } from "date-fns";
import { AivexCheckbox } from "@/components/ui/core/AivexCheckbox";
import { AivexSlider } from "@/components/ui/core/AivexSlider";
import { AivexTooltip } from "@/components/ui/core/AivexTooltip";
import { AivexLoader } from "@/components/ui/core/AivexLoader";
import { Magnetic } from "@/components/ui/ex/Magnetic";
import { AddressBadge } from "@/components/ui/crypto/AddressBadge";
import { StreamingText } from "@/components/ui/ai/StreamingText";
import { WalletConnectModal } from "@/components/ui/crypto/WalletConnectModal";
import { AivexAccordion } from "@/components/ui/core/AivexAccordion";
import { AivexAlert } from "@/components/ui/core/AivexAlert";
import { AivexAvatar } from "@/components/ui/core/AivexAvatar";
import { AivexBreadcrumb } from "@/components/ui/core/AivexBreadcrumb";
import { AivexProgress } from "@/components/ui/core/AivexProgress";
import { CommandPalette } from "@/components/ui/data/CommandPalette";
import { AivexDataTable } from "@/components/ui/data/AivexDataTable";
import { AivexDialog, AivexDialogContent, AivexDialogHeader, AivexDialogTitle, AivexDialogDescription, AivexDialogFooter } from "@/components/ui/core/AivexDialog";
import { SpotlightCard } from "@/components/ui/ex/SpotlightCard";
import { StepProcess } from "@/components/ui/ai/StepProcess";
import { AivexCommandBar } from "@/components/ui/ex/AivexCommandBar";
import { AivexCodeEditor } from "@/components/ui/data/AivexCodeEditor";
import { RadarChart } from "@/components/ui/data/RadarChart";
import { MiniSparkline } from "@/components/ui/data/MiniSparkline";
import { AivexExportButton } from "@/components/ui/data/AivexExportButton";
import { AivexLoader as AivexLoaderVariants } from "@/components/ui/core/AivexLoaderVariants";
import { FileUploadZone } from "@/components/ui/core/FileUploadZone";
import { AivexDatePicker } from "@/components/ui/core/AivexDatePicker";
import { DragDropList } from "@/components/ui/core/DragDropCard";
import { CustomScrollBar } from "@/components/ui/core/CustomScrollBar";
import { AgentThoughtFlow } from "@/components/ui/ai/AgentThoughtFlow";
import { ModelParameters } from "@/components/ui/ai/ModelParameters";
import { PriceMetric } from "@/components/ui/crypto/PriceMetric";
import { TokenPerformance } from "@/components/ui/crypto/TokenPerformance";
import { AgentActivityFeed } from "@/components/ui/ai/AgentActivityFeed";
import { AivexCarousel } from "@/components/ui/patterns/AivexCarousel";
import { AivexBentoGrid, AivexBentoCard } from "@/components/ui/patterns/AivexBentoGrid";
import Link from "next/link";

// --- Types & Data ---

interface ComponentVariant {
    id: string;
    title: string;
    description: string;
    component: React.ReactNode;
    code: string;
}

interface PropDoc {
    prop: string;
    type: string;
    default: string;
    description?: string;
}

interface ComponentDoc {
    id: string;
    title: string;
    description: string;
    component: React.ReactNode;
    code: string;
    variants?: ComponentVariant[];
    props?: PropDoc[];
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
            <AivexButton onClick={() => setIsOpen(true)} icon={<Wallet size={16} />}>Connect Wallet</AivexButton>
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
                <AivexButton onClick={() => setIsOpen(true)} variant="secondary" icon={<Search size={14} />}>Open Command Palette</AivexButton>
            </div>
            <CommandPalette isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </>
    )
};

const AivexToastDemo = () => {
    const { toast } = useAivexToast();
    return (
        <div className="flex flex-wrap gap-4">
            <AivexButton onClick={() => toast("Handshake Successful", { type: "success", description: "Agent node connected." })}>
                Success
            </AivexButton>
            <AivexButton onClick={() => toast("Anomalous Activity", { type: "error", description: "Node rejected connection." })}>
                Error
            </AivexButton>
        </div>
    );
};

const DialogPreview = () => {
    const [open, setOpen] = useState(false);
    return (
        <>
            <AivexButton onClick={() => setOpen(true)}>Open Dialog</AivexButton>
            <AivexDialog open={open} onOpenChange={setOpen}>
                <AivexDialogContent>
                    <AivexDialogHeader>
                        <AivexDialogTitle>Edit Profile</AivexDialogTitle>
                        <AivexDialogDescription>
                            Make changes to your profile here. Click save when you're done.
                        </AivexDialogDescription>
                    </AivexDialogHeader>
                    <div className="grid gap-4 py-4">
                        <AivexInput label="Name" defaultValue="Pedro Duarte" />
                        <AivexInput label="Username" defaultValue="@peduarte" />
                    </div>
                    <AivexDialogFooter>
                        <AivexButton type="submit" onClick={() => setOpen(false)}>Save changes</AivexButton>
                    </AivexDialogFooter>
                </AivexDialogContent>
            </AivexDialog>
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
                            <AivexSkeleton className="w-16 h-16 rounded-2xl" />
                            <div className="space-y-2 flex-1">
                                <AivexSkeleton className="h-4 w-3/4" />
                                <AivexSkeleton className="h-3 w-1/2 opacity-50" />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <AivexSkeleton className="h-3 w-full" />
                            <AivexSkeleton className="h-3 w-full" />
                            <AivexSkeleton className="h-3 w-2/3 opacity-50" />
                        </div>

                        <div className="grid grid-cols-2 gap-3 pt-2">
                            <AivexSkeleton className="h-10 w-full rounded-xl" />
                            <AivexSkeleton className="h-10 w-full rounded-xl" />
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
                                <p className="text-sm text-emerald-500/70 font-mono">@Aivex_prime</p>
                            </div>
                        </motion.div>

                        <motion.div
                            className="space-y-2"
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2, type: "spring", damping: 20 }}
                        >
                            <p className="text-sm text-zinc-400 leading-relaxed font-sans">
                                Senior Aivex Architect specializing in encrypted data streams and autonomous интерфейс logic.
                            </p>
                        </motion.div>

                        <motion.div
                            className="grid grid-cols-2 gap-3 pt-2"
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3, type: "spring", damping: 20 }}
                        >
                            <AivexButton variant="secondary" className="rounded-xl border-zinc-800 text-zinc-400 hover:text-white">
                                Edit Profile
                            </AivexButton>
                            <AivexButton className="rounded-xl bg-emerald-500 text-black hover:bg-emerald-400 font-bold">
                                View Activity
                            </AivexButton>
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
        { id: 1, name: "Aivex Interface", status: "Active", users: "1.2k", revenue: "$4,200" },
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
                <AivexBadge status={val === "Active" ? "success" : val === "Beta" ? "warning" : "default"} dot>
                    {val}
                </AivexBadge>
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
        <AivexDataTable data={data} columns={columns as any} pageSize={4} />
    )
}

const IntroductionSection = () => (
    <div className="space-y-12">
        <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight font-sans">Introduction</h1>
            <p className="text-xl text-zinc-400 font-light font-sans leading-relaxed">
                Aivex UI is a collection of re-usable components built for the next generation of AI and Crypto applications.
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
                Aivex UI provides the building blocks for interfaces that respond to intelligence with fluid precision."
            </div>
        </div>
    </div>
);

const InstallationSection = () => (
    <div className="space-y-12">
        <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight font-sans">Installation</h1>
            <p className="text-xl text-zinc-400 font-light font-sans leading-relaxed">
                The fastest way to get started with Aivex UI is via our CLI.
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
                        <span className="text-zinc-300 font-mono text-sm">Next.js 14+</span>
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-400 font-bold border border-zinc-700 font-mono">2</div>
                    <div>
                        <h3 className="text-xl font-bold font-sans text-zinc-100">Initialize Project</h3>
                        <p className="text-sm text-zinc-500 font-sans mt-1">Set up your workspace and core dependencies automatically.</p>
                    </div>
                </div>
                <div className="ml-12">
                    <AivexCodeEditor
                        initialCode="npx aivexcore@latest init"
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
                        <h3 className="text-xl font-bold font-sans text-zinc-100">Add Components</h3>
                        <p className="text-sm text-zinc-500 font-sans mt-1">Download and install components directly into your UI folder.</p>
                    </div>
                </div>
                <div className="ml-12">
                    <AivexCodeEditor
                        initialCode="npx aivexcore@latest add AivexButton"
                        language="bash"
                        title="Terminal"
                        readOnly
                    />
                </div>
            </div>

            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-400 font-bold border border-zinc-700 font-mono">4</div>
                    <div>
                        <h3 className="text-xl font-bold font-sans text-zinc-100">Manual Usage</h3>
                        <p className="text-sm text-zinc-500 font-sans mt-1">Import and use your new component.</p>
                    </div>
                </div>
                <div className="ml-12">
                    <AivexCodeEditor
                        initialCode={`import { AivexButton } from "@/components/ui/core/AivexButton";

export default function Page() {
  return (
    <AivexButton variant="neon" size="lg">
      Initialize Neural Node
    </AivexButton>
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
                description: "The core design philosophy and goals of Aivex UI.",
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
                component: <AivexButton>Primary Action</AivexButton>,
                code: `<AivexButton>Primary Action</AivexButton>`,
                props: [
                    { prop: "variant", type: '"primary" | "secondary" | "ghost" | "destructive"', default: '"primary"', description: "The visual style of the button." },
                    { prop: "size", type: '"sm" | "md" | "lg" | "icon"', default: '"md"', description: "The vertical height and padding." },
                    { prop: "isLoading", type: "boolean", default: "false", description: "Shows a spinner and disables interactions." },
                    { prop: "icon", type: "ReactNode", default: "-", description: "Leading icon element." },
                    { prop: "asChild", type: "boolean", default: "false", description: "Use Radix Slot to merge props onto a child element (e.g. Link)." },
                ],
                variants: [
                    {
                        id: "secondary",
                        title: "Secondary Variant",
                        description: "Used for less prominent actions. Uses a subtle background and border.",
                        component: <AivexButton variant="secondary">Secondary Action</AivexButton>,
                        code: `<AivexButton variant="secondary">Secondary Action</AivexButton>`
                    },
                    {
                        id: "ghost",
                        title: "Ghost Variant",
                        description: "Minimalist style, often used in toolbars or secondary navigation.",
                        component: <AivexButton variant="ghost">Ghost Button</AivexButton>,
                        code: `<AivexButton variant="ghost">Ghost Button</AivexButton>`
                    },
                    {
                        id: "loading",
                        title: "Loading State",
                        description: "Built-in loading indicator that maintains layout width.",
                        component: <AivexButton isLoading>Processing...</AivexButton>,
                        code: `<AivexButton isLoading>Processing...</AivexButton>`
                    },
                    {
                        id: "icon",
                        title: "With Icon",
                        description: "Enhanced with Lucide icons for better visual cues.",
                        component: <AivexButton icon={<Plus size={16} />}>Create New</AivexButton>,
                        code: `<AivexButton icon={<Plus size={16} />}>Create New</AivexButton>`
                    }
                ]
            },
            {
                id: "badge",
                title: "Badge",
                description: "Compact status indicators using system tints and micro-animations.",
                component: <AivexBadge>Default Badge</AivexBadge>,
                code: `<AivexBadge>Default Badge</AivexBadge>`,
                props: [
                    { prop: "status", type: '"default" | "success" | "warning" | "error" | "info"', default: '"default"', description: "Semantic color state." },
                    { prop: "variant", type: '"solid" | "outline" | "soft"', default: '"soft"', description: "Visual density of the badge." },
                    { prop: "dot", type: "boolean", default: "false", description: "Shows an animated presence dot." },
                ],
                variants: [
                    {
                        id: "success",
                        title: "Success State",
                        description: "Indicates a positive or completed process.",
                        component: <AivexBadge status="success" dot>Operational</AivexBadge>,
                        code: `<AivexBadge status="success" dot>Operational</AivexBadge>`
                    },
                    {
                        id: "warning",
                        title: "Warning State",
                        description: "Used for alerts or attention-requiring items.",
                        component: <AivexBadge status="warning">Degraded</AivexBadge>,
                        code: `<AivexBadge status="warning">Degraded</AivexBadge>`
                    },
                    {
                        id: "error",
                        title: "Error State",
                        description: "Indicates failure or critical system issues.",
                        component: <AivexBadge status="error">Downtime</AivexBadge>,
                        code: `<AivexBadge status="error">Downtime</AivexBadge>`
                    }
                ]
            },
            {
                id: "avatar",
                title: "Avatar",
                description: "User profile image with fallback and status indicators.",
                component: (
                    <div className="flex items-center gap-6">
                        <AivexAvatar src="https://api.dicebear.com/7.x/bottts/svg?seed=Aivex" size="lg" status="online" />
                        <AivexAvatar fallback="JD" size="md" status="busy" />
                        <AivexAvatar fallback="??" size="sm" status="offline" />
                    </div>
                ),
                code: `<AivexAvatar src="..." size="lg" status="online" />`,
                props: [
                    { prop: "src", type: "string", default: "-", description: "URL for the avatar image." },
                    { prop: "fallback", type: "string", default: "-", description: "Initials or text shown when image fails." },
                    { prop: "size", type: '"sm" | "md" | "lg" | "xl"', default: '"md"', description: "Avatar dimensions." },
                    { prop: "status", type: '"online" | "busy" | "offline" | "away"', default: "-", description: "Presence dot state." },
                    { prop: "showStatus", type: "boolean", default: "true", description: "Visibility of the status indicator." },
                ],
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
                                <AivexLoaderVariants variant={v as any} size="md" />
                                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mt-6 group-hover:text-zinc-300 transition-colors">{l}</span>
                            </div>
                        ))}
                    </div>
                ),
                code: `<AivexLoader variant="spinner" size="md" />`,
                props: [
                    { prop: "variant", type: '"spinner" | "dots" | "pulse" | "bars" | "orbit" | "wave"', default: '"spinner"', description: "Animation style." },
                    { prop: "size", type: '"sm" | "md" | "lg" | "xl"', default: '"md"', description: "Visual scale." },
                    { prop: "color", type: "string", default: '"emerald-500"', description: "Tailwind color class or CSS value." },
                ],
                variants: [
                    {
                        id: "loader-sizes",
                        title: "Responsive Sizes",
                        description: "Three scaled sizes designed to fit everything from buttons to full-page overlays.",
                        component: (
                            <div className="flex items-center justify-around w-full p-8 rounded-2xl bg-zinc-900/20 border border-white/5">
                                <div className="text-center space-y-4">
                                    <AivexLoaderVariants variant="spinner" size="sm" />
                                    <div className="text-[10px] text-zinc-600 font-mono">SMALL</div>
                                </div>
                                <div className="text-center space-y-4">
                                    <AivexLoaderVariants variant="spinner" size="md" />
                                    <div className="text-[10px] text-zinc-600 font-mono">MEDIUM</div>
                                </div>
                                <div className="text-center space-y-4">
                                    <AivexLoaderVariants variant="spinner" size="lg" />
                                    <div className="text-[10px] text-zinc-600 font-mono">LARGE</div>
                                </div>
                            </div>
                        ),
                        code: `<AivexLoader size="sm" />\n<AivexLoader size="md" />\n<AivexLoader size="lg" />`
                    },
                ]
            },
            {
                id: "progress",
                title: "Progress",
                description: "Premium linear indicators with glassmorphism, animated gradients, and matching glows.",
                component: (
                    <div className="w-full max-w-sm space-y-8">
                        <AivexProgress value={33} color="emerald" showValue />
                        <AivexProgress value={65} color="blue" variant="gradient" showValue />
                        <AivexProgress value={85} color="purple" variant="gradient" showValue />
                    </div>
                ),
                code: `<AivexProgress value={33} showValue />`,
                props: [
                    { prop: "value", type: "number", default: "0", description: "Current progress value." },
                    { prop: "max", type: "number", default: "100", description: "Maximum possible value." },
                    { prop: "showValue", type: "boolean", default: "false", description: "Displays percentage text." },
                    { prop: "color", type: '"emerald" | "blue" | "purple" | "amber" | "rose"', default: '"emerald"', description: "Semantic color tint." },
                    { prop: "variant", type: '"default" | "gradient" | "glass"', default: '"default"', description: "Visual animation style." },
                ],
                variants: [
                    {
                        id: "gradient-variant",
                        title: "Gradient Variant",
                        description: "Uses a multi-stop animated gradient for a dynamic feel.",
                        component: <AivexProgress value={75} color="blue" variant="gradient" showValue />,
                        code: `<AivexProgress variant="gradient" color="blue" value={75} />`
                    },
                    {
                        id: "colors",
                        title: "Semantic Colors",
                        description: "Pre-configured semantic tints with matching glows.",
                        component: (
                            <div className="w-full space-y-4">
                                <AivexProgress value={90} color="rose" />
                                <AivexProgress value={45} color="amber" />
                            </div>
                        ),
                        code: `<AivexProgress color="rose" value={90} />`
                    }
                ]
            },
            {
                id: "tooltip",
                title: "Tooltip",
                description: "Contextual information accessible on hover.",
                component: (
                    <div className="flex items-center gap-4">
                        <AivexTooltip content="This is a helpful tip" position="top">
                            <AivexButton variant="secondary" size="sm">Hover Me</AivexButton>
                        </AivexTooltip>
                        <AivexTooltip content="Quick Info" position="right">
                            <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center border border-zinc-700">
                                <Info size={16} className="text-zinc-400" />
                            </div>
                        </AivexTooltip>
                    </div>
                ),
                code: `<AivexTooltip content="Tip..." position="top">...</AivexTooltip>`,
                props: [
                    { prop: "content", type: "ReactNode", default: "-", description: "The message shown in the tooltip." },
                    { prop: "position", type: '"top" | "bottom" | "left" | "right"', default: '"top"', description: "Anchor position." },
                    { prop: "delay", type: "number", default: "0.5", description: "Appearance delay in seconds." },
                ],
            },
            {
                id: "alert",
                title: "Alert",
                description: "Contextual feedback messages for user actions.",
                component: (
                    <div className="w-full max-w-md space-y-4">
                        <AivexAlert title="Heads up!" description="You can add components to your app using the CLI." />
                        <AivexAlert variant="destructive" title="Error" description="Something went wrong while fetching data." />
                        <AivexAlert variant="success" title="Success" description="Your changes have been saved successfully." />
                    </div>
                ),
                code: `<AivexAlert title="Heads up!" description="..." />`,
                props: [
                    { prop: "variant", type: '"default" | "destructive" | "warning" | "success"', default: '"default"', description: "Semantic alert state." },
                    { prop: "title", type: "string", default: "-", description: "Leading header text." },
                    { prop: "description", type: "string", default: "-", description: "Detailed message body." },
                    { prop: "icon", type: "ReactNode", default: "-", description: "Custom leading icon." },
                    { prop: "dismissible", type: "boolean", default: "false", description: "Shows a close button." },
                    { prop: "onDismiss", type: "() => void", default: "-", description: "Dismissal callback." },
                ],
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
                            <AivexTabs
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
                code: `<AivexTabs tabs={items} defaultTab="1" />`,
                props: [
                    { prop: "tabs", type: "Tab[]", default: "[]", description: "Array of { id, label } objects." },
                    { prop: "activeTab", type: "string", default: "-", description: "Controlled active tab ID." },
                    { prop: "onTabChange", type: "(id: string) => void", default: "-", description: "Triggered on selection." },
                    { prop: "defaultTab", type: "string", default: "-", description: "Initial active tab ID." },
                    { prop: "variant", type: '"segmented" | "pill" | "underline" | "glass"', default: '"segmented"', description: "Visual transition style." },
                ],
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
                                <AivexTabs
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
                        code: `<AivexTabs variant="pill" tabs={assets} />`
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
                                <AivexTabs
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
                        code: `<AivexTabs variant="underline" tabs={navItems} />`
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
                                        <h3 className="text-lg font-bold text-white">Aivex Cluster</h3>
                                        <p className="text-xs text-zinc-400">Select active processing node</p>
                                    </div>
                                    <AivexTabs
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
                        code: `<AivexTabs variant="glass" tabs={nodes} />`
                    }
                ]
            },
            {
                id: "marquee",
                title: "Aivex Marquee",
                description: "GPU-accelerated scrolling ticker for text, images, or log data. Supports vertical and horizontal orientations.",
                addedAt: "2026-02-27",
                component: (
                    <div className="w-full py-4 border-y border-zinc-900 bg-zinc-950/30">
                        <AivexMarquee speed={30}>
                            {["BLOCKCHAIN", "Aivex", "AGENTIC", "AUTONOMOUS", "CRYPTO"].map((s) => (
                                <span key={s} className="text-xl font-bold font-mono text-zinc-600 px-4">{s}</span>
                            ))}
                        </AivexMarquee>
                    </div>
                ),
                code: `<AivexMarquee speed={30}>...</AivexMarquee>`,
                props: [
                    { prop: "speed", type: "number", default: "50", description: "Scrolling speed in pixels per second." },
                    { prop: "direction", type: '"left" | "right" | "up" | "down"', default: '"left"', description: "The motion vector for the content." },
                    { prop: "pauseOnHover", type: "boolean", default: "false", description: "Stops movement when the cursor is over the marquee." },
                    { prop: "gap", type: "number", default: "20", description: "Space between repeated items in pixels." },
                ],
                variants: [
                    {
                        id: "vertical-marquee",
                        title: "Vertical Orientation",
                        description: "Scrolls vertically, useful for logs or sidebars.",
                        component: (
                            <div className="h-40 border border-zinc-800 rounded-xl overflow-hidden bg-zinc-950">
                                <AivexMarquee direction="up" speed={15} className="h-full">
                                    {[1, 2, 3, 4, 5].map(i => (
                                        <div key={i} className="text-[10px] font-mono text-emerald-500 py-1 px-3">
                                            PROTOCOL_SYNC_NODE_{i}
                                        </div>
                                    ))}
                                </AivexMarquee>
                            </div>
                        ),
                        code: `<AivexMarquee direction="up" />`
                    }
                ]
            },
            {
                id: "toast",
                title: "Aivex Toaster",
                description: "Premium notification system with status-specific styling and smooth entry animations.",
                addedAt: "2026-02-27",
                component: (
                    <div className="flex gap-4">
                        <AivexToastDemo />
                    </div>
                ),
                code: `// Use within <AivexToastProvider />\nconst { toast } = useAivexToast();\ntoast("System Online", { type: "success" });`,
                props: [
                    { prop: "message", type: "string", default: "-", description: "Main notification header." },
                    { prop: "description", type: "string", default: "-", description: "Secondary info text." },
                    { prop: "type", type: '"Aivex" | "success" | "warning" | "error" | "info"', default: '"Aivex"', description: "Status-based color styling." },
                    { prop: "duration", type: "number", default: "5000", description: "Visibility time in ms." },
                ],
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
                code: `<AivexDialog>...</AivexDialog>`,
                props: [
                    { prop: "isOpen", type: "boolean", default: "false", description: "Controlled visibility state." },
                    { prop: "onClose", type: "() => void", default: "-", description: "Callback triggered on dismissal." },
                    { prop: "glass", type: "boolean", default: "false", description: "Enables background blur and high-gloss aesthetics." },
                    { prop: "glow", type: "boolean", default: "false", description: "Adds a subtle radial glow behind the dialog." },
                ],
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
                                <h4 className="text-sm font-bold text-white tracking-tight">Aivex Search</h4>
                            </div>
                            <AivexInput
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
                code: `<AivexInput icon={<Search size={14} />} placeholder="Search..." />`,
                props: [
                    { prop: "variant", type: '"default" | "underlined" | "glass"', default: '"default"', description: "Visual style variant." },
                    { prop: "label", type: "string", default: "-", description: "Floating label text." },
                    { prop: "icon", type: "ReactNode", default: "-", description: "Leading icon." },
                    { prop: "wrapperClassName", type: "string", default: "-", description: "ClassName for the outer container." },
                    { prop: "showStrengthIndicator", type: "boolean", default: "false", description: "Specialized for PasswordInput." },
                ],
                variants: [
                    {
                        id: "input-variants",
                        title: "Visual Variants",
                        description: "Three distinct styles designed for different interface contexts.",
                        component: (
                            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="p-6 rounded-2xl bg-zinc-900/30 border border-zinc-800/50 space-y-4">
                                    <h5 className="text-[10px] font-bold text-zinc-500 uppercase">Modern Underline</h5>
                                    <AivexInput variant="underlined" placeholder="Write something..." />
                                </div>
                                <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-white/5 backdrop-blur-md space-y-4">
                                    <h5 className="text-[10px] font-bold text-blue-400 uppercase">Glass Morphic</h5>
                                    <AivexInput variant="glass" placeholder="Overlay input..." />
                                </div>
                            </div>
                        ),
                        code: `<AivexInput variant="underlined" />\n<AivexInput variant="glass" />`
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
                                    <AivexPasswordInput
                                        label="Personal Ledger Key"
                                        placeholder="Enter key"
                                        showStrengthIndicator
                                    />
                                    <AivexButton className="w-full rounded-xl bg-zinc-50 text-black hover:bg-white">Authorize Access</AivexButton>
                                </div>
                            </div>
                        ),
                        code: `<AivexPasswordInput showStrengthIndicator />`
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
                                <AivexOTPInput length={6} />
                                <div className="flex gap-4">
                                    <button className="text-[10px] text-zinc-500 hover:text-zinc-300 font-bold uppercase underline underline-offset-4 decoration-zinc-800">Resend Code</button>
                                    <button className="text-[10px] text-zinc-500 hover:text-zinc-300 font-bold uppercase underline underline-offset-4 decoration-zinc-800">Support</button>
                                </div>
                            </div>
                        ),
                        code: `<AivexOTPInput length={6} />`
                    }
                ]
            },
            {
                id: "checkbox",
                title: "Checkbox",
                description: "Minimalist checkbox with micro-animations.",
                component: (
                    <div className="flex flex-col gap-4">
                        <AivexCheckbox label="Accept Terms" description="You agree to our Terms of Service." defaultChecked />
                        <AivexCheckbox label="Subscribe to Newsletter" />
                        <AivexCheckbox label="Disabled Option" disabled />
                    </div>
                ),
                code: `<AivexCheckbox label="Terms" defaultChecked />`,
                props: [
                    { prop: "label", type: "string", default: "-", description: "Text label for the checkbox." },
                    { prop: "description", type: "string", default: "-", description: "Sub-text description." },
                    { prop: "checked", type: "boolean", default: "false", description: "Controlled checked state." },
                    { prop: "onCheckedChange", type: "(v: boolean) => void", default: "-", description: "Change callback." },
                    { prop: "disabled", type: "boolean", default: "false", description: "Disables interaction." },
                ],
            },
            {
                id: "slider",
                title: "Slider",
                description: "Range slider for numeric values.",
                component: (
                    <div className="w-full max-w-xs space-y-6">
                        <AivexSlider min={0} max={100} defaultValue={50} label="Volume" />
                        <AivexSlider min={10} max={200} step={10} defaultValue={120} label="Capacity" />
                    </div>
                ),
                code: `<AivexSlider min={0} max={100} label="Volume" />`,
                props: [
                    { prop: "label", type: "string", default: "-", description: "Display name for the slider." },
                    { prop: "min", type: "number", default: "0", description: "Minimum range value." },
                    { prop: "max", type: "number", default: "100", description: "Maximum range value." },
                    { prop: "step", type: "number", default: "1", description: "Value increment." },
                    { prop: "value", type: "number[]", default: "-", description: "Controlled value array." },
                ],
            },
            {
                id: "select",
                title: "Select",
                description: "Deeply customizable dropdown systems with multiple cinematic variants and support for metadata context.",
                addedAt: "2026-02-11",
                component: (
                    <div className="w-full max-w-sm p-12 rounded-[2.5rem] bg-zinc-950 border border-zinc-900 shadow-2xl relative group overflow-visible">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-[60px] rounded-full -translate-y-1/2 translate-x-1/2" />
                        <AivexSelect
                            label="Aivex Architecture"
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
                code: `<AivexSelect label="Neural Mode" variant="neon" options={options} />`,
                props: [
                    { prop: "options", type: "Option[]", default: "[]", description: "Array of { label, value, icon, description } objects." },
                    { prop: "variant", type: '"default" | "neon" | "glass" | "ghost"', default: '"default"', description: "Visual presentation style." },
                    { prop: "label", type: "string", default: "-", description: "Field label." },
                    { prop: "helpText", type: "string", default: "-", description: "Secondary text below the select." },
                    { prop: "onValueChange", type: "(v: string) => void", default: "-", description: "Selection change handler." },
                ],
                variants: [
                    {
                        id: "select-variants",
                        title: "Visual Stacks",
                        description: "Standard, Glass, and Ghost variations to fit into any layer of your UI.",
                        component: (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                                <div className="space-y-2">
                                    <span className="text-[9px] font-mono text-zinc-600 uppercase">Standard</span>
                                    <AivexSelect
                                        variant="default"
                                        options={[{ value: '1', label: 'Option 1' }]}
                                        onValueChange={() => { }}
                                        defaultValue="1"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <span className="text-[9px] font-mono text-zinc-600 uppercase">Glass</span>
                                    <AivexSelect
                                        variant="glass"
                                        options={[{ value: '1', label: 'Glass View' }]}
                                        onValueChange={() => { }}
                                        defaultValue="1"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <span className="text-[9px] font-mono text-zinc-600 uppercase">Ghost</span>
                                    <AivexSelect
                                        variant="ghost"
                                        options={[{ value: '1', label: 'Minimalist' }]}
                                        onValueChange={() => { }}
                                        defaultValue="1"
                                    />
                                </div>
                            </div>
                        ),
                        code: `<AivexSelect variant="glass" />\n<AivexSelect variant="ghost" />`
                    },
                    {
                        id: "select-metadata",
                        title: "High-Density Context",
                        description: "Enhance decision making with integrated icons and descriptions for every option.",
                        component: (
                            <div className="w-full max-w-sm">
                                <AivexSelect
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
                        code: `<AivexSelect\n  options={[\n    { label: "ETH", icon: <Coins />, description: "Chain" },\n    // ...\n  ]}\n/>`
                    }
                ]
            },
            {
                id: "switch",
                title: "Switch",
                description: "Spring-animated toggle switch with glow effects.",
                component: (
                    <div className="flex flex-col gap-4">
                        <AivexSwitch label="Airplane Mode" checked />
                        <AivexSwitch label="Do Not Disturb" />
                        <AivexSwitch label="Disabled" disabled />
                    </div>
                ),
                code: `<AivexSwitch label="Airplane Mode" />`,
                props: [
                    { prop: "label", type: "string", default: "-", description: "Toggle label." },
                    { prop: "checked", type: "boolean", default: "false", description: "Controlled switch state." },
                    { prop: "onCheckedChange", type: "(v: boolean) => void", default: "-", description: "Status change callback." },
                    { prop: "disabled", type: "boolean", default: "false", description: "Disables switch interaction." },
                ],
            },
            {
                id: "date-picker",
                title: "Date Picker",
                description: "Technical calendar system for scheduling and temporal selection.",
                addedAt: "2026-02-11",
                component: (
                    <div className="w-full max-w-sm">
                        <AivexDatePicker label="Deployment Schedule" variant="neon" />
                    </div>
                ),
                code: `<AivexDatePicker label="Schedule" variant="neon" />`,
                props: [
                    { prop: "selected", type: "Date", default: "new Date()", description: "Controlled selection." },
                    { prop: "onSelect", type: "(d: Date) => void", default: "-", description: "Selection callback." },
                    { prop: "label", type: "string", default: "-", description: "Input label." },
                    { prop: "variant", type: '"default" | "glass" | "neon"', default: '"default"', description: "Visual style." },
                ],
                variants: [
                    {
                        id: "date-glass",
                        title: "Glass Variation",
                        description: "Soft aesthetic for transparent layouts.",
                        component: <AivexDatePicker variant="glass" />,
                        code: `<AivexDatePicker variant="glass" />`
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
                code: `<FileUploadZone maxFiles={5} />`,
                props: [
                    { prop: "maxFiles", type: "number", default: "5", description: "Upload limit." },
                    { prop: "accept", type: "string", default: '"*"', description: "File type filter." },
                    { prop: "onFilesSelected", type: "(f: File[]) => void", default: "-", description: "Selection callback." },
                ],
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
                code: `<DragDropList items={clusterNodes} />`,
                props: [
                    { prop: "items", type: "DragItem[]", default: "[]", description: "Array of { id, title, type, status, icon }." },
                    { prop: "onReorder", type: "(newItems: DragItem[]) => void", default: "-", description: "Order change callback." },
                ],
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
                                <AivexButton size="lg" className="rounded-full h-20 w-20 p-0 flex items-center justify-center shadow-2xl border-emerald-500/20">
                                    <Sparkles size={32} className="text-emerald-400" />
                                </AivexButton>
                            </div>
                        </Magnetic>
                    </div>
                ),
                code: `<Magnetic strength={0.3}>...</Magnetic>`,
                props: [
                    { prop: "strength", type: "number", default: "0.5", description: "Attraction force (0-1)." },
                    { prop: "children", type: "ReactNode", default: "-", description: "The element to attract." },
                ],
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
                                        <h4 className="text-lg font-bold text-white mb-2">Aivex Link</h4>
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
                            <h4 className="text-xl font-bold font-sans mb-2">Aivex Card</h4>
                            <p className="text-sm text-zinc-500 font-sans">Hover to see the spotlight.</p>
                        </SpotlightCard>
                        <SpotlightCard spotlightColor="rgba(59, 130, 246, 0.15)" className="p-8 min-h-[200px] flex flex-col justify-end">
                            <h4 className="text-xl font-bold font-sans mb-2 text-blue-400">Blue Flux</h4>
                            <p className="text-sm text-zinc-500 font-sans">Custom spotlight colors.</p>
                        </SpotlightCard>
                    </div>
                ),
                code: `<SpotlightCard>...</SpotlightCard>`,
                props: [
                    { prop: "spotlightColor", type: "string", default: '"#10b98126"', description: "Custom radial glow color/opacity." },
                    { prop: "className", type: "string", default: "-", description: "Container overrides." },
                ],
            },
            {
                id: "command-bar",
                title: "Command Bar",
                description: "A professional ⌘K interface for power users.",
                component: (
                    <div className="flex flex-col items-center gap-4 py-8">
                        <p className="text-sm text-zinc-500 font-sans">The command bar is active on this site. Try the shortcut.</p>
                        <AivexButton onClick={() => document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }))}>
                            Open Command Bar (⌘K)
                        </AivexButton>
                    </div>
                ),
                code: `<AivexCommandBar />`,
                props: [],
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
                                <AivexSkeleton className="w-10 h-10 rounded-xl" />
                                <div className="space-y-1.5 flex-1">
                                    <AivexSkeleton className="h-3 w-1/2" />
                                    <AivexSkeleton className="h-2 w-1/3 opacity-50" />
                                </div>
                            </div>
                            <AivexSkeleton className="h-24 w-full rounded-xl" />
                            <div className="flex justify-between items-center pt-2">
                                <AivexSkeleton className="h-2 w-16" />
                                <AivexSkeleton className="h-8 w-24 rounded-lg" />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest pl-1">Pulse Variant</span>
                                <AivexSkeleton variant="pulse" className="h-12 w-full" />
                            </div>
                            <div className="space-y-2">
                                <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest pl-1">Shimmer (Default)</span>
                                <AivexSkeleton variant="default" className="h-12 w-full" />
                            </div>
                        </div>
                    </div>
                ),
                code: `<AivexSkeleton className="w-full h-8" />`,
                props: [
                    { prop: "variant", type: '"default" | "pulse"', default: '"default"', description: "Animation style." },
                    { prop: "className", type: "string", default: "-", description: "Container dimensions/style." },
                ],
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
                        code: `// loading state toggles visibility of skeletons\n{isLoading ? <AivexSkeleton /> : <Content />}`
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
                    <AivexCard className="w-full max-w-sm">
                        <AivexCardHeader>
                            <AivexCardTitle>Project Settings</AivexCardTitle>
                            <AivexCardDescription>Manage your deployment keys.</AivexCardDescription>
                        </AivexCardHeader>
                        <AivexCardContent>
                            <div className="space-y-2">
                                <AivexInput placeholder="Project Name" defaultValue="AivexCore" />
                                <div className="flex justify-end gap-2 mt-4">
                                    <AivexButton variant="ghost" size="sm">Cancel</AivexButton>
                                    <AivexButton size="sm">Save</AivexButton>
                                </div>
                            </div>
                        </AivexCardContent>
                    </AivexCard>
                ),
                code: `<AivexCard>...</AivexCard>`,
                props: [],
            },
            {
                id: "accordion",
                title: "Accordion",
                description: "Vertically stacked interactive headings that reveal details.",
                component: (
                    <div className="w-full max-w-md">
                        <AivexAccordion
                            items={[
                                { value: "item-1", title: "Is it accessible?", content: "Yes. It adheres to the WAI-ARIA design pattern." },
                                { value: "item-2", title: "Is it styled?", content: "Yes. It comes with default styles that matches the other components' aesthetic." },
                                { value: "item-3", title: "Is it animated?", content: "Yes. It's animated by default, but you can disable it if you prefer." },
                            ]}
                        />
                    </div>
                ),
                code: `<AivexAccordion items={items} type="single" />`,
                props: [
                    { prop: "items", type: "AccordionItem[]", default: "[]", description: "Array of { value, title, content } objects." },
                    { prop: "type", type: '"single" | "multiple"', default: '"single"', description: "Allow multiple items to be open." },
                    { prop: "defaultValue", type: "string | string[]", default: "-", description: "Initial open items." },
                ],
            },
            {
                id: "breadcrumb",
                title: "Breadcrumb",
                description: "Displays the path to the current resource.",
                component: (
                    <div className="p-4 bg-zinc-900/50 rounded-lg border border-zinc-800">
                        <AivexBreadcrumb
                            items={[
                                { label: "Dashboard", href: "#" },
                                { label: "Components", href: "#" },
                                { label: "Breadcrumb" }
                            ]}
                        />
                    </div>
                ),
                code: `<AivexBreadcrumb items={items} />`,
                props: [
                    { prop: "items", type: "BreadcrumbItem[]", default: "[]", description: "Array of { label, href } objects." },
                    { prop: "separator", type: "ReactNode", default: "<ChevronRight />", description: "Custom separator icon." },
                ],
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
                code: `<CommandPalette isOpen={isOpen} onClose={close} />`,
                props: [
                    { prop: "isOpen", type: "boolean", default: "false", description: "Controlled visibility." },
                    { prop: "onClose", type: "() => void", default: "-", description: "Dismissal callback." },
                ],
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
                code: `<AivexDataTable data={data} columns={columns} />`,
                props: [
                    { prop: "data", type: "any[]", default: "[]", description: "The data to visualize." },
                    { prop: "columns", type: "Column[]", default: "[]", description: "Table configuration." },
                    { prop: "pageSize", type: "number", default: "10", description: "Rows per page." },
                ],
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
                code: `<AnalyticsCard title="..." value="..." />`,
                props: [
                    { prop: "title", type: "string", default: "-", description: "Main card header." },
                    { prop: "value", type: "string", default: "-", description: "Primary metric display." },
                    { prop: "change", type: "string", default: "-", description: "Percentage or delta text." },
                    { prop: "metrics", type: "Metric[]", default: "[]", description: "Array of { label, value } bottom stats." },
                ],
            },
            {
                id: "swap",
                title: "Swap Interface",
                description: "High-density crypto trading interface example.",
                component: (
                    <div className="w-full max-w-sm">
                        <SwapCard />
                    </div>
                ),
                code: `<SwapCard />`,
                props: [
                    { prop: "onSwap", type: "(v: any) => void", default: "-", description: "Execution callback." },
                    { prop: "className", type: "string", default: "-", description: "Styling overrides." },
                ],
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
                code: `<WalletConnectModal isOpen={isOpen} onClose={close} />`,
                props: [
                    { prop: "isOpen", type: "boolean", default: "false", description: "Controlled visibility." },
                    { prop: "onClose", type: "() => void", default: "-", description: "Dismissal callback." },
                    { prop: "onConnect", type: "(id: string) => void", default: "-", description: "Success callback." },
                ],
            },
            {
                id: "code-editor",
                title: "Code Editor",
                description: "Interactive PrismJS powered editor with custom syntax highlighting.",
                component: (
                    <div className="w-full max-w-2xl">
                        <AivexCodeEditor
                            initialCode={`function AivexAI() {\n  const [state, setState] = useState("active");\n\n  return (\n    <div className="Aivex-node">\n      Cognitive bridge: {state}\n    </div>\n  );\n}`}
                            language="tsx"
                        />
                    </div>
                ),
                code: `<AivexCodeEditor initialCode={code} language="tsx" />`,
                props: [
                    { prop: "initialCode", type: "string", default: '""', description: "Original editor content." },
                    { prop: "language", type: "string", default: '"javascript"', description: "Syntax highlighting mode." },
                    { prop: "readOnly", type: "boolean", default: "false", description: "Disables interaction." },
                ],
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
                code: `<RadarChart metrics={metrics} />`,
                props: [
                    { prop: "metrics", type: "Metric[]", default: "[]", description: "Array of { label, value, max } objects." },
                    { prop: "size", type: "number", default: "300", description: "Base visual scale." },
                ],
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
                code: `<MiniSparkline data={data} />`,
                props: [
                    { prop: "data", type: "Point[]", default: "[]", description: "Array of { label, value } objects." },
                    { prop: "color", type: "string", default: '"#10b981"', description: "Hex value or CSS color." },
                ],
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
                code: `<AddressBadge address="0x..." />`,
                props: [
                    { prop: "address", type: "string", default: "-", description: "Full or truncated crypto address." },
                    { prop: "showAvatar", type: "boolean", default: "true", description: "Enables leading identity icon." },
                    { prop: "className", type: "string", default: "-", description: "Styling overrides." },
                ],
            },
            {
                id: "export-button",
                title: "Export Button",
                description: "Premium client-side data downloader supporting CSV and JSON formats.",
                component: (
                    <AivexExportButton
                        data={[
                            { id: 1, name: "Aivex Node A", status: "Active", throughput: "1.2GB/s" },
                            { id: 2, name: "Aivex Node B", status: "Idle", throughput: "0GB/s" },
                            { id: 3, name: "Aivex Node C", status: "Active", throughput: "4.5GB/s" },
                        ]}
                        filename="Aivex-system-export"
                    />
                ),
                code: `<AivexExportButton data={data} filename="system-report" />`,
                props: [
                    { prop: "data", type: "any[]", default: "[]", description: "Array of objects to export." },
                    { prop: "filename", type: "string", default: '"export"', description: "Base file name." },
                    { prop: "format", type: '"csv" | "json"', default: '"csv"', description: "Target file type." },
                    { prop: "variant", type: "string", default: '"default"', description: "Button style variant." },
                ],
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
                code: `<CustomScrollBar maxHeight="400px">...</CustomScrollBar>`,
                props: [
                    { prop: "maxHeight", type: "string", default: '"100vh"', description: "Vertical constraint." },
                    { prop: "maxWidth", type: "string", default: '"100%"', description: "Horizontal constraint." },
                    { prop: "thumbColor", type: "string", default: '"bg-zinc-700"', description: "Tailwind class or CSS color." },
                    { prop: "orientation", type: '"vertical" | "horizontal"', default: '"vertical"', description: "Scroll axis." },
                    { prop: "children", type: "ReactNode", default: "-", description: "The scrollable content." },
                ],
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
                                                        <h4 className="text-sm font-bold text-zinc-200 group-hover:text-white transition-colors">Aivex Module {i + 1}</h4>
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
                title: "Aivex Bento Grid",
                description: "Swiss-design inspired grid layout for cinematic dashboards.",
                addedAt: "2026-02-11",
                component: (
                    <div className="w-full scale-[0.85] origin-top bg-zinc-950/50 p-8 rounded-[2rem] border border-zinc-900">
                        <AivexBentoGrid>
                            <AivexBentoCard
                                className="md:col-span-2"
                                title="Aivex Core"
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
                            </AivexBentoCard>
                            <AivexBentoCard
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
                            </AivexBentoCard>
                        </AivexBentoGrid>
                    </div>
                ),
                code: `<AivexBentoGrid>...</AivexBentoGrid>`,
                props: [
                    { prop: "title", type: "string", default: "-", description: "Header text (Card)." },
                    { prop: "description", type: "string", default: "-", description: "Sub-info text (Card)." },
                    { prop: "icon", type: "ReactNode", default: "-", description: "Leading icon (Card)." },
                    { prop: "className", type: "string", default: "-", description: "Container spans." },
                ],
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
                code: `<PriceMetric label="ETH/USD" value={3451.24} />`,
                props: [
                    { prop: "label", type: "string", default: "-", description: "Pair display name." },
                    { prop: "symbol", type: "string", default: "-", description: "Currency ticker." },
                    { prop: "value", type: "number", default: "-", description: "Current market price." },
                    { prop: "change24h", type: "number", default: "-", description: "Delta percentage." },
                ],
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
                code: `<TokenPerformance symbol="BTC" price={62450} />`,
                props: [
                    { prop: "symbol", type: "string", default: "-", description: "Asset ticker." },
                    { prop: "name", type: "string", default: "-", description: "Asset full name." },
                    { prop: "price", type: "number", default: "-", description: "Current value." },
                    { prop: "change24h", type: "number", default: "-", description: "Growth %." },
                    { prop: "volume24h", type: "string", default: "-", description: "Trading volume." },
                ],
            },
            {
                id: "carousel",
                title: "Aivex Carousel",
                description: "High-performance slider with Draggable support and spotlight effects.",
                addedAt: "2026-02-27",
                component: (
                    <AivexCarousel
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
                code: `<AivexCarousel items={nodes} />`,
                props: [
                    { prop: "items", type: "ReactNode[]", default: "[]", description: "Array of slider content." },
                    { prop: "className", type: "string", default: "-", description: "Container overrides." },
                ],
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
                code: `<AIChatInterface />`,
                props: []
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
                code: `<StreamingText speed={40}>...</StreamingText>`,
                props: [
                    { prop: "children", type: "string", default: "-", description: "Text to stream." },
                    { prop: "speed", type: "number", default: "30", description: "Ms per character." },
                    { prop: "cursor", type: "boolean", default: "true", description: "Show typing indicator." },
                ],
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
                code: `<StepProcess steps={steps} />`,
                props: [
                    { prop: "steps", type: "Step[]", default: "[]", description: "Array of { id, title, status }." },
                ],
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
                code: `<AgentThoughtFlow steps={steps} />`,
                props: [
                    { prop: "steps", type: "Thought[]", default: "[]", description: "Array of { id, label, type, status }." },
                ],
            },
            {
                id: "model-params",
                title: "Model Parameters",
                description: "Technical configuration interfaces for Aivex model orchestration.",
                addedAt: "2026-02-11",
                component: (
                    <div className="w-full max-w-sm">
                        <ModelParameters />
                    </div>
                ),
                code: `<ModelParameters />`,
                props: [
                    { prop: "onConfigChange", type: "(config: any) => void", default: "-", description: "Settings update callback." },
                    { prop: "className", type: "string", default: "-", description: "Container styling." },
                ],
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
                code: `<AgentActivityFeed activities={data} />`,
                props: [
                    { prop: "activities", type: "ActivityItem[]", default: "[]", description: "Array of feed log objects." },
                    { prop: "title", type: "string", default: '"Agent Protocol Feed"', description: "Header caption." },
                    { prop: "maxHeight", type: "string", default: '"400px"', description: "Vertical constraint." },
                ],
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
                            Aivex<span className="text-zinc-500">Docs</span>
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
            <div className="flex-1 overflow-auto bg-zinc-950 scrollbar-none">
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
                        <AivexBadge status="success" dot className="text-[10px] h-5 px-1.5 font-mono">STABLE</AivexBadge>
                        <span className="text-zinc-500 text-[11px] font-mono">@Aivex-ui/core/{component.id}</span>
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
            <div ref={contentRef} className="flex-1 overflow-auto scrollbar-none">
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
                                <pre className="p-8 rounded-2xl bg-zinc-950 border border-zinc-900 text-sm font-mono text-zinc-300 overflow-x-auto leading-relaxed scrollbar-none">
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
                                                {(component.props || [
                                                    { prop: "className", type: "string", default: "-" },
                                                    { prop: "children", type: "ReactNode", default: "-" },
                                                ]).map((p, i) => (
                                                    <tr key={i} className="group hover:bg-zinc-900/30 transition-colors">
                                                        <td className="px-4 py-4 font-mono text-emerald-500 text-xs">
                                                            {p.prop}
                                                            {p.description && (
                                                                <span className="block text-[10px] text-zinc-500 font-sans mt-0.5 normal-case font-normal">
                                                                    {p.description}
                                                                </span>
                                                            )}
                                                        </td>
                                                        <td className="px-4 py-4 text-zinc-400 text-xs font-mono">{p.type}</td>
                                                        <td className="px-4 py-4 text-zinc-500 text-xs font-mono">{p.default}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                <div className="p-6 rounded-2xl border border-blue-500/20 bg-blue-500/5 text-blue-400 text-sm font-sans flex gap-3">
                                    <Info size={18} className="shrink-0" />
                                    <p>All AivexCore components support standard HTML attributes and are fully composable with Tailwind CSS utility classes.</p>
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
        <div className="flex flex-col h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-zinc-800 selection:text-zinc-50 overflow-hidden scrollbar-none" style={{ fontFamily: 'var(--font-sans), sans-serif' }}>
            <AivexCommandBar />
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

                    <div className="flex-1 overflow-y-auto p-3 pb-24 space-y-6 scrollbar-none">
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
