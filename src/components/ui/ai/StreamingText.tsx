"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface StreamingTextProps {
    children: string;
    speed?: number; // ms per char
    className?: string;
    cursor?: boolean;
    startDelay?: number;
    onComplete?: () => void;
}

export const StreamingText = ({
    children,
    speed = 30,
    className,
    cursor = true,
    startDelay = 0,
    onComplete
}: StreamingTextProps) => {
    const [displayedText, setDisplayedText] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [started, setStarted] = useState(false);

    useEffect(() => {
        setDisplayedText("");
        setStarted(false);
        setIsTyping(false);
    }, [children]);

    useEffect(() => {
        let timeout: NodeJS.Timeout;

        if (!started) {
            timeout = setTimeout(() => {
                setStarted(true);
                setIsTyping(true);
            }, startDelay);
        }

        return () => clearTimeout(timeout);
    }, [startDelay, started]);

    useEffect(() => {
        if (!started) return;

        let index = 0;
        const interval = setInterval(() => {
            if (index < children.length) {
                setDisplayedText((prev) => prev + children.charAt(index));
                index++;
            } else {
                setIsTyping(false);
                clearInterval(interval);
                onComplete?.();
            }
        }, speed);

        return () => clearInterval(interval);
    }, [children, speed, started, onComplete]);

    return (
        <span className={cn("font-mono text-zinc-100", className)}>
            {displayedText}
            {cursor && isTyping && (
                <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                    className="inline-block w-2.5 h-4 ml-0.5 bg-emerald-500 align-middle"
                />
            )}
        </span>
    );
};
