import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import QuickNav from "@/components/QuickNav";
import { ProductCard } from "@/components/features/product-card";
import { altFor, pickHero, resolveStatic } from "@/lib/media";

const products = [
  {
    title: "Bridging Loans",
    description: "Fast completions with transparent fees for auction purchases, chain-breaks, and refurb projects.",
    href: "/contact",
    tag: "Speed",
    mediaKey: "commercial"
  },
  {
    title: "Buy-to-Let Portfolios",
    description: "SPV structures, HMOs, and MUFBs with bespoke underwriting and stress test management.",
    href: "/contact",
    tag: "Portfolio",
    mediaKey: "portfolio"
  },
  {
    title: "Commercial Mortgages",
    description: "Owner-occupier and investment property finance with flexible terms and amortisation schedules.",
    href: "/contact",
    tag: "Commercial",
    mediaKey: "commercial"
  }
];

const quickNavItems = [
  { id: "overview", label: "Overview" },
  { id: "programmes", label: "Programmes" },
  { id: "support", label: "Deal desk" }
];

const heroSrc = pickHero();
const heroAsset = resolveStatic(heroSrc);
const heroUrl = heroAsset?.src ? new URL(heroAsset.src, "https://lendly.uk").toString() : undefined;
const heroAlt = heroSrc ? altFor(heroSrc) : "Business finance hero";

export const metadata: Metadata = {
  title: "Business Finance",
  description: "Structured finance for bridging, development, and commercial property led by seasoned brokers.",
  openGraph: {
    title: "Business Finance | LENDLY",
    description: "Structured finance for bridging, development, and commercial property led by seasoned brokers.",
    url: "https://lendly.uk/business-finance",
    images: heroUrl
      ? [
          {
            url: heroUrl,
            width: 1600,
            height: 900,
            alt: heroAlt
          }
        ]
      : undefined
  },
  twitter: {
    title: "Business Finance | LENDLY",
    description: "Structured finance for bridging, development, and commercial property led by seasoned brokers.",
    images: heroUrl ? [heroUrl] : undefined
  }
};

export default function BusinessFinancePage() {
  return (
    <div className="container space-y-16 py-16">
      <QuickNav items={quickNavItems} />
      <section id="overview" className="space-y-8">
        <PageHero title="Capital for ambitious property and business plays">
          <p className="max-w-2xl text-base text-mint/90">
            From bridging to development and commercial lending, LENDLY assembles the right blend of lenders and structures to
            close complex deals.
          </p>
        </PageHero>
        <div className="grid gap-6 md:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.title} {...product} />
          ))}
        </div>
      </section>
      <section id="programmes" className="grid gap-6 md:grid-cols-2">
        <div className="glass rounded-3xl p-8 shadow-soft">
          <h2 className="text-2xl font-display text-charcoal">Structured for pace</h2>
          <p className="mt-4 text-slate-600">
            Short-term finance needs certainty. Our lender panels pre-agree criteria so valuations, QS reports, and legal packs
            happen in parallel.
          </p>
        </div>
        <div className="glass rounded-3xl p-8 shadow-soft">
          <h2 className="text-2xl font-display text-charcoal">Data-led lender matching</h2>
          <p className="mt-4 text-slate-600">
            We benchmark lenders on appetite, gearing, and speed, sharing a transparent matrix so you can select the structure
            that keeps ROI on track.
          </p>
        </div>
      </section>
      <section id="support" className="glass rounded-3xl p-8 shadow-soft">
        <h2 className="text-2xl font-display text-charcoal">Deal desk support</h2>
        <p className="mt-4 text-slate-600">
          Upload your project brief via the dashboard to access our deal desk. We benchmark terms, coordinate valuations, and
          build credit memos that help underwriting say yes faster.
        </p>
      </section>
    </div>
  );
}
