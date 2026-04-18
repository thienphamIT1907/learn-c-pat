# Implementation Plan: Phase 2 — Module Content Sections

**Branch**: `002-module-content-sections` | **Date**: 2026-04-18 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `specs/002-module-content-sections/spec.md`

---

## Summary

Add real educational content to all 10 C concept modules in the LearnC SPA. Each module
page is replaced with a structured 4-section layout: Vietnamese explanation (Là gì /
Khi nào dùng / Dùng như thế nào), a syntax-highlighted C code example, a Mermaid
execution-flow diagram, and a FAQ section with collapsible answers. All content is
static and hard-coded in each feature slice's `content/` directory. Three new shared UI
primitives (`CodeBlock`, `DiagramBlock`, `FaqSection`) are added to `src/shared/ui/`.

---

## Technical Context

**Language/Version**: TypeScript 6.x (strict), React 19.x
**Primary Dependencies**: `react-syntax-highlighter@^16` (Prism), `mermaid@^11`,
  shadcn/ui `Collapsible` + `Skeleton`, existing: React Router v7, Tailwind CSS 4, Biome 2
**Storage**: N/A — all content is static, hard-coded in TypeScript source files
**Testing**: Vitest + React Testing Library (constitution mandate; integration tests
  for shared UI components in scope; content data unit tests out of scope for Phase 2)
**Target Platform**: Modern web browser, desktop-first, responsive ≥ 375 px
**Project Type**: web-app (SPA)
**Performance Goals**: Module page navigation < 500 ms; Mermaid diagram render < 1 s (NFR-001/002)
**Constraints**: WCAG 2.1 AA; Biome zero errors; no `any` types; no cross-feature imports;
  no custom CSS files; no inline `style={}` objects
**Scale/Scope**: 10 modules × 4 sections, 3 new shared components, 10 content data files

---

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Gate | Status | Notes |
|---|---|---|---|
| I. Module-First Architecture | Each module's content is isolated in its own feature slice | ✅ PASS | Content data in `features/{slug}/content/`, no cross-feature imports |
| II. Visualization-Driven Learning | Every code example has a visual Mermaid diagram | ✅ PASS | `DiagramBlock` renders Mermaid DSL for every module — mandatory per constitution |
| III. Interactive Code Editor | Every primary example is editable | ⚠️ DEFERRED | Phase 2 delivers static code display only; live editor is Phase 3. Justified: spec scopes Phase 2 to static content only. Tracked as tech debt. |
| IV. Component-Driven UI (shadcn/ui) | React 19 + TS strict + shadcn/ui + Tailwind | ✅ PASS | `Collapsible`, `Skeleton` from shadcn/ui; no other UI libs |
| V. Type Safety | `strict: true`, no `any`, all contracts typed | ✅ PASS | `ModuleContent` interface in `entities/module`; all component props fully typed |
| VI. Clean, Accessible UI | ≥ 375 px, WCAG 2.1 AA | ✅ PASS | `overflow-x-auto` on diagram container; `CollapsibleTrigger` keyboard navigable |

**Complexity Tracking** (Principle III justified exception):

| Violation | Why Needed | Simpler Alternative Rejected Because |
|---|---|---|
| Principle III deferred (no live editor) | Phase 2 scope is static content per spec FR-001 | Live editor requires Monaco/CodeMirror integration — separate deliverable (Phase 3) to avoid coupling content authoring with editor infrastructure |

---

## Project Structure

### Documentation (this feature)

```text
specs/002-module-content-sections/
├── plan.md                     # This file
├── research.md                 # Phase 0 output
├── data-model.md               # Phase 1 output
├── quickstart.md               # Phase 1 output
├── contracts/
│   ├── shared-ui-api.md        # CodeBlock / DiagramBlock / FaqSection contracts
│   └── module-content-api.md   # Content data convention + FSD import rules
└── tasks.md                    # Phase 2 output (/speckit.tasks — NOT created here)
```

### Source Code Changes

