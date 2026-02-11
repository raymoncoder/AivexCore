"use client";

import * as React from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticProps {
    children: React.ReactElement;
    strength?: number; // How far it moves. Default 0.5
}

export const Magnetic = ({ children, strength = 0.5 }: MagneticProps) => {
    const ref = React.useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current) return;

        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current.getBoundingClientRect();

        const xVal = clientX - (left + width / 2);
        const yVal = clientY - (top + height / 2);

        x.set(xVal * strength);
        y.set(yVal * strength);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x: springX, y: springY }}
            className="inline-block"
        >
            {children}
        </motion.div>
    );
};
