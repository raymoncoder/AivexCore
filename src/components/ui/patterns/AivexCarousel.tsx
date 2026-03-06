"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface AivexCarouselProps {
    items: React.ReactNode[];
    className?: string;
}

export const AivexCarousel = ({
    items,
    className
}: AivexCarouselProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const next = () => {
        setCurrentIndex((prev) => (prev + 1) % items.length);
    };

    const prev = () => {
        setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
    };

    return (
        <div className={cn("relative group w-full", className)}>
            <div className="overflow-hidden rounded-[2.5rem] bg-zinc-950 border border-zinc-900 shadow-2xl">
                <div className="relative h-full min-h-[400px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, scale: 0.95, x: 20 }}
                            animate={{ opacity: 1, scale: 1, x: 0 }}
                            exit={{ opacity: 0, scale: 0.95, x: -20 }}
                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            className="absolute inset-0 flex items-center justify-center p-8 md:p-12"
                        >
                            {items[currentIndex]}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* Controls */}
            <div className="absolute inset-y-0 -left-6 flex items-center">
                <button
                    onClick={prev}
                    className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-800 text-white flex items-center justify-center shadow-xl hover:bg-zinc-800 hover:scale-110 transition-all opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0"
                >
                    <ChevronLeft size={20} />
                </button>
            </div>

            <div className="absolute inset-y-0 -right-6 flex items-center">
                <button
                    onClick={next}
                    className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-800 text-white flex items-center justify-center shadow-xl hover:bg-zinc-800 hover:scale-110 transition-all opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0"
                >
                    <ChevronRight size={20} />
                </button>
            </div>

            {/* Pagination */}
            <div className="flex justify-center gap-2 mt-8">
                {items.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrentIndex(i)}
                        className={cn(
                            "h-1 rounded-full transition-all duration-500",
                            i === currentIndex ? "w-8 bg-emerald-500" : "w-4 bg-zinc-800 hover:bg-zinc-700"
                        )}
                    />
                ))}
            </div>
        </div>
    );
};
