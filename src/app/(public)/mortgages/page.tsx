import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import QuickNav from "@/components/QuickNav";
import { Accordion } from "@/components/features/simple-accordion";
import { altFor, pickHero, resolveStatic } from "@/lib/media";

const faqs = [
  {
    question: "How does the UK mortgage process work?",
    answer:
      "We prepare your fact-find, secure an Agreement in Principle, package documents, and liaise with lenders, solicitors, and surveyors through to completion."
  },
  {
    question: "What documents will I need?",
    answer:
      "Typically ID, proof of address, proof of income (payslips or accounts), bank statements, and deposit evidence. Complex income may require additional documents."
  },
  {
    question: "Can you help with adverse credit?",
    answer:
      "Yes. We work with specialist lenders and build a case that addresses credit blips upfront so underwriting runs smoothly."
  }
];

const eligibility = [
  "Minimum deposit 5% (10% for new builds).",
  "Income multiples up to 5.5x with selected lenders.",
  "Credit history assessed holistically, not just by score.",
  "Support for self-employed, contractors, and foreign nationals."
];

const quickNavItems = [
  { id: "overview", label: "Overview" },
  { id: "eligibility", label: "Eligibility" },
  { id: "process", label: "Process" },
  { id: "faqs", label: "FAQs" }
];

const heroSrc = pickHero();
const heroAsset = resolveStatic(heroSrc);
const heroUrl = heroAsset?.src ? new URL(heroAsset.src, "https://lendly.uk").toString() : undefined;
const heroAlt = heroSrc ? altFor(heroSrc) : "Mortgage services hero";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer }
  }))
};

export const metadata: Metadata = {
  title: "Mortgages",
  description:
    "Whole-of-market UK mortgage advice with concierge packaging, fast underwriting support, and FCA-regulated advisers.",
  openGraph: {
    title: "Mortgages | LENDLY",
    description:
      "Whole-of-market UK mortgage advice with concierge packaging, fast underwriting support, and FCA-regulated advisers.",
    url: "https://lendly.uk/mortgages",
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
    title: "Mortgages | LENDLY",
    description:
      "Whole-of-market UK mortgage advice with concierge packaging, fast underwriting support, and FCA-regulated advisers.",
    images: heroUrl ? [heroUrl] : undefined
  }
};

export default function MortgagesPage() {
  return (
    <div className="container space-y-16 py-16">
      <QuickNav items={quickNavItems} />
      <section id="overview" className="space-y-10">
        <PageHero title="Mortgages with concierge-level care">
          <p className="max-w-2xl text-base text-mint/90">
            Whether you’re a first-time buyer or remortgaging a portfolio, LENDLY packages your case with precision to unlock
            market-leading offers.
          </p>
        </PageHero>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl bg-white/80 p-6 shadow-soft backdrop-blur">
            <h2 className="text-xl font-display text-charcoal">Why clients choose LENDLY</h2>
            <ul className="mt-4 space-y-3 text-slate-600">
              <li>Dedicated broker and case manager on every application.</li>
              <li>Digital document upload with instant progress tracking.</li>
              <li>Tailored lender shortlist across mainstream and specialist panels.</li>
            </ul>
          </div>
          <div className="rounded-3xl bg-white/80 p-6 shadow-soft backdrop-blur">
            <h2 className="text-xl font-display text-charcoal">Speed to offer</h2>
            <p className="mt-4 text-slate-600">
              Our pre-underwriting checklist front-loads underwriting requirements so valuers, solicitors, and lenders can move
              swiftly without repeated chases.
            </p>
          </div>
        </div>
      </section>
      <section id="eligibility" className="grid gap-10 lg:grid-cols-2">
        <div className="glass rounded-3xl p-8 shadow-soft">
          <h2 className="text-2xl font-display text-charcoal">Eligibility snapshot</h2>
          <ul className="mt-4 space-y-3 text-slate-600">
            {eligibility.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="glass rounded-3xl p-8 shadow-soft">
          <h2 className="text-2xl font-display text-charcoal">What to expect</h2>
          <ol className="mt-4 space-y-3 text-slate-600">
            <li><strong>Discovery</strong> – capture goals, timeline, and affordability.</li>
            <li><strong>Strategy</strong> – compare lenders, rates, and product types.</li>
            <li><strong>Application</strong> – package documents, liaise with lenders.</li>
            <li><strong>Completion</strong> – guide legal process and aftercare.</li>
          </ol>
        </div>
      </section>
      <section id="process" className="glass rounded-3xl p-8 shadow-soft">
        <h2 className="text-2xl font-display text-charcoal">Process enhancements</h2>
        <p className="mt-4 text-slate-600">
          You’ll receive real-time updates, templated responses for estate agents, and an offer-readiness checklist so
          completions stay on schedule.
        </p>
      </section>
      <section id="faqs" className="space-y-6">
        <h2 className="text-3xl font-display text-charcoal">FAQs</h2>
        <Accordion items={faqs} />
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </div>
  );
}
