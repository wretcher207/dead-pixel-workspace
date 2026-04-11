// Hand-drawn-style botanical SVG ornaments. Drawn to echo the logo's
// line-art sprigs. Pure SVG so they scale cleanly and cost nothing to load.

type Props = {
  className?: string;
  "aria-hidden"?: boolean;
};

export function BotanicalDivider({ className = "" }: Props) {
  return (
    <svg
      viewBox="0 0 220 40"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10 20 H90" strokeWidth="1.2" />
      <path d="M130 20 H210" strokeWidth="1.2" />
      <g transform="translate(100 20)" strokeWidth="1.4">
        <path d="M0 0 C-3 -7 -8 -10 -12 -10 C-8 -6 -6 -2 0 0 Z" fill="currentColor" fillOpacity="0.18" />
        <path d="M0 0 C3 -7 8 -10 12 -10 C8 -6 6 -2 0 0 Z" fill="currentColor" fillOpacity="0.18" />
        <path d="M0 0 C-3 7 -8 10 -12 10 C-8 6 -6 2 0 0 Z" fill="currentColor" fillOpacity="0.18" />
        <path d="M0 0 C3 7 8 10 12 10 C8 6 6 2 0 0 Z" fill="currentColor" fillOpacity="0.18" />
        <circle cx="0" cy="0" r="2.2" fill="currentColor" />
      </g>
    </svg>
  );
}

export function BotanicalSprig({ className = "" }: Props) {
  return (
    <svg
      viewBox="0 0 120 160"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.3"
    >
      <path d="M60 150 C60 110 62 80 70 50 C78 22 92 10 110 8" />
      <g fill="currentColor" fillOpacity="0.14">
        <path d="M70 120 C55 118 46 108 46 94 C56 98 66 106 70 120 Z" />
        <path d="M72 100 C88 102 98 94 100 80 C88 82 78 88 72 100 Z" />
        <path d="M74 78 C60 78 50 70 48 56 C60 60 70 66 74 78 Z" />
        <path d="M80 60 C94 60 102 52 104 40 C94 40 86 48 80 60 Z" />
        <path d="M86 42 C74 40 66 32 66 20 C76 22 84 30 86 42 Z" />
      </g>
      <g strokeWidth="1">
        <path d="M70 120 C55 118 46 108 46 94" />
        <path d="M72 100 C88 102 98 94 100 80" />
        <path d="M74 78 C60 78 50 70 48 56" />
        <path d="M80 60 C94 60 102 52 104 40" />
        <path d="M86 42 C74 40 66 32 66 20" />
      </g>
    </svg>
  );
}

export function BotanicalCorner({ className = "" }: Props) {
  return (
    <svg
      viewBox="0 0 160 160"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.2"
    >
      <path d="M20 140 C30 100 55 65 95 40" />
      <g>
        <path d="M40 118 C32 110 30 98 34 88 C44 96 48 108 40 118 Z" fill="currentColor" fillOpacity="0.12" />
        <path d="M62 92 C56 82 58 70 66 62 C74 72 72 84 62 92 Z" fill="currentColor" fillOpacity="0.12" />
        <path d="M86 66 C80 58 82 46 90 40 C98 48 96 60 86 66 Z" fill="currentColor" fillOpacity="0.12" />
      </g>
      <circle cx="110" cy="28" r="3" fill="currentColor" />
      <circle cx="118" cy="22" r="2" fill="currentColor" />
      <circle cx="124" cy="30" r="2.4" fill="currentColor" />
    </svg>
  );
}
