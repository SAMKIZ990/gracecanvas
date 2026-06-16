export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50/90 py-14 transition dark:border-white/10 dark:bg-slate-950/90">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 text-slate-600 transition sm:px-6 dark:text-slate-400 lg:grid-cols-[1.5fr_1fr]">
        <div className="space-y-4 text-center lg:text-left">
          <p className="text-sm uppercase tracking-[0.24em] text-violet-600 dark:text-violet-200">GraceCanvas</p>
          <p className="text-lg font-semibold text-slate-900 dark:text-white">AI-powered church design workflows for outreach, worship, and ministry events.</p>
          <p className="max-w-xl text-sm leading-6 text-slate-600 dark:text-slate-400">Create posters, socials, and print-ready assets with branded templates, AI style analysis, and export tools designed for ministries.</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-900 dark:text-white">Product</h3>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>AI Generator</li>
              <li>Poster Studio</li>
              <li>Brand Kit</li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-900 dark:text-white">Company</h3>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>About</li>
              <li>Pricing</li>
              <li>Contact</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-7xl border-t border-slate-200 pt-6 text-center text-sm text-slate-600 dark:border-white/10 dark:text-slate-400">
        <p>© 2026 GraceCanvas. Built for churches, worship teams, and ministry creatives.</p>
      </div>
    </footer>
  );
}
