<div align="center">
  <img src="public/logo.svg" alt="AivexCore Logo" width="64" height="64" />
  <h1>AivexCore</h1>
  <p><strong>The UI library for Agentic AI and Crypto applications.</strong></p>
  <p>
    <a href="https://npmjs.org/package/AivexCore"><img src="https://img.shields.io/npm/v/AivexCore?style=flat-square&color=10b981" alt="npm version" /></a>
    <a href="https://npmjs.org/package/AivexCore"><img src="https://img.shields.io/npm/dm/AivexCore?style=flat-square&color=10b981" alt="downloads" /></a>
    <a href="LICENSE"><img src="https://img.shields.io/github/license/yourusername/AivexCore?style=flat-square&color=10b981" alt="license" /></a>
    <img src="https://img.shields.io/badge/React-19-blue?style=flat-square" alt="React 19" />
    <img src="https://img.shields.io/badge/Next.js-15-black?style=flat-square" alt="Next.js" />
    <img src="https://img.shields.io/badge/Tailwind-v4-38bdf8?style=flat-square" alt="Tailwind v4" />
  </p>
    <a href="CHANGELOG.md">Changelog</a>
  </p>
</div>

---

AivexCore is a collection of **54+ open-source, copy-paste UI components** built specifically for AI dashboards and cryptocurrency applications. Designed with a cinematic dark aesthetic, 60fps Framer Motion animations, and accessibility via Radix UI primitives.

## ✨ Why AivexCore?

Unlike general-purpose libraries (shadcn, Material UI), AivexCore is purpose-built for the **next generation of AI and crypto applications**:

- 🤖 **AI-native components** — `AIChatInterface`, `StreamingText`, `AgentThoughtFlow`, `AgentActivityFeed`, `ModelParameters`, `StepProcess`
- 🪙 **Crypto-native components** — `SwapCard`, `WalletConnectModal`, `PriceMetric`, `TokenPerformance`, `AddressBadge`
- 📊 **Data visualization** — `RadarChart`, `MiniSparkline`, `AnalyticsCard`, `AivexDataTable`
- 🎬 **Cinematic aesthetics** — Glassmorphism, GPU-accelerated animations, premium dark mode

## 🚀 Quick Start

AivexCore uses a **copy-paste model** (like shadcn/ui) — components are added directly to your codebase, giving you full ownership.

```bash
# Add a component to your project
npx AivexCore@latest add Aivex-button

# Add multiple components at once
npx AivexCore@latest add Aivex-input Aivex-badge Aivex-card
```

## 📦 Installation

### Prerequisites

- Node.js 18+
- Next.js 14+ (App Router)
- React 18+
- Tailwind CSS 3+

### 1. Install peer dependencies

```bash
npm install framer-motion lucide-react clsx tailwind-merge @radix-ui/react-dialog @radix-ui/react-switch @radix-ui/react-checkbox
```

### 2. Add the `cn` utility

Create `src/lib/utils.ts`:

```typescript
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### 3. Add a component

```bash
npx AivexCore@latest add Aivex-button
```

### 4. Use it

```tsx
import { AivexButton } from "@/components/ui/core/AivexButton";

export default function Page() {
  return (
    <AivexButton variant="neon" size="lg">
      Initialize Core
    </AivexButton>
  );
}
```

## 🧩 Component Categories

### Core Primitives
`AivexButton` · `AivexInput` · `AivexCard` · `AivexBadge` · `AivexSelect` · `AivexTabs` · `AivexDialog` · `AivexToaster` · `AivexSwitch` · `AivexCheckbox` · `AivexSlider` · `AivexProgress` · `AivexTooltip` · `AivexAlert` · `AivexAvatar` · `AivexAccordion` · `AivexBreadcrumb` · `AivexSkeleton` · `AivexLoader` · `AivexMarquee` · `AivexOTPInput` · `AivexPasswordInput` · `AivexDatePicker` · `FileUploadZone` · `DragDropList` · `CustomScrollBar`

### AI Components
`AIChatInterface` · `StreamingText` · `AgentThoughtFlow` · `AgentActivityFeed` · `ModelParameters` · `StepProcess`

### Crypto Components
`SwapCard` · `WalletConnectModal` · `PriceMetric` · `TokenPerformance` · `AddressBadge`

### Data & Visualization
`RadarChart` · `MiniSparkline` · `AnalyticsCard` · `AivexDataTable` · `CommandPalette` · `AivexCodeEditor` · `AivexExportButton`

### Effects & Patterns
`SpotlightCard` · `Magnetic` · `AivexCommandBar` · `AivexBentoGrid` · `AivexCarousel`

## 🛠️ CLI Reference

```bash
# Add a specific component
npx AivexCore@latest add <component-name>

# Examples
npx AivexCore@latest add ai-chat-interface
npx AivexCore@latest add swap-card
npx AivexCore@latest add radar-chart
npx AivexCore@latest add spotlight-card
```

## 🎨 Design System

AivexCore is built on a consistent design language:

| Token | Value |
|-------|-------|
| **Primary accent** | Emerald 500 (`#10b981`) |
| **Background** | `#050505` / `#09090b` |
| **Monospace font** | JetBrains Mono |
| **UI font** | Inter |
| **Animation target** | 60fps GPU-accelerated |

All numerical values, currency, and timestamps automatically use `font-mono` with `tabular-nums`.

## Support & Donations

If you find AivexCore useful and would like to support its development, you can donate to the following addresses:

- **USDT (TRC20):** `TVgHuxxjb3BVzJsh2PqQL1p5jwgSbMG5wa`
- **ETH (ERC20):** `0xcd0b27dc16110eef3670b25620ed80c701a40b48`
- **BTC (Native SegWit):** `bc1pqwve2d2xr5vx79uqrld3nzar660y9qnez27wwdasax5c5evwktrsdde6q4`

Your support helps maintain the infrastructure and keep the high-end component registry free for everyone.

## License

This project is licensed under the [MIT License](LICENSE).

---

<div align="center">
  <p>Built for the future of AI. ⚡</p>
</div>
