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

const useCases = [
  { title: 'Revival events', description: 'Build powerful outreach posters and social campaigns that amplify your service announcements.' },
  { title: 'Youth ministry', description: 'Create energetic graphics for youth nights, concerts, and community gatherings.' },
  { title: 'Worship services', description: 'Deliver polished sermon series and worship visuals aligned to your church identity.' },
  { title: 'Seasonal outreach', description: 'Launch holiday, conference, and special event materials in a consistent style.' },
];

const trustLogos = ['Grace Church', 'City Ministries', 'Hope Fellowship', 'Rise Youth', 'Harvest Events', 'Praise Collective'];

export default function Home() {
    return (
      <Layout title="GraceCanvas Home">
      <section className="relative overflow-hidden rounded-[40px] border border-white/10 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-800 px-6 py-10 shadow-2xl shadow-slate-950/30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(139,92,246,0.18),_transparent_24%),radial-gradient(circle_at_bottom_left,_rgba(236,72,153,0.18),_transparent_24%)]" />
        <div className="relative mx-auto grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="space-y-6 text-white">
            <span className="inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.24em] text-white/90 backdrop-blur-sm">
              AI-first church media toolkit
            </span>

            <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-white sm:text-6xl">
              Build church posters, socials, and event campaigns faster with AI.
            </h1>

            <p className="max-w-2xl text-lg leading-8 text-slate-200">
              GraceCanvas turns sermon themes, brand colors, and design references into editable poster concepts, social-ready visuals, and print assets for ministries.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/editor" className="inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-slate-950/10 transition hover:brightness-105">
                Launch Studio
              </Link>
              <Link href="/ai-generator" className="inline-flex rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm text-white transition hover:bg-white/20">
                Explore AI Generator
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl border border-white/10 bg-white/10 px-5 py-4 text-sm text-slate-200">One-click poster drafts</div>
              <div className="rounded-3xl border border-white/10 bg-white/10 px-5 py-4 text-sm text-slate-200">Brand kit sync</div>
              <div className="rounded-3xl border border-white/10 bg-white/10 px-5 py-4 text-sm text-slate-200">Social-ready export</div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-slate-950/90 p-8 shadow-xl shadow-slate-950/30">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.05),_transparent_20%),radial-gradient(circle_at_bottom_right,_rgba(139,92,246,0.15),_transparent_30%)]" />
            <div className="relative space-y-6">
              <div className="rounded-[28px] border border-white/10 bg-slate-900/90 p-6 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.6)]">
                <span className="inline-flex rounded-full bg-violet-500/15 px-3 py-1 text-xs uppercase tracking-[0.24em] text-violet-200">Revival Night</span>
                <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white">Come Together in Worship</h2>
                <p className="mt-4 text-sm leading-6 text-slate-300">Create event graphics that invite your congregation and reflect your church’s identity.</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 text-sm text-slate-200">
                <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-4">Fri, Jul 12 · 7PM</div>
                <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-4">Main Sanctuary</div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-[24px] bg-slate-900/80 p-4 text-slate-200 shadow-inner shadow-black/10">
                  <p className="text-xs uppercase tracking-[0.24em] text-violet-300">Design status</p>
                  <p className="mt-2 text-sm font-semibold">Draft ready</p>
                </div>
                <div className="rounded-[24px] bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 p-4 text-slate-100">
                  <p className="text-xs uppercase tracking-[0.24em] text-violet-200">Export</p>
                  <p className="mt-2 text-sm font-semibold">PNG, PDF, Social</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="mt-24 space-y-10">
        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div className="space-y-4">
            <span className="text-sm uppercase tracking-[0.28em] text-violet-600 dark:text-violet-200">Why GraceCanvas</span>
            <h2 className="text-4xl font-semibold text-slate-900 dark:text-white">A modern creative workflow for ministry media.</h2>
            <p className="max-w-xl text-slate-600 dark:text-slate-300">From AI-guided concept generation to a polished editor and export tools, GraceCanvas makes church media production fast, consistent, and beautiful.</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {useCases.map((useCase) => (
              <div key={useCase.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-slate-900 shadow-sm transition hover:border-violet-300 dark:border-white/10 dark:bg-white/5 dark:text-white">
                <h3 className="text-xl font-semibold">{useCase.title}</h3>
                <p className="mt-3 text-slate-600 dark:text-slate-300">{useCase.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[32px] border border-slate-200 bg-slate-50 p-8 shadow-lg dark:border-white/10 dark:bg-slate-950/90">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="space-y-3">
              <p className="text-sm uppercase tracking-[0.24em] text-violet-600 dark:text-violet-200">Built for churches</p>
              <h3 className="text-2xl font-semibold text-slate-900 dark:text-white">Design campaigns, sermons, and social media with one toolset.</h3>
            </div>
            <div className="grid gap-4">
              <div className="rounded-3xl border border-slate-200 bg-white p-5 text-slate-700 dark:border-white/10 dark:bg-slate-900 dark:text-slate-300">Poster and flyer layouts</div>
              <div className="rounded-3xl border border-slate-200 bg-white p-5 text-slate-700 dark:border-white/10 dark:bg-slate-900 dark:text-slate-300">Reusable ministry themes</div>
            </div>
            <div className="grid gap-4">
              <div className="rounded-3xl border border-slate-200 bg-white p-5 text-slate-700 dark:border-white/10 dark:bg-slate-900 dark:text-slate-300">Editable social cards</div>
              <div className="rounded-3xl border border-slate-200 bg-white p-5 text-slate-700 dark:border-white/10 dark:bg-slate-900 dark:text-slate-300">Branded visual systems</div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-20 space-y-8">
        <div className="space-y-3 text-center">
          <span className="text-sm uppercase tracking-[0.24em] text-violet-600 dark:text-violet-200">Features</span>
          <h2 className="text-4xl font-semibold text-slate-900 dark:text-white">Everything ministries need for creative campaigns.</h2>
          <p className="mx-auto max-w-2xl text-slate-600 dark:text-slate-300">AI-assisted generation, visual templates, brand kit controls, and export options all in one workspace.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <article key={feature.title} className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:border-violet-300 dark:border-white/10 dark:bg-slate-950 dark:text-white">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{feature.title}</h3>
              <p className="mt-4 text-slate-600 dark:text-slate-300">{feature.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-16 rounded-[32px] border border-slate-200 bg-slate-50 p-8 shadow-lg dark:border-white/10 dark:bg-slate-950/90">
        <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-violet-600 dark:text-violet-200">Trusted by ministries</p>
            <h2 className="mt-4 text-3xl font-semibold text-slate-900 dark:text-white">Loved by churches, worship teams, and event ministries.</h2>
          </div>
          <p className="max-w-2xl text-slate-600 dark:text-slate-300">GraceCanvas helps creative church teams produce polished marketing and event graphics with speed, consistency, and brand control.</p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {trustLogos.map((logo) => (
            <div key={logo} className="rounded-3xl border border-slate-200 bg-white px-5 py-4 text-center text-sm font-semibold text-slate-900 shadow-sm transition hover:border-violet-300 dark:border-white/10 dark:bg-slate-900 dark:text-white">
              {logo}
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}
