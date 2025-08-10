## React Query data layer

We standardize on TanStack React Query for fetching, caching, and syncing server data. Query hooks live under `src/hooks/queries/*` and mutation hooks under `src/hooks/mutations/*`.

### Why `authQuery` exists

`src/lib/client/auth-query.ts` wraps a query handler to ensure:

- The user is authenticated (via Supabase `auth.getUser()`); otherwise it throws `Unauthorized`.
- Optional role checks using `options.userType` against `user.user_metadata.user_type`.
- Optional input validation using Zod (`options.paramsSchema`).
- A Supabase browser client is created and passed to the handler.

This centralizes auth/validation and keeps UI/query hooks clean and reusable.

### Query hooks live outside UI components

Keep hooks in their own files for reusability, separation of concerns, and easier testing.

```ts
// src/hooks/queries/sample.ts
import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '@/constants/query-keys';
import { authQuery } from '@/lib/client/auth-query';

export const useSample = () => {
  return useQuery({
    queryKey: [QueryKeys.SAMPLE],
    queryFn: authQuery(async ({ supabase }) => {
      const { data, error } = await supabase
        .from('sample')
        .select('*')
        .order('created_at');
      if (error) throw new Error(error.message);
      return data;
    }),
  });
};
```

### Query keys and invalidation

Use `QueryKeys` enum to avoid hardcoded strings and enable safe refactors and consistent invalidation.

```ts
// constructing a key with params
const key = [QueryKeys.USER, userId];

// invalidation example
queryClient.invalidateQueries({ queryKey: [QueryKeys.SAMPLE] });
```

Keys should be stable and descriptive. For parameterized queries, prefer array keys like `[QueryKeys.ENTITY, id, filters]`.

### Mutations (brief)

- Use `useMutation` for writes. Handle errors with `toast.error(error.message)` per our conventions.
- On success, invalidate affected queries using the same `QueryKeys` you used to fetch them.
