# Optimisation Checklist

- [x] Remove heavy animation library (framer-motion) and replace with CSS-based transitions.
- [x] Introduce shared design token file and hook Tailwind to CSS variables.
- [x] Optimise image delivery with responsive `sizes` across hero/gallery components.
- [x] Lazy, accessible carousel with auto-play respecting reduced motion.
- [x] Preload fonts with `display: swap` and limited weights to trim payload.
- [x] Add reusable hover/focus utilities and consistent focus outlines.
- [x] Convert inline styles to class-based styling for better reuse and minification.
- [x] Ensure quick navigation and scroll progress components remain accessible and lightweight.
- [x] Add structured data, metadata unchanged.
- [x] Provide style guide and rollback notes.

Additional considerations:

- [x] Performance budget: hero + gallery transitions budgeted for CSS-only interactions.
- [x] HTTP/2 readiness: hashed assets and reduced bundle count via tree shaking (framer-motion removal).
