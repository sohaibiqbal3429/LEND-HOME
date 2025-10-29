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
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: 3,
          width: `${pct}%`,
          background: "linear-gradient(90deg,#a7f3d0,#111827)",
          zIndex: 60,
          transition: "width 120ms cubic-bezier(0.22,1,0.36,1)",
        }}
        aria-hidden
      />
      <div
        style={{
          position: "fixed",
          right: 12,
          bottom: 12,
          zIndex: 60,
          background: "rgba(17,24,39,.85)",
          color: "#fff",
          borderRadius: 12,
          padding: "6px 10px",
          fontSize: 12,
          backdropFilter: "saturate(180%) blur(10px)",
          border: "1px solid rgba(255,255,255,.08)",
        }}
        aria-label={`Scroll progress ${pct}%`}
      >
        {pct}%
      </div>
    </>
  );
}
