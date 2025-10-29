"use client";

import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [pct, setPct] = useState(0);
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      setEnabled(false);
      return;
    }
    const on = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setPct(max > 0 ? Math.round((h.scrollTop / max) * 100) : 0);
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        className="scroll-progress-bar fixed left-0 top-0 z-[60] h-1 transition-[width] duration-150 ease-snappy"
        style={{ width: `${pct}%` }}
        aria-hidden
      />
      <div
        className="fixed bottom-3 right-3 z-[60] rounded-2xl border border-white/20 bg-charcoal/80 px-3 py-2 text-xs font-semibold text-white shadow-soft backdrop-blur"
        aria-label={`Scroll progress ${pct}%`}
      >
        {pct}%
      </div>
    </>
  );
}
