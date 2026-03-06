# Contributing to NeuralUI

First off, thank you for considering contributing to NeuralUI! 🎉

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [How to Contribute](#how-to-contribute)
- [Creating a New Component](#creating-a-new-component)
- [Commit Convention](#commit-convention)
- [Pull Request Process](#pull-request-process)

---

## Code of Conduct

By participating, you agree to maintain a welcoming and inclusive environment.

---

## Getting Started

1. **Fork** the repository on GitHub
2. **Clone** your fork locally:
   ```bash
   git clone https://github.com/your-username/neuralui.git
   cd neuralui
   ```
3. **Install** dependencies:
   ```bash
   npm install
   ```
4. **Start** the development server:
   ```bash
   npm run dev
   ```
5. Open `http://localhost:3000` to see the docs site

---

## Development Setup

### Project Structure

```
neuralui/
├── src/
│   ├── app/
│   │   ├── page.tsx          # Landing page
│   │   └── docs/page.tsx     # Component documentation
│   └── components/
│       └── ui/
│           ├── core/         # Core primitives (Button, Input, etc.)
│           ├── ai/           # AI-specific components
│           ├── crypto/       # Crypto-specific components
│           ├── data/         # Data visualization
│           ├── ex/           # Special effects (Spotlight, Magnetic)
│           └── patterns/     # Composite patterns (BentoGrid, Carousel)
├── cli/                      # npm CLI tool (neuralui)
├── scripts/
│   └── build-registry.mjs   # Generates public/registry/*.json
└── public/
    └── registry/            # Component JSON registry (auto-generated)
```

### Regenerating the Registry

After modifying components, regenerate the registry:

```bash
node scripts/build-registry.mjs
```

---

## How to Contribute

### Reporting Bugs

Use the [Bug Report](.github/ISSUE_TEMPLATE/bug_report.md) template.

Include:
- Browser & OS version
- Steps to reproduce
- Expected vs actual behavior
- Code snippet or link to reproduction

### Suggesting Features

Open a [Feature Request](.github/ISSUE_TEMPLATE/feature_request.md). Describe the component/feature and its use case in AI or crypto applications.

### Submitting a Pull Request

1. Create a feature branch from `main`:
   ```bash
   git checkout -b feat/your-component-name
   ```
2. Make your changes
3. Run lint checks:
   ```bash
   npm run lint
   ```
4. Commit using [conventional commits](#commit-convention)
5. Push and open a Pull Request

---

## Creating a New Component

### 1. Choose the right category

| Category | Use for |
|----------|---------|
| `core/` | Generic, reusable primitives |
| `ai/` | AI-specific (chat, agents, streaming) |
| `crypto/` | Blockchain/DeFi interfaces |
| `data/` | Charts, tables, code editors |
| `ex/` | Visual effects, special interactions |
| `patterns/` | Composite layouts |

### 2. Component template

```tsx
"use client";

import { cn } from "@/lib/utils";

// Always export Props interface
export interface MyComponentProps {
  className?: string;
  // ...your props
}

export const MyComponent = ({ className, ...props }: MyComponentProps) => {
  return (
    <div
      className={cn(
        // Base styles using Tailwind
        "rounded-2xl border border-white/5 bg-zinc-900/40",
        className
      )}
      {...props}
    >
      {/* Component content */}
    </div>
  );
};
```

### 3. Design guidelines

- **Background**: `bg-zinc-900/40` or `bg-[#09090b]`
- **Borders**: `border-white/5` (default), `border-emerald-500/20` (active)
- **Accent**: `text-emerald-400`, `bg-emerald-500`
- **Numbers/data**: Always wrap in `font-mono` with `tabular-nums`
- **Animations**: Use Framer Motion, target 60fps
- **Accessibility**: Use Radix UI primitives where applicable

### 4. Add to docs

Add your component to `src/app/docs/page.tsx` in the appropriate category with:
- Live preview (`component:`)
- Code snippet (`code:`)
- At least one variant (`variants:`)

---

## Commit Convention

We use [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add NeuralRadioGroup component
fix: NeuralButton loading state layout shift
docs: update installation guide
chore: regenerate registry
refactor: extract useToast hook
```

Types: `feat`, `fix`, `docs`, `chore`, `refactor`, `test`, `perf`

---

## Pull Request Process

1. Ensure your PR title follows the commit convention
2. Add a description of what changed and why
3. Include screenshots or a short video for visual changes
4. Link any related issues with `Fixes #123`
5. PRs require 1 review approval before merging

---

Thank you for making NeuralUI better! 💚
