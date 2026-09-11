# CTC App — Complete Build Log

Everything built, changed, and shipped from start to finish.

---

## 1. Core App Foundation

### Tech Stack
- **Framework:** React + Vite + TypeScript
- **Styling:** Tailwind CSS v4 with `@tailwindcss/vite` plugin
- **Auth & Database:** Supabase (email/password auth, profiles table, RLS policies)
- **PWA:** Service worker + manifest.json for install-to-home-screen
- **Fonts:** Space Grotesk (display) + Inter (body) via Google Fonts
- **Deployment:** Vercel auto-deploy on push to main → **calledtocompete.app**

### Design System
| Token | Hex |
|---|---|
| Background | #0A0A0A |
| Card | #141414 |
| Elevated | #1E1E1E |
| Lime (accent) | #B3FF1D |
| Text | #F5F5F0 |
| Text secondary | #A0A0A0 |
| Text muted | #666666 |
| Border | #2A2A2A |
| Warning | #FFB800 |
| Indigo | #818cf8 |
| Danger | #FF4444 |
| Success | #00D26A |

---

## 2. Authentication & Onboarding

### Login Page (`src/pages/Login.tsx`)
- Branded login screen with CTC logo, ambient lime glow, and tagline
- Email/password sign in and sign up
- Password visibility toggle
- "Forgot password?" flow — sends Supabase reset email, redirects to in-app password reset
- Invite code input on signup (see Section 8)
- Error handling for: wrong credentials, already registered, rate limiting, network issues, email not confirmed

### Onboarding (`src/pages/Onboarding.tsx`)
- 2-step flow after first signup
- **Step 1 — Identity:** Athlete, Entrepreneur, Executive, Creator, Competitor
- **Step 2 — Mission:** Build strength & power, Improve conditioning, Sharpen mental discipline, Level up overall performance, Recover & stay healthy
- Identity determines which training program auto-assigns
- Re-onboarding available from Settings page

### Auth System (`src/lib/auth.tsx`)
- Supabase auth context wrapping the entire app
- Dual storage: localStorage (instant) + Supabase profiles table (persistent)
- Profile sync on every login — remote takes priority, local is fallback
- Password recovery event detection
- Session persistence across page reloads

---

## 3. Dashboard (`src/pages/Dashboard.tsx`)

- **Header:** "Good morning/afternoon/evening, {name}" with streak counter
- **Daily Progress Ring:** Visual percentage of today's completed tasks
- **Daily Devotional:** 21 rotating motivational quotes with scripture references
- **Next Session Card:** Smart suggestion based on completed sessions — shows the next unfinished training day
- **Needle Movers:** Daily actionable challenge items
- **Quick Actions:** Links to Journal, Check-In, Progress
- **Water Tracking:** 8 cups/day goal with tap-to-fill hydration tracker
- **Daily Challenge:** Rotating challenges with acceptance tracking

---

## 4. Training System

### Training Overview (`src/pages/Training.tsx`)
- Program selector with "Switch" button to browse all programs
- Week navigation (1-6 or 1-8 depending on program)
- Day cards showing title, exercise count, duration, completion status
- Session history with dates and completion markers
- Category color coding per program type
- Program images with graceful loading/error handling

### Training Day View (`src/pages/TrainingDay.tsx`)
- Full exercise list with sets, reps, rest times, and coaching cues
- **Set Tracker:** Tap to mark each set complete
- **Rest Timer:** Auto-starts when a set is completed, counts down the prescribed rest period
- **Exercise Notes:** Weight and notes logging per exercise per session (syncs to Supabase)
- **Exercise Demo Videos:** 107 exercises mapped to Google Drive video URLs (`src/lib/video-map.ts`)
- **Celebration Overlay:** Animated congratulations screen when all exercises in a session are completed
- Warmup and cooldown sections displayed at top and bottom

### Program Rendering Logic
```
const repeating = days.length <= daysPerWeek && totalWeeks > 1
```
- If `repeating=true`: same template days repeat each week (e.g., Foundations has 3 days that repeat for 8 weeks)
- If `repeating=false`: unique days per week, sliced from the days array by `selectedWeek * daysPerWeek`

---

## 5. Training Programs (Final 5)

All programs restructured from the original 6 down to 5. Executive and Hybrid programs removed. All programs have beginner-friendly cues that explain every movement step by step for people who have never trained before.

### CTC Athlete (`src/lib/athlete-program.ts`)
- **Category:** Athletic
- **Frequency:** 5x / week
- **Duration:** 6 weeks (30 unique days)
- **Focus:** Progressive athletic training — lower body, upper body, core & arms, with increasing intensity
- **Week 6:** Peak week with heavy singles on squat, bench, deadlift, OHP
- Auto-assigned to users who select "Athlete" identity during onboarding

