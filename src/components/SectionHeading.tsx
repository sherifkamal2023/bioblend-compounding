import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  invert = false,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  invert?: boolean;
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2
        className={`mt-3 font-serif text-4xl leading-[1.05] md:text-5xl ${
          invert ? "text-primary-foreground" : "text-primary"
        }`}
      >
        {title}
      </h2>
      <div className={align === "center" ? "mx-auto mt-3 gold-rule" : "mt-3 gold-rule"} />
      {description && (
        <p
          className={`mt-6 text-base leading-relaxed ${
            invert ? "text-primary-foreground/75" : "text-muted-foreground"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
