## Server actions and database access

This section complements the data layer docs by focusing on server-side execution and DB access conventions.

### Choosing between actions and mutations

- If the server code is a Next.js Server Action created via `safeActionClient`/`authActionClient`, consume it with `useAction`.
- If it is a plain server function or endpoint (not using `safeActionClient`), consume it with React Query `useMutation`.
- See `docs/data/mutations-and-actions.md` for detailed error handling rules.

### Authenticated actions

- Use `authActionClient` for actions that must be executed by a logged-in user. It initializes a server Supabase client and throws if the user is not authenticated.
- Keep Zod schemas in `src/schema/<entity>.ts` (camelCase constants; types inferred alongside).

Example shape:

```ts
// src/actions/items.ts
import { authActionClient } from '@/lib/server/safe-action';
import { saveItemInput } from '@/schema/items';

export const saveItem = authActionClient
  .schema(saveItemInput)
  .action(async ({ parsedInput, ctx }) => {
    const { supabase, authUser } = ctx;
    // ... perform DB write using supabase client
    return { success: true };
  });
```

### SSR data fetching with Supabase

- Use `createSupabaseServerClient()` in server components/loaders for SSR-safe queries.
- Avoid heavy DB calls in middleware; prefer `user_metadata` flags for route checks.

```ts
// Example in a Server Component (concept)
import { createSupabaseServerClient } from '@/lib/supabase/server';

export default async function Page() {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.from('items').select('*').limit(10);
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
```

### RLS guidance

- Keep RLS enabled; design policies to authorize reads/writes based on `auth.uid()` and row ownership.
- Use the service role key sparingly for server-only maintenance or complex administrative flows.
