import { createBrowserClient } from '@supabase/ssr';

// Client-side Supabase client for use in browser/client components
export function createSupabaseClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
