"use client";
export default function MobileOrderBar() {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden px-4 pb-4 pt-2"
      style={{ background: "linear-gradient(to top, #0d0d0d 60%, transparent)" }}
    >
      <a
        href="#order"
        className="block w-full py-4 bg-neon text-void font-semibold text-center rounded-full tracking-widest text-sm uppercase"
        style={{ boxShadow: "var(--glow-neon)" }}
      >
        ORDER NOW
      </a>
    </div>
  );
}
