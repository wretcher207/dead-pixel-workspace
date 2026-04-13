interface BadgeProps {
  children: React.ReactNode;
  variant?: "accent" | "pink" | "blue" | "default";
  className?: string;
}

const variants = {
  accent: "bg-clay-accent/10 text-clay-accent",
  pink: "bg-clay-accent-alt/10 text-clay-accent-alt",
  blue: "bg-clay-tertiary/10 text-clay-tertiary",
  default: "bg-white/60 text-clay-foreground",
};

export default function Badge({ children, variant = "accent", className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-block rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest ${variants[variant]} ${className}`}
      style={{ fontFamily: "var(--font-nunito), sans-serif" }}
    >
      {children}
    </span>
  );
}
