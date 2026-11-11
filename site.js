/* ==========================================================================
   KINOBU (木乃婦) — Configuration Wiring, Bilingual (EN / 日本語),
   Trailer Subtitle Switcher, Bento Lightbox & Stripe Screening/Download Room.
   Reads site & Stripe settings exclusively from window.SITE (config.js).
   ========================================================================== */

(function () {
  "use strict";

  var cfg = window.SITE || {};
  var STORAGE_KEY = "kinobu-lang";

  var I18N = {
    en: {
      pageTitle: "KINOBU (\u6728\u4e43\u5a66) \u2014 Food, Tradition, and Identity | A film by Chikara Motomura",
      watchPageTitle: "Screening Room \u2014 KINOBU (\u6728\u4e43\u5a66)",
      skip: "Skip to watch options",

      "nav.trailer": "Trailer",
      "nav.watch": "Watch",
      "nav.film": "The Film",
      "nav.stills": "Stills",
      "nav.director": "Filmmaker",
      "nav.screenings": "Screenings",
      "nav.credits": "Credits",
      "nav.cta": "Rent / Download",
      "nav.menu": "Menu",
      "nav.close": "Close",

      "hero.laurel": "Hawai\u02bbi International Film Festival \u00b7 Official Selection 2025",
      "hero.subtitle": "Food, Tradition, and Identity",
      "hero.byline": "A film by Chikara Motomura",
      "hero.facts":
        'Feature Documentary &middot; <span class="nowrap">83 min</span> &middot; <span class="nowrap">4K Ultra HD</span> &middot; <span class="nowrap">Kyoto, Japan</span>',
      "hero.ctaRent": "Rent Film \u2014 $4.99",
      "hero.ctaDownload": "Download 4K \u2014 $14.99",

      "trailer.regionAria": "KINOBU official 4K trailer",
      "trailer.kicker": "Official Trailer",
      "trailer.subGroupAria": "Trailer subtitle edition",
      "trailer.subEn": "EN Subtitles",
      "trailer.subJa": "Original \u00b7 No Sub",
      "trailer.playAria": "Play official trailer",
      "trailer.playLabel": "Play Trailer",
      "trailer.captionLeft": "Ky\u014d-ry\u014dri Kinobu \u00b7 Shinmachi-d\u014dri, Kyoto",
      "trailer.captionRight": "23.976 fps \u00b7 Stereo",

      "watch.eyebrow": "01 \u00b7 Digital Release",
      "watch.heading": "Watch Kinobu at Home.",
      "watch.lead":
        "Stream the complete 83-minute documentary instantly, or download the master edition to keep in your personal cinema library.",
      "watch.rentBadge": "48-Hour Rental",
      "watch.downloadBadge": "Digital Ownership \u00b7 4K Master",
      "watch.rentFeat1": "Instant 83-minute feature stream in up to 4K Ultra HD",
      "watch.rentFeat2": "48-hour viewing window from moment of purchase",
      "watch.rentFeat3": "Switch between English subtitles & original Japanese",
      "watch.rentFeat4": "Watch on Mac, PC, iPhone, iPad, or AirPlay",
      "watch.dlFeat1": "Unlimited on-demand streaming in the Screening Room",
      "watch.dlFeat2": "Direct DRM-free 4K MP4 download (3840\u00d72160 \u00b7 23.976 fps)",
      "watch.dlFeat3": "Includes both English-subtitled & unsubtitled Japanese files",
      "watch.dlFeat4": "Yours to keep permanently for offline viewing",
      "watch.soon": "Stripe checkout opens soon",
      "watch.opening": "Opening Stripe Checkout\u2026",
      "watch.error": "Unable to reach Stripe checkout. Please try again.",
      "watch.stripeNote": "Encrypted checkout powered by Stripe \u00b7 Apple Pay, Google Pay & all major cards",
      "watch.enterRoom": "Already have a Screening Pass? Enter Screening Room \u2192",

      "tier.rent.label": "Rent Film",
      "tier.rent.terms":
        "48-hour streaming pass in up to 4K Ultra HD. Includes both English-subtitled and original Japanese editions.",
      "tier.download.label": "Download Film",
      "tier.download.terms":
        "Digital ownership with unlimited streaming plus direct 4K Ultra HD MP4 download (23.976 fps, English-subtitled & unsubtitled masters).",

      "film.eyebrow": "02 \u00b7 The Story",
      "film.heading": "Intensity and Serenity in the Heart of Kyoto.",
      "film.epigraph":
        "\u201CAs you enter from the busy street of downtown Kyoto, you experience the serenity of Kinobu.<br>You pass through a long narrow corridor to be greeted by staff, where you take off your shoes, and are led to a private room with a garden view.\u201D",
      "film.logline":
        "Takuji Takahashi, the maverick chef-owner of an acclaimed Kyoto restaurant, brings disciplined intensity and calm precision into his high-pressure kitchen, crafting traditional dishes that are as delicate as they are inventive.",
      "film.p1":
        "The film centers on Takuji Takahashi, the third-generation chef-owner of Kinobu\u2014a Michelin-starred ry\u014dtei in downtown Kyoto\u2014who honors the centuries-old roots of Japanese kaiseki cuisine while boldly reimagining its future. A practitioner of Noh, Japan\u2019s oldest theatrical art, for over twenty years, Takahashi brings its simultaneous discipline of intensity and calm precision into his high-pressure kitchen.",
      "film.p2":
        "As a certified sommelier, Takahashi also collaborates with a leading Japanese winemaker to craft wines tailored specifically to the subtle umami of dashi and seasonal Kyoto ingredients. Immersive and intimate, the documentary reveals how culinary art, Noh performance, Gion Festival heritage, and seasonal presentation intertwine to express Japanese aesthetic sensibility and identity.",
      "film.pillar1Title": "Food",
      "film.pillar1Copy":
        "Seasonal Kyoto kaiseki where razor-thin katsuramuki knife work, luminous dashi, and unconventional wine pairings honor centuries of craft while pushing Japanese cuisine forward.",
      "film.pillar2Title": "Tradition",
      "film.pillar2Copy":
        "Over two decades of Kong\u014d-school Noh training teach Takahashi to hold stillness and fire in the same breath\u2014guiding a bustling brigade without raising his voice.",
      "film.pillar3Title": "Identity",
      "film.pillar3Copy":
        "Rooted in Kyoto\u2019s Shinmachi neighborhood and the centuries-old Gion Festival Iwatoyama community, Kinobu becomes a living mirror of cultural continuity.",
      "film.posterAlt": "KINOBU \u2014 Official Film Poster designed by Raffa Motomura",

      "specs.eyebrow": "Technical Specifications",
      "specs.heading": "Crafted in 4K Cinema Resolution.",
      "specs.runtimeDt": "Running Time",
      "specs.runtimeDd": "83 minutes (Feature Documentary)",
      "specs.masterDt": "Master Format",
      "specs.masterDd": "4K Ultra HD (3840\u00d72160) \u00b7 23.976 fps \u00b7 16:9",
      "specs.editionsDt": "Included Editions",
      "specs.editionsDd": "English Subtitled Edition & Unsubtitled Original Japanese Master",
      "specs.audioDt": "Language & Audio",
      "specs.audioDd": "Japanese \u00b7 48 kHz Stereo",
      "specs.scoreDt": "Music",
      "specs.scoreDd": "Erik Satie \u2014 \u201CGymnop\u00e9die No. 1\u201D & \u201CGnossienne No. 1\u201D (performed by Tom Olivier)",
      "specs.locationDt": "Filmed On Location",
      "specs.locationDd": "Kyoto, Japan",

      "stills.eyebrow": "03 \u00b7 Visual Archive",
      "stills.heading": "Frames from Kinobu.",
      "stills.lead": "Select any frame to inspect in full screen.",
      "stills.close": "Close",
      "stills.s1Alt": "Evening facade of Kinobu in downtown Kyoto",
      "stills.s1Cap": "Front of Kinobu at dusk on Shinmachi-d\u014dri, downtown Kyoto",
      "stills.s2Alt": "Chef Takuji Takahashi preparing a sea urchin dish in Kinobu\u2019s kitchen",
      "stills.s2Cap": "Chef Takuji Takahashi arranging sea urchin (uni) in the kitchen",
      "stills.s3Alt": "Saba sushi served on an autumn persimmon leaf in vermilion lacquerware",
      "stills.s3Cap": "Saba-zushi resting on an autumn persimmon leaf in vermilion lacquerware",
      "stills.s4Alt": "Takuji Takahashi performing classical Noh dance on stage",
      "stills.s4Cap": "Takuji Takahashi performing Noh mai before the painted pine stage",
      "stills.s5Alt": "Peeling watermelon radish into a continuous paper-thin ribbon",
      "stills.s5Cap": "Katsuramuki knife work: slicing watermelon radish into a translucent sheet",
      "stills.s6Alt": "Ladling emerald spring soup over grilled fish in lacquer bowls",
      "stills.s6Cap": "Spring green-pea soup ladled over crisply grilled fish in gold-makie bowls",

      "director.eyebrow": "04 \u00b7 Filmmaker",
      "director.heading": "Chikara Motomura",
      "director.p1":
        "Born in Japan and based in the San Francisco Bay Area, Chikara Motomura has worked for nearly thirty-five years as an independent documentary director, cinematographer, and editor across New York, Hawaii, and California. Beginning his career in New York, he spent more than two decades directing and shooting for major Japanese television networks including NHK, Japan\u2019s public broadcaster.",
      "director.p2":
        "After moving to the Bay Area in 1997, Motomura served as a principal collaborator on fourteen independent feature films with Sundance Grand Jury Prize and Cannes Cam\u00e9ra d\u2019Or winner Rob Nilsson, and worked as cinematographer and editor on Link TV\u2019s Peabody Award-winning program <em>Mosaic</em>. Often working as an intimate one-person camera and sound crew, his feature documentaries include the internationally screened <em>Journey to Hokusai</em> (2019), <em>Kinobu: Food, Tradition, and Identity</em> (2025), and the forthcoming <em>The Last Boatbuilder</em>.",
      "director.siteLink": "chikaramotomura.net \u2197",
      "director.contactLink": "Contact Filmmaker \u2197",

      "screenings.eyebrow": "05 \u00b7 Exhibition & Reception",
      "screenings.heading": "Screenings & Praise.",
      "screenings.s1Meta": "World Premiere \u00b7 October 2025",
      "screenings.s1Title": "Hawai\u02bbi International Film Festival (HIFF)",
      "screenings.s1Detail":
        "Official Selection 2025. Premiered to festival audiences in Honolulu celebrating Pacific Rim and Japanese cinema.",
      "screenings.s2Meta": "Theatrical Run \u00b7 November 2025",
      "screenings.s2Title": "The Lark Theater \u2014 Larkspur, California",
      "screenings.s2Detail":
        "Extended month-long theatrical engagement in Marin County following unanimous audience response.",
      "screenings.kinobuLink": "Visit Ky\u014d-ry\u014dri Kinobu (Kyoto) \u2197",
      "screenings.inquiries": "Screenings & Press Inquiries:",

      "praise.q1":
        "\u201CIt\u2019s interesting to me how this quiet film captures the intensity that the subject brings to cooking, and the juxtaposition of the focused hustle of Kinobu\u2019s hard-working chefs and the serenity of the private dining rooms is a compelling feature of the film. I admired the compositions and could almost smell the food in some of the lush shots!\u201D",
      "praise.q2":
        "\u201CKinobu was a masterpiece. Filmmaker found all the beauty and humor in the fine restaurant world.\u201D",
      "praise.q3":
        "\u201CIt was perfection! Mesmerizing and meditative.\u201D",

      "credits.eyebrow": "06 \u00b7 Credits",
      "credits.heading": "Film Credits",
      "credits.prodDirEdDt": "Produced, Directed & Edited By",
      "credits.prodDirEdDd": "Chikara Motomura",
      "credits.camSoundDt": "Cinematography & Sound Recording",
      "credits.camSoundDd": "Chikara Motomura",
      "credits.featuringDt": "Featuring",
      "credits.featuringDd": "Takuji Takahashi (Third-Generation Chef-Owner, Kinobu)",
      "credits.editConsultDt": "Editorial Consultant",
      "credits.editConsultDd": "Sylvia Donati",
      "credits.visualEnhDt": "Visual Enhancement",
      "credits.visualEnhDd": "Zhan Petrov",
      "credits.posterDt": "Poster Design",
      "credits.posterDd": "Raffa Motomura",
      "credits.paDt": "Production Assistant",
      "credits.paDd": "Dexter Lama",
      "credits.musicDt": "Music",
      "credits.musicDd":
        '<span class="credits-line">\u201CGymnop\u00e9die No. 1\u201D &mdash; composed by Erik Satie, performed by Tom Olivier</span><span class="credits-line">\u201CGnossienne No. 1\u201D &mdash; composed by Erik Satie, performed by Tom Olivier</span>',
      "credits.thanksDt": "Special Thanks",
      "credits.thanksDd":
        '<span class="credits-thanks-grid"><span>Takuji Takahashi</span><span>Staff of Kinobu Restaurant</span><span>Guests of Kinobu Restaurant</span><span>Yukitoshi Hirota</span><span>Gion Festival Iwatoyama Hozonkai</span><span>Takeshi Kadokami</span><span>Shigefumi Fukuyama</span><span>Uosaburo</span><span>Tankuma Kitamise Honten</span><span>Seiwasou</span><span>Arashiyama Benkei</span><span>Takeshigerou</span><span>Toriyone</span><span>Manshige</span><span>Byodoin Chikurin</span><span>Yasumi Kaji</span><span>Eri Kitamura</span></span>',

      "footer.rights": "\u00a9 Chikara Motomura. All rights reserved.",
      "footer.watch": "Rent / Download",
      "footer.room": "Screening Room",
      "footer.contact": "Contact",

      "watchRoom.skip": "Skip to player",
      "watchRoom.backAria": "Return to KINOBU main page",
      "watchRoom.options": "Watch Options",
      "watchRoom.vfAria": "KINOBU full film player",
      "watchRoom.modeDefault": "Screening Room",
      "watchRoom.modeRent": "48-Hour Rental \u00b7 4K",
      "watchRoom.modeDownload": "Digital Ownership \u00b7 4K Master",
      "watchRoom.hudDir": "Directed by Chikara Motomura",
      "watchRoom.hudAudio": "Japanese \u00b7 English Subtitles",
      "watchRoom.gateTitle": "Screening Pass Required",
      "watchRoom.gateCopy":
        "Rent <em>KINOBU</em> for <strong>$4.99</strong> (48-hour 4K stream) or purchase the digital edition for <strong>$14.99</strong> (unlimited streaming + 4K MP4 download). After Stripe checkout, you are automatically brought back here to watch or download.",
      "watchRoom.gateRentCta": "Rent Film \u2014 $4.99",
      "watchRoom.gateDownloadCta": "Download Film \u2014 $14.99",
      "watchRoom.downloadEn": "Download 4K MP4 (EN Subtitles)",
      "watchRoom.downloadJa": "Download 4K MP4 (Original \u00b7 No Sub)",
      "watchRoom.verifyingTitle": "Verifying Screening Pass",
      "watchRoom.verifyingCopy": "Confirming your Stripe order and preparing 4K playback\u2026",
      "watchRoom.expiredTitle": "Access Expired or Invalid",
      "watchRoom.expiredCopy":
        "This screening pass could not be verified or its 48-hour rental window has ended. Return to the main page or contact us if you need assistance with your order.",
      "watchRoom.rentalUntil": "48-hour rental active \u00b7 Available until ",
      "watchRoom.permanent": "Digital ownership active \u00b7 Stream anytime or download your 4K master below.",
      "watchRoom.ytRent": "Thank you for renting KINOBU. Bookmark this page \u2014 your rental pass is active for 48 hours.",
      "watchRoom.ytDownload": "Thank you for purchasing KINOBU. Bookmark this page to stream anytime or download your 4K file."
    },

    ja: {
      pageTitle: "\u6728\u4e43\u5a66 KINOBU \u2014 \u98df\u3001\u4f1d\u7d71\u3001\u30a2\u30a4\u30c7\u30f3\u30c6\u30a3\u30c6\u30a3 | \u672c\u6751 \u529b \u76e3\u7763\u4f5c\u54c1",
      watchPageTitle: "\u30b9\u30af\u30ea\u30fc\u30cb\u30f3\u30b0\u30eb\u30fc\u30e0 \u2014 \u6728\u4e43\u5a66 KINOBU",
      skip: "\u8996\u8074\u30fb\u8cfc\u5165\u6848\u5185\u3078\u30b9\u30ad\u30c3\u30d7",

      "nav.trailer": "\u4e88\u544a\u7de8",
      "nav.watch": "\u8996\u8074\u30fb\u8cfc\u5165",
      "nav.film": "\u4f5c\u54c1\u7d39\u4ecb",
      "nav.stills": "\u5834\u9762\u5199\u771f",
      "nav.director": "\u76e3\u7763",
      "nav.screenings": "\u4e0a\u6620\u30fb\u8a55\u4fa1",
      "nav.credits": "\u30af\u30ec\u30b8\u30c3\u30c8",
      "nav.cta": "\u30ec\u30f3\u30bf\u30eb / \u8cfc\u5165",
      "nav.menu": "\u30e1\u30cb\u30e5\u30fc",
      "nav.close": "\u9589\u3058\u308b",

      "hero.laurel": "\u30cf\u30ef\u30a4\u56fd\u969b\u6620\u753b\u796d 2025 \u516c\u5f0f\u9078\u51fa\u4f5c\u54c1\uff08\u30ef\u30fc\u30eb\u30c9\u30d7\u30ec\u30df\u30a2\uff09",
      "hero.subtitle": "\u98df\u3001\u4f1d\u7d71\u3001\u30a2\u30a4\u30c7\u30f3\u30c6\u30a3\u30c6\u30a3",
      "hero.byline": "\u672c\u6751 \u529b \u76e3\u7763\u4f5c\u54c1",
      "hero.facts":
        '\u9577\u7de8\u30c9\u30ad\u30e5\u30e1\u30f3\u30bf\u30ea\u30fc &middot; <span class="nowrap">83\u5206</span> &middot; <span class="nowrap">4K Ultra HD</span> &middot; <span class="nowrap">\u4eac\u90fd</span>',
      "hero.ctaRent": "\u30ec\u30f3\u30bf\u30eb\u8996\u8074 \u2014 $4.99",
      "hero.ctaDownload": "4K\u30c0\u30a6\u30f3\u30ed\u30fc\u30c9\u8cfc\u5165 \u2014 $14.99",

      "trailer.regionAria": "\u300e\u6728\u4e43\u5a66\u300f\u516c\u5f0f4K\u4e88\u544a\u7de8",
      "trailer.kicker": "\u516c\u5f0f\u4e88\u544a\u7de8",
      "trailer.subGroupAria": "\u4e88\u544a\u7de8\u306e\u5b57\u5e55\u5207\u308a\u66ff\u3048",
      "trailer.subEn": "\u82f1\u8a9e\u5b57\u5e55\u7248",
      "trailer.subJa": "\u30aa\u30ea\u30b8\u30ca\u30eb\uff08\u5b57\u5e55\u306a\u3057\uff09",
      "trailer.playAria": "\u516c\u5f0f\u4e88\u544a\u7de8\u3092\u518d\u751f",
      "trailer.playLabel": "\u4e88\u544a\u7de8\u3092\u518d\u751f",
      "trailer.captionLeft": "\u4eac\u6599\u7406 \u6728\u4e43\u5a66\uff08\u4eac\u90fd\u30fb\u65b0\u753a\u901a\uff09",
      "trailer.captionRight": "23.976 fps \u00b7 \u30b9\u30c6\u30ec\u30aa",

      "watch.eyebrow": "01 \u00b7 \u30c7\u30b8\u30bf\u30eb\u914d\u4fe1",
      "watch.heading": "\u3054\u81ea\u5b85\u3067\u300e\u6728\u4e43\u5a66\u300f\u3092\u9451\u8cde\u3059\u308b\u3002",
      "watch.lead":
        "83\u5206\u306e\u672c\u7de8\u30924K\u9ad8\u753b\u8cea\u3067\u3059\u3050\u306b\u30b9\u30c8\u30ea\u30fc\u30df\u30f3\u30b0\u518d\u751f\u3001\u307e\u305f\u306f4K\u30de\u30b9\u30bf\u30fc\u7248\u3092\u30c0\u30a6\u30f3\u30ed\u30fc\u30c9\u3057\u3066\u304a\u624b\u5143\u306b\u6c38\u4e45\u4fdd\u5b58\u3044\u305f\u3060\u3051\u307e\u3059\u3002",
      "watch.rentBadge": "48\u6642\u9593\u30ec\u30f3\u30bf\u30eb",
      "watch.downloadBadge": "\u30c7\u30b8\u30bf\u30eb\u8cfc\u5165 \u00b7 4K\u30de\u30b9\u30bf\u30fc\u4fdd\u5b58",
      "watch.rentFeat1": "83\u5206\u306e\u672c\u7de8\u3092\u6700\u9ad84K Ultra HD\u753b\u8cea\u3067\u5373\u6642\u30b9\u30c8\u30ea\u30fc\u30df\u30f3\u30b0",
      "watch.rentFeat2": "\u3054\u8cfc\u5165\u6642\u70b9\u304b\u308948\u6642\u9593\u3044\u3064\u3067\u3082\u8996\u8074\u53ef\u80fd",
      "watch.rentFeat3": "\u65e5\u672c\u8a9e\u30aa\u30ea\u30b8\u30ca\u30eb\u7248\uff08\u5b57\u5e55\u306a\u3057\uff09\u3068\u82f1\u8a9e\u5b57\u5e55\u7248\u306e\u4e21\u65b9\u306b\u5bfe\u5fdc",
      "watch.rentFeat4": "Mac\u30fbPC\u30fbiPhone\u30fbiPad\u30fbAirPlay\u3067\u9451\u8cde\u53ef\u80fd",
      "watch.dlFeat1": "\u30b9\u30af\u30ea\u30fc\u30cb\u30f3\u30b0\u30eb\u30fc\u30e0\u3067\u7121\u671f\u9650\u306e\u30aa\u30f3\u30c7\u30de\u30f3\u30c9\u518d\u751f",
      "watch.dlFeat2": "DRM\u30d5\u30ea\u30fc\u306e4K MP4\u672c\u7de8\uff083840\u00d72160 \u00b7 23.976 fps\uff09\u3092\u76f4\u63a5\u30c0\u30a6\u30f3\u30ed\u30fc\u30c9",
      "watch.dlFeat3": "\u65e5\u672c\u8a9e\u30aa\u30ea\u30b8\u30ca\u30eb\u7248\uff08\u5b57\u5e55\u306a\u3057\uff09\u30fb\u82f1\u8a9e\u5b57\u5e55\u7248\u306e\u4e21\u30de\u30b9\u30bf\u30fc\u3092\u53ce\u9332",
      "watch.dlFeat4": "\u30aa\u30d5\u30e9\u30a4\u30f3\u74b0\u5883\u3067\u3082\u304a\u624b\u5143\u306e\u30c7\u30d0\u30a4\u30b9\u306b\u6c38\u4e45\u4fdd\u5b58",
      "watch.soon": "Stripe\u6c7a\u6e08\u53d7\u4ed8\u306f\u307e\u3082\u306a\u304f\u958b\u59cb\u3057\u307e\u3059",
      "watch.opening": "Stripe\u6c7a\u6e08\u753b\u9762\u3092\u958b\u3044\u3066\u3044\u307e\u3059\u2026",
      "watch.error": "\u6c7a\u6e08\u30b5\u30fc\u30d0\u30fc\u306b\u63a5\u7d9a\u3067\u304d\u307e\u305b\u3093\u3067\u3057\u305f\u3002\u3082\u3046\u4e00\u5ea6\u304a\u8a66\u3057\u304f\u3060\u3055\u3044\u3002",
      "watch.stripeNote": "Stripe\u306b\u3088\u308b\u6697\u53f7\u5316\u6c7a\u6e08 \u00b7 Apple Pay\u30fbGoogle Pay\u30fb\u5404\u7a2e\u30ab\u30fc\u30c9\u5bfe\u5fdc",
      "watch.enterRoom": "\u8996\u8074\u30d1\u30b9\u3092\u304a\u6301\u3061\u306e\u65b9\u306f\u3053\u3061\u3089\uff08\u30b9\u30af\u30ea\u30fc\u30cb\u30f3\u30b0\u30eb\u30fc\u30e0\uff09\u2192",

      "tier.rent.label": "\u30ec\u30f3\u30bf\u30eb\u8996\u8074",
      "tier.rent.terms":
        "48\u6642\u9593\u306e4K Ultra HD\u30b9\u30c8\u30ea\u30fc\u30df\u30f3\u30b0\u8996\u8074\u30d1\u30b9\u3002\u82f1\u8a9e\u5b57\u5e55\u7248\u30fb\u65e5\u672c\u8a9e\u30aa\u30ea\u30b8\u30ca\u30eb\u7248\uff08\u5b57\u5e55\u306a\u3057\uff09\u306e\u4e21\u65b9\u3092\u3054\u89a7\u3044\u305f\u3060\u3051\u307e\u3059\u3002",
      "tier.download.label": "\u672c\u7de8\u30c0\u30a6\u30f3\u30ed\u30fc\u30c9\u8cfc\u5165",
      "tier.download.terms":
        "\u7121\u671f\u9650\u30b9\u30c8\u30ea\u30fc\u30df\u30f3\u30b0\u8996\u8074\u306b\u52a0\u3048\u30014K Ultra HD\u672c\u7de8MP4\u30d5\u30a1\u30a4\u30eb\uff08\u82f1\u8a9e\u5b57\u5e55\u7248\uff0f\u5b57\u5e55\u306a\u3057\u30aa\u30ea\u30b8\u30ca\u30eb\u7248\uff09\u3092\u76f4\u63a5\u30c0\u30a6\u30f3\u30ed\u30fc\u30c9\u4fdd\u5b58\u3002",

      "film.eyebrow": "02 \u00b7 \u4f5c\u54c1\u7d39\u4ecb",
      "film.heading": "\u4eac\u90fd\u306e\u9759\u5bc2\u3068\u3001\u53a8\u623f\u306e\u71b1\u91cf\u3002",
      "film.epigraph":
        "\u300c\u5fd9\u3057\u3044\u4eac\u90fd\u306e\u4e2d\u5fc3\u8857\u306b\u5c45\u3057\u306a\u304c\u3089\u3001\u6696\u7c3e\u3092\u304f\u3050\u308b\u3068\u5fc3\u4f11\u307e\u308b\u3086\u3068\u308a\u306e\u7a7a\u9593\u3002<br>\u7d30\u9577\u3044\u901a\u8def\u3092\u629c\u3051\u3001\u9774\u3092\u8131\u3044\u3067\u5ead\u4ed8\u304d\u306e\u500b\u5ba4\u3078\u3002\u300d",
      "film.logline":
        "\u300e\u6728\u4e43\u5a66 \u2014 \u98df\u3001\u4f1d\u7d71\u3001\u30a2\u30a4\u30c7\u30f3\u30c6\u30a3\u30c6\u30a3\u300f\u306f\u3001\u4eac\u90fd\u306e\u30df\u30b7\u30e5\u30e9\u30f3\u661f\u4ed8\u304d\u6599\u4ead\u300c\u6728\u4e43\u5a66\u300d\u306e\u821e\u53f0\u88cf\u306b\u5bc6\u7740\u3002\u4e09\u4ee3\u76ee\u4e3b\u4eba\u30fb\u9ad8\u6a4b\u62d3\u5150\u304c\u3001\u9759\u5bc2\u3068\u7dca\u5f35\u304c\u4ea4\u932f\u3059\u308b\u53a8\u623f\u3067\u7e4a\u7d30\u304b\u3064\u72ec\u5275\u7684\u306a\u4eac\u6599\u7406\u3092\u751f\u307f\u51fa\u3059\u59ff\u3092\u8ffd\u3046\u3002",
      "film.p1":
        "\u672c\u4f5c\u54c1\u306e\u4e3b\u4eba\u516c\u306f\u3001\u4eac\u6599\u7406\u306e\u8001\u8217\u30fb\u6728\u4e43\u5a66\u306e\u4e09\u4ee3\u76ee\u30aa\u30fc\u30ca\u30fc\u30b7\u30a7\u30d5\u3001\u9ad8\u6a4b\u62d3\u5150\u6c0f\u3002\u6570\u767e\u5e74\u3092\u8a87\u308b\u4eac\u6599\u7406\u306e\u4f1d\u7d71\u3092\u6df1\u304f\u5c0a\u3073\u306a\u304c\u3089\u3082\u3001\u6599\u7406\u3092\u3055\u3089\u306b\u9ad8\u3081\u308b\u305f\u3081\u5e38\u306b\u65b0\u3057\u3044\u53ef\u80fd\u6027\u3092\u8ffd\u6c42\u3057\u7d9a\u3051\u3066\u3044\u308b\u300220\u5e74\u4ee5\u4e0a\u306b\u308f\u305f\u308b\u80fd\u697d\u306e\u4fee\u7df4\u304b\u3089\u57f9\u3063\u305f\u300c\u9759\u5bc2\u3068\u8208\u596e\u3092\u540c\u5c45\u3055\u305b\u305f\u7cbe\u795e\u72b6\u614b\u300d\u306b\u3088\u308a\u3001\u30cf\u30a4\u30d7\u30ec\u30c3\u30b7\u30e3\u30fc\u306e\u53a8\u623f\u3092\u6307\u63ee\u3057\u306a\u304c\u3089\u3001\u7e4a\u7d30\u3067\u5275\u9020\u6027\u3042\u3075\u308c\u308b\u4e00\u76bf\u3092\u4ed5\u7acb\u3066\u3066\u3044\u304f\u3002",
      "film.p2":
        "\u3055\u3089\u306b\u30bd\u30e0\u30ea\u30a8\u306e\u8cc7\u683c\u3092\u6301\u3064\u9ad8\u6a4b\u6c0f\u306f\u3001\u65e5\u672c\u306e\u30ef\u30a4\u30f3\u30e1\u30fc\u30ab\u30fc\u3068\u5171\u540c\u3067\u3001\u51fa\u6c41\u3084\u65e5\u672c\u98df\u306b\u5bc4\u308a\u6dfb\u3046\u30ef\u30a4\u30f3\u3092\u958b\u767a\u3002\u672c\u4f5c\u306f\u89b3\u308b\u4eba\u3092\u6728\u4e43\u5a66\u306e\u7a7a\u9593\u3078\u3068\u6eb6\u3051\u8fbc\u307e\u305b\u3001\u4eac\u6599\u7406\u306e\u82b8\u8853\u6027\u3001\u8077\u4eba\u6280\u3001\u80fd\u697d\u3084\u7947\u5712\u796d\u3068\u7d50\u3070\u308c\u305f\u5730\u57df\u6587\u5316\u3001\u305d\u3057\u3066\u56db\u5b63\u306e\u8272\u5f69\u3068\u5668\u306b\u5bbf\u308b\u65e5\u672c\u4eba\u306e\u7f8e\u7684\u611f\u899a\u3092\u6d6e\u304b\u3073\u4e0a\u304c\u3089\u305b\u308b\u3002",
      "film.pillar1Title": "\u98df \u00b7 Food",
      "film.pillar1Copy":
        "\u900f\u304d\u901a\u308b\u6842\u5265\u304d\u306e\u5305\u4e01\u6280\u3001\u51fa\u6c41\u306e\u65e8\u5473\u3001\u305d\u3057\u3066\u65e5\u672c\u30ef\u30a4\u30f3\u3068\u306e\u9769\u65b0\u7684\u306a\u30de\u30ea\u30a2\u30fc\u30b8\u30e5\u3002\u56db\u5b63\u3092\u6620\u3059\u4eac\u61d0\u77f3\u306e\u771f\u9ac4\u3002",
      "film.pillar2Title": "\u4f1d\u7d71 \u00b7 Tradition",
      "film.pillar2Copy":
        "20\u5e74\u4ee5\u4e0a\u306b\u308f\u305f\u308b\u91d1\u525b\u6d41\u80fd\u697d\u306e\u7a3d\u53e4\u304c\u3082\u305f\u3089\u3059\u300c\u9759\u300d\u3068\u300c\u52d5\u300d\u306e\u8abf\u548c\u304c\u3001\u7dca\u8feb\u3059\u308b\u53a8\u623f\u306e\u4e00\u6319\u624b\u4e00\u6295\u8db3\u3092\u652f\u3048\u308b\u3002",
      "film.pillar3Title": "\u30a2\u30a4\u30c7\u30f3\u30c6\u30a3\u30c6\u30a3 \u00b7 Identity",
      "film.pillar3Copy":
        "\u65b0\u753a\u901a\u306e\u753a\u8846\u3084\u7947\u5712\u796d\u30fb\u5ca9\u6238\u5c71\u306e\u4f1d\u7d71\u3068\u5171\u306b\u606f\u3065\u304f\u6728\u4e43\u5a66\u306e\u55b6\u307f\u304b\u3089\u3001\u751f\u304d\u305f\u4eac\u90fd\u6587\u5316\u306e\u7d99\u627f\u3092\u898b\u3064\u3081\u308b\u3002",
      "film.posterAlt": "\u300e\u6728\u4e43\u5a66 KINOBU\u300f\u516c\u5f0f\u30dd\u30b9\u30bf\u30fc\uff08\u30c7\u30b6\u30a4\u30f3\uff1aRaffa Motomura\uff09",

      "specs.eyebrow": "\u4f5c\u54c1\u4ed5\u69d8",
      "specs.heading": "4K\u30b7\u30cd\u30de\u30de\u30b9\u30bf\u30fc\u53ce\u9332\u3002",
      "specs.runtimeDt": "\u4e0a\u6620\u6642\u9593",
      "specs.runtimeDd": "83\u5206\uff08\u9577\u7de8\u30c9\u30ad\u30e5\u30e1\u30f3\u30bf\u30ea\u30fc\uff09",
      "specs.masterDt": "\u30de\u30b9\u30bf\u30fc\u30d5\u30a9\u30fc\u30de\u30c3\u30c8",
      "specs.masterDd": "4K Ultra HD (3840\u00d72160) \u00b7 23.976 fps \u00b7 16:9",
      "specs.editionsDt": "\u53ce\u9332\u30d0\u30fc\u30b8\u30e7\u30f3",
      "specs.editionsDd": "\u65e5\u672c\u8a9e\u30aa\u30ea\u30b8\u30ca\u30eb\u7248\uff08\u5b57\u5e55\u306a\u3057\uff09\uff0f\u82f1\u8a9e\u5b57\u5e55\u7248",
      "specs.audioDt": "\u8a00\u8a9e\u30fb\u97f3\u58f0",
      "specs.audioDd": "\u65e5\u672c\u8a9e \u00b7 48 kHz \u30b9\u30c6\u30ec\u30aa",
      "specs.scoreDt": "\u97f3\u697d",
      "specs.scoreDd": "\u30a8\u30ea\u30c3\u30af\u30fb\u30b5\u30c6\u30a3\u300c\u30b8\u30e0\u30ce\u30da\u30c7\u30a3\u7b2c1\u756a\u300d\u300c\u30b0\u30ce\u30b7\u30a8\u30f3\u30cc\u7b2c1\u756a\u300d\uff08\u6f14\u594f\uff1aTom Olivier\uff09",
      "specs.locationDt": "\u64ae\u5f71\u5730",
      "specs.locationDd": "\u65e5\u672c\u30fb\u4eac\u90fd",

      "stills.eyebrow": "03 \u00b7 \u5834\u9762\u5199\u771f",
      "stills.heading": "\u300e\u6728\u4e43\u5a66\u300f\u306e\u4e16\u754c\u3002",
      "stills.lead": "\u5199\u771f\u3092\u30af\u30ea\u30c3\u30af\u3059\u308b\u3068\u62e1\u5927\u8868\u793a\u3055\u308c\u307e\u3059\u3002",
      "stills.close": "\u9589\u3058\u308b",
      "stills.s1Alt": "\u5915\u66ae\u308c\u306e\u4eac\u90fd\u30fb\u65b0\u753a\u901a\u306b\u4f47\u3080\u6728\u4e43\u5a66\u306e\u5916\u89b3",
      "stills.s1Cap": "\u5915\u66ae\u308c\u306e\u65b0\u753a\u901a\u306b\u706f\u308b\u6728\u4e43\u5a66\u306e\u683c\u5b50\u3068\u6696\u7c3e",
      "stills.s2Alt": "\u53a8\u623f\u3067\u96f2\u4e39\u306e\u4e00\u76bf\u3092\u4ed5\u7acb\u3066\u308b\u9ad8\u6a4b\u62d3\u5150\u6c0f",
      "stills.s2Cap": "\u53a8\u623f\u306b\u3066\u96f2\u4e39\u6599\u7406\u3092\u4ed5\u7acb\u3066\u308b\u9ad8\u6a4b\u62d3\u5150\u6c0f",
      "stills.s3Alt": "\u67ff\u306e\u8449\u3068\u6731\u5857\u308a\u306e\u5668\u306b\u76db\u3089\u308c\u305f\u9bd6\u5bff\u53f8",
      "stills.s3Cap": "\u8272\u3065\u304f\u67ff\u306e\u8449\u3068\u6731\u5857\u308a\u306e\u5668\u306b\u6620\u3048\u308b\u9bd6\u5bff\u53f8",
      "stills.s4Alt": "\u80fd\u821e\u53f0\u3067\u821e\u3092\u62ab\u9732\u3059\u308b\u9ad8\u6a4b\u62d3\u5150\u6c0f",
      "stills.s4Cap": "\u93e1\u677f\u306e\u8001\u677e\u3092\u80cc\u306b\u80fd\u3092\u821e\u3046\u9ad8\u6a4b\u62d3\u5150\u6c0f",
      "stills.s5Alt": "\u7d05\u82af\u5927\u6839\u3092\u8584\u304f\u6842\u5265\u304d\u306b\u3059\u308b\u5305\u4e01\u6280",
      "stills.s5Cap": "\u7d05\u82af\u5927\u6839\u3092\u900f\u304d\u901a\u308b\u8584\u3055\u306b\u5265\u304f\u6842\u5265\u304d\u306e\u6280",
      "stills.s6Alt": "\u713c\u304d\u9b5a\u306e\u6900\u306b\u6ce8\u304c\u308c\u308b\u7fe0\u7dd1\u306e\u6625\u306e\u3059\u308a\u6d41\u3057",
      "stills.s6Cap": "\u8494\u7d75\u6900\u306e\u713c\u304d\u9b5a\u306b\u6ce8\u304c\u308c\u308b\u6625\u306e\u3046\u3059\u3044\u8c46\u306e\u3059\u308a\u6d41\u3057",

      "director.eyebrow": "04 \u00b7 \u76e3\u7763\u30d7\u30ed\u30d5\u30a3\u30fc\u30eb",
      "director.heading": "\u672c\u6751 \u529b\uff08Chikara Motomura\uff09",
      "director.p1":
        "\u65e5\u672c\u51fa\u8eab\u3001\u30b5\u30f3\u30d5\u30e9\u30f3\u30b7\u30b9\u30b3\u30fb\u30d9\u30a4\u30a8\u30ea\u30a2\u5728\u4f4f\u3002\u30cb\u30e5\u30fc\u30e8\u30fc\u30af\u3001\u30cf\u30ef\u30a4\u3001\u30b5\u30f3\u30d5\u30e9\u30f3\u30b7\u30b9\u30b3\u3067\u30c6\u30ec\u30d3\uff0f\u6620\u753b\u5236\u4f5c\u306b\u643a\u308f\u3063\u3066\u304a\u3088\u305d35\u5e74\u3002\u30cb\u30e5\u30fc\u30e8\u30fc\u30af\u3067\u30ad\u30e3\u30ea\u30a2\u3092\u30b9\u30bf\u30fc\u30c8\u3057\u3001NHK\u3092\u306f\u3058\u3081\u3068\u3059\u308b\u65e5\u672c\u306e\u30c6\u30ec\u30d3\u5c40\u5411\u3051\u756a\u7d44\u306e\u30c7\u30a3\u30ec\u30af\u30bf\u30fc\uff0f\u64ae\u5f71\u76e3\u7763\u3068\u3057\u306620\u5e74\u4ee5\u4e0a\u6d3b\u52d5\u3002",
      "director.p2":
        "1997\u5e74\u3088\u308a\u30d9\u30a4\u30a8\u30ea\u30a2\u306b\u62e0\u70b9\u3092\u79fb\u3057\u3001\u30ab\u30f3\u30cc\u56fd\u969b\u6620\u753b\u796d\u30ab\u30e1\u30e9\u30fb\u30c9\u30fc\u30eb\u304a\u3088\u3073\u30b5\u30f3\u30c0\u30f3\u30b9\u6620\u753b\u796d\u5be9\u67fb\u54e1\u5927\u8cde\u53d7\u8cde\u76e3\u7763\u30ed\u30d6\u30fb\u30cb\u30eb\u30bd\u30f3\u306e\u72ec\u7acb\u6620\u753b14\u4f5c\u54c1\u306b\u4e3b\u8981\u30b9\u30bf\u30c3\u30d5\u3068\u3057\u3066\u53c2\u753b\u3057\u305f\u307b\u304b\u3001\u30d4\u30fc\u30dc\u30c7\u30a3\u8cde\u53d7\u8cde\u5831\u9053\u756a\u7d44\u300eMosaic\u300f\uff08Link TV\uff09\u3067\u64ae\u5f71\u30fb\u7de8\u96c6\u3092\u62c5\u5f53\u3002\u64ae\u5f71\u304b\u3089\u9332\u97f3\u30fb\u7de8\u96c6\u307e\u3067\u5358\u72ec\u3067\u624b\u304c\u3051\u308b\u9577\u7de8\u30c9\u30ad\u30e5\u30e1\u30f3\u30bf\u30ea\u30fc\u306b\u300eJOURNEY TO HOKUSAI\u300f\uff082019\u5e74\uff09\u3001\u300e\u6728\u4e43\u5a66 \u2014 \u98df\u3001\u4f1d\u7d71\u3001\u30a2\u30a4\u30c7\u30f3\u30c6\u30a3\u30c6\u30a3\u300f\uff082025\u5e74\uff09\u3001\u305d\u3057\u3066\u73fe\u5728\u5236\u4f5c\u4e2d\u306e\u300eThe Last Boatbuilder\uff08\u6700\u5f8c\u306e\u548c\u8239\u5927\u5de5\uff09\u300f\u304c\u3042\u308b\u3002",
      "director.siteLink": "\u516c\u5f0f\u30b5\u30a4\u30c8 chikaramotomura.net \u2197",
      "director.contactLink": "\u76e3\u7763\u3078\u306e\u304a\u554f\u3044\u5408\u308f\u305b \u2197",

      "screenings.eyebrow": "05 \u00b7 \u4e0a\u6620\u6b74\u30fb\u89b3\u5ba2\u306e\u58f0",
      "screenings.heading": "\u4e0a\u6620\u60c5\u5831\u30fb\u89b3\u5ba2\u8a55\u3002",
      "screenings.s1Meta": "\u30ef\u30fc\u30eb\u30c9\u30d7\u30ec\u30df\u30a2 \u00b7 2025\u5e7410\u6708",
      "screenings.s1Title": "\u30cf\u30ef\u30a4\u56fd\u969b\u6620\u753b\u796d\uff08HIFF\uff09",
      "screenings.s1Detail":
        "2025\u5e74\u516c\u5f0f\u9078\u51fa\u4f5c\u54c1\u3068\u3057\u3066\u30db\u30ce\u30eb\u30eb\u306b\u3066\u521d\u516c\u958b\u3002",
      "screenings.s2Meta": "\u5287\u5834\u516c\u958b \u00b7 2025\u5e7411\u6708",
      "screenings.s2Title": "\u30e9\u30fc\u30af\u30fb\u30b7\u30a2\u30bf\u30fc\uff08\u30ab\u30ea\u30d5\u30a9\u30eb\u30cb\u30a2\u5dde\u30e9\u30fc\u30af\u30b9\u30d1\u30fc\uff09",
      "screenings.s2Detail":
        "\u5927\u304d\u306a\u53cd\u97ff\u3092\u547c\u3073\u30011\u30f6\u6708\u306b\u308f\u305f\u308b\u30ed\u30f3\u30b0\u30e9\u30f3\u4e0a\u6620\u3092\u8a18\u9332\u3002",
      "screenings.kinobuLink": "\u4eac\u6599\u7406 \u6728\u4e43\u5a66 \u516c\u5f0f\u30b5\u30a4\u30c8 \u2197",
      "screenings.inquiries": "\u4e0a\u6620\u30fb\u53d6\u6750\u306e\u304a\u554f\u3044\u5408\u308f\u305b\uff1a",

      "praise.q1":
        "\u300c\u3053\u306e\u9759\u8b10\u306a\u6620\u753b\u304c\u3001\u6599\u7406\u306b\u6ce8\u304c\u308c\u308b\u4e3b\u4eba\u516c\u306e\u6fc0\u3057\u3044\u96c6\u4e2d\u529b\u3092\u898b\u4e8b\u306b\u6349\u3048\u3066\u3044\u308b\u3053\u3068\u306b\u5f15\u304d\u8fbc\u307e\u308c\u307e\u3057\u305f\u3002\u53a8\u623f\u306e\u7dca\u8feb\u3057\u305f\u6d3b\u6c17\u3068\u3001\u500b\u5ba4\u306e\u9759\u5bc2\u3068\u306e\u5bfe\u6bd4\u304c\u5b9f\u306b\u9b45\u529b\u7684\u3067\u3001\u8c4a\u304b\u306a\u6620\u50cf\u7f8e\u304b\u3089\u6599\u7406\u306e\u9999\u308a\u307e\u3067\u6f02\u3063\u3066\u304f\u308b\u3088\u3046\u3067\u3057\u305f\u3002\u300d",
      "praise.q2":
        "\u300c\u307e\u3055\u306b\u5091\u4f5c\u3002\u540d\u5e97\u306e\u4e16\u754c\u306b\u5bbf\u308b\u7f8e\u3057\u3055\u3068\u30e6\u30fc\u30e2\u30a2\u306e\u3059\u3079\u3066\u3092\u3059\u304f\u3044\u53d6\u3063\u3066\u3044\u308b\u3002\u300d",
      "praise.q3":
        "\u300c\u5fc3\u3092\u596a\u308f\u308c\u3001\u7791\u60f3\u306e\u3088\u3046\u306b\u6df1\u3044\u4f59\u97fb\u306b\u5305\u307e\u308c\u308b\u5b8c\u74a7\u306a\u4e00\u672c\u3002\u300d",

      "credits.eyebrow": "06 \u00b7 \u30af\u30ec\u30b8\u30c3\u30c8",
      "credits.heading": "\u30b9\u30bf\u30c3\u30d5\u30fb\u5354\u529b",
      "credits.prodDirEdDt": "\u88fd\u4f5c\u30fb\u76e3\u7763\u30fb\u7de8\u96c6",
      "credits.prodDirEdDd": "\u672c\u6751 \u529b\uff08Chikara Motomura\uff09",
      "credits.camSoundDt": "\u64ae\u5f71\u30fb\u9332\u97f3",
      "credits.camSoundDd": "\u672c\u6751 \u529b\uff08Chikara Motomura\uff09",
      "credits.featuringDt": "\u51fa\u6f14",
      "credits.featuringDd": "\u9ad8\u6a4b \u62d3\u5150\uff08\u4eac\u6599\u7406 \u6728\u4e43\u5a66 \u4e09\u4ee3\u76ee\u4e3b\u4eba\uff09",
      "credits.editConsultDt": "\u7de8\u96c6\u30b3\u30f3\u30b5\u30eb\u30bf\u30f3\u30c8",
      "credits.editConsultDd": "Sylvia Donati",
      "credits.visualEnhDt": "\u6620\u50cf\u30a8\u30f3\u30cf\u30f3\u30b9\u30e1\u30f3\u30c8",
      "credits.visualEnhDd": "Zhan Petrov",
      "credits.posterDt": "\u30dd\u30b9\u30bf\u30fc\u30c7\u30b6\u30a4\u30f3",
      "credits.posterDd": "Raffa Motomura",
      "credits.paDt": "\u5236\u4f5c\u30a2\u30b7\u30b9\u30bf\u30f3\u30c8",
      "credits.paDd": "Dexter Lama",
      "credits.musicDt": "\u97f3\u697d",
      "credits.musicDd":
        '<span class="credits-line">\u300c\u30b8\u30e0\u30ce\u30da\u30c7\u30a3\u7b2c1\u756a\u300d\u4f5c\u66f2\uff1a\u30a8\u30ea\u30c3\u30af\u30fb\u30b5\u30c6\u30a3\uff0f\u6f14\u594f\uff1aTom Olivier</span><span class="credits-line">\u300c\u30b0\u30ce\u30b7\u30a8\u30f3\u30cc\u7b2c1\u756a\u300d\u4f5c\u66f2\uff1a\u30a8\u30ea\u30c3\u30af\u30fb\u30b5\u30c6\u30a3\uff0f\u6f14\u594f\uff1aTom Olivier</span>',
      "credits.thanksDt": "\u7279\u5225\u5354\u529b",
      "credits.thanksDd":
        '<span class="credits-thanks-grid"><span>\u9ad8\u6a4b \u62d3\u5150</span><span>\u6728\u4e43\u5a66\u30b9\u30bf\u30c3\u30d5\u306e\u7686\u69d8</span><span>\u6728\u4e43\u5a66\u306e\u304a\u5ba2\u69d8</span><span>\u5ee3\u7530 \u5e78\u7a14</span><span>\u7947\u5712\u796d \u5ca9\u6238\u5c71\u4fdd\u5b58\u4f1a</span><span>\u9580\u4e0a \u6b66\u53f8</span><span>Shigefumi Fukuyama</span><span>\u9b5a\u4e09\u697c</span><span>\u305f\u3093\u718a\u5317\u5e97 \u672c\u5e97</span><span>\u6e05\u548c\u8358</span><span>\u5d50\u5c71\u8fa8\u6176</span><span>\u7af9\u8302\u697c</span><span>\u9ce5\u7c73</span><span>\u842c\u91cd</span><span>\u5e73\u7b49\u9662 \u8868\u53c2\u9053 \u7af9\u6797</span><span>Yasumi Kaji</span><span>Eri Kitamura</span></span>',

      "footer.rights": "\u00a9 Chikara Motomura. All rights reserved.",
      "footer.watch": "\u30ec\u30f3\u30bf\u30eb / \u8cfc\u5165",
      "footer.room": "\u30b9\u30af\u30ea\u30fc\u30cb\u30f3\u30b0\u30eb\u30fc\u30e0",
      "footer.contact": "\u304a\u554f\u3044\u5408\u308f\u305b",

      "watchRoom.skip": "\u30d7\u30ec\u30fc\u30e4\u30fc\u3078\u30b9\u30ad\u30c3\u30d7",
      "watchRoom.backAria": "\u300e\u6728\u4e43\u5a66\u300f\u30c8\u30c3\u30d7\u30da\u30fc\u30b8\u3078\u623b\u308b",
      "watchRoom.options": "\u8cfc\u5165\u30d7\u30e9\u30f3",
      "watchRoom.vfAria": "\u300e\u6728\u4e43\u5a66\u300f\u672c\u7de8\u30d7\u30ec\u30fc\u30e4\u30fc",
      "watchRoom.modeDefault": "\u30b9\u30af\u30ea\u30fc\u30cb\u30f3\u30b0\u30eb\u30fc\u30e0",
      "watchRoom.modeRent": "48\u6642\u9593\u30ec\u30f3\u30bf\u30eb \u00b7 4K",
      "watchRoom.modeDownload": "\u30c7\u30b8\u30bf\u30eb\u8cfc\u5165 \u00b7 4K\u30de\u30b9\u30bf\u30fc",
      "watchRoom.hudDir": "\u76e3\u7763\uff1a\u672c\u6751 \u529b",
      "watchRoom.hudAudio": "\u65e5\u672c\u8a9e\u30aa\u30ea\u30b8\u30ca\u30eb \u00b7 \u82f1\u8a9e\u5b57\u5e55\u5bfe\u5fdc",
      "watchRoom.gateTitle": "\u8996\u8074\u30d1\u30b9\u304c\u5fc5\u8981\u3067\u3059",
      "watchRoom.gateCopy":
        "\u300e\u6728\u4e43\u5a66\u300f\u306f<strong>$4.99</strong>\uff0848\u6642\u95934K\u30b9\u30c8\u30ea\u30fc\u30df\u30f3\u30b0\uff09\u307e\u305f\u306f<strong>$14.99</strong>\uff08\u7121\u671f\u9650\u518d\u751f\uff0b4K MP4\u672c\u7de8\u30c0\u30a6\u30f3\u30ed\u30fc\u30c9\uff09\u306b\u3066\u3054\u9451\u8cde\u3044\u305f\u3060\u3051\u307e\u3059\u3002Stripe\u3067\u306e\u304a\u652f\u6255\u3044\u5b8c\u4e86\u5f8c\u3001\u81ea\u52d5\u7684\u306b\u3053\u306e\u30da\u30fc\u30b8\u3067\u518d\u751f\u30fb\u30c0\u30a6\u30f3\u30ed\u30fc\u30c9\u304c\u89e3\u7981\u3055\u308c\u307e\u3059\u3002",
      "watchRoom.gateRentCta": "\u30ec\u30f3\u30bf\u30eb\u8996\u8074 \u2014 $4.99",
      "watchRoom.gateDownloadCta": "\u672c\u7de8\u30c0\u30a6\u30f3\u30ed\u30fc\u30c9\u8cfc\u5165 \u2014 $14.99",
      "watchRoom.downloadEn": "4K MP4\u3092\u30c0\u30a6\u30f3\u30ed\u30fc\u30c9\uff08\u82f1\u8a9e\u5b57\u5e55\u7248\uff09",
      "watchRoom.downloadJa": "4K MP4\u3092\u30c0\u30a6\u30f3\u30ed\u30fc\u30c9\uff08\u5b57\u5e55\u306a\u3057\u30aa\u30ea\u30b8\u30ca\u30eb\u7248\uff09",
      "watchRoom.verifyingTitle": "\u8996\u8074\u30d1\u30b9\u3092\u78ba\u8a8d\u3057\u3066\u3044\u307e\u3059",
      "watchRoom.verifyingCopy": "Stripe\u306e\u6c7a\u6e08\u60c5\u5831\u3092\u7167\u4f1a\u3057\u30014K\u518d\u751f\u306e\u6e96\u5099\u3092\u884c\u3063\u3066\u3044\u307e\u3059\u2026",
      "watchRoom.expiredTitle": "\u30a2\u30af\u30bb\u30b9\u671f\u9650\u5207\u308c\u30fb\u7121\u52b9\u306a\u30ea\u30f3\u30af",
      "watchRoom.expiredCopy":
        "\u8996\u8074\u30d1\u30b9\u3092\u78ba\u8a8d\u3067\u304d\u306a\u3044\u304b\u300148\u6642\u9593\u306e\u30ec\u30f3\u30bf\u30eb\u671f\u9593\u304c\u7d42\u4e86\u3057\u3066\u3044\u307e\u3059\u3002\u30c8\u30c3\u30d7\u30da\u30fc\u30b8\u3078\u623b\u308b\u304b\u3001\u30b5\u30dd\u30fc\u30c8\u307e\u3067\u304a\u554f\u3044\u5408\u308f\u305b\u304f\u3060\u3055\u3044\u3002",
      "watchRoom.rentalUntil": "48\u6642\u9593\u30ec\u30f3\u30bf\u30eb\u6709\u52b9 \u00b7 \u8996\u8074\u671f\u9650\uff1a",
      "watchRoom.permanent": "\u30c7\u30b8\u30bf\u30eb\u8cfc\u5165\u6e08\u307f \u00b7 \u3044\u3064\u3067\u3082\u518d\u751f\u30fb\u4e0b\u8a18\u30dc\u30bf\u30f3\u304b\u30894K\u672c\u7de8\u3092\u4fdd\u5b58\u3067\u304d\u307e\u3059\u3002",
      "watchRoom.ytRent": "\u300e\u6728\u4e43\u5a66\u300f\u306e\u30ec\u30f3\u30bf\u30eb\u3042\u308a\u304c\u3068\u3046\u3054\u3056\u3044\u307e\u3059\u3002\u3053\u306e\u30da\u30fc\u30b8\u3092\u30d6\u30c3\u30af\u30de\u30fc\u30af\u3057\u3066\u3054\u5229\u7528\u304f\u3060\u3055\u3044\uff0848\u6642\u9593\u6709\u52b9\uff09\u3002",
      "watchRoom.ytDownload": "\u300e\u6728\u4e43\u5a66\u300f\u306e\u3054\u8cfc\u5165\u3042\u308a\u304c\u3068\u3046\u3054\u3056\u3044\u307e\u3059\u3002\u3053\u306e\u30da\u30fc\u30b8\u3092\u30d6\u30c3\u30af\u30de\u30fc\u30af\u3057\u3066\u3001\u3044\u3064\u3067\u3082\u518d\u751f\u30fb4K\u4fdd\u5b58\u3092\u3054\u5229\u7528\u304f\u3060\u3055\u3044\u3002"
    }
  };

  var DEFAULT_EN_TIERS = {
    rent: {
      label: "Rent Film",
      terms:
        "48-hour streaming pass in up to 4K Ultra HD. Includes both English-subtitled and original Japanese editions."
    },
    download: {
      label: "Download Film",
      terms:
        "Digital ownership with unlimited streaming plus direct 4K Ultra HD MP4 download (23.976 fps, English-subtitled & unsubtitled masters)."
    }
  };

  var STILLS_ITEMS = [
    { src: "assets/stills/front-evening.jpg", capKey: "stills.s1Cap", altKey: "stills.s1Alt" },
    { src: "assets/stills/chef-uni.jpg", capKey: "stills.s2Cap", altKey: "stills.s2Alt" },
    { src: "assets/stills/saba-sushi.jpg", capKey: "stills.s3Cap", altKey: "stills.s3Alt" },
    { src: "assets/stills/noh-dance.jpg", capKey: "stills.s4Cap", altKey: "stills.s4Alt" },
    { src: "assets/stills/watermelon-radish.jpg", capKey: "stills.s5Cap", altKey: "stills.s5Alt" },
    { src: "assets/stills/spring-soup.jpg", capKey: "stills.s6Cap", altKey: "stills.s6Alt" }
  ];

  var currentLang = "en";
  var currentTrailerVer = "en";
  var userPinnedTrailerVer = false;
  var trailerPlayTracked = false;
  var activeLightboxIdx = -1;

  var watchRoomState = "gate"; // "gate" | "yt" | "verifying" | "active" | "expired"
  var watchRoomPlan = "";
  var watchRoomData = null;

  function trimStr(val) {
    return typeof val === "string" ? val.trim() : "";
  }

  function initPostHog() {
    var phKey = trimStr(cfg.POSTHOG_KEY);
    if (!phKey) return;
    var phHost = trimStr(cfg.POSTHOG_HOST) || "https://us.i.posthog.com";

    /* Official PostHog async web loader (array.js) */
    !(function (t, e) {
      var o, n, p, r;
      e.__SV ||
        ((window.posthog = e),
        (e._i = []),
        (e.init = function (i, s, a) {
          function g(t, e) {
            var o = e.split(".");
            2 == o.length && ((t = t[o[0]]), (e = o[1])),
              (t[e] = function () {
                t.push([e].concat(Array.prototype.slice.call(arguments, 0)));
              });
          }
          ((p = t.createElement("script")).type = "text/javascript"),
            (p.crossOrigin = "anonymous"),
            (p.async = !0),
            (p.src =
              s.api_host.replace(".i.posthog.com", "-assets.i.posthog.com") +
              "/static/array.js"),
            (r = t.getElementsByTagName("script")[0]).parentNode.insertBefore(p, r);
          var u = e;
          for (
            void 0 !== a ? (u = e[a] = []) : (a = "posthog"),
              u.people = u.people || [],
              Object.defineProperty(u, "toString", {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                value: function (t) {
                  var e = "posthog";
                  return "posthog" !== a && (e += "." + a), t || (e += " (stub)"), e;
                }
              }),
              Object.defineProperty(u.people, "toString", {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                value: function () {
                  return u.toString(1) + ".people (stub)";
                }
              }),
              o =
                "init capture register register_once register_for_session unregister unregister_for_session getFeatureFlag getFeatureFlagResult isFeatureEnabled reloadFeatureFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSessionId getSurveys getActiveMatchingSurveys renderSurvey canRenderSurvey getNextSurveyStep identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException loadToolbar get_property getSessionProperty createPersonProfile opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing clear_opt_in_out_capturing debug".split(
                  " "
                ),
              n = 0;
            n < o.length;
            n++
          )
            g(u, o[n]);
          e._i.push([i, s, a]);
        }),
        (e.__SV = 1));
    })(document, window.posthog || []);

    window.posthog.init(phKey, {
      api_host: phHost,
      person_profiles: "identified_only",
      capture_pageview: true,
      capture_pageleave: true
    });
  }

  function trackEvent(eventName, props) {
    try {
      if (window.posthog && typeof window.posthog.capture === "function") {
        window.posthog.capture(eventName, props || {});
      }
    } catch (e) {}
  }

  function t(key) {
    var dict = I18N[currentLang] || I18N.en;
    return dict[key] !== undefined ? dict[key] : I18N.en[key] || "";
  }

  function detectInitialLang() {
    try {
      var params = new URLSearchParams(window.location.search);
      var qLang = trimStr(params.get("lang")).toLowerCase();
      if (qLang === "ja" || qLang === "en") {
        try {
          window.localStorage.setItem(STORAGE_KEY, qLang);
        } catch (eSave) {}
        return qLang;
      }
    } catch (e) {}

    try {
      var saved = trimStr(window.localStorage.getItem(STORAGE_KEY)).toLowerCase();
      if (saved === "ja" || saved === "en") return saved;
    } catch (e2) {}

    return "en";
  }

  function localizeCheckoutUrl(rawUrl, lang) {
    if (!rawUrl) return "";
    try {
      var parsed = new URL(rawUrl, window.location.href);
      if (parsed.hostname.indexOf("stripe.com") !== -1) {
        parsed.searchParams.set("locale", lang === "ja" ? "ja" : "en");
      }
      return parsed.toString();
    } catch (e) {
      return rawUrl;
    }
  }

  function resolveTierCheckoutLink(tierCfg) {
    if (!tierCfg) return "";
    var raw =
      currentLang === "ja" && trimStr(tierCfg.linkJa)
        ? trimStr(tierCfg.linkJa)
        : trimStr(tierCfg.link);
    return localizeCheckoutUrl(raw, currentLang);
  }

  function setTrailerVersion(ver, manualPin) {
    var targetVer = ver === "ja" ? "ja" : "en";
    if (manualPin) {
      userPinnedTrailerVer = true;
      trackEvent("trailer_subtitle_switched", {
        edition: targetVer === "ja" ? "ja_nosub" : "en_sub",
        lang: currentLang
      });
    }
    currentTrailerVer = targetVer;

    var subBtns = document.querySelectorAll("[data-trailer-ver]");
    for (var i = 0; i < subBtns.length; i++) {
      var active = subBtns[i].getAttribute("data-trailer-ver") === targetVer;
      subBtns[i].classList.toggle("is-active", active);
      subBtns[i].setAttribute("aria-pressed", active ? "true" : "false");
    }

    var trailerVideo = document.getElementById("trailer-video");
    if (!trailerVideo) return;

    var srcEn = trimStr(cfg.trailerSrcEn) || "assets/trailer-en.mp4";
    var srcJa = trimStr(cfg.trailerSrcJa) || srcEn;
    var desiredSrc = targetVer === "ja" ? srcJa : srcEn;

    if (trailerVideo.getAttribute("src") === desiredSrc) return;

    var wasPlaying = !trailerVideo.paused && !trailerVideo.ended;
    var resumeTime = trailerVideo.currentTime || 0;

    trailerVideo.setAttribute("src", desiredSrc);
    if (resumeTime > 0.2) {
      var restorePlayback = function () {
        trailerVideo.removeEventListener("loadedmetadata", restorePlayback);
        try {
          trailerVideo.currentTime = Math.min(resumeTime, Math.max(0, (trailerVideo.duration || resumeTime) - 0.1));
        } catch (eSeek) {}
        if (wasPlaying) {
          var p = trailerVideo.play();
          if (p && typeof p.catch === "function") p.catch(function () {});
        }
      };
      trailerVideo.addEventListener("loadedmetadata", restorePlayback);
      trailerVideo.load();
    }
  }

  function wireGlobalLinksAndTrailer() {
    var posterUrl = trimStr(cfg.posterSrc);
    var posterEl = document.getElementById("hero-poster-img");
    if (posterEl && posterUrl && posterEl.getAttribute("src") !== posterUrl) {
      posterEl.setAttribute("src", posterUrl);
    }

    var trailerEmbedUrl = trimStr(cfg.trailerEmbed);
    var trailerScreen = document.getElementById("trailer-screen");
    var trailerVideo = document.getElementById("trailer-video");
    var trailerPlayBtn = document.getElementById("trailer-play-btn");

    if (trailerScreen && trailerEmbedUrl) {
      trailerScreen.innerHTML = "";
      var iframe = document.createElement("iframe");
      iframe.src = trailerEmbedUrl;
      iframe.title = "KINOBU — Official Trailer";
      iframe.allow =
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen";
      iframe.allowFullscreen = true;
      iframe.referrerPolicy = "strict-origin-when-cross-origin";
      iframe.loading = "lazy";
      trailerScreen.appendChild(iframe);
      var subToggleWrap = document.querySelector(".sub-toggle");
      if (subToggleWrap) subToggleWrap.hidden = true;
    } else if (trailerVideo) {
      var trailerPoster = trimStr(cfg.trailerPoster);
      if (trailerPoster && trailerVideo.getAttribute("poster") !== trailerPoster) {
        trailerVideo.setAttribute("poster", trailerPoster);
      }

      if (trailerPlayBtn) {
        trailerVideo.controls = false;
        var startTrailer = function () {
          trailerVideo.controls = true;
          trailerPlayBtn.hidden = true;
          var playPromise = trailerVideo.play();
          if (playPromise && typeof playPromise.catch === "function") {
            playPromise.catch(function () {});
          }
        };
        trailerPlayBtn.addEventListener("click", startTrailer);
        trailerVideo.addEventListener("play", function () {
          trailerVideo.controls = true;
          trailerPlayBtn.hidden = true;
          if (!trailerPlayTracked) {
            trailerPlayTracked = true;
            trackEvent("trailer_played", {
              edition: currentTrailerVer === "ja" ? "ja_nosub" : "en_sub",
              lang: currentLang
            });
          }
        });
      }

      var subBtns = document.querySelectorAll("[data-trailer-ver]");
      for (var s = 0; s < subBtns.length; s++) {
        subBtns[s].addEventListener("click", function (ev) {
          var v = ev.currentTarget.getAttribute("data-trailer-ver");
          setTrailerVersion(v, true);
        });
      }
    }

    var dirUrl = trimStr(cfg.directorSiteUrl);
    if (dirUrl) {
      var dirLinks = document.querySelectorAll("[data-site-director]");
      for (var d = 0; d < dirLinks.length; d++) {
        dirLinks[d].setAttribute("href", dirUrl);
      }
    }

    var email = trimStr(cfg.contactEmail);
    if (email) {
      var emailLinks = document.querySelectorAll("[data-site-email]");
      for (var k = 0; k < emailLinks.length; k++) {
        emailLinks[k].setAttribute("href", "mailto:" + email);
        if (emailLinks[k].getAttribute("data-site-email") === "text") {
          emailLinks[k].textContent = email;
        }
      }
    }
  }

  function syncLocalizedExternalLinks() {
    var restLinks = document.querySelectorAll("[data-site-restaurant]");
    var restUrl =
      currentLang === "ja" && trimStr(cfg.restaurantSiteUrlJa)
        ? trimStr(cfg.restaurantSiteUrlJa)
        : trimStr(cfg.restaurantSiteUrl) || "https://www.kinobu.co.jp/en";
    for (var i = 0; i < restLinks.length; i++) {
      restLinks[i].setAttribute("href", restUrl);
    }
  }

  function startWorkerCheckout(workerUrl, tierKey, btnEl, statusEl, defaultLabel) {
    btnEl.disabled = true;
    btnEl.textContent = t("watch.opening");
    if (statusEl) {
      statusEl.hidden = true;
    }

    fetch(workerUrl + "/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tier: tierKey, locale: currentLang })
    })
      .then(function (res) {
        if (!res.ok) {
          throw new Error("Checkout HTTP " + res.status);
        }
        return res.json();
      })
      .then(function (data) {
        if (data && data.url) {
          window.location.href = localizeCheckoutUrl(data.url, currentLang);
          return;
        }
        throw new Error("Missing checkout URL");
      })
      .catch(function () {
        btnEl.disabled = false;
        btnEl.textContent = defaultLabel;
        if (statusEl) {
          statusEl.textContent = t("watch.error");
          statusEl.hidden = false;
        }
      });
  }

  function resolveTierText(tierKey, tierCfg) {
    var rawLabel = trimStr(tierCfg.label);
    var rawTerms = trimStr(tierCfg.terms);
    var defaults = DEFAULT_EN_TIERS[tierKey] || {};

    if (currentLang === "ja") {
      var jaLabel = trimStr(tierCfg.labelJa);
      var jaTerms = trimStr(tierCfg.termsJa);
      var isDefaultLabel = !rawLabel || rawLabel === defaults.label;
      var isDefaultTerms = !rawTerms || rawTerms === defaults.terms;
      return {
        label: jaLabel || (isDefaultLabel ? t("tier." + tierKey + ".label") : rawLabel),
        terms: jaTerms || (isDefaultTerms ? t("tier." + tierKey + ".terms") : rawTerms)
      };
    }

    return {
      label: rawLabel || t("tier." + tierKey + ".label") || tierKey,
      terms: rawTerms || t("tier." + tierKey + ".terms")
    };
  }

  function bindStaticCheckoutTracking(el, tierKey, locationName) {
    if (!el || el.getAttribute("data-ph-bound") === "1") return;
    el.setAttribute("data-ph-bound", "1");
    el.addEventListener("click", function () {
      var href = el.getAttribute("href") || "";
      if (href.indexOf("stripe.com") !== -1) {
        var tCfg = cfg[tierKey] || {};
        trackEvent("checkout_clicked", {
          tier: tierKey,
          price: trimStr(tCfg.price),
          mode: "links",
          location: locationName,
          lang: currentLang
        });
      }
    });
  }

  function wireTickets() {
    var isWorkerMode = trimStr(cfg.mode).toLowerCase() === "worker";
    var workerUrl = trimStr(cfg.WORKER_URL).replace(/\/+$/, "");

    var rentLink = resolveTierCheckoutLink(cfg.rent);
    var dlLink = resolveTierCheckoutLink(cfg.download);

    // Hero & Watch Room Gate quick CTAs
    var heroRentEls = document.querySelectorAll("[data-hero-rent]");
    for (var r = 0; r < heroRentEls.length; r++) {
      heroRentEls[r].href = !isWorkerMode && rentLink ? rentLink : "#watch";
      bindStaticCheckoutTracking(heroRentEls[r], "rent", "hero");
    }
    var heroDlEls = document.querySelectorAll("[data-hero-download]");
    for (var d = 0; d < heroDlEls.length; d++) {
      heroDlEls[d].href = !isWorkerMode && dlLink ? dlLink : "#watch";
      bindStaticCheckoutTracking(heroDlEls[d], "download", "hero");
    }

    var gateRent = document.getElementById("watch-gate-rent");
    if (gateRent) {
      gateRent.href = !isWorkerMode && rentLink ? rentLink : "./#watch";
      bindStaticCheckoutTracking(gateRent, "rent", "watch_gate");
    }

    var gateDownload = document.getElementById("watch-gate-download");
    if (gateDownload) {
      gateDownload.href = !isWorkerMode && dlLink ? dlLink : "./#watch";
      bindStaticCheckoutTracking(gateDownload, "download", "watch_gate");
    }

    var cards = document.querySelectorAll("[data-tier]");
    if (!cards.length) return;

    for (var i = 0; i < cards.length; i++) {
      var card = cards[i];
      var tierKey = card.getAttribute("data-tier");
      var tierCfg = cfg[tierKey];
      if (!tierCfg) continue;

      var copy = resolveTierText(tierKey, tierCfg);
      var price =
        currentLang === "ja" && trimStr(tierCfg.priceJa)
          ? trimStr(tierCfg.priceJa)
          : trimStr(tierCfg.price);
      var directLink = resolveTierCheckoutLink(tierCfg);

      var labelEl = card.querySelector("[data-tier-label]");
      var priceEl = card.querySelector("[data-tier-price]");
      var termsEl = card.querySelector("[data-tier-terms]");
      var slotEl = card.querySelector("[data-tier-slot]");
      var statusEl = card.querySelector("[data-tier-status]");

      if (labelEl) labelEl.textContent = copy.label;
      if (priceEl) priceEl.textContent = price;
      if (termsEl) termsEl.textContent = copy.terms;

      if (!slotEl) continue;

      var isFeatured = card.classList.contains("ticket-card--featured");
      var btnVariant = isFeatured ? "btn btn--ticket-featured" : "btn btn--ticket";
      var ctaLabel =
        price && /^[$\u00a5\u20ac\u00a30-9]/.test(price)
          ? copy.label + " \u2014 " + price
          : copy.label;
      slotEl.innerHTML = "";

      if (!isWorkerMode && directLink) {
        var linkEl = document.createElement("a");
        linkEl.className = btnVariant;
        linkEl.href = directLink;
        linkEl.rel = "noopener";
        linkEl.textContent = ctaLabel;
        (function (tKey, tPrice) {
          linkEl.addEventListener("click", function () {
            trackEvent("checkout_clicked", {
              tier: tKey,
              price: tPrice,
              mode: "links",
              location: "card",
              lang: currentLang
            });
          });
        })(tierKey, price);
        slotEl.appendChild(linkEl);
        if (statusEl) statusEl.hidden = true;
      } else if (isWorkerMode && workerUrl) {
        var activeBtn = document.createElement("button");
        activeBtn.type = "button";
        activeBtn.className = btnVariant;
        activeBtn.textContent = ctaLabel;
        (function (tKey, tPrice, bEl, sEl, cLabel) {
          bEl.addEventListener("click", function () {
            trackEvent("checkout_clicked", {
              tier: tKey,
              price: tPrice,
              mode: "worker",
              location: "card",
              lang: currentLang
            });
            startWorkerCheckout(workerUrl, tKey, bEl, sEl, cLabel);
          });
        })(tierKey, price, activeBtn, statusEl, ctaLabel);
        slotEl.appendChild(activeBtn);
        if (statusEl) statusEl.hidden = true;
      } else {
        var disabledBtn = document.createElement("button");
        disabledBtn.type = "button";
        disabledBtn.className = btnVariant + " is-disabled";
        disabledBtn.disabled = true;
        disabledBtn.setAttribute("aria-disabled", "true");
        disabledBtn.textContent = ctaLabel;
        slotEl.appendChild(disabledBtn);
        if (statusEl) {
          statusEl.textContent = t("watch.soon");
          statusEl.hidden = false;
        }
      }
    }
  }

  /* ==========================================================================
     LIGHTBOX FOR 4K FILM STILLS
     ========================================================================== */

  function syncLightboxCaption() {
    if (activeLightboxIdx < 0 || activeLightboxIdx >= STILLS_ITEMS.length) return;
    var item = STILLS_ITEMS[activeLightboxIdx];
    var imgEl = document.getElementById("lightbox-img");
    var capEl = document.getElementById("lightbox-caption");
    var counterEl = document.getElementById("lightbox-counter");
    if (imgEl) {
      imgEl.src = item.src;
      imgEl.alt = t(item.altKey);
    }
    if (capEl) capEl.textContent = t(item.capKey);
    if (counterEl) counterEl.textContent = (activeLightboxIdx + 1) + " / " + STILLS_ITEMS.length;
  }

  function wireStillsLightbox() {
    var modal = document.getElementById("still-lightbox");
    if (!modal) return;

    var triggers = document.querySelectorAll("[data-still-index]");
    var closeBtn = document.getElementById("lightbox-close");
    var prevBtn = document.getElementById("lightbox-prev");
    var nextBtn = document.getElementById("lightbox-next");
    var backdrops = modal.querySelectorAll("[data-lightbox-close]");

    function openAt(idx) {
      activeLightboxIdx = (idx + STILLS_ITEMS.length) % STILLS_ITEMS.length;
      syncLightboxCaption();
      modal.hidden = false;
      document.body.style.overflow = "hidden";
      trackEvent("still_opened", {
        index: activeLightboxIdx + 1,
        src: STILLS_ITEMS[activeLightboxIdx].src,
        lang: currentLang
      });
      if (closeBtn) closeBtn.focus();
    }

    function closeModal() {
      modal.hidden = true;
      activeLightboxIdx = -1;
      document.body.style.overflow = "";
    }

    for (var i = 0; i < triggers.length; i++) {
      triggers[i].addEventListener("click", function (ev) {
        var idx = parseInt(ev.currentTarget.getAttribute("data-still-index") || "0", 10);
        openAt(isNaN(idx) ? 0 : idx);
      });
    }

    if (closeBtn) closeBtn.addEventListener("click", closeModal);
    for (var b = 0; b < backdrops.length; b++) {
      backdrops[b].addEventListener("click", closeModal);
    }
    if (prevBtn) {
      prevBtn.addEventListener("click", function () {
        if (activeLightboxIdx >= 0) openAt(activeLightboxIdx - 1);
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener("click", function () {
        if (activeLightboxIdx >= 0) openAt(activeLightboxIdx + 1);
      });
    }

    document.addEventListener("keydown", function (ev) {
      if (modal.hidden) return;
      if (ev.key === "Escape") {
        closeModal();
      } else if (ev.key === "ArrowLeft") {
        openAt(activeLightboxIdx - 1);
      } else if (ev.key === "ArrowRight") {
        openAt(activeLightboxIdx + 1);
      }
    });
  }

  /* ==========================================================================
     SCREENING & DOWNLOAD ROOM (watch.html)
     ========================================================================== */

  function renderWatchRoomDynamicCopy() {
    var root = document.getElementById("watch-player-root");
    if (!root) return;

    var gateTitle = document.getElementById("watch-gate-title");
    var gateCopy = document.getElementById("watch-gate-copy");
    var expiryEl = document.getElementById("watch-expiry");
    var hudModeEl = document.getElementById("watch-hud-mode");

    if (watchRoomState === "yt" && expiryEl) {
      expiryEl.textContent =
        watchRoomPlan === "download" || watchRoomPlan === "own"
          ? t("watchRoom.ytDownload")
          : t("watchRoom.ytRent");
      if (hudModeEl) {
        hudModeEl.textContent =
          watchRoomPlan === "download" || watchRoomPlan === "own"
            ? t("watchRoom.modeDownload")
            : t("watchRoom.modeRent");
      }
    } else if (watchRoomState === "verifying") {
      if (gateTitle) gateTitle.textContent = t("watchRoom.verifyingTitle");
      if (gateCopy) gateCopy.textContent = t("watchRoom.verifyingCopy");
    } else if (watchRoomState === "expired") {
      if (gateTitle) gateTitle.textContent = t("watchRoom.expiredTitle");
      if (gateCopy) gateCopy.textContent = t("watchRoom.expiredCopy");
    } else if (watchRoomState === "active" && watchRoomData && expiryEl) {
      if (watchRoomData.expiresAt) {
        var dt = new Date(watchRoomData.expiresAt);
        var locale = currentLang === "ja" ? "ja-JP" : undefined;
        expiryEl.textContent =
          t("watchRoom.rentalUntil") +
          (isNaN(dt.getTime()) ? watchRoomData.expiresAt : dt.toLocaleString(locale));
        if (hudModeEl) hudModeEl.textContent = t("watchRoom.modeRent");
      } else {
        expiryEl.textContent = t("watchRoom.permanent");
        if (hudModeEl) hudModeEl.textContent = t("watchRoom.modeDownload");
      }
    }
  }

  function wireWatchRoom() {
    var root = document.getElementById("watch-player-root");
    if (!root) return;

    var isWorkerMode = trimStr(cfg.mode).toLowerCase() === "worker";
    var workerUrl = trimStr(cfg.WORKER_URL).replace(/\/+$/, "");
    var params = new URLSearchParams(window.location.search);
    var token = trimStr(params.get("token"));
    var sessionId = trimStr(params.get("session_id"));

    var gateEl = document.getElementById("watch-gate");
    var videoEl = document.getElementById("film-video");
    var controlsBar = document.getElementById("watch-controls-bar");
    var dlEnEl = document.getElementById("watch-download-en");
    var dlJaEl = document.getElementById("watch-download-ja");

    if (dlEnEl) {
      dlEnEl.addEventListener("click", function () {
        trackEvent("film_download_clicked", { edition: "en_sub", lang: currentLang });
      });
    }
    if (dlJaEl) {
      dlJaEl.addEventListener("click", function () {
        trackEvent("film_download_clicked", { edition: "ja_nosub", lang: currentLang });
      });
    }

    // Option A — Payment Links redirect:
    // watch.html?plan=rent|download&v=YOUTUBE_ID (and optional &dl=...&dl_ja=...)
    var ytId = trimStr(params.get("v"));
    var planRaw = trimStr(params.get("plan")).toLowerCase();
    var directDlEn = trimStr(params.get("dl"));
    var directDlJa = trimStr(params.get("dl_ja"));

    if (!isWorkerMode && /^[A-Za-z0-9_-]{11}$/.test(ytId)) {
      watchRoomPlan = planRaw === "download" || planRaw === "own" ? "download" : "rent";
      watchRoomState = "yt";

      var screen = document.getElementById("watch-cinema-screen");
      if (screen) {
        var frame = document.createElement("iframe");
        frame.src =
          "https://www.youtube-nocookie.com/embed/" +
          ytId +
          "?rel=0&modestbranding=1&playsinline=1";
        frame.title = "KINOBU — Full Film";
        frame.allow =
          "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen";
        frame.allowFullscreen = true;
        frame.referrerPolicy = "strict-origin-when-cross-origin";
        screen.insertBefore(frame, screen.firstChild);
      }

      if (gateEl) gateEl.hidden = true;
      if (controlsBar) controlsBar.hidden = false;

      if (watchRoomPlan === "download") {
        if (dlEnEl && /^https?:\/\//i.test(directDlEn)) {
          dlEnEl.href = directDlEn;
          dlEnEl.hidden = false;
        }
        if (dlJaEl && /^https?:\/\//i.test(directDlJa)) {
          dlJaEl.href = directDlJa;
          dlJaEl.hidden = false;
        }
      }

      trackEvent("screening_room_unlocked", {
        plan: watchRoomPlan,
        delivery: "links",
        lang: currentLang
      });
      renderWatchRoomDynamicCopy();
      return;
    }

    // Option B — Worker / Stripe Checkout Session verification:
    if (!isWorkerMode || !workerUrl || (!token && !sessionId)) {
      return;
    }

    watchRoomState = "verifying";
    renderWatchRoomDynamicCopy();

    var query = new URLSearchParams();
    if (token) query.set("token", token);
    if (sessionId) query.set("session_id", sessionId);

    fetch(workerUrl + "/access?" + query.toString(), {
      method: "GET",
      headers: { Accept: "application/json" }
    })
      .then(function (res) {
        if (!res.ok) throw new Error("Access denied");
        return res.json();
      })
      .then(function (data) {
        if (!data || !data.streamUrl) {
          throw new Error("Missing stream URL");
        }
        watchRoomState = "active";
        watchRoomData = data;

        var preferredStream =
          currentLang === "ja" && trimStr(data.streamUrlJa)
            ? trimStr(data.streamUrlJa)
            : trimStr(data.streamUrl);

        if (videoEl) {
          videoEl.src = preferredStream;
          videoEl.hidden = false;
        }
        if (gateEl) gateEl.hidden = true;
        if (controlsBar) controlsBar.hidden = false;

        if (dlEnEl && trimStr(data.downloadUrl)) {
          dlEnEl.href = trimStr(data.downloadUrl);
          dlEnEl.hidden = false;
        }
        if (dlJaEl && trimStr(data.downloadUrlJa)) {
          dlJaEl.href = trimStr(data.downloadUrlJa);
          dlJaEl.hidden = false;
        }

        trackEvent("screening_room_unlocked", {
          plan: data.expiresAt ? "rent" : "download",
          delivery: "worker",
          lang: currentLang
        });
        renderWatchRoomDynamicCopy();
      })
      .catch(function () {
        watchRoomState = "expired";
        renderWatchRoomDynamicCopy();
      });
  }

  /* ==========================================================================
     LANGUAGE APPLICATION & NAVIGATION MENU
     ========================================================================== */

  function applyLanguage(lang, persist) {
    currentLang = lang === "ja" ? "ja" : "en";
    document.documentElement.setAttribute("lang", currentLang);

    var isWatchRoom = !!document.getElementById("watch-player-root");
    document.title = isWatchRoom ? t("watchPageTitle") : t("pageTitle");

    var textNodes = document.querySelectorAll("[data-i18n]");
    for (var i = 0; i < textNodes.length; i++) {
      var key = textNodes[i].getAttribute("data-i18n");
      if (key === "nav.menu") {
        var navEl = document.querySelector(".site-nav");
        var isOpen = navEl && navEl.classList.contains("is-open");
        textNodes[i].textContent = isOpen ? t("nav.close") : t("nav.menu");
      } else {
        textNodes[i].textContent = t(key);
      }
    }

    var htmlNodes = document.querySelectorAll("[data-i18n-html]");
    for (var j = 0; j < htmlNodes.length; j++) {
      var hKey = htmlNodes[j].getAttribute("data-i18n-html");
      htmlNodes[j].innerHTML = t(hKey);
    }

    var ariaNodes = document.querySelectorAll("[data-i18n-aria]");
    for (var k = 0; k < ariaNodes.length; k++) {
      var aKey = ariaNodes[k].getAttribute("data-i18n-aria");
      ariaNodes[k].setAttribute("aria-label", t(aKey));
    }

    var altNodes = document.querySelectorAll("[data-i18n-alt]");
    for (var q = 0; q < altNodes.length; q++) {
      var altKey = altNodes[q].getAttribute("data-i18n-alt");
      altNodes[q].setAttribute("alt", t(altKey));
    }

    var langBtns = document.querySelectorAll("[data-set-lang]");
    for (var n = 0; n < langBtns.length; n++) {
      var active = langBtns[n].getAttribute("data-set-lang") === currentLang;
      langBtns[n].classList.toggle("is-active", active);
      langBtns[n].setAttribute("aria-pressed", active ? "true" : "false");
    }

    // Automatically match trailer version to language unless viewer manually pinned it
    if (!userPinnedTrailerVer) {
      setTrailerVersion(currentLang === "ja" ? "ja" : "en", false);
    }

    syncLocalizedExternalLinks();
    wireTickets();
    syncLightboxCaption();
    renderWatchRoomDynamicCopy();

    if (persist) {
      try {
        window.localStorage.setItem(STORAGE_KEY, currentLang);
      } catch (e) {}

      try {
        var url = new URL(window.location.href);
        if (currentLang === "ja") {
          url.searchParams.set("lang", "ja");
        } else {
          url.searchParams.delete("lang");
        }
        window.history.replaceState({}, "", url.toString());
      } catch (e2) {}
    }
  }

  function wireMenuAndLanguageControls() {
    var langBtns = document.querySelectorAll("[data-set-lang]");
    for (var i = 0; i < langBtns.length; i++) {
      langBtns[i].addEventListener("click", function (ev) {
        var targetLang = ev.currentTarget.getAttribute("data-set-lang");
        if (targetLang !== currentLang) {
          applyLanguage(targetLang, true);
          trackEvent("language_switched", { lang: currentLang });
        }
      });
    }

    var navEl = document.querySelector(".site-nav");
    var toggleBtn = document.getElementById("menu-toggle");
    var navLinks = document.getElementById("site-nav-links");

    if (!navEl || !toggleBtn || !navLinks) return;

    function closeMenu() {
      navEl.classList.remove("is-open");
      toggleBtn.setAttribute("aria-expanded", "false");
      toggleBtn.textContent = t("nav.menu");
    }

    toggleBtn.addEventListener("click", function () {
      var opening = !navEl.classList.contains("is-open");
      navEl.classList.toggle("is-open", opening);
      toggleBtn.setAttribute("aria-expanded", opening ? "true" : "false");
      toggleBtn.textContent = opening ? t("nav.close") : t("nav.menu");
    });

    var anchors = navLinks.querySelectorAll("a");
    for (var j = 0; j < anchors.length; j++) {
      anchors[j].addEventListener("click", closeMenu);
    }

    document.addEventListener("keydown", function (ev) {
      if (ev.key === "Escape" && navEl.classList.contains("is-open")) {
        closeMenu();
        toggleBtn.focus();
      }
    });
  }

  initPostHog();
  wireGlobalLinksAndTrailer();
  wireMenuAndLanguageControls();
  wireStillsLightbox();
  applyLanguage(detectInitialLang(), false);
  wireWatchRoom();
})();
