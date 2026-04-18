import { parseModuleContent } from "@/shared/lib/parseModuleContent";
import raw from "./basic-c-syntax.content.md?raw";

export const basicCSyntaxContent = parseModuleContent(raw);
