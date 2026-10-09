Build the Data Alchemist business website in this repo (~/Documents/personal/dataalchemist/website, git initialised on `main`, no commits yet).

Read first: `docs/brief.md` (positioning, design tokens, logo SVG, page copy, open items, hosting) and the prototype in `design/prototype/` (`home-alchemy.dc.html` is the page to reproduce; `logos.dc.html` holds the logo concepts). The prototype files are canvas-editor markup: lift the structure, copy and inline styles from them, not the runtime (`support.js`, `<x-dc>`, `{{accent}}` = `#D4A12A`).

Stack and constraints:
- Next.js 16 App Router + TypeScript + Tailwind CSS 4, static export (`output: "export"`, `images.unoptimized: true`), build output in `out/`. No server code, no env vars, no secrets.
- Fonts through `next/font/google`: Young Serif, Schibsted Grotesk.
- Run Node only in Docker (`node:24-alpine`, repo mounted at `/repo`), never on the host. Use one `package-lock.json`.
- Keep it small: one page, a `Logo` component (the "da" monogram SVG from the brief, with light and dark variants), section components only where they make the page easier to read. No UI kit, no animation library.

Build:
1. Scaffold the app and tooling: ESLint (Next config), `typecheck` script, `.gitignore`, `README.md` (dev, build, deploy) and `AGENTS.md` (+ `CLAUDE.md` containing `@AGENTS.md`) holding the repo rules above and pointing at `docs/brief.md`.
2. Build the page exactly to the brief: tokens as Tailwind theme variables, the five sections, the logo's one-time "settle" animation (off under `prefers-reduced-motion`), visible focus, 44px+ touch targets, responsive to 360px with no horizontal scroll.
3. Metadata: title, description, canonical `https://dataalchemist.in`, Open Graph and Twitter cards with a static 1200×630 image (logo lockup on the ground colour), `app/icon.svg` from the mark, `robots.txt`, `sitemap.xml`.
4. CI: `.github/workflows/ci.yml` on pull requests and pushes to `main` running `npm ci`, lint, typecheck and build on `ubuntu-latest` (Node 24).
5. Verify: build in Docker, serve `out/` locally, and screenshot desktop (1440) and phone (390) widths. Fix what is broken, then show me the screenshots.
6. Commit on a branch and stop. Ask me before creating the GitHub repo `dataalchemist-in/website` (public) or pushing anything.

After I approve, write down (do not do) the Cloudflare Pages setup: connect the repo, build command `npm run build`, output directory `out`, environment variable `NODE_VERSION=24`, custom domain `dataalchemist.in` plus a `www` redirect. I do the dashboard steps.

Keep the brief's open items (email, city, Bookshaw facts, trademark search) as visible placeholders and list them at the end.
