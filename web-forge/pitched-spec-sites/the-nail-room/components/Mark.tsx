export function Mark({
  className = "",
  light = false,
}: {
  className?: string;
  light?: boolean;
}) {
  const stroke = light ? "rgba(246,244,239,0.92)" : "#14202f";
  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <svg
        viewBox="0 0 56 56"
        width="36"
        height="36"
        fill="none"
        aria-hidden="true"
      >
        <circle
          cx="28"
          cy="28"
          r="26"
          stroke={stroke}
          strokeWidth="0.8"
          opacity="0.65"
        />
        <path
          d="M28 7 C 28 20, 28 36, 28 49"
          stroke={stroke}
          strokeWidth="0.9"
          strokeLinecap="round"
        />
        <path
          d="M28 18 C 22 20, 17 24, 14 30"
          stroke={stroke}
          strokeWidth="0.9"
          strokeLinecap="round"
        />
        <path
          d="M28 18 C 34 20, 39 24, 42 30"
          stroke={stroke}
          strokeWidth="0.9"
          strokeLinecap="round"
        />
        <circle cx="14" cy="30" r="3.2" stroke={stroke} strokeWidth="0.9" />
        <circle cx="42" cy="30" r="3.2" stroke={stroke} strokeWidth="0.9" />
        <circle cx="28" cy="22" r="1.6" fill={stroke} />
      </svg>
      <span
        className={`font-display text-[1.35rem] tracking-tightest-2 leading-none ${
          light ? "text-porcelain" : "text-ink"
        }`}
        style={{ fontVariationSettings: "'SOFT' 100, 'opsz' 144" }}
      >
        The Nail Room
      </span>
    </div>
  );
}
