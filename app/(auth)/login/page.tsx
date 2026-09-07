"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);

    try {
      const result = await signIn("credentials", {
        email: formData.get("email"),
        password: formData.get("password"),
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password");
        setLoading(false);
      } else {
        router.push("/dashboard");
      }
    } catch {
      setError("Unable to sign in right now. Please try again.");
      setLoading(false);
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-zinc-950 px-4 py-12 text-zinc-100">
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-0 h-128 w-3xl -translate-x-1/2 rounded-full bg-indigo-500/10 blur-3xl" />
      <div className="relative w-full max-w-md rounded-3xl border border-white/10 bg-white/3.5 p-6 shadow-2xl shadow-indigo-950/30 backdrop-blur-sm sm:p-8">
        <div className="mb-8">
          <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-white text-sm font-bold text-zinc-950 shadow-lg shadow-white/10">
            A
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
          <p className="mt-2 text-sm leading-6 text-zinc-400">
            Sign in to your ApplyFlow account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5" aria-label="Sign in form">
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-zinc-300">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="you@example.com"
              className="w-full rounded-xl border border-white/10 bg-zinc-900/90 px-3.5 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 hover:border-white/20 focus:border-indigo-400/50 focus:ring-4 focus:ring-indigo-400/10 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-medium text-zinc-300">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              placeholder="••••••••"
              className="w-full rounded-xl border border-white/10 bg-zinc-900/90 px-3.5 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 hover:border-white/20 focus:border-indigo-400/50 focus:ring-4 focus:ring-indigo-400/10 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          {error && <p role="alert" className="rounded-lg border border-red-900/50 bg-red-950/30 px-3 py-2 text-sm text-red-300">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-white py-3 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-200 focus:outline-none focus:ring-4 focus:ring-indigo-400/20 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
        <div className="mt-6">
          <div className="relative flex items-center">
            <div className="flex-1 border-t border-white/10" />
            <span className="mx-3 text-xs text-zinc-500">or</span>
            <div className="flex-1 border-t border-white/10" />
          </div>

          <button
            type="button"
            disabled={loading || googleLoading}
            onClick={async () => {
              if (loading || googleLoading) return;
              setGoogleLoading(true);
              setError("");
              try {
                await signIn("google", { callbackUrl: "/dashboard" });
              } catch (err) {
                setError("Google sign-in failed.");
                setGoogleLoading(false);
              }
            }}
            className="mt-4 flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/3 px-4 py-2.5 text-sm font-medium text-zinc-300 transition-all hover:bg-white/[0.07] hover:text-white active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {googleLoading ? (
              <>
                <svg
                  className="animate-spin h-4 w-4 text-zinc-400"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <span>Connecting...</span>
              </>
            ) : (
              <>
                <svg
                  className="h-4 w-4 shrink-0"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                <span>Continue with Google</span>
              </>
            )}
          </button>
        </div>
        <p className="mt-6 text-center text-sm text-zinc-400">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-white hover:underline">
            Create one
          </Link>
        </p>
      </div>
    </main>
  );
}
