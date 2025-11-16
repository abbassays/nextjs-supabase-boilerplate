# Supabase Dev/Prod Instances & Migrations (SOP)

## Purpose

This SOP ensures safe, predictable database schema management for our dual Supabase setup (dev + prod). We make changes in dev first, generate migrations via CLI, and apply them to prod **only after** code deploys successfully. No rollbacks possible—code can be reverted, but schema changes are permanent.

**Key Principle**: Database is the source of truth. Always verify schema changes in dev before prod.

## Setup & Prerequisites

- Install [Docker Desktop](https://www.docker.com/products/docker-desktop/) and ensure it's running (required for local Supabase operations like db reset/pull).
- Install [Supabase CLI](https://supabase.com/docs/guides/cli) globally: `npm install -g supabase`
- Know your project refs (from Supabase dashboard URLs):
  - **Dev**: `[YOUR_DEV_PROJECT_REF]` (use this for local dev, feature branches)
  - **Prod**: `[YOUR_PROD_PROJECT_REF]`
- Store CLI passwords securely (e.g., 1Password). Use `[YOUR_DEV_PASSWORD]` for dev and `[YOUR_PROD_PASSWORD]` for prod (rotate regularly; never commit them).

## Workflow

### 1) Dev Instance: Schema Changes & Linking

- **Link to Dev** (do this once per session or new terminal):

  ```
  supabase link --project-ref [YOUR_DEV_PROJECT_REF] --password "[YOUR_DEV_PASSWORD]"
  ```

  - This sets your local CLI to the dev project. Verify with `supabase projects list`.

- **Make Changes in Dev**:

  - Use Supabase Dashboard (SQL Editor, Table Editor) or CLI to alter schema (add tables, columns, indexes, RLS policies, etc.).
  - Test thoroughly: run your app locally, verify queries/mutations work, check auth/roles.
  - **Do**: Seed test data; simulate edge cases (empty tables, permissions).
  - **Don't**: Touch prod data or run destructive queries without backup.

- **Generate Migration** (before PR, when schema stabilizes):
  - Run: `supabase db pull {migration_name}` (e.g., `supabase db pull add_user_profile_table`)
    - `{migration_name}`: Snake-case, descriptive (e.g., `add_email_verification_column`, `update_rls_policies`).
    - This creates `supabase/migrations/{timestamp}_{migration_name}.sql` with the diff from remote dev.
  - Review the SQL file: Ensure it's idempotent (safe to run multiple times), no data loss.
  - Commit the migration file to your feature branch.
  - **Do**: Run `supabase db reset` locally to test the migration from scratch (requires Docker).
  - **Don't**: Pull migrations mid-feature if schema might change more—wait until stable.

### 2) Code Integration & PR

- Update your code to match the new schema (e.g., add fields to Zod schemas, React Query keys).
- Open PR with the migration file included.
- In PR description: Link Linear issue, note schema changes, and manual test steps (e.g., "Run `supabase db reset` locally to verify").
- Reviewer: Check migration SQL for safety; suggest `supabase db diff` if needed.

### 3) Prod Deployment: Apply Migrations Post-Code

- **After PR merges and code deploys to prod** (e.g., via Vercel):

  - Link to Prod:
    ```
    supabase link --project-ref [YOUR_PROD_PROJECT_REF] --password "[YOUR_PROD_PASSWORD]"
    ```
  - Apply migrations:
    ```
    supabase db push
    ```
    - This replays all pending migrations (including your new one) on prod.
  - Verify: Check Supabase Dashboard (prod) for schema match; run smoke tests in prod environment.
  - **Why post-code?** Code can be reverted via Git if issues arise; schema can't. If migration fails, revert code first, then investigate.

- **Do**:

  - Backup prod data before push (use Supabase's export or pg_dump).
  - Apply during low-traffic windows.
  - Test incrementally: After push, monitor app for errors (console, Supabase logs).

- **Don't**:
  - Apply migrations before code deploys—leads to runtime errors.
  - Run manual SQL on prod dashboard—always use migrations for auditability.
  - Ignore dev testing: Never push untested migrations to prod.

## Common Scripts & Commands

Add these to `package.json` scripts for convenience (or run directly). Replace placeholders with actual values (store securely, e.g., in `.env`):

```json
{
  "scripts": {
    "db:link:dev": "supabase link --project-ref [YOUR_DEV_PROJECT_REF] --password \"[YOUR_DEV_PASSWORD]\"",
    "db:link:prod": "supabase link --project-ref [YOUR_PROD_PROJECT_REF] --password \"[YOUR_PROD_PASSWORD]\"",
    "db:pull": "supabase db pull",
    "db:push:prod": "supabase db push"
  }
}
```

Usage:

- `pnpm db:link:dev && pnpm db:pull add_user_profile_table`
- Post-deploy: `pnpm db:link:prod && pnpm db:push:prod`

**Direct CLI Commands** (run these as needed):

- `supabase db reset` - Test migrations locally from scratch (requires Docker)
- `supabase db diff` - Preview schema differences

## Dos and Don'ts

### Dos

- Always link explicitly before pull/push to avoid wrong project.
- Name migrations clearly and commit them with related code.
- Use `supabase db diff` to preview changes before pull.
- Test migrations locally with `supabase db reset` (resets your local DB to match remote + applies migrations; requires Docker).
- Document breaking changes in Linear/PR (e.g., "Requires data migration script").

### Don'ts

- Don't apply prod migrations without code deployed and tested in staging.
- Don't use dashboard for schema changes in prod—use migrations only.
- Don't commit sensitive data in migration files (use anonymized examples).
- Don't forget to rotate CLI passwords quarterly.
- Don't run destructive ops (DROP, ALTER COLUMN TYPE) without team review.

## Edge Cases & Troubleshooting

- **Migration Conflicts**: If pull fails, check remote schema manually; resolve diffs in dev first.
- **Prod Push Fails**: Revert code deploy, fix migration, re-push. Never force manual fixes in prod.
- **Local vs Remote Drift**: Run `supabase db pull` periodically to sync your local migrations folder.
- **Large Migrations**: Split into multiple files; test each step-by-step in dev.
- **Docker Issues**: Ensure Docker is running; restart if `db reset` fails with container errors.

## Integration with Git Flow

- Feature branches: Schema changes + migrations in dev.
- Main merge: Code + migrations committed.
- Staging deploy: Test code with dev schema (or mirror prod).
- Prod deploy: Then apply migrations.

For questions, ping in Slack or comment on Linear. Update this SOP if our process evolves.
