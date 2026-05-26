# Devender Me

Personal portfolio website built with Nuxt 4 and Nuxt Content 3.

Live at **[devendergupta.com](https://devendergupta.com)**. Content is driven entirely from Markdown files in the `content/` directory.

## Tech Stack

- **Nuxt 4** (Compatibility Version 4, `future.compatibilityVersion: 4`)
- **Vue 3** with Composition API
- **Nuxt Content 3** — SQLite-backed content collections (`better-sqlite3`)
- **Nuxt Icon** — Iconify icon sets (`uil`, `logos`, `ion`)
- **Nuxt Image** — optimised `<NuxtImg>` component
- **@nuxtjs/color-mode** — system-preference dark/light toggle, no class suffix
- **@nuxtjs/sitemap** — auto-generated sitemap
- **ESLint + Prettier + Husky + lint-staged** — enforced code quality on every commit

## Features

- Content-driven portfolio: user profile, work history, and projects all sourced from Markdown
- Responsive single-page layout with smooth anchor navigation and active section tracking
- Dark/light color mode with instant theme switching
- AI chat assistant powered by GitHub Models (`gpt-4o-mini`) via a Nuxt server API route
- Agent/AI discoverability: `ai.txt`, OpenAPI spec, `.well-known/api-catalog`, `Content-Signal` headers, and a WebMCP client plugin
- SEO metadata, Open Graph tags, canonical URL, and sitemap
- PWA basics via `site.webmanifest` and a full favicon set
- Markdown content in the chat assistant rendered with `<MDC>` (formatted lists, bold, code blocks)

## Project Structure

```text
app/
  assets/css/          # CSS custom properties (variables.css) and global styles (main.css)
  components/          # UI sections: Hero, TechStack, Projects, AboutMe, ContactSection,
  │                    #   AppHeader, AppFooter, AiAssistant, ThemeSwitcher, AppIcon, ProjectCard
  layouts/default.vue  # Root layout wrapping all pages
  pages/
    index.vue          # Main portfolio page (all sections)
    docs/api.vue       # Human-readable API docs page
  plugins/
    webmcp.client.ts   # WebMCP context provider (client-side, AI browser integration)
content/
  user.md              # Personal info, brand, social links, tech stack, education
  projects/*.md        # Featured project entries (title, tech, roles, achievements)
  experiences/*.md     # Work history entries (company, position, date, location)
server/
  api/
    chat.ts            # POST /api/chat — AI assistant endpoint (GitHub Models)
  middleware/
    agent-discovery.ts # Injects Link headers; serves text/markdown on Accept negotiation
  routes/
    ai.txt.ts          # GET /ai.txt — AI crawler policy file
    openapi.json.ts    # GET /openapi.json — OpenAPI specification
    api/
      health.get.ts    # GET /api/health — health check endpoint
  utils/
    agent-discovery.ts # Shared helpers for OpenAPI doc and homepage Markdown generation
content.config.ts      # Nuxt Content collection schemas (Zod)
nuxt.config.ts         # Modules, head/meta, routeRules, runtimeConfig, color-mode
```

## Prerequisites

- **Node.js 20+** (Node 22 recommended — required by `eslint-flat-config-utils`)
- **npm 10+**

Nuxt Content uses `better-sqlite3`, which requires native module compilation. Ensure your environment can build native Node addons (Xcode CLT on macOS, `build-essential` on Linux).

## Getting Started

```bash
npm install
npm run dev        # http://localhost:3000
```

## Available Scripts

| Script             | Description                    |
| ------------------ | ------------------------------ |
| `npm run dev`      | Start local development server |
| `npm run build`    | Build production server bundle |
| `npm run preview`  | Run production preview locally |
| `npm run generate` | Generate fully static output   |
| `npm run lint`     | Run ESLint across the project  |
| `npm run format`   | Format all files with Prettier |

## Environment Variables

Create a `.env` file at the project root:

```env
GITHUB_TOKEN=your_github_pat_here
```

| Variable       | Required          | Description                                                                                                                                                     |
| -------------- | ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GITHUB_TOKEN` | Yes (for AI chat) | GitHub Personal Access Token used to call the GitHub Models inference API (`gpt-4o-mini`). Needs no special scopes — a classic token with no permissions works. |

Without `GITHUB_TOKEN`, the portfolio renders fully but the AI chat assistant will return a `500` error.

## Content Model

Schemas are defined and validated in `content.config.ts` using Zod.

### `user` collection — `content/user.md`

| Field                                                | Type         | Required |
| ---------------------------------------------------- | ------------ | -------- |
| `name`                                               | string       | ✓        |
| `email`                                              | email string | ✓        |
| `phone`                                              | string       | ✓        |
| `designation`                                        | string       | ✓        |
| `introduction`                                       | string       | ✓        |
| `summary`                                            | string       | ✓        |
| `brand.first`, `brand.last`                          | string       | ✓        |
| `github_link`, `linkedin_link`, `stackoverflow_link` | URL          | ✓        |
| `education[].institution`, `.degree`, `.date`        | string       | ✓        |
| `tech_stack[].name`, `.icon`                         | string       | optional |

### `experiences` collection — `content/experiences/*.md`

| Field      | Type                        | Required |
| ---------- | --------------------------- | -------- |
| `id`       | string                      | ✓        |
| `company`  | string                      | ✓        |
| `position` | string                      | ✓        |
| `date`     | string                      | ✓        |
| `location` | string                      | ✓        |
| `type`     | string (e.g. `"Full Time"`) | ✓        |

### `projects` collection — `content/projects/*.md`

| Field          | Type                  | Required |
| -------------- | --------------------- | -------- |
| `id`           | string                | ✓        |
| `title`        | string                | ✓        |
| `company`      | string                | ✓        |
| `date`         | string                | ✓        |
| `tech`         | string[]              | ✓        |
| `description`  | string                | ✓        |
| `roles`        | string[]              | ✓        |
| `achievements` | string[]              | ✓        |
| `repo_link`    | URL                   | optional |
| `preview_link` | URL                   | optional |
| `display`      | `"true"` \| `"false"` | optional |

## AI Chat Assistant

The assistant is powered by the GitHub Models free inference endpoint.

- **Endpoint**: `POST /api/chat`
- **Model**: `gpt-4o-mini` (via `https://models.inference.ai.azure.com`)
- **Context**: On every request the server fetches the full `user`, `experiences`, and `projects` collections and builds a structured system prompt. The last 20 conversation turns are forwarded for memory.
- **Rendering**: Assistant responses are rendered as Markdown in the UI via `<MDC>`.

## Agent / AI Discoverability

The site exposes several endpoints to support AI agents and crawlers:

| Endpoint                       | Description                                          |
| ------------------------------ | ---------------------------------------------------- |
| `GET /ai.txt`                  | AI crawler policy (training opt-out)                 |
| `GET /openapi.json`            | OpenAPI 3.1 specification                            |
| `GET /.well-known/api-catalog` | API catalog discovery                                |
| `GET /docs/api`                | Human-readable API documentation                     |
| `GET /api/health`              | Health check                                         |
| `Link` header on `/`           | Points to api-catalog and service-doc                |
| `Content-Signal` header        | `ai-train=no, search=yes, ai-input=no` on all routes |

A **WebMCP client plugin** (`app/plugins/webmcp.client.ts`) registers tools with AI-capable browsers via `navigator.modelContext`, enabling in-browser AI agents to navigate portfolio sections directly.

Notes:

- Home page currently renders projects where `display == "true"`.
- Keep `display` as string `"true"` for featured projects.

### `experiences` collection (`content/experiences/*.md`)

Required fields:

- `id`, `company`, `position`, `date`, `location`, `type`

## Data Fetching Pattern

This codebase uses Nuxt Content v3 query APIs in `script setup`:

```ts
const { data } = await useAsyncData("projects", () =>
  queryCollection("projects").order("id", "DESC").all()
)
```

Use `queryCollection(...)` APIs for content queries.

## SEO, Icons, and Manifest

Configured in `nuxt.config.ts` and `public/site.webmanifest`:

- Title + description meta
- Open Graph tags
- Canonical URL set to `https://devendergupta.com`
- Favicon (`.ico`, `16x16`, `32x32`)
- Apple touch icon
- Web manifest link

## Linting and Commit Hooks

- Pre-commit hook runs `lint-staged`
- Staged `js/ts/vue/json/css/md` files are auto-formatted and auto-fixed

Manual quality commands:

```bash
npm run lint
npm run format
```

## Production

Build and preview:

```bash
npm run build
npm run preview
```

Or run the built server directly:

```bash
node .output/server/index.mjs
```

Static deployment option:

```bash
npm run generate
```

Then deploy `.output/public` to any static host.

## Common Updates

- Update personal profile: edit `content/user.md`
- Add/edit projects: add Markdown files in `content/projects/`
- Add/edit experience: add Markdown files in `content/experiences/`
- Update theme and global styles: edit `app/assets/css/variables.css` and `app/assets/css/main.css`
