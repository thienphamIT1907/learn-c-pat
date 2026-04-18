import { parseModuleContent } from "@/shared/lib/parseModuleContent";
import raw from "./functions.content.md?raw";

export const functionsContent = parseModuleContent(raw);
