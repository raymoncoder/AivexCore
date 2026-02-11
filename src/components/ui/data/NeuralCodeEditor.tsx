"use client";

import React, { useState } from "react";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import { cn } from "@/lib/utils";
import { Copy, Check, Terminal } from "lucide-react";

interface NeuralCodeEditorProps {
    initialCode?: string;
    language?: string;
    className?: string;
    title?: string;
    readOnly?: boolean;
}

export const NeuralCodeEditor = ({
    initialCode = "",
    language = "tsx",
    className,
    title = "index.tsx",
    readOnly = false
}: NeuralCodeEditorProps) => {
    const [code, setCode] = useState(initialCode);
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className={cn(
            "group relative flex flex-col rounded-xl border border-white/10 bg-zinc-950 overflow-hidden shadow-2xl",
            className
        )}>
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/5">
                <div className="flex items-center gap-2">
                    <Terminal size={14} className="text-zinc-500" />
                    <span className="text-xs font-mono text-zinc-400">{title}</span>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={handleCopy}
                        className="p-1.5 rounded-md hover:bg-white/5 text-zinc-500 hover:text-zinc-100 transition-all"
                    >
                        {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                    </button>
                    {!readOnly && (
                        <div className="w-2 h-2 rounded-full bg-emerald-500/50 animate-pulse" />
                    )}
                </div>
            </div>

            {/* Editor */}
            <div className="relative flex-1 font-mono text-sm leading-relaxed overflow-auto max-h-[500px]">
                <Editor
                    value={code}
                    onValueChange={code => setCode(code)}
                    highlight={code => highlight(code, languages[language] || languages.javascript, language)}
                    padding={20}
                    style={{
                        fontFamily: '"JetBrains Mono", monospace',
                        fontSize: 14,
                        minHeight: "100%",
                        backgroundColor: "transparent",
                    }}
                    className="neural-editor-textarea focus:outline-none"
                    disabled={readOnly}
                />

                {/* Custom styling for Prism tokens to match Neural theme */}
                <style jsx global>{`
                    .neural-editor-textarea pre {
                        background: none !important;
                    }
                    .token.comment, .token.prolog, .token.doctype, .token.cdata { color: #52525b; }
                    .token.punctuation { color: #a1a1aa; }
                    .token.namespace { opacity: .7; }
                    .token.property, .token.tag, .token.boolean, .token.number, .token.constant, .token.symbol, .token.deleted { color: #fb7185; }
                    .token.selector, .token.attr-name, .token.string, .token.char, .token.builtin, .token.inserted { color: #34d399; }
                    .token.operator, .token.entity, .token.url, .language-css .token.string, .style .token.string { color: #818cf8; }
                    .token.atrule, .token.attr-value, .token.keyword { color: #818cf8; }
                    .token.function, .token.class-name { color: #60a5fa; }
                    .token.regex, .token.important, .token.variable { color: #fbbf24; }
                `}</style>
            </div>
        </div>
    );
};
