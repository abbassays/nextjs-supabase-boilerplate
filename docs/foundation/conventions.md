## Conventions

### Naming and files

- Files: kebab-case for all filenames (`listing-card.tsx`, `user-profile.ts`).
- Components: PascalCase in code (`ListingCard`).
- Hooks: camelCase starting with `use` (`useUser`).
- Functions (including backend/server actions): camelCase (`updateUser`, `deleteUser`).
- Schemas (Zod objects): camelCase (`updateUserInput`).
- Types: PascalCase is acceptable for TypeScript type aliases (e.g., `UpdateUserInput`).
- Explicit filenames; do not use `index.ts` or `index.tsx`.
- Default exports are allowed. Barrel files are not required.

### Imports

- Prefer absolute imports via the `@/` alias (e.g., `import { cn } from '@/lib/utils'`).
- Avoid deep cross-layer imports that break encapsulation.

### Client vs server components

- Default to server components. Use `"use client"` only when needed (stateful UI, effects, browser-only APIs).
- Keep client-only logic in leaf components where possible.

### Styling

- Tailwind CSS by default.
- If Tailwind cannot express a style cleanly, use inline style or `globals.css` as needed.
- Use `cn` from `src/lib/utils.ts` whenever conditionally composing classes.

Example:

```tsx
import { cn } from '@/lib/utils';

export default function Button({ primary }: { primary?: boolean }) {
  return (
    <button
      className={cn('rounded px-3 py-2', primary && 'bg-blue-600 text-white')}
    >
      Click
    </button>
  );
}
```

### Code style

- TypeScript: enable strict types; prefer explicit function signatures for exported APIs.
- Control flow: use early returns, handle edge cases first, avoid deep nesting.
- Comments: explain the "why" for complex code; avoid trivial comments.
- Formatting: use Prettier; keep long lines readable.
- Linting: run `pnpm lint` and fix issues before committing.

Example guard clause:

```ts
export function getInitials(name?: string) {
  if (!name) return '';
  const [first, last] = name.split(' ');
  if (!first || !last) return first?.[0] ?? '';
  return `${first[0]}${last[0]}`;
}
```

### Utilities

- Prefer existing helpers over ad-hoc implementations.
  - Dates: `formatTimestamp`, `formatDate`, `formatTime`, `formatTimeAgo`.
  - Numbers: `formatNumber`, `formatCurrency`.
  - Strings: `getFullName`, `getInitials`, `enumToLabel`.
  - Logger: `Logger.info|warning|error|success` (remove logs before committing).
  - Class merging: `cn` from `src/lib/utils.ts`.

Example:

```ts
import { formatCurrency } from '@/utils/number-functions';

formatCurrency(1234.56, 2); // "$1,234.56"
```

### Error handling & UX

- For next-safe-action `useAction` hooks, use `onError` from `src/lib/show-error-toast.ts`.
- For React Query `useMutation`, show `toast.error(error.message)` in `onError`.

### Logging

- Use `src/utils/logger.ts` for colored logs during development.
- Remove logs before committing.
