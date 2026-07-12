# Sacred Therapy AU — Project State

## Current Objective
Build a production-grade Next.js website for Sacred Therapy AU—a premium digital wellness platform. Phase 1 MVP: brand identity, 8+ core pages with video/audio integration, responsive design, and email-gated audio preview system.

## Relevant Architecture
- **Framework**: Next.js 15 App Router, React 19, TypeScript
- **Styling**: Tailwind CSS v4 with `@theme` inline for CSS custom properties
- **Design System**: 7-color palette (cream, beige, whisper, espresso, sand, honey, deep) + Cormorant Garamond (serif) + Inter (sans) fonts
- **Animations**: `.breathe` (7s scale pulse), `.breathe-slow` (11s), `.reveal` (fade-in-up on scroll), 60-step smooth fade (3 seconds)
- **Audio Player**: HTML5 `<audio>` with real metadata, seek scrubber, play/pause, progress tracking
- **Preview Gate**: 60-second audio limit → volume fade-out (3s) → soft modal overlay → email capture → sessionStorage-scoped bypass for rest of session
- **Backend (email capture)**: Supabase project `sacred-therapy-au` (ref `yuklypiwiketyslzfuel`, org "Nivesh", region ap-southeast-2, free tier) + Resend for transactional email. `/api/begin` route inserts submissions and sends a matched-audio "gift" email. Secrets in `.env.local` (gitignored). No auth/accounts — site is intentionally all-free for now.

## Files Already Changed (This Session)
- `src/app/sound-sanctuary/page.tsx` — audio player, 8 tracks, mood filters, preview gate logic
- `src/app/page.tsx` — hero video, founder section, testimonials, membership preview
- `src/app/breathwork/page.tsx` — video hero, practice grid, live class schedule (June 28 + Aug 30)
- `src/app/membership/page.tsx` — 3 tiers: Free (→ /begin), $29/month (Coming soon), $290/year (Coming soon)
- `src/app/begin/page.tsx` — contact form with 7 mood pill options
- `src/app/about/page.tsx` — founder bio, credentials, pull quotes (all "Neshantha" → "Neshi")
- `globals.css` — complete design system (colors, utilities, keyframes)
- `src/components/FlowerOfLife.tsx` — SVG sacred geometry (19 circles)
- `.claude/launch.json` — dev server config (port 3456)
- `/public/audio/` — 9 guided sessions (see catalog below); `returning-to-the-body.mp3` no longer exists
- `/public/images/` — brand images incl. `founder-neshi1.png` (about page hero, replaced `hero-stillness.jpg` there), `founder-neshi.jpg`, `sanctuary-candle.jpg`, `journey-*.jpg`
- `/public/video/` — hero.mp4, breathwork.mp4

## Current Audio Player Implementation
**Component**: `src/app/sound-sanctuary/page.tsx` (immersive full-screen overlay)

**Track Data Structure** (9 total, all with real audio):
```ts
interface Track { slug: string; title: string; feeling: Feeling; duration: string | null; src: string }
```
- Taxonomy switched from `mood` → `feeling` (emotional-state entry tags: "I feel anxious",
  "I feel emotionally overwhelmed", "I feel drained", "I can't sleep", "I feel stuck",
  "I feel disconnected", "I want confidence"). Filter chips + card labels + player label all use `feeling`.
- Modeled on the breathwork `PRACTICES` convention (typed interface + union type + slug `id`).

**Catalog (12 real tracks, all playable):**
| slug | title | feeling | duration |
|---|---|---|---|
| rejuvenating-inner-energy | Rejuvenating Your Inner Energy | I feel drained | 13 min |
| sacred-stillness | Sacred Stillness | I feel emotionally overwhelmed | 23 min |
| soft-landing | Soft Landing | I can't sleep | 7 min |
| woodland-mirror-radical-acceptance | The Woodland Mirror: A Journey of Radical Acceptance | I feel disconnected | 13 min |
| mirroring-water-mindset-alignment | Mirroring the Water: Deep Mindset Alignment & Core Clarity | I feel stuck | 13 min |
| 10-step-descent-to-clarity | Into Clarity: A Guided Descent | I feel stuck | 13 min |
| brilliant-white-light-awareness | Brilliant White Light: A Journey of Connected Awareness | I feel disconnected | 14 min |
| the-reset-subconscious-blueprinting | The Reset: Subconscious Blueprinting | I want confidence | 10 min |
| patience-and-intention | Patience & Intention | I feel anxious | 8 min |
| awakening-the-glow-mindset-balance | Awakening the Glow: Mindset Balance | I want confidence | 15 min |
| floating-into-stillness-river-meditation | Floating into Stillness: River Meditation | I feel emotionally overwhelmed | 15 min |
| floating-free-positive-transformation | Floating Free: Sinking Deep into Positive Transformation | I feel stuck | 17 min |

