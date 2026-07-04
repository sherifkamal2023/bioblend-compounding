import { Link } from "@tanstack/react-router";
import { Phone, MapPin, Globe, Mail, Instagram, Facebook } from "lucide-react";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <Logo variant="light" />
            <p className="mt-6 max-w-sm font-serif text-2xl italic text-primary-foreground/90">
              Your Health. <span className="text-[color:var(--brand-gold)]">Our Blend.</span>
            </p>
            <p className="mt-4 max-w-sm text-sm text-primary-foreground/70">
              A precision compounding pharmacy in Dubai crafting personalized formulations
              for wellness, longevity, and everyday care.
            </p>
            <p className="mt-6 text-xs tracking-[0.3em] text-primary-foreground/60 uppercase" dir="rtl" lang="ar">
              صيدلية بيو بليند للتحضير الدوائي
            </p>
          </div>

          <div>
            <h4 className="eyebrow">Explore</h4>
            <ul className="mt-4 space-y-3 text-sm text-primary-foreground/80">
              <li><Link to="/" className="hover:text-[color:var(--brand-gold)]">Home</Link></li>
              <li><Link to="/services" className="hover:text-[color:var(--brand-gold)]">Services</Link></li>
              <li><Link to="/about" className="hover:text-[color:var(--brand-gold)]">About</Link></li>
              <li><Link to="/insights" className="hover:text-[color:var(--brand-gold)]">Insights</Link></li>
              <li><Link to="/physicians" className="hover:text-[color:var(--brand-gold)]">For Physicians</Link></li>
              <li><Link to="/corporate" className="hover:text-[color:var(--brand-gold)]">Corporate Wellness</Link></li>
              <li><Link to="/contact" className="hover:text-[color:var(--brand-gold)]">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="eyebrow">Visit / Reach</h4>
            <ul className="mt-4 space-y-3 text-sm text-primary-foreground/80">
              <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 text-[color:var(--brand-gold)]" /> Dubai, UAE</li>
              <li className="flex items-start gap-2"><Phone className="mt-0.5 h-4 w-4 text-[color:var(--brand-gold)]" /> <a href="tel:+97143277355" className="hover:text-[color:var(--brand-gold)]">+971 4 3277355</a></li>
              <li className="flex items-start gap-2"><Globe className="mt-0.5 h-4 w-4 text-[color:var(--brand-gold)]" /> bioblendpharmacy.ae</li>
              <li className="flex items-start gap-2"><Mail className="mt-0.5 h-4 w-4 text-[color:var(--brand-gold)]" /> hello@bioblendpharmacy.ae</li>
            </ul>
            <div className="mt-5 flex gap-3">
              <a href="#" aria-label="Instagram" className="grid h-9 w-9 place-items-center rounded-full border border-primary-foreground/20 hover:border-[color:var(--brand-gold)] hover:text-[color:var(--brand-gold)]"><Instagram className="h-4 w-4" /></a>
              <a href="#" aria-label="Facebook" className="grid h-9 w-9 place-items-center rounded-full border border-primary-foreground/20 hover:border-[color:var(--brand-gold)] hover:text-[color:var(--brand-gold)]"><Facebook className="h-4 w-4" /></a>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-primary-foreground/15 pt-6 text-xs text-primary-foreground/60 md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} BioBlend Compounding Pharmacy LLC. All rights reserved.</p>
          <p>DHA licensed · Sterile compounding · Precision medicine</p>
        </div>
      </div>
    </footer>
  );
}
