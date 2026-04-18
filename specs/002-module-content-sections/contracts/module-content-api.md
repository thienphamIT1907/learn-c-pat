# Contract: Module Content API — Phase 2

**Date**: 2026-04-18 | **Plan**: [../plan.md](../plan.md)

This contract defines the public interface for module content data — how each feature
slice exposes its content to the page layer.

---

## Content File Convention

Every feature slice MUST export exactly one content constant from:

```
src/features/{slug}/content/{slug}.content.ts
```

The export name follows `camelCase(slug) + "Content"`:

| Module Slug      | Content File                | Export Name           |
| ---------------- | --------------------------- | --------------------- |
| `basic-c-syntax` | `basic-c-syntax.content.ts` | `basicCSyntaxContent` |
| `data-types`     | `data-types.content.ts`     | `dataTypesContent`    |
| `input-output`   | `input-output.content.ts`   | `inputOutputContent`  |
| `functions`      | `functions.content.ts`      | `functionsContent`    |
| `if-statement`   | `if-statement.content.ts`   | `ifStatementContent`  |
| `for-loop`       | `for-loop.content.ts`       | `forLoopContent`      |
| `arrays`         | `arrays.content.ts`         | `arraysContent`       |
| `strings`        | `strings.content.ts`        | `stringsContent`      |
| `file-handling`  | `file-handling.content.ts`  | `fileHandlingContent` |
| `examples`       | `examples.content.ts`       | `examplesContent`     |

---

## Content Object Schema

Each content constant MUST conform to `ModuleContent` from
`src/entities/module/model/module-content.types.ts`.

```typescript
import type { ModuleContent } from "@/entities/module";

export const { exportName }: ModuleContent = {
  slug: "{slug}",
  explanation: {
    whatIs: "...", // Vietnamese — ≥ 2 sentences
    whenToUse: "...", // Vietnamese — ≥ 1 sentence
    howToUse: "...", // Vietnamese — ≥ 1 sentence
  },
  codeExample: {
    title: "...", // English — short descriptor
    code: "...", // English identifiers + comments
    language: "c",
    expectedOutput: "...", // Optional: program stdout
  },
  flowDiagram: {
    diagram: "flowchart TD\n  ...", // Mermaid DSL
    caption: "...", // Vietnamese caption
  },
  faq: [
    { question: "...?", answer: "..." }, // Vietnamese
    { question: "...?", answer: "..." }, // Vietnamese
    { question: "...?", answer: "..." }, // Vietnamese — minimum 3
  ],
};
```

---

## Page-Layer Consumption

The module page component (`{Slug}Page`) imports its content constant directly:

```typescript
// src/features/basic-c-syntax/ui/BasicCSyntaxPage.tsx
import { basicCSyntaxContent } from "../content/basic-c-syntax.content";
import { CodeBlock, DiagramBlock, FaqSection } from "@/shared/ui";

export function BasicCSyntaxPage() {
  const { explanation, codeExample, flowDiagram, faq } = basicCSyntaxContent;
  return (
    <article className="flex flex-col gap-10 p-8 max-w-3xl">
      {/* Section 1: Explanation */}
      {/* Section 2: Code Example */}
      <CodeBlock {...codeExample} />
      {/* Section 3: Flow Diagram */}
      <DiagramBlock diagram={flowDiagram.diagram} caption={flowDiagram.caption} />
      {/* Section 4: FAQ */}
      <FaqSection items={faq} />
    </article>
  );
}
```

---

## FSD Import Rules

| Importer                   | Imported                   | Allowed?                           |
| -------------------------- | -------------------------- | ---------------------------------- |
| `features/{slug}/ui/`      | `features/{slug}/content/` | ✅ Same slice                      |
| `features/{slug}/ui/`      | `shared/ui/`               | ✅ Features → Shared               |
| `features/{slug}/ui/`      | `entities/module/`         | ✅ Features → Entities             |
| `features/{slug}/content/` | `entities/module/`         | ✅ Features → Entities             |
| `shared/ui/`               | `entities/module/`         | ✅ Shared → Entities               |
| `features/A/`              | `features/B/`              | ❌ Cross-feature forbidden         |
| `entities/`                | `features/`                | ❌ Entities cannot import features |
| `shared/`                  | `features/`                | ❌ Shared cannot import features   |

---

## Constraints

- Content files MUST NOT import from other feature slices.
- Content files MUST be pure TypeScript — no JSX, no React imports.
- `ModuleContent.slug` MUST exactly match the corresponding `Module.slug` in
  `MODULE_REGISTRY` (runtime join key).
- The `faq` array length MUST be ≥ 3 at authoring time (no runtime validation).
