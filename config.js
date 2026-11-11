// ============================================================================
// KINOBU (木乃婦) — Site, Stripe, PostHog & Domain Configuration
// (The single file for Stripe checkout, PostHog analytics & domain wiring.
//  For full automated setup with Claude Code, see CLAUDE.md in the repo root.)
// ============================================================================
//
// 1. STRIPE CONNECTOR:
//    • Option A — Stripe Payment Links (No backend · 2-minute setup):
//      Paste your two `https://buy.stripe.com/...` URLs into `rent.link` ($4.99)
//      and `download.link` ($14.99). Buttons activate automatically and append
//      `?locale=ja` when visitors browse in Japanese (日本語).
//    • Option B — Stripe Checkout Worker / API Connector (Tokenized 4K Paywall):
//      Set `mode: "worker"` and paste your Worker endpoint into `WORKER_URL`.
//
// 2. POSTHOG ANALYTICS CONNECTOR:
//    • Paste your PostHog Project API Key (`phc_...`) into `POSTHOG_KEY`.
//      Pageviews plus custom film funnel events (`trailer_played`,
//      `checkout_clicked`, `language_switched`, `screening_room_unlocked`,
//      `film_download_clicked`) activate automatically across all pages.
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

  // --- TIER 1: RENT FILM ($4.99 · 48-Hour Streaming) ---
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

  // --- TIER 2: DOWNLOAD & OWN ($14.99 · Unlimited Stream + 4K MP4 Download) ---
  download: {
    label: "Download Film",
    labelJa: "\u672c\u7de8\u30c0\u30a6\u30f3\u30ed\u30fc\u30c9\u8cfc\u5165",
    price: "$14.99",
    priceJa: "$14.99",
    terms: "Digital ownership with unlimited streaming plus direct 4K Ultra HD MP4 download (23.976 fps, English-subtitled & unsubtitled masters).",
    termsJa: "\u7121\u671f\u9650\u30b9\u30c8\u30ea\u30fc\u30df\u30f3\u30b0\u8996\u8074\u306b\u52a0\u3048\u30014K Ultra HD\u672c\u7de8MP4\u30d5\u30a1\u30a4\u30eb\uff08\u82f1\u8a9e\u5b57\u5e55\u7248\uff0f\u5b57\u5e55\u306a\u3057\u30aa\u30ea\u30b8\u30ca\u30eb\u7248\uff09\u3092\u76f4\u63a5\u30c0\u30a6\u30f3\u30ed\u30fc\u30c9\u4fdd\u5b58\u3002",
    link: "",     // <-- PASTE STRIPE DOWNLOAD PAYMENT LINK HERE (e.g. "https://buy.stripe.com/...")
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
