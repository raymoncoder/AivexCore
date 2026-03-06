"use client";

import React, { useState } from "react";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isSameDay, isToday } from "date-fns";

interface AivexDatePickerProps {
    selected?: Date;
    onSelect?: (date: Date) => void;
    className?: string;
    label?: string;
    variant?: "default" | "glass" | "neon";
}

export const AivexDatePicker = ({
    selected,
    onSelect,
    className,
    label,
    variant = "default"
}: AivexDatePickerProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [internalSelected, setInternalSelected] = useState(selected || new Date());

    const days = eachDayOfInterval({
        start: startOfWeek(startOfMonth(currentMonth)),
        end: endOfWeek(endOfMonth(currentMonth)),
    });

    const handleDateSelect = (date: Date) => {
        setInternalSelected(date);
        if (onSelect) onSelect(date);
        setIsOpen(false);
    };

    const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
    const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

    const variantStyles = {
        default: "bg-zinc-900/50 border-zinc-800/50 hover:border-zinc-700/50",
        glass: "bg-white/5 border-white/10 backdrop-blur-xl hover:bg-white/10",
        neon: "bg-emerald-500/5 border-emerald-500/20 hover:border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.05)]"
    };

    return (
        <div className={cn("relative w-full min-w-[240px] space-y-2", className)}>
            {label && (
                <label className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest block ml-1">
                    {label}
                </label>
            )}

            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "w-full flex items-center gap-3 px-4 py-2.5 rounded-xl border transition-all duration-300 text-sm font-sans text-zinc-300",
                    variantStyles[variant],
                    isOpen && "border-emerald-500/50 bg-zinc-800/80"
                )}
            >
                <CalendarIcon size={16} className={cn("transition-colors", isOpen ? "text-emerald-400" : "text-zinc-500")} />
                <span className="flex-1 text-left font-mono">
                    {format(internalSelected, "MMM dd, yyyy")}
                </span>
                <Clock size={14} className="text-zinc-600" />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute z-50 mt-2 p-4 rounded-2xl bg-zinc-950 border border-zinc-800 shadow-2xl min-w-[280px]"
                    >
                        {/* Calendar Header */}
                        <div className="flex items-center justify-between mb-4">
                            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-sans">
                                {format(currentMonth, "MMMM yyyy")}
                            </h4>
                            <div className="flex gap-1">
                                <button onClick={prevMonth} className="p-1 hover:bg-zinc-900 rounded-lg text-zinc-500 hover:text-white transition-colors">
                                    <ChevronLeft size={16} />
                                </button>
                                <button onClick={nextMonth} className="p-1 hover:bg-zinc-900 rounded-lg text-zinc-500 hover:text-white transition-colors">
                                    <ChevronRight size={16} />
                                </button>
                            </div>
                        </div>

                        {/* Grid */}
                        <div className="grid grid-cols-7 gap-1 mb-2">
                            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
                                <div key={d} className="text-[11px] font-mono text-zinc-600 text-center py-1 font-bold">
                                    {d}
                                </div>
                            ))}
                            {days.map((day: Date, i: number) => (
                                <button
                                    key={i}
                                    onClick={() => handleDateSelect(day)}
                                    className={cn(
                                        "relative h-8 w-8 rounded-lg text-xs font-mono flex items-center justify-center transition-all duration-200",
                                        !isSameMonth(day, currentMonth) && "opacity-20",
                                        isSameDay(day, internalSelected)
                                            ? "bg-emerald-500 text-black font-bold shadow-[0_0_15px_rgba(16,185,129,0.4)]"
                                            : "text-zinc-400 hover:bg-zinc-800 hover:text-white",
                                        isToday(day) && !isSameDay(day, internalSelected) && "text-emerald-500 border border-emerald-500/20"
                                    )}
                                >
                                    {format(day, "d")}
                                    {isToday(day) && (
                                        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0.5 h-0.5 rounded-full bg-emerald-500" />
                                    )}
                                </button>
                            ))}
                        </div>

                        <div className="mt-4 pt-4 border-t border-zinc-900 flex justify-between items-center px-1">
                            <button
                                onClick={() => handleDateSelect(new Date())}
                                className="text-[11px] font-mono text-emerald-500 hover:text-emerald-400 transition-colors uppercase tracking-widest"
                            >
                                Go to Today
                            </button>
                            <span className="text-[10px] font-mono text-zinc-600">SYS_TIME: SYNCED</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
