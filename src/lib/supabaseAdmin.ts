import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Server-only client — uses the service role key to bypass RLS for
// inserting form submissions from anonymous visitors. Never import this
// from a "use client" component.
//
// Created lazily via a factory rather than at module scope: the service role
// key is a build-time-unavailable secret on Netlify, so constructing the
// client at import time throws ("supabaseKey is required.") during Next's
// build-time page-data collection. Calling this inside a request handler
// defers construction to runtime, where the env vars are present.
let cached: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient {
  if (cached) return cached;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error(
      "Supabase admin client env vars are missing (NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY)."
    );
  }

  cached = createClient(url, key);
  return cached;
}
