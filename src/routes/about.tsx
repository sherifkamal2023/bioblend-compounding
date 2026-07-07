import { createFileRoute, Link } from "@tanstack/react-router";
import { Award, Beaker, HeartHandshake, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/SectionHeading";
import pharmacistImg from "@/assets/pharmacist.jpg";
import wellnessImg from "@/assets/wellness-portrait.jpg";
import heroLab from "@/assets/hero-lab.jpg";
import { useIsAr } from "@/lib/useIsAr";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — BioBlend Compounding Pharmacy" },
      {
        name: "description",
        content:
          "Meet the pharmacists behind BioBlend — a Dubai compounding pharmacy built on precision, purity, personalization and partnership.",
      },
      { property: "og:title", content: "About BioBlend Compounding Pharmacy" },
      {
        property: "og:description",
        content: "The story, philosophy and team behind BioBlend Compounding Pharmacy in Dubai.",
      },
      { property: "og:url", content: "https://bioblendpharmacy.com/about" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://bioblendpharmacy.com/about" }],
  }),
  component: AboutPage,
});

const valuesEn = [
  {
    icon: Beaker,
    title: "Precision",
    body: "Milligram-accurate formulations, verified by in-process quality checks at every step.",
  },
  {
    icon: Sparkles,
    title: "Purity",
    body: "Pharmaceutical-grade ingredients, tested and traceable to their source.",
  },
  {
    icon: HeartHandshake,
    title: "Personalization",
    body: "One patient, one prescription — no shortcuts, no substitutions.",
  },
  {
    icon: Award,
    title: "Partnership",
    body: "Working shoulder to shoulder with prescribers, patients and families.",
  },
];

const valuesAr = [
  {
    icon: Beaker,
    title: "الدقّة",
    body: "تركيبات مضبوطة بالمليغرام، نتحقق من جودتها في كل خطوة أثناء التحضير.",
  },
  {
    icon: Sparkles,
    title: "النقاوة",
    body: "مكوّنات صيدلانية النقاء، مفحوصة وقابلة للتتبّع حتى مصدرها.",
  },
  {
    icon: HeartHandshake,
    title: "التخصيص",
    body: "لكل مريض وصفته الخاصة — بلا اختصارات ولا بدائل.",
  },
  { icon: Award, title: "الشراكة", body: "نعمل جنباً إلى جنب مع الأطباء والمرضى وعائلاتهم." },
];

const teamEn = [
  { img: pharmacistImg, name: "Dr. Karim Haddad", role: "Chief Compounding Pharmacist" },
  { img: wellnessImg, name: "Dr. Aisha Rahmani", role: "Clinical Wellness Lead" },
  { img: heroLab, name: "Sterile Lab", role: "USP <797> Compliant Suite" },
];

const teamAr = [
  { img: pharmacistImg, name: "د. كريم حداد", role: "رئيس صيادلة التركيبات" },
  { img: wellnessImg, name: "د. عائشة الرحماني", role: "مسؤولة العافية السريرية" },
  { img: heroLab, name: "المختبر المعقّم", role: "مطابق لمعايير USP <797>" },
];

