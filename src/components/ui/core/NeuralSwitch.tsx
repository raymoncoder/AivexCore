"use client";

import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { cn } from "@/lib/utils";

const NeuralSwitch = React.forwardRef<
    React.ElementRef<typeof SwitchPrimitives.Root>,
    React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> & {
        label?: string;
    }
>(({ className, label, ...props }, ref) => (
    <div className="flex items-center gap-3">
        <SwitchPrimitives.Root
            className={cn(
                "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-emerald-500 data-[state=unchecked]:bg-zinc-700",
                className
            )}
            {...props}
            ref={ref}
        >
            <SwitchPrimitives.Thumb
                className={cn(
                    "pointer-events-none block h-5 w-5 rounded-full bg-zinc-100 shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
                )}
            />
        </SwitchPrimitives.Root>
        {/* Glow effect */}
        <div className="absolute left-0 top-0 h-6 w-11 rounded-full bg-emerald-500/20 blur-md -z-10 opacity-0 transition-opacity peer-data-[state=checked]:opacity-100 peer-data-[state=checked]:animate-pulse" />

        {label && (
            <span
                className="text-sm font-medium leading-none font-sans text-zinc-400 peer-data-[state=checked]:text-zinc-100 transition-colors cursor-pointer select-none"
            >
                {label}
            </span>
        )}
    </div>
))
NeuralSwitch.displayName = SwitchPrimitives.Root.displayName

export { NeuralSwitch }
