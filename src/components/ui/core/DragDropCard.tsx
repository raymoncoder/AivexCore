"use client";

import React, { useState } from "react";
import { GripVertical, Layers, Settings, Trash2, Cpu, Globe, Zap } from "lucide-react";
import { motion, Reorder, useDragControls, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export interface DragItem {
    id: string;
    title: string;
    status: string;
    type: "node" | "module" | "bridge";
    icon: typeof Cpu;
}

interface DragDropCardProps {
    item: DragItem;
    onRemove?: (id: string) => void;
    className?: string;
}

export const DragDropCard = ({ item, onRemove, className }: DragDropCardProps) => {
    const controls = useDragControls();
    const Icon = item.icon;

    return (
        <Reorder.Item
            value={item}
            id={item.id}
            dragListener={false}
            dragControls={controls}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            whileDrag={{
                scale: 1.02,
                boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
                borderColor: "rgba(16,185,129,0.3)"
            }}
            className={cn(
                "relative flex items-center gap-4 p-4 rounded-2xl bg-zinc-950 border border-zinc-900 group transition-all duration-300 select-none",
                className
            )}
        >
            {/* Background Glow on Hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            {/* Drag Handle */}
            <div
                onPointerDown={(e) => controls.start(e)}
                style={{ touchAction: "none" }}
                className="cursor-grab active:cursor-grabbing p-1 text-zinc-700 hover:text-zinc-500 transition-colors"
            >
                <GripVertical size={18} />
            </div>

            {/* Icon Node */}
            <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-emerald-400 group-hover:border-emerald-500/30 transition-all">
                <Icon size={20} />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-white truncate font-sans tracking-tight uppercase">{item.title}</h4>
                <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-zinc-900 text-[11px] font-mono text-zinc-500 uppercase">
                        <Layers size={8} /> {item.type}
                    </div>
                    <span className="text-[11px] font-mono text-emerald-500/80 font-bold uppercase tracking-widest">{item.status}</span>
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity pr-1">
                <button className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-500 hover:text-white transition-colors">
                    <Settings size={14} />
                </button>
                {onRemove && (
                    <button
                        onClick={() => onRemove(item.id)}
                        className="p-2 hover:bg-rose-500/10 rounded-lg text-zinc-500 hover:text-rose-500 transition-colors"
                    >
                        <Trash2 size={14} />
                    </button>
                )}
            </div>

            {/* Connection Indicator Accent */}
            <div className="absolute top-1/2 -right-[1px] -translate-y-1/2 h-8 w-[2px] bg-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
        </Reorder.Item>
    );
};

export const DragDropList = ({
    items: initialItems,
    onReorder,
    className
}: {
    items: DragItem[],
    onReorder?: (items: DragItem[]) => void,
    className?: string
}) => {
    const [items, setItems] = useState(initialItems);

    React.useEffect(() => {
        setItems(initialItems);
    }, [initialItems]);

    const handleReorder = (newOrder: DragItem[]) => {
        setItems(newOrder);
        if (onReorder) onReorder(newOrder);
    };

    const handleRemove = (id: string) => {
        setItems(prev => prev.filter(item => item.id !== id));
    };

    return (
        <Reorder.Group
            axis="y"
            values={items}
            onReorder={handleReorder}
            className={cn("space-y-3", className)}
        >
            <AnimatePresence>
                {items.map((item) => (
                    <DragDropCard key={item.id} item={item} onRemove={handleRemove} />
                ))}
            </AnimatePresence>
        </Reorder.Group>
    );
};