```text
src/
├── app/
│   └── App.tsx                         MODIFY — add mermaid.initialize()
│
├── entities/
│   └── module/
│       ├── model/
│       │   └── module-content.types.ts NEW — ModuleContent, FaqItem, FlowDiagram, CodeExample, ModuleExplanation
│       └── index.ts                    MODIFY — re-export new types
│
├── shared/
│   └── ui/
│       ├── CodeBlock.tsx               NEW — react-syntax-highlighter wrapper
│       ├── DiagramBlock.tsx            NEW — mermaid wrapper with skeleton + error state
│       ├── FaqSection.tsx              NEW — shadcn/ui Collapsible FAQ list
│       └── index.ts                    NEW — re-export all three components
│
└── features/
    ├── basic-c-syntax/
    │   ├── content/
    │   │   └── basic-c-syntax.content.ts   NEW
    │   └── ui/
    │       └── BasicCSyntaxPage.tsx         MODIFY
    ├── data-types/
    │   ├── content/
    │   │   └── data-types.content.ts        NEW
    │   └── ui/
    │       └── DataTypesPage.tsx            MODIFY
    ├── input-output/
    │   ├── content/
    │   │   └── input-output.content.ts      NEW
    │   └── ui/
    │       └── InputOutputPage.tsx          MODIFY
    ├── functions/
    │   ├── content/
    │   │   └── functions.content.ts         NEW
    │   └── ui/
    │       └── FunctionsPage.tsx            MODIFY
    ├── if-statement/
    │   ├── content/
    │   │   └── if-statement.content.ts      NEW
    │   └── ui/
    │       └── IfStatementPage.tsx          MODIFY
    ├── for-loop/
    │   ├── content/
    │   │   └── for-loop.content.ts          NEW
    │   └── ui/
    │       └── ForLoopPage.tsx              MODIFY
    ├── arrays/
    │   ├── content/
    │   │   └── arrays.content.ts            NEW
    │   └── ui/
    │       └── ArraysPage.tsx              MODIFY
    ├── strings/
    │   ├── content/
    │   │   └── strings.content.ts           NEW
    │   └── ui/
    │       └── StringsPage.tsx             MODIFY
    ├── file-handling/
    │   ├── content/
    │   │   └── file-handling.content.ts     NEW
    │   └── ui/
    │       └── FileHandlingPage.tsx         MODIFY
    └── examples/
        ├── content/
        │   └── examples.content.ts          NEW
        └── ui/
            └── ExamplesPage.tsx            MODIFY
```

---

## Package Installation

```bash
# Runtime dependencies
pnpm add react-syntax-highlighter mermaid

# Type definitions
pnpm add -D @types/react-syntax-highlighter

# shadcn/ui components
pnpm dlx shadcn@latest add collapsible
pnpm dlx shadcn@latest add skeleton
```

---

## Key Design Decisions

### Content as pure TypeScript data files

All module content (explanation text, code strings, Mermaid DSL, FAQ arrays) is stored
in `.content.ts` files — pure TypeScript, no JSX. This keeps data separate from
presentation, makes content easy to diff/review, and enables future extraction to a CMS
without changing page components.

### `DiagramBlock` uses `dangerouslySetInnerHTML`

Justified: The Mermaid SVG output is from `diagram` strings hard-coded in source files,
not from user input. A Biome suppression comment is included at the injection site to
document the rationale. See [contracts/shared-ui-api.md](./contracts/shared-ui-api.md#security-note).

### `mermaid.initialize()` called once at app level

Mermaid requires one-time configuration before any `render()` call. Calling it in
`App.tsx` (before any route renders) guarantees it runs before `DiagramBlock` mounts.
`startOnLoad: false` prevents Mermaid from auto-scanning the DOM.

### Section layout uses `<article>` + `<section>` semantics

Each module page wraps content in `<article>` (a self-contained document) with `<section>`
per content block. This satisfies WCAG landmark requirements and improves screen-reader
navigation.

---

## Re-Constitution Check (Post Phase 1 Design)

All gates re-evaluated after data-model and contracts are defined:

- Principle II ✅ — Every module has a `flowDiagram.diagram` Mermaid DSL string
- Principle III ⚠️ — Still deferred, exception documented above, tech debt tracked
- All other principles ✅ — No new violations introduced by design decisions
