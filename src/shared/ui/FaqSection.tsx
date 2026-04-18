import { ChevronDown } from "lucide-react";
import { useState } from "react";
import type { FaqItem } from "@/entities/module";
import { cn } from "@/shared/lib/utils";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./collapsible";

interface FaqSectionProps {
  items: FaqItem[];
}

function FaqItemRow({ question, answer }: FaqItem) {
  const [open, setOpen] = useState(false);

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium hover:bg-muted/50 transition-colors">
        <span>{question}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 transition-transform duration-200 text-muted-foreground",
            open && "rotate-180",
          )}
        />
      </CollapsibleTrigger>
      <CollapsibleContent className="px-4 pb-3 text-sm text-muted-foreground leading-relaxed">
        {answer}
      </CollapsibleContent>
    </Collapsible>
  );
}

export function FaqSection({ items }: FaqSectionProps) {
  if (items.length === 0) return null;

  return (
    <div className="rounded-lg border border-border divide-y divide-border">
      {items.map((item) => (
        <FaqItemRow key={item.question} question={item.question} answer={item.answer} />
      ))}
    </div>
  );
}
