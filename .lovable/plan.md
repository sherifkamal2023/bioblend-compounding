## Swap the BioBlend logo to the new PNG upload

The user uploaded a cleaner PNG version of the BioBlend mark (`user-uploads://bb.png`) — same structure as before (teal upper B, red lower B, gold leaf, "BioBlend" wordmark), but a proper transparent-friendly PNG.

### Steps

1. Upload the new PNG to the Lovable CDN:
   - `lovable-assets create --file /mnt/user-uploads/bb.png --filename bioblend-logo.png > src/assets/bioblend-logo.asset.json` (overwrites the current pointer JSON, so every `<Logo />` usage in Header/Footer picks up the new URL automatically).
2. Delete the previous CDN asset so we don't leave an orphaned JPEG behind. Since step 1 overwrites the pointer, capture the old `asset_id` first (from the current `src/assets/bioblend-logo.asset.json`) and after upload call `lovable-assets delete` against a temporary pointer — or simply leave the old asset (CDN cost is negligible). Recommendation: leave it; deletion of the previous asset is optional and reversible-only-by-reupload.
3. Also set it as the site favicon (there is currently none configured for BioBlend):
   - Copy the PNG into `public/bioblend-favicon.png`.
   - Update `src/routes/__root.tsx` `head().links` to reference `/bioblend-favicon.png` and remove the default `/favicon.ico` link.
   - `rm public/favicon.ico`.
4. No component changes needed — `src/components/Logo.tsx` already reads from `bioblend-logo.asset.json`.

### Out of scope

- No changes to Logo component layout, size, or wordmark handling.
- No changes to any page copy.
