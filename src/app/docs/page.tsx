"use client";

import { NeuralButton } from "@/components/ui/core/NeuralButton";
import { NeuralInput } from "@/components/ui/core/NeuralInput";
import { NeuralBadge } from "@/components/ui/core/NeuralBadge";
import { NeuralSwitch } from "@/components/ui/core/NeuralSwitch";
import { NeuralSelect } from "@/components/ui/core/NeuralSelect";
import { NeuralTabs } from "@/components/ui/core/NeuralTabs";
import { NeuralCard, NeuralCardHeader, NeuralCardTitle, NeuralCardDescription, NeuralCardContent } from "@/components/ui/core/NeuralCard";
import { AnalyticsCard } from "@/components/ui/core/AnalyticsCard";
import { SwapCard } from "@/components/ui/crypto/SwapCard";
import { AIChatInterface } from "@/components/ui/ai/AIChatInterface";
import { Box, PieChart, Sparkles, ToggleLeft, Copy, Check, Terminal, Layout, Layers, Menu, Grid, Magnet, Loader2, MousePointer2, Info, MoveHorizontal, Wallet, AlertCircle, ChevronRight, User, Search, Percent, Table as TableIcon, Github, Twitter, ExternalLink, ArrowRight, Play, Eye, Code, Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
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
import { CustomScrollBar } from "@/components/ui/core/CustomScrollBar";
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
        { key: "users" as const, header: "Users" },
        { key: "revenue" as const, header: "Revenue" },
    ];

    return (
        <NeuralDataTable data={data} columns={columns as any} pageSize={4} />
    )
}

const IntroductionSection = () => (
    <div className="max-w-4xl space-y-12">
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
            <h2 className="text-2xl font-bold font-sans">Core Philisophy</h2>
            <div className="space-y-4 border-l border-zinc-800 pl-6 text-zinc-400 font-sans italic leading-relaxed">
                "We believe that AI software shouldn't just be functional; it should feel alive.
                Neural UI provides the building blocks for interfaces that respond to intelligence with fluid precision."
            </div>
        </div>
    </div>
);

