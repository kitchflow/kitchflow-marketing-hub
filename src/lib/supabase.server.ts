/**
 * Server-only Supabase public config.
 * Set as Lovable/hosting secrets (no VITE_ prefix):
 *   SUPABASE_URL
 *   SUPABASE_ANON_KEY
 *
 * Same names work for future server routes, Edge calls, etc.
 */
export function readSupabasePublicConfig(): { url: string; anonKey: string } {
  const url = process.env.SUPABASE_URL?.trim() ?? "";
  const anonKey = process.env.SUPABASE_ANON_KEY?.trim() ?? "";

  if (!url || !anonKey) {
    throw new Error(
      "Missing SUPABASE_URL or SUPABASE_ANON_KEY. Add them as hosting secrets (not VITE_*).",
    );
  }

  return { url, anonKey };
}
