"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Github, Layers } from "lucide-react";
import { XIcon } from "@/components/icons/XIcon";
import { NeuralButton } from "@/components/ui/core/NeuralButton";

export const Navbar = () => {
    const pathname = usePathname();

    return (
        <header className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md">
            <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between relative">
                <Link href="/" className="flex items-center gap-2 group shrink-0">
                    <div className="w-8 h-8 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center group-hover:border-emerald-500/50 transition-colors">
                        <Layers size={18} className="text-zinc-100" />
                    </div>
                    <span className="text-lg font-bold tracking-tight text-zinc-100 font-sans">
                        Neural<span className="text-zinc-400">UI</span>
                    </span>
                </Link>

                <nav className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
                    <Link
                        href="/docs"
                        className={cn(
                            "text-sm font-medium transition-colors hover:text-emerald-400 font-sans tracking-wide",
                            pathname.startsWith("/docs") ? "text-emerald-500" : "text-zinc-400"
                        )}
                    >
                        Components
                    </Link>
                    <Link
                        href="/templates"
                        className={cn(
                            "text-sm font-medium transition-colors hover:text-emerald-400 font-sans tracking-wide",
                            pathname === "/templates" ? "text-emerald-500" : "text-zinc-400"
                        )}
                    >
                        Templates
                    </Link>
                </nav>

                <div className="flex items-center gap-4 shrink-0">
                    <div className="flex items-center gap-2 text-zinc-400">
                        <Link href="https://github.com" target="_blank" className="p-2 hover:text-zinc-100 transition-colors">
                            <Github size={20} />
                        </Link>
                        <Link href="https://x.com" target="_blank" className="p-2 hover:text-zinc-100 transition-colors">
                            <XIcon size={18} />
                        </Link>
                    </div>
                    <div className="h-6 w-[1px] bg-zinc-800 mx-2 hidden sm:block"></div>
                    <Link href="/docs">
                        <NeuralButton size="sm" className="hidden sm:inline-flex">
                            Get Started
                        </NeuralButton>
                    </Link>
                </div>
            </div>
        </header>
    );
};
