import { PageHero } from "@/components/features/page-hero";

const incidents = [
  {
    date: "2024-03-12",
    status: "Resolved",
    summary: "Brief CRM sync delay",
    detail: "Upstash cache incident caused a 5-minute delay syncing lead notes. Resolved automatically with retry policy."
  }
];

export default function StatusPage() {
  return (
    <div className="container space-y-10 py-16">
      <PageHero
        title="Platform status"
        description="Monitor LENDLY uptime and recent incidents across the client dashboard, application service, and integrations."
      />
      <div className="glass rounded-3xl p-8">
        <h2 className="text-lg font-display text-charcoal">Current status</h2>
        <p className="mt-2 text-sm text-emerald-600">All systems operational</p>
        <div className="mt-6 space-y-4">
          {incidents.map((incident) => (
            <div key={incident.date} className="rounded-2xl border border-slate-200 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-primary">{incident.status}</p>
              <h3 className="mt-2 text-base font-semibold text-charcoal">{incident.summary}</h3>
              <p className="mt-1 text-xs text-slate-500">{new Date(incident.date).toLocaleString("en-GB")}</p>
              <p className="mt-2 text-sm text-slate-600">{incident.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
