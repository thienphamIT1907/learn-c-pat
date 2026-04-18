# Quickstart: Phase 2 — Module Content Sections

**Date**: 2026-04-18 | **Plan**: [plan.md](./plan.md)

This guide enables a developer to implement one complete module content section from
scratch and verify it works end-to-end before implementing the remaining 9 modules.

---

## Prerequisites

- Phase 1 complete: `pnpm dev` runs, sidebar works, routing works
- Node.js ≥ 22, pnpm installed

---

## Step 1 — Install packages

```bash
pnpm add react-syntax-highlighter mermaid
pnpm add -D @types/react-syntax-highlighter
```

---

## Step 2 — Install shadcn/ui components

```bash
pnpm dlx shadcn@latest add collapsible
pnpm dlx shadcn@latest add skeleton
```

---

## Step 3 — Add `ModuleContent` types

Create `src/entities/module/model/module-content.types.ts`:

```typescript
export interface ModuleExplanation {
  whatIs: string;
  whenToUse: string;
  howToUse: string;
}

export interface CodeExample {
  title: string;
  code: string;
  language: "c";
  expectedOutput?: string;
}

export interface FlowDiagram {
  diagram: string;
  caption: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ModuleContent {
  slug: string;
  explanation: ModuleExplanation;
  codeExample: CodeExample;
  flowDiagram: FlowDiagram;
  faq: readonly FaqItem[];
}
```

Re-export from `src/entities/module/index.ts`:
```typescript
export type { ModuleContent, FaqItem, FlowDiagram, CodeExample, ModuleExplanation }
  from "./model/module-content.types";
```

---

## Step 4 — Initialize Mermaid in App

In `src/app/App.tsx`, add initialization before the router renders:

```typescript
import mermaid from "mermaid";

mermaid.initialize({ startOnLoad: false, theme: "neutral" });
```

---

## Step 5 — Create shared UI components

### `src/shared/ui/CodeBlock.tsx`

```typescript
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
  expectedOutput?: string;
}

export function CodeBlock({ code, language = "c", title, expectedOutput }: CodeBlockProps) {
  return (
    <div className="flex flex-col gap-2">
      {title && <p className="text-sm font-medium text-muted-foreground">{title}</p>}
      <SyntaxHighlighter language={language} style={oneDark} showLineNumbers>
        {code}
      </SyntaxHighlighter>
      {expectedOutput && (
        <div className="rounded-md bg-muted px-4 py-3 text-sm font-mono">
          <span className="text-muted-foreground">Output: </span>
          {expectedOutput}
        </div>
      )}
    </div>
  );
}
```

### `src/shared/ui/DiagramBlock.tsx`

```typescript
import { useEffect, useState } from "react";
import mermaid from "mermaid";
import { Skeleton } from "@/shared/ui/skeleton";

interface DiagramBlockProps {
  diagram: string;
  caption?: string;
}

type DiagramState = "loading" | "success" | "error";

export function DiagramBlock({ diagram, caption }: DiagramBlockProps) {
  const [state, setState] = useState<DiagramState>("loading");
  const [svg, setSvg] = useState("");

  useEffect(() => {
    if (!diagram) { setState("error"); return; }
    setState("loading");
    const id = `mermaid-${Math.random().toString(36).slice(2)}`;
    mermaid.render(id, diagram)
      .then(({ svg }) => { setSvg(svg); setState("success"); })
      .catch(() => setState("error"));
  }, [diagram]);

  if (state === "loading") return <Skeleton className="h-48 w-full rounded-md" />;
  if (state === "error") return (
    <p className="text-sm text-destructive">
      Không thể hiển thị sơ đồ. Vui lòng thử tải lại trang.
    </p>
  );

  return (
    <div className="flex flex-col gap-2 overflow-x-auto">
      {/* Safe: diagram is hard-coded in source, not user input */}
      {/* biome-ignore lint/security/noDangerouslySetInnerHtml: mermaid SVG output from static source */}
      <div dangerouslySetInnerHTML={{ __html: svg }} />
      {caption && <p className="text-sm text-muted-foreground">{caption}</p>}
    </div>
  );
}
```

### `src/shared/ui/FaqSection.tsx`

