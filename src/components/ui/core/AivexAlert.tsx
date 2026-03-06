"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { AlertCircle, AlertTriangle, CheckCircle, Info, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type AlertVariant = "default" | "destructive" | "warning" | "success";

interface AivexAlertProps {
    variant?: AlertVariant;
    title: string;
    description?: string;
    icon?: React.ReactNode;
    className?: string;
    dismissible?: boolean;
    onDismiss?: () => void;
}

const variantStyles: Record<AlertVariant, { container: string; icon: string; iconBg: string; iconComponent: React.ReactNode; glow: string }> = {
    default: {
        container: "bg-blue-500/5 border-blue-500/20 text-blue-100",
        icon: "text-blue-400",
        iconBg: "bg-blue-500/10 border-blue-500/30",
        iconComponent: <Info size={20} />,
        glow: "shadow-[0_0_20px_-5px_rgba(59,130,246,0.3)]"
    },
    destructive: {
        container: "bg-red-500/5 border-red-500/20 text-red-100",
        icon: "text-red-400",
        iconBg: "bg-red-500/10 border-red-500/30",
        iconComponent: <AlertCircle size={20} />,
        glow: "shadow-[0_0_20px_-5px_rgba(239,68,68,0.3)]"
    },
    warning: {
        container: "bg-amber-500/5 border-amber-500/20 text-amber-100",
        icon: "text-amber-400",
        iconBg: "bg-amber-500/10 border-amber-500/30",
        iconComponent: <AlertTriangle size={20} />,
        glow: "shadow-[0_0_20px_-5px_rgba(251,191,36,0.3)]"
    },
    success: {
        container: "bg-emerald-500/5 border-emerald-500/20 text-emerald-100",
        icon: "text-emerald-400",
        iconBg: "bg-emerald-500/10 border-emerald-500/30",
        iconComponent: <CheckCircle size={20} />,
        glow: "shadow-[0_0_20px_-5px_rgba(16,185,129,0.3)]"
    }
};

export const AivexAlert = ({
    variant = "default",
    title,
    description,
    icon,
    className,
    dismissible,
    onDismiss
}: AivexAlertProps) => {
    const [isVisible, setIsVisible] = React.useState(true);
    const styles = variantStyles[variant];

    const handleDismiss = () => {
        setIsVisible(false);
        setTimeout(() => {
            onDismiss?.();
        }, 200);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, x: 100 }}
                    transition={{
                        duration: 0.3,
                        ease: [0.4, 0, 0.2, 1]
                    }}
                    className={cn(
                        "relative w-full rounded-2xl border backdrop-blur-md overflow-hidden group",
                        styles.container,
                        styles.glow,
                        "hover:border-opacity-40 transition-all duration-300",
                        className
                    )}
                >
                    {/* Subtle gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none" />

                    <div className="relative p-5 flex gap-4 items-start">
                        {/* Icon container with enhanced styling */}
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                            className={cn(
                                "w-10 h-10 rounded-xl border flex items-center justify-center shrink-0",
                                styles.iconBg,
                                styles.icon,
                                "shadow-inner"
                            )}
                        >
                            {icon || styles.iconComponent}
                        </motion.div>

                        {/* Content */}
                        <div className="flex-1 space-y-1.5 min-w-0">
                            <h5 className="font-semibold font-sans leading-none tracking-tight text-sm">
                                {title}
                            </h5>
                            {description && (
                                <p className="text-xs font-sans opacity-80 leading-relaxed">
                                    {description}
                                </p>
                            )}
                        </div>

                        {/* Dismiss button */}
                        {dismissible && (
                            <motion.button
                                whileHover={{ scale: 1.1, rotate: 90 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={handleDismiss}
                                className={cn(
                                    "w-6 h-6 rounded-lg flex items-center justify-center shrink-0",
                                    "hover:bg-white/10 transition-colors",
                                    styles.icon,
                                    "opacity-60 hover:opacity-100"
                                )}
                            >
                                <X size={14} />
                            </motion.button>
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
