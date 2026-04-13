"use client";

import { motion } from "framer-motion";
import { Sun, Moon, CloudMoon } from "lucide-react";

const services = [
  {
    icon: Sun,
    title: "Tarot Reading",
    description:
      "Every spread is a conversation between you and something older than language. I read Rider-Waite and Thoth traditions, pulling meaning from the cards as they fall. Sessions run 45 to 90 minutes depending on what surfaces.",
    price: "From $85",
  },
  {
    icon: Moon,
    title: "Astrological Charting",
    description:
      "Your birth chart is a snapshot of the sky the moment you arrived. I build full natal charts and transit readings that map where you've been, where you are, and what's coming into alignment.",
    price: "From $120",
  },
  {
    icon: CloudMoon,
    title: "Dream Interpretation",
    description:
      "Dreams speak in symbols because the subconscious doesn't use words. I work through recurring dreams, nightmares, and the strange ones that won't leave you alone. Most people walk away understanding something they already knew but couldn't name.",
    price: "From $95",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" as const },
  },
};

export default function Services() {
  return (
    <section id="services" className="py-24 sm:py-32 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-gold/60 text-sm tracking-[0.3em] uppercase mb-4">
            What I Offer
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-gold text-glow mb-4">
            Three Ways In
          </h2>
          <p className="text-foreground/50 max-w-lg mx-auto">
            Every reading is private, unhurried, and shaped around what you
            actually need to hear.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8"
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={cardVariants}
              className="group glass rounded-2xl p-8 hover:border-gold/30 hover:shadow-[0_0_30px_rgba(252,211,77,0.08)] transition-all duration-500"
            >
              <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mb-6 group-hover:bg-gold/20 transition-colors duration-500">
                <service.icon className="w-6 h-6 text-gold" />
              </div>

              <h3 className="font-serif text-xl sm:text-2xl text-gold mb-3">
                {service.title}
              </h3>

              <p className="text-foreground/60 text-sm leading-relaxed mb-6">
                {service.description}
              </p>

              <div className="flex items-center justify-between">
                <span className="text-gold/50 text-sm">{service.price}</span>
                <a
                  href="#booking"
                  className="text-sm text-gold/70 hover:text-gold transition-colors"
                >
                  Book &rarr;
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
