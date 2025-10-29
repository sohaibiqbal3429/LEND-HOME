import { notFound } from "next/navigation";
import { posts } from "@/content/posts";

interface LearnArticlePageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: LearnArticlePageProps) {
  const post = posts.find((item) => item.slug === params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description
  };
}

export default function LearnArticlePage({ params }: LearnArticlePageProps) {
  const post = posts.find((item) => item.slug === params.slug);
  if (!post) notFound();

  return (
    <article className="container prose prose-slate mx-auto max-w-3xl py-16">
      <p className="text-sm text-primary">{post.category}</p>
      <h1 className="font-display">{post.title}</h1>
      <p className="text-sm text-slate-500">Updated {new Date(post.date).toLocaleDateString("en-GB", { dateStyle: "long" })}</p>
      <p>{post.description}</p>
      <p>
        Full MDX content to be provided. Connect Prisma-backed CMS or Markdown pipeline to inject long-form content with TOC,
        callouts, and SEO schema. This placeholder maintains routing and metadata.
      </p>
    </article>
  );
}
