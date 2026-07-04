import logoAsset from "@/assets/bioblend-logo.asset.json";

type LogoProps = {
  /** "dark" = logo on a light surface (default). "light" = logo on a dark surface — wrapped in an ivory chip for contrast. */
  variant?: "dark" | "light";
  /** No-op; the PNG already includes the wordmark. Kept for API stability. */
  showWordmark?: boolean;
  className?: string;
  /** Size preset. "sm" for footer, "md" default, "lg" for header. */
  size?: "sm" | "md" | "lg";
};

const sizeMap = {
  sm: "h-10",
  md: "h-12",
  lg: "h-16 md:h-20",
};

export function Logo({ variant = "dark", className, size = "md" }: LogoProps) {
  const img = (
    <span className="relative inline-flex items-center">
      {/* Golden leaf aura — pulses on mount, subtle idle glow after */}
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-3 rounded-full opacity-0 animate-leaf-bloom"
        style={{
          background:
            "radial-gradient(circle at 30% 40%, color-mix(in oklab, var(--brand-gold) 55%, transparent) 0%, transparent 65%)",
          filter: "blur(10px)",
        }}
      />
      {/* Gold shimmer sweep across the wordmark on mount */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden rounded-md"
      >
        <span className="absolute inset-y-0 -left-1/2 w-1/2 animate-leaf-sweep bg-gradient-to-r from-transparent via-[color:var(--brand-gold)]/40 to-transparent" />
      </span>
      <img
        src={logoAsset.url}
        alt="BioBlend Compounding Pharmacy"
        className={`relative ${sizeMap[size]} w-auto object-contain drop-shadow-[0_2px_8px_rgba(184,134,11,0.25)]`}
        loading="eager"
        decoding="async"
      />
    </span>
  );

  if (variant === "light") {
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
