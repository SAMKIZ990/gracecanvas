import { Layout } from '@/components/Layout';

const tiles = [
  { title: 'User Management', description: 'View active teams, subscription tiers, and role permissions across accounts.' },
  { title: 'AI Credits', description: 'Monitor generation credit consumption, usage trends, and premium feature access.' },
  { title: 'Template Review', description: 'Approve new marketplace templates, categorize assets, and release updates.' },
];

export default function Admin() {
  return (
    <Layout title="Admin">
      <section className="space-y-6">
        <div className="max-w-3xl space-y-4">
          <span className="inline-flex rounded-full bg-violet-500/15 px-4 py-2 text-sm font-semibold uppercase tracking-[0.24em] text-violet-200">
            Admin
          </span>
          <h1 className="text-4xl font-semibold text-white">Enterprise admin controls for AI workflows and subscriptions.</h1>
          <p className="text-lg text-slate-300">Manage users, monitor credits, review generated campaigns, and configure marketplace templates.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {tiles.map((tile) => (
            <article key={tile.title} className="rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-glow">
              <h2 className="text-2xl font-semibold text-white">{tile.title}</h2>
              <p className="mt-4 text-slate-300">{tile.description}</p>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  );
}
