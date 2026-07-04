import { createFileRoute, Link } from "@tanstack/react-router";
import {
  HeartPulse,
  Sparkles,
  Baby,
  Droplet,
  PawPrint,
  ShieldCheck,
  FlaskConical,
  Leaf,
  Pill,
  Syringe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — BioBlend Compounding Pharmacy Dubai" },
      {
        name: "description",
        content:
          "Explore BioBlend's compounding services: hormone replacement, pediatric, dermatology, pet wellness, pain management, wellness, and sterile preparations.",
      },
      { property: "og:title", content: "Services — BioBlend Compounding Pharmacy" },
      { property: "og:description", content: "Custom compounding for hormones, dermatology, pediatrics, wellness and more." },
    ],
  }),
  component: ServicesPage,
});

const services: { icon: typeof HeartPulse; title: string; body: string; slug?: string }[] = [
  { icon: HeartPulse, title: "Hormone Replacement Therapy", body: "Bio-identical estrogen, progesterone, testosterone and thyroid formulations dosed to your labs.", slug: "hormone" },
  { icon: Sparkles, title: "Dermatology & Anti-Aging", body: "Prescription-strength retinoids, tranexamic acid, custom peels and personalized skin protocols.", slug: "dermatology" },
  { icon: Baby, title: "Pediatric Compounding", body: "Alcohol-free, sugar-free, dye-free suspensions in flavors children actually take.", slug: "pediatric" },
  { icon: Droplet, title: "IV & Wellness Therapy", body: "NAD+, glutathione, vitamin and hydration infusions supervised by our clinical team.", slug: "wellness-iv" },
  { icon: PawPrint, title: "Your Pet's Wellness Matters", body: "Your pet's wellness is part of yours. Species-appropriate, palatable formulations — transdermal cats, flavored canine treats — with medical-grade attention to safe handling and zoonotic-disease prevention for the whole household.", slug: "pet-wellness" },
  { icon: ShieldCheck, title: "Pain Management", body: "Topical and transdermal analgesic combinations that avoid systemic side effects." },
  { icon: FlaskConical, title: "Sterile Preparations", body: "USP <797> compliant sterile compounding for injectables and ophthalmics." },
  { icon: Leaf, title: "Nutraceutical Blends", body: "Physician-guided vitamin, mineral and adaptogen formulations." },
  { icon: Pill, title: "Longevity Protocols", body: "Peptides, senolytics and precision-medicine formulations for healthy aging." },
  { icon: Syringe, title: "Weight & Metabolic", body: "GLP-1 support programs, metabolic panels and individualized protocols." },
];

const steps = [
  { n: "01", title: "Consult", body: "Schedule a call or in-person visit with our pharmacists." },
  { n: "02", title: "Formulate", body: "We work with your physician on the ideal ingredients and dose." },
  { n: "03", title: "Compound", body: "Prepared in our Dubai lab under strict quality controls." },
  { n: "04", title: "Deliver", body: "Discreet delivery across the UAE with follow-up support." },
];

const faqs = [
  { q: "What is compounding?", a: "Compounding is the art and science of preparing customized medications. Instead of a mass-produced pill, you get a formulation tailored to your dose, delivery form, and even flavor." },
  { q: "Do I need a prescription?", a: "Yes. Compounded medications require a prescription from a licensed physician. We can also liaise with your doctor to design the right formulation." },
  { q: "Are your ingredients regulated?", a: "All our raw materials are pharmaceutical grade, sourced from FDA-registered suppliers, and independently tested for identity, potency and purity." },
  { q: "Do you deliver across the UAE?", a: "Yes — we offer discreet, temperature-controlled delivery across the Emirates and can arrange international shipping where legally permitted." },
];

function ServicesPage() {
  return (
    <>
      {/* HERO */}
      <section className="bg-secondary/60 pt-36 pb-20">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-10">
          <p className="eyebrow">Services</p>
          <h1 className="mt-4 font-serif text-5xl leading-[1.05] text-primary md:text-6xl">
            Precision compounding for <em className="italic text-[color:var(--brand-gold)]">every prescription</em>
          </h1>
          <div className="mx-auto mt-6 gold-rule" />
          <p className="mx-auto mt-8 max-w-2xl text-lg text-muted-foreground">
            From hormone optimization to pediatric flavors and sterile injectables, every formulation
            at BioBlend is prepared by hand, one patient at a time.
          </p>
        </div>
      </section>

      {/* GRID */}
      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => {
              const inner = (
                <>
                  <div className="grid h-12 w-12 place-items-center rounded-full bg-[color:var(--brand-gold)]/15">
                    <s.icon className="h-6 w-6 text-[color:var(--brand-teal)]" strokeWidth={1.5} />
                  </div>
                  <h3 className="mt-5 font-serif text-xl text-primary">{s.title}</h3>
                  <p className="mt-2 flex-1 text-sm text-muted-foreground">{s.body}</p>
                  <div className="mt-6 h-px w-full bg-gradient-to-r from-[color:var(--brand-gold)]/50 to-transparent" />
                  {s.slug && (
                    <span className="mt-4 inline-flex items-center gap-1 text-[0.68rem] font-medium tracking-[0.24em] text-[color:var(--brand-gold)] uppercase">
                      Learn more →
                    </span>
                  )}
                </>
              );
              const classes = "group relative flex h-full flex-col rounded-2xl border border-border/60 bg-card p-8 transition-all hover:border-[color:var(--brand-gold)]/60 hover:shadow-luxe";
              return (
                <Reveal key={s.title} delay={(i % 3) * 0.06}>
                  {s.slug ? (
                    <Link to="/services/$slug" params={{ slug: s.slug }} className={classes}>
                      {inner}
                    </Link>
                  ) : (
                    <div className={classes}>{inner}</div>
                  )}
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="bg-secondary/60">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <SectionHeading
            align="center"
            eyebrow="Our Process"
            title={<>A quiet, careful path to <em className="italic text-[color:var(--brand-gold)]">your formulation</em></>}
          />
          <div className="mt-16 grid gap-8 md:grid-cols-4">
            {steps.map((s) => (
              <div key={s.n} className="text-center">
                <span className="font-serif text-6xl text-[color:var(--brand-gold)]">{s.n}</span>
                <h3 className="mt-4 font-serif text-xl text-primary">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-background">
        <div className="mx-auto max-w-3xl px-6 py-24 lg:px-10">
          <SectionHeading
            align="center"
            eyebrow="Frequently Asked"
            title="Questions we hear often"
          />
          <Accordion type="single" collapsible className="mt-12">
            {faqs.map((f) => (
              <AccordionItem key={f.q} value={f.q} className="border-border/60">
                <AccordionTrigger className="text-left font-serif text-lg text-primary hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-14 text-center">
            <Button asChild size="lg" className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
              <Link to="/contact">Ask our pharmacists</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
