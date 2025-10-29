// scripts/analyze-images.ts
import fs from "fs";
import path from "path";

type ImageMeta = {
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
};
type MediaMap = {
  analyzedAt: string;
  inputsDir: string;
  images: ImageMeta[];
  hero: string | null;
  gallery: string[];
  testimonials: string[];
  programArt: Record<string, string>;
  notes: string[];
};

const ROOT = process.cwd();
const ASSETS_DIR = path.join(ROOT, "src", "assets");

const SUBJECT_HINTS: Record<string, ImageMeta["subject"]> = {
  couple: "people",
  family: "people",
  agent: "people",
  document: "document",
  review: "document",
  office: "office",
  interior: "home-interior",
  home: "home-exterior",
  house: "home-exterior",
  logo: "logo",
  planning: "document",
};
const subjectFrom = (n: string) => {
  const L = n.toLowerCase();
  for (const k in SUBJECT_HINTS) if (L.includes(k)) return SUBJECT_HINTS[k];
  return "other";
};
const ratioFrom = (n: string) =>
  /wide|banner/.test(n)
    ? "wide"
    : /square/.test(n)
    ? "square"
    : /tall|portrait/.test(n)
    ? "tall"
    : "unknown";
const brightFrom = (n: string) =>
  /night|dark/.test(n)
    ? "dark"
    : /bright|sun|day/.test(n)
    ? "bright"
    : "medium";
const toAlt = (b: string, s: ImageMeta["subject"]) => {
  const name = b.replace(/[-_]+/g, " ").replace(/\.\w+$/, "");
  const ctx =
    s === "people"
      ? "homebuyers discussing mortgages"
      : s === "document"
      ? "mortgage document review"
      : s === "office"
      ? "mortgage office"
      : s === "home-interior"
      ? "home interior related to mortgages"
      : s === "home-exterior"
      ? "home exterior related to mortgages"
      : "mortgage context";
  return `${name} – ${ctx}`;
};

(function run() {
  if (!fs.existsSync(ASSETS_DIR)) {
    console.error("Missing src/assets");
    process.exit(1);
  }
  const files = fs
    .readdirSync(ASSETS_DIR)
    .filter((f) => /\.(jpe?g|png|webp|avif)$/i.test(f));
  const images: ImageMeta[] = files.map((b) => {
    const subject = subjectFrom(b);
    const ratioHint = ratioFrom(b);
    const brightness = brightFrom(b);
    const alt = toAlt(b, subject);
    const caption = alt.replace(/ – .+$/, "");
    return {
      src: `/src/assets/${b}`,
      basename: b,
      ratioHint,
      subject,
      brightness,
      alt,
      caption,
      keywords: ["mortgage", "lending", "home", "finance", subject],
    };
  });
  const hero =
    images.find(
      (i) =>
        i.ratioHint === "wide" &&
        (i.brightness === "bright" || i.brightness === "medium")
    )?.src ?? images.find((i) => i.subject === "home-exterior")?.src ?? null;
  const gallery = images
    .filter((i) => i.subject !== "logo")
    .slice(0, 12)
    .map((i) => i.src);
  const testimonials = images
    .filter((i) => i.subject === "people")
    .slice(0, 4)
    .map((i) => i.src);
  const programArt: Record<string, string> = {
    residential: images.find((i) => i.subject === "home-exterior")?.src ?? "",
    commercial:
      images.find((i) => i.subject === "office" || i.subject === "home-interior")
        ?.src ?? "",
    portfolio: images.find((i) => i.subject === "document")?.src ?? "",
  };
  const map: MediaMap = {
    analyzedAt: new Date().toISOString(),
    inputsDir: "/src/assets",
    images,
    hero,
    gallery,
    testimonials,
    programArt,
    notes: ["Filename heuristics only; adjust as needed. No binaries added."],
  };
  fs.writeFileSync(
    path.join(ROOT, "media-map.json"),
    JSON.stringify(map, null, 2)
  );
  console.log(`Wrote media-map.json for ${images.length} images`);
})();
