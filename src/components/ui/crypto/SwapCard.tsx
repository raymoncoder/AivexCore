"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowDownUp, Settings, ChevronDown, Info, Wallet } from "lucide-react";
import { NeuralButton } from "@/components/ui/core/NeuralButton";
import { cn } from "@/lib/utils";

export const SwapCard = () => {
    const [amountIn, setAmountIn] = useState("1.0");
    const [tokenIn, setTokenIn] = useState("ETH");
    const [tokenOut, setTokenOut] = useState("USDC");

    const exchangeRate = 3500.25;

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-sm p-5 rounded-2xl bg-zinc-950/80 backdrop-blur-xl border border-zinc-800 shadow-2xl relative overflow-hidden ring-1 ring-zinc-800/50"
        >
            {/* Header */}
            <div className="flex justify-between items-center mb-6 px-1">
                <h2 className="text-lg font-semibold text-zinc-100 tracking-tight">
                    Swap
                </h2>
                <div className="flex gap-2">
                    <button className="p-2 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-zinc-50 transition-colors">
                        <Settings size={18} />
                    </button>
                </div>
            </div>

            {/* Input Section */}
            <div className="space-y-1 mb-1 relative z-10">
                <div className="p-4 bg-zinc-900/50 rounded-xl border border-zinc-800 transition-colors hover:border-zinc-700 group focus-within:border-zinc-700 focus-within:ring-1 focus-within:ring-zinc-700/50">
                    <div className="flex justify-between text-xs text-zinc-500 mb-2 font-medium">
                        <span>Pay</span>
                        <span className="flex items-center gap-1 text-zinc-400 hover:text-zinc-300 cursor-pointer transition-colors font-mono"><Wallet size={12} /> 2.45 ETH</span>
                    </div>
                    <div className="flex justify-between items-center gap-4">
                        <input
                            type="number"
                            value={amountIn}
                            onChange={(e) => setAmountIn(e.target.value)}
                            className="w-full bg-transparent text-3xl font-mono font-semibold text-zinc-100 placeholder:text-zinc-700 focus:outline-none"
                            placeholder="0.0"
                        />
                        <button className="shrink-0 flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 px-3 py-1.5 rounded-full font-medium transition-colors border border-zinc-700 text-sm shadow-sm hover:shadow text-zinc-100">
                            <span className="w-5 h-5 rounded-full bg-zinc-100 flex items-center justify-center text-[10px] text-black font-extrabold">Ξ</span>
                            {tokenIn}
                            <ChevronDown size={14} className="text-zinc-400" />
                        </button>
                    </div>
                    <div className="text-xs font-mono text-zinc-500 mt-2">~$3,500.25</div>
                </div>
            </div>

            {/* Swap Button */}
            <div className="relative h-4 flex items-center justify-center -my-2 z-20">
                <div className="absolute inset-0 flex items-center">
                    {/* Gap filler */}
                </div>
                <button
                    className="group relative bg-zinc-900 border-4 border-zinc-950 p-2 rounded-xl text-zinc-400 hover:text-zinc-100 transition-all hover:scale-110 active:scale-95 shadow-sm"
                >
                    <ArrowDownUp size={16} />
                </button>
            </div>

            {/* Output Section */}
            <div className="space-y-1 mb-6 relative z-10">
                <div className="p-4 bg-zinc-900/50 rounded-xl border border-zinc-800 transition-colors hover:border-zinc-700 group focus-within:border-zinc-700 focus-within:ring-1 focus-within:ring-zinc-700/50">
                    <div className="flex justify-between text-xs text-zinc-500 mb-2 font-medium">
                        <span>Receive</span>
                        <span className="flex items-center gap-1 text-zinc-400 hover:text-zinc-300 cursor-pointer transition-colors font-mono"><Wallet size={12} /> 0.00 USDC</span>
                    </div>
                    <div className="flex justify-between items-center gap-4">
                        <div className="w-full bg-transparent text-3xl font-mono font-semibold text-zinc-100 uppercase">
                            {(parseFloat(amountIn || "0") * exchangeRate).toLocaleString()}
                        </div>
                        <button className="shrink-0 flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 px-3 py-1.5 rounded-full font-medium transition-colors border border-zinc-700 text-sm shadow-sm hover:shadow text-zinc-100">
                            <span className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-[10px] text-white font-bold">$</span>
                            {tokenOut}
                            <ChevronDown size={14} className="text-zinc-400" />
                        </button>
                    </div>
                    <div className="flex justify-between mt-2 text-xs">
                        <span className="text-zinc-500 font-mono">~$3,500.25</span>
                        <span className="text-emerald-500 font-medium flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                            Best price
                        </span>
                    </div>
                </div>
            </div>

            <div className="space-y-3">
                {/* Info */}
                <div className="px-1 py-1 text-xs text-zinc-500 flex justify-between items-center font-medium font-mono">
                    <button className="flex items-center gap-1 hover:text-zinc-300 transition-colors">
                        <Info size={12} />
                        <span>1 ETH = 3,500.25 USDC</span>
                    </button>
                    <span className="flex items-center gap-1 text-zinc-500 font-mono">
                        <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full"></span>
                        $4.25 network fee
                    </span>
                </div>

                <NeuralButton variant="primary" size="lg" className="w-full py-6 text-lg font-semibold shadow-xl shadow-zinc-900/20">
                    Review Swap
                </NeuralButton>
            </div>
        </motion.div>
    );
};
