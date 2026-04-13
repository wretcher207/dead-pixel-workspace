type BadgeColor = "neon" | "amber" | "ember";

const styles: Record<BadgeColor, string> = {
  neon:  "bg-[rgba(255,107,26,0.15)] text-neon border border-[rgba(255,107,26,0.3)]",
  amber: "bg-[rgba(240,160,48,0.15)] text-amber border border-[rgba(240,160,48,0.3)]",
  ember: "bg-[rgba(192,57,43,0.15)] text-ember border border-[rgba(192,57,43,0.3)]",
};

export default function NeonBadge({ text, color = "neon" }: { text: string; color?: BadgeColor }) {
  return (
    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold tracking-wide uppercase ${styles[color]}`}>
      {text}
    </span>
  );
}
