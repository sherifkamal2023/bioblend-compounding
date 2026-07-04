import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { tiles, type TileKey } from "@/lib/tiles";

export const Route = createFileRoute("/insights")({
  head: () => ({
    meta: [
      { title: "Insights — BioBlend Compounding Pharmacy" },
      { name: "description", content: "Editorial from BioBlend's compounding lab: hormone science, dermatology protocols, pediatric compounding, longevity research and pharmacist commentary from Dubai." },
      { property: "og:title", content: "Insights — BioBlend Compounding Pharmacy" },
      { property: "og:description", content: "Science, protocols, and pharmacist commentary from BioBlend." },
    ],
  }),
  component: InsightsPage,
});

const articles: { tile: TileKey; category: string; title: string; excerpt: string; readTime: string; date: string }[] = [
  {
    tile: "hormone",
    category: "Hormone Lab",
    title: "Why bio-identical progesterone belongs in your HRT conversation",
    excerpt: "The 20-year misread of the Women's Health Initiative — and what compounded progesterone actually does for perimenopausal patients.",
    readTime: "8 min read",
    date: "Coming soon",
  },
  {
    tile: "dermatology",
    category: "Dermatology",
    title: "Tretinoin tolerance: a 12-week compounding protocol",
    excerpt: "A stepped approach to prescription retinoids in Middle Eastern skin types — pharmacist notes on base selection and buffering.",
    readTime: "6 min read",
    date: "Coming soon",
  },
  {
    tile: "pediatric",
    category: "Pediatric",
    title: "Flavor systems that actually work for pediatric suspensions",
    excerpt: "Why bubblegum beats cherry, and how we work around allergen exclusions without sacrificing palatability.",
    readTime: "5 min read",
    date: "Coming soon",
  },
  {
    tile: "longevity",
    category: "Longevity",
    title: "NAD+ IVs: what the evidence supports and what it doesn't",
    excerpt: "A pharmacist's honest read on the current NAD+ literature — dose, delivery, and who actually benefits.",
    readTime: "10 min read",
    date: "Coming soon",
  },
  {
    tile: "petWellness",
    category: "Household Wellness",
    title: "Compounding for pets in a human pharmacy — a case for household-level care",
    excerpt: "How treating a diabetic cat safely intersects with the immunocompromised human in the same home.",
    readTime: "7 min read",
    date: "Coming soon",
  },
  {
    tile: "sterile",
    category: "Practice",
    title: "USP <797> in a compounding lab, in plain language",
    excerpt: "What sterile compounding actually means, and why it should shape which pharmacy your physician trusts.",
    readTime: "9 min read",
    date: "Coming soon",
  },
];

function InsightsPage() {
  return (
    <>
      <section className="bg-secondary/60 pt-36 pb-16">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-10">
          <Reveal>
            <p className="eyebrow">Insights</p>
            <h1 className="mt-4 font-serif text-5xl leading-[1.05] text-primary md:text-6xl">
              Science, protocols, <em className="italic text-[color:var(--brand-gold)]">and pharmacist notes</em>
            </h1>
            <div className="mx-auto mt-6 gold-rule" />
            <p className="mx-auto mt-8 max-w-2xl text-lg text-muted-foreground">
              Long-form editorial from our compounding lab. Written by the pharmacists who make the medicine.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((a, i) => (
              <Reveal key={a.title} delay={(i % 3) * 0.06}>
                <article className="card-luxe group flex h-full flex-col overflow-hidden rounded-2xl">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={tiles[a.tile]}
                      alt={a.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
                    <span className="absolute left-4 top-4 rounded-full bg-[color:var(--brand-gold)]/95 px-3 py-1 text-[0.62rem] font-semibold tracking-[0.24em] text-primary uppercase shadow">
                      {a.category}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-8">
                    <span className="text-xs text-muted-foreground">{a.readTime}</span>
                    <h2 className="mt-4 font-serif text-2xl leading-snug text-primary group-hover:text-[color:var(--brand-teal)]">
                      {a.title}
                    </h2>
                    <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">{a.excerpt}</p>
                    <div className="mt-8 flex items-center justify-between border-t border-[color:var(--brand-gold)]/25 pt-5 text-xs text-muted-foreground">
                      <span className="italic">{a.date}</span>
                      <ArrowUpRight className="h-4 w-4 text-[color:var(--brand-gold)] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-3xl px-6 py-20 text-center lg:px-10">
          <Reveal>
            <Mail className="mx-auto h-8 w-8 text-[color:var(--brand-gold)]" strokeWidth={1.4} />
            <h2 className="mt-6 font-serif text-4xl leading-tight md:text-5xl">
              A quarterly letter from <em className="italic text-[color:var(--brand-gold)]">our lab</em>
            </h2>
            <div className="mx-auto mt-6 gold-rule" />
            <p className="mx-auto mt-6 max-w-lg text-primary-foreground/75">
              We publish long-form pieces four times a year. Leave your email to be notified when the first issue drops.
            </p>
            <div className="mt-10">
              <Button asChild size="lg" className="rounded-full bg-[color:var(--brand-gold)] px-8 text-primary hover:bg-[color:var(--brand-gold)]/90">
                <Link to="/contact">Subscribe by email</Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
