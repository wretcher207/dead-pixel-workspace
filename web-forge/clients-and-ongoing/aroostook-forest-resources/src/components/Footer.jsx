function Footer() {
  return (
    <footer className="border-t border-border bg-background py-10">
      <div className="page-shell">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="flex items-start gap-4">
            <img src="/images/logo.jpg" alt="" className="hidden h-14 w-14 border border-white/10 object-cover sm:block" />
            <div>
              <p className="text-lg font-bold uppercase tracking-tighter text-foreground">
                Aroostook Forest Resources
              </p>
              <p className="mt-2 font-mono text-xs uppercase tracking-widerest text-muted-foreground">
                Washburn, ME
              </p>
            </div>
          </div>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>(207) 768-0027</p>
            <p>john.saucier@aroostookforest.com</p>
            <a
              href="https://www.facebook.com/profile.php?id=61586389362408"
              target="_blank"
              rel="noreferrer"
              className="ghost-link"
            >
              Facebook
            </a>
          </div>
        </div>
        <div className="mt-8 flex flex-col gap-3 border-t border-border pt-6 text-xs uppercase tracking-wider text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>Licensed Maine Forester</p>
          <p>2026 Aroostook Forest Resources, LLC. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
