import { PageHero } from "@/components/features/page-hero";

export default function PrivacyPage() {
  return (
    <div className="container space-y-10 py-16">
      <PageHero
        title="Privacy policy"
        description="How LENDLY collects, stores, and protects your personal data in line with GDPR and FCA requirements."
      />
      <div className="glass rounded-3xl p-8 text-sm text-slate-600">
        <p>
          Detailed privacy terms will outline lawful bases for processing, data retention periods, and your rights. Replace this
          placeholder with signed-off compliance copy.
        </p>
      </div>
    </div>
  );
}
