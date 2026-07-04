type LogoProps = {
  variant?: "dark" | "light";
  showWordmark?: boolean;
  className?: string;
};

export function Logo({ variant = "dark", showWordmark = true, className }: LogoProps) {
  const wordmarkColor = variant === "light" ? "#F7F3EC" : "#0F2E3D";

  return (
    <div className={`inline-flex items-center gap-3 ${className ?? ""}`}>
      <svg
        viewBox="0 0 64 72"
        aria-hidden="true"
        className="h-9 w-auto"
        fill="none"
      >
        {/* Teal upper B */}
        <path
          d="M14 6 L14 40 Q14 52 26 52 L34 52"
          stroke="#1B7A8C"
          strokeWidth="4.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M14 6 L28 6 Q40 6 40 18 Q40 28 28 28 L14 28"
          stroke="#1B7A8C"
          strokeWidth="4.5"
          strokeLinejoin="round"
          fill="none"
        />
        {/* Red lower B */}
        <path
          d="M50 34 L50 66 M50 40 Q50 34 42 34 L34 34 M50 66 L36 66 Q26 66 26 56 Q26 46 36 46 L50 46"
          stroke="#C8323C"
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        {/* Gold leaf */}
        <path
          d="M32 30 Q26 34 28 42 Q36 40 36 32 Q36 30 32 30 Z"
          fill="#D4A94A"
        />
        <path d="M32 34 L30 40" stroke="#B8912F" strokeWidth="1" strokeLinecap="round" />
      </svg>
      {showWordmark && (
        <div className="flex flex-col leading-none">
          <span
            className="font-serif text-2xl tracking-tight"
            style={{ color: wordmarkColor }}
          >
            <span style={{ color: "#1B7A8C" }}>Bio</span>
            <span style={{ color: "#C8323C" }}>Blend</span>
          </span>
          <span
            className="mt-0.5 text-[9px] tracking-[0.28em] uppercase"
            style={{ color: variant === "light" ? "rgba(247,243,236,0.7)" : "#8A7A5C" }}
          >
            Compounding Pharmacy
          </span>
        </div>
      )}
    </div>
  );
}
