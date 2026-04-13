export default function NeonDivider({ className = "" }: { className?: string }) {
  return (
    <div
      className={`h-px bg-neon/40 ${className}`}
      style={{ boxShadow: "0 0 8px rgba(255,107,26,0.3)" }}
    />
  );
}
