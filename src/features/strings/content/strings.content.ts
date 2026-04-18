import { parseModuleContent } from "@/shared/lib/parseModuleContent";
import raw from "./strings.content.md?raw";

export const stringsContent = parseModuleContent(raw);
