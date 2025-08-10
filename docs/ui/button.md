## Button guidelines

Base component: `src/components/ui/button.tsx` built with `class-variance-authority`. Props: `variant`, `size`, `isLoading`, `icon`, `iconLeft`, `asChild`, all native button props, and Tailwind `className`.

### Core rules

- Icons: never pass raw icons as children. Use `icon` (right) or `iconLeft` props.
- Loading: do not render loading text. Bind `isLoading` to a real loading state (form, mutation, action) so the component disables itself and shows a spinner.
- Links: wrap the Button with `next/link`. Do not put a `<Link>` inside a `<Button>`.

```tsx
import Link from 'next/link';
import { paths } from '@/constants/paths';
import { Button } from '@/components/ui/button';

<Link href={paths.settings}>
  <Button variant='secondary'>Settings</Button>
  {/* Never: <Button><Link .../></Button> */}
</Link>;
```

- Variants: if a style recurs across the app, add a `variant` to the base Button instead of duplicating classes.

### Variants and sizes

- `variant`: `default`, `destructive`, `outline`, `secondary`, `ghost`, `link`
- `size`: `default`, `sm`, `lg`, `icon`

```tsx
<Button>Primary</Button>
<Button variant='secondary'>Secondary</Button>
<Button variant='destructive'>Delete</Button>
<Button variant='outline' size='sm'>Small Outline</Button>
<Button variant='ghost'>Ghost</Button>
<Button variant='link'>Link</Button>
<Button size='icon' aria-label='More' icon={Save} />
```

### Correct loading usage

Bind `isLoading` to the source of truth:

```tsx
// React Hook Form
<Button type='submit' isLoading={form.formState.isSubmitting}>Submit</Button>

// React Query mutation
<Button onClick={() => mutate()} isLoading={mutation.isPending}>Save</Button>

// next-safe-action
<Button onClick={() => action.execute(input)} isLoading={action.isPending}>
  Run Action
</Button>
```

Loader placement logic in the component:

- If `size === 'icon'`: spinner replaces the icon/child when loading.
- If `iconLeft` is present: spinner appears on the left when loading.
- Else: spinner appears on the right when loading.
- While loading, the button is disabled (`disabled={isLoading || disabled}`).

### Icons

The `icon` and `iconLeft` props accept `LucideIcon` or `react-icons` `IconType`.

```tsx
import { Save } from 'lucide-react';
import { MdCheck } from 'react-icons/md';

<Button icon={Save}>Save</Button>
<Button iconLeft={MdCheck}>Confirm</Button>
<Button size='icon' aria-label='View' icon={Save} />
```

### Accessibility

- Always provide `aria-label` for icon-only buttons (`size='icon'`).
- Use semantic types: `type='submit'` inside forms; `type='button'` otherwise.
- Do not nest interactive elements (no `<a>` or `<Link>` inside the Button).

### Theming and tokens

The Button uses semantic tokens (`bg-primary`, `text-primary-foreground`, etc.). Do not hardcode colors in consumer code; rely on variants and Tailwind tokens.

### Extending variants (when needed)

If you need a new style across multiple places, extend `buttonVariants` in `src/components/ui/button.tsx` and add a `variant` name (e.g., `warning`). Prefer a single source of truth over ad-hoc classes.

Example shape (in `button.tsx`):

```ts
const buttonVariants = cva('inline-flex items-center justify-center ...', {
  variants: {
    variant: {
      default: '...',
      destructive: '...',
      outline: '...',
      secondary: '...',
      ghost: '...',
      link: '...',
      // Add custom variant when used in multiple places
      warning: 'bg-yellow-500 text-black hover:bg-yellow-500/90',
    },
    size: { default: '...', sm: '...', lg: '...', icon: '...' },
  },
  defaultVariants: { variant: 'default', size: 'default' },
});
```

Use the new variant via `<Button variant='warning' />` where applicable.

### Composition tips

- Use `className` to append layout classes (e.g., `w-full`, `justify-start`).
- Prefer `cn()` for conditional classes on the consumer if needed around Button containers; the Button already composes internal classes.
- Keep logic outside: handle state (loading, disabled) in your component and pass down props.

### Full examples

```tsx
// Submit inside a form with RHF
<Button
  type='submit'
  className='w-full'
  isLoading={otpForm.formState.isSubmitting}
>
  Verify Code
</Button>

// Secondary with left icon
<Button iconLeft={Save} variant='secondary'>Back</Button>

// Destructive with confirm handler
<Button variant='destructive' onClick={onDelete} isLoading={mutation.isPending}>
  Delete
</Button>
```
