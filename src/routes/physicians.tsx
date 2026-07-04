import { createFileRoute, Link } from "@tanstack/react-router";
import { Stethoscope, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { CardTile } from "@/components/CardTile";
import { tiles, type TileKey } from "@/lib/tiles";
import { useIsAr } from "@/lib/useIsAr";

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

type Pillar = { tile: TileKey; title: string; body: string };

const pillarsEn: Pillar[] = [
  { tile: "nutraceutical", title: "Bespoke formulary", body: "Micro-doses, delivery-form conversions, allergen-free bases, taste-masking — we co-design with you." },
  { tile: "sterile", title: "DHA-licensed & audited", body: "USP <795> non-sterile and USP <797> sterile compliance. Full batch documentation on request." },
  { tile: "partnership", title: "Direct pharmacist line", body: "A named pharmacist for your practice — no call centre. WhatsApp, phone, email — response inside the hour." },
  { tile: "hormone", title: "Digital Rx workflow", body: "Send prescriptions by secure link. Refill tracking and adherence notes flow back to your patient chart." },
];

const pillarsAr: Pillar[] = [
  { tile: "nutraceutical", title: "تركيبات مصمّمة حسب طلبك", body: "جرعات دقيقة، تحويل بين الأشكال الدوائية، قواعد خالية من المسبّبات، وإخفاء الطعم — نصمّمها معك خطوة بخطوة." },
  { tile: "sterile", title: "مرخّصون من DHA ومدقّقون", body: "التزام كامل بمعايير USP <795> غير المعقّمة و USP <797> المعقّمة، مع توفير كامل توثيق الدُفعات عند الطلب." },
  { tile: "partnership", title: "خط مباشر مع صيدلي مخصّص", body: "صيدلي معيّن لعيادتك بالاسم — لا مركز اتصال. رد على واتساب أو الهاتف أو البريد خلال أقل من ساعة." },
  { tile: "hormone", title: "نظام وصفات رقمي", body: "أرسل وصفاتك عبر رابط آمن. نُعيد لك ملاحظات الالتزام وإعادة الصرف مباشرة إلى ملف مريضك." },
];

const workflowEn = [
  { n: "01", title: "Onboard", body: "One 30-minute call with our lead pharmacist to map your commonly-prescribed formulations." },
  { n: "02", title: "Prescribe", body: "Send Rx via secure link, encrypted email, or e-prescription network." },
  { n: "03", title: "Compound", body: "Prepared in-lab within 24-72h depending on formulation." },
  { n: "04", title: "Deliver & follow-up", body: "Discreet delivery to your patient. Adherence and refill notes shared back." },
];

const workflowAr = [
  { n: "٠١", title: "الانضمام", body: "مكالمة واحدة 30 دقيقة مع كبير الصيادلة عندنا لحصر الوصفات التي تكتبها بشكل متكرّر." },
  { n: "٠٢", title: "إرسال الوصفة", body: "أرسل الوصفة عبر رابط آمن، أو بريد مشفّر، أو منظومة الوصفات الإلكترونية." },
  { n: "٠٣", title: "التحضير", body: "نُحضّرها في مختبرنا خلال 24 إلى 72 ساعة حسب نوع التركيبة." },
  { n: "٠٤", title: "التوصيل والمتابعة", body: "توصيل بسريّة تامّة لمريضك، مع مشاركة ملاحظات الالتزام وإعادة الصرف معك." },
];

const specialtiesEn = [
  "Endocrinology & HRT", "Dermatology", "Pediatrics", "Functional & longevity medicine",
  "Pain management", "Women's health", "Sports medicine", "Integrative & wellness clinics",
];

const specialtiesAr = [
  "الغدد الصماء والهرمونات", "الأمراض الجلدية", "طب الأطفال", "الطب الوظيفي وطول العمر",
  "علاج الألم", "صحة المرأة", "الطب الرياضي", "عيادات الطب التكاملي والعافية",
];

function PhysiciansPage() {
  const ar = useIsAr();
  const pillars = ar ? pillarsAr : pillarsEn;
  const workflow = ar ? workflowAr : workflowEn;
  const specialties = ar ? specialtiesAr : specialtiesEn;

  return (
    <>
      <section className="relative overflow-hidden bg-primary pt-36 pb-20 text-primary-foreground">
        <div className="absolute inset-0 -z-10" aria-hidden="true">
          <img src={tiles.labWide} alt="" className="h-full w-full object-cover opacity-25 mix-blend-luminosity" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/85 to-primary/40" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,var(--brand-gold),transparent_55%)] opacity-[0.15]" />
        </div>
        <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:px-10">
          <Reveal>
            <p className="eyebrow text-[color:var(--brand-gold)]">{ar ? "للأطباء" : "For Physicians"}</p>
            <h1 className="mt-6 font-serif text-5xl leading-[1.02] md:text-6xl">
              {ar ? (
                <>صيدلية <em className="italic text-[color:var(--brand-gold)]">تُكمّل</em> عيادتك.</>
              ) : (
                <>A pharmacy that <em className="italic text-[color:var(--brand-gold)]">extends</em> your practice.</>
              )}
            </h1>
            <div className="mt-6 gold-rule" />
            <p className="mt-8 max-w-xl text-lg text-primary-foreground/80">
              {ar
                ? "بايوبلند شريك التركيب الدوائي للأطباء الذين يصفون وصفات خارج الجاهز — جرعات دقيقة، قواعد محدّدة، استثناء المسبّبات، ومرونة في الأشكال الدوائية. نحن نتولّى دقّة التحضير لتبقى أنت مركّزاً على خطّة العلاج."
                : "BioBlend is the compounding partner for physicians who prescribe outside the shelf — exact doses, exact bases, allergen exclusions, delivery-form flexibility. We handle the compounding rigour so you can focus on the plan."}
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button asChild size="lg" className="rounded-full bg-[color:var(--brand-gold)] px-8 text-primary hover:bg-[color:var(--brand-gold)]/90">
                <Link to="/contact">{ar ? "ابدأ الشراكة" : "Start a partnership"}</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full border-primary-foreground/30 bg-transparent px-8 text-primary-foreground hover:bg-primary-foreground/10">
                <a href="tel:+97143277355">{ar ? "تحدّث مع كبير الصيادلة" : "Speak to lead pharmacist"} <ArrowRight className="ml-2 h-4 w-4 rtl:rotate-180" /></a>
              </Button>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative hidden lg:block">
              <div className="gold-frame overflow-hidden rounded-3xl">
                <img src={tiles.partnership} alt={ar ? "صيدلي بايوبلند يتشاور مع طبيب" : "BioBlend pharmacist consulting with a physician"} className="aspect-[4/5] w-full rounded-[calc(1.5rem-3px)] object-cover" />
              </div>
              <div className="absolute -bottom-6 -left-6 hidden rounded-2xl bg-[color:var(--brand-gold)] px-5 py-4 text-primary shadow-luxe md:block">
                <p className="font-serif text-lg leading-tight">{ar ? "صيدلي مخصّص" : "Named pharmacist"}</p>
                <p className="text-[0.65rem] tracking-[0.24em] uppercase opacity-80">{ar ? "لعيادتك" : "for your practice"}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <Reveal>
            <SectionHeading
              eyebrow={ar ? "لماذا يختارنا الأطباء" : "Why physicians choose BioBlend"}
              title={ar ? (
                <>دقّة، <em className="italic text-[color:var(--brand-gold)]">مسؤولية</em>، وخطّ مباشر معك.</>
              ) : (
                <>Precision, <em className="italic text-[color:var(--brand-gold)]">accountability</em>, and a direct line.</>
              )}
              description={ar
                ? "لا تركيب مجهول المصدر. كل دفعة موثّقة، وكل تركيبة يراجعها صيدلي معيّن باسمه لعيادتك."
                : "No black-box compounding. Every batch is documented, every formulation reviewed by a named pharmacist assigned to your practice."}
            />
          </Reveal>
          <div className="mt-16 grid gap-6 md:grid-cols-2">
            {pillars.map((p, i) => (
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

      <section className="bg-secondary/60">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <Reveal>
            <SectionHeading eyebrow={ar ? "سير العمل" : "The workflow"} align="center" title={ar ? (
              <>من الوصفة إلى <em className="italic text-[color:var(--brand-gold)]">المريض</em></>
            ) : (
              <>From prescription to <em className="italic text-[color:var(--brand-gold)]">patient</em></>
            )} />
          </Reveal>
          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {workflow.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.06}>
                <div className="card-luxe rounded-2xl p-8">
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
            <SectionHeading eyebrow={ar ? "التخصّصات التي ندعمها" : "Specialties we support"} title={ar ? (
              <>تركيبات <em className="italic text-[color:var(--brand-gold)]">متعدّدة التخصّصات</em></>
            ) : (
              <>Cross-disciplinary <em className="italic text-[color:var(--brand-gold)]">compounding</em></>
            )} />
          </Reveal>
          <div className="mt-12 grid gap-3 sm:grid-cols-2 md:grid-cols-4">
            {specialties.map((s, i) => (
              <Reveal key={s} delay={i * 0.03}>
                <div className="flex items-center gap-3 rounded-xl border border-[color:var(--brand-gold)]/30 bg-[color:var(--brand-gold)]/8 p-4 transition-colors hover:bg-[color:var(--brand-gold)]/12">
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
              {ar ? (
                <>أرسل <em className="italic text-[color:var(--brand-gold)]">وصفتك القادمة</em> إلى بايوبلند.</>
              ) : (
                <>Bring your <em className="italic text-[color:var(--brand-gold)]">next prescription</em> to BioBlend.</>
              )}
            </h2>
            <div className="mx-auto mt-6 gold-rule" />
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="rounded-full bg-[color:var(--brand-gold)] px-8 text-primary hover:bg-[color:var(--brand-gold)]/90">
                <Link to="/contact">{ar ? "احجز مكالمة انضمام" : "Request onboarding call"}</Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
