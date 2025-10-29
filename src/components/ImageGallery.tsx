"use client";

import clsx from "clsx";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { PanInfo } from "framer-motion";
import Image from "next/image";
import type { FocusEvent } from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useMediaQuery } from "usehooks-ts";

import { altFor, pickGallery, resolveStatic } from "@/lib/media";

type GalleryImage = {
  id: string;
  alt: string;
  src: ReturnType<typeof resolveStatic>;
};

const GAP_DESKTOP = 28;
const GAP_TABLET = 20;
const GAP_MOBILE = 14;

const SLIDE_VARIANTS = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.35, ease: "easeOut" },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? "-100%" : "100%",
    opacity: 0,
    transition: { duration: 0.35, ease: "easeIn" },
  }),
};

/** Minimal useInterval (cleans up on null delay) */
function useInterval(callback: () => void, delay: number | null) {
  const savedRef = useRef(callback);
  useEffect(() => {
    savedRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay === null) return;
    const id = setInterval(() => savedRef.current(), delay);
    return () => clearInterval(id);
  }, [delay]);
}

export default function ImageGallery() {
  const sources = pickGallery() ?? [];

  const images: GalleryImage[] = useMemo(() => {
    return sources
      .map((src) => ({
        id: src,
        alt: altFor(src),
        src: resolveStatic(src),
      }))
      .filter((item): item is GalleryImage => Boolean(item.src));
  }, [sources]);

  const prefersReducedMotion = useReducedMotion();
  const isDesktop = useMediaQuery("(min-width: 1200px)");
  const isLargeTablet = useMediaQuery("(min-width: 1024px)");
  const isTablet = useMediaQuery("(min-width: 768px)");

  const slidesPerView = isDesktop ? 4 : isLargeTablet ? 3 : isTablet ? 2 : 1;
  const sliderGap =
    isDesktop ? GAP_DESKTOP : isLargeTablet ? 24 : isTablet ? GAP_TABLET : GAP_MOBILE;

  // Build pages by chunking and looping the last page with the first items
  const pages = useMemo(() => {
    if (!images.length) return [];
    const chunked: GalleryImage[][] = [];
    for (let i = 0; i < images.length; i += slidesPerView) {
      chunked.push(images.slice(i, i + slidesPerView));
    }
    if (chunked.length) {
      const last = chunked[chunked.length - 1];
      if (last.length < slidesPerView) {
        chunked[chunked.length - 1] = [
          ...last,
          ...images.slice(0, slidesPerView - last.length),
        ];
      }
    }
    return chunked;
  }, [images, slidesPerView]);

  const pageCount = pages.length;

  const [activePage, setActivePage] = useState(0);
  const [direction, setDirection] = useState(0);
  const [paused, setPaused] = useState(false);
  const controlsDisabled = pageCount <= 1;

  // Reset to first page when layout changes
  useEffect(() => {
    setActivePage(0);
  }, [slidesPerView, pageCount]);

  const paginate = useCallback(
    (delta: number) => {
      if (!pageCount) return;
      setDirection(delta);
      setActivePage((prev) => (prev + delta + pageCount) % pageCount);
    },
    [pageCount]
  );

  // Autoplay
  useInterval(
    () => paginate(1),
    paused || prefersReducedMotion || pageCount <= 1 ? null : 4500
  );

  const handleDragEnd = useCallback(
    (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      if (info.offset.x < -60) paginate(1);
      if (info.offset.x > 60) paginate(-1);
    },
    [paginate]
  );

  const sliderItems = pages[activePage] ?? [];

  if (!images.length) return null;

  return (
    <div className="space-y-10">
      {/* Carousel controls + dots */}
      <section
        aria-label="LENDLY gallery carousel"
        className="space-y-4"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={(event: FocusEvent<HTMLElement>) => {
          const nextTarget = event.relatedTarget as Node | null;
          if (!event.currentTarget.contains(nextTarget)) {
            setPaused(false);
          }
        }}
      >
        <div className="flex items-center justify-between">
          <nav className="flex items-center gap-2" aria-label="Gallery controls">
            <button
              type="button"
              onClick={() => paginate(-1)}
              className="rounded-full border border-emerald-200 bg-white px-3 py-2 text-sm font-medium text-charcoal transition hover:border-emerald-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-emerald-200"
              aria-label="Previous slides"
              disabled={controlsDisabled}
            >
              ‹
            </button>
            <button
              type="button"
              onClick={() => paginate(1)}
              className="rounded-full border border-emerald-200 bg-white px-3 py-2 text-sm font-medium text-charcoal transition hover:border-emerald-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-emerald-200"
              aria-label="Next slides"
              disabled={controlsDisabled}
            >
              ›
            </button>
          </nav>

          <div className="flex items-center gap-1" role="tablist" aria-label="Slide pagination">
            {Array.from({ length: pageCount }).map((_, index) => {
              const isActive = index === activePage;
              return (
                <button
                  key={`dot-${index}`}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`Go to slide ${index + 1}`}
                  onClick={() => {
                    setDirection(index > activePage ? 1 : -1);
                    setActivePage(index);
                  }}
                  className={clsx(
                    "h-2.5 w-2.5 rounded-full border transition",
                    isActive
                      ? "border-emerald-500 bg-emerald-500"
                      : "border-emerald-200 bg-white hover:border-emerald-300"
                  )}
                />
              );
            })}
          </div>
        </div>

        {/* Slider viewport */}
        <div
          className="relative overflow-hidden rounded-lg"
          style={{ paddingBottom: 0 }}
        >
          <AnimatePresence custom={direction} mode="wait" initial={false}>
            <motion.div
              key={activePage}
              custom={direction}
              variants={SLIDE_VARIANTS}
              initial="enter"
              animate="center"
              exit="exit"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={handleDragEnd}
              className="w-full"
            >
              {/* Grid per page; equal tiles with fixed aspect ratio */}
              <div
                className={clsx(
                  "grid",
                  "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                )}
                style={{
                  gap: `${sliderGap}px`,
                }}
              >
                {sliderItems.map((img) => (
                  <figure
                    key={img.id}
                    className="relative overflow-hidden rounded-md border border-emerald-100 shadow-sm"
                  >
                    {/* Equal size frame */}
                    <div className="relative w-full aspect-[4/3]">
                      <Image
                        src={img.src}
                        alt={img.alt || "Gallery image"}
                        fill
                        sizes="(min-width:1280px) 25vw, (min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw"
                        className="object-cover"
                        priority={false}
                      />
                    </div>
                  </figure>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
