interface SectionHeaderProps {
  eyebrow: string;
  headline: string;
  centered?: boolean;
  className?: string;
}

export default function SectionHeader({ eyebrow, headline, centered, className = "" }: SectionHeaderProps) {
  return (
    <div className={`mb-12 ${centered ? "text-center" : ""} ${className}`}>
      <p className="text-neon text-xs tracking-[0.25em] uppercase mb-3">
        {eyebrow}
      </p>
      <h2
        className="text-5xl md:text-6xl text-text-primary leading-none"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {headline}
      </h2>
      <div
        className={`mt-4 h-px w-12 bg-neon/40 ${centered ? "mx-auto" : ""}`}
        style={{ boxShadow: "0 0 8px rgba(255,107,26,0.3)" }}
      />
    </div>
  );
}
