import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Phone, MapPin, Mail, Globe, Clock, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { SectionHeading } from "@/components/SectionHeading";
import { useIsAr } from "@/lib/useIsAr";

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
      { property: "og:url", content: "https://bioblendpharmacy.com/contact" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://bioblendpharmacy.com/contact" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Pharmacy",
          name: "BioBlend Compounding Pharmacy",
          image: "https://bioblendpharmacy.com/bioblend-favicon.png",
          telephone: "+971-4-3277355",
          email: "hello@bioblendpharmacy.com",
          url: "https://bioblendpharmacy.com/contact",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Dubai",
            addressCountry: "AE",
          },
          openingHoursSpecification: [
            {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
              opens: "09:00",
              closes: "22:00",
            },
            {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: "Friday",
              opens: "14:00",
              closes: "22:00",
            },
          ],
        }),
      },
    ],
  }),
  component: ContactPage,
});

type InquiryKind = "personal" | "corporate" | "clinician";

const copyEn: Record<InquiryKind, { heading: string; blurb: string; subjectPlaceholder: string }> = {
  personal: { heading: "Send us a note", blurb: "We reply within one business day. For urgent prescriptions, please call.", subjectPlaceholder: "e.g. Hormone Replacement, Pediatric, Skincare" },
  corporate: { heading: "Design a corporate program", blurb: "Tell us about your team and goals — we'll respond with a tailored program outline.", subjectPlaceholder: "Team size, industry, wellness goals" },
  clinician: { heading: "Physician & clinic partnerships", blurb: "For referrals and co-designed protocols. Our pharmacist team will reach out directly.", subjectPlaceholder: "Specialty, patient volume, formulations of interest" },
};

const copyAr: Record<InquiryKind, { heading: string; blurb: string; subjectPlaceholder: string }> = {
  personal: { heading: "أرسل لنا رسالتك", blurb: "نرد خلال يوم عمل واحد. للوصفات العاجلة، يُرجى الاتصال بنا مباشرة.", subjectPlaceholder: "مثال: تعويض الهرمونات، أدوية أطفال، عناية بالبشرة" },
  corporate: { heading: "صمّم برنامجاً لشركتك", blurb: "أخبرنا عن فريقك وأهدافك، وسنعود إليك بخطّة برنامج مفصّلة تناسبكم.", subjectPlaceholder: "حجم الفريق، القطاع، أهداف العافية" },
  clinician: { heading: "شراكات الأطباء والعيادات", blurb: "للإحالات وتصميم البروتوكولات المشتركة. سيتواصل فريق الصيادلة معك مباشرة.", subjectPlaceholder: "التخصّص، عدد المرضى، التركيبات المطلوبة" },
};

