import { createFileRoute, Link } from "@tanstack/react-router";
import { Stethoscope, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { CardTile } from "@/components/CardTile";
import type { TileKey } from "@/lib/tiles";

export const Route = createFileRoute("/physicians")({
  head: () => ({
    meta: [
      { title: "For Physicians — BioBlend Compounding Pharmacy Dubai" },
      { name: "description", content: "Partner with BioBlend on bespoke formulations. DHA-licensed compounding, direct pharmacist access, and a growing formulary for prescribing physicians in the UAE." },
      { property: "og:title", content: "For Physicians — BioBlend Compounding Pharmacy" },
      { property: "og:description", content: "A partner pharmacy for prescribers who want precise, personalized formulations." },
    ],
  }),
  component: PhysiciansPage,
});

const pillars: { tile: TileKey; title: string; body: string }[] = [
  { tile: "nutraceutical", title: "Bespoke formulary", body: "Micro-doses, delivery-form conversions, allergen-free bases, taste-masking — we co-design with you." },
  { tile: "sterile", title: "DHA-licensed & audited", body: "USP <795> non-sterile and USP <797> sterile compliance. Full batch documentation on request." },
  { tile: "partnership", title: "Direct pharmacist line", body: "A named pharmacist for your practice — no call centre. WhatsApp, phone, email — response inside the hour." },
  { tile: "hormone", title: "Digital Rx workflow", body: "Send prescriptions by secure link. Refill tracking and adherence notes flow back to your patient chart." },
];

const workflow = [
  { n: "01", title: "Onboard", body: "One 30-minute call with our lead pharmacist to map your commonly-prescribed formulations." },
  { n: "02", title: "Prescribe", body: "Send Rx via secure link, encrypted email, or e-prescription network." },
  { n: "03", title: "Compound", body: "Prepared in-lab within 24-72h depending on formulation." },
  { n: "04", title: "Deliver & follow-up", body: "Discreet delivery to your patient. Adherence and refill notes shared back." },
];

const specialties = [
  "Endocrinology & HRT", "Dermatology", "Pediatrics", "Functional & longevity medicine",
  "Pain management", "Women's health", "Sports medicine", "Integrative & wellness clinics",
];

function PhysiciansPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-primary pt-36 pb-20 text-primary-foreground">
        <div className="absolute inset-0 -z-10 opacity-[0.08]" aria-hidden="true">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,var(--brand-gold),transparent_50%)]" />
        </div>
        <div className="mx-auto max-w-5xl px-6 lg:px-10">
          <Reveal>
            <p className="eyebrow text-[color:var(--brand-gold)]">For Physicians</p>
            <h1 className="mt-6 font-serif text-5xl leading-[1.02] md:text-7xl">
              A pharmacy that <em className="italic text-[color:var(--brand-gold)]">extends</em> your practice.
            </h1>
            <div className="mt-6 gold-rule" />
            <p className="mt-8 max-w-2xl text-lg text-primary-foreground/80">
              BioBlend is the compounding partner for physicians who prescribe outside the shelf —
              exact doses, exact bases, allergen exclusions, delivery-form flexibility. We handle the compounding rigour
              so you can focus on the plan.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button asChild size="lg" className="rounded-full bg-[color:var(--brand-gold)] px-8 text-primary hover:bg-[color:var(--brand-gold)]/90">
                <Link to="/contact">Start a partnership</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full border-primary-foreground/30 bg-transparent px-8 text-primary-foreground hover:bg-primary-foreground/10">
                <a href="tel:+97143277355">Speak to lead pharmacist <ArrowRight className="ml-2 h-4 w-4" /></a>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <Reveal>
            <SectionHeading
              eyebrow="Why physicians choose BioBlend"
              title={<>Precision, <em className="italic text-[color:var(--brand-gold)]">accountability</em>, and a direct line.</>}
              description="No black-box compounding. Every batch is documented, every formulation reviewed by a named pharmacist assigned to your practice."
            />
          </Reveal>
          <div className="mt-16 grid gap-6 md:grid-cols-2">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.06}>
                <div className="flex gap-6 rounded-2xl border border-border/60 bg-card p-8 shadow-soft">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[color:var(--brand-gold)]/15 text-[color:var(--brand-gold)]">
                    <p.icon className="h-5 w-5" strokeWidth={1.6} />
                  </div>
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

      <section className="bg-secondary/60">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <Reveal>
            <SectionHeading eyebrow="The workflow" align="center" title={<>From prescription to <em className="italic text-[color:var(--brand-gold)]">patient</em></>} />
          </Reveal>
          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {workflow.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.06}>
                <div className="rounded-2xl border border-border/60 bg-card p-8 shadow-soft">
                  <span className="font-serif text-5xl text-[color:var(--brand-gold)]">{s.n}</span>
                  <h3 className="mt-4 font-serif text-xl text-primary">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-6xl px-6 py-24 lg:px-10">
          <Reveal>
            <SectionHeading eyebrow="Specialties we support" title={<>Cross-disciplinary <em className="italic text-[color:var(--brand-gold)]">compounding</em></>} />
          </Reveal>
          <div className="mt-12 grid gap-3 sm:grid-cols-2 md:grid-cols-4">
            {specialties.map((s, i) => (
              <Reveal key={s} delay={i * 0.03}>
                <div className="flex items-center gap-3 rounded-xl border border-border/60 bg-card p-4">
                  <Stethoscope className="h-4 w-4 shrink-0 text-[color:var(--brand-teal)]" strokeWidth={1.6} />
                  <span className="text-sm text-foreground/80">{s}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-4xl px-6 py-20 text-center lg:px-10">
          <Reveal>
            <h2 className="font-serif text-4xl leading-tight md:text-5xl">
              Bring your <em className="italic text-[color:var(--brand-gold)]">next prescription</em> to BioBlend.
            </h2>
            <div className="mx-auto mt-6 gold-rule" />
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="rounded-full bg-[color:var(--brand-gold)] px-8 text-primary hover:bg-[color:var(--brand-gold)]/90">
                <Link to="/contact">Request onboarding call</Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
