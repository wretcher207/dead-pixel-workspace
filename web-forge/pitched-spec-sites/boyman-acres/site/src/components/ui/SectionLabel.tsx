"use client";

interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
}

export default function SectionLabel({ children, className = "" }: SectionLabelProps) {
  return (
    <span
      className={`text-gold font-body uppercase tracking-[0.3em] text-[10px] mb-4 block ${className}`}
    >
      {children}
    </span>
  );
}
