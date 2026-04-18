import { type ReactElement, useEffect } from "react";
import { useParams } from "react-router-dom";
import { MODULE_REGISTRY } from "@/entities/module";
import { ArraysPage } from "@/features/arrays";
import { BasicCSyntaxPage } from "@/features/basic-c-syntax";
import { DataTypesPage } from "@/features/data-types";
import { ExamplesPage } from "@/features/examples";
import { FileHandlingPage } from "@/features/file-handling";
import { ForLoopPage } from "@/features/for-loop";
import { FunctionsPage } from "@/features/functions";
import { IfStatementPage } from "@/features/if-statement";
import { InputOutputPage } from "@/features/input-output";
import { StringsPage } from "@/features/strings";
import { Sidebar } from "@/widgets/sidebar";

// Maps each module slug to its placeholder page component.
// Responsive layout strategy:
//   - min-w-[375px] on root ensures minimum viewport support per spec
//   - sidebar is fixed-width 256px (w-64), hidden via flex on small viewports
//   - content panel grows to fill remaining width (flex-1 min-w-0)
const MODULE_PAGES: Record<string, () => ReactElement> = {
  "basic-c-syntax": BasicCSyntaxPage,
  "data-types": DataTypesPage,
  "input-output": InputOutputPage,
  functions: FunctionsPage,
  "if-statement": IfStatementPage,
  "for-loop": ForLoopPage,
  arrays: ArraysPage,
  strings: StringsPage,
  "file-handling": FileHandlingPage,
  examples: ExamplesPage,
};

function NotFoundPanel() {
  return (
    <div className="flex flex-col items-start gap-4 p-8">
      <h1 className="text-2xl font-semibold tracking-tight">Không tìm thấy trang</h1>
      <p className="text-muted-foreground">
        Chủ đề bạn đang tìm không tồn tại. Vui lòng chọn một chủ đề từ thanh bên.
      </p>
    </div>
  );
}

export function ModuleViewPage() {
  const { moduleSlug = "" } = useParams<{ moduleSlug: string }>();
  const activeModule = MODULE_REGISTRY.find((m) => m.slug === moduleSlug);
  const PageComponent = MODULE_PAGES[moduleSlug];

  // Update document title on module change (T038)
  useEffect(() => {
    document.title = activeModule ? `${activeModule.title} — Học C` : "Học C";
  }, [activeModule]);

  return (
    <div className="flex min-h-screen min-w-93.75">
      <Sidebar modules={MODULE_REGISTRY} />
      <main className="flex-1 min-w-0 overflow-y-auto">
        {PageComponent ? <PageComponent /> : <NotFoundPanel />}
      </main>
    </div>
  );
}
