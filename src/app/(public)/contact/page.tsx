import { PageHero } from "@/components/features/page-hero";
import { ContactForm } from "@/components/features/contact-form";

export const metadata = {
  title: "Contact",
  description: "Speak with LENDLY advisers for mortgages and business finance."
};

export default function ContactPage() {
  return (
    <div className="container space-y-16 py-16">
      <PageHero
        badge="Contact"
        title="Talk to an adviser"
        description="Share your goals and we’ll align you with a specialist adviser. Expect a response within 10 minutes during business hours."
      />
      <ContactForm />
    </div>
  );
}
