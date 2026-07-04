## Scope

Two small, targeted changes. No new routes, no backend, no design-system edits.

### 1. Rebrand "Veterinary" → "Your Pet's Wellness Matters"

Rationale: BioBlend is a human compounding pharmacy. Pet care is framed as an extension of the client's personal wellness (protecting the household, safe zoonotic-disease practices, quality of life for the whole family), not as a standalone veterinary service.

Exact string replacements:

- `src/routes/index.tsx`
  - Practice Areas card: `"Veterinary Lab"` → `"Your Pet's Wellness Matters"`
    - tagline: `"Palatable formulas for pets"` → `"Because their wellness is part of yours"`
  - Services grid card: `"Veterinary Compounding"` → `"Your Pet's Wellness Matters"`
    - body: `"Palatable formulations for beloved pets."` → `"Your pet's wellness is part of yours — palatable, safe formulations that protect the whole household."`
- `src/routes/services.tsx`
  - Services grid card: `"Veterinary Compounding"` → `"Your Pet's Wellness Matters"`
    - body: `"Species-appropriate flavors and delivery forms — from transdermal cats to flavored canine treats."` → `"Your pet's wellness is part of yours. Species-appropriate, palatable formulations — transdermal cats, flavored canine treats — with medical-grade attention to safe handling and zoonotic-disease prevention for the whole household."`
  - Page description meta: replace `"veterinary"` with `"pet wellness"` in the description string.

Icon (`PawPrint`) stays. Placement in grids stays. No new copy blocks added.

### 2. Restore the real BioBlend logo

The current `src/components/Logo.tsx` is a hand-drawn SVG that doesn't match the brand mark. Replace it with the actual logo the user uploaded (`user-uploads://WhatsApp_Image_2026-07-04_at_2.17.43_PM_1-2.jpeg` — the "B" mark with the gold leaf, red + teal strokes, "BioBlend" wordmark).

Steps:
- Register the uploaded image as a Lovable asset via `lovable-assets create` from `/mnt/user-uploads/…` → `src/assets/bioblend-logo.png.asset.json`.
- Rewrite `src/components/Logo.tsx` to render an `<img>` using the asset URL, preserving the existing props (className, size). Keep the same export signature so Header/Footer keep working without edits.
- Add a memory rule: do not modify or replace the BioBlend logo — always use the user-provided mark.

### Out of scope

- No changes to Header/Footer/routes/styles.
- No changes to the About page team names or any other copy.
- No SEO metadata rewrites beyond the one Services description tweak.
