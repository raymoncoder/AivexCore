"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface CustomScrollBarProps {
    children: React.ReactNode;
    className?: string;
    maxHeight?: string;
    maxWidth?: string;
    thumbColor?: string;
    trackColor?: string;
    orientation?: "vertical" | "horizontal";
}

export const CustomScrollBar = ({
    children,
    className,
    maxHeight,
    maxWidth,
    thumbColor = "bg-zinc-700",
    trackColor = "bg-zinc-900/40",
    orientation = "vertical"
}: CustomScrollBarProps) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isScrolling, setIsScrolling] = useState(false);
    const [scrollRatio, setScrollRatio] = useState(0); // Position ratio (0 to 1)
    const [thumbSize, setThumbSize] = useState(20); // Thumb size in percentage

    useEffect(() => {
        let timeout: NodeJS.Timeout;

        const updateScrollValues = () => {
            if (scrollRef.current) {
                const { scrollTop, scrollHeight, clientHeight, scrollLeft, scrollWidth, clientWidth } = scrollRef.current;

                if (orientation === "vertical") {
                    const scrollableHeight = scrollHeight - clientHeight;
                    const ratio = scrollableHeight > 0 ? scrollTop / scrollableHeight : 0;
                    const size = scrollHeight > 0 ? (clientHeight / scrollHeight) * 100 : 20;
                    setScrollRatio(ratio);
                    setThumbSize(Math.max(10, size)); // Minimum 10%
                } else {
                    const scrollableWidth = scrollWidth - clientWidth;
                    const ratio = scrollableWidth > 0 ? scrollLeft / scrollableWidth : 0;
                    const size = scrollWidth > 0 ? (clientWidth / scrollWidth) * 100 : 20;
                    setScrollRatio(ratio);
                    setThumbSize(Math.max(10, size)); // Minimum 10%
                }
            }
        };

        const handleScroll = () => {
            updateScrollValues();
            setIsScrolling(true);
            clearTimeout(timeout);
            timeout = setTimeout(() => setIsScrolling(false), 1000);
        };

        const scrollElement = scrollRef.current;
        if (scrollElement) {
            updateScrollValues(); // Initial check
            scrollElement.addEventListener("scroll", handleScroll);

            // Re-check on window resize or content change
            window.addEventListener("resize", updateScrollValues);

            const observer = new ResizeObserver(updateScrollValues);
            observer.observe(scrollElement);
            if (scrollElement.firstElementChild) observer.observe(scrollElement.firstElementChild);

            return () => {
                scrollElement.removeEventListener("scroll", handleScroll);
                window.removeEventListener("resize", updateScrollValues);
                observer.disconnect();
                clearTimeout(timeout);
            };
        }
    }, [orientation]);

    const isVertical = orientation === "vertical";

    return (
        <div className={cn("relative group/scrollbar overflow-hidden w-full", className)}>
            <div
                ref={scrollRef}
                className={cn(
                    "scrollbar-hide",
                    isVertical ? "overflow-y-auto overflow-x-hidden" : "overflow-x-auto overflow-y-hidden"
                )}
                style={{
                    maxHeight: isVertical ? (maxHeight || "100vh") : "auto",
                    maxWidth: !isVertical ? (maxWidth || "100%") : "auto",
                    display: !isVertical ? "flex" : "block" // Ensure flex for horizontal if content is flex
                }}
            >
                <div className={cn(
                    "min-w-full",
                    !isVertical && "flex flex-nowrap" // Force horizontal layout if horizontal
                )}>
                    {children}
                </div>
            </div>

            {/* Custom Scrollbar Track */}
            <div className={cn(
                "absolute rounded-full transition-opacity duration-300 pointer-events-none z-10",
                trackColor,
                (isScrolling || true) ? "opacity-100" : "opacity-0", // Keep visible for debugging or better UX
                isVertical
                    ? "top-1 right-1 w-1.5 bottom-1"
                    : "bottom-1 left-1 h-1.5 right-1"
            )}
                style={{
                    opacity: isScrolling ? 1 : 0.3
                }}>
                {/* Thumb */}
                <div
                    className={cn(
                        "rounded-full transition-all duration-200 shadow-sm",
                        thumbColor,
                        isScrolling ? "opacity-100" : "opacity-70"
                    )}
                    style={{
                        height: isVertical ? `${thumbSize}%` : "100%",
                        width: isVertical ? "100%" : `${thumbSize}%`,
                        transform: isVertical
                            ? `translateY(${scrollRatio * (100 / (thumbSize / 100) - 100)}%)`
                            : `translateX(${scrollRatio * (100 / (thumbSize / 100) - 100)}%)`,
                    }}
                />
            </div>
        </div>
    );
};
