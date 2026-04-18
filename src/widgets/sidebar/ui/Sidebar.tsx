import type { Module } from "../../../entities/module";
import { SidebarItem } from "./SidebarItem";

export interface SidebarProps {
  modules: readonly Module[];
}

export function Sidebar({ modules }: SidebarProps) {
  return (
    <nav
      aria-label="Các chủ đề học C"
      className="flex h-screen w-64 shrink-0 flex-col gap-1 overflow-y-auto bg-card px-3 py-4 border-r border-border"
    >
      <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Khái niệm C
      </p>
      {modules.map((module) => (
        <SidebarItem key={module.id} module={module} />
      ))}
    </nav>
  );
}
