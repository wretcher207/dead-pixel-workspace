"use client";

import { motion } from "framer-motion";
import ClayCard from "@/components/ui/ClayCard";
import ClayButton from "@/components/ui/ClayButton";
import { BOOKING_URL } from "@/lib/constants";
import { fadeInUp } from "@/lib/animations";
import type { ServiceCategory as ServiceCategoryType } from "@/lib/types";

export default function ServiceCategory({ category }: { category: ServiceCategoryType }) {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
    >
      <ClayCard variant="solid">
        <div className="flex gap-4">
          <div className={`w-1 flex-shrink-0 rounded-full bg-gradient-to-b ${category.accent}`} />
          <div className="flex-1">
            <h3
              className="text-2xl font-extrabold text-clay-foreground mb-4"
              style={{ fontFamily: "var(--font-nunito), sans-serif" }}
            >
              {category.name}
            </h3>

            {category.services ? (
              <div className="space-y-6">
                {category.services.map((service) => (
                  <div key={service.name}>
                    <h4
                      className="text-lg font-bold text-clay-foreground"
                      style={{ fontFamily: "var(--font-nunito), sans-serif" }}
                    >
                      {service.name}
                    </h4>
                    <p className="text-clay-muted leading-relaxed mt-1">{service.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div>
                <p className="text-clay-muted leading-relaxed">{category.description}</p>
                {category.pricingNote && (
                  <p className="text-sm text-clay-muted italic mt-3">{category.pricingNote}</p>
                )}
              </div>
            )}

            <div className="mt-6">
              <ClayButton href={BOOKING_URL} external variant="outline" size="sm">
                Book {category.name}
              </ClayButton>
            </div>
          </div>
        </div>
      </ClayCard>
    </motion.div>
  );
}
