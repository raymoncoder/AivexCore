"use client";

import React, { useState } from "react";
import { NeuralButton } from "@/components/ui/core/NeuralButton";
import { Download, FileJson, FileText, Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface NeuralExportButtonProps {
    data: any[];
    filename?: string;
    className?: string;
}

export const NeuralExportButton = ({
    data,
    filename = "export",
    className
}: NeuralExportButtonProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [status, setStatus] = useState<"idle" | "success">("idle");

    const exportToCSV = () => {
        if (!data.length) return;
        const headers = Object.keys(data[0]);
        const csvRows = [
            headers.join(","),
            ...data.map(row => headers.map(header => JSON.stringify(row[header] || "")).join(","))
        ];
        const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${filename}.csv`;
        a.click();

        handleSuccess();
    };

    const exportToJSON = () => {
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${filename}.json`;
        a.click();

        handleSuccess();
    };

    const handleSuccess = () => {
        setStatus("success");
        setIsOpen(false);
        setTimeout(() => setStatus("idle"), 2000);
    };

    return (
        <div className={cn("relative inline-block", className)}>
            <NeuralButton
                onClick={() => setIsOpen(!isOpen)}
                variant={status === "success" ? "secondary" : "primary"}
                className={cn("gap-2 min-w-[140px] transition-all", status === "success" && "bg-emerald-500/10 border-emerald-500/50 text-emerald-500")}
            >
                {status === "success" ? (
                    <>
                        <Check size={16} />
                        <span>Exported</span>
                    </>
                ) : (
                    <>
                        <Download size={16} />
                        <span>Export Data</span>
                        <ChevronDown size={14} className={cn("transition-transform", isOpen && "rotate-180")} />
                    </>
                )}
            </NeuralButton>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 5 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 5 }}
                        className="absolute top-full left-0 mt-2 z-50 w-48 rounded-xl border border-white/10 bg-zinc-900/90 backdrop-blur-xl p-1 shadow-2xl"
                    >
                        <button
                            onClick={exportToCSV}
                            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 text-sm text-zinc-400 hover:text-white transition-colors text-left"
                        >
                            <FileText size={16} className="text-zinc-500" />
                            <span>Export as CSV</span>
                        </button>
                        <button
                            onClick={exportToJSON}
                            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 text-sm text-zinc-400 hover:text-white transition-colors text-left"
                        >
                            <FileJson size={16} className="text-zinc-500" />
                            <span>Export as JSON</span>
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
