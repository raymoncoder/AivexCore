"use client";

import React, { useState, useRef } from "react";
import { Upload, File, X, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface FileUploadZoneProps {
    onFilesSelected?: (files: File[]) => void;
    maxFiles?: number;
    accept?: string;
    className?: string;
}

export const FileUploadZone = ({
    onFilesSelected,
    maxFiles = 5,
    accept = "*",
    className
}: FileUploadZoneProps) => {
    const [isDragging, setIsDragging] = useState(false);
    const [files, setFiles] = useState<{ file: File; status: "uploading" | "success" | "error" }[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const droppedFiles = Array.from(e.dataTransfer.files);
        processFiles(droppedFiles);
    };

    const processFiles = (newFiles: File[]) => {
        const limitedFiles = newFiles.slice(0, maxFiles - files.length);
        const mapped = limitedFiles.map(f => ({ file: f, status: "uploading" as const }));
        setFiles(prev => [...prev, ...mapped]);

        // Simulate upload delay for cinematic effect
        mapped.forEach((f, i) => {
            setTimeout(() => {
                setFiles(prev => prev.map(item =>
                    item.file === f.file ? { ...item, status: "success" } : item
                ));
            }, 1500 + i * 500);
        });

        if (onFilesSelected) onFilesSelected(limitedFiles);
    };

    const removeFile = (file: File) => {
        setFiles(prev => prev.filter(f => f.file !== file));
    };

    return (
        <div className={cn("w-full space-y-4", className)}>
            <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => inputRef.current?.click()}
                className={cn(
                    "relative min-h-[200px] rounded-[2rem] border-2 border-dashed transition-all duration-500 cursor-pointer flex flex-col items-center justify-center p-8 overflow-hidden group",
                    isDragging
                        ? "border-emerald-500 bg-emerald-500/5 shadow-[0_0_30px_rgba(16,185,129,0.1)] scale-[0.99]"
                        : "border-zinc-800 bg-zinc-950 hover:border-zinc-700 hover:bg-zinc-900/50"
                )}
            >
                <input
                    type="file"
                    ref={inputRef}
                    onChange={(e) => e.target.files && processFiles(Array.from(e.target.files))}
                    accept={accept}
                    multiple
                    className="hidden"
                />

                {/* Cinematic Backdrop Glow */}
                <div className={cn(
                    "absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent opacity-0 transition-opacity duration-500",
                    isDragging ? "opacity-100" : "group-hover:opacity-100"
                )} />

                <motion.div
                    animate={isDragging ? { y: -5, scale: 1.1 } : { y: 0, scale: 1 }}
                    className={cn(
                        "relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-colors duration-500",
                        isDragging ? "bg-emerald-500 text-black" : "bg-zinc-900 text-zinc-400 group-hover:text-emerald-400 border border-zinc-800"
                    )}
                >
                    <Upload size={28} />
                </motion.div>

                <div className="relative z-10 text-center space-y-1">
                    <p className="text-sm font-bold text-white tracking-tight font-sans uppercase">
                        {isDragging ? "Release to Initiate" : "Transmission Portal"}
                    </p>
                    <p className="text-[11px] text-zinc-500 font-mono tracking-widest uppercase">
                        Drag & Drop or <span className="text-emerald-500">Click to Browse</span>
                    </p>
                </div>
            </div>

            {/* File List */}
            <AnimatePresence>
                {files.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-2"
                    >
                        {files.map(({ file, status }) => (
                            <motion.div
                                key={file.name}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 10 }}
                                className="flex items-center gap-3 p-3 rounded-xl bg-zinc-900/50 border border-zinc-800 group"
                            >
                                <div className="w-8 h-8 rounded-lg bg-zinc-950 border border-zinc-800 flex items-center justify-center text-zinc-500">
                                    <File size={16} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between gap-2">
                                        <p className="text-xs font-medium text-zinc-200 truncate">{file.name}</p>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); removeFile(file); }}
                                            className="text-zinc-500 hover:text-rose-500 transition-colors"
                                        >
                                            <X size={14} />
                                        </button>
                                    </div>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-[10px] font-mono text-zinc-600">{(file.size / 1024).toFixed(1)} KB</span>
                                        <span className="w-1 h-1 rounded-full bg-zinc-800" />
                                        <div className="flex items-center gap-1">
                                            {status === "uploading" ? (
                                                <>
                                                    <Loader2 size={10} className="animate-spin text-emerald-500" />
                                                    <span className="text-[10px] font-mono text-emerald-500/70 uppercase">Encrypting...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <CheckCircle2 size={10} className="text-emerald-500" />
                                                    <span className="text-[10px] font-mono text-zinc-500 uppercase">Synchronized</span>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
