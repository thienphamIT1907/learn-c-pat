import mermaid from "mermaid";
import { useEffect, useId, useRef, useState } from "react";
import { Skeleton } from "./skeleton";

interface DiagramBlockProps {
  title: string;
  definition: string;
}

export function DiagramBlock({ title, definition }: DiagramBlockProps) {
  const id = useId().replace(/:/g, "");
  const diagramId = `mermaid-${id}`;
  const [svg, setSvg] = useState<string | null>(null);
  const [error, setError] = useState(false);
  const rendered = useRef(false);

  useEffect(() => {
    if (rendered.current) return;
    rendered.current = true;

    mermaid
      .render(diagramId, definition)
      .then(({ svg: renderedSvg }) => {
        setSvg(renderedSvg);
      })
      .catch(() => {
        setError(true);
      });
  }, [diagramId, definition]);

  return (
    <div className="rounded-lg border border-border overflow-hidden">
      <div className="bg-muted px-4 py-2 text-sm font-medium text-muted-foreground border-b border-border">
        {title}
      </div>
      <div className="p-4 flex justify-center bg-background">
        {error && (
          <p className="text-sm text-muted-foreground">
            Không thể tải sơ đồ. Vui lòng làm mới trang.
          </p>
        )}
        {!error && svg === null && (
          <div className="w-full space-y-2">
            <Skeleton className="h-8 w-3/4 mx-auto" />
            <Skeleton className="h-8 w-1/2 mx-auto" />
            <Skeleton className="h-8 w-2/3 mx-auto" />
          </div>
        )}
        {!error && svg !== null && (
          // biome-ignore lint/security/noDangerouslySetInnerHtml: mermaid SVG output from static definition string
          <div dangerouslySetInnerHTML={{ __html: svg }} className="w-full" />
        )}
      </div>
    </div>
  );
}
