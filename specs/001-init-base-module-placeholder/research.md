# Research: Phase 1 — Init Base with Module Placeholders

**Generated**: 2026-04-18
**Feature**: Phase 1 Init Base with Module Placeholders
**Resolves**: All NEEDS CLARIFICATION items from Technical Context

---

## 1. Build Tooling: Vite + React + TypeScript

**Decision**: Vite 6.x with `@vitejs/plugin-react` and TypeScript 5.8+

**Rationale**: Vite is the mandated build tool (constitution). The `react-ts` template
bootstraps the entire setup in one command. Node.js 22.14 is available on the host,
which exceeds the ≥20.19 requirement.

**Key commands**:

```bash
pnpm create vite@latest . --template react-ts
pnpm install
```

**Alternatives considered**:

- Next.js — rejected (SSR overhead not needed; SPA is sufficient; no server runtime)
- CRA — rejected (deprecated; Vite is the current standard)

---

## 2. Tailwind CSS Integration

**Decision**: Tailwind CSS 4.x via `@tailwindcss/vite` Vite plugin

**Rationale**: The `@tailwindcss/vite` plugin is the modern approach for Vite projects.
It eliminates the PostCSS + autoprefixer setup entirely, reducing config surface area.
A single `@import "tailwindcss"` in `src/index.css` is all that is needed.

**vite.config.ts addition**:

```typescript
import tailwindcss from "@tailwindcss/vite";
// plugins: [react(), tailwindcss()]
```

**CSS entry** (`src/index.css`):

```css
@import "tailwindcss";
```

**Alternatives considered**:

- Tailwind v3 with PostCSS — rejected (v4 + `@tailwindcss/vite` is simpler and current)
- UnoCSS — rejected (not mandated by constitution; shadcn/ui targets Tailwind)

---

## 3. shadcn/ui Setup

**Decision**: `pnpm dlx shadcn@latest init` after Vite scaffold; use `--base-color slate`
and `--style default`

**Rationale**: shadcn/ui is mandated by the constitution. The CLI handles component.json,
installs `clsx` + `tailwind-merge`, and creates `src/lib/utils.ts` (the `cn()` utility).

**Required prerequisites** (before running shadcn init):

1. Path alias `@/*` → `./src/*` in both `tsconfig.json` and `vite.config.ts`
2. `pnpm add -D @types/node` (for `path.resolve` in vite.config.ts)

