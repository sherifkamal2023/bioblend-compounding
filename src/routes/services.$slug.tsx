import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { practiceAreas, findPracticeArea } from "@/lib/practice-areas";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const area = findPracticeArea(params.slug);
    if (!area) throw notFound();
    return { area };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Practice area not found — BioBlend" }, { name: "robots", content: "noindex" }] };
    }
    const { area } = loaderData;
    const title = `${area.title} — BioBlend Compounding Pharmacy`;
    return {
      meta: [
        { title },
        { name: "description", content: area.tagline },
        { property: "og:title", content: title },
        { property: "og:description", content: area.tagline },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-6 py-40 text-center">
      <p className="eyebrow">404</p>
      <h1 className="mt-3 font-serif text-4xl text-primary">Practice area not found</h1>
      <div className="mx-auto mt-4 gold-rule" />
      <div className="mt-8">
        <Button asChild variant="outline" className="rounded-full">
          <Link to="/services">Back to services</Link>
        </Button>
      </div>
    </div>
  ),
  component: PracticeAreaPage,
});

function PracticeAreaPage() {
  const { area } = Route.useLoaderData();

  return (
    <>
      {/* HERO */}
      <section className="bg-secondary/60 pt-36 pb-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-10">
          <Reveal>
            <Link to="/services" className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.22em] text-[color:var(--brand-gold)] uppercase">
              <ArrowLeft className="h-3 w-3" /> All services
            </Link>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="eyebrow mt-8">{area.eyebrow}</p>
            <h1 className="mt-4 font-serif text-5xl leading-[1.05] text-primary md:text-6xl">{area.title}</h1>
            <div className="mt-6 gold-rule" />
            <p className="mt-8 max-w-2xl font-serif text-2xl italic leading-snug text-primary/80 md:text-3xl">
              {area.hero}
            </p>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">{area.intro}</p>
          </Reveal>
        </div>
      </section>

      {/* OFFERINGS */}
      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <Reveal>
            <SectionHeading
              eyebrow="What we compound"
              title={<>Formulations crafted for <em className="italic text-[color:var(--brand-gold)]">{area.title.toLowerCase()}</em></>}
            />
          </Reveal>
          <div className="mt-16 grid gap-6 md:grid-cols-2">
            {area.offerings.map((o, i) => (
              <Reveal key={o.title} delay={i * 0.05}>
                <div className="rounded-2xl border border-border/60 bg-card p-8 shadow-soft transition-all hover:border-[color:var(--brand-gold)]/60 hover:shadow-luxe">
                  <CheckCircle2 className="h-6 w-6 text-[color:var(--brand-gold)]" strokeWidth={1.4} />
                  <h3 className="mt-4 font-serif text-2xl text-primary">{o.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{o.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="bg-secondary/60">
        <div className="mx-auto max-w-4xl px-6 py-24 lg:px-10">
          <Reveal>
            <SectionHeading eyebrow="How it works" align="center" title={<>From prescription to <em className="italic text-[color:var(--brand-gold)]">delivery</em></>} />
          </Reveal>
          <ol className="mt-14 space-y-4">
            {area.process.map((step, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <li className="flex gap-6 rounded-2xl border border-border/60 bg-card p-6 shadow-soft">
                  <span className="font-serif text-3xl leading-none text-[color:var(--brand-gold)]">{String(i + 1).padStart(2, "0")}</span>
                  <p className="pt-1 text-sm leading-relaxed text-foreground/80 md:text-base">{step}</p>
                </li>
              </Reveal>
            ))}
          </ol>
          {area.note && (
            <p className="mt-10 rounded-xl border border-[color:var(--brand-gold)]/30 bg-[color:var(--brand-gold)]/8 p-5 text-xs italic text-primary/70">
              {area.note}
            </p>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-4xl px-6 py-20 text-center lg:px-10">
          <Reveal>
            <p className="eyebrow text-[color:var(--brand-gold)]">Ready to start?</p>
            <h2 className="mt-4 font-serif text-4xl leading-tight md:text-5xl">
              Speak to a <em className="italic text-[color:var(--brand-gold)]">BioBlend pharmacist</em>
            </h2>
            <div className="mx-auto mt-6 gold-rule" />
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="rounded-full bg-[color:var(--brand-gold)] px-8 text-primary hover:bg-[color:var(--brand-gold)]/90">
                <Link to="/contact">Book a Consultation</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full border-primary-foreground/30 bg-transparent px-8 text-primary-foreground hover:bg-primary-foreground/10">
                <Link to="/services">Explore other services <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* RELATED */}
      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <p className="eyebrow text-center">Other practice areas</p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {practiceAreas.filter((p) => p.slug !== area.slug).slice(0, 4).map((p) => (
              <Link
                key={p.slug}
                to="/services/$slug"
                params={{ slug: p.slug }}
                className="group rounded-2xl border border-border/60 bg-card p-6 transition-all hover:border-[color:var(--brand-gold)]/60 hover:shadow-soft"
              >
                <p className="eyebrow">{p.eyebrow}</p>
                <h3 className="mt-3 font-serif text-lg text-primary group-hover:text-[color:var(--brand-teal)]">{p.title}</h3>
                <p className="mt-2 text-xs text-muted-foreground">{p.tagline}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
