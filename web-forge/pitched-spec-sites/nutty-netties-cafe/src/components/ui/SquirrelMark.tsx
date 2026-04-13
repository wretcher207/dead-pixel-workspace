interface SquirrelMarkProps {
  className?: string;
  size?: number;
}

export default function SquirrelMark({ className = "", size = 48 }: SquirrelMarkProps) {
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
      {/* Simplified squirrel silhouette — hand-drawn feel */}
      <path
        d="M32 8 C28 8 22 10 20 16 C18 20 19 24 21 27 C19 28 16 30 15 34 C14 38 16 42 20 44 C20 48 18 52 16 56 L20 56 C21 52 22 48 24 46 C26 47 28 48 32 48 C36 48 38 47 40 46 C42 48 43 52 44 56 L48 56 C46 52 44 48 44 44 C48 42 50 38 49 34 C48 30 45 28 43 27 C45 24 46 20 44 16 C42 10 36 8 32 8Z"
        fill="currentColor"
        opacity="0.6"
      />
      {/* Tail */}
      <path
        d="M44 20 C50 16 56 18 56 24 C56 30 50 32 46 30 C50 28 52 24 50 22 C48 20 46 22 44 24"
        fill="currentColor"
        opacity="0.5"
      />
      {/* Eye */}
      <circle cx="27" cy="20" r="2" fill="currentColor" opacity="0.8" />
      {/* Ear */}
      <path d="M22 10 C20 6 24 4 26 8" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.6" />
    </svg>
  );
}
