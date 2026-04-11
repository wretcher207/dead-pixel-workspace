import { studio } from "@/lib/content";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-bone/10">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[radial-gradient(ellipse_at_50%_100%,rgba(227,180,138,0.16),transparent_65%)] blur-2xl" />
      </div>

      <div className="relative max-w-[1480px] mx-auto px-6 md:px-10 lg:px-14 py-20 md:py-28">
        {/* Giant wordmark */}
        <div className="mb-16 md:mb-24">
          <div className="eyebrow mb-6">Thorn &amp; Thimble — Bangor</div>
          <h2 className="font-display text-[22vw] md:text-[15vw] lg:text-[11vw] leading-[0.88] text-bone tracking-tightest-3 select-none">
            <span>Adorned</span>
            <span className="display-italic text-rose-200 ml-[0.08em]">with care.</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-12 gap-8 md:gap-10 pt-10 border-t border-bone/10">
          {/* Contact */}
          <div className="col-span-2 md:col-span-4">
            <div className="eyebrow mb-4">Studio</div>
            <address className="not-italic space-y-2 text-[0.92rem] text-bone/70 leading-[1.7]">
              <p className="font-display text-lg text-bone">Thorn &amp; Thimble Body Piercing</p>
              <p>40 Main Street</p>
              <p>Bangor, Maine 04401</p>
              <p className="pt-2">
                <a href={studio.phoneHref} className="text-rose-200 hover:text-rose-100 transition-colors duration-500">
                  {studio.phone}
                </a>{" "}
                <span className="text-bone/40 text-xs uppercase tracking-[0.2em] ml-1">text only</span>
              </p>
              <p>
                <a href={`mailto:${studio.email}`} className="text-bone/70 hover:text-rose-200 transition-colors duration-500 break-all">
                  {studio.email}
                </a>
              </p>
            </address>
          </div>

          {/* Hours */}
          <div className="col-span-2 md:col-span-4">
            <div className="eyebrow mb-4">Hours</div>
            <ul className="text-[0.9rem] text-bone/70 space-y-1.5">
              <li className="flex justify-between"><span>Sun</span><span className="text-bone/80 tabular-nums">12 — 4</span></li>
              <li className="flex justify-between"><span>Mon</span><span className="text-bone/40">Closed</span></li>
              <li className="flex justify-between"><span>Tue</span><span className="text-bone/80 tabular-nums">11 — 6</span></li>
              <li className="flex justify-between"><span>Wed</span><span className="text-bone/40">Closed</span></li>
              <li className="flex justify-between"><span>Thu</span><span className="text-bone/80 tabular-nums">11 — 6</span></li>
              <li className="flex justify-between"><span>Fri</span><span className="text-bone/80 tabular-nums">11 — 6</span></li>
              <li className="flex justify-between"><span>Sat</span><span className="text-bone/80 tabular-nums">11 — 6</span></li>
            </ul>
          </div>

          {/* Navigation */}
          <div className="col-span-1 md:col-span-2">
            <div className="eyebrow mb-4">Explore</div>
            <ul className="text-[0.9rem] space-y-2.5">
              {[
                { href: "#about", label: "About Libby" },
                { href: "#services", label: "Services" },
                { href: "#showcase", label: "Showcase" },
                { href: "#testimonials", label: "Reviews" },
                { href: "#faq", label: "Details" },
                { href: "#visit", label: "Visit" },
              ].map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-bone/70 hover:text-rose-200 transition-colors duration-500">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div className="col-span-1 md:col-span-2">
            <div className="eyebrow mb-4">Social</div>
            <ul className="text-[0.9rem] space-y-2.5">
              <li>
                <a href={studio.facebook} target="_blank" rel="noopener noreferrer" className="text-bone/70 hover:text-rose-200 transition-colors duration-500">
                  Facebook
                </a>
              </li>
              <li>
                <a href={studio.facebook} target="_blank" rel="noopener noreferrer" className="text-bone/70 hover:text-rose-200 transition-colors duration-500">
                  Messenger
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom strip */}
        <div className="mt-16 pt-8 border-t border-bone/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 text-[0.7rem] uppercase tracking-[0.26em] text-bone/45">
          <div>© {new Date().getFullYear()} Thorn &amp; Thimble Body Piercing. All rights reserved.</div>
          <div className="flex items-center gap-3">
            <span>APP-quality Jewelry</span>
            <span className="w-px h-3 bg-bone/20" />
            <span>By appointment &amp; walk-in</span>
            <span className="w-px h-3 bg-bone/20" />
            <span>Bangor, Maine</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
