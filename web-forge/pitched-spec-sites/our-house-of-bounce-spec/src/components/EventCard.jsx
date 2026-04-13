import { Building2, Cake, Users } from 'lucide-react';

const icons = {
  cake: Cake,
  users: Users,
  building: Building2,
};

function EventCard({ item }) {
  const Icon = icons[item.icon];

  return (
    <article className="sticker-card relative pt-10" data-reveal>
      <div
        className="floating-icon"
        style={{ backgroundColor: item.color }}
        aria-hidden="true"
      >
        <Icon className="h-7 w-7 text-white" strokeWidth={2.5} />
      </div>

      <div
        className="inline-flex rounded-full px-4 py-2 font-heading text-xs font-extrabold uppercase tracking-[0.18em] text-white"
        style={{ backgroundColor: item.color }}
      >
        Event Type
      </div>

      <h3 className="mt-5 font-heading text-2xl font-extrabold text-[var(--foreground)]">
        {item.title}
      </h3>
      <p className="mt-3 text-base leading-7 text-[var(--muted-foreground)]">
        {item.description}
      </p>
    </article>
  );
}

export default EventCard;
