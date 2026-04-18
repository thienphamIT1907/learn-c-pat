<!--
SYNC IMPACT REPORT
==================
Version change: (none) → 1.0.0
New constitution — initial ratification.

Added sections:
  - Core Principles (6 principles)
  - Technology Stack
  - Development Workflow
  - Governance

Templates requiring updates:
  ✅ .specify/templates/plan-template.md  — Constitution Check gates align
  ✅ .specify/templates/spec-template.md  — no structural changes required
  ✅ .specify/templates/tasks-template.md — module-driven task grouping noted

Deferred TODOs: none
-->

# LearnC Constitution

## Core Principles

### I. Module-First Architecture

Every C concept MUST be delivered as a self-contained, independently learnable module.
Modules cover discrete topics (e.g., basic syntax, loops, conditions, string manipulation,
array manipulation). Each module MUST be navigable and completable without requiring
prior modules to be finished. No cross-module hard dependencies are permitted.
A new concept feature starts as a new module; modules that grow too broad MUST be split.

### II. Visualization-Driven Learning (NON-NEGOTIABLE)

Every code example MUST be accompanied by a visual explanation of how the code executes.
Visualization MUST use one or more of: step-by-step execution animation, Mermaid diagrams,
memory/variable state panels, or flow diagrams. Static code without a visual aid is not
acceptable for any core example. Mermaid diagrams are the preferred tool for control-flow
and data-structure illustrations.

### III. Interactive Code Editor

Every module MUST embed a live, editable code editor that allows students to modify and
re-run C examples in-browser. The editor MUST provide syntax highlighting for C, line
numbers, and immediate feedback (output panel or error display). Read-only examples are
permitted only for introductory context snippets; every primary example MUST be editable.

### IV. Component-Driven UI with shadcn/ui

All UI MUST be built with React 18+ and TypeScript in strict mode. Components MUST be
composed from shadcn/ui primitives. Tailwind CSS is the only permitted styling mechanism;
custom CSS files are forbidden unless a shadcn/ui primitive genuinely cannot fulfil the
requirement and the exception is documented. No raw HTML styling attributes (`style={}`
inline objects) unless animating dynamic values that Tailwind cannot express.

### V. Type Safety — No Compromises

All source files MUST use TypeScript with `strict: true`. The `any` type is forbidden;
use `unknown` with type guards instead. All module data contracts (module metadata,
exercise definitions, visualization step schemas) MUST have explicit TypeScript interfaces
or types defined in a shared `types/` directory. Props for every React component MUST be
fully typed.

### VI. Clean, Accessible, Modern UI

The interface MUST be clean and modern at all times — no cluttered layouts, no legacy
styling patterns. UI MUST be responsive and functional on screens ≥ 375 px wide.
Accessibility MUST meet WCAG 2.1 AA: all interactive elements MUST be keyboard-navigable,
color contrast ratios MUST meet AA thresholds, and meaningful `aria-*` labels MUST be
applied to non-text interactive elements.

## Technology Stack

The following technology choices are binding. Deviations require a constitution amendment.

| Concern | Mandated Technology |
|---|---|
| Framework | React 18+ with TypeScript (`strict: true`) |
| Styling | Tailwind CSS v3+ |
| Component library | shadcn/ui |
| Code editor | Monaco Editor or CodeMirror 6 (one only — choose at project start) |
| Diagrams | Mermaid.js |
| Package manager | pnpm |
| Build tool | Vite |
| Testing | Vitest + React Testing Library |

No additional UI component libraries may be introduced. Utility libraries (e.g., lodash,
date-fns) are permitted if they do not conflict with the above.

## Development Workflow

- Every feature MUST map to at least one named module or a cross-cutting concern
  (routing, layout, shared types).
- Pull requests MUST include: updated or new module definition, TypeScript types, and
  a screenshot or description of the visualization for any new code example.
- All new components MUST have a corresponding Vitest unit or integration test.
- Complexity MUST be justified: if a new dependency is added, document why the existing
  stack is insufficient in the PR description.
- Module content (example code, explanations) MUST be reviewed for pedagogical accuracy
  before merging — not just code correctness.

## Governance

This constitution supersedes all other coding guidelines and conventions for this project.
Amendments require:
1. A written rationale documenting the problem the current principle fails to address.
2. An updated version number following semantic versioning (MAJOR/MINOR/PATCH as defined
   below).
3. Propagation of the change to all affected templates and workflow documents.

Versioning policy:
- **MAJOR**: Removal or fundamental redefinition of an existing principle.
- **MINOR**: Addition of a new principle or a new mandatory technology.
- **PATCH**: Clarification, rewording, or non-semantic refinements.

All PRs and code reviews MUST verify compliance with the principles above. Violations
block merge. Justified exceptions MUST be recorded in the PR and tracked as tech debt.

**Version**: 1.0.0 | **Ratified**: 2026-04-18 | **Last Amended**: 2026-04-18
