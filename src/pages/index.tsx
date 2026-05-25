import Link from 'next/link';
import { Layout } from '@/components/Layout';

const features = [
  { title: 'Upload & Analyze', description: 'Instantly detect style, palette, typography, and layout from church poster references.' },
  { title: 'AI Poster Generator', description: 'Create multiple editable poster concepts from event inputs and mood preferences.' },
  { title: 'Smart Editor', description: 'Drag, resize, align and layer every asset inside a modern canvas workspace.' },
  { title: 'Multi-format Export', description: 'Export PNG, JPG, PDF and social-ready sizes like Instagram, Facebook, and YouTube.' },
  { title: 'Template Library', description: 'Browse curated church templates for revival, worship, youth, conference and prayer events.' },
  { title: 'Brand Kit', description: 'Save church colors, logos, fonts, and overlay styles across your ministry workspace.' },
];

export default function Home() {
  return (
     <Layout title="GraceCanvas Home">
      <section className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="space-y-6">
          <span className="inline-flex rounded-full bg-violet-500/15 px-4 py-2 text-sm font-semibold uppercase tracking-[0.24em] text-violet-200">
            AI-Powered Church Design
          </span>
          <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-white sm:text-6xl">
            Generate cinematic church posters, flyers, and social visuals in minutes.
          </h1>
          <p className="max-w-2xl text-lg text-slate-300">
            Upload reference designs and GraceCanvas analyzes style, palette, typography, and layout to create premium editable poster concepts inspired by gospel media aesthetics.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/editor" className="inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 shadow-glow transition hover:bg-slate-100">
              Try the Studio
            </Link>
            <Link href="/ai-generator" className="inline-flex rounded-full border border-white/10 px-6 py-3 text-sm text-slate-100 transition hover:border-white/20 hover:text-white">
              See AI Generator
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-white/5 px-5 py-4 text-sm text-slate-300">AI Style Analysis</div>
            <div className="rounded-3xl border border-white/10 bg-white/5 px-5 py-4 text-sm text-slate-300">Social-ready Export</div>
            <div className="rounded-3xl border border-white/10 bg-white/5 px-5 py-4 text-sm text-slate-300">Brand Kit System</div>
          </div>
        </div>

        <div className="overflow-hidden rounded-[32px] border border-white/10 bg-slate-950/70 p-8 shadow-glow">
          <div className="mb-6 flex items-center justify-between text-sm text-slate-400">
            <span>Poster preview</span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.2em]">Revival</span>
          </div>
          <div className="space-y-6 rounded-[28px] bg-gradient-to-br from-slate-900 via-slate-950 to-violet-950 p-8 text-slate-50">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <span className="inline-flex rounded-full bg-violet-500/15 px-3 py-1 text-xs uppercase tracking-[0.24em] text-violet-200">Worship Night</span>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight">City Revival Experience</h2>
              <p className="mt-4 text-sm leading-6 text-slate-300">Featuring Guest Worship Leader Pastor Naomi & Gospel Choir</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 text-sm text-slate-300">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-4">Fri, Jun 21 · 7PM</div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-4">Riverside Church</div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-20 space-y-8">
        <div className="max-w-3xl space-y-3">
          <span className="text-sm uppercase tracking-[0.24em] text-violet-200">Features</span>
          <h2 className="text-4xl font-semibold text-white">Purpose-built for ministries, creatives, and gospel events.</h2>
          <p className="text-slate-300">From AI style extraction to drag-and-drop editing, the platform combines church media needs with modern creative tooling.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <article key={feature.title} className="rounded-3xl border border-white/10 bg-white/5 p-7 shadow-glow transition hover:border-violet-400/20">
              <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
              <p className="mt-3 text-slate-300">{feature.description}</p>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  );
}
