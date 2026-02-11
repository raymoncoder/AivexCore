import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: "class",
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                border: "var(--border)",
                input: "var(--input)",
                ring: "var(--ring)",
                muted: {
                    DEFAULT: "var(--muted)",
                    foreground: "var(--muted-foreground)",
                },
                primary: {
                    DEFAULT: "var(--primary)",
                    foreground: "var(--primary-foreground)",
                },
                secondary: {
                    DEFAULT: "var(--secondary)",
                    foreground: "var(--secondary-foreground)",
                },
                accent: {
                    DEFAULT: "var(--accent)",
                    foreground: "var(--accent-foreground)",
                },
                destructive: {
                    DEFAULT: "var(--destructive)",
                    foreground: "var(--destructive-foreground)",
                },
            },
            fontFamily: {
                sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"],
                mono: ["var(--font-jetbrains-mono)", "ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "Liberation Mono", "Courier New", "monospace"],
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
                "shimmer": "shimmer 2s linear infinite",
                "fade-in": "fade-in 0.5s ease-out",
                "slide-in": "slide-in 0.3s ease-out",
            },
            keyframes: {
                "accordion-down": {
                    from: { height: "0" },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: "0" },
                },
                shimmer: {
                    from: { backgroundPosition: "0 0" },
                    to: { backgroundPosition: "-200% 0" },
                },
                "fade-in": {
                    from: { opacity: "0", transform: "translateY(5px)" },
                    to: { opacity: "1", transform: "translateY(0)" },
                },
                "slide-in": {
                    from: { transform: "translateX(-10px)", opacity: "0" },
                    to: { transform: "translateX(0)", opacity: "1" },
                }
            },
        },
    },
    plugins: [],
};
export default config;
