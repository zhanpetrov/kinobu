# CLAUDE.md — Fast Setup Playbook for KINOBU (木乃婦)

This file is automatically read by **Claude Code** (`claude`) when opened in this repository. It gives Claude everything needed to connect **Porkbun Custom Domain**, **PostHog Analytics**, and **Stripe Checkout (`$4.99` Rent Film · 48-Hour 4K Stream)** in minutes.

---

## Quick Kickoff Prompt (Copy & Paste to Claude)

If you are Chikara (`@chikaramotomura`), clone this repo, open Claude Code in this folder, and paste:

```text
Read CLAUDE.md and set up KINOBU step by step:
1. Connect my Porkbun domain: [YOUR_DOMAIN.COM]
2. Connect my PostHog Project API key: [phc_...] (Cloud region: US or EU)
3. Connect Stripe for the $4.99 48-hour Film Rental using [Option A: Payment Link / Option B: Cloudflare Worker + R2].
Verify JS syntax, make sure zero secret keys are in git, and push to main.
```

---

## 0. Repository & Architecture Rules for Claude

- **GitHub Repository:** `https://github.com/zhanpetrov/kinobu` (branch: `main`, deployed automatically via GitHub Pages).
- **Collaborator Access:** `@chikaramotomura` has been invited with `write` push access.
  - **If `git push` returns `403`:** Have Chikara accept the pending GitHub invitation first at `https://github.com/zhanpetrov/kinobu/invitations` (or check email from GitHub), and verify local auth via `gh auth status`.
- **Zero-Build Static Architecture:**
  - `config.js` — **Single control file** for `SITE_URL`, Stripe (`mode`, `WORKER_URL`, `rent.link`), and PostHog (`POSTHOG_KEY`, `POSTHOG_HOST`).
  - `index.html` — Bilingual (`EN` / `日本語`) Apple Modern main film page (`#trailer`, `#watch`, `#film`, `#stills`, `#director`, `#screenings`, `#credits`).
  - `watch.html` — Post-purchase 4K Screening Room (`noindex, nofollow`, streaming-only with `controlslist="nodownload"`).
  - `site.js` — Zero-dependency runtime wiring `window.SITE`, `EN`/`JA` i18n (`?lang=ja`), Stripe `?locale=ja` localization, PostHog async loader + custom funnel events, trailer subtitle edition switcher, and `watch.html` gate unlocking.
  - `styles.css` — Apple Modern stylesheet.
- **STRICT SECURITY RULE (NEVER VIOLATE):**
  - This is a **public** repository served directly by GitHub Pages.
  - **NEVER** write or commit Stripe secret keys (`sk_live_...`, `sk_test_...`, `rk_live_...`, `whsec_...`), Porkbun API keys (`pk1_...`, `sk1_...`), Cloudflare API tokens, or `.env` files into this repo.
  - **Safe in `config.js`:** `SITE_URL`, public Stripe Payment Link (`https://buy.stripe.com/...`), `STRIPE_PUBLISHABLE_KEY` (`pk_live_...`), `WORKER_URL`, and `POSTHOG_KEY` (`phc_...` public project ingestion token).
- **Recommended Execution Order:** Do **Domain (Section 1)** first so your final domain URL is ready to paste into **PostHog (Section 2)** and **Stripe redirect URLs (Section 3)**.

---

## 1. Porkbun Custom Domain Setup (GitHub Pages + HTTPS)

Suppose the purchased Porkbun domain is `kinobufilm.com` (replace `YOUR_DOMAIN` below with the exact apex domain, lowercase, no `https://` and no trailing slash).

### Step 1.1 — Update Repo Files (`CNAME`, `config.js`, `index.html`)

Claude should make these three edits in the repository:

1. **Create root `CNAME` file** containing only the bare domain + newline:
   ```bash
   printf "%s\n" "YOUR_DOMAIN" > CNAME
   ```
