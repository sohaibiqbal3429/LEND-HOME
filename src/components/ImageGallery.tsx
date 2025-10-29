"use client";

import clsx from "clsx";
import Image from "next/image";
import type { StaticImageData } from "next/image";
import type { FocusEvent, PointerEvent } from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { altFor, pickGallery, resolveStatic } from "@/lib/media";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type GalleryImage = {
  id: string;
  alt: string;
  src: StaticImageData;
};

const GAP_DESKTOP = 28;
const GAP_TABLET = 20;
const GAP_MOBILE = 14;

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

function getSlidesPerView(width: number) {
  if (width >= 1200) return 4;
  if (width >= 1024) return 3;
  if (width >= 768) return 2;
  return 1;
}

function getGap(width: number) {
  if (width >= 1200) return GAP_DESKTOP;
  if (width >= 1024) return 24;
  if (width >= 768) return GAP_TABLET;
  return GAP_MOBILE;
}

export default function ImageGallery() {
  const sources = useMemo(() => pickGallery() ?? [], []);
  const prefersReducedMotion = usePrefersReducedMotion();

  const images: GalleryImage[] = useMemo(() => {
    return sources
      .map((src) => ({
        id: src,
        alt: altFor(src),
        src: resolveStatic(src),
      }))
      .filter((item): item is GalleryImage => item.src != null) as GalleryImage[];
  }, [sources]);

  const [viewportWidth, setViewportWidth] = useState<number>(() => (typeof window === "undefined" ? 0 : window.innerWidth));

  useEffect(() => {
    if (typeof window === "undefined") return;
    const update = () => setViewportWidth(window.innerWidth);
    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);

  const slidesPerView = useMemo(() => getSlidesPerView(viewportWidth), [viewportWidth]);
  const sliderGap = useMemo(() => getGap(viewportWidth), [viewportWidth]);

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
  const [paused, setPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const controlsDisabled = pageCount <= 1;

  useEffect(() => {
    setActivePage(0);
  }, [slidesPerView, pageCount]);

  useEffect(() => {
    if (!isTransitioning) return;
    const timer = window.setTimeout(() => setIsTransitioning(false), 420);
    return () => window.clearTimeout(timer);
  }, [isTransitioning]);

  const paginate = useCallback(
    (delta: number) => {
      if (!pageCount || isTransitioning) return;
      setIsTransitioning(true);
      setActivePage((prev) => (prev + delta + pageCount) % pageCount);
    },
    [isTransitioning, pageCount]
  );

  useInterval(
    () => paginate(1),
    paused || prefersReducedMotion || pageCount <= 1 ? null : 4500
  );

  const dragState = useRef<{ startX: number | null }>({ startX: null });

  const handlePointerDown = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      if (prefersReducedMotion) return;
      setPaused(true);
      // Manual pointer detection replaces framer-motion drag handling to keep the bundle lean.
      dragState.current.startX = event.clientX;
      event.currentTarget.setPointerCapture(event.pointerId);
    },
    [prefersReducedMotion]
  );

  const handlePointerUp = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      if (dragState.current.startX === null) return;
      const delta = event.clientX - dragState.current.startX;
      if (Math.abs(delta) > 60) {
        paginate(delta < 0 ? 1 : -1);
      }
      dragState.current.startX = null;
      event.currentTarget.releasePointerCapture(event.pointerId);
      setPaused(false);
    },
    [paginate]
  );

  if (!images.length) return null;

  return (
    <div className="space-y-10">
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
                    setIsTransitioning(true);
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

        <div
          className="relative overflow-hidden rounded-lg"
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          style={{ touchAction: "pan-y" }}
        >
          {/* Flex wrapper allows smooth translate animations without framer-motion. */}
          <div
            className="flex transition-transform duration-500 ease-snappy"
            style={{ transform: `translateX(-${activePage * 100}%)` }}
          >
            {pages.map((page, pageIndex) => (
              <div key={`page-${pageIndex}`} className="min-w-full shrink-0 px-1">
                <div
                  className={clsx(
                    "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
                    prefersReducedMotion && "transition-none"
                  )}
                  style={{ gap: `${sliderGap}px` }}
                >
                  {page.map((img) => (
                    <figure
                      key={img.id}
                      className="relative overflow-hidden rounded-md border border-emerald-100 shadow-sm"
                    >
                      <div className="relative w-full aspect-[4/3]">
                        <Image
                          src={img.src}
                          alt={img.alt || "Gallery image"}
                          fill
                          sizes="(min-width:1280px) 25vw, (min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw"
                          className="object-cover"
                        />
                      </div>
                    </figure>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
