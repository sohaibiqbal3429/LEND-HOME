"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { altFor, pickProgramArt, resolveStatic } from "@/lib/media";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useInViewOnce } from "@/hooks/useInViewOnce";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  title: string;
  description: string;
  href: string;
  tag: string;
  mediaKey?: string;
}

export function ProductCard({ title, description, href, tag, mediaKey }: ProductCardProps) {
  const reduceMotion = usePrefersReducedMotion();
  const { ref, isVisible } = useInViewOnce<HTMLElement>({ rootMargin: "-10% 0px" });

  const artSrc = mediaKey ? pickProgramArt(mediaKey) : null;
  const art = resolveStatic(artSrc ?? null);
  const alt = artSrc ? altFor(artSrc) : `${title} illustration`;

  return (
    <article
      ref={ref}
      className={cn(
        "glass hover-lift group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl p-6 transition-all",
        !reduceMotion && !isVisible && "translate-y-6 opacity-0",
        !reduceMotion && isVisible && "translate-y-0 opacity-100"
      )}
    >
      {/* CSS transitions keep the reveal lightweight now that framer-motion is gone. */}
      {art ? (
        <div className="absolute inset-0 opacity-20 transition-opacity duration-200 group-hover:opacity-30">
          <Image
            src={art}
            alt={alt}
            fill
            sizes="(max-width:1024px) 100vw, 33vw"
            className="object-cover"
            placeholder="empty"
          />
        </div>
      ) : null}
      <div className="relative space-y-4">
        <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">{tag}</span>
        <h3 className="text-2xl font-display text-charcoal">{title}</h3>
        <p className="text-slate-600">{description}</p>
      </div>
      <Link
        href={href}
        className="relative mt-6 inline-flex items-center gap-2 text-primary transition-transform duration-200 motion-safe:hover:translate-x-1"
      >
        Explore <ArrowRight className="h-4 w-4 transition-transform duration-200 motion-safe:group-hover:translate-x-1" />
      </Link>
    </article>
  );
}
