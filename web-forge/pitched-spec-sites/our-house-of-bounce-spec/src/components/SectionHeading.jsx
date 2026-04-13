function SectionHeading({ eyebrow, title, body, centered = true }) {
  return (
    <div
      className={`mx-auto max-w-3xl ${centered ? 'text-center' : 'text-left'}`}
      data-reveal
    >
      {eyebrow ? (
        <p className="font-heading text-sm font-bold uppercase tracking-[0.22em] text-[var(--secondary)]">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-3 text-balance font-heading text-4xl font-extrabold text-[var(--foreground)] sm:text-5xl">
        {title}
      </h2>
      {body ? (
        <p className="mt-4 text-lg leading-8 text-[var(--muted-foreground)]">
          {body}
        </p>
      ) : null}
    </div>
  );
}

export default SectionHeading;
