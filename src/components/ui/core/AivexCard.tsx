"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

const AivexCard = React.forwardRef<
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
AivexCard.displayName = "AivexCard";

const AivexCardHeader = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("flex flex-col space-y-1.5 p-6", className)}
        {...props}
    />
));
AivexCardHeader.displayName = "AivexCardHeader";

const AivexCardTitle = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
    <h3
        ref={ref}
        className={cn(
            "text-lg font-semibold leading-none tracking-tight font-sans",
            className
        )}
        {...props}
    />
));
AivexCardTitle.displayName = "AivexCardTitle";

const AivexCardDescription = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
    <p
        ref={ref}
        className={cn("text-sm text-zinc-400 font-sans", className)}
        {...props}
    />
));
AivexCardDescription.displayName = "AivexCardDescription";

const AivexCardContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
AivexCardContent.displayName = "AivexCardContent";

const AivexCardFooter = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("flex items-center p-6 pt-0", className)}
        {...props}
    />
));
AivexCardFooter.displayName = "AivexCardFooter";

export { AivexCard, AivexCardHeader, AivexCardTitle, AivexCardDescription, AivexCardContent, AivexCardFooter };
