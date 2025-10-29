"use client";

import { MouseEvent, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type Item = { id: string; label: string };

export default function QuickNav({ items }: { items: Item[] }) {
  const [active, setActive] = useState("");

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => entry.isIntersecting && setActive(entry.target.id)),
      { rootMargin: "-40% 0px -55% 0px" }
    );
    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [items]);

  const go = (id: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  };

  return (
    <nav
      aria-label="Quick navigation"
      className="fixed right-6 top-[30%] z-50 hidden w-52 rounded-3xl border border-white/60 bg-white/80 p-3 shadow-soft backdrop-blur-xl xl:block"
    >
      <ul className="space-y-1">
        {items.map((item) => {
          const isActive = active === item.id;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={go(item.id)}
                onFocus={() => setActive(item.id)}
                onMouseEnter={() => setActive(item.id)}
                className={cn(
                  "block rounded-2xl px-3 py-2 text-sm font-medium text-slate-600 transition-colors duration-200",
                  isActive
                    ? "bg-emerald-100/70 text-charcoal shadow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
                    : "hover:bg-emerald-50/80 hover:text-charcoal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300"
                )}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
