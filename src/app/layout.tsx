import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "@/styles/globals.css";
import { cn } from "@/lib/utils";
import { Providers } from "@/components/providers";
import { Header } from "@/components/features/header";
import { Footer } from "@/components/features/footer";
import ScrollProgress from "@/components/ScrollProgress";
import { altFor, pickHero, resolveStatic } from "@/lib/media";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

const heroSrc = pickHero();
const heroAsset = resolveStatic(heroSrc);
const heroUrl = heroAsset?.src ? new URL(heroAsset.src, "https://lendly.uk").toString() : undefined;
const heroAlt = heroSrc ? altFor(heroSrc) : "Mortgage and finance advisory";

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "MortgageLender",
  name: "LENDLY",
  url: "https://lendly.uk",
  image: heroUrl,
  telephone: "+44 20 1234 5678",
  address: {
    "@type": "PostalAddress",
    streetAddress: "1 Finance Street",
    addressLocality: "London",
    postalCode: "EC2M 4AA",
    addressCountry: "GB"
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "20:00"
    }
  ],
  sameAs: [
    "https://www.linkedin.com/company/lendly",
    "https://www.instagram.com/lendly"
  ]
};

export const metadata: Metadata = {
  metadataBase: new URL("https://lendly.uk"),
  title: {
    default: "LENDLY | Mortgage & Business Finance",
    template: "%s | LENDLY"
  },
  description: "Premium mortgage and business finance advisory with instant calculators and expert support.",
  openGraph: {
    title: "LENDLY",
    description: "Premium mortgage and business finance advisory with instant calculators and expert support.",
    url: "https://lendly.uk",
    siteName: "LENDLY",
    locale: "en_GB",
    type: "website",
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
    card: "summary_large_image",
    title: "LENDLY",
    description: "Premium mortgage and business finance advisory with instant calculators and expert support.",
    images: heroUrl ? [heroUrl] : undefined
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-mint text-slate-900", inter.variable, playfair.variable)}>
        <ScrollProgress />
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <Providers>
          <Header />
          <main className="min-h-[60vh]">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
