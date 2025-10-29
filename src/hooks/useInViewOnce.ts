import { useEffect, useRef, useState } from "react";

/**
 * Observes the element once so we can trigger CSS transitions when it becomes visible.
 */
export function useInViewOnce<T extends HTMLElement>(options?: IntersectionObserverInit) {
  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const optionKey = JSON.stringify({
    rootMargin: options?.rootMargin ?? "0px",
    threshold: options?.threshold ?? 0,
  });

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined" || !ref.current || isVisible) return;
    const observer = new IntersectionObserver((entries, observerInstance) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observerInstance.disconnect();
        }
      });
    }, options);

    const node = ref.current;
    observer.observe(node);
    return () => observer.disconnect();
  }, [isVisible, optionKey, options]);

  return { ref, isVisible } as const;
}