```typescript
import { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/shared/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import type { FaqItem } from "@/entities/module";

interface FaqSectionProps {
  items: readonly FaqItem[];
}

export function FaqSection({ items }: FaqSectionProps) {
  return (
    <div className="flex flex-col gap-3">
      {items.map((item, i) => (
        <FaqItemRow key={i} item={item} />
      ))}
    </div>
  );
}

function FaqItemRow({ item }: { item: FaqItem }) {
  const [open, setOpen] = useState(false);
  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md border px-4 py-3 text-sm font-medium hover:bg-accent text-left">
        {item.question}
        <ChevronDown className={cn("h-4 w-4 shrink-0 transition-transform", open && "rotate-180")} />
      </CollapsibleTrigger>
      <CollapsibleContent className="px-4 py-3 text-sm text-muted-foreground">
        {item.answer}
      </CollapsibleContent>
    </Collapsible>
  );
}
```

Create `src/shared/ui/index.ts`:
```typescript
export { CodeBlock } from "./CodeBlock";
export { DiagramBlock } from "./DiagramBlock";
export { FaqSection } from "./FaqSection";
```

---

## Step 6 — Add content for one module (pilot: `basic-c-syntax`)

Create `src/features/basic-c-syntax/content/basic-c-syntax.content.ts`:

```typescript
import type { ModuleContent } from "@/entities/module";

export const basicCSyntaxContent: ModuleContent = {
  slug: "basic-c-syntax",
  explanation: {
    whatIs: "C là ngôn ngữ lập trình bậc thấp, được tạo ra vào năm 1972...",
    whenToUse: "Dùng C khi bạn cần kiểm soát bộ nhớ và hiệu năng...",
    howToUse: "Một chương trình C tối thiểu gồm hàm main()...",
  },
  codeExample: {
    title: "Hello World in C",
    code: `#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}`,
    language: "c",
    expectedOutput: "Hello, World!",
  },
  flowDiagram: {
    diagram: "flowchart TD\n  A[Start] --> B[Include stdio.h]\n  B --> C[Enter main]\n  C --> D[printf Hello World]\n  D --> E[return 0]\n  E --> F[End]",
    caption: "Luồng thực thi của chương trình Hello World",
  },
  faq: [
    { question: "Tại sao cần #include <stdio.h>?", answer: "..." },
    { question: "Hàm main() trả về gì?", answer: "..." },
    { question: "printf() khác với puts() thế nào?", answer: "..." },
  ],
};
```

---

## Step 7 — Update the page component

Update `src/features/basic-c-syntax/ui/BasicCSyntaxPage.tsx` to use the content:

```typescript
import { basicCSyntaxContent } from "../content/basic-c-syntax.content";
import { CodeBlock, DiagramBlock, FaqSection } from "@/shared/ui";

export function BasicCSyntaxPage() {
  const { explanation, codeExample, flowDiagram, faq } = basicCSyntaxContent;
  return (
    <article className="flex flex-col gap-10 p-8 max-w-3xl">
      <section>
        <h2>Là gì?</h2>
        <p>{explanation.whatIs}</p>
        <h2>Khi nào dùng?</h2>
        <p>{explanation.whenToUse}</p>
        <h2>Dùng như thế nào?</h2>
        <p>{explanation.howToUse}</p>
      </section>
      <section>
        <CodeBlock {...codeExample} />
      </section>
      <section>
        <DiagramBlock diagram={flowDiagram.diagram} caption={flowDiagram.caption} />
      </section>
      <section>
        <FaqSection items={faq} />
      </section>
    </article>
  );
}
```

---

## Step 8 — Verify

```bash
pnpm dev
# Open http://localhost:5173
# Navigate to Basic C Syntax module
# Confirm: explanation text, syntax-highlighted code, Mermaid diagram, FAQ items

pnpm type-check   # must pass with 0 errors
pnpm check        # Biome lint + format — must pass with 0 errors
```

---

## Step 9 — Repeat for remaining 9 modules

Follow the same pattern for each module:
1. Create `src/features/{slug}/content/{slug}.content.ts`
2. Update `src/features/{slug}/ui/{SlugPage}.tsx` to consume the content
3. Run `pnpm type-check && pnpm check` after each module

Modules remaining after the pilot:
`data-types`, `input-output`, `functions`, `if-statement`, `for-loop`, `arrays`,
`strings`, `file-handling`, `examples`
