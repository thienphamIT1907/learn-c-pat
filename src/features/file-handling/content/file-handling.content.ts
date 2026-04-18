import { parseModuleContent } from "@/shared/lib/parseModuleContent";
import raw from "./file-handling.content.md?raw";

export const fileHandlingContent = parseModuleContent(raw);