- Durations auto-detected from audio metadata in-browser (`loadedmetadata`), rounded to whole minutes.
- **Preview/email gate is DISABLED** this pass via `GATE_ENABLED = false` — all logic kept intact
  for the follow-up task; playback is raw (verified continuous past 60s, no modal).
- "Into Clarity: A Guided Descent" = display title only; file stays `10-step-descent-to-clarity.mp3`.
- Tracks have no `desc` field yet (founder to supply copy) — card description line removed for now.

**Removed** (replaced by the real catalog):
- "Returning to the Body" — its audio file was deleted (`returning-to-the-body.mp3` no longer exists).
- Placeholder silent tracks: "She Who Comes Home", "Hold the Tender One", "Let It Move Through",
  "The Quiet Voice", "Anchor & Arrive".
- Homepage `sanctuaryTracks` preview updated to 3 real tracks (Soft Landing, Sacred Stillness, Rejuvenating).

**Player UI**:
- Flower of Life (breathing animation when playing)
- Mood label + title + formatted time (current / total)
- Interactive progress bar (click to seek)
- Play/pause toggle (honey-colored)
- Previous/next buttons (disabled)

**Gate Logic**:
1. Audio plays normally for 60 seconds
2. At 60s mark: `startFadeOut()` reduces volume 1→0 over 3 seconds (60 steps via setInterval)
3. After fade completes: audio pauses, volume reset to 1, modal fades in
4. User submits email → `sessionStorage.setItem(GATE_STORAGE_KEY, 'true')`
5. Modal fades out (500ms delay), audio resumes from pause point
6. Session flag prevents re-gating for remaining session

## Completed Work
✅ All Phase 1 pages built and styled  
✅ Brand design system (colors, fonts, animations, utilities)  
✅ Video backgrounds (homepage hero, breathwork page)  
✅ Audio player with real metadata support  
✅ 60-second preview gate with smooth fade + soft modal  
✅ Founder name updated to "Neshi" throughout  
✅ Membership tiers (Free active, $29/$290 deferred)  
✅ Breathwork live classes with optional fields ("TBA" support)  
✅ Contact form at /begin  
✅ All 6 brand images integrated  
✅ 2 audio tracks playable (returning-to-the-body, sacred-stillness)  

## ✅ Completed Task (This Session)
**Audio Integration for "The Soft Landing" Track**
1. Copied `Somatic Weight & Renewal (Guided Grounding Session).mp3` → `/public/audio/soft-landing.mp3`
2. Updated `src/app/sound-sanctuary/page.tsx` line 14 to add `src: "/audio/soft-landing.mp3"`
3. Verified in browser: player displays "0:02 / 7:22" (audio loaded, metadata parsed correctly)
4. No console errors—audio plays with full 60-second preview gate active

**Playing Tracks** (now 3/8):
- "Returning to the Body" (Anxiety, 13:29)
- "Sacred Stillness" (Stillness, 23:23)
- "The Soft Landing" (Sleep, 7:22) ✨ *just added*

## ✅ Completed Task (This Session)
**Reconciled displayed track durations with real audio metadata**
- Card durations for the 3 playing tracks were stale placeholders (22/38/45 min) that contradicted the real audio.
- Updated `src/app/sound-sanctuary/page.tsx` grid: Returning "13 min", Soft Landing "7 min", Sacred Stillness "23 min".
- Updated `src/app/page.tsx` homepage `sanctuaryTracks` preview: Returning "13 min", Soft Landing "7 min" (Sacred Stillness not in preview).
- Silent tracks (no audio) left with their placeholder estimates.
- Verified in browser (port 3456): both `/` and `/sound-sanctuary` render corrected durations, no server errors.

