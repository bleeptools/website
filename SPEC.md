# pritoki landing page: spec

Landing page for **pritoki**, a drum machine by bleeptools for iPad and Mac (standalone app and AUv3 plugin).
Goals: explain the instrument, send people to the beta, and collect emails for the launch.

Status: draft v1, 2026-10-30

---

## 1. Scope

**In scope**
- One responsive page, designed mobile-first.
- Button to join the beta (link target empty for now: `href="#"`, marked `TODO`).
- Mailing list signup form, not connected to any service yet (UI and client-side validation only).
- Footer links for Impressum, privacy policy and social channels (all placeholders).

**Out of scope for now**
- Connecting the form to a newsletter provider.
- The Impressum and privacy policy pages themselves (links only).
- Analytics, cookies, or any third-party requests.
- A light theme. The page is dark only, like the instrument.

## 2. Tech

- Plain HTML, CSS and a small amount of vanilla JS. No build step and no framework.
- File layout:
  ```
  index.html
  css/style.css
  js/main.js            # form handling, small enhancements
  fonts/                # Inter, self-hosted (woff2)
  img/                  # optimized images, kebab-case names
  assets/               # original source files, not referenced by the page
  ```
- Self-host Inter (variable woff2, Latin subset) so the page makes no requests to Google Fonts (GDPR).
- Must work as plain static files on any host.

## 3. Design tokens

| Token              | Value     | Use                                              |
|--------------------|-----------|--------------------------------------------------|
| `--c-bg`           | `#212431` | Page background                                  |
| `--c-surface`      | `#2A2F3F` | Cards, alternating section bands, form field     |
| `--c-accent`       | `#FC5C02` | Primary buttons, focus ring, highlights          |
| `--c-muted`        | `#878787` | Secondary text, captions, borders                |
| `--c-ivory`        | `#F2EDE0` | Main text color; top header bar background       |

