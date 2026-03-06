"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const AivexCheckbox = React.forwardRef<
    React.ElementRef<typeof CheckboxPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> & {
        label?: string;
        description?: string;
    }
>(({ className, label, description, ...props }, ref) => (
    <label className={cn(
        "group flex items-start space-x-3 cursor-pointer select-none py-1.5 px-1 rounded-lg transition-colors hover:bg-zinc-900/40",
        props.disabled && "opacity-50 cursor-not-allowed hover:bg-transparent"
    )}>
        <div className="relative flex items-center pt-0.5">
            <CheckboxPrimitive.Root
                ref={ref}
                className={cn(
                    "peer h-5 w-5 shrink-0 rounded-[6px] border border-zinc-600 ring-offset-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-emerald-500 data-[state=checked]:text-zinc-950 data-[state=checked]:border-emerald-500 transition-all shadow-sm group-hover:border-zinc-500",
                    className
                )}
                {...props}
            >
                <CheckboxPrimitive.Indicator
                    className={cn("flex items-center justify-center text-current")}
                >
                    <Check className="h-3 w-3" strokeWidth={3} />
                </CheckboxPrimitive.Indicator>
            </CheckboxPrimitive.Root>
            {/* Glow effect when checked */}
            <div className="absolute inset-0 bg-emerald-500/20 blur-md rounded-full scale-150 -z-10 animate-pulse opacity-0 peer-data-[state=checked]:opacity-100 transition-opacity" />
        </div>
        {(label || description) && (
            <div className="flex flex-col gap-0.5">
                {label && (
                    <span className="text-sm font-medium font-sans transition-colors text-zinc-400 group-hover:text-zinc-300 peer-data-[state=checked]:text-zinc-100">
                        {label}
                    </span>
                )}
                {description && (
                    <span className="text-xs text-zinc-500 font-sans">{description}</span>
                )}
            </div>
        )}
    </label>
))
AivexCheckbox.displayName = CheckboxPrimitive.Root.displayName

export { AivexCheckbox }
