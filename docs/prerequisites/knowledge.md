## Prerequisite knowledge

Understand these concepts before contributing; skim official docs as needed.

- Next.js (App Router) — https://nextjs.org/docs/app

  - Know: routing in `app/`, server vs client components, layouts, metadata, server actions.
  - Why: performance, built-in SSR/SSG, great DX.

- React — https://react.dev/learn

  - Know: modern hooks, context, suspense basics.
  - Why: predictable UI composition.

- TypeScript — https://www.typescriptlang.org/docs/

  - Know: strict typing, utility types, generics where useful.
  - Why: maintainability, safer refactors, strong IDE support.

- TanStack React Query — https://tanstack.com/query/latest

  - Know: queries, mutations, cache lifecycles, staleTime vs gcTime, `queryKey` structure, invalidation.
  - Why: reliable async state, cache-first UX, background refetch.

- Zod — https://zod.dev/

  - Know: schema definition, `parse` vs `safeParse`, composing schemas, `z.infer` for TS types.
  - Why: input validation and end-to-end type safety.

- Tailwind CSS — https://tailwindcss.com/docs
  - Know: core utility classes and composition patterns.
- Radix UI — https://www.radix-ui.com/primitives/docs/overview/introduction
  - Know: accessible primitives and state.
- shadcn/ui — https://ui.shadcn.com/

  - Know: component patterns built on Radix + Tailwind.
  - Why: accessible, consistent, fast UI development.

- Supabase (auth, database, storage) — https://supabase.com/docs

  - Know: client vs server clients, RLS basics, auth flows, querying and mutations.
  - Why: managed Postgres + auth with strong DX.

- next-safe-action — https://next-safe-action.dev

  - Know: defining, validating, and calling safe server actions.
  - Why: type-safe server actions with input validation.

- React Hook Form — https://react-hook-form.com/get-started

  - Know: register/Controller, validation, resolver integration (e.g., Zod), form state.
  - Why: performant, flexible forms with minimal rerenders.

- Optional: PostHog analytics — https://posthog.com/docs
  - Know: identifying users, capturing events, pageviews.
  - Why: product analytics and feedback loops.
