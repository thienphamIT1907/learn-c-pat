import mermaid from "mermaid";
import { AppRouter } from "./router";

mermaid.initialize({ startOnLoad: false, theme: "neutral" });

export function App() {
  return <AppRouter />;
}
