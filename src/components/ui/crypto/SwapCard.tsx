"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDownUp, Settings, ChevronDown, Info, Wallet, Search, X } from "lucide-react";
import { AivexButton } from "@/components/ui/core/AivexButton";
import { cn } from "@/lib/utils";
import { TokenETH, TokenUSDC, TokenUSDT, TokenBTC, TokenSOL } from "@web3icons/react";

type TokenData = {
    symbol: string;
    name: string;
    icon?: string;
    iconComponent?: React.ElementType;
    color?: string;
    balance: string;
    price: number;
};

const AVAILABLE_TOKENS: TokenData[] = [
    { symbol: "ETH", name: "Ethereum", iconComponent: TokenETH, balance: "2.45", price: 3425.60 },
    { symbol: "USDC", name: "USD Coin", iconComponent: TokenUSDC, balance: "150.00", price: 1.0 },
    { symbol: "USDT", name: "Tether", iconComponent: TokenUSDT, balance: "0.00", price: 1.0 },
    { symbol: "BTC", name: "Bitcoin", iconComponent: TokenBTC, balance: "0.15", price: 64230.0 },
    { symbol: "NRL", name: "Aivex", icon: "N", color: "bg-emerald-500 text-white", balance: "1450.00", price: 12.40 },
    { symbol: "SOL", name: "Solana", iconComponent: TokenSOL, balance: "45.2", price: 142.10 }
];

const TokenLogo = ({ token }: { token: TokenData }) => (
    token.iconComponent ? (
        <token.iconComponent className="w-5 h-5 shrink-0 rounded-full" />
    ) : (
        <span className={cn("w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0", token.color)}>
            {token.icon}
        </span>
    )
);

interface SwapCardProps {
    className?: string;
}

