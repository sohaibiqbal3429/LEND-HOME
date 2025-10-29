"use client";

import { MouseEvent, useEffect, useState } from "react";

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

  const go = (id: string) => (event: MouseEvent) => {
    event.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  };

  return (
    <nav
      aria-label="Quick navigation"
      className="hidden xl:block"
      style={{
        position: "fixed",
        right: 12,
        top: "30%",
        zIndex: 50,
        background: "rgba(255,255,255,.7)",
        backdropFilter: "blur(8px)",
        borderRadius: 12,
        border: "1px solid rgba(0,0,0,.08)",
        padding: 8,
      }}
    >
      <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              onClick={go(item.id)}
              onFocus={() => setActive(item.id)}
              onMouseEnter={() => setActive(item.id)}
              style={{
                display: "block",
                padding: "8px 10px",
                borderRadius: 8,
                textDecoration: "none",
                fontSize: 13,
                color: active === item.id ? "#111827" : "#374151",
                background:
                  active === item.id ? "rgba(167,243,208,.7)" : "transparent",
                outline: "2px solid transparent",
                outlineOffset: 2,
              }}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