2. **Update `config.js`:**
   ```js
   SITE_URL: "https://YOUR_DOMAIN",
   ```
3. **Update `<head>` in `index.html`** so social previews (iMessage, LINE, X, Facebook, Slack) use absolute HTTPS URLs on the custom domain:
   - Add `<link rel="canonical" href="https://YOUR_DOMAIN/">` right below `<meta name="description" ...>`
   - Add `<meta property="og:url" content="https://YOUR_DOMAIN/">`
   - Change `og:image` content from `assets/og-card.jpg` to `https://YOUR_DOMAIN/assets/og-card.jpg`
   - Change `twitter:image` content from `assets/og-card.jpg` to `https://YOUR_DOMAIN/assets/og-card.jpg`
4. **Commit and push to `main`** (pushing `CNAME` automatically registers the custom domain with GitHub Pages):
   ```bash
   git add CNAME config.js index.html
   git commit -m "Configure custom domain YOUR_DOMAIN"
   git push origin main
   ```

### Step 1.2 — Point Porkbun DNS to GitHub Pages

Choose **either** Option A (Porkbun Web UI, 2 minutes) **or** Option B (Automated Porkbun API script run by Claude).

#### Option A: Manual Setup in Porkbun Dashboard (No API Keys Needed)

1. Log in at `https://porkbun.com/account/domainsSpeedy`.
2. Hover over `YOUR_DOMAIN` and click **DNS**.
3. **Delete default parked records** under *Current Records*:
   - Delete any `ALIAS` record on the root domain pointing to `pixie.porkbun.com`.
   - Delete any `CNAME` record on `*` or `www` pointing to `pixie.porkbun.com`.
4. Add **four `A` records** (leave **Host** blank for root apex, **TTL** `600`):
   - `185.199.108.153`
   - `185.199.109.153`
   - `185.199.110.153`
   - `185.199.111.153`
5. Add **four `AAAA` records** for IPv6 (leave **Host** blank, **TTL** `600`):
   - `2606:50c0:8000::153`
   - `2606:50c0:8001::153`
   - `2606:50c0:8002::153`
   - `2606:50c0:8003::153`
6. Add **one `CNAME` record** for `www`:
   - **Type:** `CNAME`
   - **Host:** `www`
   - **Answer / Value:** `zhanpetrov.github.io`
   - **TTL:** `600`

#### Option B: Automated Setup via Porkbun v3 API (15 Seconds)

If Chikara wants Claude to configure DNS automatically:
1. In Porkbun **Domain Management**, expand **Details** on `YOUR_DOMAIN` and toggle **API Access → ON**.
2. Create an API key pair (`pk1_...` and `sk1_...`) at `https://porkbun.com/account/api`.
3. Run this one-time script in your terminal (reads keys interactively in memory — **never** write keys to disk):

