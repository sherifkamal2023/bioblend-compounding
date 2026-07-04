import { createFileRoute, Link } from "@tanstack/react-router";
import {
  FlaskConical,
  Leaf,
  ShieldCheck,
  Sparkles,
  HeartPulse,
  Baby,
  PawPrint,
  Droplet,
  ArrowRight,
  ArrowUpRight,
  Phone,
  MapPin,
  Star,
  CalendarCheck,
  FileText,
  Building2,
  Stethoscope,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/SectionHeading";
import heroLab from "@/assets/hero-lab.jpg";
import productsFlatlay from "@/assets/products-flatlay.jpg";
import pharmacistImg from "@/assets/pharmacist.jpg";
import wellnessImg from "@/assets/wellness-portrait.jpg";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BioBlend Compounding Pharmacy — Your Health. Our Blend." },
      {
        name: "description",
        content:
          "Dubai's premier compounding pharmacy for hormone optimization, dermatology, pediatric, and personalized wellness formulations.",
      },
    ],
  }),
  component: HomePage,
});

const quickActions = [
  {
    icon: CalendarCheck,
    title: "Book a Consultation",
    body: "Meet our pharmacists — 30-minute private review of your goals and prescriptions.",
    to: "/contact",
    cta: "Reserve time",
  },
  {
    icon: FileText,
    title: "Transfer a Prescription",
    body: "Move an active Rx to BioBlend — we handle the paperwork with your physician.",
    to: "/contact",
    cta: "Start transfer",
  },
  {
    icon: MapPin,
    title: "Visit the Lab",
    body: "Tour our sterile compounding lab and consultation suite in Dubai.",
    to: "/contact",
    cta: "Get directions",
  },
  {
    icon: Building2,
    title: "Corporate Wellness",
    body: "Tailored formulary programs for clinics, wellness centers, and executive teams.",
    to: "/contact",
    cta: "Partner with us",
  },
];

const practiceAreas = [
  {
    icon: HeartPulse,
    title: "Hormone Lab",
    tagline: "Bio-identical HRT · Thyroid · Adrenal",
  },
  {
    icon: Sparkles,
    title: "Dermatology Lab",
    tagline: "Custom serums · Peels · Anti-aging",
  },
  {
    icon: Baby,
    title: "Pediatric Lab",
    tagline: "Flavored suspensions · Precise dosing",
  },
  {
    icon: PawPrint,
    title: "Veterinary Lab",
    tagline: "Palatable formulas for pets",
  },
  {
    icon: Droplet,
    title: "Wellness & IV Lab",
    tagline: "Nutraceuticals · IV therapy · Longevity",
  },
];


const services = [
  { icon: HeartPulse, title: "Hormone Replacement", body: "Bio-identical HRT tailored to your hormone panel." },
  { icon: Sparkles, title: "Dermatology & Anti-Aging", body: "Custom serums, peels, and skin protocols." },
  { icon: Baby, title: "Pediatric Compounding", body: "Gentle flavors and precise pediatric dosing." },
  { icon: Droplet, title: "Wellness & IV Therapy", body: "Nutraceutical blends and IV wellness support." },
  { icon: PawPrint, title: "Veterinary Compounding", body: "Palatable formulations for beloved pets." },
  { icon: ShieldCheck, title: "Pain Management", body: "Topical and transdermal pain solutions." },
];

const steps = [
  { n: "01", title: "Consultation", body: "We listen — to your goals, your history, and your physician." },
  { n: "02", title: "Personalized Assessment", body: "Labs, symptoms, and lifestyle inform a bespoke plan." },
  { n: "03", title: "Custom Formulation", body: "Precision compounding in our sterile lab." },
  { n: "04", title: "Delivered Wellness", body: "Follow-up, refinement, and discreet delivery." },
];

