"use client";

import Image from "next/image";
import { pickHero, altFor, resolveStatic } from "@/lib/media";

export default function PageHero({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) {
  const hero = pickHero();
  const heroImg = resolveStatic(hero);
  const alt = hero ? altFor(hero) : "Mortgage hero image";

  return (
    <section
      aria-label="Page hero"
      style={{ position: "relative", borderRadius: 16, overflow: "hidden", isolation: "isolate" }}
    >
      {heroImg ? (
        <Image
          src={heroImg}
          alt={alt}
          priority
          fill
          sizes="100vw"
          style={{ objectFit: "cover", filter: "saturate(110%) contrast(1.05)" }}
          placeholder="empty"
        />
      ) : null}
      <div
        style={{
          position: "relative",
          padding: "64px 24px",
          background: "linear-gradient(180deg,rgba(6,95,70,.35),rgba(17,24,39,.55))",
          color: "#fff",
        }}
      >
        <h1 style={{ fontSize: 36, margin: "0 0 8px 0" }}>{title}</h1>
        {children}
      </div>
    </section>
  );
}






