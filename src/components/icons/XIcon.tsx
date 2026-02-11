import React from "react";

export const XIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M18.901 1.153h3.68l-8.04 9.19L23.97 22.75h-7.402l-5.797-7.581-6.633 7.581H.455l8.601-9.83L0 1.154h7.59l5.232 6.917 6.079-6.918zm-1.291 19.389h2.04L6.448 3.323H4.26l13.35 17.219z" />
    </svg>
);
