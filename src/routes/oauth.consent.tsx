import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/lib/supabase";
import { SITE_URL } from "@/lib/seo";

const searchSchema = z.object({
  authorization_id: z.string().optional().catch(undefined),
});

type AuthDetails = {
  client?: { name?: string; client_id?: string };
  redirect_uri?: string;
  scope?: string;
  redirect_url?: string;
  authorization_id?: string;
};

export const Route = createFileRoute("/oauth/consent")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Authorize AI assistant | KitchFlow" },
      { name: "robots", content: "noindex, nofollow" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/oauth/consent` }],
  }),
  component: ConsentPage,
});

function ConsentPage() {
  const navigate = useNavigate();
  const { authorization_id: authorizationId } = Route.useSearch();

  const [details, setDetails] = useState<AuthDetails | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [acting, setActing] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      if (!authorizationId) {
        setError("Missing authorization_id");
        setLoading(false);
        return;
      }

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        const redirect = `/oauth/consent?authorization_id=${encodeURIComponent(authorizationId)}`;
        void navigate({
          to: "/login",
          search: { redirect },
        });
        return;
      }

      const { data, error: detailsError } =
        await supabase.auth.oauth.getAuthorizationDetails(authorizationId);

      if (cancelled) return;

      if (detailsError) {
        setError(detailsError.message);
        setLoading(false);
        return;
      }

      const payload = data as AuthDetails;
      if (payload?.redirect_url && !payload.authorization_id) {
        window.location.href = payload.redirect_url;
        return;
      }

      setDetails(payload);
      setLoading(false);
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, [authorizationId, navigate]);

  async function approve() {
    if (!authorizationId) return;
    setActing(true);
    const { data, error: approveError } =
      await supabase.auth.oauth.approveAuthorization(authorizationId);
    setActing(false);
    if (approveError) {
      setError(approveError.message);
      return;
    }
    window.location.href = (data as { redirect_url: string }).redirect_url;
  }

  async function deny() {
    if (!authorizationId) return;
    setActing(true);
    const { data, error: denyError } =
      await supabase.auth.oauth.denyAuthorization(authorizationId);
    setActing(false);
    if (denyError) {
      setError(denyError.message);
      return;
    }
    window.location.href = (data as { redirect_url: string }).redirect_url;
  }

  if (loading) {
    return (
      <section className="flex min-h-[70vh] items-center justify-center px-5 py-16">
        <Card className="w-full max-w-md">
          <CardContent className="py-10 text-center text-muted-foreground">
            Loading authorization…
          </CardContent>
        </Card>
      </section>
    );
  }

  if (error) {
    return (
      <section className="flex min-h-[70vh] items-center justify-center px-5 py-16">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Authorization error</CardTitle>
            <CardDescription className="text-destructive">{error}</CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/" className="text-sm text-primary hover:underline">
              Back home
            </Link>
          </CardContent>
        </Card>
      </section>
    );
  }

  const clientName = details?.client?.name || "AI assistant";
  const scopes = (details?.scope || "").split(" ").filter(Boolean);

  return (
    <section className="flex min-h-[70vh] items-center justify-center px-5 py-16">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="font-[family-name:var(--font-display)] text-2xl">
            Connect {clientName} to KitchFlow
          </CardTitle>
          <CardDescription>
            This lets the assistant read your kitchen data (inventory, tasks, shifts, staff,
            shopping list, waste) as you. It cannot change data in this version.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {details?.redirect_uri ? (
            <p className="break-all text-sm text-muted-foreground">
              Redirect: <code className="rounded bg-muted px-1.5 py-0.5 text-xs">{details.redirect_uri}</code>
            </p>
          ) : null}
          {scopes.length > 0 ? (
            <div>
              <p className="mb-2 text-sm font-medium">Requested scopes</p>
              <ul className="list-inside list-disc text-sm text-muted-foreground">
                {scopes.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
          ) : null}
          <div className="flex flex-wrap gap-3 pt-2">
            <Button className="rounded-full" onClick={() => void approve()} disabled={acting}>
              Approve
            </Button>
            <Button
              variant="outline"
              className="rounded-full"
              onClick={() => void deny()}
              disabled={acting}
            >
              Deny
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
