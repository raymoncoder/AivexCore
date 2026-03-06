#!/usr/bin/env node

import { Command } from "commander";
import chalk from "chalk";
import ora from "ora";
import fs from "fs-extra";
import path from "path";
import fetch from "node-fetch";
import { execSync } from "child_process";

const program = new Command();

// Production URL — points to the deployed registry on Vercel
const BASE_URL = process.env.AIVEXCORE_REGISTRY_URL || "https://aivexcore.vercel.app";

// Detect package manager
function detectPackageManager() {
    if (fs.existsSync("bun.lockb")) return "bun";
    if (fs.existsSync("pnpm-lock.yaml")) return "pnpm";
    if (fs.existsSync("yarn.lock")) return "yarn";
    return "npm";
}

// Print aivexcore banner
function printBanner() {
    console.log(chalk.bold.green("\n  ⚡ AivexCore CLI\n"));
}

program
    .name("aivexcore")
    .description("Add AivexCore UI components to your Next.js project")
    .version("0.1.0");

// ─── INIT command ────────────────────────────────────────────────────────────
program
    .command("init")
    .description("Initialize aivexcore in your project (adds utils and installs dependencies)")
    .action(async () => {
        printBanner();
        const pm = detectPackageManager();
        const spinner = ora("Initializing aivexcore...").start();

        try {
            // 1. Create src/lib/utils.ts if it doesn't exist
            const utilsPath = path.join(process.cwd(), "src", "lib", "utils.ts");
            if (!fs.existsSync(utilsPath)) {
                await fs.ensureDir(path.dirname(utilsPath));
                await fs.writeFile(
                    utilsPath,
                    `import { clsx, type ClassValue } from "clsx";\nimport { twMerge } from "tailwind-merge";\n\nexport function cn(...inputs: ClassValue[]) {\n  return twMerge(clsx(inputs));\n}\n`
                );
                spinner.text = "Created src/lib/utils.ts";
            }

            // 2. Install core dependencies
            const deps = [
                "framer-motion",
                "lucide-react",
                "clsx",
                "tailwind-merge",
                "@radix-ui/react-dialog",
                "@radix-ui/react-switch",
                "@radix-ui/react-checkbox",
            ];

            spinner.text = `Installing dependencies with ${pm}...`;

            const installCmd = pm === "yarn"
                ? `yarn add ${deps.join(" ")}`
                : pm === "pnpm"
                    ? `pnpm add ${deps.join(" ")}`
                    : pm === "bun"
                        ? `bun add ${deps.join(" ")}`
                        : `npm install ${deps.join(" ")}`;

            execSync(installCmd, { stdio: "pipe" });

            spinner.succeed(chalk.green("AivexCore initialized successfully!"));
            console.log(chalk.dim("\n  Next step: add your first component"));
            console.log(chalk.white("  npx aivexcore@latest add AivexButton\n"));

        } catch (error) {
            spinner.fail(chalk.red(`Initialization failed: ${error.message}`));
            process.exit(1);
        }
    });

