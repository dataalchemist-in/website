# Cloudflare Pages setup

Dashboard steps to host this repo on Cloudflare Pages at `dataalchemist.in`. Cloudflare already manages the DNS for the domain.

## 1. Connect the repo

1. In the Cloudflare dashboard, open **Workers & Pages** and choose **Create application**, then the **Pages** tab, then **Connect to Git**.
2. Pick GitHub. If asked, install the Cloudflare Pages GitHub app on the `dataalchemist-in` organisation and give it access to the `website` repo only.
3. Select `dataalchemist-in/website` and choose **Begin setup**.

## 2. Build settings

| Setting | Value |
|---------|-------|
| Project name | `dataalchemist` (this becomes `dataalchemist.pages.dev`) |
| Production branch | `main` |
| Framework preset | None |
| Build command | `npm run build` |
| Build output directory | `out` |
| Root directory | leave empty |

Under **Environment variables (advanced)**, add `NODE_VERSION` = `24` for Production and Preview.

Choose **Save and Deploy**, wait for the first build to finish, then open `https://dataalchemist.pages.dev` to check it.

Every push to `main` deploys to production. Other branches and pull requests get preview URLs.

## 3. Custom domain

1. In the Pages project, open **Custom domains** and choose **Set up a custom domain**.
2. Enter `dataalchemist.in` and confirm. Because the zone is in the same account, Cloudflare adds the DNS record itself. The domain shows **Active** once the certificate is issued, usually within a few minutes.

## 4. Redirect `www` to the apex

1. In the `dataalchemist.in` zone, open **DNS** and add a record for `www`:
   - Type `AAAA`, name `www`, content `100::`, **Proxied** (orange cloud). The address is a placeholder; the redirect rule answers before any request reaches it.
2. Open **Rules** and create a **Redirect Rule**. Use the "Redirect from WWW to root" template, or set it up by hand:
   - When: hostname equals `www.dataalchemist.in`
   - Then: dynamic redirect to `concat("https://dataalchemist.in", http.request.uri.path)`, status `301`, preserve query string on.
3. Deploy the rule.

## 5. Check

```sh
curl -sI https://dataalchemist.in | head -1                # 200
curl -sI https://www.dataalchemist.in/x?y=1 | grep -i ^location  # https://dataalchemist.in/x?y=1
curl -s https://dataalchemist.in/robots.txt
```

Then paste `https://dataalchemist.in` into a social card checker (for example the LinkedIn Post Inspector) to confirm the 1200×630 image shows.
