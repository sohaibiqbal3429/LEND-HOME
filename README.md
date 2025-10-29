# LENDLY Platform

Premium mortgage and business finance platform for LENDLY, built with Next.js App Router, TypeScript, Tailwind CSS, Prisma, and a modern design system.

## Getting Started

```bash
pnpm install
pnpm db:push
pnpm db:seed
pnpm dev
```

Create a `.env.local` file using the sample below before running the dev server.

```env
DATABASE_URL="postgresql://user:password@localhost:5432/lendly"
EMAIL_SERVER="smtp://"
EMAIL_FROM="adviser@lendly.uk"
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
RESEND_API_KEY=""
STRIPE_SECRET_KEY=""
UPSTASH_REDIS_REST_URL=""
UPSTASH_REDIS_REST_TOKEN=""
NEXTAUTH_SECRET=""
NEXTAUTH_URL="http://localhost:3000"
```

## Features

- Editorial hero with glassmorphism, trust metrics, and rich CTAs.
- Interactive mortgage calculator with repayment and interest-only logic.
- Lead capture form ready for Prisma persistence and Resend notifications.
- Structured IA for mortgages, business finance, learning content, contact, policies, status, dashboard, apply wizard, and admin suite.
- Tailwind-based design system using Inter and Playfair with rounded, soft shadow styling.
- Placeholder API routes for leads, rates, and contact submissions with Zod validation.
- Prisma schema covering users, leads, applications, rate products, files, and saved calculator scenarios.
- Accessible components with focus states, responsive layout, and prefers-reduced-motion aware animations.
- Ready for integration with Stripe or Lemon Squeezy, Resend, Upstash Redis, and S3 storage.

## Testing & Quality

- `pnpm lint` – ESLint.
- `pnpm typecheck` – TypeScript type safety.
- `pnpm test` – Vitest (to be configured).
- `pnpm e2e` – Playwright (to be configured).

## Deployment

Deploy to Vercel with PostgreSQL (Neon), Upstash Redis, and object storage (R2/S3). Configure environment variables and set up Prisma migrations. Enable analytics and monitoring with Vercel Analytics and Sentry.

