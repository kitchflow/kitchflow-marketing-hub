import { createServerFn } from "@tanstack/react-start";
import { readSupabasePublicConfig } from "@/lib/supabase.server";

/** Exposes public Supabase URL + anon key to the browser at runtime (not build time). */
export const getSupabasePublicConfig = createServerFn({ method: "GET" }).handler(() => {
  return readSupabasePublicConfig();
});
