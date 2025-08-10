## Scripts reference

What each script does and when to use it.

- `pnpm dev`

  - Starts the Next.js development server with Turbopack for faster HMR.
  - Use during local development.

- `pnpm build`

  - Creates an optimized production build.
  - Run in CI before deploying.

- `pnpm start`

  - Starts the production server from the last build.
  - Use in staging/production or to test prod locally after `pnpm build`.

- `pnpm typecheck`

  - Runs TypeScript in no-emit mode to catch type errors.
  - Run in CI and locally before opening a PR.

- `pnpm ui`

  - Launches shadcn UI component adder (`pnpm dlx shadcn@latest add`).
  - Use to scaffold new UI components following our conventions.

- `pnpm lint`

  - Runs ESLint with `--fix` to auto-fix safe issues.
  - Use to maintain code quality and consistent imports.

- `pnpm format`

  - Formats the repository using Prettier.
  - Run after larger changes or before committing.

- `pnpm style`

  - Convenience command: runs `pnpm lint` then `pnpm format`.
  - Use to quickly enforce both linting and formatting.

- `pnpm supa:types`
  - Generates TypeScript types from your Supabase project into `src/types/supabase.ts`.
  - Update the `--project-id` in the script before running.
  - Run whenever your Supabase schema changes.
