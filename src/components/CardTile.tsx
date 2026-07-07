import { tiles, type TileKey } from "@/lib/tiles";

type Size = "sm" | "md" | "lg";

const sizeMap: Record<Size, string> = {
  sm: "h-14 w-14",
  md: "h-20 w-20",
  lg: "h-24 w-24",
};

/**
 * Circular gold-framed imagery tile used in place of lucide icons
 * across services / physicians / corporate / insights cards.
 */
export function CardTile({
  tile,
  alt,
  size = "md",
  className = "",
}: {
  tile: TileKey;
  alt: string;
  size?: Size;
  className?: string;
}) {
  return (
    <div className={`gold-frame shrink-0 ${sizeMap[size]} ${className}`}>
      <div className="h-full w-full overflow-hidden rounded-full bg-card">
        <img src={tiles[tile]} alt={alt} loading="lazy" className="h-full w-full object-cover" />
      </div>
    </div>
  );
}
