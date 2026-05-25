import { Layout } from '@/components/Layout';

const templates = [
  { title: 'Sabbath Service', description: 'Minimal elegance for weekly worship, scripture themes, and church announcements.' },
  { title: 'Youth Week', description: 'Dynamic bold typography with contemporary street-style energy.' },
  { title: 'Revival Meetings', description: 'Cinematic lighting, layered textures, and premium headline structure.' },
  { title: 'Gospel Concerts', description: 'High-energy stage visuals built for social sharing and ticket promotion.' },
];

export default function Templates() {
  return (
    <Layout title="Template Marketplace">
      <section className="space-y-6">
        <div className="max-w-3xl space-y-4">
          <span className="inline-flex rounded-full bg-violet-500/15 px-4 py-2 text-sm font-semibold uppercase tracking-[0.24em] text-violet-200">
            Template Marketplace
          </span>
          <h1 className="text-4xl font-semibold text-white">Marketplace-ready church poster templates for every event.</h1>
          <p className="text-lg text-slate-300">Browse curated categories for revival meetings, worship nights, conferences, youth programs, gospel concerts and prayer gatherings.</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {templates.map((template) => (
            <article key={template.title} className="rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-glow transition hover:border-violet-400/20">
              <h2 className="text-2xl font-semibold text-white">{template.title}</h2>
              <p className="mt-4 text-slate-300">{template.description}</p>
              <div className="mt-6 inline-flex rounded-full bg-slate-900/80 px-4 py-2 text-sm text-slate-200">Remix instantly</div>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  );
}
