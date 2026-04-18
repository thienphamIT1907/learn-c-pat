# Module Public API Contract: Phase 1 — Init Base with Module Placeholders

**Type**: FSD Slice Public API (barrel exports via `index.ts`)
**Principle**: Every FSD slice exposes ONLY what is listed here. Internal paths are private.

---

## Rule

No code outside a slice's own directory may import from internal paths.

```typescript
// ✅ Correct — import from public API
import { BasicCSyntaxPage } from "@/features/basic-c-syntax";

// ❌ Forbidden — import from internal path
import { BasicCSyntaxPage } from "@/features/basic-c-syntax/ui/BasicCSyntaxPage";
```

---

## entities/module

**Path**: `src/entities/module/index.ts`

| Export | Type | Description |
|---|---|---|
| `Module` | `interface` | TypeScript type for a single C concept module |
| `ModuleStatus` | `type` | `"available" \| "coming-soon"` |
| `ModuleRegistry` | `type` | `readonly Module[]` |
| `MODULE_REGISTRY` | `const ModuleRegistry` | Ordered list of all 10 modules |

```typescript
// src/entities/module/index.ts
export type { Module, ModuleStatus, ModuleRegistry } from "./model/module.types";
export { MODULE_REGISTRY } from "./config/modules";
```

---

## widgets/sidebar

**Path**: `src/widgets/sidebar/index.ts`

| Export | Type | Description |
|---|---|---|
| `Sidebar` | `React.FC<SidebarProps>` | Sidebar container component |

**`SidebarProps`**:
```typescript
interface SidebarProps {
  /** Ordered list of modules to render as nav items. */
  modules: readonly Module[];
  /** The slug of the currently active module. Used to highlight the active item. */
  activeSlug: string;
}
```

```typescript
// src/widgets/sidebar/index.ts
export { Sidebar } from "./ui/Sidebar";
export type { SidebarProps } from "./ui/Sidebar";
```

---

## features/* (all 10 C concept slices)

Each feature slice exports exactly one component: its placeholder page.

| Slice directory | Export | Props |
|---|---|---|
| `features/basic-c-syntax` | `BasicCSyntaxPage` | none |
| `features/data-types` | `DataTypesPage` | none |
| `features/input-output` | `InputOutputPage` | none |
| `features/functions` | `FunctionsPage` | none |
| `features/if-statement` | `IfStatementPage` | none |
| `features/for-loop` | `ForLoopPage` | none |
| `features/arrays` | `ArraysPage` | none |
| `features/strings` | `StringsPage` | none |
| `features/file-handling` | `FileHandlingPage` | none |
| `features/examples` | `ExamplesPage` | none |

All `*Page` components are zero-prop placeholder components that render the module title
and a "Coming soon" message. Props are intentionally empty for Phase 1.

**Example `index.ts`** (same pattern for all 10):
```typescript
// src/features/basic-c-syntax/index.ts
export { BasicCSyntaxPage } from "./ui/BasicCSyntaxPage";
```

---

## pages/module-view

**Path**: `src/pages/module-view/index.ts`

| Export | Type | Description |
|---|---|---|
| `ModuleViewPage` | `React.FC` | Full dashboard page; reads `:moduleSlug` from URL params |

```typescript
// src/pages/module-view/index.ts
export { ModuleViewPage } from "./ui/ModuleViewPage";
```

**Internal responsibilities** (not part of public API):
- Reads `moduleSlug` from `useParams()`
- Looks up active module in `MODULE_REGISTRY`
- Renders `<Sidebar>` + the matched feature slice component
- Renders 404 panel if `moduleSlug` is not found

---

## shared/ui

**Path**: `src/shared/ui/index.ts`

Re-exports shadcn/ui primitives used across the project. Only components actually used in
Phase 1 are exported here. Additional components are added on demand.

| Export | Source | Used by |
|---|---|---|
| `cn` | `src/shared/lib/utils.ts` | All components needing conditional class merging |

> shadcn/ui components are added individually via `pnpm dlx shadcn@latest add <component>`.
> Only install components you use — do not bulk-install the entire library.

---

## shared/config/routes

**Path**: `src/shared/config/routes.ts`

| Export | Type | Description |
|---|---|---|
| `ROUTES` | `const` | Route path constants and builder functions |

(See `contracts/routing.md` for full specification.)

---

## Import Layer Rules (FSD)

Lower layers MUST NOT import from higher layers:

```
app      → can import from: pages, widgets, features, entities, shared
pages    → can import from: widgets, features, entities, shared
widgets  → can import from: features, entities, shared
features → can import from: entities, shared
entities → can import from: shared
shared   → cannot import from any other layer
```

Cross-feature imports (e.g., `features/arrays` importing from `features/strings`) are
**forbidden**. If shared logic is needed, it MUST be extracted to `entities` or `shared`.
