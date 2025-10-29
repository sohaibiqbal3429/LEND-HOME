# Rollback Notes

1. Restore animation library:
   - Reinstall `framer-motion` and `usehooks-ts` in `package.json` if they are required again.
   - Revert `Header`, `Hero`, `ProductCard`, `ImageGallery`, `Accordion`, and `providers` components to the previous versions that used motion components.
2. Undo design token changes:
   - Replace `src/styles/design-tokens.css`, `src/styles/globals.css`, and `tailwind.config.ts` with their prior revisions to remove CSS variable integration.
3. Remove new hooks/utilities:
   - Delete `src/hooks/usePrefersReducedMotion.ts` and `src/hooks/useInViewOnce.ts` if they are no longer needed.
4. Delete supporting docs (`STYLEGUIDE.md`, `OPTIMIZATION-CHECKLIST.md`, `ROLLBACK_NOTES.md`) if the optimisation pass is being rolled back entirely.

All changes are confined to the listed files; reverting them and reinstalling dependencies will return the project to its original state.
