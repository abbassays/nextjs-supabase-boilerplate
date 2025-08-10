## UI system overview

This app uses shadcn/ui (Radix + Tailwind) as the primary component library. Base primitives live under `src/components/ui`. Edit base UI components if they are used everywhere (e.g., add variants to `button.tsx`). Feature-specific components live under `src/components/<feature>/*`.

### Theming and globals

- Theme tokens are defined in `src/app/globals.css`. Generate a theme using `https://ui.jln.dev` and paste the token set into `:root`/`.dark`.
- Use Tailwind semantic tokens instead of hardcoded colors (one class works for both modes):

```tsx
// ✅ good: uses design tokens that adapt to light/dark
<section className='bg-background text-foreground border-border border' />

// ❌ avoid: hardcoded colors that won't adapt
<section className="bg-white text-black border-neutral-200 dark:bg-black dark:text-white" />
```

If a style can't be expressed cleanly with Tailwind classes, use inline styles or `globals.css` as needed.

### Responsiveness and spacing

- Tailwind-first. Use default Tailwind breakpoints (`sm`, `md`, `lg`, `xl`).
- Keep reasonable page padding (e.g., `p-6`) and max widths (`max-w-screen-md`/`lg`).

### Icons and images

- Use `lucide-react` and `react-icons` for icons.
- Use Next.js Image with explicit width/height for optimization:

```tsx
import Image from 'next/image';

<Image src='/logo.png' alt='Logo' width={120} height={32} />;
```

### Interactions and feedback

- Use `sonner` toasts for transient feedback.
- Use `Skeleton` for loading states; if the skeleton is too complex, fall back to a spinner/loader.
- Use `Tooltip` where actions are not self-explanatory. `TooltipProvider` is already set up in `src/app/providers.tsx`.

### Overlays

- Dialog vs Sheet vs Popover:
  - Dialog: small content, confirmations.
  - Sheet: larger forms or multi-step content.
  - Popover: contextual menus/tool panes; different use-case than dialog/sheet.

### Variants and class composition

- Use `cn` (from `src/lib/utils.ts`) for conditional classes.
- Use `class-variance-authority` where variants are needed (e.g., in `button.tsx`).

### Adding new UI

- Add primitives with `pnpm ui <component>` and place them in `src/components/ui`.
- Feature components go to `src/components/<feature>/*` (kebab-case files, PascalCase components).
