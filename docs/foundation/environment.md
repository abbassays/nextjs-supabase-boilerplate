## Environment and configuration

This project centralizes environment variables in `src/env.ts` using `@t3-oss/env-nextjs` and Zod. This ensures:

- Early validation: the app fails fast at startup if required env vars are missing or malformed.
- Type safety: `env.SOME_VAR` is typed everywhere.
- Clear separation: `server` vs `client` variables are declared explicitly.

### `src/env.ts`

Key sections:

- `server`: variables only available on the server (never exposed to the client)
- `client`: variables prefixed with `NEXT_PUBLIC_` that can be used in the browser
- `runtimeEnv`: maps Node `process.env.*` to the schema

Current schema highlights:

- Server

  - `SUPABASE_SERVICE_ROLE_KEY: z.string()`

- Client
  - `NEXT_PUBLIC_SUPABASE_URL: z.string().url()`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string()`
  - `NEXT_PUBLIC_POSTHOG_KEY: z.string().optional()`
  - `NEXT_PUBLIC_POSTHOG_HOST: z.string().optional()`
  - `NEXT_PUBLIC_APP_URL: z.string()`
  - `NEXT_PUBLIC_APP_NAME: z.string()`

Place your values in `.env.local` (never commit secrets). Example:

```env
SUPABASE_SERVICE_ROLE_KEY="<service-role-key>"
NEXT_PUBLIC_SUPABASE_URL="https://<project-id>.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="<anon-key>"
# Optional PostHog
NEXT_PUBLIC_POSTHOG_KEY="<posthog-public-key>"
NEXT_PUBLIC_POSTHOG_HOST="https://us.i.posthog.com"
# App metadata
NEXT_PUBLIC_APP_URL="https://app.example.com"
NEXT_PUBLIC_APP_NAME="Example App"
```

### Why these variables exist

- Supabase

  - `SUPABASE_SERVICE_ROLE_KEY` (server): used for privileged server tasks (never expose to client).
  - `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` (client): browser SDK connectivity.

- PostHog

  - `NEXT_PUBLIC_POSTHOG_KEY` and `NEXT_PUBLIC_POSTHOG_HOST` are optional. Analytics will only be initialized if these are present. Without them, analytics features remain disabled.

- App URL

  - `NEXT_PUBLIC_APP_URL` is used in links, redirects, canonical URLs, and places where the app needs to know its public origin. Configure per environment (local, staging, production) to avoid mixed origins.

- App Name
  - `NEXT_PUBLIC_APP_NAME` is used in UI metadata (titles, headings) and environment labels. On staging, set a distinct name (e.g., "Example App Staging") so it does not rank/compete on SERP and is clearly identifiable to users and search engines.

### Notes

- Keep secrets out of client-exposed variables. Only `NEXT_PUBLIC_*` variables can be read by the browser.
- Validate new env vars by extending `src/env.ts` and adding to `runtimeEnv`.
- Restart the dev server after changing `.env.local`.
