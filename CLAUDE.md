# Called to Compete — Mobile App

## Who We Are

**Called to Compete** is a sports performance training business run by Coach Tyler Welch in San Antonio, TX. This app is the digital training platform for CTC athletes.

**Tyler** is the business owner and coach — not a developer. Claude handles all technical work. **Gary** is Tyler's developer friend who also works on the CTC projects.

**Working style:** Maximum autonomy. Do every possible task without asking. Only stop when genuinely blocked (Tyler's credentials, Tyler's decision, hard safety rules). Explain things in plain numbered steps when Tyler needs to do something on his end.

---

## Brand Voice

**Tone:** Intense, motivational, direct. Coach-to-athlete.
**Mission:** Inspire and equip driven individuals to live with discipline, purpose, and leadership.
**Key phrases:** "Called to Compete", "Compete Harder · Train Smarter · Feel Better"
**Core Pillars:** Discipline · Purpose · Leadership · Excellence

---

## Tech Stack

| Layer | Detail |
|---|---|
| Framework | React + Vite + TypeScript |
| Styling | Tailwind CSS v4 with `@tailwindcss/vite` plugin |
| Auth & DB | Supabase |
| Supabase URL | `https://bnicospimxvxpsnhrijc.supabase.co` |
| Credentials | `.env` file (gitignored) |
| PWA | Service worker + manifest.json |
| Fonts | Space Grotesk (display) + Inter (body) via Google Fonts |
| Node.js | `/opt/homebrew/bin/node` — run `eval "$(/opt/homebrew/bin/brew shellenv)"` before npm/npx commands |
| Dev server | `npx vite --host --port 5173` |
| Test user | test@ctctest.com / testpass123 |

**Supabase notes:**
- Email confirmation is OFF (signup goes directly to onboarding)
- `profiles` table exists and works
- Other tables (journal_entries, weight_entries, completed_sessions, check_ins, personal_records) need to be created — SQL is in `supabase/setup.sql`
- GitHub CLI (`gh`) is installed but NOT authenticated — Tyler needs to run `gh auth login`

---

## Design System

- Background: #0A0A0A
- Card: #141414
- Elevated: #1E1E1E
- Lime (accent): #B3FF1D
- Text: #F5F5F0
- Text secondary: #A0A0A0
- Text muted: #666666
- Border: #2A2A2A
- Warning: #FFB800
- Indigo: #818cf8
- Danger: #FF4444
- Success: #00D26A

---

## Project Structure

```
src/
  pages/
    Login.tsx          # Auth with signup/login/password reset
    Onboarding.tsx     # Identity + goal selection (2 steps)
    Dashboard.tsx      # Home — streak, next session, devotional, quick actions
    Training.tsx       # Program overview, day list, session history
    TrainingDay.tsx    # Exercise list, set tracker, rest timer, weight/notes
    Journal.tsx        # Morning/evening journal with sliders, checklist, history
    Progress.tsx       # Stats, weight chart, check-in history, PRs
    CheckIn.tsx        # Weekly check-in form
    Nutrition.tsx      # Food tracking, smart search, macro calculator, barcode scan
    Community.tsx      # Real-time post feed with win highlighting
    Shop.tsx           # 1st Phorm supplements + CTC merch
    Subscribe.tsx      # Stripe subscription checkout
    Messages.tsx       # Coach messages / broadcasts
    Command.tsx        # Coach view — live roster, stats, quick actions
    Settings.tsx       # Profile, identity, nutrition, logout
  components/
    BottomNav.tsx      # 6-tab nav: Home, Training, Nutrition, Shop, Journal, Command
  lib/
    auth.tsx           # Supabase auth context + profile sync
    supabase.ts        # Supabase client init
    storage.ts         # All data types + localStorage read/write + Supabase sync calls
    sync.ts            # Supabase sync functions (graceful failure when tables missing)
    subscription.ts    # Stripe subscription helpers
    programs.ts        # 6 training programs (Athletic, Executive, Functional, Hybrid, Strength, Running)
    athlete-program.ts # Athletic program definition (separate file for size)
    video-map.ts       # Exercise name → Google Drive video URL mapping (107 exercises)
public/
  sw.js               # Service worker (network-first with cache fallback)
  manifest.json       # PWA manifest
  icon-192.png        # App icon
  icon-512.png        # App icon
  favicon.svg         # Favicon
supabase/
  setup.sql           # All table creation SQL with RLS policies
```

---

## Programs

6 programs total. Two auto-assigned tracks based on identity selection during onboarding:
- **Athlete Program** (identity: athlete) — 5x/week, 24 sessions across 5 weeks. Progressive: lower body, upper body, core & arms, lower body II, upper body II each week.
- **Executive Performance Protocol** (all other identities) — 4x/week. Strength, conditioning + breathwork, focus & power, recovery & mobility.

Plus 4 switchable programs: Adult Performance Class, Hybrid Training, Strength, Running — Half Marathon.

---

## What's Built

- Auth flow (Supabase email/password + password reset)
- Onboarding (identity + goal, re-onboardable from Settings)
- Dashboard with streak, smart next-session suggestion, 21 rotating devotionals
- Full training day with set tracker, REST TIMER (auto on set complete), exercise weight/notes logging
- Session celebration overlay on workout completion
- Daily journal (morning/evening, energy/mind sliders, needle movers, gratitude, history)
- Progress page (stats, SVG weight trend chart, check-in history, performance markers)
- Weekly check-in form
- Command Center (live Supabase athlete roster, quick actions, content status)
- Settings (editable name, identity/goal display, sign out)
- PWA (service worker, manifest, icons)
- Dual storage layer (localStorage + Supabase sync)
- Branded login with tagline + ambient glow
- Community feed (real-time Supabase posts, win highlighting, filters)
- Nutrition tracking (smart food search, 40+ foods, macro calculator, barcode scanning, camera capture)
- Smart macro calculator (Mifflin-St Jeor, activity multipliers, goal-based splits)
- Shop page (1st Phorm supplements with prices/links, CTC merch coming soon)
- Water/hydration tracking on Dashboard (8 cups/day goal)
- Nutrition stats on Progress page (daily totals, 7-day average, mini bar chart)
- Daily challenges with acceptance tracking
- Subscription page with Stripe integration (Subscribe.tsx)
- Broadcast messages from Command Center
- Branded loading screen
- Exercise demo videos (107 Google Drive videos mapped to exercises via video-map.ts)
- Exercise notes sync to Supabase (weight/notes per exercise per session)

---

## Tyler's Pending To-Dos

1. **Run SQL in Supabase SQL Editor** — paste contents of `supabase/setup.sql` to create remaining tables
2. **Run `gh auth login`** — authenticate GitHub CLI so we can create private repo and push

---

## Roadmap (Not Yet Built)

- Push notifications
- Welcome email sequence
- AI food recognition from photos (needs API key)
- Stripe webhook completion (Tyler needs to add signing secret)
- App deployment to Vercel/Netlify with custom domain

---

## Related Project

The Flask website (calledtocompete.net) is a separate project at `/Users/tylerwelch/Projects/ctc-website`. It has its own CLAUDE.md. The two projects are independent — this app does NOT depend on the website.
