# pritoki landing page: spec

Part of the bleeptools website (see `SPEC.md`). Lives at `/pritoki/`.


Landing page for **pritoki**, a rhythmic synthesizer by bleeptools for iPad and Mac (standalone app and AUv3 plugin).
Goals: explain the instrument, send people to the beta, and collect emails for the launch.

Status: draft v2 (Swiss Style), 2026-11-01

---

## 1. Scope

**In scope**
- One responsive page, designed mobile-first.
- Button to join the beta, linking to TestFlight: https://testflight.apple.com/join/NV3zgBBt
- Mailing list signup form, not connected to any service yet (UI and client-side validation only).
- Footer links for Impressum, privacy policy and social channels (all placeholders).

**Out of scope for now**
- Analytics, cookies, or any third-party requests.
- A light theme. The page is dark only, like the instrument.

## 2. Tech

- Plain HTML, CSS and a small amount of vanilla JS. No build step and no framework.
- File layout (paths relative to the site root):
  ```
  pritoki/
    index.html
    texts.md            # source copy
    css/style.css
    js/main.js          # form handling, small enhancements
    img/                # optimized images, kebab-case names
    assets/             # original source files, not referenced by the page
  fonts/                # shared: Inter, self-hosted (woff2)
  img/                  # shared: logo-bleeptools.png, favicon.svg
  ```
- Self-host Inter (variable woff2, Latin subset) so the page makes no requests to Google Fonts (GDPR).
- Must work as plain static files on any host.

## 3. Design language and tokens

Style: **Swiss Style** (International Typographic Style). Strict grid, hairline rules, oversized flush-left type, square corners, generous space, orange as the only signal color.

| Token              | Value     | Use                                              |
|--------------------|-----------|--------------------------------------------------|
| `--c-navy`         | `#212431` | Page background                                  |
| `--c-slate`        | `#2A2F3F` | Reserved (not used on the page yet)              |
| `--c-accent`       | `#FC5C02` | Section numbers, primary button, focus ring, input focus |
| `--c-muted`        | `#878787` | Hairline rules, meta row, captions, secondary text |
| `--c-ivory`        | `#F2EDE0` | Main text; strong rules; top bar background      |

