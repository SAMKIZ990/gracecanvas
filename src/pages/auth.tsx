import { Layout } from '@/components/Layout';

export default function Auth() {
  return (
    <Layout title="Authentication">
      <section className="mx-auto max-w-2xl space-y-8 rounded-[32px] border border-white/10 bg-white/5 p-10 shadow-glow">
        <div className="space-y-4">
          <span className="inline-flex rounded-full bg-violet-500/15 px-4 py-2 text-sm font-semibold uppercase tracking-[0.24em] text-violet-200">
            Authenticate
          </span>
          <h1 className="text-4xl font-semibold text-white">Sign in or create your ministry workspace.</h1>
          <p className="text-lg text-slate-300">Use Google or email to get instant access to your brand kit, AI poster generator, and team dashboard.</p>
        </div>

        <div className="space-y-4">
          <button className="w-full rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100">Continue with Google</button>
          <button className="w-full rounded-full border border-white/10 bg-slate-950/80 px-6 py-3 text-sm text-white transition hover:border-violet-400/30">Continue with Email</button>
        </div>

        <form className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">Email</label>
            <input type="email" placeholder="you@example.com" className="w-full rounded-3xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none transition focus:border-violet-400" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">Password</label>
            <input type="password" placeholder="••••••••" className="w-full rounded-3xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none transition focus:border-violet-400" />
          </div>
          <button type="submit" className="w-full rounded-full bg-gradient-to-r from-slate-800 to-violet-600 px-6 py-3 text-sm font-semibold text-white transition hover:opacity-95">
            Sign In
          </button>
        </form>
      </section>
    </Layout>
  );
}
