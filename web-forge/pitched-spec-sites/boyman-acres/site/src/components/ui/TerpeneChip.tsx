"use client";

interface TerpeneChipProps {
  label: string;
}

export default function TerpeneChip({ label }: TerpeneChipProps) {
  return (
    <span className="bg-surface-highest px-3 py-1 rounded-full text-[10px] font-body uppercase tracking-widest text-sage">
      {label}
    </span>
  );
}
