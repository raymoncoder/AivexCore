"use client";

import React from "react";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

interface AivexBreadcrumbProps {
    items: { label: string; href?: string }[];
    className?: string;
    separator?: React.ReactNode;
}

export const AivexBreadcrumb = ({ items, className, separator = <ChevronRight size={14} /> }: AivexBreadcrumbProps) => {
    return (
        <nav aria-label="Breadcrumb" className={cn("flex items-center space-x-2 text-sm text-zinc-500 font-sans", className)}>
            <a href="/" className="hover:text-zinc-100 transition-colors flex items-center">
                <Home size={14} />
            </a>
            {items.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                    <span className="text-zinc-600 select-none">{separator}</span>
                    {item.href ? (
                        <a
                            href={item.href}
                            className="hover:text-zinc-100 transition-colors bg-transparent px-1.5 py-0.5 rounded hover:bg-zinc-800/50"
                        >
                            {item.label}
                        </a>
                    ) : (
                        <span className="text-zinc-100 font-medium px-1.5 py-0.5">{item.label}</span>
                    )}
                </div>
            ))}
        </nav>
    );
};