```bash
export DOMAIN="YOUR_DOMAIN"
read -r -p "Porkbun API Key (pk1_...): " PORKBUN_API_KEY
read -r -s -p "Porkbun Secret Key (sk1_...): " PORKBUN_SECRET_KEY; echo ""

AUTH_JSON=$(printf '{"apikey":"%s","secretapikey":"%s"}' "$PORKBUN_API_KEY" "$PORKBUN_SECRET_KEY")

# 1. Remove default Porkbun parking records (ALIAS on root, CNAME on www and *)
curl -s -X POST "https://api.porkbun.com/api/json/v3/dns/deleteByNameType/${DOMAIN}/ALIAS" \
  -H "Content-Type: application/json" -d "$AUTH_JSON" && echo ""
curl -s -X POST "https://api.porkbun.com/api/json/v3/dns/deleteByNameType/${DOMAIN}/CNAME/www" \
  -H "Content-Type: application/json" -d "$AUTH_JSON" && echo ""
curl -s -X POST "https://api.porkbun.com/api/json/v3/dns/deleteByNameType/${DOMAIN}/CNAME/*" \
  -H "Content-Type: application/json" -d "$AUTH_JSON" && echo ""

# 2. Create GitHub Pages IPv4 A records on apex
for IP in 185.199.108.153 185.199.109.153 185.199.110.153 185.199.111.153; do
  curl -s -X POST "https://api.porkbun.com/api/json/v3/dns/create/${DOMAIN}" \
    -H "Content-Type: application/json" \
    -d "$(printf '{"apikey":"%s","secretapikey":"%s","name":"","type":"A","content":"%s","ttl":"600"}' "$PORKBUN_API_KEY" "$PORKBUN_SECRET_KEY" "$IP")"
  echo ""
done

# 3. Create GitHub Pages IPv6 AAAA records on apex
for IPV6 in 2606:50c0:8000::153 2606:50c0:8001::153 2606:50c0:8002::153 2606:50c0:8003::153; do
  curl -s -X POST "https://api.porkbun.com/api/json/v3/dns/create/${DOMAIN}" \
    -H "Content-Type: application/json" \
    -d "$(printf '{"apikey":"%s","secretapikey":"%s","name":"","type":"AAAA","content":"%s","ttl":"600"}' "$PORKBUN_API_KEY" "$PORKBUN_SECRET_KEY" "$IPV6")"
  echo ""
done

# 4. Create www -> zhanpetrov.github.io CNAME
curl -s -X POST "https://api.porkbun.com/api/json/v3/dns/create/${DOMAIN}" \
  -H "Content-Type: application/json" \
  -d "$(printf '{"apikey":"%s","secretapikey":"%s","name":"www","type":"CNAME","content":"zhanpetrov.github.io","ttl":"600"}' "$PORKBUN_API_KEY" "$PORKBUN_SECRET_KEY")"
echo ""

unset PORKBUN_API_KEY PORKBUN_SECRET_KEY AUTH_JSON
```

### Step 1.3 — Verify DNS & Enforce HTTPS

1. Check DNS propagation (usually takes 2–10 minutes on Porkbun):
   ```bash
   dig +short YOUR_DOMAIN A
   dig +short www.YOUR_DOMAIN CNAME
   ```
2. GitHub Pages automatically provisions a free Let's Encrypt SSL certificate once `A` records resolve. After 5–15 minutes, verify HTTPS:
   ```bash
   curl -I https://YOUR_DOMAIN
   ```
3. Ensure **Enforce HTTPS** is enabled in GitHub Pages (**Settings → Pages → Enforce HTTPS**, or via repo admin CLI: `gh api -X PUT repos/zhanpetrov/kinobu/pages -f cname="YOUR_DOMAIN" -F https_enforced=true`).

---

## 2. PostHog Analytics Fast Setup (Already Pre-Wired in `site.js`)

PostHog's async loader (`array.js`) and custom film funnel events are **already built into `site.js`**. While `POSTHOG_KEY` is `""`, zero scripts are loaded. As soon as you paste a `phc_...` key into `config.js`, analytics go live on both `index.html` and `watch.html`.

### Step 2.1 — Get Your PostHog Project Key

1. Create a free account at `https://us.posthog.com` (US Cloud — recommended) or `https://eu.posthog.com` (EU Cloud).
2. Create a project named **`KINOBU`**.
3. Go to **Project Settings → Project API Key** and copy the key starting with **`phc_...`** *(Note: copy the `phc_...` Project API Key, NOT a `phx_...` Personal API Key).*
4. Under **Project Settings → Web Analytics / Authorized URLs**, add:
   - `https://YOUR_DOMAIN`
   - `https://zhanpetrov.github.io`
5. *(Optional)* Toggle **Session Replay → Enable recordings** in PostHog settings if you want to watch anonymous visitor scroll/click replays — no code changes required.

### Step 2.2 — Paste into `config.js`

Edit `config.js`:

