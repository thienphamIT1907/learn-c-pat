# Contract: Shared UI Component API — Phase 2

**Date**: 2026-04-18 | **Plan**: [../plan.md](../plan.md)

These are the public API contracts for the three new shared UI primitives introduced in
Phase 2. All components live in `src/shared/ui/` and are re-exported from
`src/shared/ui/index.ts`.

---

## `CodeBlock`

**Location**: `src/shared/ui/CodeBlock.tsx`

**Purpose**: Renders a C code snippet with Prism-based syntax highlighting using
`react-syntax-highlighter`. Optionally shows expected program output beneath the block.

### Props

```typescript
interface CodeBlockProps {
  /** Raw C source code to display */
  code: string;
  /** Language token for the highlighter — defaults to "c" */
  language?: string;
  /** Optional heading shown above the code block */
  title?: string;
  /** Optional expected program output displayed below the block */
  expectedOutput?: string;
}
```

### Behaviour Contract

| Scenario | Expected Behaviour |
|---|---|
| `code` is a non-empty string | Rendered with Prism `oneDark` theme, line numbers visible |
| `title` is provided | Shown as a small label above the code block |
| `expectedOutput` is provided | Shown in a separate muted block labelled "Output:" below the code |
| `expectedOutput` is omitted | Output section not rendered |
| `code` is empty string | Renders empty highlighted block (no error) |

### Accessibility

- Code block wrapped in `<pre>` / `<code>` — screen-reader readable
- `title` (if present) associated via `aria-label` on the wrapper

---

## `DiagramBlock`

**Location**: `src/shared/ui/DiagramBlock.tsx`

**Purpose**: Renders a Mermaid diagram from a DSL string. Shows a `Skeleton` while
rendering, injects the resulting SVG, and falls back to a Vietnamese error message on
render failure.

### Props

```typescript
interface DiagramBlockProps {
  /** Valid Mermaid DSL string (e.g. "flowchart TD\n  A-->B") */
  diagram: string;
  /** Optional Vietnamese caption shown below the diagram */
  caption?: string;
}
```

### Behaviour Contract

| Scenario | Expected Behaviour |
|---|---|
| Component mounts | Immediately shows `Skeleton` placeholder while `mermaid.render()` runs |
| `mermaid.render()` resolves | Skeleton replaced by rendered SVG diagram |
| `mermaid.render()` rejects | Skeleton replaced by Vietnamese error message: "Không thể hiển thị sơ đồ. Vui lòng thử tải lại trang." |
| `diagram` is empty string | Treated as render error → shows error fallback immediately |
| `caption` is provided | Rendered as `<p>` below the SVG with `text-muted-foreground` styling |
| Diagram SVG overflows container | Container has `overflow-x: auto` to allow horizontal scroll on narrow viewports |

### State Machine

```
IDLE → LOADING → SUCCESS
             ↘ ERROR
```

### Security Note

Mermaid `render()` produces SVG strings. The SVG is injected via
`dangerouslySetInnerHTML`. This is safe because:
1. The `diagram` string is **hard-coded in source** — not user input
2. Mermaid sanitises its own output
3. No runtime user data flows into the diagram string

---

## `FaqSection`

**Location**: `src/shared/ui/FaqSection.tsx`

**Purpose**: Renders a list of FAQ items using shadcn/ui `Collapsible`. Each question
is always visible; the answer collapses/expands on click.

### Props

```typescript
interface FaqSectionProps {
  /** Ordered list of question/answer pairs — minimum 3 items per spec FR-005 */
  items: readonly FaqItem[];
}
```

Where `FaqItem` is defined in `src/entities/module/model/module-content.types.ts`.

### Behaviour Contract

| Scenario | Expected Behaviour |
|---|---|
| Component mounts | All answers are collapsed (closed state) by default |
| User clicks a question | That answer expands; other items unaffected (independent state) |
| User clicks the same question again | That answer collapses |
| `items` is empty | Renders nothing (no section heading) |
| `items` has < 3 entries | Renders whatever is provided; enforcement is at content authoring time, not runtime |

### Accessibility

- Each question is a `CollapsibleTrigger` with `role="button"` and keyboard support
  (Enter / Space toggles)
- `CollapsibleContent` has `aria-expanded` managed by shadcn/ui `Collapsible`

---

## Re-export Index

`src/shared/ui/index.ts` must export all three:

```typescript
export { CodeBlock } from "./CodeBlock";
export { DiagramBlock } from "./DiagramBlock";
export { FaqSection } from "./FaqSection";
export type { CodeBlockProps } from "./CodeBlock";
export type { DiagramBlockProps } from "./DiagramBlock";
export type { FaqSectionProps } from "./FaqSection";
```
