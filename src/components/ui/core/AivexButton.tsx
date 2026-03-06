"use client";

import * as React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

export interface AivexButtonProps extends HTMLMotionProps<"button"> {
    variant?: "primary" | "secondary" | "ghost" | "destructive";
    size?: "sm" | "md" | "lg" | "icon";
    isLoading?: boolean;
    icon?: React.ReactNode;
    children: React.ReactNode;
}

export const AivexButton = React.forwardRef<HTMLButtonElement, AivexButtonProps>(
    ({ className, variant = "primary", size = "md", isLoading, icon, children, ...props }, ref) => {

        // Clean, refined variants
        // Clean, refined variants
        const variants = {
            primary:
                "bg-zinc-50 text-zinc-950 hover:bg-zinc-200 border border-transparent shadow-[0_4px_12px_rgba(255,255,255,0.1),0_0_0_1px_rgba(255,255,255,0.1)_inset] backdrop-blur-sm",
            secondary:
                "bg-zinc-800/60 text-zinc-100 hover:bg-zinc-700/80 border border-zinc-700/60 hover:border-zinc-500/50 shadow-sm backdrop-blur-md",
            ghost:
                "bg-transparent text-zinc-400 hover:text-zinc-50 hover:bg-zinc-800/30 hover:backdrop-blur-sm",
            destructive:
                "bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 hover:border-red-500/30 backdrop-blur-md",
        };

        const sizes = {
            sm: "h-8 px-3 text-xs",
            md: "h-10 px-4 py-2 text-sm",
            lg: "h-12 px-8 text-base",
            icon: "h-10 w-10 p-0 flex items-center justify-center",
        };

        return (
            <motion.button
                ref={ref}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                    "relative inline-flex items-center justify-center whitespace-nowrap rounded-lg font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
                    variants[variant],
                    sizes[size],
                    className
                )}
                disabled={isLoading || props.disabled}
                {...props}
            >
                {isLoading ? (
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                ) : icon ? (
                    <span className="mr-2 flex items-center justify-center">{icon}</span>
                ) : null}
                <span className="relative z-10 flex items-center gap-2">
                    {children}
                </span>
            </motion.button>
        );
    }
);
AivexButton.displayName = "AivexButton";
