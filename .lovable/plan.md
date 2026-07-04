# Enhance BioBlend with LifeLab-Inspired Patterns

LifeLab.bio is a private wellness club (different vertical) but its layout DNA translates beautifully to a premium compounding pharmacy. I'll borrow the *structure and feel*, not the content.

## What we're borrowing from LifeLab

| LifeLab pattern | BioBlend adaptation |
|---|---|
| Cinematic hero with editorial serif tagline ("Well-being, *Reimagined*") | Refined hero: "Medicine, *Personalized*" — italic serif accent word, quieter overline, single primary CTA |
| "Our 5 Labs" pillar grid (Movement/Nutrition/Recovery/Mind/Connection) | "Our Practice Areas" pillar grid — 5 illustrated circles: Hormone Therapy, Dermatology, Pediatric, Veterinary, Sterile IV — each links to Services section |
| Quad CTA strip (Consultation / Events / Facilities / Corporate) under hero | Quad strip: Book Consultation · Prescription Transfer · Visit Lab · Corporate Wellness |
| "Your path to Well-Being" mission block with SVG diagram | "Your path to precision medicine" — 3-step illustrated flow (Consult → Compound → Care) |
| Locations gallery (KAFD, Villa Kama, Enclave, Bali) | Kept minimal — single "Visit the Lab" card with our Riyadh location + map preview |
| Corporate Wellness offering | New teaser card on Home linking to a lightweight "Corporate / Clinic Partnerships" section on Services page |
| Sticky "Book a Consultation" CTA banner | Sticky bottom bar on mobile + persistent header button: "Book a Consultation" (WhatsApp link) |
| Editorial imagery + generous whitespace + serif/sans pairing | Already in place — tighten spacing rhythm and increase image scale in hero + pillars |

## Concrete changes

**Home (`src/routes/index.tsx`)**
1. Rework hero: overline "Compounding Pharmacy · Riyadh", H1 with italic serif accent, one primary CTA (Book Consultation) + ghost secondary (Explore Services). Larger hero image, softer overlay.
2. Add **Quad CTA strip** directly under hero (4 small cards: Consultation, Prescription Transfer, Visit Lab, Corporate Wellness).
3. Replace current 3-pillar strip with **5 Practice Areas grid** (circular icon + label + one-line + See More link). Icons rendered as inline SVGs with brand gold on ivory.
4. Add **"Your Path to Precision Medicine"** editorial block: left column heading + prose, right column 3-step numbered flow (Consult → Formulate → Care).
5. Add **Corporate & Clinic Partnerships** teaser card before the contact CTA band.
6. Keep testimonials and contact band.

**Header (`src/components/Header.tsx`)**
- Add persistent "Book a Consultation" gold button (right of nav), matching LifeLab's always-visible CTA.

**Contact (`src/routes/contact.tsx`)**
- Add a compact "Corporate Wellness / Clinic Partnerships" inquiry toggle above the form (changes form heading + subject).

**No new routes.** All additions layer onto existing files. No backend, no Cloud, no data model changes — this is presentation + IA only.

## Assets
- Generate 5 pillar icons (transparent PNG, gold on ivory) via imagegen.
- Optionally regenerate hero as a wider cinematic image if the current one feels cramped.

## Out of scope
- Membership / quiz / events (LifeLab-specific, doesn't fit a pharmacy).
- Video hero (adds weight; keep still image).
- Multi-location gallery (BioBlend is single location).
- Arabic/RTL, e-commerce, booking system, patient portal.
