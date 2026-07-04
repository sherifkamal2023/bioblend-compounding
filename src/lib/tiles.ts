import hormone from "@/assets/tiles/hormone.jpg";
import dermatology from "@/assets/tiles/dermatology.jpg";
import pediatric from "@/assets/tiles/pediatric.jpg";
import wellnessIv from "@/assets/tiles/wellness-iv.jpg";
import petWellness from "@/assets/tiles/pet-wellness.jpg";
import pain from "@/assets/tiles/pain.jpg";
import sterile from "@/assets/tiles/sterile.jpg";
import nutraceutical from "@/assets/tiles/nutraceutical.jpg";
import longevity from "@/assets/tiles/longevity.jpg";
import weight from "@/assets/tiles/weight.jpg";
import partnership from "@/assets/tiles/partnership.jpg";
import corporate from "@/assets/tiles/corporate.jpg";
import labWide from "@/assets/tiles/lab-wide.jpg";

export const tiles = {
  hormone,
  dermatology,
  pediatric,
  wellnessIv,
  petWellness,
  pain,
  sterile,
  nutraceutical,
  longevity,
  weight,
  partnership,
  corporate,
  labWide,
} as const;

export type TileKey = keyof typeof tiles;
