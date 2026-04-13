function RentalCard({ rental, index }) {
  const cardClassName = rental.featured
    ? 'sticker-card xl:-translate-y-6 xl:scale-[1.04]'
    : 'sticker-card';

  return (
    <article
      className={cardClassName}
      style={{ '--card-shadow': rental.shadow }}
      data-reveal
      data-featured={rental.featured ? 'true' : 'false'}
    >
      <div
        className="floating-chip"
        style={{ backgroundColor: rental.accent }}
        aria-hidden="true"
      >
        <span className="font-heading text-xs font-extrabold uppercase tracking-[0.14em] text-white">
          {index + 1}
        </span>
      </div>

      {rental.badge ? (
        <div className="featured-badge" aria-label={rental.badge}>
          {rental.badge}
        </div>
      ) : null}

      <div className="overflow-hidden rounded-[26px] border-2 border-[var(--accent-shadow)] bg-[var(--muted)]">
        <img
          src={rental.image}
          alt={rental.alt}
          className="h-56 w-full object-cover"
          style={{ objectPosition: rental.imagePosition }}
          loading="lazy"
        />
      </div>

      <div className="mt-6 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-heading text-2xl font-extrabold text-[var(--foreground)]">
            {rental.name}
          </h3>
          <p className="mt-2 text-sm leading-6 text-[var(--muted-foreground)]">
            {rental.description}
          </p>
        </div>
        <div className="rounded-full border-2 border-[var(--accent-shadow)] bg-[var(--background)] px-4 py-2 font-heading text-xl font-extrabold text-[var(--foreground)]">
          {rental.price}
        </div>
      </div>
    </article>
  );
}

export default RentalCard;