```js
  // --- POSTHOG ANALYTICS CONNECTOR SLOT ---
  POSTHOG_KEY: "phc_PASTE_YOUR_KEY_HERE",
  POSTHOG_HOST: "https://us.i.posthog.com", // Use "https://eu.i.posthog.com" if using EU Cloud
```

### Step 2.3 — Pre-Wired Custom Events (Ready for PostHog Funnels)

`site.js` automatically captures `$pageview`, `$pageleave`, and these film-specific events:

| Event Name | Properties | When It Fires |
| :--- | :--- | :--- |
| `trailer_played` | `{ edition: "en_sub" \| "ja_nosub", lang: "en" \| "ja" }` | Viewer plays the hero trailer on `index.html` |
| `trailer_subtitle_switched` | `{ edition: "en_sub" \| "ja_nosub", lang: "en" \| "ja" }` | Viewer toggles between `EN Subtitles` and `Original · No Sub` |
| `language_switched` | `{ lang: "en" \| "ja" }` | Viewer switches site UI between `EN` and `日本語` |
| `still_opened` | `{ index: 1..6, src, lang }` | Viewer opens a 4K film still in the fullscreen lightbox |
| `checkout_clicked` | `{ tier: "rent", price: "$4.99", mode: "links" \| "worker", location: "hero" \| "card" \| "watch_gate", lang }` | Viewer clicks any `$4.99` Rent Film CTA |
| `screening_room_unlocked` | `{ plan: "rent", delivery: "links" \| "worker", lang }` | Buyer returns from Stripe to `watch.html` and unlocks the 4K stream |

> **Suggested PostHog Funnel Insight:** Create a 4-step Funnel in PostHog:
> `1. $pageview` → `2. trailer_played` → `3. checkout_clicked` → `4. screening_room_unlocked` (broken down by `lang`).

---

## 3. Stripe Fast Setup (`$4.99` Rent Film · 48-Hour 4K Stream)

You have two 4K master feature files (83 min, `3840x2160`, `23.976 fps`, ~21.8 GB each):
1. **English Subtitled Master:** `Kinobu 384x2160-English subtitle, 23.976.mp4`
2. **Original Japanese (No Subtitles) Master:** `Kinobu 384x2160-no subtitle, 23.976.mp4`

`site.js` and `watch.html` support **two Stripe modes** out of the box. Pick **Option A** to launch in 3 minutes with zero servers, or **Option B** for an automated Cloudflare Worker + R2 paywall with strict 48-hour expiration enforcement.

---

### Option A — Fastest No-Backend Setup: Stripe Payment Link (3 Minutes)

*(Same proven static pattern used on `howisee.homes`.)*

#### 1. Upload the Feature Stream
- Upload the 4K feature to YouTube as **Unlisted** (supports full 4K 2160p adaptive streaming globally at `$0` bandwidth cost, with optional English closed captions or burned-in subtitles). Copy the 11-character YouTube Video ID (e.g., `dQw4w9WgXcQ`).

#### 2. Create the `$4.99` Stripe Payment Link (Dashboard OR Stripe CLI)

**Via Stripe CLI (Claude can run this directly after `stripe login`):**

```bash
export DOMAIN="YOUR_DOMAIN"
export YT_ID="YOUR_11_CHAR_YOUTUBE_ID"

RENT_PROD=$(stripe products create \
  --name="KINOBU — 48-Hour Film Rental (4K Stream)" \
  --description="48-hour streaming pass for KINOBU: Food, Tradition, and Identity (83 min, 4K Ultra HD)." \
  | python3 -c 'import sys,json; print(json.load(sys.stdin)["id"])')

RENT_PRICE=$(stripe prices create \
  --unit-amount=499 --currency=usd --product="$RENT_PROD" \
  | python3 -c 'import sys,json; print(json.load(sys.stdin)["id"])')

RENT_LINK=$(stripe payment_links create \
  -d "line_items[0][price]=$RENT_PRICE" \
  -d "line_items[0][quantity]=1" \
  -d "after_completion[type]=redirect" \
  -d "after_completion[redirect][url]=https://${DOMAIN}/watch.html?v=${YT_ID}" \
  -d "allow_promotion_codes=true" \
  | python3 -c 'import sys,json; print(json.load(sys.stdin)["url"])')

echo "Paste into config.js -> rent.link: $RENT_LINK"
```

