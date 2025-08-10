## Supabase clients and auth patterns

This project uses Supabase on both the browser and server with session persistence handled by middleware. Row Level Security (RLS) is enabled by default; only use the service role key to bypass complex RLS cases, and never in the browser.

### Middleware and route protection

`src/lib/supabase/middleware.ts` refreshes the session on each navigation. Document wiring it in `src/middleware.ts` with `updateSession(request)`.

Guidelines:

- Avoid calling `supabase.from(table)` in middleware; it adds a DB call on every route change and slows the app.
- Prefer using `user_metadata` to store lightweight flags you need in middleware (e.g., role) rather than fetching from DB.
- Middleware can be used for lightweight route protection checks (e.g., deny access if no session) without redirects per app policy.

### Auth patterns

- Queries: use `authQuery()` to ensure the user is authenticated (and optionally has the right role) before executing the query handler. This keeps UI hooks clean.

```ts
// src/hooks/queries/sample.ts
import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '@/constants/query-keys';
import { authQuery } from '@/lib/client/auth-query';

export const useSample = () =>
  useQuery({
    queryKey: [QueryKeys.SAMPLE],
    queryFn: authQuery(async ({ supabase }) => {
      const { data, error } = await supabase.from('sample').select('*');
      if (error) throw new Error(error.message);
      return data;
    }),
  });
```

- Server actions: use `authActionClient` when an action must only run for logged‑in users.

```ts
// src/lib/server/safe-action.ts (concept)
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
```

Use `authActionClient` for authenticated operations; for public server actions use `safeActionClient` directly.

### RLS and service role

- Keep RLS enabled by default.
- Only use the service role key on the server to bypass complex RLS cases where absolutely necessary.
- Never expose the service role key to the client.
