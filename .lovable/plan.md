## Transparent logo + contrast-aware placement

### Steps

1. **Remove the logo background** — run `imagegen--edit_image` on `user-uploads://bb.png` with `transparent_background: true` and prompt "clean transparent cutout of the BioBlend B mark and wordmark, preserve all original strokes and colors exactly". Save as `src/assets/bioblend-logo-transparent.png`.
2. **Upload the transparent PNG to CDN** via `lovable-assets create`, overwriting `src/assets/bioblend-logo.asset.json` so Header/Footer pick it up automatically. Also overwrite `public/bioblend-favicon.png` with the transparent version.
3. **Contrast-aware Logo component** — update `src/components/Logo.tsx`:
   - Keep `variant="dark"` (default): render the transparent PNG bare on light backgrounds (Header uses ivory).
   - `variant="light"`: the logo's teal + red strokes lose contrast against the navy Footer. Best practice is a neutral "chip" behind the mark, not recoloring the brand. Wrap the img in an ivory rounded-rectangle badge (`bg-[color:var(--brand-ivory)]` with generous padding + soft shadow) so the brand colors read as intended against the navy.
   - No wordmark toggle logic needed — the PNG already includes it. Drop the unused `showWordmark` prop or keep it as a no-op for API stability.
4. **Verify** with a screenshot of `/` (header on ivory) and the footer (navy) via Playwright — confirm the mark is transparent-edged in the header and sits inside a clean ivory chip in the footer with no halo.

### Out of scope

- No color changes to the logo itself.
- No changes to Header/Footer layout beyond what the Logo component controls.
