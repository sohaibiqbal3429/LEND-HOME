export interface PostSummary {
  slug: string;
  title: string;
  description: string;
  category: string;
  readingTime: string;
  date: string;
}

export const posts: PostSummary[] = [
  {
    slug: "guide-first-home",
    title: "First-home roadmap: from offer to completion",
    description: "Understand each milestone in the UK mortgage journey with timelines, checklists, and lender expectations.",
    category: "Guides",
    readingTime: "7 min read",
    date: "2024-03-01"
  },
  {
    slug: "glossary-mortgage-terms",
    title: "Mortgage glossary: speak the lender’s language",
    description: "Decode AIP, affordability, LTV, stress tests, and more in plain English.",
    category: "Glossary",
    readingTime: "5 min read",
    date: "2024-02-12"
  }
];
