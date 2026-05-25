import { Layout } from '@/components/Layout';

const cards = [
  { title: 'Project Overview', description: 'View active campaigns, recent poster drafts, and AI generation history at a glance.' },
  { title: 'Brand Kit', description: 'Save logo kits, church palettes, font presets, and overlay styles for consistent branding.' },
  { title: 'Team Workspaces', description: 'Share reusable assets and templates across ministry teams and creative departments.' },
];

export default function Dashboard() {
  return (
    <Layout title="Dashboard">
      <section className="space-y-6">
        <div className="max-w-3xl space-y-4">
          <span className="inline-flex rounded-full bg-violet-500/15 px-4 py-2 text-sm font-semibold uppercase tracking-[0.24em] text-violet-200">
            Dashboard
          </span>
          <h1 className="text-4xl font-semibold text-white">Your church media workspace and brand kit manager.</h1>
          <p className="text-lg text-slate-300">Track AI credits, access saved templates, manage branding assets, and coordinate design work across your ministry team.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {cards.map((card) => (
            <article key={card.title} className="rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-glow">
              <h2 className="text-2xl font-semibold text-white">{card.title}</h2>
              <p className="mt-4 text-slate-300">{card.description}</p>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  );
}
