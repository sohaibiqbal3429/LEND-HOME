"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/mortgages", label: "Mortgages" },
  { href: "/business-finance", label: "Business Finance" },
  { href: "/calculator", label: "Calculator" },
  { href: "/learn", label: "Learn" },
  { href: "/contact", label: "Contact" }
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl">
      <div className="border-b border-white/20 bg-white/70">
        <div className="container flex items-center justify-between py-4">
          <Link href="/" className="text-2xl font-display font-semibold text-primary">
            LENDLY
          </Link>
          <div className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="font-medium text-slate-700 hover:text-primary">
                {link.label}
              </Link>
            ))}
            <Button asChild>
              <Link href="/apply">Get a Quote</Link>
            </Button>
          </div>
          <button
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 text-slate-700 lg:hidden"
            onClick={() => setOpen((prev) => !prev)}
            aria-expanded={open}
            aria-label="Toggle navigation"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      <motion.nav
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 24 }}
        className={cn("overflow-hidden border-b border-white/20 bg-white/90 lg:hidden")}
      >
        <div className="container flex flex-col gap-4 py-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-lg font-medium text-slate-700"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Button asChild className="w-full">
            <Link href="/apply">Get a Quote</Link>
          </Button>
        </div>
      </motion.nav>
    </header>
  );
}
