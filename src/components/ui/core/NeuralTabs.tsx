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
}

// Simple internal hook for controlled/uncontrolled behavior
function useControlled(controlled: any, defaultProp: any) {
    const [internal, setInternal] = useState(defaultProp);
    const isControlled = controlled !== undefined;
    return [isControlled ? controlled : internal, isControlled ? () => { } : setInternal];
}

export function NeuralTabs({ tabs, activeTab: activeTabProp, onTabChange, defaultTab, className, children }: NeuralTabsProps) {
    const [internalActiveTab, setInternalActiveTab] = useControlled(activeTabProp, defaultTab || (tabs?.[0]?.id));

    const handleTabClick = (id: string) => {
        if (activeTabProp === undefined) {
            setInternalActiveTab(id);
        }
        onTabChange?.(id);
    };

    // If children are passed (content), filter to show only active
    // This is a simplified "Tabs" for demo. Usually huge libs separate List vs Content.
    const activeTabId = activeTabProp ?? internalActiveTab;

    return (
        <div className={cn("space-y-4", className)}>
            {/* Tabs List */}
            {tabs && (
                <div className="flex space-x-1 rounded-xl bg-zinc-900/50 p-1 border border-zinc-800/50 backdrop-blur-sm w-fit">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => handleTabClick(tab.id)}
                            className={cn(
                                "relative rounded-lg px-3 py-1.5 text-sm font-medium outline-sky-400 transition focus-visible:outline-2",
                                {
                                    "text-zinc-400 hover:text-zinc-200": activeTabId !== tab.id,
                                    "text-zinc-50": activeTabId === tab.id,
                                }
                            )}
                            style={{
                                WebkitTapHighlightColor: "transparent",
                            }}
                        >
                            {activeTabId === tab.id && (
                                <motion.span
                                    layoutId="bubble"
                                    className="absolute inset-0 z-10 bg-zinc-800 shadow-sm border border-zinc-700 mixture-blend-overlay"
                                    style={{ borderRadius: 8 }}
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                            <span className="relative z-20 font-onest">{tab.label}</span>
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
