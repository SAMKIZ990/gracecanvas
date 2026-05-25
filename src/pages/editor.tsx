import { Layout } from '@/components/Layout';

export default function Editor() {
  return (
    <Layout title="Editor Workspace">
      <section className="space-y-6">
        <div className="max-w-3xl space-y-4">
          <span className="inline-flex rounded-full bg-violet-500/15 px-4 py-2 text-sm font-semibold uppercase tracking-[0.24em] text-violet-200">
            Editor Workspace
          </span>
          <h1 className="text-4xl font-semibold text-white">Canvas tools for drag-and-drop church poster creation.</h1>
          <p className="text-lg text-slate-300">Build cinematic designs with smart layers, snapping guides, editable text blocks, and live style presets.</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-glow">
            <h2 className="text-2xl font-semibold text-white">Editor features</h2>
            <ul className="mt-5 space-y-4 text-slate-300">
              <li className="rounded-2xl bg-slate-950/70 px-4 py-4">Upload reference art & AI style analysis</li>
              <li className="rounded-2xl bg-slate-950/70 px-4 py-4">Drag, resize, rotate, and align elements</li>
              <li className="rounded-2xl bg-slate-950/70 px-4 py-4">Gradient overlays, glow, blur, and masks</li>
              <li className="rounded-2xl bg-slate-950/70 px-4 py-4">Export multi-format social and print-ready assets</li>
            </ul>
          </div>

          <article className="rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-glow">
            <h2 className="text-2xl font-semibold text-white">Live canvas preview</h2>
            <div className="mt-6 rounded-[28px] border border-white/10 bg-gradient-to-br from-slate-900 via-slate-950 to-violet-950 p-8">
              <div className="rounded-3xl bg-slate-900/80 p-6 text-slate-50">
                <p className="text-sm uppercase tracking-[0.24em] text-violet-200">Poster canvas</p>
                <h3 className="mt-4 text-3xl font-semibold">Grace Ministry Conference</h3>
                <p className="mt-4 text-slate-300">An evening of worship, prayer, and revival with keynote speakers.</p>
                <p className="mt-6 text-sm text-slate-400">Sat, Sep 14 · 5PM · Kingdom Center</p>
              </div>
            </div>
            <div className="mt-5 rounded-2xl bg-slate-950/70 px-4 py-3 text-slate-300">Layers · effects · templates · exports</div>
          </article>
        </div>
      </section>
    </Layout>
  );
}
