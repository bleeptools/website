# bleeptools website: spec

The website of **bleeptools**, a maker of music software for iPad and Mac.
For now it has a holding page at the root and one product page, pritoki.

Status: draft v1, 2026-11-01

---

## 1. Pages

| Path        | Page                                  | Spec          |
|-------------|---------------------------------------|---------------|
| `/`         | Holding page: logo and "Coming soon"  | this file, §4 |
| `/pritoki/` | pritoki landing page                  | `pritoki.md`  |
| `/legal/`   | Imprint and privacy policy (EN and DE) | this file, §5 (contents still marked `todo`) |

Each product gets its own folder with its own `index.html`, CSS, JS and images, plus its own spec file in the root (`<product>.md`).

## 2. Tech

- Plain HTML, CSS and a small amount of vanilla JS. No build step and no framework.
- Must work as plain static files on any host (GitHub Pages planned). Links between pages are relative.
- No cookies, no analytics, no third-party requests.
- File layout:
  ```
  index.html            # holding page
  css/style.css         # holding page and legal page styles
  fonts/                # shared: Inter, self-hosted (variable woff2, Latin subset)
  img/                  # shared: logo-bleeptools.png, favicon.svg
  assets/               # shared source files (logo.png), not referenced by any page
  legal/                # imprint and privacy policy
  pritoki/              # pritoki landing page, see pritoki.md
  SPEC.md               # this file
  pritoki.md            # pritoki spec
  ```

## 3. Design language

Swiss Style (International Typographic Style), shared across all pages: Inter only, hairline rules, square corners, generous space, orange as the only signal color. Tokens:

| Token        | Value     |
|--------------|-----------|
| `--c-navy`   | `#212431` |
| `--c-accent` | `#FC5C02` |
| `--c-muted`  | `#878787` |
| `--c-ivory`  | `#F2EDE0` |

- Product pages are dark (ivory on navy). The holding page is light (navy on ivory), matching the ivory top bar on product pages.
- On ivory, use navy for all text. `--c-muted` is too light on ivory (about 3.2:1) for small text.
- Breakpoints and gutters as in `pritoki.md` §4: 16px base, 24px from 768px, 40px from 1024px; content max width 1200px.
- Focus ring: 2px orange outline with an offset. Interactive targets at least 44px tall.

## 4. Holding page (`/`)

- Background `--c-ivory`, text `--c-navy`. Fills the viewport (`min-height: 100svh`), with the footer at the bottom.
- Center of the page:
  - BLEEPTOOLS logo (`img/logo-bleeptools.png`, 500×191) as the h1, with `alt="bleeptools"`. Width 180–250px; no more than 250px so it stays sharp on 2x screens.
  - "Coming soon" under it, in the meta-label style (12px, 600, uppercase, letter-spacing 0.06em), with a short 1px navy rule on top.
- Footer: links go to `legal/imprint-en.html` and `legal/privacy-en.html`. 1px navy rule across the content width. "© 2026 bleeptools" on the left, "Imprint · Privacy policy" on the right; wraps on narrow screens. Links are navy and turn orange on hover.
- Meta: `<title>` "bleeptools · coming soon", a short meta description, `lang="en"`, `theme-color` `#F2EDE0`, favicon `img/favicon.svg`.
- No JS.

## 5. Legal pages (`/legal/`)

- `imprint-en.html`, `imprint-de.html`, `privacy-en.html`, `privacy-de.html`. They use the same stylesheet as the holding page: navy on ivory, Inter, `noindex`.
- Top bar: logo (28px tall, links home) on the left, language switch ("Deutsch" / "English") on the right, 1px navy rule underneath.
- Head: meta row in the label style ("Legal" / "Rechtliches", plus "Last updated" / "Stand" on the privacy pages), then the h1 (700, up to 5rem, letter-spacing -0.045em), then a 2px navy rule.
- Body: base, one column with a text width of about 62ch. Each h2 has a 1px rule on top. `lg`, 12 columns: h2 in columns 1–4, text in columns 5–11, and the rule runs across both, broken at the column gap.
- Draft values are wrapped in `.todo` and shown with a light orange highlight until they are confirmed.
- Footer as on the holding page. The links go to the imprint and privacy policy in the same language, and the current page's link is orange (`aria-current="page"`).

## 6. Placeholders and open items

| Item                          | Current value  | Owner |
|-------------------------------|----------------|-------|
| Link to pritoki from `/`      | none yet       | you   |
| Domain                        | unknown        | you   |

Product-specific items are listed in each product's spec.