### CTC Strength (`src/lib/strength-program.ts`)
- **Category:** Strength
- **Frequency:** 6x / week
- **Duration:** 6 weeks (36 unique days)
- **Focus:** Push/Pull/Legs split — build serious strength and size
- Progressive overload across all 6 weeks

### CTC Foundations (inline in `src/lib/programs.ts`)
- **Category:** Functional
- **Frequency:** 3x / week
- **Duration:** 8 weeks (3 days repeating)
- **Focus:** Strength, volume, and power — the starting point for new competitors
- **Day 1:** Strength (squat, deadlift, bench, rows, pull-ups)
- **Day 2:** Volume & Bodybuilding (incline press, rows, Arnold press, accessories)
- **Day 3:** Power & Speed (power cleans, box jumps, sled pushes, finisher)
- Auto-assigned to all non-athlete identities during onboarding

### CTC Endurance (`src/lib/running-program.ts`)
- **Category:** Running
- **Frequency:** 3x / week
- **Duration:** 6 weeks (18 unique days)
- **Focus:** Half marathon build — intervals, tempo, and long runs
- All sessions completable under 60 minutes
- Long runs are time-based (40→45→48→50→50→20 min) instead of mile-based
- Full beginner-friendly cues explaining every drill, stretch, and running concept

### CTC Speed (`src/lib/sprint-program.ts`)
- **Category:** Conditioning
- **Frequency:** 3x / week
- **Duration:** 6 weeks (18 unique days)
- **Focus:** Sprint training from 40-yard dash to 400m
- **Day types:** Acceleration, Speed Endurance, Power & Agility
- Progressive: Week 1-2 mechanics & base speed → Week 3-4 peak speed → Week 5 peak performance → Week 6 taper & test
- Covers: 10-yard starts, 40-yard dash, 100m, 200m, 300m, 400m, fly sprints, agility drills (pro agility, L-drill, T-drill), plyometrics (box jumps, bounds, depth jumps)
- Full beginner-friendly cues for every drill

### Removed Programs
- **Executive Performance Protocol** (`src/lib/executive-program.ts`) — deleted, overlapped with Foundations
- **Hybrid Training** (`src/lib/hybrid-program.ts`) — deleted, consolidated into other programs

---

## 6. Journal (`src/pages/Journal.tsx`)

- **Morning Journal:** Energy slider (1-10), mind slider (1-10), needle movers checklist, gratitude entry
- **Evening Journal:** Reflection on the day, wins, lessons learned
- Journal history with past entries viewable
- Data persisted to localStorage + Supabase sync

---

## 7. Progress & Check-Ins

### Progress Page (`src/pages/Progress.tsx`)
- **Stats Dashboard:** Total workouts, current streak, longest streak
- **Weight Trend Chart:** SVG line chart with data points over time
- **Check-In History:** Past weekly check-ins displayed chronologically
- **Performance Markers:** Track personal records
- **Nutrition Stats:** Daily macro totals, 7-day average, mini bar chart

### Weekly Check-In (`src/pages/CheckIn.tsx`)
- Structured weekly reflection form
- Tracks progress, blockers, and goals for next week

### Personal Records
- Track PRs for major lifts
- Displayed on Progress page

---

## 8. Invite Code System

Built so Tyler can give free app access to in-person premium clients (first used for Marie).

### How It Works
1. Tyler goes to Command Center → Invite Codes section
2. Enters a label (e.g., "Marie"), selects max uses (1, 5, or Unlimited), clicks Generate
3. System creates a code in format `CTC-XXXXXX` (uppercase letters/digits)
4. Tyler gives the code to the client
5. Client signs up on the app, enters the invite code during signup
6. Code is validated → account is created → `subscription_status` is set to `'active'` (bypasses Stripe)

### Technical Details (`src/lib/invite-codes.ts`)
- **Functions:** createInviteCode, listInviteCodes, validateInviteCode, redeemInviteCode, deactivateInviteCode
- **Dual storage:** Supabase `invite_codes` table + localStorage fallback
- **Database:** `supabase/setup.sql` includes invite_codes table, RLS policies, and redeem_invite_code RPC
- **UI:** Command Center has create form, code list with status badges (Active/Used/Off), copy button, deactivate button
- **Login page:** "Have an invite code?" toggle reveals input field with lime accent border

### First Code Generated
- **Marie's code:** `CTC-V4B05P` — generated through the Command Center UI

---

## 9. Nutrition (`src/pages/Nutrition.tsx`)

