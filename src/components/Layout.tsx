import type { ReactNode } from 'react';
import { Footer } from './Footer';
import { Header } from './Header';

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

export function Layout({ children, title }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 text-white">
      <Header />
      <main className="mx-auto w-full max-w-7xl px-6 py-10"> 
        {title ? <h1 className="sr-only">{title}</h1> : null}
        {children}
      </main>
      <Footer />
    </div>
  );
}
