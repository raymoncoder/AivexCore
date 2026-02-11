"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

const NeuralCard = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "rounded-xl border border-zinc-800 bg-zinc-950/40 text-zinc-100 shadow-xl backdrop-blur-xl relative overflow-hidden",
            "before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/5 before:to-transparent before:pointer-events-none before:z-[-1]",
            className
        )}
        {...props}
    />
));
NeuralCard.displayName = "NeuralCard";

const NeuralCardHeader = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("flex flex-col space-y-1.5 p-6", className)}
        {...props}
    />
));
NeuralCardHeader.displayName = "NeuralCardHeader";

const NeuralCardTitle = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
    <h3
        ref={ref}
        className={cn(
            "text-lg font-semibold leading-none tracking-tight font-onest",
            className
        )}
        {...props}
    />
));
NeuralCardTitle.displayName = "NeuralCardTitle";

const NeuralCardDescription = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
    <p
        ref={ref}
        className={cn("text-sm text-zinc-400 font-onest", className)}
        {...props}
    />
));
NeuralCardDescription.displayName = "NeuralCardDescription";

const NeuralCardContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
NeuralCardContent.displayName = "NeuralCardContent";

const NeuralCardFooter = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("flex items-center p-6 pt-0", className)}
        {...props}
    />
));
NeuralCardFooter.displayName = "NeuralCardFooter";

export { NeuralCard, NeuralCardHeader, NeuralCardTitle, NeuralCardDescription, NeuralCardContent, NeuralCardFooter };
