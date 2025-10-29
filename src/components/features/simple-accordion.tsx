"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
}

export function Accordion({ items }: AccordionProps) {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);
  const reduceMotion = usePrefersReducedMotion();

  return (
    <div className="mt-6 divide-y divide-slate-200 rounded-3xl border border-slate-200 bg-white">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={item.question}>
            <button
              className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left transition-colors duration-200 hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary/40"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
            >
              <span className="text-base font-medium text-charcoal">{item.question}</span>
              <span className="text-2xl text-primary" aria-hidden>
                {isOpen ? "−" : "+"}
              </span>
            </button>
            <div
              className={cn(
                "grid overflow-hidden px-6 transition-all ease-snappy",
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              )}
              style={reduceMotion ? { transitionDuration: "1ms" } : undefined}
            >
              {/* Grid rows mimic the auto height animation without JS heavy lifting. */}
              <div className="min-h-0 pb-6 text-sm text-slate-600">{item.answer}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
