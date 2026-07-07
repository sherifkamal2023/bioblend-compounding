import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { CardTile } from "@/components/CardTile";
import type { TileKey } from "@/lib/tiles";
import { useIsAr } from "@/lib/useIsAr";

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
      {
        property: "og:description",
        content: "Custom compounding for hormones, dermatology, pediatrics, wellness and more.",
      },
      { property: "og:url", content: "https://bioblendpharmacy.com/services" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://bioblendpharmacy.com/services" }],
  }),
  component: ServicesPage,
});

type ServiceItem = { tile: TileKey; title: string; body: string; slug?: string };

const servicesEn: ServiceItem[] = [
  {
    tile: "hormone",
    title: "Hormone Replacement Therapy",
    body: "Bio-identical estrogen, progesterone, testosterone and thyroid formulations dosed to your labs.",
    slug: "hormone",
  },
  {
    tile: "dermatology",
    title: "Dermatology & Anti-Aging",
    body: "Prescription-strength retinoids, tranexamic acid, custom peels and personalized skin protocols.",
    slug: "dermatology",
  },
  {
    tile: "pediatric",
    title: "Pediatric Compounding",
    body: "Alcohol-free, sugar-free, dye-free suspensions in flavors children actually take.",
    slug: "pediatric",
  },
  {
    tile: "wellnessIv",
    title: "IV & Wellness Therapy",
    body: "NAD+, vitamin and hydration infusions supervised by our clinical team.",
    slug: "wellness-iv",
  },
  {
    tile: "petWellness",
    title: "Your Pet's Wellness Matters",
    body: "Your pet's wellness is part of yours. Species-appropriate, palatable formulations — transdermal cats, flavored canine treats — with medical-grade attention to safe handling and zoonotic-disease prevention for the whole household.",
    slug: "pet-wellness",
  },
  {
    tile: "pain",
    title: "Pain Management",
    body: "Topical and transdermal analgesic combinations that avoid systemic side effects.",
  },
  {
    tile: "sterile",
    title: "Sterile Preparations",
    body: "USP <797> compliant sterile compounding for injectables and ophthalmics.",
  },
  {
    tile: "nutraceutical",
    title: "Nutraceutical Blends",
    body: "Physician-guided vitamin, mineral and adaptogen formulations.",
  },
  {
    tile: "longevity",
    title: "Longevity Protocols",
    body: "Peptides, senolytics and precision-medicine formulations for healthy aging.",
  },
  {
    tile: "weight",
    title: "Weight & Metabolic",
    body: "GLP-1 support programs, metabolic panels and individualized protocols.",
  },
];

