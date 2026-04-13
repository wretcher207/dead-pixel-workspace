type ChipProps = {
  children: React.ReactNode;
  tone?: "default" | "filled";
};

// Tone chips — squared rectangles with a whisper border.
// Caps-tracked Manrope label-sm. Never pill-shaped.
export function Chip({ children, tone = "default" }: ChipProps) {
  const base =
    "inline-flex items-center px-3 py-1.5 font-label text-[10px] uppercase tracking-[0.22em]";
  const styles =
    tone === "filled"
      ? "bg-surface-container-high text-on-surface"
      : "ghost-border text-on-surface-variant";
  return <span className={`${base} ${styles}`}>{children}</span>;
}
