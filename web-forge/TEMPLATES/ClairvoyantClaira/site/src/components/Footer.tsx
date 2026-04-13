"use client";

import { Eye, MapPin, Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-gold/10 bg-navy-light/30">
      <div className="max-w-6xl mx-auto px-4 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Eye className="w-5 h-5 text-gold" />
              <span className="font-serif text-xl text-gold">
                Clairvoyant Claira
              </span>
            </div>
            <p className="text-foreground/40 text-sm leading-relaxed max-w-xs">
              Some things have to be seen to be believed. Some things have to be
              believed to be seen.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-gold/70 text-sm tracking-[0.2em] uppercase mb-4">
              Explore
            </h4>
            <nav className="flex flex-col gap-3">
              {[
                { label: "Services", href: "#services" },
                { label: "The Oracle", href: "#oracle" },
                { label: "Book a Reading", href: "#booking" },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-foreground/50 hover:text-gold text-sm transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-gold/70 text-sm tracking-[0.2em] uppercase mb-4">
              Find Me
            </h4>
            <div className="flex flex-col gap-3 text-sm text-foreground/50">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-gold/40 mt-0.5 shrink-0" />
                <span>
                  9 Gallows Hill Lane
                  <br />
                  Salem, MA 01970
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gold/40 shrink-0" />
                <span>claira@clairvoyantclaira.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gold/40 shrink-0" />
                <span>(978) 555-0147</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-gold/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-foreground/30 text-xs">
            &copy; {new Date().getFullYear()} Clairvoyant Claira. All rights
            reserved.
          </p>
          <p className="text-foreground/20 text-xs">
            Built by{" "}
            <span className="text-foreground/30 hover:text-gold/50 transition-colors cursor-pointer">
              Dead Pixel Design
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
