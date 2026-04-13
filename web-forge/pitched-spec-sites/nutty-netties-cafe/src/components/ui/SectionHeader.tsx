"use client";

interface SectionHeaderProps {
  eyebrow: string;
  headline: string;
  light?: boolean;
  centered?: boolean;
}

export default function SectionHeader({
  eyebrow,
  headline,
  light = false,
  centered = true,
}: SectionHeaderProps) {
  const textColor = light ? "text-[#fdf8f0]" : "text-[#3d2e24]";
  const eyebrowColor = light ? "text-[#c9a96e]" : "text-[#8b5e3c]";
  const ruleColor = light ? "bg-[#c9a96e]/40" : "bg-[#c9a96e]";

  return (
    <div className={`mb-12 ${centered ? "text-center" : ""}`}>
      <p
        className={`font-accent text-base ${eyebrowColor} mb-2`}
        aria-hidden="true"
      >
        {eyebrow}
      </p>
      <h2
        className={`font-serif text-4xl md:text-5xl font-medium italic leading-tight ${textColor} mb-4`}
      >
        {headline}
      </h2>
      <div
        className={`${ruleColor} h-px ${centered ? "mx-auto" : ""} w-16`}
      />
    </div>
  );
}
