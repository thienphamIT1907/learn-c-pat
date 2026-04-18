import { NavLink } from "react-router-dom";
import type { Module } from "@/entities/module";
import { ROUTES } from "@/shared/config/routes";
import { cn } from "@/shared/lib/utils";

interface SidebarItemProps {
  module: Module;
}

export function SidebarItem({ module }: SidebarItemProps) {
  return (
    <NavLink
      to={ROUTES.MODULE(module.slug)}
      className={({ isActive }) =>
        cn(
          "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          isActive
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
        )
      }
    >
      {module.title}
    </NavLink>
  );
}
