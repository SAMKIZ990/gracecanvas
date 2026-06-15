import { useState } from 'react';
import Link from 'next/link';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/templates', label: 'Templates' },
  { href: '/ai-generator', label: 'AI Generator' },
  { href: '/editor', label: 'Editor' },
  { href: '/brand-kit', label: 'Brand Kit' },
  { href: '/dashboard', label: 'Dashboard' },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-surface/90 backdrop-blur-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link href="/" className="font-semibold text-white">
          GraceCanvas
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm text-slate-300 transition hover:text-white">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/auth" className="hidden rounded-full bg-gradient-to-r from-slate-800 to-violet-600 px-5 py-2.5 text-sm font-medium text-white shadow-glow md:inline-flex">
            Launch Studio
          </Link>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-white/10 md:hidden"
            aria-expanded={menuOpen}
            aria-label="Toggle navigation"
          >
            <span className="text-lg">{menuOpen ? '✕' : '☰'}</span>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-white/10 bg-slate-950/95 px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-100 transition hover:bg-white/10"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/auth"
              className="rounded-3xl bg-gradient-to-r from-slate-800 to-violet-600 px-4 py-3 text-sm font-medium text-white shadow-glow text-center"
              onClick={() => setMenuOpen(false)}
            >
              Launch Studio
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
