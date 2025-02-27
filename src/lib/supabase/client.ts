import { createBrowserClient } from '@supabase/ssr';

import { env } from '@/env';

import { Database } from '@/types/supabase';

export function createSupabaseBrowserClient() {
  return createBrowserClient<Database>(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}
