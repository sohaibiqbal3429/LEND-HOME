import Link from "next/link";

const footerLinks = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/accessibility", label: "Accessibility" },
  { href: "/status", label: "Status" }
];

export function Footer() {
  return (
    <footer className="border-t border-white/30 bg-charcoal text-mint">
      <div className="container flex flex-col gap-6 py-10 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-2xl font-display font-semibold">LENDLY</p>
          <p className="mt-2 max-w-lg text-sm text-mint/70">
            LENDLY is a trading style of Lendly Finance Ltd, authorised and regulated by the Financial Conduct Authority.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-mint/80">
          {footerLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-white">
              {link.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="border-t border-white/20 py-4 text-center text-xs text-mint/60">
        © {new Date().getFullYear()} LENDLY. All rights reserved.
      </div>
    </footer>
  );
}
