"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Info } from "lucide-react";

interface AivexTooltipProps {
    children: React.ReactNode;
    content: string | React.ReactNode;
    position?: "top" | "bottom" | "left" | "right";
    delay?: number;
    className?: string; // Content class name
}

export const AivexTooltip = ({ children, content, position = "top", delay = 0.5, className }: AivexTooltipProps) => {
    const [isVisible, setIsVisible] = React.useState(false);
    const timeoutRef = React.useRef<NodeJS.Timeout>(null);

    const handleMouseEnter = () => {
        timeoutRef.current = setTimeout(() => {
            setIsVisible(true);
        }, delay * 1000);
    };

    const handleMouseLeave = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setIsVisible(false);
    };

    return (
        <div className="relative inline-block cursor-help" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            {children}
            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 5 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 5 }}
                        className={cn(
                            "absolute z-50 px-3 py-1.5 bg-zinc-900 border border-zinc-700 rounded-lg text-xs font-sans text-zinc-100 shadow-xl backdrop-blur-md whitespace-nowrap min-w-[max-content]",
                            {
                                "bottom-full left-1/2 -translate-x-1/2 mb-2": position === "top",
                                "top-full left-1/2 -translate-x-1/2 mt-2": position === "bottom",
                                "right-full top-1/2 -translate-y-1/2 mr-2": position === "left",
                                "left-full top-1/2 -translate-y-1/2 ml-2": position === "right",
                            },
                            className
                        )}
                    >
                        {content}
                        {/* Triangle Arrow */}
                        <div
                            className={cn(
                                "absolute w-2 h-2 bg-zinc-900 border-zinc-700 transform rotate-45",
                                {
                                    "bottom-[-5px] left-1/2 -translate-x-1/2 border-b border-r": position === "top",
                                    "top-[-5px] left-1/2 -translate-x-1/2 border-t border-l": position === "bottom",
                                    "right-[-5px] top-1/2 -translate-y-1/2 border-t border-r": position === "left",
                                    "left-[-5px] top-1/2 -translate-y-1/2 border-b border-l": position === "right",
                                }
                            )}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
