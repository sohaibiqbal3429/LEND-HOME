"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Toaster } from "@/components/ui/toaster";
import { SessionProvider } from "next-auth/react";

export function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    // Use rAF-powered CSS transitions in place of framer-motion to shrink the bundle size.
    setIsReady(false);
    const frame = requestAnimationFrame(() => setIsReady(true));
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  return (
    <SessionProvider>
      <div key={pathname} className={isReady ? "page-transition-active" : "page-transition-enter"}>
        {children}
        <Toaster />
      </div>
    </SessionProvider>
  );
}
