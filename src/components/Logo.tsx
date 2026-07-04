import logoAsset from "@/assets/bioblend-logo.asset.json";

type LogoProps = {
  /** "dark" = logo on a light surface (default). "light" = logo on a dark surface — wrapped in an ivory chip for contrast. */
  variant?: "dark" | "light";
  /** No-op; the PNG already includes the wordmark. Kept for API stability. */
  showWordmark?: boolean;
  className?: string;
};

export function Logo({ variant = "dark", className }: LogoProps) {
  const img = (
    <img
      src={logoAsset.url}
      alt="BioBlend Compounding Pharmacy"
      className="h-11 w-auto object-contain"
      loading="eager"
      decoding="async"
    />
  );

  if (variant === "light") {
    // Brand teal + red lose contrast on the navy footer. Best practice: neutral
    // chip behind the mark instead of recoloring the brand.
    return (
      <div
        className={`inline-flex items-center rounded-xl bg-[color:var(--brand-ivory)] px-4 py-2 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.35)] ring-1 ring-black/5 ${className ?? ""}`}
      >
        {img}
      </div>
    );
  }

  return <div className={`inline-flex items-center ${className ?? ""}`}>{img}</div>;
}
