"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { cn, prefersReducedMotion } from "@/lib/utils";
import { altFor, pickTestimonials, resolveStatic } from "@/lib/media";

const testimonials = [
  {
    quote: "LENDLY secured our portfolio refinance in record time with far better rates than the high street.",
    name: "Amelia L.",
    role: "Portfolio landlord"
  },
  {
    quote: "The team guided us through a complex bridging loan with complete confidence and transparency.",
    name: "Kofi A.",
    role: "Property developer"
  },
  {
    quote: "Our first-time buyer mortgage was approved within days — fantastic communication throughout.",
    name: "Sarah & Imran",
    role: "First-time buyers"
  }
];

export function TestimonialMarquee() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const media = pickTestimonials();

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const container = containerRef.current;
    if (!container) return;
    let animationFrame: number;

    const step = () => {
      if (!paused) {
        container.scrollLeft += 0.5;
        if (container.scrollLeft >= container.scrollWidth - container.clientWidth) {
          container.scrollLeft = 0;
        }
      }
      animationFrame = requestAnimationFrame(step);
    };

    animationFrame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrame);
  }, [paused]);

  const extended = [...testimonials, ...testimonials];

  return (
    <div className="glass overflow-hidden rounded-3xl">
      <div
        ref={containerRef}
        className="group flex gap-6 overflow-x-hidden py-6"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        {extended.map((testimonial, index) => {
          const portraitSrc = media?.[index % (media.length || 1)];
          const portrait = portraitSrc ? resolveStatic(portraitSrc) : null;
          const alt = portraitSrc ? altFor(portraitSrc) : `${testimonial.name} portrait`;
          return (
            <figure
              key={`${testimonial.name}-${index}`}
              tabIndex={0}
              className={cn(
                "min-w-[320px] max-w-sm rounded-3xl border border-white/40 bg-white/70 p-6 text-left transition-transform duration-200",
                "motion-safe:group-hover:-translate-y-1"
              )}
            >
              {portrait ? (
                <div className="mb-4 flex items-center gap-3">
                  <span className="relative h-10 w-10 overflow-hidden rounded-full">
                    <Image src={portrait} alt={alt} fill sizes="40px" className="object-cover" placeholder="empty" />
                  </span>
                  <div className="text-xs uppercase tracking-[0.2em] text-primary/80">Client story</div>
                </div>
              ) : null}
              <blockquote className="text-lg text-slate-700">“{testimonial.quote}”</blockquote>
              <figcaption className="mt-4 text-sm font-medium text-primary">
                {testimonial.name} • <span className="font-normal text-slate-500">{testimonial.role}</span>
              </figcaption>
            </figure>
          );
        })}
      </div>
    </div>
  );
}
