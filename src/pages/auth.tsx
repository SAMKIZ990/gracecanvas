import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import { Layout } from '@/components/Layout';

export default function Auth() {
  const router = useRouter();
  const [isSigningUp, setIsSigningUp] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const firstName = (formData.get('firstName') as string)?.trim() || '';
    const lastName = (formData.get('lastName') as string)?.trim() || '';
    const email = (formData.get('email') as string)?.trim() || '';
    const password = formData.get('password') as string || '';
    const confirmPassword = formData.get('confirmPassword') as string || '';

    if (!email || !password) {
      setError('Email and password are required.');
      setIsLoading(false);
      return;
    }

    if (isSigningUp) {
      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        setIsLoading(false);
        return;
      }
    }

    if (!isSigningUp) {
      const signInResult = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (!signInResult?.error) {
        router.push('/');
        return;
      }

      setError('Invalid email or password.');
      setIsLoading(false);
      return;
    }

    const name = [firstName, lastName].filter(Boolean).join(' ') || email.split('@')[0];
    const signupResponse = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });

    if (!signupResponse.ok) {
      const result = await signupResponse.json().catch(() => ({}));
      setError(result.error || 'Unable to sign you up.');
      setIsLoading(false);
      return;
    }

    const signInAfterSignup = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (!signInAfterSignup?.error) {
      router.push('/');
      return;
    }

    setError('Signed up successfully, but login failed. Please try again.');
    setIsLoading(false);
  }

  return (
    <Layout title="Authentication">
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-6 dark:bg-slate-950 sm:px-6">
        <div className="relative w-full max-w-[420px] overflow-hidden rounded-[40px] border border-slate-300 bg-white p-6 shadow-lg backdrop-blur-xl transition dark:border-white/10 dark:bg-slate-950/80 dark:shadow-[0_30px_120px_rgba(15,23,42,0.45)] sm:p-8">
          <button
            type="button"
            onClick={() => router.push('/')}
            className="absolute right-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-900 transition hover:bg-slate-200 dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
            aria-label="Close"
          >
            ✕
          </button>

          <div className="space-y-4 text-center">
            <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">{isSigningUp ? 'Sign up' : 'Welcome back'}</h1>
            <p className="text-sm leading-6 text-slate-600 dark:text-slate-400">
              {isSigningUp
                ? 'Create your account to start building your ministry workspace.'
                : 'Log in to access your brand kit, AI poster creator, and dashboard.'}
            </p>
          </div>

          <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
            {isSigningUp ? (
              <>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block text-sm text-slate-700 dark:text-slate-300">
                    <span className="mb-2 block">First name</span>
                    <input
                      name="firstName"
                      type="text"
                      placeholder="First name"
                      className="w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-violet-400 dark:border-white/10 dark:bg-slate-900/80 dark:text-white dark:placeholder-slate-500"
                    />
                  </label>
                  <label className="block text-sm text-slate-700 dark:text-slate-300">
                    <span className="mb-2 block">Last name</span>
                    <input
                      name="lastName"
                      type="text"
                      placeholder="Last name"
                      className="w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-violet-400 dark:border-white/10 dark:bg-slate-900/80 dark:text-white dark:placeholder-slate-500"
                    />
                  </label>
                </div>
                <label className="block text-sm text-slate-700 dark:text-slate-300">
                  <span className="mb-2 block">Email</span>
                  <input
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    className="w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-violet-400 dark:border-white/10 dark:bg-slate-900/80 dark:text-white dark:placeholder-slate-500"
                  />
                </label>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block text-sm text-slate-700 dark:text-slate-300">
                    <span className="mb-2 block">Birth date</span>
                    <input
                      name="birthDate"
                      type="date"
                      className="w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-violet-400 dark:border-white/10 dark:bg-slate-900/80 dark:text-white"
                    />
                  </label>
                  <label className="block text-sm text-slate-700 dark:text-slate-300">
                    <span className="mb-2 block">Phone number</span>
                    <input
                      name="phone"
                      type="tel"
                      placeholder="(123) 456-7890"
                      className="w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-violet-400 dark:border-white/10 dark:bg-slate-900/80 dark:text-white dark:placeholder-slate-500"
                    />
                  </label>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block text-sm text-slate-700 dark:text-slate-300">
                    <span className="mb-2 block">Password</span>
                    <input
                      name="password"
                      type="password"
                      placeholder="••••••••"
                      className="w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-violet-400 dark:border-white/10 dark:bg-slate-900/80 dark:text-white dark:placeholder-slate-500"
                    />
                  </label>
                  <label className="block text-sm text-slate-700 dark:text-slate-300">
                    <span className="mb-2 block">Confirm password</span>
                    <input
                      name="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      className="w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-violet-400 dark:border-white/10 dark:bg-slate-900/80 dark:text-white dark:placeholder-slate-500"
                    />
                  </label>
                </div>
              </>
            ) : (
              <>
                <label className="block text-sm text-slate-700 dark:text-slate-300">
                  <span className="mb-2 block">Email</span>
                  <input
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    className="w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-violet-400 dark:border-white/10 dark:bg-slate-900/80 dark:text-white dark:placeholder-slate-500"
                  />
                </label>
                <label className="block text-sm text-slate-700 dark:text-slate-300">
                  <span className="mb-2 block">Password</span>
                  <input
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    className="w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-violet-400 dark:border-white/10 dark:bg-slate-900/80 dark:text-white dark:placeholder-slate-500"
                  />
                </label>
              </>
            )}

            {error ? <p className="text-sm text-rose-600 dark:text-rose-400">{error}</p> : null}

            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full items-center justify-center rounded-full bg-gradient-to-r from-slate-900 to-violet-600 px-6 py-3 text-sm font-semibold text-white transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60 dark:from-slate-800"
            >
              {isLoading ? 'Working…' : isSigningUp ? 'Sign Up' : 'Log In'}
            </button>
          </form>

          <div className="mt-4 flex flex-col gap-3 text-sm text-slate-600 transition sm:flex-row sm:items-center sm:justify-between dark:text-slate-400">
            <span>{isSigningUp ? 'Already have an account?' : 'New here?'}</span>
            <button
              type="button"
              onClick={() => {
                setError(null);
                setIsSigningUp(!isSigningUp);
              }}
              className="font-semibold text-slate-900 transition hover:text-violet-600 dark:text-white dark:hover:text-violet-300"
            >
              {isSigningUp ? 'Log In' : 'Sign Up'}
            </button>
          </div>

          <div className="my-6 flex items-center gap-3 text-xs text-slate-500 before:block before:h-px before:flex-1 before:bg-slate-300 after:block after:h-px after:flex-1 after:bg-slate-300 dark:text-slate-500 dark:before:bg-slate-700 dark:after:bg-slate-700">
            or
          </div>

          <button
            type="button"
            onClick={() => signIn('google', { callbackUrl: '/' })}
            className="inline-flex w-full items-center justify-center gap-3 rounded-full border border-slate-300 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100 dark:border-white/10 dark:bg-slate-900/90 dark:text-white dark:hover:bg-slate-800"
          >
            <span>{isSigningUp ? 'Sign up with Google' : 'Continue with Google'}</span>
          </button>
        </div>
      </div>
    </Layout>
  );
}