// ============================================================================
// KINOBU (木乃婦) — Site, Stripe, PostHog & Domain Configuration
// (The single file for Stripe checkout, PostHog analytics & domain wiring.
//  For full automated setup with Claude Code, see CLAUDE.md in the repo root.)
// ============================================================================
//
// 1. STRIPE CONNECTOR ($4.99 RENT FILM):
//    • Option A — Stripe Payment Link (No backend · 2-minute setup):
//      Paste your `https://buy.stripe.com/...` URL into `rent.link` ($4.99).
//      Buttons activate automatically and append `?locale=ja` when visitors
//      browse in Japanese (日本語).
//    • Option B — Stripe Checkout Worker / API Connector (Tokenized 48h Paywall):
//      Set `mode: "worker"` and paste your Worker endpoint into `WORKER_URL`.
//
// 2. POSTHOG ANALYTICS CONNECTOR:
//    • Paste your PostHog Project API Key (`phc_...`) into `POSTHOG_KEY`.
//      Pageviews plus custom film funnel events (`trailer_played`,
//      `checkout_clicked`, `language_switched`, `screening_room_unlocked`)
//      activate automatically across all pages.
//
// 3. CUSTOM DOMAIN (PORKBUN + GITHUB PAGES):
//    • Set `SITE_URL` once your Porkbun domain is live (see CLAUDE.md).
//
// SECURITY NOTE: Never place secret keys (`sk_live_...`, `rk_live_...`, or
// Porkbun `sk1_...`) in this file. Only public links, `pk_live_...`, or `phc_...`
// project tokens belong in client-side configuration.
// ============================================================================

window.SITE = {
  // Canonical production URL (e.g. "https://kinobufilm.com" once Porkbun DNS is live)
  SITE_URL: "",

  // "links" = Stripe Payment Links | "worker" = Stripe Checkout API / Worker connector
  mode: "links",

  // --- STRIPE CONNECTOR SLOT (paste your Worker URL or Publishable Key later) ---
  WORKER_URL: "",
  STRIPE_PUBLISHABLE_KEY: "",

  // --- POSTHOG ANALYTICS CONNECTOR SLOT (paste your phc_... Project Key) ---
  POSTHOG_KEY: "",
  POSTHOG_HOST: "https://us.i.posthog.com", // Use "https://eu.i.posthog.com" for PostHog EU Cloud

  // --- RENT FILM ($4.99 · 48-Hour 4K Streaming Pass) ---
  rent: {
    label: "Rent Film",
    labelJa: "\u30ec\u30f3\u30bf\u30eb\u8996\u8074",
    price: "$4.99",
    priceJa: "$4.99",
    terms: "48-hour streaming pass in up to 4K Ultra HD. Includes both English-subtitled and original Japanese editions.",
    termsJa: "48\u6642\u9593\u306e4K Ultra HD\u30b9\u30c8\u30ea\u30fc\u30df\u30f3\u30b0\u8996\u8074\u30d1\u30b9\u3002\u82f1\u8a9e\u5b57\u5e55\u7248\u30fb\u65e5\u672c\u8a9e\u30aa\u30ea\u30b8\u30ca\u30eb\u7248\uff08\u5b57\u5e55\u306a\u3057\uff09\u306e\u4e21\u65b9\u3092\u3054\u89a7\u3044\u305f\u3060\u3051\u307e\u3059\u3002",
    link: "",     // <-- PASTE STRIPE RENT PAYMENT LINK HERE (e.g. "https://buy.stripe.com/...")
    linkJa: ""    // <-- Optional dedicated Japanese Stripe Payment Link
  },

  // --- MEDIA & LINKS ---
  posterSrc: "assets/poster.jpg",
  trailerSrcEn: "assets/trailer-en.mp4",
  trailerSrcJa: "assets/trailer-ja.mp4",
  trailerPoster: "assets/trailer-poster.jpg",
  trailerEmbed: "",

  directorSiteUrl: "https://www.chikaramotomura.net",
  restaurantSiteUrl: "https://www.kinobu.co.jp/en",
  restaurantSiteUrlJa: "https://www.kinobu.co.jp",
  contactEmail: "chikaramotomura@gmail.com"
};