- **Food Tracking:** Log meals with smart food search (40+ built-in foods)
- **Macro Calculator:** Mifflin-St Jeor equation with activity multipliers and goal-based macro splits
- **Barcode Scanning:** Camera-based barcode scanner for packaged foods
- **Camera Capture:** Take photos of food for logging
- **Daily Totals:** Calories, protein, carbs, fat tracking
- Stats integrated into Progress page

---

## 10. Other Pages

### Community (`src/pages/Community.tsx`)
- Real-time post feed powered by Supabase
- Win highlighting for celebrations
- Post filters

### Shop (`src/pages/Shop.tsx`)
- 1st Phorm supplement listings with prices and affiliate links
- CTC merch section (coming soon placeholder)

### Messages (`src/pages/Messages.tsx`)
- Coach messages and broadcast system
- Tyler can send broadcasts from Command Center

### Subscribe (`src/pages/Subscribe.tsx`)
- Stripe subscription checkout page
- Subscription status check via `isSubscribed()` in `src/lib/subscription.ts`
- Coach emails bypass subscription check: `tyler21welch@gmail.com`, `test@ctctest.com`

### Settings (`src/pages/Settings.tsx`)
- Editable name
- Identity and goal display
- Password change
- Subscription status
- Sign out
- Re-onboarding link

---

## 11. Command Center (`src/pages/Command.tsx`)

Tyler's coach dashboard — not visible to regular users.

- **Live Athlete Roster:** Real-time list of all signed-up users from Supabase
- **Quick Actions:** Links to key admin functions
- **Content Status:** Overview of what's built and what's pending
- **Invite Codes Section:** Create, view, copy, and deactivate invite codes
- **Broadcast Messages:** Send messages to all athletes

---

## 12. Infrastructure

### PWA (Progressive Web App)
- `public/sw.js` — Service worker with network-first strategy and cache fallback
- `public/manifest.json` — PWA manifest for install-to-home-screen
- App icons: `icon-192.png`, `icon-512.png`, `favicon.svg`

### Navigation (`src/components/BottomNav.tsx`)
- 6-tab bottom nav: Home, Training, Nutrition, Shop, Journal, Command
- Command tab only visible to coach emails

### Data Layer
- `src/lib/storage.ts` — All data types + localStorage read/write + Supabase sync calls
- `src/lib/sync.ts` — Supabase sync functions with graceful failure when tables are missing
- `src/lib/supabase.ts` — Supabase client initialization

### Database (`supabase/setup.sql`)
All 10 tables with RLS policies:
1. profiles
2. journal_entries
3. weight_entries
4. completed_sessions
5. check_ins
6. personal_records
7. community_posts
8. coach_messages
9. invite_codes
10. exercise_notes

### Deployment
- **GitHub:** `github.com/T-Welch21/ctc-app` (private repo)
- **Hosting:** Vercel with auto-deploy on push to main
- **Domain:** calledtocompete.app
- **Config:** `vercel.json` for SPA routing

---

## 13. Branded Loading Screen

- Full-screen loading animation with CTC logo
- Shown during initial app load and auth session check
- Smooth fade transition into the app

---

## 14. Exercise Demo Videos (`src/lib/video-map.ts`)

- 107 exercises mapped to Google Drive video URLs
- Videos play inline on the Training Day page
- Covers all major exercises across all programs

---

## 15. Commit History (Key Milestones)

| Commit | Description |
|---|---|
| `9b4d2d6` | Extend all training programs to 6+ weeks with progressive overload |
| `4a1e60c` | Add invite code system for free app access |
| `547bab0` | Rewrite running program to fit under 60 min per session |
| `587888a` | Beginner-friendly running cues + rename to CTC Foundations |
| `11ed5e0` | Move Athlete program to top of program list |
| `863c39a` | Restructure to 5 programs: Athlete, Strength, Foundations, Endurance, Speed |
| `9500996` | Redesign Dashboard: needle movers, section reorder, clean header |
| `cc9a425` | Fix critical CSS cascade bug breaking all Tailwind spacing |
| `5a3e825` | Fix password reset flow for production auth |
| `446f32b` | Update URLs to calledtocompete.app domain |

---

## 16. What's Still In Progress

- **Beginner-friendly cues for Strength program** — rewrite running now, will be committed and pushed when done
- **Beginner-friendly cues for Athlete and Foundations** — completed, ready to commit

---

## 17. Roadmap (Not Yet Built)

- Push notifications
- Welcome email sequence
- AI food recognition from photos (needs API key)
- Stripe webhook completion (Tyler needs to add signing secret)
- Additional exercise demo videos
- Expanded food database for nutrition tracking
