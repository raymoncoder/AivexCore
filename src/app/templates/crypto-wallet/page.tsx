"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    Wallet,
    ArrowRightLeft,
    History,
    Settings,
    TrendingUp,
    Download,
    Upload,
    ShieldCheck,
    Bell,
    CreditCard,
    ChevronDown,
    MoreHorizontal
} from "lucide-react";

import { AddressBadge } from "@/components/ui/crypto/AddressBadge";
import { SwapCard } from "@/components/ui/crypto/SwapCard";
import { TokenPerformance } from "@/components/ui/crypto/TokenPerformance";
import { WalletConnectModal } from "@/components/ui/crypto/WalletConnectModal";
import { MiniSparkline } from "@/components/ui/data/MiniSparkline";
import { AivexButton } from "@/components/ui/core/AivexButton";
import { AivexBadge } from "@/components/ui/core/AivexBadge";
import { cn } from "@/lib/utils";
import { TokenETH, TokenSOL, TokenBTC, TokenUSDC } from "@web3icons/react";

// --- Mock Data ---

const sparklineData = Array.from({ length: 40 }).map((_, i) => ({
    label: `Day ${i}`,
    value: 12400 + Math.sin(i / 3) * 1500 + i * 80 + Math.cos(i) * 500
}));

const tokens = [
    { name: "Ethereum", symbol: "ETH", iconComponent: TokenETH, price: 3425.60, change: 4.2, balance: 2.45, sparkline: Array.from({ length: 20 }).map((_, i) => ({ label: 'd', value: 3000 + i * 20 + Math.sin(i) * 200 })) },
    { name: "Aivex", symbol: "NRL", bg: "bg-emerald-500 text-white", price: 12.40, change: 15.8, balance: 1450.00, sparkline: Array.from({ length: 20 }).map((_, i) => ({ label: 'd', value: 10 + Math.pow(i, 1.2) * 0.1 + Math.cos(i) })) },
    { name: "Solana", symbol: "SOL", iconComponent: TokenSOL, price: 142.10, change: -1.2, balance: 45.2, sparkline: Array.from({ length: 20 }).map((_, i) => ({ label: 'd', value: 150 - i * 0.5 + Math.sin(i * 2) * 5 })) },
    { name: "Bitcoin", symbol: "BTC", iconComponent: TokenBTC, price: 64230.00, change: 2.1, balance: 0.15, sparkline: Array.from({ length: 20 }).map((_, i) => ({ label: 'd', value: 60000 + i * 200 + Math.cos(i * 3) * 1000 })) },
];

const transactions = [
    { type: "Received", asset: "ETH", amount: "+0.5", fiat: "+$1,712.80", status: "Completed", time: "10 mins ago" },
    { type: "Swapped", asset: "USDC → NRL", amount: "1000", fiat: "$1,000.00", status: "Completed", time: "2 hours ago" },
    { type: "Sent", asset: "SOL", amount: "-10", fiat: "-$1,421.00", status: "Completed", time: "Yesterday" },
];

