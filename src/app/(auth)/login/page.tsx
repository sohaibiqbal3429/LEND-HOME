"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const [email, setEmail] = useState("admin@leadin.com");
  const [password, setPassword] = useState("admin123");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signIn("credentials", { email, password, callbackUrl: "/admin" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container space-y-8 py-16">
      <h1 className="text-3xl font-display text-charcoal">Log in to LENDLY</h1>
      <form onSubmit={onSubmit} className="max-w-md space-y-4">
        <div>
          <label className="text-sm font-medium text-slate-700">Email</label>
          <input
            className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus:border-primary"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700">Password</label>
          <input
            className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus:border-primary"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-2xl bg-primary px-4 py-3 font-medium text-white shadow-soft transition hover:bg-primary/90"
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
      <p className="text-sm text-slate-600">Use admin@leadin.com / admin123 for local admin access.</p>
    </div>
  );
}
