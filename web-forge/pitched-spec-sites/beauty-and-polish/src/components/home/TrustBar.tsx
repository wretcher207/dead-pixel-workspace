"use client";

import StatOrb from "@/components/ui/StatOrb";

export default function TrustBar() {
  return (
    <section className="py-16 sm:py-20">
      <div className="flex flex-wrap justify-center gap-8 sm:gap-12">
        <StatOrb value="100%" label="Recommend" color="bg-clay-accent/10" delay={0} />
        <StatOrb value="48" label="5-Star Reviews" color="bg-clay-accent-alt/10" delay={0.15} />
        <StatOrb value="2026" label="Best in Class" color="bg-clay-tertiary/10" delay={0.3} />
      </div>
    </section>
  );
}
