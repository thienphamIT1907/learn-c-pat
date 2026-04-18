import { parseModuleContent } from "@/shared/lib/parseModuleContent";
import raw from "./input-output.content.md?raw";

export const inputOutputContent = parseModuleContent(raw);
