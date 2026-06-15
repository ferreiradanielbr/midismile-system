import { createClient as createSupabaseClient } from '@supabase/supabase-js';

/**
 * Privileged Supabase client using the service role key. Bypasses RLS.
 * SERVER-ONLY — never import this from a Client Component. Use only in Route
 * Handlers / Server Actions for trusted operations (e.g. persisting chat
 * messages, writing qualified leads).
 */
export function createAdminClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: { persistSession: false, autoRefreshToken: false },
    },
  );
}
