import "server-only";
import { createClient } from "@supabase/supabase-js";

// Server-only client — uses the service role key to bypass RLS for
// inserting form submissions from anonymous visitors. Never import this
// from a "use client" component.
export function getSupabaseAdmin() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    throw new Error("Supabase server credentials are not configured.");
  }

  return createClient(supabaseUrl, supabaseServiceRoleKey);
}
