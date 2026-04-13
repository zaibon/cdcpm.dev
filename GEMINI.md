# GEMINI.md - Project Context: cdcpm.dev

## Project Overview
**cdcpm.dev** is a modern, responsive portfolio website built with **SvelteKit 5** and **TypeScript**. It serves as the professional profile and project showcase for Christophe de Carvalho Pereira Martins.

### Key Features
- **Resume/CV:** A detailed professional history and skills overview (accessible via `/resume`, with a redirect from `/cv`).
- **Project Showcase:** A filtered list of software engineering projects, showcasing various technologies (Go, Python, Svelte, etc.).
- **AI Chat Assistant:** An interactive chat interface connected to a custom **Model Context Protocol (MCP)** server via WebSockets, allowing visitors to query Christophe's professional profile using AI.
- **Dark Mode:** Full support for dark and light themes, respecting system preferences and user choice.
- **Analytics:** Integrated with Vercel Analytics.

## Technology Stack
- **Framework:** [SvelteKit 5](https://kit.svelte.dev/) (utilizing **Runes** like `$state`, `$derived`, `$props`, and `$effect`).
- **Language:** [TypeScript](https://www.typescriptlang.org/) (strict mode enabled).
- **Styling:** Vanilla CSS with Bulma-inspired custom variables (defined in `+layout.svelte`).
- **Build Tool:** [Vite](https://vitejs.dev/).
- **Deployment:** [Vercel](https://vercel.com/) (using `@sveltejs/adapter-vercel`).
- **Backend/AI:** Custom MCP server built with **Encore.dev** and **Go** (accessible via `wss://staging-selfmpc-hf9i.encr.app/chat`).
- **Testing:** [Vitest](https://vitest.dev/).
- **Linting & Formatting:** ESLint and Prettier.

## Building and Running
The project uses **pnpm** as the package manager.

### Key Commands
| Command | Description |
| :--- | :--- |
| `pnpm dev` | Starts the development server with hot reloading. |
| `pnpm build` | Builds the application for production (Vercel). |
| `pnpm preview` | Previews the production build locally. |
| `pnpm test:unit` | Runs unit tests using Vitest. |
| `pnpm lint` | Checks code for linting and formatting issues. |
| `pnpm format` | Automatically formats the code using Prettier. |
| `pnpm check` | Performs type-checking on Svelte files. |

## Development Conventions

### Svelte 5 Runes
Rigorously use Svelte 5 Runes for state management and reactivity:
- Use `$props()` for component inputs.
- Use `$state()` for mutable state.
- Use `$derived()` for computed values.
- Use `$effect()` for side effects.

### Navigation and Routing
- Route-level redirects (e.g., `/cv` to `/resume`) are handled in `+page.server.ts` using `@sveltejs/kit`'s `redirect`.
- The `Header.svelte` component manages navigation links and the theme toggle.

### Each Blocks and Keys
Always use unique keys in `{#each}` blocks to avoid the `each_key_duplicate` error. Prefer using the array index `(i)` as the key if no unique ID (like a UUID) is available and the data is static or the order doesn't change frequently:
```svelte
{#each items as item, i (i)}
  <li>{item}</li>
{/each}
```

### Type Safety
Maintain strict TypeScript standards. Ensure all props and data structures are correctly typed, especially for services like `chatSocket.ts`.

### Styling
Prefer vanilla CSS variables for consistency. Theme variables are defined in the `:global(:root)` and `:global(.dark)` blocks in `src/routes/+layout.svelte`.

## Directory Structure
- `src/lib/components/`: Reusable UI components (`Header.svelte`, `Footer.svelte`, `ChatWidget.svelte`).
- `src/lib/services/`: Service logic for WebSockets (`chatSocket.ts`) and email (`mail.ts`).
- `src/routes/`: SvelteKit pages and API endpoints.
- `static/`: Static assets including project images and the CV PDF.
- `sass/`: Custom Bulma SCSS (if applicable/used).
