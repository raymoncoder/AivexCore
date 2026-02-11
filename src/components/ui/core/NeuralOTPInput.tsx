"use client";

import React, { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface NeuralOTPInputProps {
    length?: number;
    onComplete?: (code: string) => void;
    className?: string;
}

export function NeuralOTPInput({ length = 6, onComplete, className }: NeuralOTPInputProps) {
    const [otp, setOtp] = useState<string[]>(new Array(length).fill(""));
    const [activeIdx, setActiveIdx] = useState(0);
    const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        inputsRef.current[0]?.focus();
    }, []);

    const handleChange = (val: string, index: number) => {
        const newOtp = [...otp];
        newOtp[index] = val.slice(-1);
        setOtp(newOtp);

        if (val && index < length - 1) {
            inputsRef.current[index + 1]?.focus();
            setActiveIdx(index + 1);
        }

        if (newOtp.every(digit => digit !== "") && newOtp.length === length) {
            onComplete?.(newOtp.join(""));
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputsRef.current[index - 1]?.focus();
            setActiveIdx(index - 1);
        }
    };

    return (
        <div className={cn("flex gap-3", className)}>
            {otp.map((digit, idx) => (
                <div key={idx} className="relative group">
                    <input
                        ref={el => { inputsRef.current[idx] = el; }}
                        type="text"
                        inputMode="numeric"
                        value={digit}
                        onChange={e => handleChange(e.target.value, idx)}
                        onKeyDown={e => handleKeyDown(e, idx)}
                        onFocus={() => setActiveIdx(idx)}
                        className={cn(
                            "w-12 h-14 bg-zinc-900/50 border border-zinc-800 rounded-xl text-center text-xl font-mono text-zinc-100 focus:outline-none transition-all duration-300",
                            activeIdx === idx ? "border-emerald-500/50 ring-4 ring-emerald-500/10 bg-zinc-950/80" : "group-hover:border-zinc-700"
                        )}
                    />
                    {activeIdx === idx && (
                        <motion.div
                            layoutId="otp-cursor"
                            className="absolute bottom-2 left-3 right-3 h-0.5 bg-emerald-500"
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                    )}
                </div>
            ))}
        </div>
    );
}
