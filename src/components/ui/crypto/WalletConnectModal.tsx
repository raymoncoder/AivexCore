"use client";

import React, { useState } from "react";
import { Copy, Check, Menu, X, Wallet, ChevronRight, Link2, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { NeuralButton } from "@/components/ui/core/NeuralButton";
import { NeuralBadge } from "@/components/ui/core/NeuralBadge";
import { NeuralInput } from "@/components/ui/core/NeuralInput";

interface WalletOption {
    id: string;
    name: string;
    icon: React.ReactNode;
    color: string;
}

const WALLETS: WalletOption[] = [
    { id: "metamask", name: "MetaMask", icon: <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-500 font-bold">M</div>, color: "orange" },
    { id: "phantom", name: "Phantom", icon: <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-500 font-bold">P</div>, color: "purple" },
    { id: "walletconnect", name: "WalletConnect", icon: <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500 font-bold">W</div>, color: "blue" }, // Use actual logos in prod
    { id: "coinbase", name: "Coinbase Wallet", icon: <div className="w-8 h-8 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-600 font-bold">C</div>, color: "blue" }
];

interface WalletConnectModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConnect?: (walletId: string) => void;
}

export const WalletConnectModal = ({ isOpen, onClose, onConnect }: WalletConnectModalProps) => {
    const [view, setView] = useState<"list" | "qr">("list");
    const [selectedWallet, setSelectedWallet] = useState<WalletOption | null>(null);

    const handleSelect = (wallet: WalletOption) => {
        setSelectedWallet(wallet);
        if (wallet.id === "walletconnect") {
            setView("qr");
        } else {
            // Simulate connection delay
            setTimeout(() => {
                onConnect?.(wallet.id);
                onClose();
            }, 1000);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    >
                        {/* Modal */}
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
                        >
                            <div className="flex items-center justify-between p-5 border-b border-zinc-900">
                                <h2 className="text-lg font-bold text-zinc-100 font-sans">Connect Wallet</h2>
                                <button onClick={onClose} className="p-1 rounded-full hover:bg-zinc-900 text-zinc-500 hover:text-zinc-300 transition-colors">
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-5 scrollbar-thin scrollbar-thumb-zinc-800">
                                {view === "list" ? (
                                    <div className="space-y-3">
                                        {WALLETS.map((wallet) => (
                                            <button
                                                key={wallet.id}
                                                onClick={() => handleSelect(wallet)}
                                                className="w-full flex items-center justify-between p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/50 hover:bg-zinc-900 hover:border-zinc-700 transition-all group"
                                            >
                                                <div className="flex items-center gap-4">
                                                    {wallet.icon}
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-semibold text-zinc-300 group-hover:text-zinc-100 font-sans">{wallet.name}</span>
                                                        {wallet.id === "metamask" && <NeuralBadge status="warning" className="text-[10px] py-0.5 px-1.5 h-auto">Popular</NeuralBadge>}
                                                    </div>
                                                </div>
                                                <div className="text-zinc-600 group-hover:text-emerald-500 transition-colors">
                                                    <ChevronRight size={18} />
                                                </div>
                                            </button>
                                        ))}

                                        <div className="pt-4 border-t border-zinc-900 mt-4">
                                            <p className="text-xs text-zinc-500 text-center">
                                                By connecting a wallet, you agree to NeuralUI's <a href="#" className="text-emerald-500 hover:underline">Terms of Service</a>
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center text-center space-y-6">
                                        <div className="w-48 h-48 bg-white p-2 rounded-xl relative overflow-hidden">
                                            {/* Placeholder QR */}
                                            <div className="w-full h-full bg-zinc-900 opacity-20" style={{ backgroundImage: "radial-gradient(#000 1px, transparent 1px)", backgroundSize: "10px 10px" }} />
                                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                                <span className="text-zinc-950 font-mono text-xs font-bold">QR Code</span>
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-zinc-100 mb-1">Scan with your phone</h3>
                                            <p className="text-sm text-zinc-500">Open your wallet app and scan the code to connect.</p>
                                        </div>
                                        <NeuralButton variant="ghost" onClick={() => setView("list")}>
                                            Back to Wallets
                                        </NeuralButton>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
