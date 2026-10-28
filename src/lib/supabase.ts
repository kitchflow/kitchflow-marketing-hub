import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { getSupabasePublicConfig } from "@/lib/supabase.functions";

let clientPromise: Promise<SupabaseClient> | null = null;

/**
 * Browser Supabase client. Loads SUPABASE_URL + SUPABASE_ANON_KEY from the
 * server at runtime so values can live in Lovable secrets (no VITE_ prefix).
 */
export function getSupabase(): Promise<SupabaseClient> {
  if (!clientPromise) {
    clientPromise = getSupabasePublicConfig().then(({ url, anonKey }) =>
      createClient(url, anonKey),
    );
  }
  return clientPromise;
}