function ContactPage() {
  const ar = useIsAr();
  const [submitting, setSubmitting] = useState(false);
  const [inquiry, setInquiry] = useState<InquiryKind>("personal");
  const copy = ar ? copyAr : copyEn;

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      toast.success(ar ? "شكراً لك — سنتواصل معك خلال يوم عمل." : "Thank you — we'll be in touch within one business day.");
      (e.target as HTMLFormElement).reset();
      setSubmitting(false);
    }, 600);
  };

  const tabLabel = (k: InquiryKind) => {
    if (ar) return k === "personal" ? "فرد" : k === "corporate" ? "شركة" : "طبيب / عيادة";
    return k === "personal" ? "Personal" : k === "corporate" ? "Corporate" : "Clinician";
  };

  return (
    <>
      <section className="bg-secondary/60 pt-36 pb-16">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-10">
          <p className="eyebrow">{ar ? "تواصل معنا" : "Contact"}</p>
          <h1 className="mt-4 font-serif text-5xl leading-[1.05] text-primary md:text-6xl">
            {ar ? (
              <>لنُصمّم <em className="italic text-[color:var(--brand-gold)]">تركيبتك</em> معاً</>
            ) : (
              <>Let's design your <em className="italic text-[color:var(--brand-gold)]">blend</em></>
            )}
          </h1>
          <div className="mx-auto mt-6 gold-rule" />
          <p className="mx-auto mt-8 max-w-xl text-lg text-muted-foreground">
            {ar
              ? "تحدّث مع صيادلتنا لتحضير وصفة جديدة، أو نقل وصفة قائمة، أو حجز استشارة عافية."
              : "Speak with our pharmacists about a new prescription, transfer an existing one, or book a wellness consultation."}
          </p>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
            <aside className="rounded-3xl bg-primary p-10 text-primary-foreground shadow-luxe">
              <SectionHeading
                invert
                eyebrow={ar ? "زُرنا" : "Visit"}
                title={ar ? "صيدلية بايوبلند" : "BioBlend Pharmacy"}
              />
              <ul className="mt-8 space-y-5 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 text-[color:var(--brand-gold)]" />
                  <div>
                    <p className="font-medium text-primary-foreground">{ar ? "دبي، الإمارات العربية المتحدة" : "Dubai, United Arab Emirates"}</p>
                    <p className="mt-1 text-primary-foreground/70">{ar ? "الطابق الأرضي، بجانب Art House" : "Ground floor, next to Art House"}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-5 w-5 text-[color:var(--brand-gold)]" />
                  <a href="tel:+97143277355" dir="ltr" className="hover:text-[color:var(--brand-gold)]">+971 4 3277355</a>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-5 w-5 text-[color:var(--brand-gold)]" />
                  <a href="mailto:hello@bioblendpharmacy.com" dir="ltr" className="hover:text-[color:var(--brand-gold)]">hello@bioblendpharmacy.com</a>
                </li>
                <li className="flex items-start gap-3">
                  <Globe className="mt-0.5 h-5 w-5 text-[color:var(--brand-gold)]" />
                  <span dir="ltr">bioblendpharmacy.com</span>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-5 w-5 text-[color:var(--brand-gold)]" />
                  <div>
                    <p>{ar ? "السبت – الخميس · 9:00 – 22:00" : "Sat – Thu · 9:00 – 22:00"}</p>
                    <p className="text-primary-foreground/70">{ar ? "الجمعة · 14:00 – 22:00" : "Friday · 14:00 – 22:00"}</p>
                  </div>
                </li>
              </ul>

              <div className="mt-10 flex gap-3">
                <Button asChild className="flex-1 rounded-full bg-[color:var(--brand-gold)] text-primary hover:bg-[color:var(--brand-gold)]/90">
                  <a href="tel:+97143277355"><Phone className="mr-2 h-4 w-4" /> {ar ? "اتصل" : "Call"}</a>
                </Button>
                <Button asChild variant="outline" className="flex-1 rounded-full border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10">
                  <a href="https://wa.me/97143277355" target="_blank" rel="noreferrer">
                    <MessageCircle className="mr-2 h-4 w-4" /> {ar ? "واتساب" : "WhatsApp"}
                  </a>
                </Button>
              </div>

              <p className="mt-10 border-t border-primary-foreground/15 pt-6 text-right text-xs tracking-[0.3em] text-primary-foreground/60 uppercase" dir="rtl" lang="ar">
                صيدلية بايوبلند للتركيبات الدوائية
              </p>
            </aside>

            <form onSubmit={onSubmit} className="rounded-3xl border border-border/60 bg-card p-10 shadow-soft">
              <div className="flex flex-wrap gap-2" role="tablist" aria-label={ar ? "نوع الاستفسار" : "Inquiry type"}>
                {(["personal", "corporate", "clinician"] as const).map((k) => (
                  <button
                    key={k}
                    type="button"
                    role="tab"
                    aria-selected={inquiry === k}
                    onClick={() => setInquiry(k)}
                    className={`rounded-full border px-4 py-1.5 text-xs font-medium tracking-[0.18em] uppercase transition-colors ${
                      inquiry === k
                        ? "border-[color:var(--brand-gold)] bg-[color:var(--brand-gold)]/15 text-primary"
                        : "border-border/60 bg-transparent text-muted-foreground hover:text-primary"
                    }`}
                  >
                    {tabLabel(k)}
                  </button>
                ))}
              </div>

              <h2 className="mt-6 font-serif text-3xl text-primary">{copy[inquiry].heading}</h2>
              <div className="mt-2 gold-rule" />
              <p className="mt-4 text-sm text-muted-foreground">{copy[inquiry].blurb}</p>

              <div className="mt-8 grid gap-5 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">{inquiry === "personal" ? (ar ? "الاسم" : "Name") : (ar ? "اسم المسؤول" : "Contact name")}</Label>
                  <Input id="name" name="name" required placeholder={ar ? "اسمك الكامل" : "Your full name"} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">{ar ? "الهاتف" : "Phone"}</Label>
                  <Input id="phone" name="phone" type="tel" placeholder="+971 …" />
                </div>
                {inquiry !== "personal" && (
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="organization">{inquiry === "corporate" ? (ar ? "المؤسّسة" : "Organization") : (ar ? "العيادة / المستشفى" : "Clinic / Practice")}</Label>
                    <Input id="organization" name="organization" placeholder={inquiry === "corporate" ? (ar ? "اسم الشركة" : "Company name") : (ar ? "اسم العيادة أو المستشفى" : "Clinic or hospital name")} />
                  </div>
                )}
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="email">{ar ? "البريد الإلكتروني" : "Email"}</Label>
                  <Input id="email" name="email" type="email" required placeholder="you@example.com" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="subject">{ar ? "مجال الاهتمام" : "Area of interest"}</Label>
                  <Input id="subject" name="subject" placeholder={copy[inquiry].subjectPlaceholder} />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="message">{ar ? "رسالتك" : "Message"}</Label>
                  <Textarea id="message" name="message" required rows={5} placeholder={ar ? "أخبرنا قليلاً عمّا تبحث عنه…" : "Tell us a little about what you're looking for…"} />
                </div>
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={submitting}
                className="mt-8 w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {submitting ? (ar ? "جاري الإرسال…" : "Sending…") : (ar ? "إرسال الرسالة" : "Send message")}
              </Button>
              <p className="mt-4 text-center text-xs text-muted-foreground">
                {ar
                  ? "بإرسالك النموذج، فأنت توافق على أن تتواصل معك صيدلية بايوبلند بشأن استفسارك."
                  : "By submitting, you agree to be contacted by BioBlend Pharmacy about your inquiry."}
              </p>
            </form>
          </div>
        </div>
      </section>

      <section className="bg-secondary/60">
        <div className="mx-auto max-w-7xl px-6 pb-24 lg:px-10">
          <div className="overflow-hidden rounded-3xl border border-border/60 shadow-soft">
            <iframe
              title={ar ? "صيدلية بايوبلند للتركيبات الدوائية — دبي" : "BioBlend Compounding Pharmacy — Dubai"}
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