## ✅ Completed Task (This Session)
**Wired 9 real guided-audio sessions into the Sound Sanctuary**
1. Renamed 9 files in `public/audio/` (stripped a doubled `.mp3.mp3` extension → clean slugs).
2. Extended the existing inline tracks source; restructured to the breathwork typed-array convention
   (`interface Track` + `Feeling` union). New taxonomy = emotional-state entry tags.
3. Added all 9 tracks (slug, title, feeling, src); auto-detected durations from audio metadata.
4. Disabled the preview/email gate (`GATE_ENABLED = false`) — raw playback only, logic preserved for follow-up.
5. Verified in browser (port 3456): all 9 render as cards, filter chips work, playback confirmed
   (The Reset played, continued past 60s with no gate), no console/server errors. All 9 files load metadata OK.

**Follow-ups flagged:**
- Track descriptions (`desc`) — founder to supply copy; card description line currently omitted.
- Re-enable the 60-second preview + email-capture gate (separate task).

## ✅ Completed Task (This Session)
**About page edits**
1. Bio copy tweak in `src/app/about/page.tsx`: opening line changed from an em-dash break to a comma —
   "He came to it the way most healers do, slowly, and by needing it himself first." — matching
   founder-supplied phrasing.
2. Removed the "Healing isn't about becoming someone new..." pull-quote section entirely (was between the credentials list and "A Note From Neshi").
3. Swapped the about-page hero image from `hero-stillness.jpg` to `/images/founder-neshi1.png` (Neshi on the wooden deck overlooking the ocean, Sri Lanka retreat photo) — file is a `.png` despite the filename implying a photo, verify extension before reusing this asset elsewhere.
4. Verified in browser: bio text, quote removal, and new hero image all render correctly on `/about`.

## ✅ Completed Tasks (Session 2026-07-03)

