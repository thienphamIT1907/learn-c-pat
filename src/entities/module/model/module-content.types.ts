export interface FaqItem {
  question: string;
  answer: string;
}

export interface FlowDiagram {
  title: string;
  definition: string; // Mermaid DSL
}

export interface CodeExample {
  title: string;
  language: string;
  code: string;
  expectedOutput?: string;
}

export interface ModuleExplanation {
  what: string;
  when: string;
  how: string;
}

export interface ModuleContent {
  explanation: ModuleExplanation;
  codeExample: CodeExample;
  diagram: FlowDiagram;
  faq: FaqItem[];
}
