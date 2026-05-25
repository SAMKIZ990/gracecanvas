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
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-surface/90 backdrop-blur-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
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

        <Link href="/auth" className="rounded-full bg-gradient-to-r from-slate-800 to-violet-600 px-5 py-2.5 text-sm font-medium text-white shadow-glow">
          Launch Studio
        </Link>
      </div>
    </header>
  );
}
