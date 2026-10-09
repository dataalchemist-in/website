# Data Alchemist website: brief

The business-profile site for Data Alchemist at `dataalchemist.in`. Decided with the operator on 2026-10-09.

## Positioning

- Data Alchemist is a **product company** (no consulting or client work). The site presents the company, not one product.
- The products section lists **Bookshaw** only (live at https://bookshaw.in). **Tijori is not mentioned.**
- Audience: parents, school bookshops, partners and future hires who hear the name and look it up.

## Design: "Alchemy" (option 1)

The reference prototype is in `design/prototype/` (`home-alchemy.dc.html` = the page, `logos.dc.html` = logo concepts). These are canvas-editor files: read them for markup, copy and styles. They do not run on their own (they load the editor's runtime `support.js` and use `{{accent}}`-style holes; the accent is `#D4A12A`).

Tokens:

| Token | Value | Use |
|-------|-------|-----|
| ground | `#ECEFEA` | page background (cool mineral grey-green, not cream) |
| surface | `#F7F8F5` | raised panels |
| line | `#D5DBD5` | panel borders |
| ink | `#13221F` | text, dark sections |
| muted | `#3F4F4B` / `#4A5A56` | secondary text |
| verdigris | `#2E6B5E` | links, focus ring, "Live" dot |
| gold | `#D4A12A` | the logo's filled bowl and the one "result" highlight only |
| on-dark text | `#E8EEEA`, muted `#B9C6C1` | contact section |

- Type: **Young Serif** (headings, wordmark; one weight) and **Schibsted Grotesk** (body 400/500/700). Both are SIL OFL Google Fonts.
- Gold is used sparingly: the logo bowl, the hero "result" band, the contact email on dark.
- Motion: only one moment, where the logo's gold bowl settles in once on load. No motion with `prefers-reduced-motion`.

## Logo: "da" monogram

Lowercase "d" (outlined bowl plus a tall stem) beside "a" (a solid gold bowl plus a short stem). The idea is raw material on the left and refined material on the right. SVG (viewBox `0 0 140 100`):

```svg
<circle cx="36" cy="62" r="22" fill="none" stroke="#13221F" stroke-width="10"/>
<line x1="63" y1="10" x2="63" y2="84" stroke="#13221F" stroke-width="10" stroke-linecap="round"/>
<circle cx="100" cy="62" r="27" fill="#D4A12A"/>
<line x1="127" y1="36" x2="127" y2="84" stroke="#13221F" stroke-width="10" stroke-linecap="round"/>
```

On dark backgrounds the ink strokes become `#E8EEEA`. Lockup: the mark, then "Data Alchemist" in Young Serif. "Sol" (ring of growing dots around a gold centre, in `logos.dc.html`) is the fallback if the trademark search for "da" turns up a conflict.

## Page content (one page)

1. **Header**: logo lockup; links Products, How we build, Contact (in-page anchors).
2. **Hero**: heading "We make everyday business simple." Intro: "Data Alchemist is a product company from India. We take slow, paper-heavy work and turn it into small, clear products that anyone can use in a few taps." Buttons: "See our products" (primary), "Get in touch". Visual panel: tilted dashed chips (Printed lists, Phone calls, Paper registers, Cash slips, Forwarded messages, Spreadsheets, Handwritten orders), the logo between two rules, then the gold band "Simple products. A few taps." / "Built for the people who use them". Caption: "Everyday paperwork in, simple products out."
3. **Products**: Bookshaw panel with a "Live" chip: "School booklists and stationery, ordered in one go. Parents choose their school and class, and Bookshaw puts the whole list in the cart." plus the bookshop line, "Visit bookshaw.in", and a 3-step list (Choose the school / Pick the class / Pay once). Below: "More products are on the way. Each one does one job for one kind of business."
4. **How we build**: Fewest steps, No waiting, Product first (copy in the prototype). Not numbered: they are not a sequence.
5. **Contact** (dark): "A small product company in India." Email shown large in gold. Footer: © year, domain.

Copy rules: plain sentences, active voice, no ALL-CAPS labels, no emoji.

## Open items (placeholders until the operator confirms)

- Contact email: `hello@dataalchemist.in` is assumed. Confirm that the mailbox exists.
- City: `[City, State]`.
- Bookshaw facts: confirm the parent flow and the bookshop line.
- Trademark: search IP India for "Data Alchemist" (classes 9, 35, 42) and the "da" mark. A US application for DATAALCHEMIST exists (serial 98370796, data-analytics SaaS).

## Hosting

- Cloudflare Pages, connected to the GitHub repo. Cloudflare already manages the DNS for `dataalchemist.in`. Vercel Pro is planned company-wide, so moving later is fine; keep the site a plain static export so either host works.
- Repo: public, `dataalchemist-in/website`.
