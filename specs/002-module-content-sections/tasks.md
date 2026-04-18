# Tasks: Phase 2 — Module Content Sections

**Input**: Design documents from `specs/002-module-content-sections/`
**Prerequisites**: plan.md ✅, spec.md ✅, data-model.md ✅, research.md ✅, contracts/shared-ui-api.md ✅, contracts/module-content-api.md ✅

**Tests**: Not requested — no test tasks included per spec (constitution: testing is mandated but spec.md does not explicitly scope test tasks for Phase 2).

**Organization**: Phases 3–4 are organized by user story for independent implementation and testing.

## Format: `[ID] [P?] [Story?] Description — file path`

- **[P]**: Can run in parallel (targets different files, no unmet dependencies)
- **[US1]** / **[US2]**: Which user story this task belongs to
- All file paths are relative to repo root (`/Users/thienpham/Documents/dev/personal-2025/learn-c`)

---

## Phase 1: Setup

**Purpose**: Install all required packages and shadcn/ui components before writing any source code.

- [x] T001 Install runtime dependencies `react-syntax-highlighter` and `mermaid` via `pnpm add react-syntax-highlighter mermaid`
- [x] T002 Install dev dependency `@types/react-syntax-highlighter` via `pnpm add -D @types/react-syntax-highlighter`
- [x] T003 [P] Install shadcn/ui `Collapsible` component via `pnpm dlx shadcn@latest add collapsible`
- [x] T004 [P] Install shadcn/ui `Skeleton` component via `pnpm dlx shadcn@latest add skeleton`

**Checkpoint**: `pnpm dev` still starts without errors; `node_modules/mermaid` and `node_modules/react-syntax-highlighter` exist.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Type definitions, Mermaid initialisation, and shared UI primitives that ALL 10 module pages depend on.

**⚠️ CRITICAL**: No user story work (Phase 3+) can begin until this phase is complete.

- [x] T005 Create the 5 TypeScript interfaces (`ModuleContent`, `ModuleExplanation`, `CodeExample`, `FlowDiagram`, `FaqItem`) in `src/entities/module/model/module-content.types.ts`
- [x] T006 [P] Re-export all new types from `src/entities/module/index.ts` alongside existing `Module` types
- [x] T007 [P] Add `mermaid.initialize({ startOnLoad: false, theme: "neutral" })` call at the top of `src/app/App.tsx` (import `mermaid` from `"mermaid"`)
- [x] T008 [P] Create `CodeBlock` component (wraps `Prism as SyntaxHighlighter`, `oneDark` theme, optional `title` + `expectedOutput`) in `src/shared/ui/CodeBlock.tsx`
- [x] T009 [P] Create `DiagramBlock` component (mermaid async render, `Skeleton` loading state, Vietnamese error fallback, `dangerouslySetInnerHTML` with Biome suppression comment) in `src/shared/ui/DiagramBlock.tsx`
- [x] T010 [P] Create `FaqSection` component (renders list of `FaqItem` using `Collapsible` + `CollapsibleTrigger` + `CollapsibleContent`; each item manages own `open` state) in `src/shared/ui/FaqSection.tsx`
- [x] T011 Create `src/shared/ui/index.ts` re-exporting `CodeBlock`, `DiagramBlock`, `FaqSection` and their prop types (depends on T008–T010)

**Checkpoint**: `pnpm tsc --noEmit` passes; `src/shared/ui/index.ts` compiles; `DiagramBlock` imports `Skeleton` and `mermaid` without errors.

---

## Phase 3: User Story 1 — Full 4-Section Content for All 10 Modules (Priority: P1) 🎯 MVP

**Goal**: Every module page displays the complete 4-section layout (Giải thích → Ví dụ code → Sơ đồ luồng → Hỏi & Đáp) with real educational content authored in Vietnamese (explanation/FAQ) and English (code).

**Independent Test**: Mở bất kỳ module nào trong trình duyệt → xác nhận 4 tiêu đề phần hiện diện, code C có highlight cú pháp, sơ đồ Mermaid render thành công (hoặc hiện skeleton rồi chuyển sang sơ đồ), phần FAQ có ≥ 3 câu hỏi có thể expand/collapse.

> All 10 module pairs below are **fully parallelizable** — each module is an isolated FSD feature slice with no cross-feature dependencies.
> Within each module pair, create the content file **before** updating the page component.

### basic-c-syntax

