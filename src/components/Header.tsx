import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Logo } from "./Logo";
import { Button } from "./ui/button";

const primary = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

const partners = [
  { to: "/physicians", label: "For Physicians", desc: "Prescribers & clinics" },
  { to: "/corporate", label: "Corporate Wellness", desc: "Teams & executives" },
  { to: "/insights", label: "Insights", desc: "Editorial from our lab" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [partnersOpen, setPartnersOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-border/60 bg-background/85 backdrop-blur-xl"
            : "bg-background/70 backdrop-blur-md md:bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-6 md:py-4 lg:px-10">
          <Link to="/" aria-label="BioBlend home" className="shrink-0">
            <Logo />
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {primary.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="text-sm text-foreground/75 transition-colors hover:text-primary"
                activeProps={{ className: "text-primary font-medium" }}
                activeOptions={{ exact: n.to === "/" }}
              >
                {n.label}
              </Link>
            ))}
            <div
              className="relative"
              onMouseEnter={() => setPartnersOpen(true)}
              onMouseLeave={() => setPartnersOpen(false)}
            >
              <button className="inline-flex items-center gap-1 text-sm text-foreground/75 transition-colors hover:text-primary">
                Partners <ChevronDown className="h-3 w-3" />
              </button>
              {partnersOpen && (
                <div className="absolute right-0 top-full pt-3">
                  <div className="w-72 rounded-2xl border border-border/60 bg-background/98 p-2 shadow-luxe backdrop-blur-xl">
                    {partners.map((p) => (
                      <Link
                        key={p.to}
                        to={p.to}
                        className="block rounded-xl px-4 py-3 hover:bg-secondary"
                      >
                        <p className="font-serif text-base text-primary">{p.label}</p>
                        <p className="mt-0.5 text-xs text-muted-foreground">{p.desc}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </nav>

          <div className="hidden md:block">
            <Button asChild size="sm" className="rounded-full bg-[color:var(--brand-gold)] px-5 text-primary hover:bg-[color:var(--brand-gold)]/90">
              <Link to="/contact">Book a Consultation</Link>
            </Button>
          </div>

          <button
            className="shrink-0 md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-6 w-6 text-primary" /> : <Menu className="h-6 w-6 text-primary" />}
          </button>
        </div>

        {open && (
          <div className="border-t border-border/60 bg-background/98 backdrop-blur-xl md:hidden">
            <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4">
              {primary.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-2 text-sm text-foreground/80 hover:bg-secondary"
                  activeProps={{ className: "text-primary font-medium bg-secondary" }}
                  activeOptions={{ exact: n.to === "/" }}
                >
                  {n.label}
                </Link>
              ))}
              <div className="my-2 h-px bg-border/60" />
              <p className="px-3 pb-1 text-[10px] font-medium tracking-[0.24em] text-muted-foreground uppercase">Partners</p>
              {partners.map((p) => (
                <Link
                  key={p.to}
                  to={p.to}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-2 text-sm text-foreground/80 hover:bg-secondary"
                >
                  {p.label}
                </Link>
              ))}
              <Button asChild className="mt-3 rounded-full bg-[color:var(--brand-gold)] text-primary hover:bg-[color:var(--brand-gold)]/90">
                <Link to="/contact" onClick={() => setOpen(false)}>Book a Consultation</Link>
              </Button>
            </div>
          </div>
        )}
      </header>

      {/* Mobile sticky CTA */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border/60 bg-background/95 px-4 py-3 backdrop-blur-xl md:hidden">
        <Button asChild className="w-full rounded-full bg-[color:var(--brand-gold)] text-primary hover:bg-[color:var(--brand-gold)]/90">
          <Link to="/contact">Book a Consultation</Link>
        </Button>
      </div>
    </>
  );
}
