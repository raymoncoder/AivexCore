"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { User } from "lucide-react";

interface AivexAvatarProps {
    src?: string;
    alt?: string;
    fallback?: string;
    size?: "sm" | "md" | "lg" | "xl";
    className?: string;
    status?: "online" | "offline" | "busy" | "away";
}

const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-14 h-14 text-base",
    xl: "w-20 h-20 text-xl"
};

const statusColors = {
    online: "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]",
    offline: "bg-zinc-500",
    busy: "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]",
    away: "bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.5)]"
};

export const AivexAvatar = ({
    src,
    alt,
    fallback,
    size = "md",
    className,
    status
}: AivexAvatarProps) => {
    const [hasError, setHasError] = React.useState(false);

    return (
        <div className={cn("relative inline-block", className)}>
            <div className={cn(
                "relative flex shrink-0 overflow-hidden rounded-full border border-zinc-800 bg-zinc-900 group",
                sizeClasses[size]
            )}>
                {!hasError && src ? (
                    <img
                        src={src}
                        alt={alt}
                        className="aspect-square h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        onError={() => setHasError(true)}
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center rounded-full bg-zinc-800 text-zinc-400 font-medium font-sans">
                        {fallback ? fallback.slice(0, 2).toUpperCase() : <User size={16} />}
                    </div>
                )}
            </div>
            {status && (
                <span className={cn(
                    "absolute bottom-0 right-0 block h-3 w-3 rounded-full ring-2 ring-zinc-950",
                    statusColors[status],
                    size === "sm" && "h-2 w-2",
                    size === "xl" && "h-4 w-4 bottom-1 right-1"
                )} />
            )}
        </div>
    );
};
