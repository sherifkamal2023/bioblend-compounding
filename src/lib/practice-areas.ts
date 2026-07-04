export type PracticeArea = {
  slug: string;
  title: string;
  eyebrow: string;
  tagline: string;
  hero: string;
  intro: string;
  offerings: { title: string; body: string }[];
  process: string[];
  note?: string;
};

export const practiceAreas: PracticeArea[] = [
  {
    slug: "hormone",
    title: "Hormone Optimization",
    eyebrow: "Hormone Lab",
    tagline: "Bio-identical HRT, thyroid, adrenal — dosed to your labs.",
    hero: "Precision endocrine care, compounded one prescription at a time.",
    intro:
      "Our pharmacists formulate bio-identical estrogen, progesterone, testosterone, DHEA, and thyroid protocols to match your physician's plan — down to the milligram, in the delivery form you tolerate best.",
    offerings: [
      { title: "Bio-identical HRT", body: "Estradiol, progesterone, testosterone in creams, troches, capsules or pellets." },
      { title: "Thyroid support", body: "T3 / T4 combinations, slow-release capsules, alternative fillers for sensitivities." },
      { title: "Adrenal & DHEA", body: "Micronised DHEA, pregnenolone, cortisol-support formulations." },
      { title: "Andropause protocols", body: "Testosterone creams and injectables with clinical follow-up." },
    ],
    process: [
      "Physician sends prescription with lab-guided target dose.",
      "Pharmacist confirms delivery form, base, and any allergen exclusions with you.",
      "Compounded in-lab under strict quality control, batch-tested.",
      "Discreet delivery + follow-up review at 6 and 12 weeks.",
    ],
  },
  {
    slug: "dermatology",
    title: "Dermatology & Anti-Aging",
    eyebrow: "Dermatology Lab",
    tagline: "Custom serums, peels, and prescription skin protocols.",
    hero: "Prescription-strength skincare, formulated for your skin — not a shelf.",
    intro:
      "We compound retinoids, tranexamic acid, hydroquinone, azelaic acid, kojic, arbutin, and peptide blends to your dermatologist's exact strength — in bases your skin tolerates.",
    offerings: [
      { title: "Custom retinoid serums", body: "Tretinoin from 0.01% to 0.1% in tolerated bases." },
      { title: "Pigmentation protocols", body: "Tranexamic, kojic, arbutin, hydroquinone blends." },
      { title: "Anti-aging peptides", body: "Copper peptides, growth factors, ceramide-rich bases." },
      { title: "Medical peels", body: "TCA, glycolic, salicylic — physician-prescribed strengths." },
    ],
    process: [
      "Consultation with your dermatologist establishes the goal.",
      "We compound the active in a base matched to your skin type.",
      "Sensitivity-tested and pH-balanced before dispensing.",
      "Refills adjusted as tolerance builds.",
    ],
  },
  {
    slug: "pediatric",
    title: "Pediatric Compounding",
    eyebrow: "Pediatric Lab",
    tagline: "Alcohol-free, sugar-free, dye-free — in flavors children take.",
    hero: "Every child deserves medicine they'll actually swallow.",
    intro:
      "When a manufactured drug is only available in adult tablets, we transform it into a precisely-dosed pediatric suspension — free of alcohol, sugar, dyes, or common allergens.",
    offerings: [
      { title: "Flavored suspensions", body: "Bubblegum, grape, strawberry, mango — child-tested." },
      { title: "Micro-dosing", body: "Milligram-accurate dosing for neonates and infants." },
      { title: "Allergen-free bases", body: "Gluten-, lactose-, dye-, and preservative-free options." },
      { title: "Chewables & lozenges", body: "For children who refuse liquids." },
    ],
    process: [
      "Pediatrician sends prescription with weight-based dose.",
      "We select the flavour system with the parent.",
      "Compounded fresh with short beyond-use dating.",
      "Delivered to your door with dosing syringe and log sheet.",
    ],
  },
  {
    slug: "pet-wellness",
    title: "Your Pet's Wellness Matters",
    eyebrow: "Household Wellness",
    tagline: "Because your pet's wellness is part of yours.",
    hero: "A human compounding pharmacy — because family includes the four-legged.",
    intro:
      "We're a human compounding pharmacy first. But personal wellness doesn't stop at the humans in the household. When your pet needs a medication reformulated for palatability, safety, or precise dosing, we prepare it with the same medical rigor — protecting your quality of life and preventing household transmission risk.",
    offerings: [
      { title: "Palatable reformulations", body: "Chicken, tuna, beef, or malt bases pets accept willingly." },
      { title: "Transdermal delivery", body: "For cats who refuse oral medication — applied to the ear." },
      { title: "Precision dosing", body: "Micro-doses for exotics and small breeds." },
      { title: "Zoonotic-safe handling", body: "Formulations that protect immunocompromised household members." },
    ],
    process: [
      "Your veterinarian prescribes — we consult on the safest form.",
      "We compound with pharmaceutical-grade actives, pet-appropriate bases.",
      "Every batch is checked against zoonotic and cross-contamination protocols.",
      "Delivered discreetly with clear administration guidance.",
    ],
    note: "Prescriptions must come from a licensed veterinarian. We do not diagnose or prescribe for animals.",
  },
  {
    slug: "wellness-iv",
    title: "Wellness & IV Therapy",
    eyebrow: "Wellness & IV Lab",
    tagline: "Nutraceuticals, IV therapy, longevity protocols.",
    hero: "Precision nutrition, delivered where your body can use it.",
    intro:
      "From NAD+ and glutathione infusions to bespoke oral nutraceuticals and longevity peptides, our sterile lab compounds under USP <797> for injectables and USP <795> for oral protocols.",
    offerings: [
      { title: "NAD+ & glutathione IVs", body: "Cellular repair and detox infusions." },
      { title: "Vitamin & mineral drips", body: "Myers, immune, hydration, athletic recovery." },
      { title: "Longevity peptides", body: "Physician-prescribed anti-aging protocols." },
      { title: "Oral nutraceuticals", body: "Physician-guided vitamin and adaptogen blends." },
    ],
    process: [
      "Physician consultation establishes goals and screens contraindications.",
      "Sterile compounding in our USP <797> cleanroom.",
      "Administered at partner clinics or in your home by licensed nurses.",
      "Follow-up bloodwork adjusts the protocol over time.",
    ],
  },
];

export function findPracticeArea(slug: string) {
  return practiceAreas.find((p) => p.slug === slug);
}
