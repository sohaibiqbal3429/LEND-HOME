import Link from "next/link";
import { PageHero } from "@/components/features/page-hero";
import { posts } from "@/content/posts";

export const metadata = {
  title: "Learn",
  description: "Guides, glossaries, and insights from LENDLY advisers."
};

export default function LearnPage() {
  return (
    <div className="container space-y-16 py-16">
      <PageHero
        badge="Knowledge"
        title="Learn with LENDLY"
        description="Stay ahead of the market with guides, glossaries, and deep-dives tailored to movers, investors, and business owners."
      />
      <div className="grid gap-6 md:grid-cols-2">
        {posts.map((post) => (
          <article key={post.slug} className="glass rounded-3xl p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{post.category}</p>
            <h2 className="mt-3 text-2xl font-display text-charcoal">{post.title}</h2>
            <p className="mt-3 text-sm text-slate-600">{post.description}</p>
            <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
              <span>{post.readingTime}</span>
              <span>{new Date(post.date).toLocaleDateString("en-GB", { dateStyle: "medium" })}</span>
            </div>
            <Link href={`/learn/${post.slug}`} className="mt-6 inline-flex text-primary">
              Read article
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
