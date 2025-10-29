import QuickNav from "@/components/QuickNav";
import ImageGallery from "@/components/ImageGallery";
import { Hero } from "@/components/features/hero";
import { TrustBar } from "@/components/features/trust-bar";
import { ProductCard } from "@/components/features/product-card";
import { Calculator } from "@/components/features/calculator";
import { TestimonialMarquee } from "@/components/features/testimonial-marquee";
import { LeadForm } from "@/components/features/lead-form";

const products = [
  {
    title: "Residential Mortgages",
    description: "Whole-of-market access with bespoke underwriting for home movers, remortgages, and first-time buyers.",
    href: "/mortgages",
    tag: "Mortgages",
    mediaKey: "residential"
  },
  {
    title: "Business & Commercial Finance",
    description: "Structured finance including bridging, auction purchases, development and commercial term loans.",
    href: "/business-finance",
    tag: "Commercial",
    mediaKey: "commercial"
  },
  {
    title: "Portfolio & BTL Strategy",
    description: "Expertise for landlords to optimise yields, SPV lending, and specialist lenders for complex cases.",
    href: "/business-finance",
    tag: "Invest",
    mediaKey: "portfolio"
  }
];

const quickNavItems = [
  { id: "overview", label: "Overview" },
  { id: "solutions", label: "Solutions" },
  { id: "calculator", label: "Calculator" },
  { id: "gallery", label: "Gallery" },
  { id: "testimonials", label: "Testimonials" },
  { id: "contact", label: "Enquire" }
];

export default function HomePage() {
  return (
    <div className="container space-y-20 py-16">
      <QuickNav items={quickNavItems} />
      <section id="overview" className="space-y-8">
        <Hero />
        <TrustBar />
      </section>
      <section id="solutions" className="space-y-8">
        <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-primary">Solutions</p>
            <h2 className="text-3xl font-display text-charcoal">Finance built around your objectives</h2>
          </div>
          <p className="max-w-xl text-sm text-slate-600">
            From first conversations to completion, LENDLY navigates lenders, products, and legal partners while you stay in
            control. Save scenarios, upload documents, and chat securely with your adviser in the dashboard.
          </p>
        </header>
        <div className="grid gap-6 md:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.title} {...product} />
          ))}
        </div>
      </section>
      <Calculator />
      <section id="gallery" className="space-y-6">
        <div>
          <p className="text-sm uppercase tracking-[0.3rem] text-primary">Our world</p>
          <h2 className="text-3xl font-display text-charcoal">Moments from the LENDLY journey</h2>
          <p className="max-w-2xl text-sm text-slate-600">
            Scenes from client celebrations, advisory sessions, and the spaces where we structure your deals.
          </p>
        </div>
        <ImageGallery />
      </section>
      <section id="testimonials" className="space-y-6">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-primary">Social proof</p>
          <h2 className="text-3xl font-display text-charcoal">Stories from clients we’ve supported</h2>
        </div>
        <TestimonialMarquee />
      </section>
      <section id="contact" className="rounded-[2.5rem] bg-[#EAF5EC] px-6 py-10">
        <div className="mx-auto flex max-w-5xl flex-col gap-6 text-center">
          <h2 className="text-3xl font-display text-charcoal">Let’s shape your next finance move</h2>
          <p className="text-sm text-slate-600">
            Share your scenario and an adviser will reach out within the hour during business times.
          </p>
          <LeadForm />
        </div>
      </section>
    </div>
  );
}
