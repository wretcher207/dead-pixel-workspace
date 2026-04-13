import Link from "next/link";

interface ProductCardProps {
  name: string;
  description: string;
  price?: string;
  image: string;
  href?: string;
  badge?: string;
}

export function ProductCard({
  name,
  description,
  price,
  image,
  href = "/shop",
  badge,
}: ProductCardProps) {
  return (
    <Link href={href} className="group block">
      <div className="card-surface rounded-xl overflow-hidden transition-all duration-500 glow-violet-hover">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-midnight">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{ backgroundImage: `url(${image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent" />
          {badge && (
            <span className="absolute top-4 left-4 text-[10px] uppercase tracking-[0.15em] font-semibold bg-violet/90 text-white px-3 py-1 rounded-full">
              {badge}
            </span>
          )}
        </div>

        {/* Info */}
        <div className="p-5">
          <h3 className="font-serif text-lg text-cream group-hover:text-violet transition-colors duration-300">
            {name}
          </h3>
          <p className="text-sm text-cream-dim mt-1 line-clamp-2">{description}</p>
          {price && (
            <p className="text-sm text-violet font-medium mt-3">From {price}</p>
          )}
          <span className="inline-block text-xs text-violet mt-3 tracking-wide uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            View Details &rarr;
          </span>
        </div>
      </div>
    </Link>
  );
}