const testimonials = [
  {
    quote: "The team took time to understand my needs. My compounded HRT changed the way I feel every day.",
    name: "Layla A.",
    role: "Patient, Dubai",
  },
  {
    quote: "Finally a pharmacy that treats you like a person, not a prescription. The formulations are exquisite.",
    name: "Dr. Omar S.",
    role: "Referring Physician",
  },
  {
    quote: "The packaging, the science, the care — BioBlend feels like luxury with real medical rigor.",
    name: "Priya R.",
    role: "Wellness Client",
  },
];

function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-primary text-primary-foreground">
        <div className="absolute inset-0 -z-10">
          <img
            src={heroLab}
            alt="Amber apothecary bottles on marble in a compounding lab"
            width={1600}
            height={1200}
            className="h-full w-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary/80 to-primary/60" />
        </div>

        <div className="mx-auto grid max-w-7xl gap-16 px-6 pt-40 pb-28 lg:grid-cols-[1.1fr_.9fr] lg:px-10 lg:pt-48 lg:pb-40">
          <div>
            <p className="eyebrow text-[color:var(--brand-gold)]">Compounding Pharmacy · Dubai</p>
            <h1 className="mt-6 font-serif text-5xl leading-[1.02] text-primary-foreground md:text-7xl">
              Personalized medicine,
              <br />
              <em className="text-[color:var(--brand-gold)] not-italic font-serif italic">
                precision wellness.
              </em>
            </h1>
            <div className="mt-6 gold-rule" />
            <p className="mt-8 max-w-xl text-lg text-primary-foreground/80">
              BioBlend crafts custom-compounded solutions designed around your biology —
              from bio-identical hormones to pediatric formulations and everything in between.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Button asChild size="lg" className="rounded-full bg-[color:var(--brand-gold)] px-8 text-primary hover:bg-[color:var(--brand-gold)]/90">
                <Link to="/contact">Book a Consultation</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full border-primary-foreground/30 bg-transparent px-8 text-primary-foreground hover:bg-primary-foreground/10">
                <Link to="/services">Explore Treatments <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>

            <div className="mt-12 flex flex-wrap gap-x-8 gap-y-4 text-sm text-primary-foreground/75">
              <span className="inline-flex items-center gap-2"><Phone className="h-4 w-4 text-[color:var(--brand-gold)]" /> +971 4 3277355</span>
              <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4 text-[color:var(--brand-gold)]" /> Dubai, UAE</span>
              <span className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-[color:var(--brand-gold)]" /> DHA licensed</span>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="absolute -top-6 -right-6 h-72 w-72 rounded-full bg-[color:var(--brand-gold)]/15 blur-3xl" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-primary-foreground/10 shadow-luxe">
              <img
                src={wellnessImg}
                alt="Serene wellness portrait"
                width={1400}
                height={1600}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-x-6 bottom-6 rounded-2xl bg-background/95 p-5 text-foreground backdrop-blur">
                <p className="font-serif text-lg italic text-primary">"Your Health. Our Blend."</p>
                <p className="mt-1 text-xs tracking-widest text-muted-foreground uppercase">
                  The BioBlend promise
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QUAD ACTION STRIP */}
      <section className="border-b border-border/60 bg-background">
        <div className="mx-auto grid max-w-7xl gap-px overflow-hidden bg-border/60 md:grid-cols-2 lg:grid-cols-4">
          {quickActions.map((a) => (
            <Link
              key={a.title}
              to={a.to}
              className="group relative flex flex-col justify-between gap-6 bg-background p-8 transition-colors hover:bg-secondary/60"
            >
              <div>
                <div className="grid h-11 w-11 place-items-center rounded-full bg-[color:var(--brand-gold)]/15 text-[color:var(--brand-gold)]">
                  <a.icon className="h-5 w-5" strokeWidth={1.6} />
                </div>
                <h3 className="mt-5 font-serif text-xl leading-tight text-primary">{a.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{a.body}</p>
              </div>
              <span className="inline-flex items-center gap-1 text-xs font-medium tracking-[0.22em] text-[color:var(--brand-gold)] uppercase">
                {a.cta} <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* PRACTICE AREAS — Our Labs */}
      <section className="bg-secondary/40">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <SectionHeading
            eyebrow="Our Practice Areas"
            align="center"
            title={<>Five labs, one <em className="italic text-[color:var(--brand-gold)]">precision formulary</em></>}
            description="Each discipline is led by DHA-licensed pharmacists compounding to physician spec — from micro-dose pediatric suspensions to sterile IV nutraceuticals."
          />
          <div className="mt-16 grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {practiceAreas.map((p) => (
              <Link
                key={p.title}
                to="/services"
                className="group flex flex-col items-center text-center"
              >
                <div className="relative">
                  <div className="absolute inset-0 -m-2 rounded-full border border-[color:var(--brand-gold)]/30 opacity-0 transition-opacity group-hover:opacity-100" />
                  <div className="grid h-28 w-28 place-items-center rounded-full bg-background shadow-soft ring-1 ring-border/60 transition-transform group-hover:-translate-y-1">
                    <p.icon className="h-10 w-10 text-[color:var(--brand-teal)]" strokeWidth={1.3} />
                  </div>
                </div>
                <h3 className="mt-6 font-serif text-lg tracking-wide text-primary uppercase">{p.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{p.tagline}</p>
                <span className="mt-3 text-[0.68rem] font-medium tracking-[0.24em] text-[color:var(--brand-gold)] uppercase">See more</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* YOUR PATH — editorial */}
      <section className="bg-background">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 py-24 lg:grid-cols-[.9fr_1.1fr] lg:px-10">
          <div>
            <p className="eyebrow">Your path to</p>
            <h2 className="mt-4 font-serif text-5xl leading-[1.05] text-primary md:text-6xl">
              Precision
              <br />
              <em className="italic text-[color:var(--brand-gold)]">medicine</em>
            </h2>
            <div className="mt-6 gold-rule" />
            <p className="mt-8 max-w-md text-muted-foreground">
              A fusion of clinical rigor, artisanal compounding, and quiet, unhurried care.
              Together with your physician, we design formulations that meet your biology where it is —
              and evolve as you do.
            </p>
            <p className="mt-4 max-w-md text-muted-foreground">
              BioBlend is not just a pharmacy. It is a personalized journey toward whole-life wellness.
            </p>
          </div>
          <ol className="relative space-y-6">
            {[
              { n: "01", title: "Consult", body: "Private conversation with a pharmacist — goals, history, physician notes." },
              { n: "02", title: "Formulate", body: "Bespoke compounding in our sterile lab — every ingredient, dose, and delivery tuned to you." },
              { n: "03", title: "Care", body: "Discreet delivery, follow-up, and refinement over time as your protocol evolves." },
            ].map((step) => (
              <li key={step.n} className="relative flex gap-6 rounded-2xl border border-border/60 bg-card p-8 shadow-soft">
                <span className="font-serif text-4xl leading-none text-[color:var(--brand-gold)]">{step.n}</span>
                <div>
                  <h3 className="font-serif text-2xl text-primary">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>



      {/* ABOUT / SCIENCE-MEETS-CARE */}
      <section className="bg-secondary/60">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 py-24 lg:grid-cols-2 lg:px-10">
          <div className="relative">
            <div className="absolute -top-6 -left-6 h-40 w-40 rounded-full border border-[color:var(--brand-gold)]/40" />
            <img
              src={pharmacistImg}
              alt="Pharmacist compounding a formulation"
              width={1400}
              height={1600}
              loading="lazy"
              className="relative aspect-[4/5] w-full rounded-[2rem] object-cover shadow-luxe"
            />
          </div>
          <div>
            <SectionHeading
              eyebrow="About BioBlend"
              title={<>Where science meets <em className="not-italic italic text-[color:var(--brand-gold)]">personalized care</em></>}
              description="BioBlend Compounding Pharmacy creates customized medications and wellness solutions tailored to each patient's unique biology, lifestyle, and healthcare needs. Every prescription is a collaboration between physician, pharmacist, and patient."
            />
            <div className="mt-10 grid grid-cols-2 gap-6 text-sm">
              {["Personalized Medicine", "Hormone Optimization", "Dermatology & Skincare", "Longevity & Anti-Aging", "Functional Wellness", "Nutraceuticals"].map((f) => (
                <div key={f} className="flex items-center gap-3 border-b border-border/60 pb-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--brand-gold)]" />
                  <span className="text-foreground/80">{f}</span>
                </div>
              ))}
            </div>
            <div className="mt-10">
              <Button asChild variant="outline" className="rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                <Link to="/about">Our Philosophy <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <SectionHeading
            eyebrow="Our Services"
            align="center"
            title={<>Crafted for every stage of <em className="italic text-[color:var(--brand-gold)]">your wellness journey</em></>}
            description="From bio-identical hormones to pediatric flavors and veterinary formulations — every prescription is compounded to spec in our sterile Dubai lab."
          />
          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <div key={s.title} className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card p-8 transition-all hover:border-[color:var(--brand-gold)]/60 hover:shadow-luxe">
                <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[color:var(--brand-gold)] to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <s.icon className="h-8 w-8 text-[color:var(--brand-teal)]" strokeWidth={1.5} />
                <h3 className="mt-5 font-serif text-xl text-primary">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
                <Link to="/services" className="mt-5 inline-flex items-center gap-1 text-xs font-medium tracking-widest text-[color:var(--brand-gold)] uppercase">
                  Learn more <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="relative overflow-hidden bg-primary text-primary-foreground">
        <div className="absolute inset-0 -z-10 opacity-20">
          <img src={productsFlatlay} alt="" width={1600} height={1000} className="h-full w-full object-cover" aria-hidden="true" />
          <div className="absolute inset-0 bg-primary/85" />
        </div>
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <SectionHeading
            eyebrow="How It Works"
            invert
            align="center"
            title={<>Four steps from consultation to <em className="italic text-[color:var(--brand-gold)]">bespoke wellness</em></>}
          />
          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <div key={s.n} className="relative rounded-2xl border border-primary-foreground/10 bg-primary-foreground/[0.04] p-8 backdrop-blur">
                <span className="font-serif text-5xl text-[color:var(--brand-gold)]">{s.n}</span>
                <h3 className="mt-4 font-serif text-xl text-primary-foreground">{s.title}</h3>
                <p className="mt-2 text-sm text-primary-foreground/70">{s.body}</p>
                {i < steps.length - 1 && (
                  <div className="absolute top-1/2 -right-4 hidden h-px w-8 bg-[color:var(--brand-gold)]/50 lg:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTS / GALLERY */}
      <section className="bg-background">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 py-24 lg:grid-cols-[.9fr_1.1fr] lg:px-10">
          <div>
            <SectionHeading
              eyebrow="The Formulary"
              title={<>Every bottle, tuned to <em className="italic text-[color:var(--brand-gold)]">a single patient</em></>}
              description="Custom capsules, topical creams, sublingual troches, sterile injectables, and nutraceutical blends — all compounded in-house with pharmaceutical-grade ingredients."
            />
            <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-3 text-sm text-foreground/80">
              {["Custom Capsules", "Topical Creams", "Anti-Aging Serums", "Wellness Supplements", "Personalized Skincare", "Hormone Support", "Sterile Injectables", "Pediatric Suspensions"].map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <span className="h-1 w-6 bg-[color:var(--brand-gold)]" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
            <img
              src={productsFlatlay}
              alt="Luxury pharmacy products flat lay"
              width={1600}
              height={1000}
              loading="lazy"
              className="w-full rounded-[2rem] object-cover shadow-luxe"
            />
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-secondary/60">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <SectionHeading
            eyebrow="Kind Words"
            align="center"
            title={<>What our patients & partners <em className="italic text-[color:var(--brand-gold)]">quietly celebrate</em></>}
          />
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <figure key={t.name} className="rounded-2xl border border-border/60 bg-card p-8 shadow-soft">
                <div className="flex gap-1 text-[color:var(--brand-gold)]">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <blockquote className="mt-5 font-serif text-lg leading-relaxed text-primary italic">
                  "{t.quote}"
                </blockquote>
                <figcaption className="mt-6 text-sm">
                  <span className="font-medium text-foreground">{t.name}</span>
                  <span className="block text-xs tracking-wider text-muted-foreground uppercase">{t.role}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* CORPORATE & PARTNERSHIPS */}
      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-6 pt-24 lg:px-10">
          <div className="grid gap-8 md:grid-cols-2">
            <article className="group flex flex-col justify-between gap-8 rounded-3xl border border-border/60 bg-secondary/50 p-10 transition-shadow hover:shadow-luxe">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--brand-gold)]/40 bg-background/60 px-3 py-1 text-[0.65rem] font-medium tracking-[0.24em] text-[color:var(--brand-gold)] uppercase">
                  <Building2 className="h-3 w-3" /> For Organizations
                </div>
                <h3 className="mt-6 font-serif text-3xl leading-tight text-primary md:text-4xl">
                  Corporate <em className="italic text-[color:var(--brand-gold)]">wellness</em> programs
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  Tailored formulary and preventive-health programs for executive teams, family offices, and wellness employers — delivered with the discretion your team expects.
                </p>
              </div>
              <Link to="/contact" className="inline-flex items-center gap-2 text-sm font-medium tracking-widest text-[color:var(--brand-gold)] uppercase">
                Design a program <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </article>

            <article className="group flex flex-col justify-between gap-8 rounded-3xl bg-primary p-10 text-primary-foreground shadow-luxe transition-shadow hover:shadow-luxe">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--brand-gold)]/40 bg-primary-foreground/5 px-3 py-1 text-[0.65rem] font-medium tracking-[0.24em] text-[color:var(--brand-gold)] uppercase">
                  <Stethoscope className="h-3 w-3" /> For Clinicians
                </div>
                <h3 className="mt-6 font-serif text-3xl leading-tight md:text-4xl">
                  Clinic & physician <em className="italic text-[color:var(--brand-gold)]">partnerships</em>
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-primary-foreground/75">
                  Refer patients or co-design protocols with our pharmacists — hormone panels, dermatology stacks, IV support, veterinary. Direct pharmacist line for prescribing physicians.
                </p>
              </div>
              <Link to="/contact" className="inline-flex items-center gap-2 text-sm font-medium tracking-widest text-[color:var(--brand-gold)] uppercase">
                Refer a patient <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </article>
          </div>
        </div>
      </section>

      {/* CTA */}

      <section className="bg-background">
        <div className="mx-auto max-w-6xl px-6 py-24 lg:px-10">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-primary p-12 text-primary-foreground shadow-luxe md:p-16">
            <div className="absolute -top-16 -right-16 h-64 w-64 rounded-full bg-[color:var(--brand-gold)]/20 blur-3xl" />
            <div className="relative grid gap-10 md:grid-cols-[1.4fr_.6fr] md:items-center">
              <div>
                <p className="eyebrow text-[color:var(--brand-gold)]">Begin Your Blend</p>
                <h2 className="mt-4 font-serif text-4xl leading-tight md:text-5xl">
                  Ready to formulate a plan built just for you?
                </h2>
                <p className="mt-4 max-w-lg text-primary-foreground/80">
                  Book a consultation with our pharmacists. We'll listen, review, and design a formulation
                  that fits your life.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <Button asChild size="lg" className="rounded-full bg-[color:var(--brand-gold)] text-primary hover:bg-[color:var(--brand-gold)]/90">
                  <Link to="/contact">Book Consultation</Link>
                </Button>
                <a href="tel:+97143277355" className="text-center text-sm text-primary-foreground/80 hover:text-[color:var(--brand-gold)]">
                  or call +971 4 3277355
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
