const SIGNALS = [
  "Family-run since 1989",
  "100% recommended",
  "25+ Facebook reviews",
  "Orrington, Maine",
];

function Glyph() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      aria-hidden="true"
      className="text-moss/50 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="7" cy="7" r="1.2" fill="currentColor" />
      <path d="M7 2 C7 4 5 5 3 5" />
      <path d="M7 2 C7 4 9 5 11 5" />
      <path d="M7 12 C7 10 5 9 3 9" />
      <path d="M7 12 C7 10 9 9 11 9" />
    </svg>
  );
}

export function SignalBar() {
  return (
    <div className="border-y border-moss/12 bg-cream/60">
      <div className="container-site py-6 md:py-7">
        <ul className="flex flex-wrap items-center justify-center gap-x-8 md:gap-x-14 gap-y-3">
          {SIGNALS.map((signal, idx) => (
            <li
              key={signal}
              className="flex items-center gap-3 font-display italic text-[0.95rem] md:text-[1.05rem] text-charcoal/80"
            >
              {signal}
              {idx < SIGNALS.length - 1 ? (
                <Glyph />
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
