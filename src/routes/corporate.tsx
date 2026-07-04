import { createFileRoute, Link } from "@tanstack/react-router";
import { Building2, Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { CardTile } from "@/components/CardTile";
import { tiles, type TileKey } from "@/lib/tiles";

export const Route = createFileRoute("/corporate")({
  head: () => ({
    meta: [
      { title: "Corporate Wellness — BioBlend Compounding Pharmacy" },
      { name: "description", content: "BioBlend Corporate Wellness: onsite health screenings, executive HRT and longevity protocols, custom formulary partnerships for clinics, offices, and hospitality teams in Dubai." },
      { property: "og:title", content: "Corporate Wellness — BioBlend Compounding Pharmacy" },
      { property: "og:description", content: "Precision wellness for teams, executives, and organizations across the UAE." },
    ],
  }),
  component: CorporatePage,
});

const programs: { tile: TileKey; title: string; body: string }[] = [
  { tile: "longevity", title: "Executive longevity", body: "Personalized HRT, peptide, and nutraceutical protocols for C-suite and high-performance teams." },
  { tile: "dermatology", title: "Skin & dermatology days", body: "Dermatologist-led onsite consults with same-week compounded protocols delivered to the office." },
  { tile: "nutraceutical", title: "Formulary partnership", body: "Bespoke in-clinic formulary for wellness centres, spas, and hospitality — private-label ready." },
  { tile: "wellnessIv", title: "Team wellness clinics", body: "Onsite screening days: labs, IV therapy, vitamin protocols, follow-up plans." },
];

const outcomes = [
  { stat: "38%", label: "avg reduction in reported fatigue at 90 days" },
  { stat: "24/7", label: "concierge pharmacist for executive members" },
  { stat: "72h", label: "typical turnaround for custom formulations" },
];

function CorporatePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-secondary/60 pt-36 pb-20">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:px-10">
          <Reveal>
            <p className="eyebrow">Corporate Wellness</p>
            <h1 className="mt-6 font-serif text-5xl leading-[1.02] text-primary md:text-6xl">
              Precision wellness for <em className="italic text-[color:var(--brand-gold)]">teams that perform</em>.
            </h1>
            <div className="mt-6 gold-rule" />
            <p className="mt-8 max-w-xl text-lg text-muted-foreground">
              BioBlend Corporate Wellness partners with clinics, hospitality groups, family offices, and executive teams
              across the UAE — bringing our compounding lab, pharmacists, and physician network to your workplace.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button asChild size="lg" className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
                <Link to="/contact">Book a discovery call</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full">
                <Link to="/physicians">For clinicians <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="gold-frame overflow-hidden rounded-3xl">
              <img
                src={tiles.corporate}
                alt="Executive team during a BioBlend onsite wellness consultation"
                className="aspect-[4/5] w-full rounded-[calc(1.5rem-3px)] object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>


      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <Reveal>
            <SectionHeading eyebrow="Programs" title={<>Four tiers of <em className="italic text-[color:var(--brand-gold)]">corporate care</em></>} />
          </Reveal>
          <div className="mt-16 grid gap-6 md:grid-cols-2">
            {programs.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.06}>
                <div className="card-luxe flex items-start gap-6 rounded-2xl p-8">
                  <CardTile tile={p.tile} alt={p.title} size="md" />
                  <div>
                    <h3 className="font-serif text-2xl text-primary">{p.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-6xl px-6 py-24 lg:px-10">
          <div className="grid gap-10 md:grid-cols-3">
            {outcomes.map((o, i) => (
              <Reveal key={o.label} delay={i * 0.08}>
                <div className="text-center md:text-left">
                  <p className="font-serif text-6xl text-[color:var(--brand-gold)] md:text-7xl">{o.stat}</p>
                  <p className="mt-4 text-sm leading-relaxed text-primary-foreground/75">{o.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-4xl px-6 py-24 lg:px-10">
          <Reveal>
            <SectionHeading eyebrow="Ideal partners" align="center" title={<>Who we work <em className="italic text-[color:var(--brand-gold)]">with</em></>} />
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {["Wellness clinics & aesthetic centres", "Family offices & concierge medicine", "5-star hospitality groups", "Executive & sports teams", "Boutique dermatology practices", "Longevity & functional medicine clinics"].map((k, i) => (
              <Reveal key={k} delay={i * 0.04}>
                <div className="flex items-start gap-3 rounded-xl border border-[color:var(--brand-gold)]/30 bg-[color:var(--brand-gold)]/8 p-5 transition-colors hover:bg-[color:var(--brand-gold)]/12">
                  <Building2 className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--brand-teal)]" strokeWidth={1.6} />
                  <span className="text-sm text-foreground/80">{k}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-secondary/60">
        <div className="mx-auto max-w-4xl px-6 py-20 text-center lg:px-10">
          <Reveal>
            <Calendar className="mx-auto h-8 w-8 text-[color:var(--brand-gold)]" strokeWidth={1.4} />
            <h2 className="mt-6 font-serif text-4xl leading-tight text-primary md:text-5xl">
              Design a program for your <em className="italic text-[color:var(--brand-gold)]">organization</em>.
            </h2>
            <div className="mx-auto mt-6 gold-rule" />
            <p className="mx-auto mt-6 max-w-xl text-muted-foreground">
              A 30-minute call with our corporate team is all we need to scope a proposal.
            </p>
            <div className="mt-10">
              <Button asChild size="lg" className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
                <Link to="/contact">Request a proposal</Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
