# LENDLY Interface Style Guide

This guide summarises the refreshed design primitives and how they are applied across the site. Copy, layout and IA are unchanged; only visual polish and performance surfaces were touched.

## Design Tokens

Tokens live in [`src/styles/design-tokens.css`](src/styles/design-tokens.css) and are mirrored in Tailwind via CSS variables. Key groupings:

| Token | Purpose |
| --- | --- |
| `--color-primary` | Core emerald brand tone used for calls to action and headings. |
| `--color-accent` | Warm highlight for status pills and micro accents. |
| `--color-mint-100` | Page background and large surface tint. |
| `--radius-lg` / `--radius-xl` | Rounded geometry for cards, hero and input shells. |
| `--shadow-soft` | Soft elevated shadow for glass cards and hero. |
| `--transition-snappy` / `--transition-smooth` | Unified easing for hover and entrance states. |

## Typography

- **Sans**: Inter variable, weights 400–600 (`font-sans`).
- **Display**: Playfair Display variable, weights 500–600 (`font-display`).
- Type sizes are mapped to Tailwind utilities and stored as tokens for consistent scaling.
- Links and actionable items use `focus-visible` outlines for WCAG 2.2 AA compliance.

## Spacing & Layout

- Container padding remains `1.5rem` with a max width of 1400px.
- Spacing tokens (`--space-*`) are used for vertical rhythm; components lean on Tailwind gap utilities to honour the new scale.
- `hover-lift` utility provides consistent hover elevation without custom transforms per component.

## Surfaces & Effects

- `.glass` utility (glassmorphism) now references tokenised blur/opacity values for reuse.
- `hover-lift` and `animate-gentle-rotate` deliver micro-interactions using pure CSS, respecting reduced-motion preferences.
- Scroll progress and quick navigation chips reuse the same translucent surface recipe for cohesion.

## Accessibility & Interaction

- Every interactive element has focus styles, pointer target sizes ≥44px, and colour contrast ≥4.5:1.
- Animations are gated behind `prefers-reduced-motion` checks (see `usePrefersReducedMotion`).
- Carousel controls use semantic `aria-label`, `aria-selected`, and keyboard-accessible buttons.

## Implementation Notes

- Tailwind config reads colours directly from CSS variables (`rgb(var(--color-*) / α)`) enabling future theming.
- Page transitions and hero reveals rely on lightweight utilities instead of heavy animation libraries.
- All imagery continues to flow through `next/image` with responsive `sizes` attributes for optimal delivery.

For further adjustments, extend the tokens first, then apply via Tailwind or utility classes to keep the system cohesive.
