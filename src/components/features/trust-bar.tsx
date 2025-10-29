export function TrustBar() {
  return (
    <div className="glass hover-lift mt-12 flex flex-wrap items-center justify-between gap-6 rounded-3xl px-6 py-4 text-sm text-slate-600">
      <div className="flex items-center gap-3 transition-transform duration-200 hover:-translate-y-0.5">
        <span className="h-2 w-2 rounded-full bg-emerald-500" />
        <span>Authorised & regulated by the Financial Conduct Authority</span>
      </div>
      <div className="flex items-center gap-2 font-medium text-primary transition-transform duration-200 hover:-translate-y-0.5">
        Trustpilot <span className="rounded-full bg-primary px-2 py-0.5 text-xs text-white">4.9</span>
      </div>
      <div className="flex items-center gap-3 transition-transform duration-200 hover:-translate-y-0.5">
        <span className="h-2 w-2 rounded-full bg-accent" />
        <span>Advisers available today until 8pm</span>
      </div>
    </div>
  );
}
