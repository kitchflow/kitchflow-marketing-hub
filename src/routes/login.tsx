import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import type { FormEvent } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getSupabase } from "@/lib/supabase";
import { SITE_URL } from "@/lib/seo";

const searchSchema = z.object({
  /** Full in-app path, e.g. /oauth/consent?authorization_id=… */
  redirect: z.string().optional(),
  /** Preferred OAuth return — avoids stuffing ? into the redirect search param */
  authorization_id: z.string().optional(),
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
  return value.startsWith("/") && !value.startsWith("//") && !value.includes("://");
}

function resolvePostLoginHref(search: {
  redirect?: string;
  authorization_id?: string;
}): string {
  if (search.authorization_id) {
    return `/oauth/consent?authorization_id=${encodeURIComponent(search.authorization_id)}`;
  }
  if (search.redirect && isSafeRedirect(search.redirect)) {
    return search.redirect;
  }
  return "/";
}

function LoginPage() {
  const search = Route.useSearch();
  const nextHref = resolvePostLoginHref(search);
  const returningToOauth = Boolean(search.authorization_id) || nextHref.startsWith("/oauth/consent");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [signedIn, setSignedIn] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const supabase = await getSupabase();
      const { data, error: signError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (signError) {
        setError(signError.message);
        return;
      }
      if (!data.session) {
        setError("Signed in, but no session was returned. Try again.");
        return;
      }

      setSignedIn(true);
      toast.success(
        returningToOauth ? "Signed in — continuing authorization…" : "Signed in successfully",
      );

      // Hard navigate so the next page picks up the persisted session.
      window.location.assign(nextHref);
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
          <CardDescription>
            {returningToOauth
              ? "Sign in with your app account to authorize the AI assistant."
              : "Use the same email and password as the mobile app."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {signedIn ? (
            <p className="text-sm text-muted-foreground">
              Signed in. Redirecting…
              {!returningToOauth ? (
                <>
                  {" "}
                  <Link to="/" className="text-primary hover:underline">
                    Go home
                  </Link>
                </>
              ) : null}
            </p>
          ) : (
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
          )}
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
