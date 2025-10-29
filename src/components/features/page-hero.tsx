interface PageHeroProps {
  title: string;
  description: string;
  badge?: string;
}

export function PageHero({ title, description, badge }: PageHeroProps) {
  return (
    <section className="glass rounded-[2.5rem] p-10 shadow-soft">
      {badge ? <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">{badge}</span> : null}
      <h1 className="mt-4 text-4xl font-display text-charcoal">{title}</h1>
      <p className="mt-4 max-w-2xl text-slate-600">{description}</p>
    </section>
  );
}
