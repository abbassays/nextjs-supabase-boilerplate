## Directory structure

High-level rule: technical layer first, then feature layer. Place code in the technical area (components, hooks, actions, schema, etc.), then group by feature inside it.

Example tree:

```
src/
  app/
  components/
    ui/                    # shadcn UI primitives
    common/                # shared across ≥ 2 features
    listings/              # feature-scoped UI
      listing-card.tsx
  hooks/
    use-mobile.ts
    queries/
      user.ts
    mutations/
      user.ts
    actions/
      users.ts
  actions/
    users.ts               # server actions grouped by table/domain
  schema/
    users.ts               # Zod schemas per entity/domain
  lib/
    supabase/
      client.ts
      server.ts
      middleware.ts
    utils.ts               # cn()
    server/                # server-only helpers
    client/                # client-only helpers
  utils/
    date-functions.ts
    number-functions.ts
    string-functions.ts
    logger.ts
    show-error-toast.ts
  constants/
    query-keys.ts
    paths.ts
  types/
    supabase.ts            # generated
    user.ts                # app-defined types (not Zod-derived)
```

### Placement rules

- UI components

  - `src/components/ui`: shadcn-specific primitives.
  - `src/components/common`: reusable across the app or ≥ 2 features.
  - Feature-only: `src/components/<feature>/<component>.tsx`.
  - Kebab-case for all filenames; explicit names (no index.tsx).

- Hooks

  - Generic hooks: `src/hooks/*` (e.g., `use-mobile.ts`).
  - React Query: `src/hooks/queries/*` and `src/hooks/mutations/*`.
  - next-safe-action hooks: `src/hooks/actions/*`.
  - Naming: must start with `use...`. One file can expose multiple related hooks.

- Server actions

  - Group by table/domain: `src/actions/<table>.ts` with all related actions exported.
  - Zod input schemas live in the relevant `src/schema/<entity>.ts` file, not in the actions file.

- Schemas

  - Zod schemas per entity/domain in `src/schema/<entity>.ts`. Co-locate entity-related types here if they’re Zod-derived.

- Lib vs Utils

  - `src/lib/*`: third-party integrations and framework glue (Supabase clients, next-safe-action setup, SSR helpers, app-level utilities like `cn`).
  - `src/utils/*`: cross‑cutting pure helpers (date/number/string formatting, logger, error toast). Prefer using these instead of ad-hoc helpers.

- Constants and Types
  - `src/constants/*`: shared constants (no need for UPPER_SNAKE_CASE; use clear naming). Files are kebab-case.
  - `src/types/*`: app-defined shared types. If a type is derived from Zod (`z.infer`), keep it alongside its schema in `src/schema/*`.

### Examples

Component placement:

```tsx
// src/components/listings/listing-card.tsx
export default function ListingCard() {
  return <article className='rounded border p-4'>Listing</article>;
}
```

Query hook:

```ts
// src/hooks/queries/user.ts
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/query-keys';

export function useUser(userId: string) {
  return useQuery({
    queryKey: [QUERY_KEYS.user, userId],
    queryFn: async () => {
      // fetch user...
      return { id: userId };
    },
  });
}
```

Mutation hook:

```ts
// src/hooks/mutations/user.ts
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useUpdateUser() {
  return useMutation({
    mutationFn: async (input: { id: string }) => {
      // update user...
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}
```

Action hook (next-safe-action):

```ts
// src/hooks/actions/users.ts
import { useAction } from 'next-safe-action/hooks';
import { onError } from '@/lib/show-error-toast';
import { updateUser } from '@/actions/users';

export function useUpdateUserAction() {
  return useAction(updateUser, { onError });
}
```

Server actions grouped by table/domain:

```ts
// src/actions/users.ts
import { actionClient } from '@/lib/server/safe-action';
import { updateUserInput } from '@/schema/users';

export const updateUser = actionClient
  .schema(updateUserInput)
  .action(async ({ parsedInput }) => {
    // perform update on users table
    return { success: true };
  });

export const deleteUser = actionClient
  .schema(/* ... */)
  .action(async ({ parsedInput }) => {
    // delete user
  });
```

Zod schema with derived types kept here:

```ts
// src/schema/users.ts
import { z } from 'zod';

export const updateUserInput = z.object({ id: z.string() });
export type UpdateUserInput = z.infer<typeof updateUserInput>;
```
