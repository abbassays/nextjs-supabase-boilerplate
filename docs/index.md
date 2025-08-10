## Next.js Supabase React-Query Boilerplate — Developer Onboarding Index

Read these documents in order. This file provides a brief overview and links to detailed guides.

### 1) Start here

- Overview (this file)
- Repository `README.md` for stack summary and quick start

### 2) Prerequisites

- Knowledge: frameworks and libraries to know before contributing
  - [docs/prerequisites/knowledge.md](./prerequisites/knowledge.md)
    - Next.js (App Router), React, TypeScript
    - TanStack React Query
    - Zod
    - React Hook Form
    - next-safe-action
    - Tailwind CSS, Radix UI, shadcn UI
    - Supabase (auth, database, storage)
    - Optional: PostHog analytics
- Tools & local setup
  - [docs/prerequisites/tools.md](./prerequisites/tools.md)
    - Node.js, pnpm
    - Cursor/VS Code extensions (ESLint, Prettier, Tailwind)
    - Git, SSH/HTTPS

### 3) Environment & configuration

- Environment variables and secrets
  - [docs/foundation/environment.md](./foundation/environment.md)
- Scripts (what each script does and when to use it)
  - [docs/reference/scripts.md](./reference/scripts.md)

### 4) Project structure & conventions

- Directory structure and module layout
  - [docs/foundation/directory-structure.md](./foundation/directory-structure.md)
- Code style, linting, and formatting
- Naming, file placement, and imports
  - [docs/foundation/conventions.md](./foundation/conventions.md)

### 5) UI system

- Components, theming, and styling (shadcn UI + Tailwind)
  - [docs/ui/components-and-styling.md](./ui/components-and-styling.md)
  - [docs/ui/button.md](./ui/button.md)
  - [docs/ui/form.md](./ui/form.md)
  - [docs/ui/table.md](./ui/table.md)

### 6) Data layer

- Data fetching with React Query (queries, caching, invalidation)
  - [docs/data/react-query.md](./data/react-query.md)
- Mutations and Actions (writes and error handling)
  - [docs/data/mutations-and-actions.md](./data/mutations-and-actions.md)

### 7) Backend integration

- Supabase client (browser and SSR), auth patterns
  - [docs/backend/auth-and-supabase.md](./backend/auth-and-supabase.md)
- Next.js Server Actions and database access
  - [docs/backend/server-actions-and-db.md](./backend/server-actions-and-db.md)

### 8) Team workflows

- Git workflow and branching
  - [docs/team/git-workflow.md](./team/git-workflow.md) 🚨 TBD
- Code review guidelines
  - [docs/team/code-review-guidelines.md](./team/code-review-guidelines.md) 🚨 TBD
- Do’s, don’ts, and common mistakes (based on PR reviews)
  - [docs/team/dos-and-donts.md](./team/dos-and-donts.md) 🚨 TBD

### 9) Operations

- Deployment checklist and environments
  - [docs/operations/deployment.md](./operations/deployment.md) 🚨 TBD
- Analytics and telemetry (PostHog)
  - [docs/operations/analytics.md](./operations/analytics.md) 🚨 TBD
- FAQ and troubleshooting
  - [docs/reference/faq.md](./reference/faq.md) 🚨 TBD

### Notes

- The linked files are the canonical source of truth for each topic. This index is intentionally brief.
- If you find gaps, add or edit the referenced docs and open a PR.
