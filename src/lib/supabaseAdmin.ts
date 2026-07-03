import { createClient } from "@supabase/supabase-js";

// Server-only client — uses the service role key to bypass RLS for
// inserting form submissions from anonymous visitors. Never import this
// from a "use client" component.
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);