- [x] T012 [P] [US1] Create content object (slug, explanation, codeExample, flowDiagram, faq ≥ 3) conforming to `ModuleContent` in `src/features/basic-c-syntax/content/basic-c-syntax.content.ts` — export name: `basicCSyntaxContent`
- [x] T013 [P] [US1] Rewrite `BasicCSyntaxPage` to import `basicCSyntaxContent` and render 4 sections using `CodeBlock`, `DiagramBlock`, `FaqSection` from `@/shared/ui` in `src/features/basic-c-syntax/ui/BasicCSyntaxPage.tsx`

### data-types

- [x] T014 [P] [US1] Create content object in `src/features/data-types/content/data-types.content.ts` — export name: `dataTypesContent`
- [x] T015 [P] [US1] Rewrite `DataTypesPage` to render 4 sections using imported content and shared UI components in `src/features/data-types/ui/DataTypesPage.tsx`

### input-output

- [x] T016 [P] [US1] Create content object in `src/features/input-output/content/input-output.content.ts` — export name: `inputOutputContent`
- [x] T017 [P] [US1] Rewrite `InputOutputPage` to render 4 sections using imported content and shared UI components in `src/features/input-output/ui/InputOutputPage.tsx`

### functions

- [x] T018 [P] [US1] Create content object in `src/features/functions/content/functions.content.ts` — export name: `functionsContent`
- [x] T019 [P] [US1] Rewrite `FunctionsPage` to render 4 sections using imported content and shared UI components in `src/features/functions/ui/FunctionsPage.tsx`

### if-statement

- [x] T020 [P] [US1] Create content object in `src/features/if-statement/content/if-statement.content.ts` — export name: `ifStatementContent`
- [x] T021 [P] [US1] Rewrite `IfStatementPage` to render 4 sections using imported content and shared UI components in `src/features/if-statement/ui/IfStatementPage.tsx`

### for-loop

- [x] T022 [P] [US1] Create content object in `src/features/for-loop/content/for-loop.content.ts` — export name: `forLoopContent`
- [x] T023 [P] [US1] Rewrite `ForLoopPage` to render 4 sections using imported content and shared UI components in `src/features/for-loop/ui/ForLoopPage.tsx`

### arrays

- [x] T024 [P] [US1] Create content object in `src/features/arrays/content/arrays.content.ts` — export name: `arraysContent`
- [x] T025 [P] [US1] Rewrite `ArraysPage` to render 4 sections using imported content and shared UI components in `src/features/arrays/ui/ArraysPage.tsx`

### strings

- [x] T026 [P] [US1] Create content object in `src/features/strings/content/strings.content.ts` — export name: `stringsContent`
- [x] T027 [P] [US1] Rewrite `StringsPage` to render 4 sections using imported content and shared UI components in `src/features/strings/ui/StringsPage.tsx`

### file-handling

- [x] T028 [P] [US1] Create content object in `src/features/file-handling/content/file-handling.content.ts` — export name: `fileHandlingContent`
- [x] T029 [P] [US1] Rewrite `FileHandlingPage` to render 4 sections using imported content and shared UI components in `src/features/file-handling/ui/FileHandlingPage.tsx`

### examples

- [x] T030 [P] [US1] Create content object for a complete multi-concept C program (demonstrates input, processing, output) in `src/features/examples/content/examples.content.ts` — export name: `examplesContent`
- [x] T031 [P] [US1] Rewrite `ExamplesPage` to render 4 sections using imported content and shared UI components in `src/features/examples/ui/ExamplesPage.tsx`

**Checkpoint**: All 10 module routes (`/basic-c-syntax`, `/data-types`, etc.) render 4 visible sections; no console errors; Mermaid diagrams display after brief skeleton placeholder.

---

## Phase 4: User Story 2 — Section Headings Polish for Quick Scanning (Priority: P2)

**Goal**: A returning learner can scroll any module page and immediately identify each section via a prominent, visually distinct `<h2>` heading — without reading the body text. Code blocks support manual text selection (no copy button required).

**Independent Test**: Cuộn trang module với tốc độ nhanh → xác nhận 4 tiêu đề phần nổi bật và phân biệt rõ ràng; bôi đen code trong `CodeBlock` và Ctrl+C thành công.

