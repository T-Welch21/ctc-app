import type { Program } from './programs'

export const runningProgram: Program = {
  id: 'running',
  name: 'Running — Half Marathon',
  weeks: 6,
  frequency: '3x / week',
  description: '6-week half marathon build. Intervals, tempo, and long runs — every session under 60 minutes.',
  category: 'running',
  image: '/programs/running.jpg',
  days: [
    // ──────────────────────────────────────────────
    // WEEK 1 — BASE
    // ──────────────────────────────────────────────
    {
      day: 'Day 1',
      title: 'W1 · Intervals',
      warmup: '10 min: easy jog, high knees, butt kicks, 3 × 100m strides building to 80%',
      duration: '45 min',
      exercises: [
        { name: '800m at Race Pace', sets: 4, reps: '800m', rest: '2:00 jog', cues: 'Target your half marathon pace — roughly 5:30-6:00/km. Jog the recovery, don\'t walk. Even splits on every rep.' },
        { name: '400m Fast Finish', sets: 4, reps: '400m', rest: '1:00 walk', cues: 'Faster than race pace — about 5K effort. Drive the arms, stay tall. These build your finishing kick.' },
      ],
      cooldown: '5 min easy jog, then stretch calves, hip flexors, hamstrings, quads (30 sec each side).',
    },
    {
      day: 'Day 2',
      title: 'W1 · Tempo',
      warmup: '10 min: easy jog, leg swings, 3 × 100m strides at tempo effort',
      duration: '45 min',
      exercises: [
        { name: 'Tempo Run', sets: 1, reps: '18 min', rest: '-', cues: 'Comfortably hard — short phrases, not sentences. This is your lactate threshold pace. Ease in over the first 2 min, then lock it in.' },
        { name: 'Fartlek', sets: 3, reps: '1 min hard / 1 min easy', rest: '-', cues: 'Hard portions at half marathon effort or faster. Easy portions are a jog, not a walk. 6 minutes total.' },
      ],
      cooldown: '5 min walk. Foam roll calves, quads, IT band. Stretch (30 sec each side).',
    },
    {
      day: 'Day 3',
      title: 'W1 · Long Run',
      warmup: 'Walk 2 min, then easy jog. Let the first few minutes be your warmup.',
      duration: '50 min',
      exercises: [
        { name: 'Long Run — 40 min Easy', sets: 1, reps: '40 min', rest: '-', cues: 'Conversational pace the entire time — you should be able to hold a full conversation. Don\'t chase pace or splits. The time on your feet does the work.' },
        { name: 'Pick-Up Finish', sets: 1, reps: '3 min', rest: '-', cues: 'Last 3 minutes, drop to half marathon effort. Finish with purpose — strong arms, quick feet.' },
      ],
      cooldown: '5 min walk. Stretch calves, hip flexors, hamstrings, quads, pigeon (30 sec each). Hydrate and refuel within 30 min.',
    },

    // ──────────────────────────────────────────────
    // WEEK 2 — BUILD
    // ──────────────────────────────────────────────
    {
      day: 'Day 4',
      title: 'W2 · Intervals',
      warmup: '10 min: easy jog, high knees, butt kicks, 3 × 100m strides building to 85%',
      duration: '50 min',
      exercises: [
        { name: '800m at Race Pace', sets: 5, reps: '800m', rest: '2:00 jog', cues: 'One more rep than last week. Goal is consistency — every rep within 5 seconds of each other. Tension bleeds speed — stay relaxed through your arms and jaw.' },
        { name: '400m Fast Finish', sets: 4, reps: '400m', rest: '1:00 walk', cues: '5K effort. Attack the first 200m and hold through the back half. Quick arm drive, tall posture.' },
      ],
      cooldown: '5 min easy jog, full stretch series (30 sec each side).',
    },
    {
      day: 'Day 5',
      title: 'W2 · Tempo',
      warmup: '10 min: easy jog, leg swings, hip circles, 3 × 100m strides',
      duration: '48 min',
      exercises: [
        { name: 'Tempo Run', sets: 1, reps: '20 min', rest: '-', cues: '2 minutes longer than last week. Same comfortably-hard threshold effort. The first 5 minutes might feel rough — push through to the rhythm.' },
        { name: 'Fartlek', sets: 4, reps: '1 min hard / 1 min easy', rest: '-', cues: 'Half marathon effort on the hard portions. Stay moving on the easy. 8 minutes total. Push through the 4th round.' },
      ],
      cooldown: '5 min walk. Foam roll calves, quads, IT band. Stretch (30 sec each).',
    },
    {
      day: 'Day 6',
      title: 'W2 · Long Run',
      warmup: 'Walk 2 min, then easy jog to start.',
      duration: '55 min',
      exercises: [
        { name: 'Long Run — 45 min Easy', sets: 1, reps: '45 min', rest: '-', cues: '5 minutes longer than last week. Same easy conversational pace. Take water at the halfway point if you need it. You\'re building your aerobic engine — the distance does the work, not the speed.' },
        { name: 'Pick-Up Finish', sets: 1, reps: '3 min', rest: '-', cues: 'Drop to half marathon effort for the final 3 min. Your legs are more tired than last week — that\'s the point.' },
      ],
      cooldown: '5 min walk. Full stretch. Refuel within 30 min — protein + carbs.',
    },

    // ──────────────────────────────────────────────
    // WEEK 3 — SHARPEN
    // ──────────────────────────────────────────────
    {
      day: 'Day 7',
      title: 'W3 · Intervals',
      warmup: '10 min: easy jog, A-skips, high knees, 3 × 100m strides building to 85%',
      duration: '50 min',
      exercises: [
        { name: '1K Repeat at Race Pace', sets: 4, reps: '1km', rest: '2:00 jog', cues: 'Longer intervals this week. Hold your half marathon target pace. The 3rd and 4th reps are where you grow — when your legs say slow down, your brain says hold.' },
        { name: '200m Build-Up Sprint', sets: 4, reps: '200m', rest: '1:30 walk back', cues: 'Start at jog pace, accelerate to 90% by the last 50m. Walk back to recover. Smooth acceleration, not jerky effort.' },
      ],
      cooldown: '5 min easy jog, full stretch (30 sec each side).',
    },
    {
      day: 'Day 8',
      title: 'W3 · Tempo',
      warmup: '10 min: easy jog, leg swings, hip circles, 3 × 100m strides',
      duration: '52 min',
      exercises: [
        { name: 'Tempo Run', sets: 1, reps: '22 min', rest: '-', cues: 'Your threshold is getting stronger. Settle in after the first 3 min and don\'t drift. If you can hold 22 min at threshold, your race pace will feel comfortable.' },
        { name: 'Fartlek', sets: 4, reps: '90 sec hard / 90 sec easy', rest: '-', cues: '4 rounds, 12 min total. The hard surges at half marathon pace or slightly faster. Push especially hard on round 4.' },
      ],
      cooldown: '5 min walk. Foam roll everything. Stretch (30 sec each). Hydrate well tonight.',
    },
    {
      day: 'Day 9',
      title: 'W3 · Long Run',
      warmup: 'Walk 2 min, easy jog to start.',
      duration: '58 min',
      exercises: [
        { name: 'Long Run — 48 min Easy', sets: 1, reps: '48 min', rest: '-', cues: 'Conversational pace throughout. You might hit a rough patch around the 25-30 min mark — push through it mentally and your body will settle back in. Take water at the midpoint.' },
        { name: 'Pick-Up Finish', sets: 1, reps: '4 min', rest: '-', cues: 'Drop to half marathon effort. Finish with purpose — strong arm drive, quick feet, controlled breathing.' },
      ],
      cooldown: '5 min walk. Full stretch. This was your longest run yet — take the cooldown seriously. Refuel within 30 min.',
    },

    // ──────────────────────────────────────────────
    // WEEK 4 — PEAK INTENSITY
    // ──────────────────────────────────────────────
    {
      day: 'Day 10',
      title: 'W4 · Intervals',
      warmup: '10 min: easy jog, A-skips, B-skips, 3 × 100m strides building to 90%',
      duration: '55 min',
      exercises: [
        { name: '1K Repeat at Race Pace', sets: 5, reps: '1km', rest: '1:45 jog', cues: 'Peak interval volume. Shorter recovery — 1:45 instead of 2:00. This simulates late-race fatigue. Hold your target pace. If rep 5 matches rep 1, you\'re race-ready.' },
        { name: '400m Fast Finish', sets: 3, reps: '400m', rest: '1:00 walk', cues: '5K effort. Your finishing kick is sharper than Week 1. Quick feet, strong posture, drive through the line.' },
      ],
      cooldown: '5 min easy jog, full stretch (30 sec each side). Big session — stretch thoroughly.',
    },
    {
      day: 'Day 11',
      title: 'W4 · Tempo',
      warmup: '10 min: easy jog, leg swings, hip circles, 3 × 100m strides',
      duration: '55 min',
      exercises: [
        { name: 'Tempo Run', sets: 1, reps: '25 min', rest: '-', cues: 'Peak tempo effort. The first 10 min might feel hard — push through. Min 10-20 is where you settle in. The last 5 min are a mental test. Don\'t let the pace slip.' },
        { name: 'Fartlek', sets: 4, reps: '90 sec hard / 90 sec easy', rest: '-', cues: '4 rounds, 12 min total. Surges at 10K effort — harder than previous weeks. You\'re pushing the ceiling higher.' },
      ],
      cooldown: '5 min walk. Foam roll everything. Full stretch series. Sleep well tonight — your body is rebuilding.',
    },
    {
      day: 'Day 12',
      title: 'W4 · Long Run',
      warmup: 'Walk 2 min, then easy jog. Carry water or plan a route with a water stop.',
      duration: '60 min',
      exercises: [
        { name: 'Long Run — 50 min Easy', sets: 1, reps: '50 min', rest: '-', cues: 'Conversational pace. Take water every 15-20 min. You might feel great at the halfway mark — don\'t speed up. Save it for the finish. This builds confidence that you can cover the distance.' },
        { name: 'Pick-Up Finish', sets: 1, reps: '5 min', rest: '-', cues: 'Drop to half marathon pace. On tired legs, this is exactly what race day feels like at mile 12. Close strong.' },
      ],
      cooldown: '5 min walk. Full stretch. Refuel within 30 min — protein + carbs + electrolytes.',
    },

    // ──────────────────────────────────────────────
    // WEEK 5 — PEAK DISTANCE
    // ──────────────────────────────────────────────
    {
      day: 'Day 13',
      title: 'W5 · Intervals',
      warmup: '10 min: easy jog, A-skips, high knees, 3 × 100m strides building to 90%',
      duration: '55 min',
      exercises: [
        { name: '1K Repeat at Race Pace', sets: 5, reps: '1km', rest: '1:30 jog', cues: 'Same 5 reps, tightest recovery yet — 1:30. This is the hardest interval session of the program. Reps 4 and 5 are where champions are made. Hold pace.' },
        { name: '200m Build-Up Sprint', sets: 4, reps: '200m', rest: '1:30 walk back', cues: 'Build from jog to 95%. Your nervous system is primed — these should feel sharp. This is the last hard speed session before taper. Make it count.' },
      ],
      cooldown: '5 min easy jog, full stretch. Ice bath or cold shower if you have access.',
    },
    {
      day: 'Day 14',
      title: 'W5 · Tempo',
      warmup: '10 min: easy jog, leg swings, hip circles, 3 × 100m strides',
      duration: '58 min',
      exercises: [
        { name: 'Tempo Run', sets: 1, reps: '28 min', rest: '-', cues: 'Peak tempo. This is your crowning effort. The first 10 min might be hard, min 10-20 you\'ll find your groove, and the last 8 are pure mental steel. If you finish this, you have the engine for race day.' },
        { name: 'Fartlek', sets: 3, reps: '90 sec hard / 90 sec easy', rest: '-', cues: '3 rounds, 9 min total. After a 28-min tempo, these simulate the hardest miles of a half marathon. 10K effort on the surges.' },
      ],
      cooldown: '5 min walk. Foam roll everything. Full stretch. Extra time on anything tight. The taper is coming.',
    },
    {
      day: 'Day 15',
      title: 'W5 · Long Run',
      warmup: 'Walk 2 min, then easy jog. Carry water.',
      duration: '60 min',
      exercises: [
        { name: 'Long Run — 50 min Easy', sets: 1, reps: '50 min', rest: '-', cues: 'Peak long run. Conversational pace. Take water every 15 min. Practice your race-day fueling — eat a gel at the 30-min mark if you plan to use them on race day. Whatever you do in training, you do in the race.' },
        { name: 'Race Pace Finish', sets: 1, reps: '5 min', rest: '-', cues: 'Drop to half marathon pace for the final 5 min. Finish like you\'re racing for the line. If you can do this on tired legs, race day has nothing on you.' },
      ],
      cooldown: '5 min walk. Full stretch (45 sec each). Refuel immediately. Rest and sleep are critical — next week is taper.',
    },

    // ──────────────────────────────────────────────
    // WEEK 6 — TAPER + RACE PREP
    // ──────────────────────────────────────────────
    {
      day: 'Day 16',
      title: 'W6 · Intervals',
      warmup: '10 min: easy jog, high knees, butt kicks, 3 × 100m strides at 80%. Keep it relaxed — this week is about sharpness, not volume.',
      duration: '40 min',
      exercises: [
        { name: '800m at Race Pace', sets: 3, reps: '800m', rest: '2:30 jog', cues: 'Only 3 reps with full recovery. These should feel SHARP. Your legs are fresh from the taper — the pace should feel easier than any week before. Lock in your target pace.' },
        { name: '400m Fast Finish', sets: 2, reps: '400m', rest: '1:30 walk', cues: 'Just 2 reps — keep the legs sharp without digging a hole. 5K effort, clean form. Last hard reps before race day.' },
      ],
      cooldown: '5 min easy jog, gentle stretch. Save the legs — race day is coming.',
    },
    {
      day: 'Day 17',
      title: 'W6 · Tempo',
      warmup: '10 min: easy jog, leg swings, 3 × 100m strides — relaxed, not racing them',
      duration: '38 min',
      exercises: [
        { name: 'Tempo Run', sets: 1, reps: '15 min', rest: '-', cues: 'Half the volume of last week. Should feel almost easy — that\'s the taper working. Run at threshold and notice how much stronger you feel. Save it for race day.' },
        { name: 'Fartlek', sets: 2, reps: '1 min hard / 1 min easy', rest: '-', cues: 'Just 2 rounds at half marathon pace. Remind your legs what race pace feels like, not tax them.' },
      ],
      cooldown: '5 min walk. Gentle stretch (20-30 sec each). Focus on 8+ hours of sleep this week.',
    },
    {
      day: 'Day 18',
      title: 'W6 · Pre-Race Shakeout',
      warmup: 'Walk 2 min, then easy jog.',
      duration: '35 min',
      exercises: [
        { name: 'Easy Run', sets: 1, reps: '20 min', rest: '-', cues: 'Run at a pace that feels almost too easy. Your legs should feel springy and fresh. This is NOT the time to test fitness. The work is done. Just keep the blood flowing and the muscles loose.' },
        { name: 'Race Pace Strides', sets: 4, reps: '100m', rest: '1:00 walk back', cues: '4 × 100m at race pace. Short, sharp, relaxed. Remind your neuromuscular system what race pace feels like. Smooth, confident, fast.' },
      ],
      cooldown: 'Walk 5 min. Stretch everything (30 sec each). Lay out race gear, pin your bib, charge your watch, set two alarms. You\'ve done the work — go compete.',
    },
  ],
}
