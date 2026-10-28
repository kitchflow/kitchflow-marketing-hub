import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import type { FormEvent } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getSupabase } from "@/lib/supabase";
import { SITE_URL } from "@/lib/seo";

const searchSchema = z.object({
  redirect: z.string().optional().catch("/"),
});

export const Route = createFileRoute("/login")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Sign in | KitchFlow" },
      { name: "robots", content: "noindex, nofollow" },
      { name: "description", content: "Sign in to connect AI assistants to your KitchFlow kitchen." },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/login` }],
  }),
  component: LoginPage,
});

function isSafeRedirect(value: string): boolean {
  return value.startsWith("/") && !value.startsWith("//");
}

function LoginPage() {
  const { redirect: redirectParam } = Route.useSearch();
  const redirect = redirectParam && isSafeRedirect(redirectParam) ? redirectParam : "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const supabase = await getSupabase();
      const { error: signError } = await supabase.auth.signInWithPassword({ email, password });
      if (signError) {
        setError(signError.message);
        return;
      }
      window.location.assign(redirect);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign-in failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="flex min-h-[70vh] items-center justify-center px-5 py-16">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="font-[family-name:var(--font-display)] text-2xl">
            Sign in to KitchFlow
          </CardTitle>
          <CardDescription>Use the same email and password as the mobile app.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error ? <p className="text-sm text-destructive">{error}</p> : null}
            <Button type="submit" className="w-full rounded-full" disabled={loading}>
              {loading ? "Signing in…" : "Sign in"}
            </Button>
          </form>
          <p className="mt-4 text-sm text-muted-foreground">
            <Link to="/" className="text-primary hover:underline">
              Back home
            </Link>
          </p>
        </CardContent>
      </Card>
    </section>
  );
}
