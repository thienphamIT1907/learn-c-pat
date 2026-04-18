export type ModuleStatus = "available" | "coming-soon";

export interface Module {
  /** Unique identifier and URL slug. Kebab-case. */
  id: string;
  /** URL-safe path segment. Identical to `id` in Phase 1. */
  slug: string;
  /** Human-readable display name shown in the sidebar and module header. */
  title: string;
  /** 1-based index controlling sidebar render order. Must be unique. */
  order: number;
  /** Phase 1: all "available". Future phases may use "coming-soon". */
  status: ModuleStatus;
}

/** Ordered list of all registered C concept modules. */
export type ModuleRegistry = readonly Module[];
