"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { altFor, pickProgramArt, resolveStatic } from "@/lib/media";

interface ProductCardProps {
  title: string;
  description: string;
  href: string;
  tag: string;
  mediaKey?: string;
}

const spring = { type: "spring", stiffness: 260, damping: 24 } as const;

export function ProductCard({ title, description, href, tag, mediaKey }: ProductCardProps) {
  const reduceMotion = useReducedMotion();
  const artSrc = mediaKey ? pickProgramArt(mediaKey) : null;
  const art = resolveStatic(artSrc ?? null);
  const alt = artSrc ? altFor(artSrc) : `${title} illustration`;

  return (
    <motion.article
      initial={reduceMotion ? undefined : { opacity: 0, y: 16 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      whileHover={reduceMotion ? undefined : { y: -6 }}
      transition={{ ...spring, duration: 0.2 }}
      className="glass group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl p-6"
    >
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
    </motion.article>
  );
}
