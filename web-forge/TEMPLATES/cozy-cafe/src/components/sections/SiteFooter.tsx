import BrandMark from "@/components/ui/BrandMark";

const navLinks = ["Menu", "About", "Visit", "Order Ahead"];

export default function SiteFooter() {
  return (
    <footer style={{ backgroundColor: "#3d2e24" }}>
      {/* Main footer */}
      <div className="px-8 md:px-16 py-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
          {/* Wordmark */}
          <div>
            <span className="font-serif text-3xl italic text-[#fdf8f0]">
              The Copper Cup
            </span>
            <p className="mt-3 text-sm text-[#9a9088] font-light leading-relaxed">
              Good mornings
              <br />
              start here.
            </p>
          </div>

          {/* Nav */}
          <nav aria-label="Footer navigation">
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase().replace(" ", "-")}`}
                    className="text-sm tracking-widest uppercase text-[#c4b8ac] hover:text-[#fdf8f0] transition-colors"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="space-y-2 text-sm font-light">
            <p className="text-[#c4b8ac]">123 Main Street</p>
            <p className="text-[#c4b8ac]">Anytown, USA 00000</p>
            <a
              href="tel:+15550000000"
              className="block text-[#c9a96e] hover:text-[#fdf8f0] transition-colors"
            >
              (555) 000-0000
            </a>
            <a
              href="mailto:hello@example.com"
              className="block text-[#c9a96e] hover:text-[#fdf8f0] transition-colors"
            >
              hello@example.com
            </a>
          </div>
        </div>
      </div>

      {/* Gold rule + sign-off */}
      <div className="border-t border-[#c9a96e]/20 px-8 md:px-16 py-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <BrandMark size={20} className="text-[#c9a96e] opacity-60" />
            <p className="font-accent text-base text-[#c9a96e]">
              Still here. Still brewing. Come back soon.
            </p>
          </div>
          <p className="text-xs text-[#6b5f56]" style={{ fontFamily: "var(--font-sans)" }}>
            &copy; {new Date().getFullYear()} The Copper Cup
          </p>
        </div>
      </div>
    </footer>
  );
}
