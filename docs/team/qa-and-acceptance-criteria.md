## Developer-Driven QA & Acceptance Criteria (SOP)

### Purpose

- We ship quality without a QA team by building manual QA into our workflow. Every PR must link to a `Linear` issue with clear, testable acceptance criteria (AC).

### Scope & Tools

- Linear for issues, GitHub for PRs, environments: Local → Staging → Production.

### Manual QA Workflow

1. Linear issue

- Add AC and Definition of Done (DoD) using the template below.
- Keep scope small; note risks (migrations, flags, auth, external services).

2. Implement

- Stay within scope; update docs/config as needed.
- Attach screenshots or a short video to the Linear issue.

3. Self-QA before PR (Author)

- [ ] All AC pass locally
- [ ] Empty/loading/error states handled
- [ ] Auth/roles paths verified (authed vs unauth)
- [ ] Responsive at sm/md/lg
- [ ] Basic a11y: labels, keyboard nav, focus, contrast
- [ ] No console errors; network calls succeed/retry appropriately
- [ ] Screenshots/video attached to Linear

4. PR Review

- Author: Link PR to Linear; include summary and manual test steps.
- Reviewer: Check AC coverage, edge cases, readability; run locally if needed.

5. Staging QA

- [ ] AC verified on staging URL
- [ ] Risky changes behind a flag or safe rollout
- [ ] Cross-browser sanity (Chrome; Safari/Firefox if relevant)
- [ ] Mobile viewport sanity
- [ ] Migrations/seed data executed
- [ ] Monitoring/console clean

6. Production & Post-Deploy

- [ ] Release notes added to Linear
- [ ] Spot-check key AC in production (or canary)
- [ ] Analytics/events validated if applicable
- [ ] Rollback plan ready (flag/revert)

---

## Writing Good Acceptance Criteria (Manual-First)

- **Testable manually**: A person can follow steps and confirm outcome.
- **Atomic**: One behavior per bullet.
- **Unambiguous**: Include inputs, expected result, and conditions.
- **User-centered**: Prefer user perspective; include negative cases.
- **Include non-functional** when relevant: performance, accessibility, permissions.

Examples

- [ ] Form submit with valid inputs shows success and navigates to `/dashboard`.
- [ ] Invalid email blocks submit and shows inline error.
- [ ] Duplicate name returns error and shows “Name already exists”.
- [ ] Table renders ≤ 25 items quickly and supports retry on network error.

---

## Linear Issue Template (Copy/Paste)

```md
### Summary

Briefly describe the problem and desired outcome.

### Context

Why this matters; link designs/PRs/related issues.

### Acceptance Criteria

- [ ] AC 1 ...
- [ ] AC 2 ...
- [ ] AC 3 ...

### Non-Functional (optional)

- [ ] Performance: ...
- [ ] Accessibility: ...
- [ ] Security/Permissions: ...
- [ ] Analytics/Events: ...

### Manual Test Plan

- Steps to validate AC locally and on staging.

### Rollout & Risk

- Flags/migrations; rollback plan.

### Definition of Done

- [ ] All AC pass (local + staging)
- [ ] Error/empty/loading states covered
- [ ] Screenshots/video attached in Linear
- [ ] Docs/config updated (env, flags, migrations)
- [ ] PR linked to Linear and approved
- [ ] Post-deploy checks complete; monitoring clean
```

---

### Tips

- Keep AC short/specific; avoid “works as expected”.
- Prefer feature flags for risky changes; document the kill switch.
- Update AC if scope changes; don’t merge without current, testable AC.