**tsconfig.json addition**:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": { "@/*": ["./src/*"] }
  }
}
```

**vite.config.ts alias**:

```typescript
import path from "path";
// resolve: { alias: { "@": path.resolve(__dirname, "./src") } }
```

**Alternatives considered**:

- Radix UI directly — rejected (shadcn/ui is the mandated wrapper)
- MUI / Chakra — rejected (constitution forbids additional UI component libraries)

---

## 4. Biome as Sole Formatter/Linter

**Decision**: Biome 2.x (latest stable), installed as exact version dev dependency

**Rationale**: Biome replaces ESLint + Prettier in a single tool. The `biome.json`
config is minimal. No `.eslintrc`, `prettier.config.js`, or `.editorconfig` should exist.

**Installation**:

```bash
pnpm add --save-dev --save-exact @biomejs/biome
pnpm dlx @biomejs/biome init
```

**package.json scripts**:

```json
{
  "lint": "biome lint ./src",
  "format": "biome format --write ./src",
  "check": "biome check --write ./src"
}
```

**biome.json** (minimal recommended for React + TypeScript):

```json
{
  "$schema": "https://biomejs.dev/schemas/2.0.0/schema.json",
  "vcs": { "enabled": true, "clientKind": "git", "useIgnoreFile": true },
  "files": { "ignoreUnknown": false },
  "formatter": { "enabled": true, "indentStyle": "space", "indentWidth": 2 },
  "linter": {
    "enabled": true,
    "rules": { "recommended": true }
  },
  "javascript": {
    "formatter": { "quoteStyle": "double", "jsxQuoteStyle": "double" }
  }
}
```

**Gotcha**: Biome does not yet support all ESLint plugins (e.g., `eslint-plugin-react-hooks`).
As of Biome 2.x, React-specific rules are partially covered. Any gaps can be accepted for
Phase 1 since no complex hooks are used.

**Alternatives considered**:

- ESLint + Prettier — rejected (FR-007 mandates Biome as the sole tool)
- oxc-lint — rejected (not mandated; Biome is the established team choice)

---

## 5. Feature Sliced Design (FSD) Structure

**Decision**: Standard 6-layer FSD (`app` → `pages` → `widgets` → `features` → `entities` → `shared`)

**Rationale**: FSD enforces the Module-First Architecture principle (Constitution I).
Each C concept is a **feature slice** — independently developable, with a public API
via `index.ts`. No inter-feature imports are permitted; communication goes through
`entities` or `shared`.

**Layer mapping for this project**:

| FSD Layer  | Contents for Phase 1                                                  |
| ---------- | --------------------------------------------------------------------- |
| `app`      | `App.tsx`, `router.tsx`, `providers.tsx`                              |
| `pages`    | `module-view/` — layout page composing Sidebar + active feature panel |
| `widgets`  | `sidebar/` — sidebar container with module list                       |
| `features` | 10 C concept slices, each with a placeholder `Page.tsx`               |
| `entities` | `module/` — `Module` type, `MODULE_REGISTRY` constant                 |
| `shared`   | `ui/` (shadcn re-exports), `lib/utils.ts`, `config/routes.ts`         |

**Public API rule**: Every slice exports **only** through its `index.ts`. Cross-slice
imports using internal paths (e.g., `features/basic-c-syntax/ui/BasicCSyntaxPage`) are
forbidden; always use `features/basic-c-syntax`.

**Alternatives considered**:

- Atomic Design (atoms/molecules/organisms) — rejected (FSD is mandated by spec and better
  suits content-heavy apps with independent feature growth)
- Flat `src/components/` structure — rejected (no isolation guarantee)

---

## 6. Routing

**Decision**: React Router DOM v7 with `<BrowserRouter>` and route-per-module pattern

**Rationale**: React Router v7 is the current standard. Each module is addressable at
`/modules/:moduleSlug`. The router is configured in `app/router.tsx` (FSD app layer).

**URL scheme** (see contracts/routing.md for full spec):

```
/                          → redirect to /modules/basic-c-syntax
/modules/:moduleSlug       → renders ModuleViewPage with the matching feature slice
```

**Slug values** (exact, matching `MODULE_REGISTRY` in `entities/module/config/modules.ts`):
`basic-c-syntax`, `data-types`, `input-output`, `functions`, `if-statement`,
`for-loop`, `arrays`, `strings`, `file-handling`, `examples`

**Alternatives considered**:

- TanStack Router — rejected (React Router is more established; no advanced routing
  features needed in Phase 1 to justify the switch)
- Hash-based routing (`/#/modules/...`) — rejected (clean URL routing preferred for
  shareability and future SEO considerations)

---

## 7. Module Registry Pattern

**Decision**: Static TypeScript constant `MODULE_REGISTRY` in `entities/module/config/modules.ts`

**Rationale**: The 10 modules are fixed for Phase 1 (per Assumptions in spec). A typed
constant array is the simplest approach — no CMS, no API, no dynamic loading needed.
The type definition lives in `entities/module/model/module.types.ts`.

**Data shape** (see data-model.md for full schema):

```typescript
interface Module {
  id: string; // e.g. "basic-c-syntax"
  slug: string; // URL segment, same as id for simplicity
  title: string; // Display name in sidebar
  order: number; // 1-based index for sidebar ordering
  status: "available" | "coming-soon"; // Phase 1: all "available" (placeholder rendered)
}
```

**Alternatives considered**:

- Dynamic imports with lazy loading per module — deferred to future phases when actual
  module content is added; premature for Phase 1 stubs
- JSON data file — rejected (TypeScript constant gives type safety without extra parsing)

---

## Summary: All NEEDS CLARIFICATION Items Resolved

| Unknown                          | Resolution                                                   |
| -------------------------------- | ------------------------------------------------------------ |
| Vite version                     | 6.x (`pnpm create vite@latest --template react-ts`)          |
| Tailwind integration method      | `@tailwindcss/vite` plugin v4 (no PostCSS)                   |
| shadcn/ui path alias requirement | `@/*` → `./src/*` in tsconfig + vite.config                  |
| Biome version and config         | 2.x, `pnpm add --save-exact @biomejs/biome`                  |
| FSD layer for routing            | `app` layer (`app/router.tsx`)                               |
| Module registry location         | `entities/module/config/modules.ts`                          |
| Router choice                    | React Router DOM v7, `BrowserRouter`, `/modules/:moduleSlug` |
