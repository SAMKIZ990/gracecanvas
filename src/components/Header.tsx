import { useState } from 'react';
import Link from 'next/link';
import { Logo } from './Logo';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/#features', label: 'Features' },
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
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur-lg transition dark:border-white/10 dark:bg-slate-950/90">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link href="/" className="inline-flex items-center gap-3 text-slate-900 transition hover:opacity-90 dark:text-white">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm text-slate-600 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/auth" className="hidden rounded-full bg-gradient-to-r from-slate-800 to-violet-600 px-5 py-2.5 text-sm font-medium text-white shadow-glow transition hover:opacity-90 md:inline-flex">
            Launch Studio
          </Link>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-slate-100 text-slate-900 transition hover:bg-slate-200 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 md:hidden"
            aria-expanded={menuOpen}
            aria-label="Toggle navigation"
          >
            <span className="text-lg">{menuOpen ? '✕' : '☰'}</span>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 transition dark:border-white/10 dark:bg-slate-950/95 md:hidden">
          <div className="flex flex-col gap-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 transition hover:bg-slate-100 dark:border-white/10 dark:bg-white/5 dark:text-slate-100 dark:hover:bg-white/10"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/auth"
              className="rounded-3xl bg-gradient-to-r from-slate-800 to-violet-600 px-4 py-3 text-center text-sm font-medium text-white shadow-glow transition hover:opacity-90"
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
