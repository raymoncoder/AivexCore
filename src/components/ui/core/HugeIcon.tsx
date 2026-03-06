"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface HugeIconProps {
    name: string;
    variant?: "stroke" | "solid" | "duotone" | "outline"; // Note: Free CDN usually only supports stroke
    size?: number;
    className?: string;
}

/**
 * HugeIcon component that uses the CDN-loaded icon font.
 * Requires the Hugeicons CSS to be loaded in the layout (e.g., hgi-stroke-rounded.css).
 */
export const HugeIcon = ({
    name,
    variant = "stroke",
    size = 24,
    className
}: HugeIconProps) => {
    return (
        <i
            className={cn(
                `hgi-${variant}`,
                `hgi-${name}`,
                className
            )}
            style={{ fontSize: `${size}px` }}
        />
    );
};
