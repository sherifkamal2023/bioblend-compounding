import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Globe, ChevronDown } from "lucide-react";
import { SUPPORTED_LANGS, applyLangDir } from "@/lib/i18n";

export function LangSwitcher({ tone = "light" }: { tone?: "light" | "dark" }) {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const current = SUPPORTED_LANGS.find((l) => l.code === i18n.language) ?? SUPPORTED_LANGS[0];

  useEffect(() => {
    applyLangDir(i18n.language);
  }, [i18n.language]);

  const buttonClass =
    tone === "light" ? "nav-gold-shimmer" : "text-foreground/80 hover:text-primary";

  return (
    <div className="relative" onMouseLeave={() => setOpen(false)}>
      <button
        onClick={() => setOpen((v) => !v)}
        onMouseEnter={() => setOpen(true)}
        className={`inline-flex items-center gap-1 text-sm font-semibold tracking-wide transition-colors ${buttonClass}`}
        aria-label="Change language"
      >
        <Globe className="h-4 w-4" />
        <span>{current.code.toUpperCase()}</span>
        <ChevronDown className="h-3 w-3" />
      </button>
      {open && (
        <div className="absolute right-0 top-full pt-3">
          <div className="w-40 rounded-2xl border border-border/60 bg-background/98 p-2 shadow-luxe backdrop-blur-xl">
            {SUPPORTED_LANGS.map((l) => (
              <button
                key={l.code}
                onClick={() => {
                  i18n.changeLanguage(l.code);
                  applyLangDir(l.code);
                  setOpen(false);
                }}
                className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm transition-colors hover:bg-secondary ${
                  l.code === current.code ? "text-primary font-medium" : "text-foreground/80"
                }`}
              >
                <span>{l.label}</span>
                <span className="text-xs text-muted-foreground">{l.code.toUpperCase()}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
