# Implementation Plan: Phase 1 — Init Base with Module Placeholders

**Branch**: `001-init-base-module-placeholder` | **Date**: 2026-04-18 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `specs/001-init-base-module-placeholder/spec.md`

## Summary

Bootstrap the LearnC SPA with a functional dashboard shell: Vite + React 18 + TypeScript
(strict) + Tailwind CSS 4 + shadcn/ui, structured using Feature Sliced Design. A fixed
left sidebar lists all 10 C concept modules; clicking any entry renders that module's
placeholder panel on the right. Biome is the sole formatter/linter. No module content,
editors, or visualizations are delivered in this phase — only the navigable skeleton.

## Technical Context

**Language/Version**: TypeScript 5.8+ (strict mode), Node.js 22.14 (available on host)
**Primary Dependencies**: React 18.3, Vite 6.x, `@tailwindcss/vite` 4.x, shadcn/ui (latest), React Router DOM v7, Biome 2.x
**Storage**: N/A — static SPA, no server or database
**Testing**: Vitest + React Testing Library (constitution mandate; no test tasks in Phase 1 per spec scope)
**Target Platform**: Modern web browser, desktop-first, responsive ≥ 375 px
**Project Type**: web-app (SPA)
**Performance Goals**: Initial load < 2 s on broadband; client-side module navigation < 500 ms (from SC-001, SC-002)
**Constraints**: WCAG 2.1 AA accessibility; Biome zero errors; no custom CSS files; no `any` types
**Scale/Scope**: 10 static module stubs, 2 user stories, single-developer iteration

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Gate | Status | Notes |
|---|---|---|---|
| I. Module-First Architecture | Each C concept is an isolated FSD feature slice | ✅ PASS | 10 feature slices, one per concept |
| II. Visualization-Driven Learning | Every example has a visual aid | ✅ N/A Phase 1 | Placeholder phase — no code examples yet |
| III. Interactive Code Editor | Every module embeds a live editor | ✅ N/A Phase 1 | Placeholder phase — editor deferred to later phases |
| IV. Component-Driven UI (shadcn/ui) | React 18 + TS strict + shadcn/ui + Tailwind only | ✅ PASS | All four mandated; no other UI libs |
| V. Type Safety | `strict: true`, no `any`, all contracts typed | ✅ PASS | `Module` and `ModuleRegistry` typed in `entities/module`; strict tsconfig |
| VI. Clean, Accessible UI | ≥375 px responsive, WCAG 2.1 AA | ✅ PASS | Required by FR-010 and spec acceptance scenarios |

**Constitution Check result: ALL GATES PASS — proceeding to Phase 0.**

## Project Structure

### Documentation (this feature)

```text
specs/001-init-base-module-placeholder/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
│   ├── routing.md       # URL schema and route contracts
│   └── module-api.md    # FSD public API contracts for each feature slice
└── tasks.md             # Phase 2 output (/speckit.tasks — NOT created here)
```

### Source Code (repository root)

```text
src/
├── app/
│   ├── App.tsx                        # Root component — mounts router + providers
│   ├── router.tsx                     # React Router v7 router definition
│   └── providers.tsx                  # Global context providers (theme, etc.)
│
├── pages/
│   └── module-view/
│       ├── ui/
│       │   └── ModuleViewPage.tsx     # Layout page: renders Sidebar + active module panel
│       └── index.ts
│
├── widgets/
│   └── sidebar/
│       ├── ui/
│       │   ├── Sidebar.tsx            # Sidebar container (scrollable list)
│       │   └── SidebarItem.tsx        # Individual module nav entry
│       └── index.ts                   # Public API: export { Sidebar }
│
├── features/
│   ├── basic-c-syntax/
│   │   ├── ui/
│   │   │   └── BasicCSyntaxPage.tsx   # Placeholder content panel
│   │   └── index.ts
│   ├── data-types/
│   │   ├── ui/
│   │   │   └── DataTypesPage.tsx
│   │   └── index.ts
│   ├── input-output/
│   │   ├── ui/
│   │   │   └── InputOutputPage.tsx
│   │   └── index.ts
│   ├── functions/
│   │   ├── ui/
│   │   │   └── FunctionsPage.tsx
│   │   └── index.ts
│   ├── if-statement/
│   │   ├── ui/
│   │   │   └── IfStatementPage.tsx
│   │   └── index.ts
│   ├── for-loop/
│   │   ├── ui/
│   │   │   └── ForLoopPage.tsx
│   │   └── index.ts
│   ├── arrays/
│   │   ├── ui/
│   │   │   └── ArraysPage.tsx
│   │   └── index.ts
│   ├── strings/
│   │   ├── ui/
│   │   │   └── StringsPage.tsx
│   │   └── index.ts
│   ├── file-handling/
│   │   ├── ui/
│   │   │   └── FileHandlingPage.tsx
│   │   └── index.ts
│   └── examples/
│       ├── ui/
│       │   └── ExamplesPage.tsx
│       └── index.ts
│
├── entities/
│   └── module/
│       ├── model/
│       │   └── module.types.ts        # Module, ModuleRegistry TypeScript types
│       ├── config/
│       │   └── modules.ts             # Ordered registry of all 10 modules
│       └── index.ts                   # Public API: export { MODULE_REGISTRY, Module }
│
└── shared/
    ├── ui/                            # shadcn/ui re-exports + wrapper primitives
    ├── lib/
    │   └── utils.ts                   # cn() utility (required by shadcn/ui)
    └── config/
        └── routes.ts                  # Route path constants

index.html                             # Vite SPA entry
vite.config.ts                         # Vite config (React plugin + Tailwind + path alias)
tsconfig.json                          # TypeScript strict config + @/* path alias
tsconfig.app.json                      # App-specific TS config
biome.json                             # Biome lint + format config
tailwind.config.ts                     # (if needed; @tailwindcss/vite may skip this)
components.json                        # shadcn/ui component config
```

**Structure Decision**: Single SPA project at repository root using Feature Sliced Design
(6 canonical layers: app → pages → widgets → features → entities → shared). No monorepo
overhead. Each C concept is a feature slice with an isolated `ui/` subfolder and a public
`index.ts` barrel. Routing is defined in the `app` layer; the `entities/module` layer
owns the module registry and TypeScript types.

## Complexity Tracking

> No constitution violations — this section is intentionally empty.