- Text: ivory on bg (high contrast). Use muted only for small, non-essential text, and check it passes WCAG AA at the size used (#878787 on #212431 is about 4.6:1, which passes AA for body text).
- Primary button: orange background with `#212431` text. Use bold weight, since ivory on orange is too low-contrast for small text.
- Shapes: rounded corners and circles, echoing the knobs, rings and the round letters of the BLEEPTOOLS logo. Radius tokens: `--r-sm: 6px`, `--r-md: 12px`, `--r-pill: 999px`.
- Typography: Inter only.
  - Wordmark "pritoki": 600, lowercase, tight letter-spacing, scaled with `clamp()`.
  - Section headings (h2): 700. Body text: 400, line-height 1.6, max width about 60ch.
- Spacing scale: 4 / 8 / 16 / 24 / 40 / 64 / 96 px.

## 4. Breakpoints (mobile-first)

| Name    | Min width | Layout                                                    |
|---------|-----------|-----------------------------------------------------------|
| base    | 0         | Single column, 16px side gutters, image then text          |
| `md`    | 768px     | Wider gutters, larger type                                 |
| `lg`    | 1024px    | Feature blocks become 2 columns; image side alternates     |
| `xl`    | 1280px    | Content max width about 1200px, centered                   |

No horizontal scrolling at 320px width.

## 5. Page structure

### 5.1 Top bar (ivory)
- Thin full-width bar, background `--c-ivory`, about 48px tall on mobile.
- Left: BLEEPTOOLS logo (`logo.png`, 500×191). The dark letters and orange B read well on ivory. Shown at about 28–32px height and linked to the bleeptools site (placeholder URL).
- Right (from `md` up): a small "Join the beta" text link. On mobile, nothing else goes in the bar.
- Not sticky. It scrolls away with the page.

### 5.2 Hero
- Source copy: `# pritoki` and the lines below it in `texts.md`.
- Order on mobile:
  1. Wordmark **pritoki** (h1)
  2. Tagline: "One voice. Three tracks. Endless in-betweens." (large, ivory)
  3. Platform line (muted): "Drum machine for iPad & Mac · Standalone + AUv3"
  4. CTAs: **Join the beta** (primary, orange) and **Get notified** (secondary, outlined, jumps to `#signup`)
  5. Hero image: `One voice.png` (iPad screenshot), full width
  6. Intro paragraph ("Every hit is a blend…")
- On `lg` and up: text and buttons on the left, iPad image on the right and allowed to bleed past the content width a little. The intro paragraph goes under the buttons.
- Optional: a subtle orange glow behind the iPad.

### 5.3 Feature blocks
There are 7 blocks, in the order of `texts.md`. Each one is a `<section>` with an h2 and a paragraph, plus a visual.

| # | Heading                                         | Visual                                   | Notes |
|---|-------------------------------------------------|------------------------------------------|-------|
| 1 | Generate a groove. Then make it yours.          | `Generate a groove.png` (563×563)        | Sequencer ring. Show at no more than about 420px wide. |
| 2 | Blend and shape.                                | `Blend and shape.png` (638×432)          | XY pad with blend modes. |
| 3 | Capture a moment. Morph to the next.            | **SVG/CSS rebuild** (see 6.1)            | Morph knob plus S1–S4. |
| 4 | Change the model. Change the character.         | **SVG/CSS rebuild** (see 6.2)            | Large Model knob. |
| 5 | Play it like an instrument.                     | `Play it like an instrument.png` (344×798) | Tall image. On mobile, cap its height at about 360px and crop from the top with `object-fit: cover; object-position: top`. |
| 6 | Add grit. Let it ring.                          | **Placeholder**, asset to come            | Use an aspect-ratio box (4:3) with a dashed muted border and the label "image coming". |
| 7 | Play it on its own. Plug it into your setup.    | **Placeholder**, asset to come            | Same as above. |

Layout:
- base: visual on top, then heading and text. Visuals are centered, on a `--c-surface` rounded panel with padding.
- `lg`: two columns (visual about 45% and text about 55%). The visual side alternates: odd blocks have the visual on the left, even blocks on the right.
- Vertical rhythm: 64px between blocks on mobile, 96px on desktop.
- Optional: a small orange index number ("01" to "07") above each heading.

### 5.4 Signup (`#signup`)
- Panel on `--c-surface`, centered, with a max width of about 560px.
- Heading: "Get notified at launch". Subline (muted): "One email when pritoki is out. No spam."
- Form:
  - `<label>` "Email" (visually hidden is fine, but it must exist), `<input type="email" required autocomplete="email">`
  - Button: **Notify me** (primary)
  - Consent note under the form (small, muted): "By subscribing you agree to our [privacy policy]." (link placeholder)
- Layout: input and button stacked on mobile, side by side from `md` up.
- Behavior (not wired): `action` attribute left empty, marked `TODO`. JS stops the submit, checks the email with the browser's built-in validation, and shows an inline message in an `aria-live="polite"` region ("Thanks! We'll let you know."). Without JS, nothing breaks; the form just goes nowhere.
- A second **Join the beta** button sits below the panel ("Want to try it now? Join the beta").

### 5.5 Footer
- Background `--c-bg`, with a thin muted top border.
- Social links as text links: Instagram, YouTube, Discord (exact list to be decided, all `href="#"` for now). Ivory, turning orange on hover. Swap in SVG icons once the channels are final.
- Links: Impressum · Privacy policy (placeholders).
- "© 2026 bleeptools". Small and muted.
- Apple trademark note (optional): "iPad, Mac and GarageBand are trademarks of Apple Inc."

## 6. Rebuilt visuals (SVG/CSS)

Both rebuilds must match the app's style: ivory knobs (`#F2EDE0`) with a small dark dot as the indicator, labels in Inter, and a dark panel behind them.

### 6.1 Snapshots (block 3)
- Contents: a "Morph" label, a knob with its value ("1/4") underneath, and four buttons S1–S4. The active one is orange; the others use `--c-surface` with ivory text.
- base: lay it out **horizontally** (knob on the left, S1–S4 in a row). The source image is very tall and narrow, which wastes space on a phone.
- `lg`: vertical column, as in the app.
- Optional animation: the active snapshot moves S1 → S2 → S3 → S4 every few seconds, crossfading the orange. Turned off under `prefers-reduced-motion`.

### 6.2 Model knob (block 4)
- One large knob (about 160–200px) with the label "Model".
- Optional animation: the knob slowly turns back and forth, with a faint label underneath showing the change ("tones bend into one" ↔ "layered voices"). Turned off under `prefers-reduced-motion`.
- Either inline SVG or CSS with a `rotate` transform on the indicator.

## 7. Images

- Rename to kebab-case in `img/` (no spaces): `hero-ipad`, `generate-a-groove`, `blend-and-shape`, `play-it-like-an-instrument`, `logo-bleeptools`.
- Export AVIF with a PNG fallback through `<picture>` (WebP skipped: no encoder available locally, and AVIF is smaller).
- Hero (656 KB source, 2615px): responsive `srcset` at 800, 1400 and 2000w. Target under 200 KB for the mobile size.
- Every `<img>` has `width`/`height` set to prevent layout shift. Use `loading="lazy"` for everything except the logo and hero (hero gets `fetchpriority="high"`).
- Alt text describes what the screenshot shows, e.g. "pritoki on iPad: three circular sequencer rings around an XY blend pad".

## 8. Accessibility

- Semantic landmarks: `header`, `main`, `section` (each labelled by its h2), `footer`.
- One h1 (pritoki), and an h2 for each block.
- Visible focus ring: 2px orange outline with an offset.
- All interactive targets at least 44×44px.
- Decorative SVG rebuilds: `aria-hidden="true"`, or `role="img"` with a short label.
- Respect `prefers-reduced-motion`.
- Checked with keyboard only and with VoiceOver on iOS Safari.

## 9. Meta / SEO

- `<title>`: "pritoki: drum machine for iPad & Mac (AUv3) · bleeptools"
- Meta description based on the tagline and the intro.
- Open Graph and Twitter card tags. The OG image is a 1200×630 crop of the hero, generated once and stored in `img/og.png`.
- `lang="en"`, `theme-color` set to `#212431`, favicon (a pritoki app icon if one exists; otherwise the orange "B" circle from the logo).

## 10. Performance budget

- Total page weight on the first mobile view: under 500 KB.
- No render-blocking third-party resources.
- Lighthouse mobile score of 95 or higher for Performance, Accessibility, Best Practices and SEO.

## 11. Placeholders and open items

| Item                         | Current value  | Owner |
|------------------------------|----------------|-------|
| Beta link (TestFlight)       | `#`            | you   |
| Form endpoint / provider     | not wired      | you   |
| Impressum URL                | `#`            | you   |
| Privacy policy URL           | `#`            | you   |
| Social channels and URLs     | `#`            | you   |
| bleeptools site URL (logo)   | `#`            | you   |
| Asset: Add grit              | placeholder    | you   |
| Asset: Play it on its own    | placeholder    | you   |
| App icon / favicon           | logo fallback  | you   |
| Domain (for OG absolute URLs)| unknown        | you   |
