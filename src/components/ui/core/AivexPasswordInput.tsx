"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";

interface AivexPasswordInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
    label?: string;
    wrapperClassName?: string;
    showStrengthIndicator?: boolean;
}

const calculatePasswordStrength = (password: string): { strength: number; label: string; color: string } => {
    if (!password) return { strength: 0, label: "", color: "" };

    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[@$!%*?&]/.test(password)) strength++;

    if (strength <= 2) return { strength, label: "Weak", color: "bg-red-500" };
    if (strength <= 3) return { strength, label: "Fair", color: "bg-amber-500" };
    if (strength <= 4) return { strength, label: "Good", color: "bg-blue-500" };
    return { strength, label: "Strong", color: "bg-emerald-500" };
};

export const AivexPasswordInput = React.forwardRef<HTMLInputElement, AivexPasswordInputProps>(
    ({ className, wrapperClassName, label, showStrengthIndicator = false, value, ...props }, ref) => {
        const [showPassword, setShowPassword] = React.useState(false);
        const [internalValue, setInternalValue] = React.useState(value || "");

        const currentValue = value !== undefined ? value : internalValue;
        const passwordStrength = showStrengthIndicator ? calculatePasswordStrength(String(currentValue)) : null;

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setInternalValue(e.target.value);
        };

        return (
            <div className={cn("relative group flex flex-col gap-1.5", wrapperClassName)}>
                {label && (
                    <label className="text-xs font-medium text-zinc-400 group-focus-within:text-zinc-50 transition-colors">
                        {label}
                    </label>
                )}
                <motion.div
                    initial={false}
                    className="relative flex items-center bg-zinc-900/50 border border-zinc-800/50 rounded-lg shadow-sm backdrop-blur-sm transition-all duration-200 group-hover:border-zinc-700/50 group-hover:bg-zinc-900/70 group-focus-within:border-emerald-500/50 group-focus-within:ring-2 group-focus-within:ring-emerald-500/10 group-focus-within:bg-zinc-950/80"
                >
                    <input
                        ref={ref}
                        type={showPassword ? "text" : "password"}
                        value={currentValue}
                        onChange={handleChange}
                        className={cn(
                            "w-full bg-transparent px-3 py-2.5 pr-10 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
                            className
                        )}
                        {...props}
                    />
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 p-1 rounded hover:bg-zinc-800 text-zinc-500 hover:text-zinc-300 transition-colors"
                    >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </motion.button>
                </motion.div>

                {showStrengthIndicator && currentValue && passwordStrength && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-1.5"
                    >
                        <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((level) => (
                                <div
                                    key={level}
                                    className={cn(
                                        "h-1 flex-1 rounded-full transition-all duration-300",
                                        level <= passwordStrength.strength
                                            ? passwordStrength.color
                                            : "bg-zinc-800"
                                    )}
                                />
                            ))}
                        </div>
                        <p className={cn(
                            "text-xs font-medium transition-colors",
                            passwordStrength.strength <= 2 && "text-red-400",
                            passwordStrength.strength === 3 && "text-amber-400",
                            passwordStrength.strength === 4 && "text-blue-400",
                            passwordStrength.strength === 5 && "text-emerald-400"
                        )}>
                            Password strength: {passwordStrength.label}
                        </p>
                    </motion.div>
                )}
            </div>
        );
    }
);
AivexPasswordInput.displayName = "AivexPasswordInput";
