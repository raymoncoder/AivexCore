"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, AlertTriangle, Info, AlertOctagon } from "lucide-react";
import { cn } from "@/lib/utils";

type ToastType = "success" | "error" | "warning" | "info" | "neural";

interface Toast {
    id: string;
    message: string;
    type: ToastType;
    description?: string;
}

interface ToastContextType {
    toast: (message: string, options?: { type?: ToastType; description?: string; duration?: number }) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const NeuralToastProvider = ({ children }: { children: React.ReactNode }) => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const toast = useCallback((message: string, options?: { type?: ToastType; description?: string; duration?: number }) => {
        const id = Math.random().toString(36).substring(2, 9);
        const { type = "neural", description, duration = 5000 } = options || {};

        setToasts((prev) => [...prev, { id, message, type, description }]);

        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, duration);
    }, []);

    const removeToast = (id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    };

    return (
        <ToastContext.Provider value={{ toast }}>
            {children}
            <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 min-w-[320px] max-w-[420px]">
                <AnimatePresence mode="popLayout">
                    {toasts.map((t) => (
                        <motion.div
                            key={t.id}
                            layout
                            initial={{ opacity: 0, x: 50, scale: 0.9 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                            className={cn(
                                "group relative p-4 rounded-2xl border bg-zinc-950/80 backdrop-blur-xl shadow-2xl overflow-hidden",
                                t.type === "success" && "border-emerald-500/20",
                                t.type === "error" && "border-rose-500/20",
                                t.type === "warning" && "border-amber-500/20",
                                t.type === "info" && "border-blue-500/20",
                                t.type === "neural" && "border-zinc-800"
                            )}
                        >
                            {/* Accent Glow */}
                            <div className={cn(
                                "absolute top-0 left-0 w-1 h-full",
                                t.type === "success" && "bg-emerald-500",
                                t.type === "error" && "bg-rose-500",
                                t.type === "warning" && "bg-amber-500",
                                t.type === "info" && "bg-blue-500",
                                t.type === "neural" && "bg-white"
                            )} />

                            <div className="flex gap-4">
                                <div className={cn(
                                    "mt-0.5 shrink-0",
                                    t.type === "success" && "text-emerald-500",
                                    t.type === "error" && "text-rose-500",
                                    t.type === "warning" && "text-amber-500",
                                    t.type === "info" && "text-blue-500",
                                    t.type === "neural" && "text-zinc-400"
                                )}>
                                    {t.type === "success" && <CheckCircle size={18} />}
                                    {t.type === "error" && <AlertOctagon size={18} />}
                                    {t.type === "warning" && <AlertTriangle size={18} />}
                                    {t.type === "info" && <Info size={18} />}
                                    {t.type === "neural" && <div className="w-4 h-4 rounded-full border-2 border-current animate-pulse" />}
                                </div>

                                <div className="flex flex-col gap-1 pr-6">
                                    <h5 className="text-sm font-bold text-white leading-tight">{t.message}</h5>
                                    {t.description && (
                                        <p className="text-xs text-zinc-500 font-sans leading-normal">
                                            {t.description}
                                        </p>
                                    )}
                                </div>

                                <button
                                    onClick={() => removeToast(t.id)}
                                    className="absolute top-4 right-4 text-zinc-600 hover:text-white transition-colors"
                                >
                                    <X size={14} />
                                </button>
                            </div>

                            {/* Decorative background glow */}
                            <div className={cn(
                                "absolute -right-12 -top-12 w-24 h-24 blur-3xl opacity-10 pointer-events-none",
                                t.type === "success" && "bg-emerald-500",
                                t.type === "error" && "bg-rose-500",
                                t.type === "neural" && "bg-white"
                            )} />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </ToastContext.Provider>
    );
};

export const useNeuralToast = () => {
    const context = useContext(ToastContext);
    if (!context) throw new Error("useNeuralToast must be used within NeuralToastProvider");
    return context;
};
