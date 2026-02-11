#!/usr/bin/env node

import { Command } from "commander";
import chalk from "chalk";
import ora from "ora";
import fs from "fs-extra";
import path from "path";
import fetch from "node-fetch";

const program = new Command();
const BASE_URL = "http://localhost:3000"; // In production, this would be your hosted URL

program
    .name("neuralui")
    .description("Add Neural UI components to your project")
    .version("1.0.0");

program
    .command("add")
    .argument("[component]", "name of the component to add")
    .description("Add a component to your project")
    .action(async (componentName) => {
        if (!componentName) {
            console.log(chalk.red("Please specify a component name."));
            process.exit(1);
        }
        const spinner = ora(`Adding ${componentName}...`).start();

        try {
            // 1. Fetch component JSON from registry
            const response = await fetch(`${BASE_URL}/registry/${componentName}.json`);

            if (!response.ok) {
                throw new Error(`Component '${componentName}' not found in registry.`);
            }

            const componentData = await response.json();

            // 2. Identify destination path
            // Assuming Next.js project structure
            const componentsDir = path.join(process.cwd(), "src", "components", "ui", componentData.category || "core");

            // Ensure directory exists
            await fs.ensureDir(componentsDir);

            // 3. Write file
            const filePath = path.join(componentsDir, `${componentData.name}.tsx`);

            // In a real CLI, we would transform imports (e.g. "@/lib/utils") based on user's alias configuration
            // For this demo, we write the content as is
            await fs.writeFile(filePath, componentData.files[0].content);

            spinner.succeed(chalk.green(`Component ${componentName} added to ${filePath}`));

            // 4. Show dependencies to install
            if (componentData.dependencies?.length) {
                console.log(chalk.blue(`\nMake sure to install dependencies:`));
                console.log(chalk.white(`npm install ${componentData.dependencies.join(" ")}`));
            }

        } catch (error) {
            spinner.fail(chalk.red(`Failed to add component: ${error.message}`));
        }
    });

program.parse();
