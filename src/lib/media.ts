// lib/media.ts
import type { StaticImageData } from "next/image";
import mediaMap from "../../media-map.json";

import agentClient from "@/assets/a-real-estate-agent-and-client-are-discussing-prop-2025-10-08-12-40-17-utc.jpg";
import aerialHome from "@/assets/aerial-view-of-classical-american-home-in-south-ca-2024-12-06-15-52-18-utc.jpg";
import commutingCouple from "@/assets/business-couple-leaving-suburban-house-for-commute-2024-10-19-10-26-26-utc.jpg";
import keysCouple from "@/assets/cheerful-couple-with-keys-to-their-new-home-2025-02-10-01-38-30-utc.jpg";
import expensesCouple from "@/assets/couple-calculating-family-expences-2025-02-11-12-53-12-utc.jpg";
import familyPortrait from "@/assets/family-portrait-and-outdoor-with-parents-and-chil-2025-04-06-06-47-16-utc.jpg";
import accountant from "@/assets/financial-accountant-with-mockup-house-giving-cons-2025-03-14-19-31-47-utc.jpg";
import executivesOffice from "@/assets/in-a-contemporary-office-a-group-of-senior-execut-2025-04-30-22-30-41-utc.jpg";
import planningDay from "@/assets/planning-the-day-2025-01-29-08-23-03-utc.jpg";
import documentsSoldier from "@/assets/soldier-consults-top-secret-documents-2025-01-29-03-10-32-utc.jpg";
import viennaTrip from "@/assets/summer-trip-around-vienna-austria-2025-01-16-11-21-00-utc.jpg";
import verticalCouple from "@/assets/vertical-young-african-american-couple-looking-at-2025-02-12-03-15-34-utc.jpg";

export type MediaRecord = {
  analyzedAt: string;
  images: {
    src: string;
    basename: string;
    ratioHint: "wide" | "tall" | "square" | "unknown";
    subject:
      | "people"
      | "home-exterior"
      | "home-interior"
      | "document"
      | "office"
      | "logo"
      | "other";
    brightness: "bright" | "medium" | "dark" | "unknown";
    alt: string;
    caption: string;
    keywords: string[];
  }[];
  hero: string | null;
  gallery: string[];
  testimonials: string[];
  programArt: Record<string, string>;
};

const STATIC_IMAGES: Record<string, StaticImageData> = {
  ["a-real-estate-agent-and-client-are-discussing-prop-2025-10-08-12-40-17-utc.jpg"]: agentClient,
  ["aerial-view-of-classical-american-home-in-south-ca-2024-12-06-15-52-18-utc.jpg"]: aerialHome,
  ["business-couple-leaving-suburban-house-for-commute-2024-10-19-10-26-26-utc.jpg"]: commutingCouple,
  ["cheerful-couple-with-keys-to-their-new-home-2025-02-10-01-38-30-utc.jpg"]: keysCouple,
  ["couple-calculating-family-expences-2025-02-11-12-53-12-utc.jpg"]: expensesCouple,
  ["family-portrait-and-outdoor-with-parents-and-chil-2025-04-06-06-47-16-utc.jpg"]: familyPortrait,
  ["financial-accountant-with-mockup-house-giving-cons-2025-03-14-19-31-47-utc.jpg"]: accountant,
  ["in-a-contemporary-office-a-group-of-senior-execut-2025-04-30-22-30-41-utc.jpg"]: executivesOffice,
  ["planning-the-day-2025-01-29-08-23-03-utc.jpg"]: planningDay,
  ["soldier-consults-top-secret-documents-2025-01-29-03-10-32-utc.jpg"]: documentsSoldier,
  ["summer-trip-around-vienna-austria-2025-01-16-11-21-00-utc.jpg"]: viennaTrip,
  ["vertical-young-african-american-couple-looking-at-2025-02-12-03-15-34-utc.jpg"]: verticalCouple
};

let cache: MediaRecord | null = null;

export const loadMedia = (): MediaRecord | null => {
  if (cache) return cache;
  try {
    cache = mediaMap as MediaRecord;
    return cache;
  } catch {
    return null;
  }
};

export const pickHero = (m = loadMedia()) => m?.hero ?? null;
export const pickGallery = (m = loadMedia(), max = 12) => (m?.gallery ?? []).slice(0, max);
export const pickTestimonials = (m = loadMedia(), max = 4) =>
  (m?.testimonials ?? []).slice(0, max);
export const pickProgramArt = (key: string, m = loadMedia()) => m?.programArt?.[key] ?? null;
export const altFor = (src: string, m = loadMedia()) => {
  const media = m ?? loadMedia();
  const target = media?.images.find(
    (item) => item.src === src || src.endsWith(item.basename) || src.includes(item.basename)
  );
  return target?.alt ?? "Mortgage-related image";
};

export const resolveStatic = (src: string | null): StaticImageData | null => {
  if (!src) return null;
  const basename = src.split("/").pop() ?? src;
  return STATIC_IMAGES[basename] ?? null;
};