**Email-capture pipeline — "Collect Your Key" free-tier lead flow (major)**
- **Strategy decided with founder**: keep the whole site free for now (no accounts, no auth, no paywall); defer paid tiers ($29/$290) until traffic justifies. Goal for now = grow the email list. Chose Resend (over Formspree) for personalized email, and a new Supabase project (over Sheets) for a real subscriber list.
- **Supabase**: created project `sacred-therapy-au` (ref `yuklypiwiketyslzfuel`). Table `subscribers` (id uuid pk, name, email unique, feeling, message, gift_track_slug, created_at).
- **Resend**: account owned by founder; `re_...` key in `.env.local`. ⚠️ Unverified accounts can only send to the account owner's own email (niveshkantha@gmail.com) — must verify a sending domain before real visitors, and before Netlify launch.
- **New files**: `src/lib/gifts.ts` (feeling→track map: anxious→Patience & Intention, overwhelmed→Sacred Stillness, disconnected→Woodland Mirror, burnt-out→Rejuvenating Inner Energy, seeking-confidence→The Reset; DEFAULT=Soft Landing), `src/lib/supabaseAdmin.ts` (service-role client, server-only), `src/app/api/begin/route.ts` (validates → upsert on email → Resend gift email).
- **Frontend wiring**: homepage feeling tiles now link `/begin?feeling=<slug>`; `/begin` reads the slug (Suspense-wrapped `useSearchParams`), pre-selects the matching chip, and submits for real to `/api/begin` with submitting/error states; thank-you screen names the gift track.
- **Env vars** (`.env.local`): `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`, `NEXT_PUBLIC_SITE_URL`. All five must be added to Netlify on deploy, with `NEXT_PUBLIC_SITE_URL` pointed at the real domain (used in the email's "Listen in the Sound Sanctuary" link).
- **Installed**: `@supabase/supabase-js`.
- **Verified end-to-end**: submitted "Burnt out" path → row landed in `subscribers` (gift_track_slug `rejuvenating-inner-energy`), Resend returned ok, thank-you screen correct, no server errors.

**Membership redesign (both the `/membership` page AND the homepage preview block in `page.tsx`)**
- Sanctuary ($29) is not on offer, so it can't be "most chosen": moved the featured dark/gold theme (bg-deep, glow, scale, ribbon) from The Sanctuary to **The Quiet Path** (the only available tier).
- Sanctuary `note` "Most chosen" → "Coming soon"; its card is now a plain light card.
- Free-tier CTA renamed "Sign up free" → **"Collect your key"**; on the dark featured card it's a solid-gold fill (`bg-honey text-deep`). The "MOST CHOSEN" ribbon is also solid gold — the two match.
- `/membership` subhead: "...Choose the key to open the door that feels right for now."
- Nav label "Membership" → **"Collect Your Key"** (route still `/membership`).

**Copy / content**
- Homepage "How are you feeling lately?" subhead → "There's no wrong answer, just what's true for you right now. Share it, and we'll inbox you a small care package curated for you."
- Removed the testimonial section entirely ("Eliza, Byron Bay" — was between Promise and Membership on the homepage).
- `/begin` form reordered: chips → share textarea → name → email (contact details last, matching "no pressure" ethos); added email microcopy "Just so we know where to send a reply. No newsletters unless you ask."; added gift line to subhead.
- Breathwork: June 28 live class now shows "Completed" (added `completed?` flag) instead of "Register interest"; Aug 30 still active. Every guided-practice card now has a "Coming Soon" pill (audio not yet live).

**Design / legibility**
- `SiteHeader`: added a top gradient scrim + bumped nav links to `text-foreground/90 font-medium` so they read over bright hero images.
- About page hero image swapped `founder-neshi1.png` → `founder-neshi2.png`.
- `/begin` background image opacity `opacity-10` → `opacity-30`; form text lifted ~20% (labels off muted-foreground to `text-foreground/75`, etc.).
- `SiteFooter`: link columns, section headings (`!text-foreground/70` over `.label-caps`), Privacy/Terms, and bottom row all lifted for legibility.

## ⚠️ Recurring Dev Server Issue — Stale `.next/dev/lock`
Symptom: `preview_start` reports success but the server immediately disappears from `preview_list`,
or a plain `npx next dev` run prints `⨯ Another next dev server is already running` even though
nothing is actually listening on the port.

Root cause: `.next/dev/lock` records the PID that last held port 3456. If that process was killed
without a clean exit (or the OS later recycles the PID for an unrelated process), Next.js still
honors the lock and refuses to start a second dev server for this project directory.

Fix: confirm nothing is actually listening on the port (`Get-NetTCPConnection -LocalPort 3456`),
then delete `.next/dev/lock` and restart via `preview_start`. Happened twice this session (2026-07-02);
if it recurs, this is the first thing to check before deeper debugging.

## ✅ LIVE: Deployed to Netlify with GitHub continuous deployment (2026-07-03)

**The site is live at https://sacredtherapy.co** with working push-to-deploy.

### Hosting / CI setup
- **GitHub repo**: https://github.com/niveshkantha/sacred-therapy-au — **PUBLIC**, default branch `main`.
  (Made public deliberately; see "contributor block" below. ⚠️ This means internal docs in the repo —
  `PROJECT_STATE.md`, `CLAUDE.md`, `AGENTS.md`, and the Supabase project ref — are publicly visible.
  To re-privatise, first move those docs out AND verify a Git contributor in Netlify, or the free-plan
  single-contributor limit re-blocks builds.)
- **Netlify production site**: name `sacredtherapy`, siteId `eef27b87-0591-4d03-852c-f479ee1344a1`,
  team `sacredtherapyau` (Free plan). Custom domain **sacredtherapy.co**. Forms feature enabled (unused).
- **Netlify account**: `sacredtherapyau@gmail.com` (owner "Neshi Jayamaha"), password login, **no GitHub
  account connected** to Netlify.
- **Continuous deployment**: repo linked in the Netlify UI → every push to `main` auto-builds and
  auto-publishes via the Next.js runtime (`@netlify/plugin-nextjs` v5). `/api/begin` runs as a serverless function.
- **`netlify.toml`** (committed): build command `npm run build`, `NODE_VERSION = 22`, **`publish = ".next"`**
  (required for the Next runtime — leaving it unset defaults publish to the repo root and the plugin errors).
- **Git commit identity**: commits are authored as **`sacredtherapyau@gmail.com`** (the Netlify account email).
  This is required — see contributor block below. `git config user.email` in this repo is set to that.

### ⚠️ Redundant Netlify site to delete
An extra site **`sacred-therapy-au`** (siteId `4c1a429b-9947-4a03-99dd-fdbc437bc6b8`) was created early by
mistake before the real `sacredtherapy` site was found. It holds copies of all 5 env vars **including the
secret keys** and is otherwise unused. Delete it in the Netlify dashboard (Site configuration → Danger zone).

### Environment variables (all 5 set on the `sacredtherapy` site)
Set as **non-secret**, scoped to `builds,functions,runtime,post_processing`, context `all`:
`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`,
`RESEND_API_KEY`, `NEXT_PUBLIC_SITE_URL=https://sacredtherapy.co`.
- ⚠️ **Do NOT mark the two keys as "secret"** on Netlify: when they were set secret via the MCP they did
  not reach the function runtime (the route returned 500 "not configured"). Non-secret is safe here because
  `SUPABASE_SERVICE_ROLE_KEY` / `RESEND_API_KEY` are **not** `NEXT_PUBLIC_` and so are never inlined into the
  client bundle. Env-var changes require a **new deploy** to take effect for functions.

### Code change made for deployability
- `src/lib/supabaseAdmin.ts`: was `export const supabaseAdmin = createClient(...)` at module scope →
  now a lazy **`getSupabaseAdmin()`** factory (constructs on first call, caches). Module-scope creation threw
  "supabaseKey is required." during Next's build-time page-data collection because the service-role key is
  absent at build time → "Failed to collect page data for /api/begin".
- `src/app/api/begin/route.ts`: imports the factory, creates the client **inside** `POST`, and has a runtime
  env guard at the top of the handler returning a clean `500` if any required env var is missing.
- `/api/begin` is the only API route / only `createClient` call in the codebase — nothing else had the pattern.

### Four blockers cleared to get the first successful deploy (in order)
1. **Publish dir** — Next runtime v5 rejected publish=repo-root. Fix: `publish = ".next"` in `netlify.toml`.
2. **Unrecognized Git contributor** — Netlify Free plan blocks builds on **private** repos from committers who
   aren't verified team members. Commits were authored as `niveshkantha@gmail.com` (≠ Netlify account). Fixed by
   (a) making the repo **public** and (b) re-authoring all commits to `sacredtherapyau@gmail.com`.
3. **Build-time client init** — the module-scope Supabase client (above). Fixed with the lazy factory.
   Verified locally by running `npm run build` with the secret env vars stripped from `.env.local`.
4. **Runtime env vars missing** — the two keys set as "secret" never reached functions. Re-added non-secret,
   functions-scoped, then redeployed.

### Remaining before public launch
- **Verify a sending domain in Resend** — the gift email sends from `onboarding@resend.dev`; until a domain is
  verified, Resend delivers **only to `sacredtherapyau@gmail.com` / `niveshkantha@gmail.com`**. Real visitors
  get no email until this is done. (Then update the `from:` address in `route.ts` to the verified domain.)
- **Decide on repo visibility** (public exposes internal docs — see above).
- Consider moving the 248 MB of `public/` audio/video out of Git (Git LFS or Supabase Storage/CDN) — it makes
  every CI checkout pull 248 MB and slows builds.

### Verified working end-to-end (infra)
Push→build→publish confirmed; `GET /api/begin`→405, `POST {}`→400 (validation reached, all env resolved).
A full submission test (real `subscribers` row + gift email) was the last optional step.

## ✅ Completed Tasks (Session 2026-07-03, continued)

**Client-facing project update PDF**
- Generated `H:\Sacred Therapy\Sacred Therapy AU - Website Update (3 July 2026).pdf` (5-page,
  brand-styled, non-technical) covering what was built, why each major decision was made, deployment
  setup, and remaining launch steps. Deliberately saved **outside** the git repo since the repo is public.
- Built with `reportlab` (installed via `py -3 -m pip install reportlab`). Source script kept in
  scratchpad — not committed. Regenerate by re-running the script if the state changes.

**Resend sending domain verified — real visitors now receive gift emails (major)**
- Added `sacredtherapy.co` in Resend; DKIM (TXT `resend._domainkey`), SPF (TXT `send`), and MX (`send`)
  all show **Verified** as of 2026-07-03 ~1:56 PM. No DMARC yet — optional, deferred.
- Swapped `from:` in `src/app/api/begin/route.ts` from `onboarding@resend.dev` → verified sender (see below).
- Commit `6e92656`.

**Gift email tone rewrite — Gmail Promotions-tab mitigation**
- First real send from `hello@sacredtherapy.co` delivered fine but landed in Gmail's **Promotions** tab.
  Root cause: brand-new sending domain (no sender reputation) + marketing-shaped HTML (all-caps
  brand kicker, styled H1, styled CTA link).
- Rewrote the email body to read as a personal note: dropped the "SACRED THERAPY AU" all-caps kicker,
  dropped the H1, replaced the "Listen in the Sound Sanctuary →" button with a plain URL, signed off
  "— Neshi", tightened the styling.
- **Added a plain-text alternative** to the Resend payload alongside the HTML. Gmail heavily weights
  presence of a real `text:` version — HTML-only sends look like bulk mail.
- Commit `0173480`.

**Sender identity switched to a personal name**
- `from:` now `Neshi J <neshi@sacredtherapy.co>` (was `Sacred Therapy AU <hello@sacredtherapy.co>`).
- Rationale: personal name + non-role address is another Promotions-tab lever. Any address at the
  verified domain works — no re-verification needed.
- Commit `f33e07f`.

### Deliverability follow-ups (only if Promotions tab persists)
- **Domain reputation warms up over the first ~20–30 sends** — even ideal content lands in Promotions
  initially. Manually dragging a test send from Promotions → Primary trains Gmail's classifier for
  that inbox and contributes to the domain's reputation signals.
- If it's still Promotions-defaulting after that many sends: consider adding a DMARC TXT record
  (`_dmarc.sacredtherapy.co` → `v=DMARC1; p=none; rua=mailto:...`) and reducing the HTML link count
  further (currently just one). Do NOT re-add List-Unsubscribe headers — those are bulk-sender signals
  and push toward Promotions, not away.

### Remaining before public launch (updated)
- ~~**Verify a sending domain in Resend**~~ — done 2026-07-03.
- **Decide on repo visibility** (public exposes internal docs).
- Consider moving the ~340 MB of `public/` audio out of Git (Git LFS or Supabase Storage/CDN) — see
  the compression note below; the two are the same cleanup.
- Delete the redundant Netlify site `sacred-therapy-au` (siteId `4c1a429b-9947-4a03-99dd-fdbc437bc6b8`)
  — still holds copies of the secret env vars.

## ✅ Completed Task (Session 2026-07-13)
**Added 3 guided sessions to the Sound Sanctuary (9 → 12 tracks)**
1. Files arrived in `public/audio/` already saved under the target kebab-case slugs (no rename needed):
   `awakening-the-glow-mindset-balance.mp3`, `floating-into-stillness-river-meditation.mp3`,
   `floating-free-positive-transformation.mp3`.
2. Extended the existing `tracks` array in `src/app/sound-sanctuary/page.tsx` (same data source, same
   TrackCard/player wiring — no new components, no second array). New entries:
   - Awakening the Glow: Mindset Balance — "I want confidence" — 15 min
   - Floating into Stillness: River Meditation — "I feel emotionally overwhelmed" — 15 min
   - Floating Free: Sinking Deep into Positive Transformation — "I feel stuck" — 17 min
3. Durations set from real audio metadata (899/901/1042s → 15/15/17 min). ffmpeg/ffprobe not installed
   in this env; read durations via Python `mutagen` (`py -3 -m pip install mutagen`).
4. Preview/email gate left OFF (`GATE_ENABLED = false`) — raw playback, consistent with the other tracks.
5. Verified on dev server (:3456): all 12 cards render with correct title/feeling/duration; all 3 new
   files load metadata cleanly; "Floating Free" played (currentTime advanced); no console errors.
   (Browser-pane screenshot tool hung on a renderer issue unrelated to the change — verified via DOM/JS.)
6. Commit `337a7a2`, pushed to `main`.

**⚠️ Deferred: audio compression (founder said leave as-is for now, 2026-07-13)**
- The 3 new files are large: 35 MB / 35 MB / 40 MB — each exceeds the 15 MB flag threshold. Total
  `public/audio/` is now ~340 MB across 12 files (several existing ones are also 30–35 MB).
- Recommended pass when revisited: ffmpeg re-encode guided-voice audio to ~96–128 kbps CBR (mono is
  fine for spoken word) — roughly 60–70% smaller with no meaningful quality loss (e.g. 40 MB → ~12–14 MB).
- This is the same cleanup as "move audio out of Git" above — do them together. No visitor-facing impact;
  purely load-time/bandwidth + CI checkout size. ffmpeg is NOT installed locally — install before running.
