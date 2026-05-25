import { Layout } from '@/components/Layout';

const items = [
  { title: 'Brand Colors', description: 'Save primary, secondary, and accent palettes for every church brand and event theme.' },
  { title: 'Logo Kits', description: 'Upload church logos, watermark marks, and ministry seals for instant access in every design.' },
  { title: 'Typography', description: 'Store headline and body font presets that reflect gospel, luxury, and cinematic styles.' },
];

export default function BrandKit() {
  return (
    <Layout title="Brand Kit">
      <section className="space-y-6">
        <div className="max-w-3xl space-y-4">
          <span className="inline-flex rounded-full bg-violet-500/15 px-4 py-2 text-sm font-semibold uppercase tracking-[0.24em] text-violet-200">
            Brand Kit
          </span>
          <h1 className="text-4xl font-semibold text-white">Save church branding assets and reusable style systems.</h1>
          <p className="text-lg text-slate-300">Create color palettes, logo kits, font combinations, and overlay styles for consistent campaigns across your ministry.</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {items.map((item) => (
            <article key={item.title} className="rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-glow">
              <h2 className="text-2xl font-semibold text-white">{item.title}</h2>
              <p className="mt-4 text-slate-300">{item.description}</p>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  );
}
