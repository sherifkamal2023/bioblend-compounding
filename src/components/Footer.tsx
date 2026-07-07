import { Link } from "@tanstack/react-router";
import { Phone, MapPin, Globe, Mail, Instagram, Facebook } from "lucide-react";
import { Logo } from "./Logo";
import { useIsAr } from "@/lib/useIsAr";

export function Footer() {
  const ar = useIsAr();

  const t = {
    tagline: ar ? "صحتك." : "Your Health.",
    taglineAccent: ar ? "مزيجنا." : "Our Blend.",
    blurb: ar
      ? "صيدلية تركيبات دوائية دقيقة في دبي، نُحضّر لك علاجات مخصّصة للعافية، وطول العمر، والرعاية اليومية."
      : "A precision compounding pharmacy in Dubai crafting personalized formulations for wellness, longevity, and everyday care.",
    explore: ar ? "تصفّح الموقع" : "Explore",
    visitReach: ar ? "زُرنا · تواصل معنا" : "Visit / Reach",
    home: ar ? "الرئيسية" : "Home",
    services: ar ? "خدماتنا" : "Services",
    about: ar ? "من نحن" : "About",
    insights: ar ? "مقالات ونصائح" : "Insights",
    physicians: ar ? "للأطباء" : "For Physicians",
    corporate: ar ? "صحة الموظفين" : "Corporate Wellness",
    contact: ar ? "تواصل معنا" : "Contact",
    city: ar ? "دبي، الإمارات" : "Dubai, UAE",
    rights: ar
      ? `© ${new Date().getFullYear()} صيدلية بايوبلند للتركيبات الدوائية ذ.م.م. جميع الحقوق محفوظة.`
      : `© ${new Date().getFullYear()} BioBlend Compounding Pharmacy LLC. All rights reserved.`,
    licenseLine: ar
      ? "مرخّصة من هيئة الصحة بدبي · تركيبات معقّمة · طب دقيق"
      : "DHA licensed · Sterile compounding · Precision medicine",
  };

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <Logo variant="light" />
            <p className="mt-6 max-w-sm font-serif text-2xl italic text-primary-foreground/90">
              {t.tagline} <span className="text-[color:var(--brand-gold)]">{t.taglineAccent}</span>
            </p>
            <p className="mt-4 max-w-sm text-sm text-primary-foreground/70">{t.blurb}</p>
            {!ar && (
              <p
                className="mt-6 text-xs tracking-[0.3em] text-primary-foreground/60 uppercase"
                dir="rtl"
                lang="ar"
              >
                صيدلية بايوبلند للتركيبات الدوائية
              </p>
            )}
          </div>

          <div>
            <h4 className="eyebrow">{t.explore}</h4>
            <ul className="mt-4 space-y-3 text-sm text-primary-foreground/80">
              <li>
                <Link to="/" className="hover:text-[color:var(--brand-gold)]">
                  {t.home}
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-[color:var(--brand-gold)]">
                  {t.services}
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[color:var(--brand-gold)]">
                  {t.about}
                </Link>
              </li>
              <li>
                <Link to="/insights" className="hover:text-[color:var(--brand-gold)]">
                  {t.insights}
                </Link>
              </li>
              <li>
                <Link to="/physicians" className="hover:text-[color:var(--brand-gold)]">
                  {t.physicians}
                </Link>
              </li>
              <li>
                <Link to="/corporate" className="hover:text-[color:var(--brand-gold)]">
                  {t.corporate}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[color:var(--brand-gold)]">
                  {t.contact}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="eyebrow">{t.visitReach}</h4>
            <ul className="mt-4 space-y-3 text-sm text-primary-foreground/80">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 text-[color:var(--brand-gold)]" /> {t.city}
              </li>
              <li className="flex items-start gap-2">
                <Phone className="mt-0.5 h-4 w-4 text-[color:var(--brand-gold)]" />{" "}
                <a
                  href="tel:+97143277355"
                  className="hover:text-[color:var(--brand-gold)]"
                  dir="ltr"
                >
                  +971 4 3277355
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Globe className="mt-0.5 h-4 w-4 text-[color:var(--brand-gold)]" />{" "}
                <span dir="ltr">bioblendpharmacy.com</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="mt-0.5 h-4 w-4 text-[color:var(--brand-gold)]" />{" "}
                <span dir="ltr">hello@bioblendpharmacy.com</span>
              </li>
            </ul>
            <div className="mt-5 flex gap-3">
              <a
                href="#"
                aria-label="Instagram"
                className="grid h-9 w-9 place-items-center rounded-full border border-primary-foreground/20 hover:border-[color:var(--brand-gold)] hover:text-[color:var(--brand-gold)]"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="grid h-9 w-9 place-items-center rounded-full border border-primary-foreground/20 hover:border-[color:var(--brand-gold)] hover:text-[color:var(--brand-gold)]"
              >
                <Facebook className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-primary-foreground/15 pt-6 text-xs text-primary-foreground/60 md:flex-row md:items-center">
          <p>{t.rights}</p>
          <p>{t.licenseLine}</p>
        </div>
      </div>
    </footer>
  );
}
