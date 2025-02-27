import { createSafeActionClient } from 'next-safe-action';

import { createSupabaseServerClient } from '@/lib/supabase/server';

export const safeActionClient = createSafeActionClient({
  defaultValidationErrorsShape: 'flattened',
  handleServerError: (error) => error.message,
});

export const authActionClient = safeActionClient.use(async ({ next }) => {
  const supabase = await createSupabaseServerClient();
  const { data: authUser, error } = await supabase.auth.getUser();
  if (error || !authUser) throw new Error('Unauthorized');
  return next({ ctx: { supabase, authUser } });
});