const InstallationSection = () => (
    <div className="max-w-4xl space-y-12">
        <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight font-sans">Installation</h1>
            <p className="text-xl text-zinc-400 font-light font-sans leading-relaxed">
                Add Neural UI to your Next.js project with a single command.
            </p>
        </div>

        <div className="space-y-6">
            <div className="space-y-2">
                <h3 className="text-lg font-bold font-sans">1. Create Project</h3>
                <p className="text-sm text-zinc-500 font-sans">Run our CLI to initialize a new project with all global styles configured.</p>
            </div>
            <div className="relative group">
                <pre className="p-6 rounded-xl bg-zinc-950 border border-zinc-900 text-sm font-mono text-emerald-500/90 overflow-x-auto">
                    <code>npx create-neural-app@latest my-neural-app</code>
                </pre>
            </div>
        </div>

        <div className="space-y-6">
            <div className="space-y-2">
                <h3 className="text-lg font-bold font-sans">2. Install Dependencies</h3>
                <p className="text-sm text-zinc-500 font-sans">Neural UI relies on Framer Motion and Radix UI primitives.</p>
            </div>
            <div className="relative group">
                <pre className="p-6 rounded-xl bg-zinc-950 border border-zinc-900 text-sm font-mono text-zinc-300 overflow-x-auto">
                    <code>npm install framer-motion @radix-ui/react-slot lucide-react clsx tailwind-merge</code>
                </pre>
            </div>
        </div>

        <div className="space-y-6">
            <div className="space-y-2">
                <h3 className="text-lg font-bold font-sans">3. Configure Styles</h3>
                <p className="text-sm text-zinc-500 font-sans">Add our custom utility classes to your <code className="text-emerald-500">tailwind.config.ts</code>.</p>
            </div>
            <div className="relative group">
                <Link href="#" className="flex items-center justify-between p-4 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-all font-sans">
                    <div className="flex items-center gap-3">
                        <Terminal size={18} className="text-zinc-500" />
                        <span className="text-sm text-zinc-300">View Tailwind Configuration</span>
                    </div>
                    <ArrowRight size={16} className="text-zinc-500" />
                </Link>
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
                description: "Animated segmented controls with layout transitions.",
                component: (
                    <NeuralTabs
                        tabs={[
                            { id: "account", label: "Account" },
                            { id: "password", label: "Password" },
                            { id: "billing", label: "Billing" },
                        ]}
                    />
                ),
                code: `<NeuralTabs
    tabs={[
        { id: "account", label: "Account" },
        { id: "password", label: "Password" },
        { id: "billing", label: "Billing" },
    ]}
/>`
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
                description: "Text inputs with clean borders, focus rings, and icon support. Optimized for user interaction.",
                component: <NeuralInput label="Neural Input" placeholder="Search components..." />,
                code: `<NeuralInput label="Neural Input" placeholder="Search components..." />`,
                variants: [
                    {
                        id: "with-icon",
                        title: "With Icon",
                        description: "Prepend an icon to the input for context.",
                        component: <NeuralInput placeholder="Enter command..." icon={<Terminal size={14} />} />,
                        code: `<NeuralInput icon={<Terminal size={14} />} />`
                    },
                    {
                        id: "password",
                        title: "Password Type",
                        description: "Standard sensitive data input masking.",
                        component: <NeuralInput type="password" placeholder="••••••••" />,
                        code: `<NeuralInput type="password" />`
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
                description: "Custom accessible dropdown with animations.",
                component: (
                    <div className="w-full max-w-[220px]">
                        <NeuralSelect
                            options={[
                                { value: "gpt-4", label: "GPT-4 Turbo" },
                                { value: "claude-3", label: "Claude 3 Opus" },
                                { value: "gemini", label: "Gemini Pro" },
                            ]}
                            onValueChange={() => { }}
                            defaultValue="gpt-4"
                        />
                    </div>
                ),
                code: `<NeuralSelect
    options={[
        { value: "gpt-4", label: "GPT-4 Turbo" },
        { value: "claude-3", label: "Claude 3 Opus" },
        { value: "gemini", label: "Gemini Pro" },
    ]}
    onValueChange={(val) => console.log(val)}
    defaultValue="gpt-4"
/>`
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
                code: `<NeuralSwitch label="Airplane Mode" checked />
<NeuralSwitch label="Do Not Disturb" />
<NeuralSwitch label="Disabled" disabled />`
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
                description: "Wraps any element to add a magnetic cursor effect.",
                component: (
                    <div className="p-10 flex justify-center">
                        <Magnetic strength={0.3}>
                            <NeuralButton size="lg" className="rounded-full h-16 w-16 p-0 flex items-center justify-center">
                                <MousePointer2 size={24} />
                            </NeuralButton>
                        </Magnetic>
                    </div>
                ),
                code: `<Magnetic strength={0.3}>
    <NeuralButton className="rounded-full">Hover</NeuralButton>
</Magnetic>`
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
                        <NeuralButton onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }))}>
                            Open Command Bar (⌘K)
                        </NeuralButton>
                    </div>
                ),
                code: `<NeuralCommandBar />`
            }
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
                    <div className="w-full max-w-md">
                        <CustomScrollBar maxHeight="300px" className="border border-zinc-800 rounded-xl">
                            <div className="p-6 space-y-4">
                                {Array.from({ length: 15 }).map((_, i) => (
                                    <div key={i} className="p-4 bg-zinc-900/50 rounded-lg border border-zinc-800">
                                        <div className="font-medium text-sm">Item {i + 1}</div>
                                        <div className="text-xs text-zinc-500 mt-1">Scrollable content with custom scrollbar styling</div>
                                    </div>
                                ))}
                            </div>
                        </CustomScrollBar>
                    </div>
                ),
                code: `<CustomScrollBar maxHeight="300px">
    <div className="p-6 space-y-4">
        {/* Your scrollable content */}
    </div>
</CustomScrollBar>`,
                variants: [
                    {
                        id: "horizontal-scrollbar",
                        title: "Horizontal Orientation",
                        description: "Full support for horizontal scrolling with matching track and thumb positioning.",
                        component: (
                            <div className="w-full">
                                <CustomScrollBar orientation="horizontal" maxWidth="100%" className="border border-zinc-800 rounded-xl">
                                    <div className="flex gap-4 p-6 w-max">
                                        {Array.from({ length: 15 }).map((_, i) => (
                                            <div key={i} className="w-[180px] flex-shrink-0 p-6 bg-zinc-900/50 rounded-lg border border-zinc-800 text-center">
                                                <div className="font-bold text-lg mb-1 tracking-tight">{i + 1}</div>
                                                <div className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">Neural Card</div>
                                            </div>
                                        ))}
                                    </div>
                                </CustomScrollBar>
                            </div>
                        ),
                        code: `<CustomScrollBar orientation="horizontal" maxWidth="400px">
    <div className="flex gap-4 w-[800px]">
        {/* Horizontal items */}
    </div>
</CustomScrollBar>`
                    }
                ]
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
            }
        ]
    }
];


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
                        <Link href="https://twitter.com" className="p-2 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 rounded-md transition-colors">
                            <Twitter size={16} />
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
    icon
}: {
    active: boolean,
    onClick: () => void,
    children: React.ReactNode,
    icon?: React.ReactNode
}) => (
    <button
        onClick={onClick}
        className={cn(
            "w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all font-sans group",
            active
                ? "bg-emerald-500/10 text-emerald-500"
                : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/50"
        )}
    >
        {icon && <span className={cn("transition-colors", active ? "text-emerald-500" : "text-zinc-500 group-hover:text-zinc-300")}>{icon}</span>}
        {children}
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

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (isGettingStarted) {
        return (
            <div className="flex-1 overflow-auto bg-zinc-950 p-8 md:p-12 lg:p-16">
                <motion.div
                    key={component.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {component.component}
                </motion.div>
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
            <div className="flex-1 overflow-auto">
                <div className="max-w-5xl mx-auto p-8 pb-32 space-y-12">
                    <AnimatePresence mode="wait">
                        {/* ... (existing content) ... */}
                    </AnimatePresence>

                    {/* Pagination Footer */}
                    <div className="pt-12 mt-12 border-t border-zinc-900 flex justify-between items-center gap-4">
                        {prevComponent ? (
                            <button
                                onClick={() => onNavigate(prevComponent.id)}
                                className="group flex items-center gap-3 px-4 py-2.5 rounded-xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800 transition-all text-sm font-medium text-zinc-400 hover:text-white"
                            >
                                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                                {prevComponent.title}
                            </button>
                        ) : <div />}

                        {nextComponent ? (
                            <button
                                onClick={() => onNavigate(nextComponent.id)}
                                className="group flex items-center gap-3 px-4 py-2.5 rounded-xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800 transition-all text-sm font-medium text-zinc-400 hover:text-white"
                            >
                                {nextComponent.title}
                                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        ) : <div />}
                    </div>
                </div>
            </div>
            {view === "preview" && (
                <motion.div
                    key="preview"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="space-y-8"
                >
                    <div className="p-12 rounded-2xl border border-white/5 bg-zinc-900/10 bg-[url('/grid.svg')] bg-center flex flex-col items-center justify-center min-h-[300px] shadow-inner relative overflow-hidden group">
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
                </div >
            </div >
        </div >
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
                        <div className="text-xs text-emerald-500 font-mono bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">v2.1.0</div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-3 space-y-6 scrollbar-hide">
                        {categories.map((category) => (
                            <div key={category.id}>
                                <div className="flex items-center gap-2 px-3 mb-2 text-zinc-100 font-medium text-sm font-sans">
                                    <span className="text-zinc-500">{category.icon}</span>
                                    {category.title}
                                </div>
                                <div className="space-y-0.5 ml-2 border-l border-zinc-800 pl-2">
                                    {category.components.map((comp) => (
                                        <SidebarItem
                                            key={comp.id}
                                            active={selectedId === comp.id}
                                            onClick={() => {
                                                setSelectedId(comp.id);
                                                if (window.innerWidth < 1024) setSidebarOpen(false);
                                            }}
                                        >
                                            {comp.title}
                                        </SidebarItem>
                                    ))}
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

                    <StoryCanvas component={activeComponent} isGettingStarted={activeCategory?.isGettingStarted} />
                </main>
            </div>
        </div>
    );
}
