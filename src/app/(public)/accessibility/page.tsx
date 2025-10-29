import { PageHero } from "@/components/features/page-hero";

export default function AccessibilityPage() {
  return (
    <div className="container space-y-10 py-16">
      <PageHero
        title="Accessibility statement"
        description="Commitment to WCAG 2.1 AA compliance, inclusive design principles, and assistive technology support."
      />
      <div className="glass rounded-3xl p-8 text-sm text-slate-600">
        <p>
          Outline accessibility audits, keyboard navigation, and alternative contact options for users with disabilities. This
          placeholder should be replaced with the final accessibility policy.
        </p>
      </div>
    </div>
  );
}
