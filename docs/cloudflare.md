# Cloudflare setup

The site is a Cloudflare Worker named `website` that serves the static export in `out/`. There is no Worker code: `wrangler.jsonc` points Wrangler at `out/`, so every request is served as a static asset. Static asset requests are free and unlimited, including on the Workers Free plan. Cloudflare already manages the DNS for `dataalchemist.in`.

Without `wrangler.jsonc`, `npx wrangler deploy` detects Next.js and tries to set up the OpenNext server adapter, which fails on a static export. Keep the file.

## 1. Connect the repo

1. In the Cloudflare dashboard, open **Workers & Pages** and choose **Create application**, then **Import a repository** (Connect to Git).
2. Pick GitHub. If asked, install the Cloudflare GitHub app on the `dataalchemist-in` organisation and give it access to the `website` repo only.
3. Select `dataalchemist-in/website`.

## 2. Build settings

| Setting | Value |
|---------|-------|
| Project name | `website` (must match `name` in `wrangler.jsonc`) |
| Production branch | `main` |
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy` |
| Root directory | leave empty |

Under **Settings → Build → Variables and secrets** (or **Environment variables** on the setup screen), add `NODE_VERSION` = `24`. It is a build setting, not a secret.

Every push to `main` builds and deploys. A successful build log ends with Wrangler uploading the files from `out/` and printing the `website.<account>.workers.dev` URL.

## 3. Custom domain

1. Open the `website` Worker, then **Settings → Domains & Routes → Add → Custom domain**.
2. Enter `dataalchemist.in`. Because the zone is in the same account, Cloudflare creates the DNS record and certificate itself.
3. If another Worker or Pages project already holds `dataalchemist.in`, remove the domain there first.

## 4. Redirect `www` to the apex

1. In the `dataalchemist.in` zone, open **DNS → Records** and add a record for `www` (or keep an existing proxied one):
   - Type `AAAA`, name `www`, content `100::`, **Proxied** (orange cloud). The address is a placeholder; the redirect rule answers before any request reaches it.
2. Open **Rules → Overview → Create rule → Redirect Rule**:
   - Name: `www to apex`
   - When: custom filter expression, hostname equals `www.dataalchemist.in`
   - Then: dynamic redirect, expression `concat("https://dataalchemist.in", http.request.uri.path)`, status `301`, preserve query string on.
3. Deploy the rule. The editor may warn that `www` is not proxied; the warning can be stale, so check the DNS record and deploy anyway.
4. Turn on **SSL/TLS → Edge Certificates → Always Use HTTPS**.

## 5. Check

```sh
curl -sI https://dataalchemist.in | head -1                          # HTTP/2 200
curl -s https://dataalchemist.in | grep -c "We make everyday business simple"  # 1
curl -sI "https://www.dataalchemist.in/x?y=1" | grep -i ^location     # https://dataalchemist.in/x?y=1
curl -sI "http://www.dataalchemist.in/x?y=1" | grep -i ^location      # https://... (not http://www...)
curl -s https://dataalchemist.in/robots.txt
```

Then paste `https://dataalchemist.in` into a social card checker (for example the LinkedIn Post Inspector) to confirm the 1200×630 image shows.