export default function CryptoWalletTemplate() {
    const [connectOpen, setConnectOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("portfolio");

    return (
        <div className="min-h-screen bg-[#050505] text-zinc-100 font-sans selection:bg-emerald-500/30 selection:text-emerald-50 overflow-hidden flex flex-col p-2 sm:p-4 md:p-6">

            {/* Global Background & Light Effects */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.04] mix-blend-overlay" />
                <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-emerald-500/10 blur-[150px] rounded-full mix-blend-screen opacity-50" />
                <div className="absolute bottom-[20%] left-[-20%] w-[60vw] h-[60vw] bg-blue-500/5 blur-[120px] rounded-full mix-blend-screen opacity-30" />
            </div>

            {/* Application Window Frame */}
            <div className="relative z-10 w-full max-w-[1600px] mx-auto flex gap-6 h-[calc(100vh-48px)]">

                {/* Left Sidebar - Navigation */}
                <motion.aside
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="w-[280px] shrink-0 h-full flex flex-col gap-6"
                >
                    {/* Logo & Network */}
                    <div className="rounded-[28px] bg-zinc-950/60 backdrop-blur-xl border border-white/[0.04] shadow-2xl p-5 flex flex-col gap-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-zinc-900 border border-emerald-500/30 flex items-center justify-center shadow-[0_0_20px_-5px_rgba(16,185,129,0.3)]">
                                <Wallet size={20} className="text-emerald-400" />
                            </div>
                            <div>
                                <h1 className="font-bold text-lg text-white leading-tight">Aivex Wallet</h1>
                                <p className="text-[10px] text-emerald-500/80 font-mono uppercase tracking-widest flex items-center gap-1.5 mt-0.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                    Mainnet
                                </p>
                            </div>
                        </div>

                        <div className="h-[1px] w-full bg-white/[0.05]" />

                        <AivexButton
                            className="w-full bg-emerald-500 text-emerald-950 font-bold hover:bg-emerald-400 rounded-xl h-11"
                            onClick={() => setConnectOpen(true)}
                        >
                            Connect DApp
                        </AivexButton>
                    </div>

                    {/* Nav Menu */}
                    <div className="flex-1 rounded-[28px] bg-zinc-950/40 backdrop-blur-xl border border-white/[0.04] shadow-xl p-3 flex flex-col gap-1 overflow-hidden min-h-0">
                        <div className="px-3 py-2 text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-bold">Menu</div>

                        {[
                            { id: "portfolio", label: "Portfolio", icon: Wallet },
                            { id: "swap", label: "Swap & Bridge", icon: ArrowRightLeft },
                            { id: "history", label: "Activity", icon: History },
                            { id: "explore", label: "Explore Web3", icon: TrendingUp },
                        ].map(item => {
                            const Icon = item.icon;
                            const isActive = activeTab === item.id;
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveTab(item.id)}
                                    className={cn(
                                        "flex items-center gap-3 px-3 py-3 rounded-2xl transition-all font-medium text-sm w-full",
                                        isActive
                                            ? "bg-zinc-800/80 text-emerald-400 shadow-sm border border-white/[0.02]"
                                            : "text-zinc-400 hover:text-zinc-100 hover:bg-white/5 border border-transparent"
                                    )}
                                >
                                    <Icon size={18} className={cn(isActive && "text-emerald-400")} />
                                    {item.label}
                                </button>
                            );
                        })}

                        <div className="mt-auto px-3 py-2 text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-bold">Settings</div>
                        <button className="flex items-center gap-3 px-3 py-3 rounded-2xl text-zinc-400 hover:text-zinc-100 hover:bg-white/5 border border-transparent transition-all w-full">
                            <ShieldCheck size={18} />
                            <span className="text-sm font-medium">Security</span>
                        </button>
                        <button className="flex items-center gap-3 px-3 py-3 rounded-2xl text-zinc-400 hover:text-zinc-100 hover:bg-white/5 border border-transparent transition-all w-full">
                            <Settings size={18} />
                            <span className="text-sm font-medium">Preferences</span>
                        </button>
                    </div>
                </motion.aside>

                {/* Center Main Area */}
                <motion.main
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="flex-1 min-w-0 h-full rounded-[32px] border border-white/[0.04] bg-zinc-950/50 backdrop-blur-2xl shadow-2xl overflow-hidden flex flex-col relative"
                >
                    {/* Header bar inside main */}
                    <div className="h-16 border-b border-white/[0.04] flex items-center justify-between px-8 shrink-0">
                        <AddressBadge address="0x71C7656EC7ab88b098defB751B7401B5f6d8976F" />
                        <div className="flex items-center gap-2">
                            <AivexButton variant="ghost" size="icon" className="text-zinc-400 rounded-full hover:bg-white/5">
                                <Bell size={18} />
                            </AivexButton>
                            <AivexButton variant="ghost" size="icon" className="text-zinc-400 rounded-full hover:bg-white/5 hidden sm:flex">
                                <Download size={18} />
                            </AivexButton>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] p-8 pb-32">
                        {/* Net Worth Hero */}
                        <div className="flex flex-col xl:flex-row gap-8 items-start xl:items-end mb-12">
                            <div className="flex-1">
                                <h2 className="text-[11px] font-mono text-zinc-500 uppercase tracking-[0.2em] font-bold mb-3">Total Net Worth</h2>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-3xl text-zinc-600 font-mono font-light">$</span>
                                    <span className="text-6xl font-bold font-mono tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white to-zinc-400">
                                        42,850.40
                                    </span>
                                </div>
                                <div className="flex items-center gap-3 mt-3">
                                    <AivexBadge status="success" className="font-mono text-sm px-2 py-0.5 border-emerald-500/30">
                                        +5.2% ($2,142)
                                    </AivexBadge>
                                    <span className="text-xs text-zinc-500 font-sans">Past 30 days</span>
                                </div>
                            </div>

                            <div className="w-full xl:w-[350px] shrink-0 h-[100px] border border-white/[0.02] bg-zinc-900/40 rounded-2xl flex items-center justify-center overflow-hidden p-2 relative group">
                                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                <MiniSparkline
                                    data={sparklineData}
                                    width={330}
                                    height={80}
                                    color="#10b981"
                                    showGlow={true}
                                />
                            </div>
                        </div>

                        {/* Quick Actions (Mobile/Tablet generally, or large buttons) */}
                        <div className="grid grid-cols-3 gap-4 mb-10 xl:hidden">
                            <AivexButton className="bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 h-12 rounded-2xl text-zinc-300">
                                <Upload size={16} className="mr-2" /> Send
                            </AivexButton>
                            <AivexButton className="bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 h-12 rounded-2xl text-zinc-300">
                                <Download size={16} className="mr-2" /> Receive
                            </AivexButton>
                            <AivexButton className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 h-12 rounded-2xl">
                                <CreditCard size={16} className="mr-2" /> Buy
                            </AivexButton>
                        </div>

                        {/* Assets List */}
                        <div className="mb-6 flex justify-between items-end">
                            <h3 className="text-lg font-bold">Your Assets</h3>
                            <button className="text-sm text-zinc-500 hover:text-emerald-400 transition-colors font-medium">View All</button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 auto-rows-fr">
                            {tokens.map((token, i) => (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 + i * 0.1 }}
                                    key={token.symbol}
                                    className="bg-zinc-900/50 rounded-2xl border border-white/[0.06] p-5 flex flex-col justify-between hover:bg-zinc-800/60 hover:border-white/[0.12] transition-all cursor-pointer group shadow-xl"
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className={cn("w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold ring-2 ring-zinc-950 overflow-hidden", token.bg || "bg-zinc-800")}>
                                                {token.iconComponent ? <token.iconComponent className="w-10 h-10" /> : token.symbol.substring(0, 1)}
                                            </div>
                                            <div>
                                                <div className="font-bold font-sans text-zinc-100">{token.name}</div>
                                                <div className="text-xs font-mono text-zinc-500">{token.symbol}</div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-bold font-mono text-zinc-100">${(token.balance * token.price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                                            <div className="text-xs font-mono text-zinc-400">{token.balance} {token.symbol}</div>
                                        </div>
                                    </div>

                                    <div className="flex items-end justify-between mt-2 pt-4 border-t border-white/[0.02]">
                                        <div>
                                            <div className="text-[10px] text-zinc-500 font-sans mb-1 uppercase tracking-widest">Price</div>
                                            <div className="font-mono text-sm">${token.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                                        </div>
                                        <div className="w-24 h-8 shrink-0 relative flex items-center justify-end">
                                            <MiniSparkline
                                                data={token.sparkline}
                                                width={80}
                                                height={24}
                                                color={token.change >= 0 ? "#10b981" : "#f43f5e"}
                                                showGlow={false}
                                            />
                                            <div className={cn(
                                                "absolute -top-5 right-0 text-[10px] font-mono font-bold",
                                                token.change >= 0 ? "text-emerald-400" : "text-rose-400"
                                            )}>
                                                {token.change >= 0 ? "+" : ""}{token.change}%
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Recent Activity */}
                        <div className="mt-12">
                            <div className="mb-6 flex justify-between items-end">
                                <h3 className="text-lg font-bold">Recent Activity</h3>
                                <button className="text-sm text-zinc-500 hover:text-emerald-400 transition-colors font-medium">All History</button>
                            </div>
                            <div className="bg-zinc-900/50 rounded-3xl border border-white/[0.06] overflow-hidden shadow-xl">
                                {transactions.map((tx, i) => (
                                    <div key={i} className={cn(
                                        "flex items-center justify-between p-4 hover:bg-white/[0.04] transition-colors cursor-pointer",
                                        i !== transactions.length - 1 && "border-b border-white/[0.06]"
                                    )}>
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0">
                                                {tx.type === "Sent" ? <Upload size={16} className="text-zinc-400" /> :
                                                    tx.type === "Received" ? <Download size={16} className="text-emerald-400" /> :
                                                        <ArrowRightLeft size={16} className="text-blue-400" />}
                                            </div>
                                            <div>
                                                <div className="font-medium text-sm text-zinc-200">{tx.type}</div>
                                                <div className="text-[10px] text-zinc-500 mt-0.5">{tx.time}</div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className={cn(
                                                "font-mono text-sm font-bold",
                                                tx.amount.startsWith("+") ? "text-emerald-400" : "text-zinc-200"
                                            )}>{tx.amount} {tx.asset.split(" ")[0]}</div>
                                            <div className="text-[10px] font-mono text-zinc-500 mt-0.5">{tx.fiat}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>

                    {/* Shadow overlay at bottom for smooth scroll fade */}
                    <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-zinc-950/80 to-transparent pointer-events-none" />
                </motion.main>

                {/* Right Sidebar - Action Widgets */}
                <motion.aside
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                    className="w-[360px] shrink-0 h-full hidden xl:flex flex-col gap-6"
                >
                    {/* Quick Action Top */}
                    <div className="grid grid-cols-2 gap-3 shrink-0">
                        <button className="flex items-center justify-center gap-2 bg-gradient-to-br from-emerald-500/10 to-transparent border border-emerald-500/20 hover:bg-emerald-500/20 transition-all rounded-[20px] h-14 text-emerald-400 font-medium">
                            <Download size={16} /> Buy Crypto
                        </button>
                        <button className="flex items-center justify-center gap-2 bg-zinc-900/50 hover:bg-zinc-800/80 border border-white/[0.04] transition-all rounded-[20px] h-14 text-zinc-300 font-medium">
                            <Upload size={16} /> Send
                        </button>
                    </div>

                    {/* Integrated Swap Component */}
                    <div className="flex-1 min-h-0 flex flex-col justify-start">
                        <div className="sticky top-0 w-full">
                            <div className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest pl-2 mb-3">Quick Swap</div>
                            {/* We use our existing SwapCard component, but wrapped in a dark container if needed. SwapCard already has dark styling. */}
                            <div className="rounded-[28px] overflow-hidden shadow-2xl bg-[#0a0a0a]">
                                <SwapCard className="border-none w-full" />
                            </div>
                        </div>

                        {/* Network Status / Info */}
                        <div className="mt-6 rounded-[24px] bg-zinc-900/40 border border-white/[0.02] p-4">
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Network Info</span>
                                <AivexBadge status="success" dot className="bg-transparent border-none p-0 scale-90 origin-right">Healthy</AivexBadge>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-light/[0.05]">
                                <span className="text-xs text-zinc-400">Gas Price (Fast)</span>
                                <span className="text-sm font-mono text-zinc-200">24 Gwei</span>
                            </div>
                            <div className="flex justify-between items-center py-2">
                                <span className="text-xs text-zinc-400">Block Height</span>
                                <span className="text-sm font-mono text-zinc-200">19,482,109</span>
                            </div>
                        </div>
                    </div>
                </motion.aside>

            </div>

            <WalletConnectModal
                isOpen={connectOpen}
                onClose={() => setConnectOpen(false)}
            />
        </div>
    );
}
