interface BrandMarkProps {
  className?: string;
  size?: number;
}

export default function BrandMark({ className = "", size = 48 }: BrandMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Coffee cup body */}
      <path
        d="M14 24 L14 44 C14 50 20 54 32 54 C44 54 50 50 50 44 L50 24 Z"
        fill="currentColor"
        opacity="0.6"
      />
      {/* Cup rim */}
      <ellipse cx="32" cy="24" rx="18" ry="4" fill="currentColor" opacity="0.7" />
      {/* Handle */}
      <path
        d="M50 30 C56 30 58 34 58 38 C58 42 56 46 50 46"
        stroke="currentColor"
        strokeWidth="3"
        fill="none"
        opacity="0.5"
        strokeLinecap="round"
      />
      {/* Steam wisps */}
      <path
        d="M24 18 C24 14 28 14 28 10"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        opacity="0.4"
        strokeLinecap="round"
      />
      <path
        d="M32 16 C32 12 36 12 36 8"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        opacity="0.4"
        strokeLinecap="round"
      />
      <path
        d="M40 18 C40 14 44 14 44 10"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        opacity="0.4"
        strokeLinecap="round"
      />
    </svg>
  );
}