*(Or in [Stripe Dashboard → Payment Links](https://dashboard.stripe.com/payment-links): create one `$4.99` link with **"After payment → Don't show confirmation page → Redirect customers to your website"** set to `https://YOUR_DOMAIN/watch.html?v=YOUR_11_CHAR_YOUTUBE_ID`.)*

#### 3. Paste Link into `config.js`

```js
  mode: "links",
  // ...
  rent: {
    // ...
    link: "https://buy.stripe.com/YOUR_RENT_499_LINK",
    linkJa: "" // Optional: separate Japanese-titled Payment Link; otherwise ?locale=ja is appended automatically!
  },
```

As soon as `rent.link` is non-empty, the Hero button, Digital Release rental pass card, and Screening Room Gate CTA activate automatically (and localize Stripe Checkout to Japanese when the visitor switches to `日本語`, including Apple Pay, Google Pay, and credit cards).

---

### Option B — Automated 48-Hour Paywall: Cloudflare Worker + Stripe Checkout + R2 (15 Minutes)

Choose Option B if you want **server-verified Stripe Checkout Sessions**, **strict 48-hour expiration enforcement**, and **HMAC-signed 4K streaming** directly from a private **Cloudflare R2** bucket (`$0` egress fees).

#### API Contract Already Wired in `site.js`
1. `POST {WORKER_URL}/checkout` with JSON `{ "tier": "rent", "locale": "en" | "ja" }`
   - Returns `{ "url": "https://checkout.stripe.com/c/pay/cs_live_..." }`
   - Sets Stripe `success_url` to `https://YOUR_DOMAIN/watch.html?session_id={CHECKOUT_SESSION_ID}` and `cancel_url` to `https://YOUR_DOMAIN/#watch`.
2. `GET {WORKER_URL}/access?session_id=cs_live_...`
   - Fetches the Checkout Session from Stripe API using `STRIPE_SECRET_KEY` (stored safely in Cloudflare Worker Secrets, **never** in git).
   - Verifies `session.payment_status === "paid"`.
   - Checks `(Date.now()/1000) < session.created + 172800` (48 hours). If expired, returns HTTP `403` (`watch.html` automatically displays the localized *"Access Expired"* screen).
   - Returns JSON:
     ```json
     {
       "streamUrl": "https://...",
       "streamUrlJa": "https://...",
       "expiresAt": "2026-11-13T04:00:00.000Z"
     }
     ```
3. `GET {WORKER_URL}/media/:edition?exp=...&sig=...`
   - Verifies HMAC signature + 48h expiration, streams the 4K MP4 with HTTP `Range` support (`206 Partial Content`) from R2 so scrubbing and AirPlay work seamlessly in Safari, Chrome, and iOS.

#### Ready-to-Deploy Worker Scaffold (Deploy Outside This Static Repo)

Create a separate private folder `../kinobu-paywall-worker` (not inside this public GitHub Pages repo):

```bash
mkdir -p ../kinobu-paywall-worker && cd ../kinobu-paywall-worker
npm init -y && npm install --save-dev wrangler
```

Create `../kinobu-paywall-worker/wrangler.toml`:

```toml
name = "kinobu-paywall"
main = "index.js"
compatibility_date = "2025-01-01"

[vars]
SITE_ORIGIN = "https://YOUR_DOMAIN"
RENT_KEY_EN = "Kinobu-4K-EN-Sub.mp4"
RENT_KEY_JA = "Kinobu-4K-Original-NoSub.mp4"

[[r2_buckets]]
binding = "FILM_BUCKET"
bucket_name = "kinobu-masters"
```

Upload the 4K masters to R2 (`wrangler r2 bucket create kinobu-masters`, then upload via Cloudflare R2 Dashboard or `rclone` for >300 MB multipart uploads), and set Worker secrets:

```bash
npx wrangler secret put STRIPE_SECRET_KEY      # sk_live_...
npx wrangler secret put SIGNING_SECRET         # openssl rand -hex 32
```

Create `../kinobu-paywall-worker/index.js`:

```js
const CORS_HEADERS = (origin, allowed) => ({
  "Access-Control-Allow-Origin": origin === allowed ? origin : allowed,
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Accept"
});

async function signStreamUrl(baseUrl, edition, expUnix, secret) {
  const payload = `${edition}:${expUnix}`;
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sigBuf = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload));
  const sig = [...new Uint8Array(sigBuf)].map((b) => b.toString(16).padStart(2, "0")).join("");
  return `${baseUrl}/media/${edition}?exp=${expUnix}&sig=${sig}`;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const origin = request.headers.get("Origin") || "";
    const cors = CORS_HEADERS(origin, env.SITE_ORIGIN);

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: cors });
    }

    // 1. POST /checkout -> Create Stripe Checkout Session ($4.99 48-hour rental)
    if (request.method === "POST" && url.pathname === "/checkout") {
      const body = await request.json().catch(() => ({}));
      const locale = body.locale === "ja" ? "ja" : "en";
      const name =
        locale === "ja"
          ? "『木乃婦 KINOBU』48時間レンタル視聴（4K配信）"
          : "KINOBU — 48-Hour Film Rental (4K Stream)";

      const form = new URLSearchParams({
        mode: "payment",
        locale,
        allow_promotion_codes: "true",
        success_url: `${env.SITE_ORIGIN}/watch.html?session_id={CHECKOUT_SESSION_ID}${locale === "ja" ? "&lang=ja" : ""}`,
        cancel_url: `${env.SITE_ORIGIN}/${locale === "ja" ? "?lang=ja" : ""}#watch`,
        "metadata[tier]": "rent",
        "line_items[0][quantity]": "1",
        "line_items[0][price_data][currency]": "usd",
        "line_items[0][price_data][unit_amount]": "499",
        "line_items[0][price_data][product_data][name]": name
      });

      const stripeRes = await fetch("https://api.stripe.com/v1/checkout/sessions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.STRIPE_SECRET_KEY}`,
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: form.toString()
      });
      const session = await stripeRes.json();
      if (!stripeRes.ok || !session.url) {
        return Response.json({ error: "Stripe session error" }, { status: 500, headers: cors });
      }
      return Response.json({ url: session.url }, { headers: cors });
    }

    // 2. GET /access?session_id=... -> Verify payment & mint 48h signed stream URLs
    if (request.method === "GET" && url.pathname === "/access") {
      const sessionId = url.searchParams.get("session_id") || "";
      if (!/^cs_(test|live)_[A-Za-z0-9]+$/.test(sessionId)) {
        return Response.json({ error: "Invalid session_id" }, { status: 400, headers: cors });
      }

      const stripeRes = await fetch(
        `https://api.stripe.com/v1/checkout/sessions/${encodeURIComponent(sessionId)}`,
        { headers: { Authorization: `Bearer ${env.STRIPE_SECRET_KEY}` } }
      );
      const session = await stripeRes.json();
      if (!stripeRes.ok || session.payment_status !== "paid") {
        return Response.json({ error: "Unpaid session" }, { status: 403, headers: cors });
      }

      const nowSec = Math.floor(Date.now() / 1000);
      const rentExpirySec = (session.created || nowSec) + 48 * 3600;

      if (nowSec > rentExpirySec) {
        return Response.json({ error: "Rental window expired" }, { status: 403, headers: cors });
      }

      const baseUrl = `${url.protocol}//${url.host}`;
      return Response.json(
        {
          streamUrl: await signStreamUrl(baseUrl, "en", rentExpirySec, env.SIGNING_SECRET),
          streamUrlJa: await signStreamUrl(baseUrl, "ja", rentExpirySec, env.SIGNING_SECRET),
          expiresAt: new Date(rentExpirySec * 1000).toISOString()
        },
        { headers: cors }
      );
    }

    // 3. GET /media/:edition -> Stream 4K MP4 from R2 with HTTP Range support
    if (request.method === "GET" && url.pathname.startsWith("/media/")) {
      const edition = url.pathname.endsWith("/ja") ? "ja" : "en";
      const exp = parseInt(url.searchParams.get("exp") || "0", 10);
      const sig = url.searchParams.get("sig") || "";

      if (!exp || Math.floor(Date.now() / 1000) > exp) {
        return new Response("Rental expired", { status: 403 });
      }

      const expectedUrl = await signStreamUrl(`${url.protocol}//${url.host}`, edition, exp, env.SIGNING_SECRET);
      const expectedSig = new URL(expectedUrl).searchParams.get("sig");
      if (sig !== expectedSig) {
        return new Response("Invalid signature", { status: 403 });
      }

      const objectKey = edition === "ja" ? env.RENT_KEY_JA : env.RENT_KEY_EN;
      const rangeHeader = request.headers.get("Range");
      const object = await env.FILM_BUCKET.get(objectKey, rangeHeader ? { range: request.headers } : undefined);
      if (!object) return new Response("Not found", { status: 404 });

      const headers = new Headers();
      object.writeHttpMetadata(headers);
      headers.set("Content-Type", "video/mp4");
      headers.set("Accept-Ranges", "bytes");
      headers.set("ETag", object.httpEtag);
      headers.set("Content-Disposition", "inline");

      if (object.range) {
        const { offset, length } = object.range;
        headers.set("Content-Range", `bytes ${offset}-${offset + length - 1}/${object.size}`);
        headers.set("Content-Length", String(length));
        return new Response(object.body, { status: 206, headers });
      }

      headers.set("Content-Length", String(object.size));
      return new Response(object.body, { status: 200, headers });
    }

    return new Response("Not found", { status: 404, headers: cors });
  }
};
```

Deploy the Worker (`npx wrangler deploy`) and update `config.js` in this repo:

```js
  mode: "worker",
  WORKER_URL: "https://kinobu-paywall.YOUR_SUBDOMAIN.workers.dev",
