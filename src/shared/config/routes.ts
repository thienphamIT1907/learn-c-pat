export const ROUTES = {
  ROOT: "/",
  MODULE: (slug: string) => `/modules/${slug}`,
  MODULE_PATTERN: "/modules/:moduleSlug",
} as const;
