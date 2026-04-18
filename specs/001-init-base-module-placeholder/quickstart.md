# Quickstart: Phase 1 — Init Base with Module Placeholders

**Purpose**: Step-by-step guide for a developer to scaffold and run the project from scratch.
**Audience**: Developer implementing Phase 1 tasks.
**Prerequisites**: Node.js ≥ 20.19 (22.14 available), pnpm ≥ 10

---

## Step 1: Scaffold Vite + React + TypeScript

The project root already has `package.json` (from Speckit). Initialise Vite **in-place**:

```bash
# From repository root
pnpm create vite@latest . --template react-ts
# When prompted "Current directory is not empty. Remove existing files and continue?"
# Answer: No → choose "Ignore files and continue" to preserve .specify/, .github/, specs/
pnpm install
```

Verify:
```bash
pnpm dev
# → App runs at http://localhost:5173
```

---

## Step 2: Add Tailwind CSS 4 via Vite Plugin

```bash
pnpm add -D tailwindcss @tailwindcss/vite
```

Update `vite.config.ts`:
```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

Replace the contents of `src/index.css` with:
```css
@import "tailwindcss";
```

---

## Step 3: Configure Path Alias (required by shadcn/ui)

```bash
pnpm add -D @types/node
```

Update `vite.config.ts` to add path alias:
```typescript
import path from "path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```

Update `tsconfig.json` (and `tsconfig.app.json` if present) `compilerOptions`:
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

---

## Step 4: Initialise shadcn/ui

```bash
pnpm dlx shadcn@latest init
```

When prompted:
- Style: **Default**
- Base color: **Slate**
- CSS variables: **Yes**

This creates `components.json` and `src/lib/utils.ts` with the `cn()` utility.

> **FSD note**: Move `src/lib/utils.ts` to `src/shared/lib/utils.ts` and update
> `components.json` to point `utils` alias to `@/shared/lib/utils`.

---

## Step 5: Install and Configure Biome

```bash
pnpm add --save-dev --save-exact @biomejs/biome
pnpm dlx @biomejs/biome init
```

Replace the generated `biome.json` content:
```json
{
  "$schema": "https://biomejs.dev/schemas/2.0.0/schema.json",
  "vcs": {
    "enabled": true,
    "clientKind": "git",
    "useIgnoreFile": true
  },
  "files": {
    "ignoreUnknown": false,
    "ignore": ["node_modules", "dist", ".specify"]
  },
  "formatter": {
    "enabled": true,
    "indentStyle": "space",
    "indentWidth": 2,
    "lineWidth": 100
  },
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true
    }
  },
  "javascript": {
    "formatter": {
      "quoteStyle": "double",
      "jsxQuoteStyle": "double",
      "trailingCommas": "all",
      "semicolons": "always"
    }
  }
}
```

Add scripts to `package.json`:
```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "lint": "biome lint ./src",
    "format": "biome format --write ./src",
    "check": "biome check --write ./src",
    "type-check": "tsc --noEmit"
  }
}
```

Remove any ESLint config files if they were created by the Vite template:
```bash
rm -f .eslintrc* eslint.config* .eslintignore
```

Verify Biome is clean on the initial scaffold:
```bash
pnpm check
# → Should report 0 errors
```

---

## Step 6: Install React Router DOM

```bash
pnpm add react-router-dom
```

---

## Step 7: Build the FSD Directory Structure

Create all required directories:
```bash
mkdir -p src/app
mkdir -p src/pages/module-view/ui
mkdir -p src/widgets/sidebar/ui
mkdir -p src/features/basic-c-syntax/ui
mkdir -p src/features/data-types/ui
mkdir -p src/features/input-output/ui
mkdir -p src/features/functions/ui
mkdir -p src/features/if-statement/ui
mkdir -p src/features/for-loop/ui
mkdir -p src/features/arrays/ui
mkdir -p src/features/strings/ui
mkdir -p src/features/file-handling/ui
mkdir -p src/features/examples/ui
mkdir -p src/entities/module/model
mkdir -p src/entities/module/config
mkdir -p src/shared/ui
mkdir -p src/shared/lib
mkdir -p src/shared/config
```

---

## Step 8: Implement Core Files

Implement in this order (each depends on the previous):

1. **`src/entities/module/model/module.types.ts`** — `Module`, `ModuleStatus`, `ModuleRegistry` types
2. **`src/entities/module/config/modules.ts`** — `MODULE_REGISTRY` constant with all 10 modules
3. **`src/entities/module/index.ts`** — barrel export
4. **`src/shared/config/routes.ts`** — `ROUTES` constants
5. **`src/shared/lib/utils.ts`** — `cn()` utility (shadcn standard, already created in Step 4)
6. **`src/features/*/ui/*Page.tsx`** — 10 placeholder page components (can be done in parallel)
7. **`src/features/*/index.ts`** — 10 barrel exports
8. **`src/widgets/sidebar/ui/SidebarItem.tsx`** — single nav item component
9. **`src/widgets/sidebar/ui/Sidebar.tsx`** — sidebar container
10. **`src/widgets/sidebar/index.ts`** — barrel export
11. **`src/pages/module-view/ui/ModuleViewPage.tsx`** — dashboard layout page
12. **`src/pages/module-view/index.ts`** — barrel export
13. **`src/app/router.tsx`** — router definition
14. **`src/app/App.tsx`** — root component
15. **`src/main.tsx`** — update to mount `<App />`

---

## Step 9: Verify the Full Flow

```bash
pnpm dev
```

Checklist:
- [ ] `http://localhost:5173/` redirects to `/modules/basic-c-syntax`
- [ ] Sidebar shows all 10 module names in correct order
- [ ] Clicking each sidebar item updates the right panel and highlights the active item
- [ ] Keyboard navigation (Tab + Enter) works on sidebar items
- [ ] Layout is functional at 375 px viewport width (browser DevTools resize)
- [ ] `pnpm check` exits with 0 errors
- [ ] `pnpm type-check` exits with 0 errors

---

## Helpful Commands

```bash
pnpm dev          # Start dev server
pnpm build        # Production build
pnpm check        # Biome lint + format check
pnpm type-check   # TypeScript strict check

# Add shadcn/ui components as needed:
pnpm dlx shadcn@latest add button
pnpm dlx shadcn@latest add scroll-area
```
