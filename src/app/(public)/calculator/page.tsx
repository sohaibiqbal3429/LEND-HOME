import { PageHero } from "@/components/features/page-hero";
import { Calculator } from "@/components/features/calculator";

export const metadata = {
  title: "Mortgage Calculator",
  description: "Interactive LENDLY mortgage calculator with instant repayments, LTV and affordability insights."
};

export default function CalculatorPage() {
  return (
    <div className="container space-y-16 py-16">
      <PageHero
        badge="Tools"
        title="Mortgage calculator"
        description="Model repayments, LTV and total cost instantly. Save scenarios once authenticated to revisit or share with your adviser."
      />
      <Calculator />
    </div>
  );
}
