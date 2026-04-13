import Link from "next/link";
import { TopMetaBar } from "@/components/app-shell/TopMetaBar";
import { Chip } from "@/components/ui/Chip";
import {
  principles,
  getCategories,
  getPrinciplesByCategory,
  CATEGORY_LABELS,
  type PrincipleCategory,
} from "@/lib/principles";
import { getProject } from "@/lib/projects";

export default function PrinciplesPage() {
  const categories = getCategories();

  return (
    <>
      <TopMetaBar
        environment="Learn"
        title="Design Principles"
        meta={[
          { label: "Principles", value: String(principles.length) },
          { label: "Categories", value: String(categories.length) },
        ]}
      />

      <section className="flex-1 px-12 py-10 space-y-20 overflow-y-auto warm-wash">
        <header className="space-y-3 max-w-[58ch] ritual-reveal ritual-reveal-1">
          <p className="editorial-label">Learn</p>
          <h3 className="font-headline text-[44px] leading-[1.02] tracking-tight text-on-surface">
            Design Principles
          </h3>
          <p className="font-body text-[15px] leading-[1.7] text-on-surface-variant">
            The rules we follow when building sites. Each one comes from
            real projects and real data. They&rsquo;re baked into every
            prompt this tool generates.
          </p>
        </header>

        {categories.map((cat) => (
          <CategorySection key={cat} category={cat} />
        ))}
      </section>
    </>
  );
}

function CategorySection({ category }: { category: PrincipleCategory }) {
  const items = getPrinciplesByCategory(category);
  if (items.length === 0) return null;

  return (
    <section className="space-y-8 ritual-reveal ritual-reveal-2">
      <div className="space-y-2">
        <p className="editorial-label">{CATEGORY_LABELS[category]}</p>
        <div className="atmospheric-line" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-8">
        {items.map((p) => (
          <Link
            key={p.slug}
            href={`/learn/${p.slug}`}
            className="group block"
          >
            <article className="bg-surface-container-low/60 hover:bg-surface-container-low px-7 py-6 rounded-sm ghost-border space-y-4 transition-colors duration-300">
              <div className="flex items-center justify-between">
                <Chip tone="filled">{CATEGORY_LABELS[p.category]}</Chip>
                <span className="font-label text-[9px] uppercase tracking-[0.22em] text-outline-variant group-hover:text-tertiary transition-colors duration-300">
                  View &rarr;
                </span>
              </div>

              <h4 className="font-headline italic text-[22px] leading-tight text-on-surface group-hover:text-tertiary transition-colors duration-300">
                {p.rule}
              </h4>

              <p className="font-body text-[13px] leading-[1.7] text-on-surface-variant">
                {p.rationale}
              </p>

              {p.antiExample && (
                <div className="bg-error-container/15 border border-error/20 rounded-sm px-4 py-3">
                  <p className="font-label text-[9px] uppercase tracking-[0.22em] text-error mb-1.5">
                    Anti-example
                  </p>
                  <p className="font-body text-[12px] leading-[1.6] text-on-surface-variant">
                    {p.antiExample}
                  </p>
                </div>
              )}

              {p.appliesTo.length > 0 && (
                <div className="pt-2">
                  <p className="font-label text-[9px] uppercase tracking-[0.22em] text-outline-variant mb-2">
                    Appears in
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {p.appliesTo.map((slug) => {
                      const proj = getProject(slug);
                      return (
                        <span
                          key={slug}
                          className="font-body text-[11px] text-on-surface-variant/80"
                        >
                          {proj?.name ?? slug}
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
}
