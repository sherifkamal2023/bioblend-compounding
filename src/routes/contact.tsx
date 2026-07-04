import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Phone, MapPin, Mail, Globe, Clock, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { SectionHeading } from "@/components/SectionHeading";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — BioBlend Compounding Pharmacy Dubai" },
      {
        name: "description",
        content:
          "Reach BioBlend Compounding Pharmacy in Dubai. Call +971 4 3277355 or book a consultation online.",
      },
      { property: "og:title", content: "Contact BioBlend" },
      { property: "og:description", content: "Book a consultation with BioBlend Compounding Pharmacy in Dubai." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      toast.success("Thank you — we'll be in touch within one business day.");
      (e.target as HTMLFormElement).reset();
      setSubmitting(false);
    }, 600);
  };

  return (
    <>
      {/* HERO */}
      <section className="bg-secondary/60 pt-36 pb-16">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-10">
          <p className="eyebrow">Contact</p>
          <h1 className="mt-4 font-serif text-5xl leading-[1.05] text-primary md:text-6xl">
            Let's design your <em className="italic text-[color:var(--brand-gold)]">blend</em>
          </h1>
          <div className="mx-auto mt-6 gold-rule" />
          <p className="mx-auto mt-8 max-w-xl text-lg text-muted-foreground">
            Speak with our pharmacists about a new prescription, transfer an existing one, or book a wellness consultation.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
            {/* Info card */}
            <aside className="rounded-3xl bg-primary p-10 text-primary-foreground shadow-luxe">
              <SectionHeading
                invert
                eyebrow="Visit"
                title="BioBlend Pharmacy"
              />
              <ul className="mt-8 space-y-5 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 text-[color:var(--brand-gold)]" />
                  <div>
                    <p className="font-medium text-primary-foreground">Dubai, United Arab Emirates</p>
                    <p className="mt-1 text-primary-foreground/70">Ground floor, next to Art House</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-5 w-5 text-[color:var(--brand-gold)]" />
                  <a href="tel:+97143277355" className="hover:text-[color:var(--brand-gold)]">+971 4 3277355</a>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-5 w-5 text-[color:var(--brand-gold)]" />
                  <a href="mailto:hello@bioblendpharmacy.ae" className="hover:text-[color:var(--brand-gold)]">hello@bioblendpharmacy.ae</a>
                </li>
                <li className="flex items-start gap-3">
                  <Globe className="mt-0.5 h-5 w-5 text-[color:var(--brand-gold)]" />
                  <span>bioblendpharmacy.ae</span>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-5 w-5 text-[color:var(--brand-gold)]" />
                  <div>
                    <p>Sat – Thu · 9:00 – 22:00</p>
                    <p className="text-primary-foreground/70">Friday · 14:00 – 22:00</p>
                  </div>
                </li>
              </ul>

              <div className="mt-10 flex gap-3">
                <Button asChild className="flex-1 rounded-full bg-[color:var(--brand-gold)] text-primary hover:bg-[color:var(--brand-gold)]/90">
                  <a href="tel:+97143277355"><Phone className="mr-2 h-4 w-4" /> Call</a>
                </Button>
                <Button asChild variant="outline" className="flex-1 rounded-full border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10">
                  <a href="https://wa.me/97143277355" target="_blank" rel="noreferrer">
                    <MessageCircle className="mr-2 h-4 w-4" /> WhatsApp
                  </a>
                </Button>
              </div>

              <p className="mt-10 border-t border-primary-foreground/15 pt-6 text-right text-xs tracking-[0.3em] text-primary-foreground/60 uppercase" dir="rtl" lang="ar">
                صيدلية بيو بليند للتحضير الدوائي
              </p>
            </aside>

            {/* Form */}
            <form onSubmit={onSubmit} className="rounded-3xl border border-border/60 bg-card p-10 shadow-soft">
              <h2 className="font-serif text-3xl text-primary">Send us a note</h2>
              <div className="mt-2 gold-rule" />
              <p className="mt-4 text-sm text-muted-foreground">
                We reply within one business day. For urgent prescriptions, please call.
              </p>

              <div className="mt-8 grid gap-5 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" name="name" required placeholder="Your full name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" name="phone" type="tel" placeholder="+971 …" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" required placeholder="you@example.com" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="subject">Area of interest</Label>
                  <Input id="subject" name="subject" placeholder="e.g. Hormone Replacement, Pediatric, Skincare" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" name="message" required rows={5} placeholder="Tell us a little about what you're looking for…" />
                </div>
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={submitting}
                className="mt-8 w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {submitting ? "Sending…" : "Send message"}
              </Button>
              <p className="mt-4 text-center text-xs text-muted-foreground">
                By submitting, you agree to be contacted by BioBlend Pharmacy about your inquiry.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* MAP */}
      <section className="bg-secondary/60">
        <div className="mx-auto max-w-7xl px-6 pb-24 lg:px-10">
          <div className="overflow-hidden rounded-3xl border border-border/60 shadow-soft">
            <iframe
              title="BioBlend Compounding Pharmacy — Dubai"
              src="https://www.google.com/maps?q=Dubai%20United%20Arab%20Emirates&output=embed"
              width="100%"
              height="420"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block w-full"
            />
          </div>
        </div>
      </section>
    </>
  );
}
