# Devender Me

Personal portfolio website built with Nuxt 4 and Nuxt Content 3.

The production site is configured around `https://devendergupta.com`.

Live content is driven from Markdown files in the `content/` directory and rendered into sections for hero, tech stack, projects, about, and contact.

## Tech Stack

- Nuxt 4
- Vue 3
- Nuxt Content 3
- Nuxt Image
- Nuxt Icon (Iconify)
- @nuxtjs/color-mode
- ESLint + Prettier + Husky + lint-staged

## Features

- Content-driven portfolio data (user profile, projects, work experience)
- Responsive single-page layout with anchor navigation
- Dark/light color mode support
- SEO metadata and social sharing tags
- PWA basics via `site.webmanifest` and favicon set
- Optimized images through `NuxtImg`

## Project Structure

```text
app/
	components/      # UI sections and reusable components
	layouts/         # default app layout
	pages/           # route entry points
content/
	user.md          # personal info and brand/social links
	projects/*.md    # featured project entries
	experiences/*.md # work history entries
public/
	favicon*         # favicon assets
	site.webmanifest # web app manifest
	og-preview.png   # Open Graph preview image
content.config.ts  # Nuxt Content collection schemas
nuxt.config.ts     # app head/meta/modules/runtime config
```

## Prerequisites

- Node.js 20+
- npm 10+

Nuxt Content uses SQLite under the hood (`better-sqlite3`), so your machine must be able to build native Node modules.

## Getting Started

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

App runs at `http://localhost:3000` by default.

## Available Scripts

- `npm run dev` - Start local development server
- `npm run build` - Build production server bundle
- `npm run preview` - Run production preview
- `npm run generate` - Generate static output
- `npm run lint` - Run ESLint
- `npm run format` - Format files with Prettier

## Content Model

Schemas are defined in `content.config.ts`.

### `user` collection (`content/user.md`)

Required fields:

- `name`, `email`, `designation`
- `introduction`, `summary`
- `brand.first`, `brand.last`
- `github_link`, `linkedin_link`
- `education[]` with `institution`, `degree`, `date`
- Optional `tech_stack[]` with `name`, `icon`

### `projects` collection (`content/projects/*.md`)

Required fields:

- `id`, `title`, `company`, `date`
- `tech[]`, `description`, `roles[]`, `achievements[]`
- Optional `repo_link`, `preview_link`, `display`

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
