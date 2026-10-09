# Data Alchemist website

The one-page business site for Data Alchemist at https://dataalchemist.in.

Read `docs/brief.md` first: positioning, design tokens, logo SVG, page copy, open items and hosting. The reference design is `design/prototype/home-alchemy.dc.html` (canvas-editor markup: read it for structure, copy and styles; it does not run on its own).

## Rules

- Stack: Next.js 16 App Router, TypeScript, Tailwind CSS 4. Static export only (`output: "export"`, `images.unoptimized: true`); the build goes to `out/`.
- No server code, no environment variables, no secrets. Keep the site a plain static export so it can move between hosts. It is served by a Cloudflare Worker with static assets only (`wrangler.jsonc`); do not add Worker code or an OpenNext adapter.
- Fonts come from `next/font/google`: Young Serif (headings, wordmark) and Schibsted Grotesk (body).
- Run Node only in Docker (`node:24-alpine`, repo mounted at `/repo`), never on the host. Commands are in `README.md`.
- One lockfile: `package-lock.json` (npm).
- Keep it small: one page, the `Logo` component, section components in `components/`. No UI kit, no animation library.
- Design tokens live as Tailwind theme variables in `app/globals.css`. Gold (`gold`) is only for the logo bowl, the hero "result" band and the contact email.
- One motion only: the logo's gold bowl settles in once on load, and not at all under `prefers-reduced-motion`.
- Accessibility: visible focus, touch targets of at least 44px, no horizontal scroll down to 360px wide.
- Copy: plain sentences, active voice, no ALL-CAPS labels, no emoji.
- Open items (email, city, Bookshaw facts, trademark) stay as visible placeholders until the operator confirms them. They are marked `OPEN ITEM` in the code and listed in `README.md`.
- Before committing, run lint, typecheck and build (CI runs the same on every pull request).

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
