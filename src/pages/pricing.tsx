import { Layout } from '@/components/Layout';

const plans = [
  { title: 'Free', description: 'Basic editor access, upload references, and social export.', perks: ['5 poster exports / month', 'AI style analysis', 'Editable templates'] },
  { title: 'Pro', description: 'Premium workflows, high-resolution export, and advanced AI concepts.', perks: ['Unlimited designs', 'PNG/JPG/PDF export', 'Story + thumbnail generation'] },
  { title: 'Team', description: 'Shared brand systems, workspace collaboration, and marketplace access.', perks: ['Brand kit manager', 'Shared assets', 'Custom templates'] },
];

export default function Pricing() {
  return (
    <Layout title="Pricing">
      <section className="space-y-6">
        <div className="max-w-3xl space-y-4">
          <span className="inline-flex rounded-full bg-violet-500/15 px-4 py-2 text-sm font-semibold uppercase tracking-[0.24em] text-violet-200">
            Pricing
          </span>
          <h1 className="text-4xl font-semibold text-white">Flexible plans for ministries, creatives, and church media teams.</h1>
          <p className="text-lg text-slate-300">Choose a plan that scales from free creative explorations to premium AI generation, team collaboration, and branded design systems.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <article key={plan.title} className="rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-glow">
              <h2 className="text-2xl font-semibold text-white">{plan.title}</h2>
              <p className="mt-4 text-slate-300">{plan.description}</p>
              <ul className="mt-6 space-y-3 text-slate-300">
                {plan.perks.map((perk) => (
                  <li key={perk} className="rounded-2xl bg-slate-950/70 px-4 py-3">{perk}</li>
                ))}
              </ul>
              <button className="mt-8 w-full rounded-full bg-gradient-to-r from-slate-800 to-violet-600 px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90">
                Choose {plan.title}
              </button>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  );
}
