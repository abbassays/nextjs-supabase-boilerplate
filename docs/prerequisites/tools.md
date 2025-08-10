## Prerequisite tools and local setup

Install and configure these before running the project.

- Node.js

  - Install the current LTS.

- pnpm

  - Install globally (`npm i -g pnpm`) and use for all scripts.

- Editor (Cursor recommended; VS Code supported)

  - Cursor/VS Code: install ESLint, Prettier, Tailwind CSS IntelliSense extensions.
  - Enable format on save.

- Git

  - Configure SSH or HTTPS access to your repos.

- Browser
  - Use a modern Chromium-based browser or Firefox for devtools.

After tools are installed:

- Clone the repo and run `pnpm install`.
- Create `.env.local` at the project root; see Environment & configuration for required values.
- Start the dev server with `pnpm dev`.
