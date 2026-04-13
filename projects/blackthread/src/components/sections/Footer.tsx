export default function Footer() {
  return (
    <footer className="border-t border-white/[0.04] py-12 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Mark */}
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-bt-violet rounded-sm" />
            <span className="text-[12px] font-mono tracking-[0.25em] text-white/30 uppercase">
              BlackThread
            </span>
          </div>

          {/* Links */}
          <div className="flex gap-8">
            {["Protocol", "Signal", "Uplink"].map((link) => (
              <a
                key={link}
                href="#"
                className="text-[11px] font-mono tracking-[0.15em] text-bt-muted hover:text-bt-cold transition-colors duration-300 uppercase"
              >
                {link}
              </a>
            ))}
          </div>

          {/* Meta */}
          <span className="text-[10px] font-mono text-white/15 tracking-wider">
            &copy; {new Date().getFullYear()} &middot; v0.9.1
          </span>
        </div>
      </div>
    </footer>
  );
}
