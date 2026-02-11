import fs from 'fs';
import path from 'path';

const COMPONENTS_DIR = path.join(process.cwd(), 'src/components/ui');
const REGISTRY_DIR = path.join(process.cwd(), 'public/registry');

// Create registry directory
if (!fs.existsSync(REGISTRY_DIR)) {
    fs.mkdirSync(REGISTRY_DIR, { recursive: true });
}

// Registry index
const registry = [];

// Helper to sanitize component name
const sanitize = (name) => name.replace('.tsx', '').replace('.ts', '');

// Traverse directories
const categories = fs.readdirSync(COMPONENTS_DIR);

for (const category of categories) {
    const categoryPath = path.join(COMPONENTS_DIR, category);
    if (!fs.statSync(categoryPath).isDirectory()) continue;

    const files = fs.readdirSync(categoryPath);
    for (const file of files) {
        if (!file.endsWith('.tsx') && !file.endsWith('.ts')) continue;

        const name = sanitize(file);
        const filePath = path.join(categoryPath, file);
        const content = fs.readFileSync(filePath, 'utf-8');

        // Identify dependencies (simple regex for now)
        const dependencies = [];
        const imports = content.match(/from "([^"]+)"/g) || [];
        imports.forEach(imp => {
            const dep = imp.match(/from "([^"]+)"/)[1];
            if (!dep.startsWith('.') && !dep.startsWith('@/')) {
                dependencies.push(dep);
            }
        });

        // Identify registry dependencies (local imports)
        const registryDependencies = [];
        const localImports = content.match(/from "@\/components\/ui\/([^"]+)"/g) || [];
        localImports.forEach(imp => {
            const dep = imp.match(/from "@\/components\/ui\/([^"]+)"/)[1];
            const parts = dep.split('/');
            const compName = parts[parts.length - 1]; // simplifying
            registryDependencies.push(compName);
        });


        const componentData = {
            name,
            type: `components:ui`,
            dependencies: [...new Set(dependencies)],
            registryDependencies: [...new Set(registryDependencies)],
            files: [
                {
                    path: `${category}/${file}`,
                    content: content
                }
            ],
            category
        };

        // Write individual component JSON
        fs.writeFileSync(
            path.join(REGISTRY_DIR, `${name}.json`),
            JSON.stringify(componentData, null, 2)
        );

        registry.push({
            name,
            dependencies: componentData.dependencies,
            registryDependencies: componentData.registryDependencies,
            category
        });
    }
}

// Write main index
fs.writeFileSync(
    path.join(REGISTRY_DIR, 'index.json'),
    JSON.stringify(registry, null, 2)
);

console.log('✅ Registry built successfully!');