const servicesAr: ServiceItem[] = [
  {
    tile: "hormone",
    title: "علاج تعويض الهرمونات",
    body: "هرمونات طبيعية مطابقة (إستروجين، بروجستيرون، تستوستيرون، الغدة الدرقية) بجرعات مضبوطة على نتائج تحاليلك.",
    slug: "hormone",
  },
  {
    tile: "dermatology",
    title: "الأمراض الجلدية ومكافحة الشيخوخة",
    body: "ريتينويدات بتركيز طبي، حمض الترانيكساميك، تقشيرات مخصّصة، وبروتوكولات عناية بالبشرة مصمّمة لك.",
    slug: "dermatology",
  },
  {
    tile: "pediatric",
    title: "تركيبات الأطفال",
    body: "شرابات دوائية خالية من الكحول والسكر والملوّنات، بنكهات يحبّها الأطفال ويقبلونها بسهولة.",
    slug: "pediatric",
  },
  {
    tile: "wellnessIv",
    title: "المغذّيات الوريدية والعافية",
    body: "جلسات وريدية للـ NAD+، الغلوتاثيون، الفيتامينات والترطيب تحت إشراف فريقنا الطبي.",
    slug: "wellness-iv",
  },
  {
    tile: "petWellness",
    title: "صحّة حيوانك الأليف تهمّنا",
    body: "عافية حيوانك جزء من عافيتك. نُحضّر تركيبات آمنة ومقبولة الطعم — لصقات للقطط، مكافآت بنكهات للكلاب — مع أعلى معايير السلامة ومنع انتقال الأمراض داخل المنزل.",
    slug: "pet-wellness",
  },
  {
    tile: "pain",
    title: "إدارة الألم",
    body: "مسكّنات موضعية ولصقات جلدية تُخفّف الألم دون آثار جانبية على باقي الجسم.",
  },
  {
    tile: "sterile",
    title: "التحضيرات المعقّمة",
    body: "تركيبات معقّمة للحقن وقطرات العيون وفق معايير USP <797>.",
  },
  {
    tile: "nutraceutical",
    title: "مزائج المكمّلات الغذائية",
    body: "فيتامينات ومعادن وأعشاب مكيّفة، بإشراف طبي وبتركيبات مصمّمة لاحتياجك.",
  },
  {
    tile: "longevity",
    title: "بروتوكولات طول العمر",
    body: "ببتيدات وتركيبات طب دقيق تدعم الشيخوخة الصحية والحيوية على المدى الطويل.",
  },
  {
    tile: "weight",
    title: "الوزن والصحّة الأيضية",
    body: "برامج دعم GLP-1، فحوصات أيضية، وبروتوكولات فردية لإدارة الوزن.",
  },
];

const stepsEn = [
  { n: "01", title: "Consult", body: "Schedule a call or in-person visit with our pharmacists." },
  {
    n: "02",
    title: "Formulate",
    body: "We work with your physician on the ideal ingredients and dose.",
  },
  { n: "03", title: "Compound", body: "Prepared in our Dubai lab under strict quality controls." },
  { n: "04", title: "Deliver", body: "Discreet delivery across the UAE with follow-up support." },
];

const stepsAr = [
  { n: "٠١", title: "الاستشارة", body: "احجز مكالمة أو زيارة مباشرة مع فريق الصيادلة عندنا." },
  {
    n: "٠٢",
    title: "التصميم",
    body: "نتعاون مع طبيبك لاختيار المكوّنات والجرعة المناسبة تماماً لحالتك.",
  },
  {
    n: "٠٣",
    title: "التحضير",
    body: "نُحضّر التركيبة في مختبرنا بدبي وفق أعلى معايير الجودة والدقّة.",
  },
  {
    n: "٠٤",
    title: "التوصيل",
    body: "توصيل بسريّة تامّة في جميع أنحاء الإمارات، مع متابعة مستمرّة معك.",
  },
];

const faqsEn = [
  {
    q: "What is compounding?",
    a: "Compounding is the art and science of preparing customized medications. Instead of a mass-produced pill, you get a formulation tailored to your dose, delivery form, and even flavor.",
  },
  {
    q: "Do I need a prescription?",
    a: "Yes. Compounded medications require a prescription from a licensed physician. We can also liaise with your doctor to design the right formulation.",
  },
  {
    q: "Are your ingredients regulated?",
    a: "All our raw materials are pharmaceutical grade, sourced from FDA-registered suppliers, and independently tested for identity, potency and purity.",
  },
  {
    q: "Do you deliver across the UAE?",
    a: "Yes — we offer discreet, temperature-controlled delivery across the Emirates and can arrange international shipping where legally permitted.",
  },
];