// ─── ADD command ─────────────────────────────────────────────────────────────
program
    .command("add")
    .argument("[components...]", "name(s) of the component(s) to add")
    .description("Add one or more components to your project")
    .option("--path <path>", "custom output directory (default: src/components/ui)")
    .option("--overwrite", "overwrite existing files without asking")
    .action(async (components, options) => {
        printBanner();

        if (!components || components.length === 0) {
            // Fetch and show available components
            const spinner = ora("Fetching component registry...").start();
            try {
                const response = await fetch(`${BASE_URL}/registry/index.json`);
                if (!response.ok) throw new Error("Could not reach registry.");
                const registry = await response.json();
                spinner.stop();

                console.log(chalk.bold("  Available components:\n"));
                const byCategory = {};
                for (const comp of registry) {
                    if (!byCategory[comp.category]) byCategory[comp.category] = [];
                    byCategory[comp.category].push(comp.name);
                }
                for (const [cat, comps] of Object.entries(byCategory)) {
                    console.log(chalk.dim(`  ${cat}/`));
                    console.log(chalk.white(`    ${comps.join("  ·  ")}`));
                    console.log();
                }
            } catch {
                spinner.fail(chalk.red("Could not fetch registry. Is https://aivexcore.vercel.app reachable?"));
            }
            return;
        }

        const pm = detectPackageManager();

        for (const componentName of components) {
            const spinner = ora(`Adding ${chalk.bold(componentName)}...`).start();

            try {
                // 1. Fetch component JSON from registry
                const response = await fetch(`${BASE_URL}/registry/${componentName}.json`);

                if (!response.ok) {
                    throw new Error(`Component '${componentName}' not found in registry.\n  Run ${chalk.white("npx aivexcore@latest add")} to see all available components.`);
                }

                const componentData = await response.json();

                // 2. Determine output path
                const baseDir = options.path
                    ? path.join(process.cwd(), options.path)
                    : path.join(process.cwd(), "src", "components", "ui", componentData.category || "core");

                await fs.ensureDir(baseDir);

                const fileName = componentData.files[0].path.split('/').pop() || `${componentData.name}.tsx`;
                const filePath = path.join(baseDir, fileName);

                // 3. Check if file exists
                if (fs.existsSync(filePath) && !options.overwrite) {
                    spinner.warn(chalk.yellow(`${componentName} already exists. Use --overwrite to replace.`));
                    continue;
                }

                // 4. Write component file
                await fs.writeFile(filePath, componentData.files[0].content);

                spinner.succeed(chalk.green(`✓ ${componentName}`) + chalk.dim(` → ${path.relative(process.cwd(), filePath)}`));

                // 5. Auto-install npm dependencies
                if (componentData.dependencies?.length) {
                    const depsSpinner = ora(chalk.dim(`  Installing: ${componentData.dependencies.join(", ")}`)).start();
                    try {
                        const installCmd = pm === "yarn"
                            ? `yarn add ${componentData.dependencies.join(" ")}`
                            : pm === "pnpm"
                                ? `pnpm add ${componentData.dependencies.join(" ")}`
                                : pm === "bun"
                                    ? `bun add ${componentData.dependencies.join(" ")}`
                                    : `npm install ${componentData.dependencies.join(" ")}`;
                        execSync(installCmd, { stdio: "pipe" });
                        depsSpinner.succeed(chalk.dim(`  Dependencies installed.`));
                    } catch {
                        depsSpinner.warn(chalk.yellow(`  Could not auto-install. Run manually:\n  ${pm} install ${componentData.dependencies.join(" ")}`));
                    }
                }

            } catch (error) {
                spinner.fail(chalk.red(`Failed to add '${componentName}': ${error.message}`));
            }
        }

        console.log(); // newline at end
    });

// ─── LIST command ────────────────────────────────────────────────────────────
program
    .command("list")
    .description("List all available components in the registry")
    .action(async () => {
        printBanner();
        const spinner = ora("Fetching registry...").start();
        try {
            const response = await fetch(`${BASE_URL}/registry/index.json`);
            if (!response.ok) throw new Error("Could not reach registry.");
            const registry = await response.json();
            spinner.stop();

            const byCategory = {};
            for (const comp of registry) {
                if (!byCategory[comp.category]) byCategory[comp.category] = [];
                byCategory[comp.category].push(comp.name);
            }

            console.log(chalk.bold(`  ${registry.length} components available:\n`));
            for (const [cat, comps] of Object.entries(byCategory)) {
                console.log(chalk.bold.white(`  ${cat}/`) + chalk.dim(` (${comps.length})`));
                for (const comp of comps) {
                    console.log(chalk.dim("  │ ") + chalk.white(comp));
                }
                console.log();
            }
        } catch (error) {
            spinner.fail(chalk.red(`Failed to fetch registry: ${error.message}`));
        }
    });

program.parse();
