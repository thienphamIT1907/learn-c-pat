import { parseModuleContent } from "@/shared/lib/parseModuleContent";
import raw from "./data-types.content.md?raw";

export const dataTypesContent = parseModuleContent(raw);
