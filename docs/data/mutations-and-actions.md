## Mutations vs Actions

We use two patterns for writes:

- `useMutation` (React Query) for calling simple server functions or REST/RPC endpoints.
- `useAction` (next-safe-action) for calling Next.js Server Actions created with `safeActionClient`.

### When to use which

- If the server code is a Next.js Server Action created via `safeActionClient`, use `useAction`.
- If it is a plain server function/endpoint (or not using `safeActionClient`), use `useMutation`.

### `useAction` pattern

- Server action validates input (Zod) and throws on error.
- Client uses `useAction(action, { onSuccess, onError })`.
- For errors, rely on `onError` and the shared `onError` handler from `src/lib/show-error-toast.ts`.

```ts
// client
import { useAction } from 'next-safe-action/hooks';
import { onError } from '@/lib/show-error-toast';
import { createItem } from '@/actions/items';

const createItemAction = useAction(createItem, {
  onSuccess: () => queryClient.invalidateQueries({ queryKey: [QueryKeys.SAMPLE] }),
  onError,
});

// usage
<Button onClick={() => createItemAction.execute({ name: 'New' })} isLoading={createItemAction.isPending}>
  Create
</Button>
```

### `useMutation` pattern

- Server code returns `{ data, error }` (mutually exclusive), and does NOT throw.
- On the client, check `data.error` inside `onSuccess`; show `toast.error` if present.
- Reason: Next.js server actions omit error messages by default; returning `{ data, error }` preserves user-friendly messages.

```ts
// server (example shape)
export async function saveItem(
  input: SaveItemInput,
): Promise<{ data: Item | null; error: string | null }> {
  try {
    // ...perform write
    return { data: saved, error: null };
  } catch (e) {
    return { data: null, error: 'Failed to save item' };
  }
}

// client
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

const saveItemMutation = useMutation({
  mutationFn: saveItem,
  onSuccess: (res) => {
    if (res.error) {
      toast.error(res.error);
      return;
    }
    queryClient.invalidateQueries({ queryKey: [QueryKeys.SAMPLE] });
  },
});
```

### Error handling summary

- `useAction` + `safeActionClient`:
  - Throw in the action; UI handles via `onError` and shared `onError` handler.
- `useMutation` (plain server code):
  - Do not throw; return `{ data, error }`. Handle error in `onSuccess` on the client and show `toast.error`.
