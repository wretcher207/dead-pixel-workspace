"use client";

import { motion } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import ProductCard from "@/components/ui/ProductCard";
import { featuredProducts } from "@/data/products";
import { productLabel, productHeadline } from "@/lib/constants";
import { fadeInUp, staggerContainer, viewportOnce } from "@/lib/animations";

export default function ProductGrid() {
  return (
    <section id="products" className="py-32 px-6 md:px-12 max-w-screen-2xl mx-auto bg-surface">
      {/* Section header */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8"
      >
        <div className="max-w-2xl">
          <SectionLabel>{productLabel}</SectionLabel>
          <h2 className="font-display text-4xl md:text-6xl text-on-surface leading-tight">
            {productHeadline}
          </h2>
        </div>
        <a
          href="#products"
          className="font-body uppercase tracking-widest text-[10px] text-sage group inline-flex items-center gap-4 shrink-0"
        >
          <span className="w-8 h-[1px] bg-sage transition-all duration-500 group-hover:w-16" />
          Full Catalog
        </a>
      </motion.div>

      {/* Product cards — asymmetric 3-column per wireframe */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16"
      >
        {featuredProducts.map((product, i) => (
          <ProductCard
            key={product.slug}
            product={product}
            className={i === 1 ? "md:mt-24" : ""}
          />
        ))}
      </motion.div>
    </section>
  );
}
