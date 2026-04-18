import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ModuleViewPage } from "@/pages/module-view";
import { ROUTES } from "@/shared/config/routes";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default redirect: / → first module */}
        <Route
          path={ROUTES.ROOT}
          element={<Navigate to={ROUTES.MODULE("basic-c-syntax")} replace />}
        />
        {/* Module view: /modules/:moduleSlug */}
        <Route path={ROUTES.MODULE_PATTERN} element={<ModuleViewPage />} />
        {/* Catch-all: 404 handled inside ModuleViewPage */}
        <Route path="*" element={<ModuleViewPage />} />
      </Routes>
    </BrowserRouter>
  );
}