- Text: ivory on navy. Muted grey only for small, secondary text (#878787 on #212431 is about 4.6:1, passes AA).
- Rules: `--rule` 1px muted (between feature blocks, meta row, footer), `--rule-strong` 2px ivory (under the title, above signup, input underline).
- Corners: square everywhere (buttons, inputs, snapshot slots). The only round shapes are the app's knobs and rings.
- Buttons: rectangular. Primary: orange with navy text, turns ivory on hover. Secondary: 2px ivory outline, fills ivory on hover.
- Typography: Inter only, flush left, ragged right.
  - Wordmark "pritoki": 700, lowercase, letter-spacing -0.065em, line-height 0.8, up to about 19rem (nearly full content width).
  - Tagline and h2: 700, line-height 1.05, letter-spacing -0.03em.
  - Meta labels: 12px, 600, uppercase, letter-spacing 0.06em.
  - Body: 400, line-height 1.5, max width about 46–52ch.

## 4. Breakpoints and grid (mobile-first)

| Name    | Min width | Grid                                                      |
|---------|-----------|-----------------------------------------------------------|
| base    | 0         | 4 columns, 16px gutters and column gap; everything stacks |
| `md`    | 768px     | 24px gutters and column gap; meta row in 4 columns; form input and button side by side |
| `lg`    | 1024px    | 12 columns, 40px gutters; content max width 1200px        |

No horizontal scrolling at 320px width.

## 5. Page structure

### 5.1 Top bar (ivory)
- Thin full-width bar, background `--c-ivory`, about 48px tall on mobile.
- Left: BLEEPTOOLS logo (`logo.png`, 500×191). The dark letters and orange B read well on ivory. Shown at about 28–32px height and linked to the bleeptools home page (`../`).
- Right (from `md` up): a small "Join the beta" text link. On mobile, nothing else goes in the bar.
- Not sticky. It scrolls away with the page.

### 5.2 Hero
- Source copy: `# pritoki` and the lines below it in `texts.md`.
- Order:
  1. Meta row: "Rhythmic synthesizer / iPad & Mac / Standalone + AUv3 / Beta 2026". Each item has a hairline rule on top. 2 columns on mobile, 4 from `md`, 3 grid columns each on `lg`.
  2. Wordmark **pritoki** (h1), nearly full width.
  3. Strong ivory rule, then a row with:
     - Tagline on three lines: "One voice. / Three tracks. / Endless in-betweens." (`lg`: columns 1–6)
     - Intro paragraph ("Every hit is a blend…") and CTAs: **Join the beta →** (primary) and **Get notified** (secondary, jumps to `#signup`) (`lg`: columns 8–12)
  4. Hero image: `screen 1.png` (iPad screenshot in a device frame with transparent corners, 2615×1864), full content width.

### 5.3 Feature blocks
There are 7 blocks, in the order of `texts.md`. Each one is a `<section>` with an h2 and a paragraph, plus a visual.

| # | Heading                                         | Visual                                   | Notes |
|---|-------------------------------------------------|------------------------------------------|-------|
| 1 | Generate a groove. Then make it yours.          | `Generate a groove.png` (563×563)        | Sequencer ring. Show at no more than 280px wide. |
| 2 | Blend and shape.                                | `Blend and shape.png` (638×432)          | XY pad with blend modes. |
| 3 | Capture a moment. Morph to the next.            | **SVG/CSS rebuild** (see 6.1)            | Morph knob plus S1–S4. |
| 4 | Change the model. Change the character.         | **SVG/CSS rebuild** (see 6.2)            | Large Model knob. |
| 5 | Play it like an instrument.                     | `Play it like an instrument.png` (344×798) | Tall image. On mobile, show it 180×260px, cropped from the top with `object-fit: cover; object-position: top`. |
| 6 | Add grit. Let it ring.                          | None for now (asset to come)             | Text only. |
| 7 | Play it on its own. Plug it into your setup.    | None for now (asset to come)             | Text only. |

Layout:
- Each block starts with a 1px muted rule across the full content width.
- base: number, heading, text, then the visual (centered, no panel).
- `lg`: the same columns for every block (no alternating): number in columns 1–2, heading and text in 3–7, visual in 8–12 (centered in its columns), all top-aligned.
- Visuals sit directly on the navy background. Image max width 320px (sequencer ring 280px).
- Orange index number ("01" to "07") above/left of each heading.
- Vertical rhythm: 16px from rule to content; 32px after each block on mobile, 48px on desktop.

### 5.4 Signup (`#signup`)
- Starts with a strong ivory rule. Uses the feature grid: "→" in the number column, heading and subline in columns 3–7, form in 8–12.
- Heading: "Stay in the loop". Subline (muted): "Occasional news about pritoki and future bleeptools instruments. No spam."
- Form:
  - Visible label "EMAIL" (meta style), `<input type="email" required autocomplete="email">` styled as an underline only (2px ivory, orange on focus).
  - Button: **Notify me** (primary).
  - Consent note under the form (small, muted): "By subscribing you agree to our [privacy policy]." (links to `../legal/privacy-en.html`)
- Behavior: the form posts to a CleverReach signup form (`https://flow.cleverreach.com/fl/88aec855-248c-4b65-8b26-6b7c831bde7d/confirm`, field `email`). CleverReach handles double opt-in: it sends the confirmation email and logs consent. No CleverReach script is loaded; nothing goes to CleverReach until someone submits.
  - With JS: the submit is sent in the background (`fetch`, `mode: "no-cors"`) so the visitor stays on the page. The response can't be read, so the message in the `aria-live="polite"` region only says to check the inbox ("Almost there! Check your inbox and confirm your email."). A network error shows "Something went wrong. Please try again."
  - Without JS: the form posts normally and CleverReach's confirmation page opens in a new tab.
  - Spam: a hidden honeypot field `email_confirm` (CleverReach's own name for it). If it is filled in, JS pretends the signup worked and sends nothing.
- Below, after a hairline rule: "Want to try it now? **Join the beta →**" (text link).

### 5.5 Footer
- Hairline rule on top. On the 12-column grid: "bleeptools" (1–2), social links (3–4), legal links (5–6), fine print (8–12). Stacks on mobile.
- Social links as text links: Instagram, YouTube, Discord (exact list to be decided, all `href="#"` for now). Ivory, turning orange on hover.
- Links: Impressum · Privacy policy (`../legal/imprint-en.html`, `../legal/privacy-en.html`).
- Fine print (muted): "© 2026 bleeptools. iPad, Mac, GarageBand and Logic are trademarks of Apple Inc."

## 6. Rebuilt visuals (SVG/CSS)

Both rebuilds must match the app's style: ivory knobs (`#F2EDE0`) with a small dark dot as the indicator, labels in Inter, on the navy page background. Snapshot slots have square corners.

### 6.1 Snapshots (block 3)
- Contents: a "Morph" label, a knob with its value ("1/4") underneath, and four buttons S1–S4. The active one is orange; the others are `#3A3F50` with ivory text.
- base: lay it out **horizontally** (knob on the left, S1–S4 in a row). The source image is very tall and narrow, which wastes space on a phone.
- `lg`: vertical column, as in the app.
- Optional animation: the active snapshot moves S1 → S2 → S3 → S4 every few seconds, crossfading the orange. Turned off under `prefers-reduced-motion`.

### 6.2 Model knob (block 4)
- One large knob (110–140px) with the label "Model" and a "FUSED ↔ LAYERED" scale underneath.
- Optional animation: the knob slowly turns back and forth, with a faint label underneath showing the change ("tones bend into one" ↔ "layered voices"). Turned off under `prefers-reduced-motion`.
- Either inline SVG or CSS with a `rotate` transform on the indicator.

## 7. Images

- Rename to kebab-case in `img/` (no spaces): `hero-ipad`, `generate-a-groove`, `blend-and-shape`, `play-it-like-an-instrument`, `logo-bleeptools`.
- Export AVIF with a PNG fallback through `<picture>` (WebP skipped: no encoder available locally, and AVIF is smaller).
  - AVIFs come from macOS `sips`. Chrome shows its output as transparent when a dimension is odd, so keep both width and height even (e.g. the hero is exported at 800×570, 1400×998 and 2000×1426).
- Hero (681 KB source, 2615px): responsive `srcset` at 800, 1400 and 2000w. Target under 200 KB for the mobile size.
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

- `<title>`: "pritoki: rhythmic synthesizer for iPad & Mac (AUv3) · bleeptools"
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
| Social channels and URLs     | `#`            | you   |
| Asset: Add grit              | text only      | you   |
| Asset: Play it on its own    | text only      | you   |
| App icon / favicon           | logo fallback  | you   |
| Domain (for OG absolute URLs)| unknown        | you   |
