"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { AlertCircle, AlertTriangle, CheckCircle, Info, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type AlertVariant = "default" | "destructive" | "warning" | "success";

interface NeuralAlertProps {
    variant?: AlertVariant;
    title: string;
    description?: string;
    icon?: React.ReactNode;
    className?: string;
    dismissible?: boolean;
    onDismiss?: () => void;
}

const variantStyles: Record<AlertVariant, { container: string; icon: string; iconComponent: React.ReactNode }> = {
    default: {
        container: "bg-blue-500/10 border-blue-500/20 text-blue-200",
        icon: "text-blue-500",
        iconComponent: <Info size={18} />
    },
    destructive: {
        container: "bg-red-500/10 border-red-500/20 text-red-200",
        icon: "text-red-500",
        iconComponent: <AlertCircle size={18} />
    },
    warning: {
        container: "bg-orange-500/10 border-orange-500/20 text-orange-200",
        icon: "text-orange-500",
        iconComponent: <AlertTriangle size={18} />
    },
    success: {
        container: "bg-emerald-500/10 border-emerald-500/20 text-emerald-200",
        icon: "text-emerald-500",
        iconComponent: <CheckCircle size={18} />
    }
};

export const NeuralAlert = ({
    variant = "default",
    title,
    description,
    icon,
    className,
    dismissible,
    onDismiss
}: NeuralAlertProps) => {
    const [isVisible, setIsVisible] = React.useState(true);
    const styles = variantStyles[variant];

    const handleDismiss = () => {
        setIsVisible(false);
        onDismiss?.();
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 5 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, height: 0, marginBottom: 0 }}
                    transition={{ duration: 0.2 }}
                    className={cn(
                        "relative w-full rounded-lg border p-4 flex gap-4 items-start shadow-sm backdrop-blur-sm",
                        styles.container,
                        className
                    )}
                >
                    <div className={cn("mt-0.5 shrink-0", styles.icon)}>
                        {icon || styles.iconComponent}
                    </div>
                    <div className="flex-1 space-y-1">
                        <h5 className="font-medium font-onest leading-none tracking-tight text-sm">
                            {title}
                        </h5>
                        {description && (
                            <div className="text-sm font-onest opacity-90 leading-relaxed">
                                {description}
                            </div>
                        )}
                    </div>
                    {dismissible && (
                        <button
                            onClick={handleDismiss}
                            className={cn(
                                "absolute top-4 right-4 p-0.5 rounded-full hover:bg-black/20 transition-colors",
                                styles.icon
                            )}
                        >
                            <X size={14} />
                        </button>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
};
