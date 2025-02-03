# Abbassays Next.js Supabase Boilerplate

A modern boilerplate for building full-featured web applications with a powerful tech stack. This repository is configured with Next.js, shadcn UI, TypeScript, Supabase, Tailwind CSS, React Query, ESLint, and Prettier to help you jumpstart your project with best practices and a robust development environment.

---

## Table of Contents

- [Abbassays Next.js Supabase Boilerplate](#abbassays-nextjs-supabase-boilerplate)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Tech Stack](#tech-stack)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Environment Variables](#environment-variables)
    - [Development](#development)
    - [Production Build](#production-build)
    - [Linting, Formatting, and Typechecking](#linting-formatting-and-typechecking)
  - [Contributing](#contributing)
  - [Contact](#contact)

---

## Features

- **Next.js** for server-rendered React applications.
- **Shadcn UI** components built on Radix UI and Tailwind CSS.
- **TypeScript** for static typing and enhanced developer experience.
- **Supabase** integration for scalable backend services.
- **Tailwind CSS** for rapid and responsive UI development.
- **React Query** for efficient data fetching and caching.
- **ESLint & Prettier** for code quality and formatting.
- **pnpm** as the package manager.
- **Turbopack** enabled for a blazing-fast development server.

---

## Tech Stack

- **Next.js**: `15.1.6`
- **React**: `^19.0.0`
- **TypeScript**: `^5`
- **Tailwind CSS**: `^3.4.1`
- **Supabase**:
  - `@supabase/ssr` `^0.5.2`
  - `@supabase/supabase-js` `^2.48.1`
- **React Query**: `@tanstack/react-query` `^5.66.0` (plus devtools)
- **ESLint**: `^9.19.0` (with various plugins and configs)
- **Prettier**: `^3.4.2` (with Tailwind CSS plugin)
- **pnpm**: Package manager

For complete version details, please refer to the [`package.json`](./package.json).

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [pnpm](https://pnpm.io/) package manager

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/abbassays/nextjs-supabase-boilerplate.git
   cd nextjs-supabase-boilerplate
   ```

2. **Install dependencies:**

   ```bash
   pnpm install
   ```

### Environment Variables

Create a `.env.local` file in the root directory and add the following:

```env
NEXT_PUBLIC_SUPABASE_URL="https://project-id.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="<anon-key-here>"
```

Replace `<anon-key-here>` with your actual Supabase anonymous key.

### Development

Start the development server with Turbopack enabled:

```bash
pnpm dev
```

Your application will be available at [http://localhost:3000](http://localhost:3000).

### Production Build

To build the application for production, run:

```bash
pnpm build
```

Then start the production server with:

```bash
pnpm start
```

### Linting, Formatting, and Typechecking

This project includes ESLint and Prettier for maintaining code quality and consistency, along with TypeScript typechecking.

- **Lint your code (with auto-fix):**

  ```bash
  pnpm lint
  ```

- **Format your code using Prettier:**

  ```bash
  pnpm format
  ```

- **Run both linting and formatting:**

  ```bash
  pnpm style
  ```

- **Typecheck your project:**

  ```bash
  pnpm typecheck
  ```

- **Add new shadcn UI components:**

  ```bash
  pnpm ui
  ```

---

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests if you have improvements or bug fixes. For major changes, please open an issue first to discuss what you would like to change.

---

## Contact

For questions, issues, or further information, please open an issue in this repository or contact the maintainer at [abbassays514@gmail.com].