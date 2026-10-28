/**
 * Server-only Supabase public config.
 * Lovable reserves VITE_* (build) and SUPABASE_* (their managed integration).
 * Use these secrets instead:
 *   KITCHFLOW_SUPABASE_URL
 *   KITCHFLOW_SUPABASE_ANON_KEY
 */
export function readSupabasePublicConfig(): { url: string; anonKey: string } {
  const url = process.env.KITCHFLOW_SUPABASE_URL?.trim() ?? "";
  const anonKey = process.env.KITCHFLOW_SUPABASE_ANON_KEY?.trim() ?? "";

  if (!url || !anonKey) {
    throw new Error(
      "Missing KITCHFLOW_SUPABASE_URL or KITCHFLOW_SUPABASE_ANON_KEY. Add them as Lovable secrets.",
    );
  }

  return { url, anonKey };
}