function AboutPage() {
  const ar = useIsAr();
  const values = ar ? valuesAr : valuesEn;
  const team = ar ? teamAr : teamEn;

  return (
    <>
      <section className="bg-secondary/60 pt-36 pb-20">
        <div className="mx-auto grid max-w-7xl items-end gap-12 px-6 lg:grid-cols-2 lg:px-10">
          <div>
            <p className="eyebrow">{ar ? "عن بايوبلند" : "About BioBlend"}</p>
            <h1 className="mt-4 font-serif text-5xl leading-[1.05] text-primary md:text-6xl">
              {ar ? (
                <>
                  شغف هادئ <em className="italic text-[color:var(--brand-gold)]">بالتفاصيل</em>
                </>
              ) : (
                <>
                  A quiet obsession with{" "}
                  <em className="italic text-[color:var(--brand-gold)]">the details</em>
                </>
              )}
            </h1>
            <div className="mt-6 gold-rule" />
          </div>
          <p className="text-lg text-muted-foreground">
            {ar
              ? "تأسّست بايوبلند على قناعة بسيطة: الدواء يجب أن يُفصَّل ليناسب الإنسان، وليس العكس. في مختبرنا بدبي نُحضّر كل تركيبة بالطريقة التقليدية — بعناية وتركيز، ولمريض واحد في كل مرة."
              : "BioBlend was founded on a simple conviction: medicine should fit the person, not the other way around. In our Dubai lab we prepare each formulation the old-fashioned way — carefully, attentively, and one patient at a time."}
          </p>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 py-24 lg:grid-cols-2 lg:px-10">
          <div className="relative">
            <img
              src={heroLab}
              alt={
                ar
                  ? "زجاجات كهرمانية على رخام في مختبر بايوبلند"
                  : "Amber bottles on marble at BioBlend"
              }
              width={1600}
              height={1200}
              loading="lazy"
              className="w-full rounded-[2rem] object-cover shadow-luxe"
            />
            <div className="absolute -bottom-8 -right-8 hidden max-w-xs rounded-2xl bg-primary p-6 text-primary-foreground shadow-luxe md:block">
              <p className="font-serif text-2xl italic">
                {ar ? '"صحتك. مزيجنا."' : '"Your Health. Our Blend."'}
              </p>
              <p className="mt-2 text-xs tracking-widest text-[color:var(--brand-gold)] uppercase">
                {ar ? "فلسفة بايوبلند" : "BioBlend Philosophy"}
              </p>
            </div>
          </div>
          <div>
            <SectionHeading
              eyebrow={ar ? "قصتنا" : "Our Story"}
              title={
                ar ? (
                  <>
                    جذورنا في العلم، وقلبنا في{" "}
                    <em className="italic text-[color:var(--brand-gold)]">العناية بك</em>
                  </>
                ) : (
                  <>
                    Rooted in science, guided by{" "}
                    <em className="italic text-[color:var(--brand-gold)]">care</em>
                  </>
                )
              }
              description={
                ar
                  ? "أسّسها صيادلة تدرّبوا في أفضل مراكز التركيب في العالم، وعادوا إلى دبي ليفتحوا مختبراً تُحضَّر فيه كل وصفة يدوياً — لا نُعيد تعليب الأدوية أبداً. نخدم المرضى والأطباء والأطباء البيطريين وعيادات العافية في جميع أنحاء الإمارات."
                  : "Built by pharmacists who trained in the world's leading compounding programs and returned to Dubai to open a lab where every prescription is made — never repackaged. We serve patients, physicians, veterinarians and wellness clinicians across the UAE."
              }
            />
            <div className="mt-8 grid grid-cols-3 gap-6 border-t border-border/60 pt-8">
              <div>
                <p className="font-serif text-4xl text-primary">+10</p>
                <p className="mt-1 text-xs tracking-widest text-muted-foreground uppercase">
                  {ar ? "سنوات خبرة" : "Years experience"}
                </p>
              </div>
              <div>
                <p className="font-serif text-4xl text-primary">+5,000</p>
                <p className="mt-1 text-xs tracking-widest text-muted-foreground uppercase">
                  {ar ? "تركيبة دوائية" : "Formulations"}
                </p>
              </div>
              <div>
                <p className="font-serif text-4xl text-primary">DHA</p>
                <p className="mt-1 text-xs tracking-widest text-muted-foreground uppercase">
                  {ar ? "صيدلية مرخّصة" : "Licensed pharmacy"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-secondary/60">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <SectionHeading
            align="center"
            eyebrow={ar ? "قيمنا" : "Our Values"}
            title={
              ar ? (
                <>
                  أربعة مبادئ تحكم{" "}
                  <em className="italic text-[color:var(--brand-gold)]">كل وصفة</em>
                </>
              ) : (
                <>
                  Four principles that shape{" "}
                  <em className="italic text-[color:var(--brand-gold)]">every prescription</em>
                </>
              )
            }
          />
          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div
                key={v.title}
                className="rounded-2xl border border-border/60 bg-card p-8 shadow-soft"
              >
                <div className="grid h-12 w-12 place-items-center rounded-full bg-[color:var(--brand-gold)]/15">
                  <v.icon className="h-6 w-6 text-[color:var(--brand-teal)]" strokeWidth={1.5} />
                </div>
                <h3 className="mt-5 font-serif text-xl text-primary">{v.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <SectionHeading
            align="center"
            eyebrow={ar ? "فريقنا" : "Our Team"}
            title={
              ar ? (
                <>
                  الأشخاص وراء <em className="italic text-[color:var(--brand-gold)]">تركيبتك</em>
                </>
              ) : (
                <>
                  The people behind{" "}
                  <em className="italic text-[color:var(--brand-gold)]">your blend</em>
                </>
              )
            }
          />
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {team.map((m) => (
              <figure
                key={m.name}
                className="group relative overflow-hidden rounded-2xl border border-border/70 bg-card shadow-soft transition-all hover:-translate-y-1 hover:shadow-luxe hover:border-[color:var(--brand-gold)]/70"
              >
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[color:var(--brand-gold)] to-transparent"
                />
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={m.img}
                    alt={m.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <figcaption className="p-6 text-center">
                  <p className="font-serif text-xl text-primary">{m.name}</p>
                  <div className="mx-auto mt-2 gold-rule" />
                  <p className="mt-3 text-xs tracking-widest text-muted-foreground uppercase">
                    {m.role}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-4xl px-6 py-20 text-center lg:px-10">
          <h2 className="font-serif text-4xl md:text-5xl">
            {ar ? "زُرنا في دبي." : "Meet us in Dubai."}
          </h2>
          <div className="mx-auto mt-4 gold-rule" />
          <p className="mx-auto mt-6 max-w-xl text-primary-foreground/80">
            {ar
              ? "زُر مختبرنا للتركيب، وناقش أهدافك مع صيادلتنا، واخرج بخطّة عمل واضحة."
              : "Visit our compounding suite, walk through your goals with our pharmacists, and leave with a plan."}
          </p>
          <div className="mt-8">
            <Button
              asChild
              size="lg"
              className="rounded-full bg-[color:var(--brand-gold)] text-primary hover:bg-[color:var(--brand-gold)]/90"
            >
              <Link to="/contact">{ar ? "احجز زيارة" : "Book a Visit"}</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
