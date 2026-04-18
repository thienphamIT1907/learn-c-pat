# Research: Phase 2 — Module Content Sections

**Date**: 2026-04-18 | **Plan**: [plan.md](./plan.md)

---

## Research Task 1: Syntax Highlighting Package

**Unknown**: Which npm package to use for C code block with syntax highlighting?

### Decision: `react-syntax-highlighter` v16 with Prism renderer

- **Rationale**:
  - Direct React component — no async init, no `useEffect` ceremony
  - Supports C language via Prism language definitions out of the box
  - Ships multiple themes; `oneDark` matches the dark card aesthetic of shadcn/ui
  - TypeScript types via `@types/react-syntax-highlighter` (separate package)
  - Zero configuration — `<SyntaxHighlighter language="c" style={oneDark}>{code}</SyntaxHighlighter>`
  - Large mindshare — well-maintained, 12M+ weekly downloads

- **Alternatives considered**:
  - `shiki` v4: More accurate token highlighting (same engine as VS Code), but requires
    async initialization (`createHighlighter()`) which adds complexity inconsistent with
    static content that renders synchronously; also heavier bundle (~400KB vs ~180KB).
  - `prism-react-renderer`: Lighter than `react-syntax-highlighter`, but lower-level API
    requiring manual token mapping — more code for no net benefit at this phase.

- **Package**: `react-syntax-highlighter@^16.1.1` + `@types/react-syntax-highlighter`

---

## Research Task 2: Mermaid Rendering in React

**Unknown**: How to integrate Mermaid.js into a React 19 + Vite project?

### Decision: `mermaid` base package (v11) with custom async React wrapper

- **Rationale**:
  - Constitution explicitly mandates Mermaid.js — no alternative evaluation needed.
  - Mermaid v11 API: `mermaid.initialize()` once at app level, then
    `mermaid.render(id, diagramString)` returns an async `{ svg }` result.
  - Wrap in a shared `DiagramBlock` component using `useEffect` + `useState` to:
    1. Show `Skeleton` (shadcn/ui) while `render()` is in progress
    2. Set `svg` string on success, inject via `dangerouslySetInnerHTML`
    3. Catch errors and show Vietnamese fallback message
  - No `@mermaid-js/mermaid-react` wrapper package exists at a stable version;
    the base package gives full control and is actively maintained.
  - Tree-shaking: Vite handles Mermaid's large bundle with dynamic `import()` if
    needed; for Phase 2 static content, synchronous import is acceptable.

- **Alternatives considered**:
  - `reactflow`: Not a Mermaid renderer — for drag/drop interactive graphs; violates
    constitution mandate and adds 3× the bundle weight.
  - Pre-rendered SVG/PNG images: Would require offline rendering toolchain, not
    maintainable when diagram content changes.

- **Package**: `mermaid@^11.4.0`
- **Integration note**: `mermaid.initialize()` called once in `src/app/App.tsx` before
  first render; `DiagramBlock` component lives in `src/shared/ui/DiagramBlock.tsx`.

---

## Research Task 3: FAQ Collapsible Component

**Unknown**: Which shadcn/ui component fits "Q always visible, A hidden and expandable on click"?

### Decision: shadcn/ui `Collapsible`

- **Rationale**:
  - `Collapsible` from shadcn/ui is the exact primitive for this pattern:
    `CollapsibleTrigger` (the always-visible question) + `CollapsibleContent` (hidden
    answer, animated expand/collapse).
  - Keyboard accessible out of the box (Enter/Space toggle).
  - Installed via `pnpm dlx shadcn@latest add collapsible`.
  - Avoids `Accordion` which forces exclusive-open behaviour and uses a compound
    component API less suitable for always-visible question labels.

- **Alternatives considered**:
  - `Accordion`: Forces one-open-at-a-time by default; requires workaround to allow
    multiple open items; overkill for a 3-item FAQ list.
  - Custom `<details>`/`<summary>` HTML elements: Accessible by default but hard to
    style consistently with shadcn/ui and Tailwind without custom CSS.

- **Component**: `shadcn/ui Collapsible` — `CollapsibleTrigger` wraps question,
  `CollapsibleContent` wraps answer. Each FAQ item manages its own `open` state.

---

## Research Task 4: FSD Content Data Location

**Unknown**: Where should static content strings (explanation, code, Mermaid DSL, FAQ) live in FSD?

### Decision: `features/{slug}/content/{slug}.content.ts` per feature slice

- **Rationale**:
  - FSD mandates each feature is self-contained. Content is "module-level concern" —
    it belongs inside the feature slice, not in `shared` or `entities`.
  - `index.ts` of each feature already re-exports the page component; content file
    is an implementation detail not re-exported.
  - Naming convention: `{slug}.content.ts` (e.g., `basic-c-syntax.content.ts`)
    makes grep/discovery trivial.
  - Typed via a shared interface `ModuleContent` in `src/entities/module/model/`.

- **Alternatives considered**:
  - Single `src/shared/content/` directory: Breaks FSD isolation — shared layer
    cannot contain feature-specific data.
  - Inline in the page component: Makes files large and hard to maintain; mixing
    data and presentation.

---

## Research Task 5: Shared UI Components Strategy

**Unknown**: Should `CodeBlock`, `DiagramBlock`, `FaqItem` be shared or per-feature?

### Decision: All three rendering primitives go in `src/shared/ui/`

- **Rationale**:
  - All 10 features share identical rendering logic (same code block style, same
    Mermaid wrapper, same FAQ collapsible pattern).
  - `shared/ui/` is the correct FSD layer for cross-feature UI primitives that carry
    no feature-specific business logic.
  - Each feature page imports these components from `@/shared/ui` — this is a legal
    downward import in FSD (features → shared is allowed).

- **Components**:
  - `src/shared/ui/CodeBlock.tsx` — wraps `react-syntax-highlighter`
  - `src/shared/ui/DiagramBlock.tsx` — wraps `mermaid` with skeleton + error state
  - `src/shared/ui/FaqSection.tsx` — renders list of `FaqItem` using `Collapsible`

---

## Research Task 6: shadcn/ui `Skeleton` Component

**Unknown**: Is `Skeleton` available in shadcn/ui for the diagram loading state?

### Decision: Use shadcn/ui `Skeleton` component

- **Rationale**:
  - `Skeleton` is a standard shadcn/ui component, installable via
    `pnpm dlx shadcn@latest add skeleton`.
  - Used inside `DiagramBlock` while Mermaid async render is in progress.
  - Consistent with the existing shadcn/ui aesthetic.

---

## Summary Table

| Unknown | Decision | Package / Component |
|---|---|---|
| Syntax highlighter | `react-syntax-highlighter` + Prism | `react-syntax-highlighter@^16` |
| Mermaid integration | Base `mermaid` package + custom React wrapper | `mermaid@^11` |
| FAQ collapsible | shadcn/ui `Collapsible` | `pnpm dlx shadcn add collapsible` |
| Content data location | Per-feature `content/{slug}.content.ts` | FSD feature slice |
| Shared UI primitives | `src/shared/ui/` (CodeBlock, DiagramBlock, FaqSection) | Local components |
| Diagram loading state | shadcn/ui `Skeleton` | `pnpm dlx shadcn add skeleton` |

All NEEDS CLARIFICATION items resolved. No blockers for Phase 1.