```

---

## 4. Final Pre-Push Verification Checklist for Claude

Before committing and pushing to `main`, Claude MUST run these checks in the repo root:

```bash
# 1. Clean any macOS AppleDouble files if working on an external drive
export COPYFILE_DISABLE=1
dot_clean -m . 2>/dev/null || true

# 2. Validate JavaScript syntax
node --check config.js && node --check site.js

# 3. Verify ZERO real secret keys are present in tracked files
! git grep -E '(sk_live_|sk_test_|rk_live_|whsec_|sk1_|pk1_)[0-9A-Za-z]{10,}' -- .

# 4. Commit and deploy to GitHub Pages
git status
git add config.js index.html CNAME 2>/dev/null || git add config.js
git commit -m "Connect custom domain, PostHog analytics, and Stripe checkout"
git push origin main
```

After pushing:
1. Open `https://YOUR_DOMAIN` (and `https://YOUR_DOMAIN/?lang=ja`) — verify the `$4.99` Rent Film button is active in both English and Japanese.
2. Play the trailer and click `日本語` — verify `trailer_played` and `language_switched` appear in **PostHog → Activity → Live Events**.
3. Complete a Stripe test purchase (or `100% off` promo code on live link) — verify redirect to `https://YOUR_DOMAIN/watch.html` unlocks 4K Screening Room playback.
