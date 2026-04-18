import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface CodeBlockProps {
  title?: string;
  language: string;
  code: string;
  expectedOutput?: string;
}

export function CodeBlock({ title, language, code, expectedOutput }: CodeBlockProps) {
  return (
    <div className="rounded-lg overflow-hidden border border-border">
      {title && (
        <div className="bg-muted px-4 py-2 text-sm font-medium text-muted-foreground border-b border-border">
          {title}
        </div>
      )}
      <SyntaxHighlighter
        language={language}
        style={oneDark}
        customStyle={{ margin: 0, borderRadius: 0, fontSize: "0.875rem" }}
        showLineNumbers
      >
        {code}
      </SyntaxHighlighter>
      {expectedOutput && (
        <div className="border-t border-border">
          <div className="bg-muted px-4 py-2 text-sm font-medium text-muted-foreground border-b border-border">
            Kết quả
          </div>
          <pre className="bg-black text-green-400 px-4 py-3 text-sm font-mono whitespace-pre-wrap">
            {expectedOutput}
          </pre>
        </div>
      )}
    </div>
  );
}
