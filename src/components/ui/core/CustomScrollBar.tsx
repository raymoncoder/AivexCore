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
    const [isDragging, setIsDragging] = useState(false);
    const [scrollRatio, setScrollRatio] = useState(0);
    const [thumbSize, setThumbSize] = useState(20);

    // Refs for drag logic to avoid closure staleness
    const dragStart = useRef({ x: 0, y: 0, scrollLeft: 0, scrollTop: 0 });
    const thumbSizeRef = useRef(20);

    useEffect(() => {
        let timeout: NodeJS.Timeout;

        const updateScrollValues = () => {
            if (scrollRef.current) {
                const { scrollTop, scrollHeight, clientHeight, scrollLeft, scrollWidth, clientWidth } = scrollRef.current;

                if (orientation === "vertical") {
                    const scrollableHeight = scrollHeight - clientHeight;
                    const ratio = scrollableHeight > 0 ? scrollTop / scrollableHeight : 0;
                    const size = scrollHeight > 0 ? (clientHeight / scrollHeight) * 100 : 20;
                    const finalSize = Math.max(10, size);

                    setScrollRatio(ratio);
                    setThumbSize(finalSize);
                    thumbSizeRef.current = finalSize;
                } else {
                    const scrollableWidth = scrollWidth - clientWidth;
                    const ratio = scrollableWidth > 0 ? scrollLeft / scrollableWidth : 0;
                    const size = scrollWidth > 0 ? (clientWidth / scrollWidth) * 100 : 20;
                    const finalSize = Math.max(10, size);

                    setScrollRatio(ratio);
                    setThumbSize(finalSize);
                    thumbSizeRef.current = finalSize;
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

    // Drag Logic
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!isDragging || !scrollRef.current) return;
            e.preventDefault();

            const { clientHeight, scrollHeight, clientWidth, scrollWidth } = scrollRef.current;

            if (isVertical) {
                const trackHeight = clientHeight;
                const thumbHeightPx = (thumbSizeRef.current / 100) * trackHeight;
                const availableScrollTrack = trackHeight - thumbHeightPx;
                const availableContentScroll = scrollHeight - clientHeight;

                if (availableScrollTrack > 0 && availableContentScroll > 0) {
                    const deltaY = e.clientY - dragStart.current.y;
                    const ratio = deltaY / availableScrollTrack;
                    const scrollDelta = ratio * availableContentScroll;
                    scrollRef.current.scrollTop = dragStart.current.scrollTop + scrollDelta;
                }
            } else {
                const trackWidth = clientWidth;
                const thumbWidthPx = (thumbSizeRef.current / 100) * trackWidth;
                const availableScrollTrack = trackWidth - thumbWidthPx;
                const availableContentScroll = scrollWidth - clientWidth;

                if (availableScrollTrack > 0 && availableContentScroll > 0) {
                    const deltaX = e.clientX - dragStart.current.x;
                    const ratio = deltaX / availableScrollTrack;
                    const scrollDelta = ratio * availableContentScroll;
                    scrollRef.current.scrollLeft = dragStart.current.scrollLeft + scrollDelta;
                }
            }
        };

        const handleMouseUp = () => {
            setIsDragging(false);
            document.body.style.userSelect = ""; // Restore selection
        };

        if (isDragging) {
            window.addEventListener("mousemove", handleMouseMove);
            window.addEventListener("mouseup", handleMouseUp);
            document.body.style.userSelect = "none"; // Disable selection while dragging
        }

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
            document.body.style.userSelect = "";
        };
    }, [isDragging, isVertical]);

    const handleThumbMouseDown = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (scrollRef.current) {
            setIsDragging(true);
            dragStart.current = {
                x: e.clientX,
                y: e.clientY,
                scrollTop: scrollRef.current.scrollTop,
                scrollLeft: scrollRef.current.scrollLeft
            };
        }
    };

    // Native wheel listener to support preventDefault() for blocking global scroll
    useEffect(() => {
        const element = scrollRef.current;
        if (!element || isVertical) return;

        const handleWheelNative = (e: WheelEvent) => {
            // If the element or its children are the target, we want to trap the scroll
            // Especially if primarily vertical movement which we convert to horizontal
            if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
                e.preventDefault();
                element.scrollLeft += e.deltaY;
            } else if (Math.abs(e.deltaX) > 0) {
                // Also trap horizontal movement to prevent back/forward navigation in some browsers
                e.preventDefault();
                element.scrollLeft += e.deltaX;
            }
        };

        // Add non-passive listener to allow preventDefault
        element.addEventListener('wheel', handleWheelNative, { passive: false });
        return () => element.removeEventListener('wheel', handleWheelNative);
    }, [isVertical]);

    return (
        <div
            className={cn(
                "relative group/scrollbar overflow-hidden w-full transition-all duration-300",
                "focus:outline-none focus:ring-2 focus:ring-emerald-500/40 rounded-xl",
                className
            )}
            tabIndex={0}
        >
            <div
                ref={scrollRef}
                className={cn(
                    "scrollbar-hide",
                    isVertical ? "overflow-y-auto overflow-x-hidden" : "overflow-x-auto overflow-y-hidden"
                )}
                style={{
                    maxHeight: isVertical ? (maxHeight || "100vh") : "auto",
                    maxWidth: !isVertical ? (maxWidth || "100%") : "auto",
                    // display: !isVertical ? "flex" : "block" // Removed to allow proper overflow
                }}
            >
                <div className={cn(
                    "min-w-full",
                    !isVertical && "flex flex-nowrap w-max" // Force horizontal layout and expansion
                )}>
                    {children}
                </div>
            </div>

            {/* Custom Scrollbar Track */}
            <div className={cn(
                "absolute rounded-full transition-opacity duration-300 pointer-events-none z-10",
                trackColor,
                (isScrolling || isDragging) ? "opacity-100" : "opacity-0 group-hover/scrollbar:opacity-30",
                isVertical
                    ? "top-1 right-1 w-1.5 bottom-1"
                    : "bottom-1 left-1 h-1.5 right-1"
            )}>
                {/* Thumb */}
                <div
                    className={cn(
                        "rounded-full transition-all duration-200 shadow-sm pointer-events-auto",
                        thumbColor,
                        thumbColor.includes("bg-") ? "" : "bg-zinc-600",
                        (isScrolling || isDragging) ? "opacity-100" : "opacity-0 group-hover/scrollbar:opacity-100",
                        isDragging ? "cursor-grabbing" : "cursor-grab"
                    )}
                    onMouseDown={handleThumbMouseDown}
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
