# dataalchemist.in

The business website for Data Alchemist: one static page built with Next.js 16, TypeScript and Tailwind CSS 4. The brief is in [`docs/brief.md`](docs/brief.md).

Node runs only in Docker. Every command below uses the `node:24-alpine` image with the repo mounted at `/repo`.

## Develop

```sh
docker run --rm -v "$PWD":/repo -w /repo node:24-alpine npm ci
docker run --rm -it -v "$PWD":/repo -w /repo -p 3000:3000 node:24-alpine npm run dev -- -H 0.0.0.0
```

Open http://localhost:3000.

## Check and build

```sh
docker run --rm -v "$PWD":/repo -w /repo node:24-alpine sh -c "npm run lint && npm run typecheck && npm run build"
```

The static site is written to `out/`. To preview it:

```sh
docker run --rm -it -v "$PWD":/repo -w /repo -p 4173:4173 node:24-alpine npx --yes serve@14 out -l 4173
```

CI (`.github/workflows/ci.yml`) runs `npm ci`, lint, typecheck and build on every pull request and every push to `main`.

## Social image

`public/og.png` (1200×630) is rendered from `design/og/og-image.svg`. If you change the SVG, render it again with [resvg](https://github.com/RazrFalcon/resvg) and the Young Serif font file, and commit the PNG.

## Deploy

Cloudflare Pages builds the site from this repo:

- Build command: `npm run build`
- Output directory: `out`
- Environment variable: `NODE_VERSION=24`
- Custom domain: `dataalchemist.in`, with `www.dataalchemist.in` redirecting to it

The output is plain static files, so any static host (for example Vercel) works too.

## Open items

These are placeholders until the operator confirms them (details in `docs/brief.md`):

- Contact email: `hello@dataalchemist.in` is assumed. Confirm that the mailbox exists (`components/Contact.tsx`).
- City: the page shows `[City, State]` (`components/Contact.tsx`).
- Bookshaw facts: confirm the parent flow and the bookshop line (`components/Products.tsx`).
- Trademark: search IP India for "Data Alchemist" (classes 9, 35, 42) and the "da" mark. If the mark conflicts, the fallback is the "Sol" logo in `design/prototype/logos.dc.html`.
