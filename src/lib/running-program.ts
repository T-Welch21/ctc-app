import type { Program } from './programs'

export const runningProgram: Program = {
  id: 'running',
  name: 'Running — Half Marathon',
  weeks: 6,
  frequency: '3x / week',
  description: '6-week half marathon build. Intervals, tempo, and long runs that get you to the start line ready.',
  category: 'running',
  image: '/programs/running.jpg',
  days: [
    // ──────────────────────────────────────────────
    // WEEK 1 — BASE
    // ──────────────────────────────────────────────
    {
      day: 'Day 1',
      title: 'W1 · Intervals + Race Pace',
      warmup: '15 min: easy jog (1 mile), A-skips, B-skips, high knees, butt kicks, 4 × 100m strides building to 85%',
      duration: '55 min',
      exercises: [
        {
          name: '1K Repeat at Race Pace',
          sets: 4,
          reps: '1km',
          rest: '2:00 jog',
          cues: 'Run at your target half marathon split — roughly 5:30-6:00/km depending on your goal. Jog the recovery, don\'t walk. Keep your cadence quick and your shoulders relaxed. Focus on even splits — don\'t blast the first rep and fade.',
        },
        {
          name: '800m at HM Goal Pace',
          sets: 3,
          reps: '800m',
          rest: '1:30 jog',
          cues: 'Dial in your half marathon goal pace. This should feel fast but controlled — you could hold a few words, not a sentence. Stay relaxed through the shoulders and let your hips sit tall. Think smooth, not hard.',
        },
        {
          name: '400m Fast Finish',
          sets: 3,
          reps: '400m',
          rest: '1:00 walk',
          cues: 'Faster than race pace — about 5K effort. This builds your finishing kick. Drive the arms, stay tall, quick turnover. These should hurt a little. Run the curve hard and float the straight.',
        },
        {
          name: '200m Build-Up Sprint',
          sets: 4,
          reps: '200m',
          rest: '1:30 walk back',
          cues: 'Start at jog pace and accelerate through the full 200m — hit 90-95% by the last 50m. Walk back to start for recovery. Focus on smooth acceleration, not jerky effort. These teach your legs to change gears.',
        },
      ],
      cooldown: '10 min: easy jog (0.5 mile), calf stretch, hip flexor stretch, hamstring stretch, quad stretch (30 sec each side). Shake the legs out.',
    },
    {
      day: 'Day 2',
      title: 'W1 · Threshold + Tempo',
      warmup: '15 min: easy jog (1 mile), leg swings (front-back and side-to-side), hip circles, 4 × 100m strides at tempo effort',
      duration: '50 min',
      exercises: [
        {
          name: 'Tempo Run',
          sets: 1,
          reps: '20 min',
          rest: '-',
          cues: 'Comfortably hard — you can speak in short phrases but not sentences. This is your lactate threshold pace, roughly your 1-hour race effort. Don\'t start too fast — ease into the pace over the first 2 minutes and then lock in. Steady breathing, steady feet.',
        },
        {
          name: 'Fartlek — Surge and Recover',
          sets: 3,
          reps: '2 min hard / 2 min easy',
          rest: '-',
          cues: '3 rounds, 12 minutes total. The hard portions are half marathon effort or slightly faster. The easy portions are active recovery — keep moving at a jog, don\'t stop or walk. This simulates race-day surges and teaches you to recover on the move.',
        },
        {
          name: 'Easy Recovery Jog',
          sets: 1,
          reps: '10 min',
          rest: '-',
          cues: 'Slow it way down to conversational pace. Let your heart rate drop below 140 bpm. This is active recovery — flush the legs out and finish the session right. No watch-checking, no pace pressure.',
        },
      ],
      cooldown: '5 min walk, then foam roll calves, quads, and IT band. Pigeon stretch and standing hamstring stretch (30 sec each side).',
    },
    {
      day: 'Day 3',
      title: 'W1 · Long Run',
      warmup: 'No formal warmup — start with a 2-minute walk, then easy jog. Let the first mile be your warmup. Don\'t stretch cold muscles.',
      duration: '55-65 min',
      exercises: [
        {
          name: 'Long Run — 5 Miles Steady',
          sets: 1,
          reps: '5 miles',
          rest: '-',
          cues: 'Run at easy conversational pace — you should be able to hold a full conversation the entire time. This builds your aerobic engine. Don\'t chase pace, don\'t look at splits. If you can\'t talk, you\'re going too fast. Aim for roughly 1:00-1:30/km slower than your race pace.',
        },
        {
          name: 'Progression Finish — Last Mile',
          sets: 1,
          reps: '1 mile',
          rest: '-',
          cues: 'After your 5 miles, pick it up for 1 more mile. Drop to half marathon effort and close hard — simulate the end of a race. This trains your body to push when it\'s already tired. Finish strong, don\'t just survive.',
        },
        {
          name: 'Cooldown Walk + Stretch',
          sets: 1,
          reps: '10 min',
          rest: '-',
          cues: '5 min walk, then calves, hip flexors, hamstrings, quads (30 sec each side), pigeon stretch (45 sec each side). Hold every stretch — don\'t bounce. Start hydrating immediately.',
        },
      ],
      cooldown: '5 min walk. Refuel within 30 minutes — protein + carbs. Today was about time on your feet, not speed.',
    },

    // ──────────────────────────────────────────────
    // WEEK 2 — BUILD VOLUME
    // ──────────────────────────────────────────────
    {
      day: 'Day 4',
      title: 'W2 · Intervals + Race Pace',
      warmup: '15 min: easy jog (1 mile), A-skips, B-skips, high knees, butt kicks, 4 × 100m strides building to 85%',
      duration: '55 min',
      exercises: [
        {
          name: '1K Repeat at Race Pace',
          sets: 4,
          reps: '1km',
          rest: '2:00 jog',
          cues: 'Same race-pace target as Week 1. This week the goal is consistency — every rep within 5 seconds of each other. Jog the recovery. If your last rep is slower than your first, you started too fast. Even effort, even splits.',
        },
        {
          name: '800m at HM Goal Pace',
          sets: 4,
          reps: '800m',
          rest: '1:30 jog',
          cues: 'One more rep than last week — 4 total. Same controlled effort. You\'re building the ability to hold pace under accumulating fatigue. Stay relaxed through the arms and jaw. Tension bleeds speed.',
        },
        {
          name: '400m Fast Finish',
          sets: 3,
          reps: '400m',
          rest: '1:00 walk',
          cues: '5K effort or slightly faster. Attack the first 200m and hold on through the second half. Quick arm drive, high knees, tall posture. These are building race-day leg speed.',
        },
        {
          name: '200m Build-Up Sprint',
          sets: 4,
          reps: '200m',
          rest: '1:30 walk back',
          cues: 'Smooth acceleration from jog to 90-95% over 200m. Walk back to recover. Focus on mechanics — your form should look better at 90% than it does at 60%. Fast feet, not just fast legs.',
        },
      ],
      cooldown: '10 min: easy jog (0.5 mile), calf stretch, hip flexor stretch, hamstring stretch, quad stretch (30 sec each side).',
    },
    {
      day: 'Day 5',
      title: 'W2 · Threshold + Tempo',
      warmup: '15 min: easy jog (1 mile), leg swings, hip circles, 4 × 100m strides at tempo effort',
      duration: '55 min',
      exercises: [
        {
          name: 'Tempo Run',
          sets: 1,
          reps: '22 min',
          rest: '-',
          cues: '2 minutes longer than last week. Same comfortably-hard effort — lactate threshold pace. Your body is adapting. The first 5 minutes might feel rough; push through to the rhythm. Once you settle in, hold it there.',
        },
        {
          name: 'Fartlek — Surge and Recover',
          sets: 1,
          reps: '14 min (3.5 rounds)',
          rest: '-',
          cues: 'Alternate 2 min hard / 2 min easy. 3 full rounds plus one extra hard surge at the end. The extra half-round is where the growth happens — push when you\'d rather coast. Stay mentally locked in.',
        },
        {
          name: 'Easy Recovery Jog',
          sets: 1,
          reps: '10 min',
          rest: '-',
          cues: 'Conversational pace. Let the heart rate come down. This is the payoff for the hard work — let your body start recovering while you\'re still moving. Easy breathing, loose stride.',
        },
      ],
      cooldown: '5 min walk. Foam roll calves, quads, IT band. Pigeon stretch and hamstring stretch (30 sec each side). Hydrate.',
    },
    {
      day: 'Day 6',
      title: 'W2 · Long Run',
      warmup: 'Walk 2-3 minutes, then easy jog. Let the first mile be your warmup. No stretching cold.',
      duration: '60-70 min',
      exercises: [
        {
          name: 'Long Run — 6 Miles Steady',
          sets: 1,
          reps: '6 miles',
          rest: '-',
          cues: 'One more mile than last week. Same easy conversational pace. You\'re teaching your body to burn fat efficiently and building capillary density. Don\'t get greedy with pace — the distance does the work. Take water if you need it at the halfway point.',
        },
        {
          name: 'Progression Finish — Last Mile',
          sets: 1,
          reps: '1 mile',
          rest: '-',
          cues: 'After your 6 miles, drop the pace to half marathon effort for the final mile. Close strong. Your legs are more tired than last week — that\'s the point. This is where race fitness gets built.',
        },
        {
          name: 'Cooldown Walk + Stretch',
          sets: 1,
          reps: '10 min',
          rest: '-',
          cues: '5 min walk, then full lower body stretch: calves, hip flexors, hamstrings, quads (30 sec each), pigeon stretch (45 sec each side). Drink 16-20 oz water. Eat within 30 minutes.',
        },
      ],
      cooldown: '5 min walk. Refuel — protein + carbs. You earned this one.',
    },

    // ──────────────────────────────────────────────
    // WEEK 3 — SHARPEN
    // ──────────────────────────────────────────────
    {
      day: 'Day 7',
      title: 'W3 · Intervals + Race Pace',
      warmup: '15 min: easy jog (1 mile), A-skips, B-skips, high knees, butt kicks, 4 × 100m strides building to 90%',
      duration: '60 min',
      exercises: [
        {
          name: '1K Repeat at Race Pace',
          sets: 5,
          reps: '1km',
          rest: '2:00 jog',
          cues: 'Volume goes up — 5 reps this week. Same target pace. The 4th and 5th reps are where you grow. When your legs say slow down, your brain says hold pace. Jog recoveries, stay disciplined. If you nail all 5 even, you\'re ready for what\'s coming.',
        },
        {
          name: '800m at HM Goal Pace',
          sets: 4,
          reps: '800m',
          rest: '1:30 jog',
          cues: 'Same 4 reps as last week but they should feel more dialed in now. Your body is learning this pace. Trust the fitness. Smooth through the turns, strong on the straights.',
        },
        {
          name: '400m Fast Finish',
          sets: 3,
          reps: '400m',
          rest: '1:00 walk',
          cues: '5K effort. By Week 3, these should feel more controlled than Week 1 — same speed but lower heart rate. That\'s fitness. Attack the back straight and hold form through the finish.',
        },
        {
          name: '200m Build-Up Sprint',
          sets: 5,
          reps: '200m',
          rest: '1:30 walk back',
          cues: 'One more rep this week — 5 total. Build from jog to 90-95%. The extra rep at the end of the session is deliberate — it tests your ability to produce speed on tired legs. Stay smooth.',
        },
      ],
      cooldown: '10 min: easy jog (0.5 mile), full stretch series — calves, hip flexors, hamstrings, quads, glutes (30 sec each side).',
    },
    {
      day: 'Day 8',
      title: 'W3 · Threshold + Tempo',
      warmup: '15 min: easy jog (1 mile), leg swings, hip circles, 4 × 100m strides at tempo effort',
      duration: '55 min',
      exercises: [
        {
          name: 'Tempo Run',
          sets: 1,
          reps: '25 min',
          rest: '-',
          cues: '5 minutes longer than Week 1. You\'re pushing your lactate threshold higher — this is the pace that makes half marathons feel easier. Settle in after the first 3 minutes and don\'t drift. If you can hold 25 minutes at threshold, your race pace will feel comfortable by comparison.',
        },
        {
          name: 'Fartlek — Surge and Recover',
          sets: 4,
          reps: '2 min hard / 2 min easy',
          rest: '-',
          cues: '4 full rounds, 16 minutes total. The hard surges should be at or slightly faster than half marathon pace. The easy portions are jog recovery. Push through the 4th round — the last surge is where the adaptation happens.',
        },
        {
          name: 'Easy Recovery Jog',
          sets: 1,
          reps: '10 min',
          rest: '-',
          cues: 'Conversational pace. Let the body come down. This session had real volume — respect the recovery portion. Shake out the legs as you jog. Deep breathing.',
        },
      ],
      cooldown: '5 min walk. Foam roll calves, quads, IT band, glutes. Full stretch series (30 sec each). Hydrate well tonight — tomorrow is a rest day you\'ve earned.',
    },
    {
      day: 'Day 9',
      title: 'W3 · Long Run',
      warmup: 'Walk 2-3 minutes, easy jog to start. First mile is your warmup. No cold stretching.',
      duration: '65-75 min',
      exercises: [
        {
          name: 'Long Run — 7 Miles Steady',
          sets: 1,
          reps: '7 miles',
          rest: '-',
          cues: 'Seven miles. Conversational pace throughout. You might hit a rough patch around mile 4-5 — that\'s normal. Push through it mentally and your body will settle back in. Take water at the midpoint if available. Stay patient with the pace.',
        },
        {
          name: 'Progression Finish — Last Mile',
          sets: 1,
          reps: '1 mile',
          rest: '-',
          cues: 'Drop to half marathon effort for the final mile. By now you know what this feels like. Finish with purpose — strong arm drive, quick feet, controlled breathing. Imagine you\'re closing out a race.',
        },
        {
          name: 'Cooldown Walk + Stretch',
          sets: 1,
          reps: '10 min',
          rest: '-',
          cues: '5 min walk, full stretch: calves, hip flexors, hamstrings, quads, IT band (30 sec each), pigeon stretch (45 sec each side). This was your longest run yet — take the cooldown seriously.',
        },
      ],
      cooldown: '5 min walk. Refuel within 30 minutes — this is non-negotiable at this distance. Protein shake, banana, whatever works. Your body needs it.',
    },

    // ──────────────────────────────────────────────
    // WEEK 4 — PEAK INTENSITY
    // ──────────────────────────────────────────────
    {
      day: 'Day 10',
      title: 'W4 · Intervals + Race Pace',
      warmup: '15 min: easy jog (1 mile), A-skips, B-skips, high knees, butt kicks, 4 × 100m strides building to 90%. Take an extra minute if you need it — today is a big session.',
      duration: '60 min',
      exercises: [
        {
          name: '1K Repeat at Race Pace',
          sets: 5,
          reps: '1km',
          rest: '1:45 jog',
          cues: 'Same 5 reps but slightly shorter recovery — 1:45 instead of 2:00. This simulates late-race fatigue where you don\'t get full recovery between surges. Hold your target pace. If rep 5 matches rep 1, you\'re race-ready.',
        },
        {
          name: '800m at HM Goal Pace',
          sets: 5,
          reps: '800m',
          rest: '1:30 jog',
          cues: '5 reps this week — your highest volume at goal pace. This is the session that tells you if your goal time is realistic. If you can hit all 5 at target pace, you can hold it for 13.1 miles. Trust this workout on race day.',
        },
        {
          name: '400m Fast Finish',
          sets: 4,
          reps: '400m',
          rest: '1:00 walk',
          cues: 'One more rep than previous weeks. 5K effort. Your finishing kick is sharper than Week 1 — prove it. Quick feet, strong posture, drive through the line.',
        },
        {
          name: '200m Build-Up Sprint',
          sets: 4,
          reps: '200m',
          rest: '1:30 walk back',
          cues: 'Smooth build from jog to 90-95%. Your nervous system is primed from the intervals — these should feel sharp and fast. Focus on turnover, not brute force. Make the last 50m look effortless.',
        },
      ],
      cooldown: '10 min: easy jog (0.5 mile), full stretch series — calves, hip flexors, hamstrings, quads, glutes, IT band (30 sec each side). Big session — stretch thoroughly.',
    },
    {
      day: 'Day 11',
      title: 'W4 · Threshold + Tempo',
      warmup: '15 min: easy jog (1 mile), leg swings, hip circles, 4 × 100m strides at tempo effort',
      duration: '60 min',
      exercises: [
        {
          name: 'Tempo Run',
          sets: 1,
          reps: '28 min',
          rest: '-',
          cues: 'Nearly 30 minutes at threshold. This is the peak tempo effort of the program. The first 10 minutes might feel hard — push through. Minutes 10-20 are where you settle in. The last 8 minutes are a mental test. Don\'t let the pace slip. If you can hold 28 minutes at threshold, the race will bow to you.',
        },
        {
          name: 'Fartlek — Surge and Recover',
          sets: 4,
          reps: '2 min hard / 2 min easy',
          rest: '-',
          cues: '4 rounds, 16 minutes total. The hard surges should be at a harder effort than previous weeks — closer to 10K pace. You\'re pushing the ceiling higher. The easy portions are still jog recovery. Push especially hard on round 4.',
        },
        {
          name: 'Easy Recovery Jog',
          sets: 1,
          reps: '10 min',
          rest: '-',
          cues: 'Conversational pace. You just did the hardest tempo session of the program. Let the heart rate drop and the legs flush. Deep breaths. You\'re tougher than you were 3 weeks ago.',
        },
      ],
      cooldown: '5 min walk. Foam roll everything — calves, quads, hamstrings, IT band, glutes. Full stretch series. Sleep well tonight — your body is rebuilding.',
    },
    {
      day: 'Day 12',
      title: 'W4 · Long Run',
      warmup: 'Walk 2-3 minutes, then easy jog. First mile is your warmup. Carry water or plan a route with a water stop — this is a long one.',
      duration: '75-90 min',
      exercises: [
        {
          name: 'Long Run — 9 Miles Steady',
          sets: 1,
          reps: '9 miles',
          rest: '-',
          cues: 'Nine miles — your longest non-race run in the program. Conversational pace, no exceptions. Take water every 3 miles if you can. You might feel great at mile 5 — don\'t speed up. Save that energy for the progression. This run builds the confidence that you can cover the distance.',
        },
        {
          name: 'Progression Finish — Last Mile',
          sets: 1,
          reps: '1 mile',
          rest: '-',
          cues: 'Drop to half marathon pace for the final mile. After 9 easy miles, this will feel hard — that\'s exactly the point. You\'re training your body to produce speed on dead legs. Close strong. This is what race day feels like at mile 12.',
        },
        {
          name: 'Cooldown Walk + Stretch',
          sets: 1,
          reps: '12 min',
          rest: '-',
          cues: '5 min walk (don\'t sit down immediately), then thorough stretch: calves, hip flexors, hamstrings, quads, IT band, glutes, pigeon stretch (30-45 sec each). This was a big effort — respect the recovery.',
        },
      ],
      cooldown: 'Refuel within 30 minutes — you need it. Protein + carbs + electrolytes. Rest tomorrow. You earned it.',
    },

    // ──────────────────────────────────────────────
    // WEEK 5 — PEAK DISTANCE
    // ──────────────────────────────────────────────
    {
      day: 'Day 13',
      title: 'W5 · Intervals + Race Pace',
      warmup: '15 min: easy jog (1 mile), A-skips, B-skips, high knees, butt kicks, 4 × 100m strides building to 90%',
      duration: '65 min',
      exercises: [
        {
          name: '1K Repeat at Race Pace',
          sets: 6,
          reps: '1km',
          rest: '1:45 jog',
          cues: '6 reps — peak volume. Same pace, tighter recovery. This is the hardest interval session of the program. Reps 5 and 6 are where champions are made. Your legs will scream at you — answer by holding pace. If you get through all 6 even, you are ready to race.',
        },
        {
          name: '800m at HM Goal Pace',
          sets: 5,
          reps: '800m',
          rest: '1:15 jog',
          cues: '5 reps with shorter rest — 1:15 jog between. This is faster recovery than you\'ll need on race day. The pace should feel locked in by now — your body knows this speed. Trust your legs.',
        },
        {
          name: '400m Fast Finish',
          sets: 4,
          reps: '400m',
          rest: '1:00 walk',
          cues: 'Faster than 5K effort on these — push toward mile-race speed. Your legs have the strength now to produce this speed even on tired muscles. Explosive first 100m, hold through the line.',
        },
        {
          name: '200m Build-Up Sprint',
          sets: 5,
          reps: '200m',
          rest: '1:30 walk back',
          cues: '5 reps. Build from jog to 95% — push the ceiling on the last 2 reps. You\'re faster than you think. This is the last hard speed session before taper. Make it count.',
        },
      ],
      cooldown: '10 min: easy jog (0.5 mile), full stretch series — calves, hip flexors, hamstrings, quads, glutes, IT band (30 sec each side). Ice bath or cold shower if you have access.',
    },
    {
      day: 'Day 14',
      title: 'W5 · Threshold + Tempo',
      warmup: '15 min: easy jog (1 mile), leg swings, hip circles, 4 × 100m strides at tempo effort',
      duration: '65 min',
      exercises: [
        {
          name: 'Tempo Run',
          sets: 1,
          reps: '30 min',
          rest: '-',
          cues: '30 minutes at threshold — peak tempo. This is your crowning tempo effort. The first 10 minutes might feel hard, minutes 10-20 you\'ll find your groove, and the last 10 are pure mental steel. Don\'t let the pace drop in the final 5 minutes. If you finish this, you have the engine for race day.',
        },
        {
          name: 'Fartlek — Surge and Recover',
          sets: 5,
          reps: '2 min hard / 2 min easy',
          rest: '-',
          cues: '5 rounds, 20 minutes total. After a 30-minute tempo, these surges simulate the hardest miles of a half marathon. The hard portions are 10K effort. The easy portions keep you moving. This is the session that separates finishers from racers.',
        },
        {
          name: 'Easy Recovery Jog',
          sets: 1,
          reps: '10 min',
          rest: '-',
          cues: 'Slow it all the way down. Conversational pace. You just did the hardest threshold session of the entire program. Let the body come back. Deep breaths. Easy stride. You did the work — the taper is coming.',
        },
      ],
      cooldown: '5 min walk. Foam roll everything thoroughly — calves, quads, hamstrings, IT band, glutes, adductors. Full stretch series. Extra time on anything that\'s tight.',
    },
    {
      day: 'Day 15',
      title: 'W5 · Long Run',
      warmup: 'Walk 3 minutes, then easy jog. Let the first mile be your warmup. Carry water or use a hydration belt — 10 miles demands it.',
      duration: '85-100 min',
      exercises: [
        {
          name: 'Long Run — 10 Miles Steady',
          sets: 1,
          reps: '10 miles',
          rest: '-',
          cues: 'Peak distance — 10 miles. This is your race-day rehearsal. Conversational pace for the first 8 miles, no exceptions. Take water every 2-3 miles. Practice your race-day fueling strategy — eat a gel or chews at mile 5 if you plan to use them on race day. Whatever you do in training, you do in the race.',
        },
        {
          name: 'Hard Finish — Last 2 Miles',
          sets: 1,
          reps: '2 miles',
          rest: '-',
          cues: 'Drop to half marathon pace for the final 2 miles. This is the longest progression finish of the program. Mile 9 at race pace, mile 10 faster than race pace. Finish like you\'re racing for the line. If you can do this on tired legs, race day has nothing on you.',
        },
        {
          name: 'Cooldown Walk + Stretch',
          sets: 1,
          reps: '15 min',
          rest: '-',
          cues: 'Walk for at least 5-7 minutes — do not sit down. Then thorough stretch: calves, hip flexors, hamstrings, quads, IT band, glutes, pigeon (45 sec each side). This was your biggest day — take the recovery seriously. Refuel immediately.',
        },
      ],
      cooldown: 'Refuel within 20 minutes — protein + carbs + electrolytes. Rest and sleep are critical this week. Next week is taper — the hard work is done. Trust your training.',
    },

    // ──────────────────────────────────────────────
    // WEEK 6 — TAPER + RACE PREP
    // ──────────────────────────────────────────────
    {
      day: 'Day 16',
      title: 'W6 · Intervals + Race Pace',
      warmup: '15 min: easy jog (1 mile), A-skips, B-skips, high knees, butt kicks, 4 × 100m strides building to 85%. Keep the warmup relaxed — this week is about sharpness, not volume.',
      duration: '40 min',
      exercises: [
        {
          name: '1K Repeat at Race Pace',
          sets: 3,
          reps: '1km',
          rest: '2:30 jog',
          cues: 'Only 3 reps — reduced volume with full recovery. These should feel SHARP. Your legs are fresh from the taper and the pace should feel easier than any week before. That\'s the fitness talking. Lock in your target pace and feel how smooth it is.',
        },
        {
          name: '800m at HM Goal Pace',
          sets: 3,
          reps: '800m',
          rest: '2:00 jog',
          cues: '3 reps, generous recovery. This is a reminder session — your legs remember the pace. Don\'t force it, just let the rhythm come. These should feel controlled and confident. This is how race day will feel.',
        },
        {
          name: '400m Fast Finish',
          sets: 2,
          reps: '400m',
          rest: '1:30 walk',
          cues: 'Just 2 reps — keep the legs sharp without digging a hole. 5K effort, clean form, strong finish. These are the last hard reps before race day. Make them crisp.',
        },
      ],
      cooldown: '10 min: easy jog (0.5 mile), full stretch series. Gentle foam rolling. Save the legs — race day is coming.',
    },
    {
      day: 'Day 17',
      title: 'W6 · Threshold + Tempo',
      warmup: '15 min: easy jog (1 mile), leg swings, hip circles, 4 × 100m strides — relaxed, not racing them',
      duration: '40 min',
      exercises: [
        {
          name: 'Tempo Run',
          sets: 1,
          reps: '15 min',
          rest: '-',
          cues: 'Half the volume of last week. This should feel almost easy — that\'s the taper working. Run at threshold pace and notice how much stronger you feel. Don\'t get excited and push harder — save it for race day. This is a systems check, not a workout.',
        },
        {
          name: 'Fartlek — Surge and Recover',
          sets: 1,
          reps: '10 min (2.5 rounds)',
          rest: '-',
          cues: '2 min hard / 2 min easy for 2.5 rounds. Keep the surges at half marathon pace — no faster. The goal is to remind your legs what race pace feels like, not to tax them. Easy and controlled.',
        },
        {
          name: 'Easy Recovery Jog',
          sets: 1,
          reps: '8 min',
          rest: '-',
          cues: 'Nice and easy. Let the heart rate come down completely. This is your last tempo day before the race. Everything from here is about arriving fresh, confident, and sharp.',
        },
      ],
      cooldown: '5 min walk. Gentle stretch — calves, hip flexors, hamstrings, quads (20-30 sec each). Light foam rolling. Focus on sleep this week — 8+ hours if you can.',
    },
    {
      day: 'Day 18',
      title: 'W6 · Long Run',
      warmup: 'Walk 2 minutes, then easy jog. No stretching cold. Keep it simple and easy.',
      duration: '40-50 min',
      exercises: [
        {
          name: 'Easy Run — 4 Miles',
          sets: 1,
          reps: '4 miles',
          rest: '-',
          cues: 'Taper week — only 4 miles. Run at a pace that feels almost too easy. Your legs should feel springy and fresh. If they don\'t, slow down more. This is NOT the time to test fitness. The work is done. You are ready. Just keep the blood flowing and the muscles loose.',
        },
        {
          name: 'Strides — Race Pace Touch',
          sets: 4,
          reps: '100m',
          rest: '1:00 walk back',
          cues: 'After your easy run, do 4 × 100m strides at race pace. These are short, sharp, and relaxed. The purpose is to remind your neuromuscular system what race pace feels like. Don\'t strain. Smooth, confident, fast. Walk back between each one.',
        },
        {
          name: 'Pre-Race Prep',
          sets: 1,
          reps: '10 min',
          rest: '-',
          cues: 'Walk 5 minutes, then stretch everything — calves, hip flexors, hamstrings, quads, glutes, IT band (30 sec each). Lay out your race gear tonight. Pin your bib. Charge your watch. Set two alarms. Eat carbs tonight. Hydrate. You\'ve done the work — now go compete.',
        },
      ],
      cooldown: 'Light walk. You\'re ready. 6 weeks of intervals, tempo runs, and long miles have built something real. Trust the training. Race day is yours. Go compete.',
    },
  ],
}