- [x] T032 [US2] Audit all 10 module page components and ensure each of the 4 content sections is wrapped in `<section>` with a visually prominent `<h2>` heading (e.g. "Giải thích", "Ví dụ code", "Sơ đồ luồng thực thi", "Hỏi & Đáp") using consistent Tailwind typography classes (`text-xl font-semibold` or equivalent) — update all affected pages in `src/features/*/ui/*Page.tsx`
- [x] T033 [P] [US2] Verify `CodeBlock` does not apply `select-none` or `pointer-events-none` Tailwind classes that would prevent text selection; confirm `<pre>`/`<code>` output of `react-syntax-highlighter` is user-selectable in `src/shared/ui/CodeBlock.tsx`

**Checkpoint**: Each module page has 4 clearly labelled sections; selecting and copying code from any `CodeBlock` with keyboard shortcut works.

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Final quality gate — type safety, Biome compliance, and end-to-end visual verification across all 10 modules.

- [x] T034 [P] Run `pnpm tsc --noEmit` from repo root and fix any TypeScript errors introduced in all new and modified files (`module-content.types.ts`, `App.tsx`, `shared/ui/*.tsx`, `features/*/content/*.ts`, `features/*/ui/*Page.tsx`)
- [x] T035 [P] Run `pnpm biome check --write .` from repo root and fix any lint or format violations to achieve zero Biome errors across all new and modified files
- [ ] T036 Manual smoke test — open each of the 10 module routes in the browser, confirm: (1) 4 section headings visible, (2) code block renders with syntax highlighting, (3) Mermaid diagram renders (no blank area), (4) FAQ has ≥ 3 collapsible items, (5) layout intact at viewport width 375 px

**Checkpoint**: `pnpm tsc --noEmit` exits 0; `pnpm biome check .` exits 0; all 10 module pages pass the manual smoke test.

---

## Dependencies

```
T001 → T002 → T003, T004 (parallel)
                ↓
T005 (types) → T006, T007, T008, T009, T010 (all parallel)
                                              ↓
                                            T011
                                              ↓
              T012–T031 (all 10 modules in parallel, each pair sequential within module)
                                              ↓
                                         T032, T033 (T033 parallel)
                                              ↓
                                         T034, T035 (parallel), T036
```

**Story completion order** (priority-driven):

1. **Phase 1 + Phase 2** — unblocks everything
2. **Phase 3 (US1)** — MVP; delivers all 10 modules with full content ← _ship here_
3. **Phase 4 (US2)** — polish for returning learners
4. **Phase 5** — quality gate before merge

---

## Parallel Execution Examples

### Maximum parallelism in Phase 2 (after T005):

```
T006 (index.ts re-export)
T007 (App.tsx mermaid init)     ← all 5 tasks in parallel
T008 (CodeBlock.tsx)
T009 (DiagramBlock.tsx)
T010 (FaqSection.tsx)
```

Then T011 (index barrel) when all 5 complete.

### Maximum parallelism in Phase 3 (after T011):

Assign one module pair per developer — 10 pairs, 10 developers maximum, zero blocking:

```
Dev 1: T012 → T013  (basic-c-syntax)
Dev 2: T014 → T015  (data-types)
Dev 3: T016 → T017  (input-output)
Dev 4: T018 → T019  (functions)
Dev 5: T020 → T021  (if-statement)
Dev 6: T022 → T023  (for-loop)
Dev 7: T024 → T025  (arrays)
Dev 8: T026 → T027  (strings)
Dev 9: T028 → T029  (file-handling)
Dev 10: T030 → T031 (examples)
```

### Maximum parallelism in Phase 5:

```
T034 (tsc check)
T035 (biome check)    ← both run simultaneously
```

Then T036 when both pass.

---

## Implementation Strategy

| Scope                          | Tasks                  | Rationale                                                    |
| ------------------------------ | ---------------------- | ------------------------------------------------------------ |
| **MVP (Phase 2 done)**         | T001–T011              | Foundation ready; no visible user value yet                  |
| **MVP increment 1 (1 module)** | T012–T013 + smoke test | Prove end-to-end pipeline works before authoring remaining 9 |
| **US1 complete**               | T014–T031              | All 10 modules deliver value; releasable                     |
| **US2 polish**                 | T032–T033              | Quick-scan UX improvement                                    |
| **Merge-ready**                | T034–T036              | Type-safe + Biome-clean + visually verified                  |

> **Recommended approach**: Implement one complete module (e.g. `basic-c-syntax`, T012–T013) end-to-end first and verify it renders correctly in the browser before authoring the remaining 9 content files in parallel.
