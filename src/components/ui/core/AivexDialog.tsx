"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const AivexDialog = DialogPrimitive.Root;
const AivexDialogTrigger = DialogPrimitive.Trigger;

const AivexDialogPortal = DialogPrimitive.Portal;

const AivexDialogOverlay = React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Overlay>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
    <DialogPrimitive.Overlay
        ref={ref}
        asChild
    >
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={cn(
                "fixed inset-0 z-50 bg-black/60 backdrop-blur-sm",
                className
            )}
            {...(props as any)}
        />
    </DialogPrimitive.Overlay>
));
AivexDialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const AivexDialogContent = React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
        glass?: boolean;
        glow?: boolean;
    }
>(({ className, children, glass = true, glow = true, ...props }, ref) => (
    <AivexDialogPortal>
        <AivexDialogOverlay />
        <DialogPrimitive.Content
            ref={ref}
            asChild
        >
            <motion.div
                initial={{
                    opacity: 0,
                    scale: 0.9,
                    y: 20
                }}
                animate={{
                    opacity: 1,
                    scale: 1,
                    y: 0
                }}
                exit={{
                    opacity: 0,
                    scale: 0.95,
                    y: 10
                }}
                transition={{
                    duration: 0.3,
                    ease: [0.4, 0, 0.2, 1]
                }}
                className={cn(
                    "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border p-6 sm:rounded-2xl",
                    glass ? "bg-zinc-950/70 border-zinc-800 backdrop-blur-xl" : "bg-zinc-950 border-zinc-900",
                    glow && "shadow-[0_0_50px_-12px_rgba(16,185,129,0.15)]",
                    className
                )}
                {...(props as any)}
            >
                {children}
                <DialogPrimitive.Close asChild>
                    <motion.button
                        whileHover={{ scale: 1.1, rotate: 90 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-4 top-4 rounded-full p-2 opacity-70 ring-offset-zinc-950 transition-opacity hover:opacity-100 hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 disabled:pointer-events-none"
                    >
                        <X className="h-4 w-4 text-zinc-400" />
                        <span className="sr-only">Close</span>
                    </motion.button>
                </DialogPrimitive.Close>
            </motion.div>
        </DialogPrimitive.Content>
    </AivexDialogPortal>
));
AivexDialogContent.displayName = DialogPrimitive.Content.displayName;

const AivexDialogHeader = ({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
    <div
        className={cn(
            "flex flex-col space-y-1.5 text-center sm:text-left",
            className
        )}
        {...props}
    />
);
AivexDialogHeader.displayName = "AivexDialogHeader";

const AivexDialogFooter = ({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
    <div
        className={cn(
            "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
            className
        )}
        {...props}
    />
);
AivexDialogFooter.displayName = "AivexDialogFooter";

const AivexDialogTitle = React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Title>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
    <DialogPrimitive.Title
        ref={ref}
        className={cn(
            "text-lg font-semibold leading-none tracking-tight font-sans text-zinc-100",
            className
        )}
        {...props}
    />
));
AivexDialogTitle.displayName = DialogPrimitive.Title.displayName;

const AivexDialogDescription = React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Description>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
    <DialogPrimitive.Description
        ref={ref}
        className={cn("text-sm text-zinc-400 font-sans leading-relaxed", className)}
        {...props}
    />
));
AivexDialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
    AivexDialog,
    AivexDialogPortal,
    AivexDialogOverlay,
    AivexDialogTrigger,
    AivexDialogContent,
    AivexDialogHeader,
    AivexDialogFooter,
    AivexDialogTitle,
    AivexDialogDescription,
};
