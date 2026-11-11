# KINOBU (木乃婦) — Food, Tradition, and Identity

Official bilingual (`EN` / `日本語`) film website and post-purchase Screening & Download Room for **KINOBU: Food, Tradition, and Identity** (2025, 83 min, 4K Ultra HD), a feature documentary directed, photographed, and edited by **Chikara Motomura**.

- **Rent Film (48-Hour 4K Stream):** `$4.99`
- **Download Film (Unlimited Stream + 4K MP4 Master):** `$14.99`
- **Languages:** English (`EN`) & Japanese (`日本語`, accessible directly via `?lang=ja`)

> **Fast Setup with Claude Code (`Stripe` + `PostHog` + `Porkbun Domain`):**
> Open this repository in Claude Code or see **[`CLAUDE.md`](./CLAUDE.md)** for the complete copy-pasteable setup playbook covering Porkbun DNS + GitHub Pages HTTPS, pre-wired PostHog funnel analytics, and Stripe (`$4.99` Rent / `$14.99` Download).

---

## How to Connect Stripe & PostHog Later (`config.js`)

[`config.js`](./config.js) is the **only file you need to edit** to activate Stripe transactions and PostHog analytics. While `rent.link`, `download.link`, `WORKER_URL`, and `POSTHOG_KEY` are empty (`""`), pricing cards render cleanly in a ready state (`"Stripe checkout opens soon"`) and no third-party analytics scripts load. As soon as you paste your keys/links, everything activates automatically.

### Option A — Stripe Payment Links (No Backend · 2-Minute Setup)

1. Open [Stripe Dashboard → Payment Links](https://dashboard.stripe.com/payment-links) and create two links:
   - **Rent Film (`$4.99`)** — Set the after-payment redirect URL to:
     `https://YOUR_DOMAIN/watch.html?plan=rent&v=YOUR_UNLISTED_VIDEO_ID`
   - **Download Film (`$14.99`)** — Set the after-payment redirect URL to:
     `https://YOUR_DOMAIN/watch.html?plan=download&v=YOUR_UNLISTED_VIDEO_ID&dl=YOUR_SIGNED_4K_EN_URL&dl_ja=YOUR_SIGNED_4K_NOSUB_URL`
2. Paste both `https://buy.stripe.com/...` URLs into [`config.js`](./config.js):

```js
window.SITE = {
  mode: "links",
  WORKER_URL: "",
  STRIPE_PUBLISHABLE_KEY: "",

  rent: {
    label: "Rent Film",
    price: "$4.99",
    link: "https://buy.stripe.com/YOUR_RENT_499_LINK",
    linkJa: "" // Optional dedicated Japanese Payment Link
  },

  download: {
    label: "Download Film",
    price: "$14.99",
    link: "https://buy.stripe.com/YOUR_DOWNLOAD_1499_LINK",
    linkJa: "" // Optional dedicated Japanese Payment Link
  }
  // ...
};
```

> **Security Rule:** Never commit Stripe secret keys (`sk_live_...` / `rk_live_...`) to this repository. Only public `https://buy.stripe.com/...` Payment Links, a publishable key (`pk_live_...`), or a public Worker URL belong in `config.js`.

### Option B — Stripe Checkout Worker / Paywall API (Automated Tokenized Access)

[`watch.html`](./watch.html) (`noindex, nofollow`) is pre-wired for automated Stripe Checkout Session verification and signed 4K R2/S3 streaming & downloads:

1. Deploy a Cloudflare Worker / serverless Stripe connector exposing:
   - `POST /checkout` (`{ tier: "rent" | "download", locale: "en" | "ja" }`) → returns `{ url }` (Stripe Checkout Session URL with `success_url` pointing to `watch.html?session_id={CHECKOUT_SESSION_ID}`)
   - `GET /access?session_id=...` → verifies payment with Stripe and returns `{ streamUrl, streamUrlJa, downloadUrl, downloadUrlJa, expiresAt }`
2. Update [`config.js`](./config.js):
   ```js
   mode: "worker",
   WORKER_URL: "https://your-kinobu-stripe-worker.workers.dev",
   ```

---

## Bilingual (`EN` / `日本語`) Features

- **Top Segmented Pill Switcher:** Translates navigation, hero, pricing tiers, Kyoto epigraph, synopsis, three thematic pillars, technical specs, 4K stills captions, filmmaker bio, screenings, audience reviews, credits, and the Screening Room (`watch.html`).
- **Dual-Edition Trailer Switcher:** Switches seamlessly between the **English-subtitled trailer** (`assets/trailer-en.mp4`) and the **unsubtitled original Japanese trailer** (`assets/trailer-ja.mp4`) while preserving playback position.
- **Stripe Checkout Localization:** Automatically appends `?locale=ja` to `stripe.com` checkout links when `日本語` is selected (and `?locale=en` in English).

---

## Local Preview

```bash
python3 -m http.server 8080
# Open http://localhost:8080
```

## Project Structure

| File | Purpose |
| :--- | :--- |
| `CLAUDE.md` | Fast-setup playbook for Claude Code (`Porkbun DNS` + `PostHog` + `Stripe` `$4.99` / `$14.99`) |
| `config.js` | Single-file Stripe (`$4.99` Rent & `$14.99` Download), PostHog (`POSTHOG_KEY`), and domain connector |
| `index.html` | Main Apple Modern one-page film website |
| `watch.html` | Post-purchase Screening & 4K Download Room (`noindex, nofollow`) |
| `styles.css` | Apple Modern design system (frosted glass nav, dark cinema hero, bento cards, lightbox) |
| `site.js` | Wires `window.SITE`, `EN` / `日本語` i18n, PostHog funnel events, trailer edition switcher, stills lightbox, and `watch.html` |
| `assets/` | Official poster (`poster.jpg`), dual 1080p trailers (`trailer-en.mp4`, `trailer-ja.mp4`), and 6 4K stills (`assets/stills/`) |