const faqsAr = [
  {
    q: "ما هي التركيبات الدوائية؟",
    a: "التركيب الدوائي هو تحضير دواء خاص بك تماماً بدلاً من الدواء الجاهز في الصيدلية. نُصمّم لك الجرعة والشكل الدوائي، وحتى النكهة، بحيث تناسب جسمك واحتياجك.",
  },
  {
    q: "هل أحتاج إلى وصفة طبية؟",
    a: "نعم، الأدوية المُركّبة تحتاج وصفة من طبيب مرخّص. ويمكننا أيضاً التواصل مع طبيبك لاختيار التركيبة الأنسب لك.",
  },
  {
    q: "هل موادّكم مرخّصة ومضمونة؟",
    a: "جميع موادّنا الخام صيدلانية النقاء، من موردين مسجّلين لدى FDA، ونفحصها بشكل مستقلّ للتأكد من الهوية والفاعلية والنقاوة.",
  },
  {
    q: "هل توصّلون داخل الإمارات؟",
    a: "نعم، نوفّر توصيلاً بسريّة تامّة وبدرجة حرارة مضبوطة داخل جميع الإمارات، ونرتّب الشحن الدولي حيث يسمح القانون.",
  },
];

function ServicesPage() {
  const ar = useIsAr();
  const services = ar ? servicesAr : servicesEn;
  const steps = ar ? stepsAr : stepsEn;
  const faqs = ar ? faqsAr : faqsEn;

  return (
    <>
      <section className="bg-secondary/60 pt-36 pb-20">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-10">
          <p className="eyebrow">{ar ? "خدماتنا" : "Services"}</p>
          <h1 className="mt-4 font-serif text-5xl leading-[1.05] text-primary md:text-6xl">
            {ar ? (
              <>
                تركيبات دقيقة لـ{" "}
                <em className="italic text-[color:var(--brand-gold)]">كل وصفة طبية</em>
              </>
            ) : (
              <>
                Precision compounding for{" "}
                <em className="italic text-[color:var(--brand-gold)]">every prescription</em>
              </>
            )}
          </h1>
          <div className="mx-auto mt-6 gold-rule" />
          <p className="mx-auto mt-8 max-w-2xl text-lg text-muted-foreground">
            {ar
              ? "من تعديل الهرمونات إلى نكهات أدوية الأطفال والحقن المعقّمة، كل تركيبة في بايوبلند نُحضّرها بأيدينا، لمريض واحد في كل مرة."
              : "From hormone optimization to pediatric flavors and sterile injectables, every formulation at BioBlend is prepared by hand, one patient at a time."}
          </p>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => {
              const inner = (
                <>
                  <CardTile tile={s.tile} alt={s.title} size="md" />
                  <h3 className="mt-5 font-serif text-xl text-primary">{s.title}</h3>
                  <p className="mt-2 flex-1 text-sm text-muted-foreground">{s.body}</p>
                  <div className="mt-6 h-px w-full bg-gradient-to-r from-[color:var(--brand-gold)]/50 to-transparent" />
                  {s.slug && (
                    <span className="mt-4 inline-flex items-center gap-1 text-[0.68rem] font-medium tracking-[0.24em] text-[color:var(--brand-gold)] uppercase">
                      {ar ? "اعرف المزيد ←" : "Learn more →"}
                    </span>
                  )}
                </>
              );
              const classes = "card-luxe group relative flex h-full flex-col rounded-2xl p-8";
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

      <section className="bg-secondary/60">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <SectionHeading
            align="center"
            eyebrow={ar ? "كيف نعمل" : "Our Process"}
            title={
              ar ? (
                <>
                  مسار هادئ ومدروس نحو{" "}
                  <em className="italic text-[color:var(--brand-gold)]">تركيبتك الخاصة</em>
                </>
              ) : (
                <>
                  A quiet, careful path to{" "}
                  <em className="italic text-[color:var(--brand-gold)]">your formulation</em>
                </>
              )
            }
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

      <section className="bg-background">
        <div className="mx-auto max-w-3xl px-6 py-24 lg:px-10">
          <SectionHeading
            align="center"
            eyebrow={ar ? "الأسئلة الشائعة" : "Frequently Asked"}
            title={ar ? "أسئلة يسألها معظم عملائنا" : "Questions we hear often"}
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
            <Button
              asChild
              size="lg"
              className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Link to="/contact">{ar ? "استشر صيادلتنا" : "Ask our pharmacists"}</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
