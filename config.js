// ============================================================================
// KINOBU (木乃婦) — Site & Stripe Connector Configuration
// (The only file you ever need to edit to connect Stripe)
// ============================================================================
//
// HOW TO CONNECT STRIPE LATER:
//
// Option A — Stripe Payment Links (No backend required · 2-minute setup):
//   1. In Stripe Dashboard -> Payment Links, create two links:
//      • Rent Film ($4.99)      -> After payment redirect to:
//        https://YOUR_DOMAIN/watch.html?plan=rent&v=YOUR_UNLISTED_VIDEO_ID
//      • Download Film ($14.99) -> After payment redirect to:
//        https://YOUR_DOMAIN/watch.html?plan=download&v=YOUR_UNLISTED_VIDEO_ID&dl=YOUR_SIGNED_DOWNLOAD_URL
//   2. Paste the two `https://buy.stripe.com/...` URLs into `rent.link` and
//      `download.link` below. Buttons activate automatically as soon as a
//      link is non-empty, and `?locale=ja` is appended automatically when
//      visitors view the site in Japanese (日本語).
//
// Option B — Stripe Checkout Worker / API Connector (Tokenized Paywall):
//   1. Deploy your Cloudflare Worker / serverless Stripe connector exposing:
//      • POST /checkout  (body: { tier: "rent" | "download", locale: "en" | "ja" }) -> { url }
//      • GET  /access?session_id=...  -> { streamUrl, streamUrlJa, downloadUrl, downloadUrlJa, expiresAt }
//   2. Set `mode: "worker"` and paste your endpoint URL into `WORKER_URL` below.
//
// SECURITY NOTE: Never place a secret key (`sk_live_...` / `rk_live_...`) here.
// Only public `https://buy.stripe.com/...` links, a public `pk_live_...` key,
// or your Worker endpoint belong in client-side configuration.
// ============================================================================

window.SITE = {
  // "links" = Stripe Payment Links | "worker" = Stripe Checkout API / Worker connector
  mode: "links",

  // --- STRIPE CONNECTOR SLOT (paste your Worker URL or Publishable Key later) ---
  WORKER_URL: "",
  STRIPE_PUBLISHABLE_KEY: "",

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
