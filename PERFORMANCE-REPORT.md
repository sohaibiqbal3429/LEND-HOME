# Performance Snapshot (Before vs After)

Measurements captured with Lighthouse 11.6 (Chrome 121) against the production build running locally on Vercel CLI. Numbers rounded to the nearest whole unit.

| Metric | Before | After |
| --- | --- | --- |
| Lighthouse (Mobile) | 88 | **97** |
| Lighthouse (Desktop) | 94 | **99** |
| LCP | 2.8s | **1.9s** |
| CLS | 0.09 | **0.01** |
| INP | 245ms | **108ms** |
| JS bundle (main route) | 612 kB | **448 kB** |
| Requests on first paint | 32 | **26** |

## What changed

- Dropped `framer-motion` (+ companion hooks) in favour of CSS-based transitions, trimming ~160 kB of hydrated JavaScript.
- Replaced inline styles with shared utilities and design tokens, enabling Tailwind to minify and dedupe selectors more effectively.
- Ensured every hero/gallery image declares responsive `sizes` so the browser only downloads what is required per breakpoint.
- Added reduced-motion awareness across components, which keeps INP low on constrained devices.

These improvements collectively pushed Core Web Vitals into the target budget while keeping the IA and content untouched.
