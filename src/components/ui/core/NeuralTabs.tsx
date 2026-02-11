"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import React, { useState } from "react";

interface Tab {
    id: string;
    label: string;
}

interface NeuralTabsProps {
    tabs?: Tab[];
    activeTab?: string; // Controlled
    onTabChange?: (tabId: string) => void;
    defaultTab?: string; // Uncontrolled
    className?: string;
    children?: React.ReactNode;
    variant?: "segmented" | "pill" | "underline" | "glass";
}

// Simple internal hook for controlled/uncontrolled behavior
function useControlled(controlled: any, defaultProp: any) {
    const [internal, setInternal] = useState(defaultProp);
    const isControlled = controlled !== undefined;
    return [isControlled ? controlled : internal, isControlled ? (val: any) => { } : setInternal];
}

export function NeuralTabs({
    tabs,
    activeTab: activeTabProp,
    onTabChange,
    defaultTab,
    className,
    children,
    variant = "segmented"
}: NeuralTabsProps) {
    const [internalActiveTab, setInternalActiveTab] = useControlled(activeTabProp, defaultTab || (tabs?.[0]?.id));

    const handleTabClick = (id: string) => {
        if (activeTabProp === undefined) {
            setInternalActiveTab(id);
        }
        onTabChange?.(id);
    };

    const activeTabId = activeTabProp ?? internalActiveTab;

    const variants = {
        segmented: "flex space-x-1 rounded-xl bg-zinc-900/50 p-1 border border-zinc-800/50 backdrop-blur-sm w-fit",
        pill: "flex space-x-1 w-fit",
        underline: "flex space-x-6 border-b border-zinc-800 w-full",
        glass: "flex space-x-1 rounded-full bg-white/5 p-1 border border-white/10 backdrop-blur-md w-fit"
    };

    return (
        <div className={cn("space-y-4", className)}>
            {/* Tabs List */}
            {tabs && (
                <div className={variants[variant]}>
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => handleTabClick(tab.id)}
                            className={cn(
                                "relative transition-all duration-300 focus-visible:outline-none",
                                variant === "segmented" && "rounded-lg px-3 py-1.5 text-sm font-medium",
                                variant === "pill" && "rounded-full px-4 py-1.5 text-sm font-medium",
                                variant === "underline" && "px-1 py-3 text-sm font-medium",
                                variant === "glass" && "rounded-full px-4 py-2 text-sm font-medium",
                                {
                                    "text-zinc-400 hover:text-zinc-200": activeTabId !== tab.id,
                                    "text-zinc-50": activeTabId === tab.id,
                                }
                            )}
                            style={{ WebkitTapHighlightColor: "transparent" }}
                        >
                            {activeTabId === tab.id && (variant === "segmented" || variant === "glass") && (
                                <motion.span
                                    layoutId={`active-${variant}`}
                                    className={cn(
                                        "absolute inset-0 z-10",
                                        variant === "segmented" ? "bg-zinc-800 border border-zinc-700 shadow-lg shadow-black/20" : "bg-white/10 border border-white/20 shadow-xl"
                                    )}
                                    style={{ borderRadius: variant === "segmented" ? 8 : 9999 }}
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}

                            {activeTabId === tab.id && variant === "pill" && (
                                <motion.span
                                    layoutId="active-pill"
                                    className="absolute inset-0 z-10 bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                                    style={{ borderRadius: 9999 }}
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}

                            {activeTabId === tab.id && variant === "underline" && (
                                <motion.span
                                    layoutId="active-underline"
                                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500 z-10"
                                    transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                                />
                            )}

                            <span className={cn(
                                "relative z-20 font-sans transition-colors duration-300",
                                activeTabId === tab.id && variant === "pill" && "text-black font-bold"
                            )}>
                                {tab.label}
                            </span>
                        </button>
                    ))}
                </div>
            )}

            {/* Tabs Content */}
            {children && (
                <div className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                    {children}
                </div>
            )}
        </div>
    );
}

// Helper for content, very basic
export function NeuralTabsContent({ value, activeValue, children, className }: { value: string, activeValue: string, children: React.ReactNode, className?: string }) {
    if (value !== activeValue) return null;
    return (
        <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
