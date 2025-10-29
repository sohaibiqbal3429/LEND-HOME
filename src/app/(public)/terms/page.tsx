import { PageHero } from "@/components/features/page-hero";

export default function TermsPage() {
  return (
    <div className="container space-y-10 py-16">
      <PageHero
        title="Terms of business"
        description="Key disclosures, adviser remuneration, and client agreements for working with LENDLY advisers."
      />
      <div className="glass rounded-3xl p-8 text-sm text-slate-600">
        <p>
          Finalised terms will detail adviser fees, complaint processes, and regulatory responsibilities. Update with approved
          legal copy prior to launch.
        </p>
      </div>
    </div>
  );
}
