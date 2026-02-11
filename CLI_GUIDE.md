# Neural UI CLI Guide

This guide explains how to distribute your components via a CLI tool, similar to shadcn/ui.

## Architecture

1.  **Registry**: A JSON API that serves component code and metadata.
    *   Located in `public/registry`.
    *   Generated automatically from `src/components/ui` via `scripts/build-registry.mjs`.
2.  **CLI Tool**: A Node.js executable that fetches components from the Registry and adds them to a user's project.
    *   Located in `cli/`.

## 1. Generating the Registry

Run the build script to update the registry whenever you modify components:

```bash
node scripts/build-registry.mjs
```

This creates:
- `public/registry/index.json`: List of all components.
- `public/registry/<component-name>.json`: Individual component data.

## 2. The CLI Tool

The CLI is located in `cli/`. It is a separate package that you can publish to npm.

### development
To test the CLI locally:

1.  Start your Next.js app (to serve the registry):
    ```bash
    npm run dev
    ```
    (Ensure it runs on port 3000, or update `cli/bin/index.js` `BASE_URL`).

2.  Run the CLI from another terminal:
    ```bash
    cd cli
    node bin/index.js add neural-button
    ```

### Publishing

To let users run `npx create-neural-ui`, you must publish the `cli` folder to npm:

1.  Navigate to `cli/`.
2.  Update `package.json` with your details.
3.  Run `npm publish --access public`.

Users can then run:
```bash
npx create-neural-ui@latest add neural-button
```
