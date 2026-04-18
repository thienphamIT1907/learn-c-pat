# Data Model: Phase 2 — Module Content Sections

**Date**: 2026-04-18 | **Plan**: [plan.md](./plan.md) | **Research**: [research.md](./research.md)

---

## Entities

### `ModuleContent`

The top-level content container for a single C concept module. One instance per module,
hard-coded in `src/features/{slug}/content/{slug}.content.ts`.

```typescript
interface ModuleContent {
  /** Module slug — must match the slug in MODULE_REGISTRY */
  slug: string;

  /** Section 1: Vietnamese explanation — What, When, How */
  explanation: ModuleExplanation;

  /** Section 2: C code example (English) */
  codeExample: CodeExample;

  /** Section 3: Mermaid flowchart for the code example's execution flow */
  flowDiagram: FlowDiagram;

  /** Section 4: Frequently asked questions (Vietnamese) */
  faq: readonly FaqItem[];
}
```

---

### `ModuleExplanation`

Structured Vietnamese prose for the explanation section. Three sub-sections correspond
directly to FR-002 ("Là gì / Khi nào dùng / Dùng như thế nào").

```typescript
interface ModuleExplanation {
  /** "Là gì?" — What is this concept? (Vietnamese) */
  whatIs: string;

  /** "Khi nào dùng?" — When should you use it? (Vietnamese) */
  whenToUse: string;

  /** "Dùng như thế nào?" — How do you use it? (Vietnamese) */
  howToUse: string;
}
```

---

### `CodeExample`

A single C code snippet with metadata. Content (variable names, comments) in English.

```typescript
interface CodeExample {
  /** Short English title describing what the example demonstrates */
  title: string;

  /** Raw C source code string — English identifiers and comments */
  code: string;

  /** Language identifier passed to the syntax highlighter — always "c" */
  language: "c";

  /** Optional: expected output of the program, shown below the code block */
  expectedOutput?: string;
}
```

---

### `FlowDiagram`

Holds a Mermaid DSL string representing the execution flow of the associated code example.

```typescript
interface FlowDiagram {
  /** Mermaid DSL string — e.g. "flowchart TD\n  A[Start]-->B[Declare x]" */
  diagram: string;

  /** Vietnamese caption shown below the diagram */
  caption: string;
}
```

**Validation rules**:
- `diagram` MUST start with a valid Mermaid graph type keyword
  (`flowchart`, `graph`, `sequenceDiagram`, etc.)
- `diagram` MUST be non-empty; empty string triggers error fallback in `DiagramBlock`

---

### `FaqItem`

A single question-answer pair. Both fields in Vietnamese.

```typescript
interface FaqItem {
  /** Short question in Vietnamese */
  question: string;

  /** Detailed answer in Vietnamese */
  answer: string;
}
```

**Validation rules**:
- Each `ModuleContent.faq` array MUST have ≥ 3 items (enforced by spec FR-005)
- `question` SHOULD end with a `?` character
- `answer` SHOULD be ≤ 3 sentences for readability

---

## Type File Location

All interfaces above are defined in:
```
src/entities/module/model/module-content.types.ts
```

Re-exported from `src/entities/module/index.ts` alongside existing `Module` types.

---

## Content File Location (per feature)

```
src/features/{slug}/content/{slug}.content.ts
```

Example:
```
src/features/basic-c-syntax/content/basic-c-syntax.content.ts
src/features/data-types/content/data-types.content.ts
...
```

Each file exports a single `const` of type `ModuleContent`:
```typescript
export const basicCSyntaxContent: ModuleContent = { ... }
```

---

## Shared UI Component Props (derived from data model)

### `CodeBlock` props

```typescript
interface CodeBlockProps {
  code: string;
  language: string;
  title?: string;
  expectedOutput?: string;
}
```

### `DiagramBlock` props

```typescript
interface DiagramBlockProps {
  diagram: string;  // Mermaid DSL string
  caption?: string;
}
```

### `FaqSection` props

```typescript
interface FaqSectionProps {
  items: readonly FaqItem[];
}
```

---

## State Transitions

### `DiagramBlock` internal state

```
IDLE → LOADING (on mount, mermaid.render() called)
LOADING → SUCCESS (render resolves with svg)
LOADING → ERROR (render throws / rejects)
SUCCESS → (static, no further transitions)
ERROR → (static, fallback message shown)
```

---

## Module Registry Relationship

`ModuleContent.slug` MUST match a `Module.slug` value in `MODULE_REGISTRY`.
This relationship is validated at runtime in the module page component when looking up
content by slug.

```
MODULE_REGISTRY[n].slug  ←— must equal ——→  ModuleContent.slug
```

No foreign key enforcement at type level; by convention, slug is the authoritative join key.
