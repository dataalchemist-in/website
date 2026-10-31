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

`public/og.png` (1200×630) is rendered from `design/og/og-image.svg`. If you change the SVG, render it again with [resvg](https://github.com/RazrFalcon/resvg) and the Young Serif and Schibsted Grotesk font files, and commit the PNG.

## Deploy

A Cloudflare Worker named `website` serves the files in `out/` as static assets; there is no Worker code. `wrangler.jsonc` holds its config. Cloudflare builds and deploys every push to `main` (step-by-step: [`docs/cloudflare.md`](docs/cloudflare.md)):

- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`
- Environment variable: `NODE_VERSION=24`
- Custom domain: `dataalchemist.in`, with `www.dataalchemist.in` redirecting to it

To check the deploy config without uploading anything:

```sh
docker run --rm -v "$PWD":/repo -w /repo node:24-alpine sh -c "npm run build && npx --yes wrangler@4 deploy --dry-run"
```

The output is plain static files, so any static host (for example Vercel or Cloudflare Pages) works too.

## Open items

These are placeholders until the operator confirms them (details in `docs/brief.md`):

- Privacy and terms (`app/privacy`, `app/terms`): plain-language pages for dataalchemist.in. An AI review against Indian law (DPDP Act 2023, SPDI Rules) was applied on 31 October 2026, then updated with the operator's answers. A qualified lawyer should still sign off.
  - Operator: Nitesh Singla, sole proprietor, New Delhi. No postal address or phone number is published anywhere, by choice.
  - Mail: hello@ and support@dataalchemist.in forward to a Gmail inbox. Emails are kept, not deleted; the pages say so and offer deletion on request. No reply-time promise.
  - App links: the Kipsa and Bookshaw policies are not final, so `appPolicies` in `components/LegalPage.tsx` is empty. Add each app before it launches.
  - Cloudflare: confirm Web Analytics is off for dataalchemist.in (the page says there is no analytics) and decide on Bot Fight Mode (the page mentions its security cookie).
- Page copy: the operator plans to revise the text; the current copy is accepted for launch.
- Bookshaw and Kipsa are under development and shown as "Coming soon". Switch a card to "Live" when that product launches (`components/Products.tsx`).
- Bookshaw facts: confirm the parent flow and the bookshop line (`components/Products.tsx`).
- Trademark: none registered. The operator will apply for Bookshaw and Kipsa once they have traction, and will not register Data Alchemist. The site makes no trademark claims.
