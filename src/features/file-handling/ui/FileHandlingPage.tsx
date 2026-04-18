import { CodeBlock, DiagramBlock, FaqSection } from "@/shared/ui";
import { fileHandlingContent } from "../content/file-handling.content";

export function FileHandlingPage() {
  const { explanation, codeExample, diagram, faq } = fileHandlingContent;
  return (
    <div className="flex flex-col gap-8 p-8 max-w-3xl">
      <h1 className="text-2xl font-semibold tracking-tight">Xử lý tệp tin</h1>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold">Giải thích</h2>
        <div className="flex flex-col gap-3">
          <p className="text-sm font-medium text-foreground">Là gì?</p>
          <p className="text-muted-foreground leading-relaxed">{explanation.what}</p>
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-sm font-medium text-foreground">Khi nào dùng?</p>
          <p className="text-muted-foreground leading-relaxed">{explanation.when}</p>
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-sm font-medium text-foreground">Dùng như thế nào?</p>
          <p className="text-muted-foreground leading-relaxed">{explanation.how}</p>
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold">Ví dụ code</h2>
        <CodeBlock
          title={codeExample.title}
          language={codeExample.language}
          code={codeExample.code}
          expectedOutput={codeExample.expectedOutput}
        />
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold">Sơ đồ luồng thực thi</h2>
        <DiagramBlock title={diagram.title} definition={diagram.definition} />
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold">Hỏi &amp; Đáp</h2>
        <FaqSection items={faq} />
      </section>
    </div>
  );
}
