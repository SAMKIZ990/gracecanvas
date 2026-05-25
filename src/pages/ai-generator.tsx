import { Layout } from '@/components/Layout';
import { useState } from 'react';

const fieldOrder = [
  { key: 'eventTitle', label: 'Event title', required: true },
  { key: 'theme', label: 'Theme' },
  { key: 'speaker', label: 'Speaker / guest artist' },
  { key: 'dateTime', label: 'Date & time', required: true },
  { key: 'venue', label: 'Venue', required: true },
  { key: 'bibleVerse', label: 'Bible verse' },
  { key: 'churchName', label: 'Church name', required: true },
  { key: 'mood', label: 'Branding mood' },
];

export default function AIGenerator() {
  const [form, setForm] = useState<Record<string, string>>({
    eventTitle: '',
    theme: '',
    speaker: '',
    dateTime: '',
    venue: '',
    bibleVerse: '',
    churchName: '',
    mood: '',
  });
  const [loading, setLoading] = useState(false);
  const [concept, setConcept] = useState<any>(null);
  const [selectedProvider, setSelectedProvider] = useState<'gemini' | 'openai'>('gemini');
  const [provider, setProvider] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function update(key: string, value: string) {
    setForm((s) => ({ ...s, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setWarning(null);
    setProvider(null);
    setConcept(null);

    // Basic client-side validation
    if (!form.eventTitle || !form.dateTime || !form.venue || !form.churchName) {
      setError('Please fill required fields: Event title, Date & time, Venue, Church name.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, provider: selectedProvider }),
      });

      const data = await res.json();
      if (res.ok && data.concept) {
        setConcept(data.concept);
        setProvider(data.provider ?? null);
        setWarning(data.warning ?? null);
      } else if (data.error) {
        setError(data.error);
      } else {
        setError('Unexpected response from AI endpoint.');
      }
    } catch (err: any) {
      setError(err?.message ?? 'Request failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Layout title="AI Poster Generator">
      <section className="space-y-6">
        <div className="max-w-3xl space-y-4">
          <span className="inline-flex rounded-full bg-violet-500/15 px-4 py-2 text-sm font-semibold uppercase tracking-[0.24em] text-violet-200">
            AI Generator
          </span>
          <h1 className="text-4xl font-semibold text-white">Generate church poster concepts from event details and reference styles.</h1>
          <p className="text-lg text-slate-300">Enter your event information and preferred mood, and GraceCanvas will suggest cinematic layouts, modern typographic hierarchy, and premium visual themes.</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <form onSubmit={handleSubmit} className="rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-glow">
            <h2 className="text-2xl font-semibold text-white">Input fields</h2>
            <p className="mt-4 text-slate-300">Fill event details to generate AI-powered poster concepts that feel tailored to your ministry.</p>

            <div className="mt-6 flex flex-wrap items-center gap-2">
              <span className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">Model</span>
              <button
                type="button"
                onClick={() => setSelectedProvider('gemini')}
                className={`rounded-full px-3 py-1 text-sm font-semibold ${selectedProvider === 'gemini' ? 'bg-violet-500 text-white' : 'bg-slate-900 text-slate-300 hover:bg-slate-800'}`}
              >
                Gemini
              </button>
              <button
                type="button"
                onClick={() => setSelectedProvider('openai')}
                className={`rounded-full px-3 py-1 text-sm font-semibold ${selectedProvider === 'openai' ? 'bg-violet-500 text-white' : 'bg-slate-900 text-slate-300 hover:bg-slate-800'}`}
              >
                OpenAI
              </button>
            </div>

            <div className="mt-6 grid gap-3">
              {fieldOrder.map((f) => (
                <label key={f.key} className="flex flex-col text-slate-300">
                  <span className="mb-1 text-sm">{f.label}{f.required ? ' *' : ''}</span>
                  <input
                    value={form[f.key]}
                    onChange={(e) => update(f.key, e.target.value)}
                    placeholder={f.label}
                    className="rounded-lg border border-white/5 bg-slate-950/70 px-3 py-2 text-white placeholder:text-slate-400"
                  />
                </label>
              ))}
            </div>

            <div className="mt-6 flex items-center gap-3">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center rounded-full bg-violet-500 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
              >
                {loading ? 'Generating…' : 'Generate concepts'}
              </button>
              {error && <p className="text-sm text-rose-400">{error}</p>}
            </div>
          </form>

          <div className="space-y-6">
            <article className="rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-glow min-h-[200px]">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between gap-4">
                  <h2 className="text-2xl font-semibold text-white">AI result</h2>
                  {provider && (
                    <span className="rounded-full bg-slate-800/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-200">
                      {provider === 'gemini' ? 'Gemini' : 'OpenAI'}
                    </span>
                  )}
                </div>
                {warning && <p className="rounded-2xl border border-amber-400/20 bg-amber-500/10 px-4 py-2 text-sm text-amber-100">{warning}</p>}
              </div>
              <div className="mt-4 text-slate-300">
                {!concept && <p className="italic text-slate-400">No concept generated yet. Fill the form and submit to see results.</p>}
                {concept && (
                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold text-white">{concept.title}</h3>
                    <p className="text-sm text-slate-300">{concept.subtitle}</p>
                    {concept.image && (
                      <div className="mt-3">
                        <img src={concept.image} alt={concept.title} className="max-w-full rounded" />
                      </div>
                    )}
                    <div className="mt-2">
                      <strong className="text-sm text-slate-300">Colors:</strong>
                      <div className="mt-2 flex gap-2">
                        {(concept.colorPalette || []).map((c: string, i: number) => (
                          <div key={i} className="h-8 w-8 rounded" style={{ background: c }} />
                        ))}
                      </div>
                    </div>
                    <pre className="mt-4 max-h-48 overflow-auto text-sm text-slate-300">{JSON.stringify(concept, null, 2)}</pre>
                  </div>
                )}
              </div>
            </article>
            <article className="rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-glow">
              <h2 className="text-2xl font-semibold text-white">Concept variations</h2>
              <p className="mt-4 text-slate-300">Receive multiple editable poster concepts so teams can choose the strongest visual direction fast.</p>
            </article>
          </div>
        </div>
      </section>
    </Layout>
  );
}
