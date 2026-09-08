"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
        setLoading(false);
        return;
      }

      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Account created but sign in failed. Try logging in.");
        setLoading(false);
      } else {
        router.push("/dashboard");
      }
    } catch {
      setError("Unable to create your account right now. Please try again.");
      setLoading(false);
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-zinc-950 px-4 py-6 text-zinc-100">
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-0 h-128 w-3xl -translate-x-1/2 rounded-full bg-indigo-500/10 blur-3xl" />
      <div className="relative w-full max-w-md rounded-3xl border border-white/10 bg-white/3.5 p-5 shadow-2xl shadow-indigo-950/30 backdrop-blur-sm sm:p-6">
        <div className="mb-5">
          <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white text-sm font-bold text-zinc-950 shadow-lg shadow-white/10">A</div>
          <h1 className="text-2xl font-semibold tracking-tight">Create your account</h1>
          <p className="mt-2 text-sm leading-6 text-zinc-400">Start tracking your job search with ApplyFlow</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5" aria-label="Create account form">
          <div>
            <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-zinc-300">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              placeholder="Your name"
              className="w-full rounded-xl border border-white/10 bg-zinc-900/90 px-3.5 py-2.5 text-sm text-white outline-none transition placeholder:text-zinc-600 hover:border-white/20 focus:border-indigo-400/50 focus:ring-4 focus:ring-indigo-400/10"
            />
          </div>
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-zinc-300">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="you@example.com"
              className="w-full rounded-xl border border-white/10 bg-zinc-900/90 px-3.5 py-2.5 text-sm text-white outline-none transition placeholder:text-zinc-600 hover:border-white/20 focus:border-indigo-400/50 focus:ring-4 focus:ring-indigo-400/10"
            />
          </div>
          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-zinc-300">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              placeholder="At least 6 characters"
              className="w-full rounded-xl border border-white/10 bg-zinc-900/90 px-3.5 py-2.5 text-sm text-white outline-none transition placeholder:text-zinc-600 hover:border-white/20 focus:border-indigo-400/50 focus:ring-4 focus:ring-indigo-400/10"
            />
          </div>

          {error && <p role="alert" className="rounded-lg border border-red-900/50 bg-red-950/30 px-3 py-2 text-sm text-red-300">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-white py-3 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-200 focus:outline-none focus:ring-4 focus:ring-indigo-400/20 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>
        <div className="mt-4">
          <div className="relative flex items-center">
            <div className="flex-1 border-t border-white/10" />
            <span className="mx-3 text-xs text-zinc-500">or</span>
            <div className="flex-1 border-t border-white/10" />
          </div>

          <button
            type="button"
            disabled={googleLoading}
            onClick={async () => {
              setGoogleLoading(true);
              await signIn("google", { callbackUrl: "/dashboard" });
            }}
            className="mt-3 w-full cursor-pointer rounded-lg border border-white/10 bg-white/3 px-4 py-2.5 text-sm font-medium text-zinc-300 transition-all hover:bg-white/[0.07] hover:text-white active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {googleLoading ? "Redirecting..." : "Continue with Google"}
          </button>
        </div>
        <p className="mt-4 text-center text-sm text-zinc-400">
          Already have an account?{" "}
          <Link href="/login" className="text-white hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}