export const SwapCard = ({ className }: SwapCardProps = {}) => {
    const [amountIn, setAmountIn] = useState("1.0");
    const [tokenIn, setTokenIn] = useState(AVAILABLE_TOKENS[0]);
    const [tokenOut, setTokenOut] = useState(AVAILABLE_TOKENS[1]);
    const [selectingToken, setSelectingToken] = useState<'in' | 'out' | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    const exchangeRate = Math.max(0.00000001, tokenIn.price / tokenOut.price);
    const usdValue = parseFloat(amountIn || "0") * tokenIn.price;
    const amountOut = parseFloat(amountIn || "0") * exchangeRate;

    const handleSwap = () => {
        setTokenIn(tokenOut);
        setTokenOut(tokenIn);
        setAmountIn(amountOut ? amountOut.toFixed(4).replace(/\.?0+$/, '') : "");
    };

    const handleSelectToken = (token: typeof AVAILABLE_TOKENS[0]) => {
        if (selectingToken === 'in') {
            if (tokenOut.symbol === token.symbol) {
                handleSwap();
            } else {
                setTokenIn(token);
            }
        } else if (selectingToken === 'out') {
            if (tokenIn.symbol === token.symbol) {
                handleSwap();
            } else {
                setTokenOut(token);
            }
        }
        setSelectingToken(null);
        setSearchQuery("");
    };

    const formatCurrency = (val: number) => val.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const formatAmount = (val: number) => val.toLocaleString(undefined, { maximumFractionDigits: 6 });

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
                "w-full max-w-sm p-5 rounded-2xl bg-zinc-950/80 backdrop-blur-xl border border-zinc-800 shadow-2xl relative overflow-hidden ring-1 ring-zinc-800/50",
                className
            )}
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
                        <span className="flex items-center gap-1 text-zinc-400 hover:text-zinc-300 cursor-pointer transition-colors font-mono" onClick={() => setAmountIn(tokenIn.balance)}><Wallet size={12} /> {tokenIn.balance} {tokenIn.symbol}</span>
                    </div>
                    <div className="flex justify-between items-center gap-4">
                        <input
                            type="number"
                            value={amountIn}
                            onChange={(e) => setAmountIn(e.target.value)}
                            className="w-full bg-transparent text-3xl font-mono font-semibold text-zinc-100 placeholder:text-zinc-700 focus:outline-none overflow-hidden text-ellipsis"
                            placeholder="0.0"
                        />
                        <button
                            onClick={() => setSelectingToken('in')}
                            className="shrink-0 flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 px-3 py-1.5 rounded-full font-medium transition-colors border border-zinc-700 text-sm shadow-sm hover:shadow text-zinc-100"
                        >
                            <TokenLogo token={tokenIn} />
                            {tokenIn.symbol}
                            <ChevronDown size={14} className="text-zinc-400" />
                        </button>
                    </div>
                    <div className="text-xs font-mono text-zinc-500 mt-2">~${formatCurrency(usdValue)}</div>
                </div>
            </div>

            {/* Swap Button */}
            <div className="relative h-4 flex items-center justify-center -my-2 z-20">
                <div className="absolute inset-0 flex items-center">
                    {/* Gap filler */}
                </div>
                <button
                    onClick={handleSwap}
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
                        <span className="flex items-center gap-1 text-zinc-400 hover:text-zinc-300 cursor-pointer transition-colors font-mono"><Wallet size={12} /> {tokenOut.balance} {tokenOut.symbol}</span>
                    </div>
                    <div className="flex justify-between items-center gap-4">
                        <div className="w-full bg-transparent text-3xl font-mono font-semibold text-zinc-100 overflow-hidden text-ellipsis">
                            {formatAmount(amountOut)}
                        </div>
                        <button
                            onClick={() => setSelectingToken('out')}
                            className="shrink-0 flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 px-3 py-1.5 rounded-full font-medium transition-colors border border-zinc-700 text-sm shadow-sm hover:shadow text-zinc-100"
                        >
                            <TokenLogo token={tokenOut} />
                            {tokenOut.symbol}
                            <ChevronDown size={14} className="text-zinc-400" />
                        </button>
                    </div>
                    <div className="flex justify-between mt-2 text-xs">
                        <span className="text-zinc-500 font-mono">~${formatCurrency(usdValue)}</span>
                        <span className="text-emerald-500 font-medium flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                            Best price
                        </span>
                    </div>
                </div>
            </div>

            <div className="space-y-3 relative z-10">
                {/* Info */}
                <div className="px-1 py-1 text-xs text-zinc-500 flex justify-between items-center font-medium font-mono">
                    <button className="flex items-center gap-1 hover:text-zinc-300 transition-colors max-w-[65%] truncate">
                        <Info size={12} className="shrink-0" />
                        <span className="truncate">1 {tokenIn.symbol} = {formatAmount(exchangeRate)} {tokenOut.symbol}</span>
                    </button>
                    <span className="flex items-center gap-1 text-zinc-500 font-mono shrink-0">
                        <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full"></span>
                        $4.25 network fee
                    </span>
                </div>

                <AivexButton variant="primary" size="lg" className="w-full py-6 text-lg font-semibold shadow-xl shadow-zinc-900/20">
                    Review Swap
                </AivexButton>
            </div>

            {/* Token Selection Overlay */}
            <AnimatePresence>
                {selectingToken && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute inset-0 z-50 bg-[#080808]/95 backdrop-blur-3xl flex flex-col pt-2"
                    >
                        <div className="px-5 py-4 flex items-center justify-between">
                            <h3 className="font-semibold text-lg text-white">Select a token</h3>
                            <button onClick={() => setSelectingToken(null)} className="p-2 -mr-2 bg-zinc-900 rounded-full text-zinc-400 hover:text-white transition-colors">
                                <X size={16} />
                            </button>
                        </div>
                        <div className="px-5 pb-4">
                            <div className="relative flex items-center">
                                <Search size={16} className="absolute left-3 text-zinc-500" />
                                <input
                                    type="text"
                                    placeholder="Search by name or symbol"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-zinc-900 border border-zinc-800 focus:border-emerald-500/50 rounded-2xl py-3 pl-10 pr-4 text-sm text-zinc-100 placeholder:text-zinc-600 outline-none transition-colors"
                                />
                            </div>
                        </div>
                        <div className="flex-1 overflow-y-auto px-3 pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                            <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-bold px-2 mb-2">Popular tokens</div>
                            {AVAILABLE_TOKENS.filter(t => t.name.toLowerCase().includes(searchQuery.toLowerCase()) || t.symbol.toLowerCase().includes(searchQuery.toLowerCase())).map((token) => (
                                <button
                                    key={token.symbol}
                                    onClick={() => handleSelectToken(token)}
                                    className={cn(
                                        "w-full flex items-center justify-between p-3 rounded-2xl transition-colors text-left",
                                        ((selectingToken === 'in' && tokenIn.symbol === token.symbol) ||
                                            (selectingToken === 'out' && tokenOut.symbol === token.symbol))
                                            ? "bg-emerald-500/10 border border-emerald-500/20"
                                            : "hover:bg-white/[0.04] border border-transparent"
                                    )}
                                >
                                    <div className="flex items-center gap-3">
                                        <TokenLogo token={token} />
                                        <div>
                                            <div className="font-bold text-zinc-100 font-sans">{token.symbol}</div>
                                            <div className="text-xs text-zinc-500">{token.name}</div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-mono text-sm font-medium text-zinc-200">{token.balance}</div>
                                        <div className="text-xs text-zinc-500 font-mono">${formatCurrency(parseFloat(token.balance) * token.price)}</div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};
