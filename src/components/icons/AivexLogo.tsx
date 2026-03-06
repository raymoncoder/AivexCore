"use client";

import React from "react";

export const AivexLogo = ({ size = 24, className = "" }: { size?: number; className?: string }) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <defs>
                <linearGradient id="aivex-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
                <filter id="glow">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                    <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>
            {/* Outer hexagonal core */}
            <path
                d="M50 5 L90 27.5 L90 72.5 L50 95 L10 72.5 L10 27.5 Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeOpacity="0.2"
            />
            {/* Inner dynamic core */}
            <path
                d="M50 15 L80 32.5 L80 67.5 L50 85 L20 67.5 L20 32.5 Z"
                fill="url(#aivex-gradient)"
                fillOpacity="0.1"
                stroke="url(#aivex-gradient)"
                strokeWidth="4"
                filter="url(#glow)"
            />
            {/* Center Vertex */}
            <circle cx="50" cy="50" r="12" fill="url(#aivex-gradient)" />
            <path
                d="M50 38 L50 25 M62 50 L75 50 M50 62 L50 75 M38 50 L25 50"
                stroke="url(#aivex-gradient)"
                strokeWidth="4"
                strokeLinecap="round"
            />
        </svg>
    );
};
