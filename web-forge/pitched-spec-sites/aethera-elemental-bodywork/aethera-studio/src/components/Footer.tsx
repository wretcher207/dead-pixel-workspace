"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Send,
  ExternalLink,
  Camera,
} from "lucide-react";

export default function Footer() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      `Website Inquiry from ${formState.name}`
    );
    const body = encodeURIComponent(
      `${formState.message}\n\n—\n${formState.name}\n${formState.email}`
    );
    window.location.href = `mailto:britt.aethera@outlook.com?subject=${subject}&body=${body}`;
  };

  return (
    <footer id="contact" className="relative py-20 md:py-28 lg:py-36 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="/images/landing/dark-flora.png"
          alt="Dark flora silhouettes"
          fill
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-aethera-deep/95 via-aethera-deep/90 to-aethera-charcoal" />
      </div>

      <div ref={ref} className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 lg:gap-24">
          {/* Left: Contact info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <Image
              src="/images/logo2.jpg"
              alt="Aethera emblem"
              width={70}
              height={70}
              className="rounded-full mb-8 opacity-70"
            />

            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-light text-aethera-cream mb-4">
              Get in Touch
            </h2>
            <p className="text-aethera-text/70 mb-8 sm:mb-10 max-w-md text-sm sm:text-base">
              Questions about services or scheduling? Not sure if bodywork is
              right for you? Just ask. No pressure, no pitch.
            </p>

            <div className="space-y-5">
              <a
                href="tel:8048148868"
                className="flex items-center gap-4 text-aethera-text-dim hover:text-aethera-glow transition-colors group"
              >
                <div className="w-10 h-10 rounded-full bg-aethera-glow/10 flex items-center justify-center group-hover:bg-aethera-glow/20 transition-colors">
                  <Phone size={16} className="text-aethera-glow/70" />
                </div>
                <span>(804) 814-8868</span>
              </a>

              <a
                href="mailto:britt.aethera@outlook.com"
                className="flex items-center gap-4 text-aethera-text-dim hover:text-aethera-glow transition-colors group"
              >
                <div className="w-10 h-10 rounded-full bg-aethera-glow/10 flex items-center justify-center group-hover:bg-aethera-glow/20 transition-colors">
                  <Mail size={16} className="text-aethera-glow/70" />
                </div>
                <span>britt.aethera@outlook.com</span>
              </a>

              <div className="flex items-center gap-4 text-aethera-text-dim">
                <div className="w-10 h-10 rounded-full bg-aethera-glow/10 flex items-center justify-center">
                  <MapPin size={16} className="text-aethera-glow/70" />
                </div>
                <span>
                  50 Portland Rd, Ste 3
                  <br />
                  Kennebunk, ME 04043
                </span>
              </div>
            </div>

            {/* Social links */}
            <div className="flex gap-3 mt-8">
              <a
                href="https://www.instagram.com/aetheraelementalbodywork"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-aethera-glow/10 flex items-center justify-center hover:bg-aethera-glow/20 transition-colors"
                aria-label="Instagram"
              >
                <Camera size={16} className="text-aethera-glow/70" />
              </a>
              <a
                href="https://m.me/aetheraelementalbodywork"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-aethera-glow/10 flex items-center justify-center hover:bg-aethera-glow/20 transition-colors"
                aria-label="Messenger"
              >
                <MessageCircle size={16} className="text-aethera-glow/70" />
              </a>
              <a
                href="https://www.massagebook.com/biz/aethera-elemental-bodywork"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-aethera-glow/10 flex items-center justify-center hover:bg-aethera-glow/20 transition-colors"
                aria-label="MassageBook"
              >
                <ExternalLink size={16} className="text-aethera-glow/70" />
              </a>
            </div>
          </motion.div>

          {/* Right: Contact form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="block font-heading text-xs tracking-[0.2em] uppercase text-aethera-text-dim mb-2"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={formState.name}
                  onChange={(e) =>
                    setFormState({ ...formState, name: e.target.value })
                  }
                  className="w-full bg-aethera-moss/50 border border-aethera-glow/10 rounded-lg px-4 py-3 text-aethera-pale placeholder:text-aethera-text-dim/50 focus:outline-none focus:border-aethera-glow/30 transition-colors"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block font-heading text-xs tracking-[0.2em] uppercase text-aethera-text-dim mb-2"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={formState.email}
                  onChange={(e) =>
                    setFormState({ ...formState, email: e.target.value })
                  }
                  className="w-full bg-aethera-moss/50 border border-aethera-glow/10 rounded-lg px-4 py-3 text-aethera-pale placeholder:text-aethera-text-dim/50 focus:outline-none focus:border-aethera-glow/30 transition-colors"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block font-heading text-xs tracking-[0.2em] uppercase text-aethera-text-dim mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={formState.message}
                  onChange={(e) =>
                    setFormState({ ...formState, message: e.target.value })
                  }
                  className="w-full bg-aethera-moss/50 border border-aethera-glow/10 rounded-lg px-4 py-3 text-aethera-pale placeholder:text-aethera-text-dim/50 focus:outline-none focus:border-aethera-glow/30 transition-colors resize-none"
                  placeholder="What can I help you with?"
                />
              </div>

              <button
                type="submit"
                className="flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-3.5 bg-aethera-glow/10 border border-aethera-glow/30 rounded-full font-heading text-xs sm:text-sm tracking-[0.2em] uppercase text-aethera-glow hover:bg-aethera-glow/20 hover:border-aethera-glow/50 transition-all duration-500"
              >
                <Send size={14} />
                Send Message
              </button>
            </form>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="section-divider mt-20 mb-8" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-aethera-text-dim/50">
          <p>&copy; {new Date().getFullYear()} Aethera Elemental Bodywork. All rights reserved.</p>
          <p className="font-heading tracking-wider">
            Kennebunk, Maine
          </p>
        </div>
      </div>
    </footer>
  );
}
