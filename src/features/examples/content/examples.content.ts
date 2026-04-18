import { parseModuleContent } from "@/shared/lib/parseModuleContent";
import raw from "./examples.content.md?raw";

export const examplesContent = parseModuleContent(raw);
