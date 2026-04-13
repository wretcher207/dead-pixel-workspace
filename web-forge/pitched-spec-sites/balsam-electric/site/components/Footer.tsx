export default function Footer() {
  return (
    <footer className="relative py-10 px-6 md:px-12 lg:px-20">
      <div className="divider mb-10" />
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-display text-[10px] tracking-[0.2em] uppercase text-cream/15">
          Balsam Electric LLC
        </span>
        <span className="text-[11px] text-cream/10 font-light">
          &copy; {new Date().getFullYear()}
        </span>
      </div>
    </footer>
  );
}
