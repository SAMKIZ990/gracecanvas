import type { ReactNode } from 'react';
import { Footer } from './Footer';
import { Header } from './Header';

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

export function Layout({ children, title }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 text-slate-900 transition dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 dark:text-white">
      <Header />
      <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        {title ? <h1 className="sr-only">{title}</h1> : null}
        {children}
      </main>
      <Footer />
    </div>
  );
}
