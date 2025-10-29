"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import { altFor, resolveStatic } from "@/lib/media";

const spring = { type: "spring", stiffness: 260, damping: 30 } as const;
const heroMediaSrc = "/src/assets/aerial-view-of-classical-american-home-in-south-ca-2024-12-06-15-52-18-utc.jpg";
const heroImage = resolveStatic(heroMediaSrc);
const heroAlt = altFor(heroMediaSrc);

export function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden rounded-[2.5rem] bg-charcoal text-mint shadow-soft">
      <motion.div
        initial={reduceMotion ? undefined : { opacity: 0, y: 40 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        transition={spring}
        viewport={{ once: true, amount: 0.6 }}
        className="grid gap-10 px-8 py-16 lg:grid-cols-2 lg:px-16"
      >
        <div className="space-y-6">
          <div className="inline-flex items-center gap-3 rounded-full bg-white/10 px-4 py-2 text-sm">
            <span className="flex h-2 w-2 rounded-full bg-accent" />
            FCA regulated advisers • Decision-ready in 10 minutes
          </div>
          <h1 className="text-4xl font-display font-semibold leading-tight tracking-tight text-white sm:text-5xl">
            Tailored mortgage & business finance without the bank stress.
          </h1>
          <p className="text-lg text-mint/80">
            Expert brokers, instant calculators, and FCA-backed advice to get you from enquiry to offer faster — whether
            you're buying a home, scaling a portfolio, or bridging a commercial deal.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button
              className="rounded-full px-8 py-3 text-base transition-transform duration-200 hover:-translate-y-0.5 focus-visible:-translate-y-0.5"
              asChild
            >
              <a href="#prequal">Get a Quote</a>
            </Button>
            <Button
              variant="secondary"
              className="rounded-full px-8 py-3 text-base transition-transform duration-200 hover:-translate-y-0.5 focus-visible:-translate-y-0.5"
              asChild
            >
              <a href="https://calendly.com/lendly-team/intro" rel="noopener noreferrer" target="_blank">
                Book a Call
              </a>
            </Button>
          </div>
          <div className="flex flex-wrap items-center gap-6 text-sm text-mint/70">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-full border border-mint/30 bg-white/10" />
              <div>
                <p className="font-semibold text-white">4.9/5 Trustpilot</p>
                <p>UK customers love our human-first service</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-accent" />
              <div>
                <p className="font-semibold text-white">Quote in 10 minutes</p>
                <p>Speak directly with an adviser</p>
              </div>
            </div>
          </div>
        </div>
        <div className="relative">
          {!reduceMotion && (
            <motion.div
              className="absolute -top-10 right-0 hidden h-72 w-72 rounded-full border border-accent/40 lg:block"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ repeat: Infinity, duration: 16, ease: "easeInOut" }}
            />
          )}
          <motion.div
            initial={reduceMotion ? undefined : { scale: 0.95, opacity: 0 }}
            whileInView={reduceMotion ? undefined : { scale: 1, opacity: 1 }}
            whileHover={reduceMotion ? undefined : { y: -6 }}
            transition={{ ...spring, duration: 0.22 }}
            viewport={{ once: true }}
            className="group glass relative h-full min-h-[320px] overflow-hidden rounded-[2rem]"
          >
            {heroImage ? (
              <Image
                src={heroImage}
                alt={heroAlt}
                fill
                sizes="(max-width:1024px) 100vw, 40vw"
                className="object-cover"
                placeholder="empty"
                priority
              />
            ) : null}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-charcoal/40 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 rounded-2xl bg-white/80 px-5 py-4 text-sm text-charcoal shadow-soft transition-transform duration-200 group-hover:-translate-y-1">
              <p className="font-semibold">Availability</p>
              <p className="text-xs text-slate-600">Mon–Sat • 8am–8pm</p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
