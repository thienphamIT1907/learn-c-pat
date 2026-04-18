import type { FaqItem, ModuleContent } from "@/entities/module";

/**
 * Splits a markdown string into sections keyed by their ## heading text.
 * Content blocks (code fences) are safe because we scan line-by-line.
 */
function parseSections(raw: string): Record<string, string> {
  const sections: Record<string, string> = {};
  let currentSection = "";
  const currentLines: string[] = [];

  for (const line of raw.split("\n")) {
    if (line.startsWith("## ")) {
      if (currentSection) {
        sections[currentSection] = currentLines.join("\n").trim();
      }
      currentSection = line.slice(3).trim();
      currentLines.length = 0;
    } else if (currentSection) {
      currentLines.push(line);
    }
  }

  if (currentSection) {
    sections[currentSection] = currentLines.join("\n").trim();
  }

  return sections;
}

/** Extracts the value of a **Key:** metadata line. */
function extractMeta(text: string, key: string): string {
  const match = text.match(new RegExp(`\\*\\*${key}:\\*\\*\\s*(.+)`));
  return match ? match[1].trim() : "";
}

/**
 * Extracts the content of a fenced code block with the given language tag.
 * Looks for ```lang\n … \n``` pattern.
 */
function extractFencedBlock(text: string, lang: string): string {
  const openFence = `\`\`\`${lang}`;
  const startIdx = text.indexOf(`${openFence}\n`);
  if (startIdx === -1) return "";
  const contentStart = startIdx + openFence.length + 1;
  const endIdx = text.indexOf("\n```", contentStart);
  if (endIdx === -1) return "";
  return text.slice(contentStart, endIdx);
}

/** Parses FAQ items from **Q:** / answer pairs. */
function parseFaq(text: string): FaqItem[] {
  const items: FaqItem[] = [];
  const regex = /\*\*Q:\*\*\s*(.+?)\n([\s\S]*?)(?=\*\*Q:\*\*|$)/g;
  let match = regex.exec(text);
  while (match !== null) {
    const question = match[1].trim();
    const answer = match[2].trim();
    if (question) items.push({ question, answer });
    match = regex.exec(text);
  }

  return items;
}

/**
 * Parses a structured markdown string (imported via `?raw`) into a
 * `ModuleContent` object.
 *
 * Expected markdown sections:
 *   ## Là gì?
 *   ## Khi nào dùng?
 *   ## Dùng như thế nào?
 *   ## Ví dụ code      — contains **Title:**, **Language:**, ```lang code```, **Output:** ```text output```
 *   ## Sơ đồ          — contains **Title:**, ```mermaid definition```
 *   ## Hỏi & Đáp      — contains **Q:** / answer pairs
 */
export function parseModuleContent(raw: string): ModuleContent {
  const sections = parseSections(raw);

  // --- Code example ---
  const codeSection = sections["Ví dụ code"] ?? "";
  const codeTitle = extractMeta(codeSection, "Title");
  const codeLanguage = extractMeta(codeSection, "Language") || "c";
  const code = extractFencedBlock(codeSection, codeLanguage);

  const outputMarkerIdx = codeSection.indexOf("**Output:**");
  const afterOutput = outputMarkerIdx !== -1 ? codeSection.slice(outputMarkerIdx) : "";
  const rawOutput = extractFencedBlock(afterOutput, "text");
  const expectedOutput = rawOutput || undefined;

  // --- Diagram ---
  const diagramSection = sections["Sơ đồ"] ?? "";
  const diagramTitle = extractMeta(diagramSection, "Title");
  const diagramDef = extractFencedBlock(diagramSection, "mermaid");

  return {
    explanation: {
      what: sections["Là gì?"] ?? "",
      when: sections["Khi nào dùng?"] ?? "",
      how: sections["Dùng như thế nào?"] ?? "",
    },
    codeExample: {
      title: codeTitle,
      language: codeLanguage,
      code,
      expectedOutput,
    },
    diagram: {
      title: diagramTitle,
      definition: diagramDef,
    },
    faq: parseFaq(sections["Hỏi & Đáp"] ?? ""),
  };
}
