import logoAsset from "@/assets/bioblend-logo.asset.json";

type LogoProps = {
  variant?: "dark" | "light";
  showWordmark?: boolean;
  className?: string;
};

export function Logo({ variant: _variant = "dark", showWordmark: _showWordmark = true, className }: LogoProps) {
  return (
    <div className={`inline-flex items-center ${className ?? ""}`}>
      <img
        src={logoAsset.url}
        alt="BioBlend Compounding Pharmacy"
        className="h-11 w-auto object-contain"
      />
    </div>
  );
}
