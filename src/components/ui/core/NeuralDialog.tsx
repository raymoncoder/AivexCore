"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const NeuralDialog = DialogPrimitive.Root;
const NeuralDialogTrigger = DialogPrimitive.Trigger;

const NeuralDialogPortal = DialogPrimitive.Portal;

const NeuralDialogOverlay = React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Overlay>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
    <DialogPrimitive.Overlay
        ref={ref}
        className={cn(
            "fixed inset-0 z-50 bg-black/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            className
        )}
        {...props}
    />
));
NeuralDialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const NeuralDialogContent = React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
        glass?: boolean;
        glow?: boolean;
    }
>(({ className, children, glass = true, glow = true, ...props }, ref) => (
    <NeuralDialogPortal>
        <NeuralDialogOverlay />
        <DialogPrimitive.Content
            ref={ref}
            className={cn(
                "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border p-6 duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-2xl",
                glass ? "bg-zinc-950/70 border-zinc-800 backdrop-blur-xl" : "bg-zinc-950 border-zinc-900",
                glow && "shadow-[0_0_50px_-12px_rgba(16,185,129,0.15)]", // Emerald glow
                className
            )}
            {...props}
        >
            {children}
            <DialogPrimitive.Close className="absolute right-4 top-4 rounded-full p-2 opacity-70 ring-offset-zinc-950 transition-opacity hover:opacity-100 hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-zinc-800 data-[state=open]:text-zinc-400">
                <X className="h-4 w-4 text-zinc-400" />
                <span className="sr-only">Close</span>
            </DialogPrimitive.Close>
        </DialogPrimitive.Content>
    </NeuralDialogPortal>
));
NeuralDialogContent.displayName = DialogPrimitive.Content.displayName;

const NeuralDialogHeader = ({
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
NeuralDialogHeader.displayName = "NeuralDialogHeader";

const NeuralDialogFooter = ({
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
NeuralDialogFooter.displayName = "NeuralDialogFooter";

const NeuralDialogTitle = React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Title>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
    <DialogPrimitive.Title
        ref={ref}
        className={cn(
            "text-lg font-semibold leading-none tracking-tight font-onest text-zinc-100",
            className
        )}
        {...props}
    />
));
NeuralDialogTitle.displayName = DialogPrimitive.Title.displayName;

const NeuralDialogDescription = React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Description>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
    <DialogPrimitive.Description
        ref={ref}
        className={cn("text-sm text-zinc-400 font-onest leading-relaxed", className)}
        {...props}
    />
));
NeuralDialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
    NeuralDialog,
    NeuralDialogPortal,
    NeuralDialogOverlay,
    NeuralDialogTrigger,
    NeuralDialogContent,
    NeuralDialogHeader,
    NeuralDialogFooter,
    NeuralDialogTitle,
    NeuralDialogDescription,
};
