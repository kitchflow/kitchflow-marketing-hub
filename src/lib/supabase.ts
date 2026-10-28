import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

if (!url || !anonKey) {
  console.warn(
    "[kitchflow] Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY — OAuth login/consent will not work.",
  );
}

export const supabase = createClient(url ?? "", anonKey ?? "");
