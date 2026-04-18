# Routing Contract: Phase 1 — Init Base with Module Placeholders

**Type**: URL Schema / Client-Side Routing
**Router**: React Router DOM v7 (`BrowserRouter`)
**Defined in**: `src/app/router.tsx` + `src/shared/config/routes.ts`

---

## URL Schema

| Route | Component | Description |
|---|---|---|
| `/` | — | Redirects to `/modules/basic-c-syntax` |
| `/modules/:moduleSlug` | `ModuleViewPage` | Renders the dashboard with the matching module active |

### Route Parameters

**`:moduleSlug`** — URL path segment identifying the active module.

Valid values are the `slug` fields from `MODULE_REGISTRY` (see `data-model.md`):

| Slug | Module Title |
|---|---|
| `basic-c-syntax` | Basic C Syntax |
| `data-types` | Data Types |
| `input-output` | Input & Output |
| `functions` | Functions |
| `if-statement` | If Statements |
| `for-loop` | For Loop Statements |
| `arrays` | Arrays |
| `strings` | Strings |
| `file-handling` | File Handling |
| `examples` | Examples |

### Unmatched Routes

Any URL not matching the above schema renders a **404 fallback** within the dashboard
shell (sidebar still visible, content panel shows "Page not found" message). The shell
MUST NOT unmount on unknown routes.

---

## Route Constants

Defined in `src/shared/config/routes.ts` to avoid magic strings:

```typescript
// src/shared/config/routes.ts

export const ROUTES = {
  ROOT: "/",
  MODULE: (slug: string) => `/modules/${slug}`,
  MODULE_PATTERN: "/modules/:moduleSlug",
} as const;
```

Usage: `<Link to={ROUTES.MODULE(module.slug)}>` — never hardcode URL strings inline.

---

## Navigation Behaviour Contract

| Trigger | Expected behaviour |
|---|---|
| App first load (`/`) | Immediately redirect to `/modules/basic-c-syntax` |
| Click sidebar item | Push new entry to history: `/modules/:slug` |
| Browser back button | Navigate to previous module (standard browser history) |
| Direct URL load (`/modules/arrays`) | Mounts correctly with `arrays` module active |
| Unknown slug (`/modules/xyz`) | Renders 404 panel; sidebar remains functional |
| Resize to < 375 px | Layout adapts (no JS navigation change; CSS concern) |

---

## Router Implementation Reference

```typescript
// src/app/router.tsx  (reference — not prescriptive implementation)

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ModuleViewPage } from "@/pages/module-view";
import { ROUTES } from "@/shared/config/routes";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.ROOT} element={<Navigate to={ROUTES.MODULE("basic-c-syntax")} replace />} />
        <Route path={ROUTES.MODULE_PATTERN} element={<ModuleViewPage />} />
        <Route path="*" element={<ModuleViewPage />} /> {/* 404 handled inside page */}
      </Routes>
    </BrowserRouter>
  );
}
```
