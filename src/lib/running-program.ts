import type { Program } from './programs'

export const runningProgram: Program = {
  id: 'running',
  name: 'CTC Endurance',
  weeks: 6,
  frequency: '3x / week',
  description: '6-week half marathon build. Intervals, tempo, and long runs — every session under 60 minutes.',
  category: 'conditioning',
  image: '/programs/running.jpg',
  days: [
    // ──────────────────────────────────────────────
    // WEEK 1 — BASE
    // ──────────────────────────────────────────────
    {
      day: 'Day 1',
      title: 'W1 · Intervals',
      warmup: '10 min to get loose: Start with an easy jog for 5 min (barely above walking pace). Then do 30 sec of high knees (drive knees up to hip height, pumping your arms) and 30 sec of butt kicks (kick your heels back toward your glutes). Finish with 3 strides — run about 100m (the length of a football field) starting easy and finishing at about 80% speed. Walk back between each one.',
      duration: '45 min',
      sections: [{'name':'Speed Work','start':0}],
      exercises: [
        { name: '800m at Race Pace', sets: 4, reps: '800m (2 laps of a track, or about 3 min of running)', rest: '2:00 easy jog between each', cues: 'This is your goal race speed — a pace where you\'re breathing hard but could still say a few words at a time. If you don\'t know your pace yet, run at a speed that feels "comfortably hard." Between each rep, jog slowly for 2 minutes to recover. Don\'t stop and stand — keep your legs moving. Try to run each one at the same speed.' },
        { name: '400m Fast Finish', sets: 4, reps: '400m (1 lap, or about 90 sec of running)', rest: '1:00 walk between each', cues: 'These are faster than your race speed — you should be breathing hard and only able to get out 1-2 words. Pump your arms, stand tall (don\'t hunch over), and drive your knees forward. Walk for 1 minute between each rep to catch your breath. These teach your legs to run fast when they\'re already tired.' },
      ],
      cooldown: '5 min easy jog to bring your heart rate down, then stretch: calves (lean against a wall, one foot back, press heel down — 30 sec each leg), hip flexors (big lunge position, push hips forward — 30 sec each), hamstrings (foot on a bench, lean forward with a flat back — 30 sec each), quads (grab your ankle behind you, pull heel to glute — 30 sec each).',
    },
    {
      day: 'Day 2',
      title: 'W1 · Tempo',
      warmup: '10 min: Easy jog for 5 min, then leg swings (hold onto something, swing one leg forward and back like a pendulum — 10 each leg, then side to side — 10 each leg). Finish with 3 strides — jog to fast over 100m, walk back between each.',
      duration: '45 min',
      sections: [{'name':'Tempo','start':0},{'name':'Speed Play','start':1}],
      exercises: [
        { name: 'Tempo Run', sets: 1, reps: '18 min', rest: '-', cues: 'A tempo run is a sustained effort at a pace that\'s challenging but maintainable. Here\'s how to find it: run hard enough that you can only speak in short phrases — if you can have a full conversation, speed up. If you can\'t talk at all, slow down. Ease into the pace over the first 2 minutes. Once you lock it in, hold it steady — don\'t speed up or slow down. Focus on breathing rhythmically (try inhaling for 3 steps, exhaling for 2).' },
        { name: 'Speed Play — Hard/Easy', sets: 3, reps: '1 min hard / 1 min easy', rest: '-', cues: '"Speed play" means alternating between faster and slower running without stopping. Run hard for 1 minute (race effort or slightly faster), then jog easy for 1 minute. That\'s 1 round — do 3 rounds total (6 minutes). The hard portions should feel like you\'re chasing someone. The easy portions are a slow jog to recover — keep moving, don\'t walk. This teaches your body to recover while still running.' },
      ],
      cooldown: '5 min walk to cool down. If you have a foam roller: roll your calves (sit on the floor, place roller under calf, roll slowly — 30 sec each), quads (face down, roller under thighs, roll slowly — 30 sec each), and the outside of your thigh/IT band (lie on your side, roller under outer thigh, roll from hip to knee — 30 sec each). Then stretch hamstrings and hip flexors (30 sec each side).',
    },
    {
      day: 'Day 3',
      title: 'W1 · Long Run',
      warmup: 'Walk for 2 minutes, then start a very easy jog. Let the first few minutes be your warmup — no need to stretch before you start. Your body warms up best by moving.',
      duration: '50 min',
      sections: [{'name':'Endurance','start':0},{'name':'Finish','start':1}],
      exercises: [
        { name: 'Long Run — 40 min Easy', sets: 1, reps: '40 min', rest: '-', cues: 'This is your easiest run of the week — go SLOW. You should be able to hold a full conversation the entire time. If you\'re breathing too hard to talk normally, you\'re going too fast. Ignore your pace on your watch. The goal is simply time on your feet. Your body is learning to use fat for fuel and building endurance. Don\'t worry about how far you go — just keep moving for 40 minutes at a comfortable effort.' },
        { name: 'Pick-Up Finish', sets: 1, reps: '3 min', rest: '-', cues: 'For the last 3 minutes, gradually speed up to your race effort — the "comfortably hard" pace from Day 1. This teaches your body to push when it\'s already tired. Focus on standing tall, pumping your arms, and picking up your feet.' },
      ],
      cooldown: '5 min walk. Stretch everything: calves, hip flexors, hamstrings, quads (30 sec each side). Pigeon stretch for your hips — sit on the ground, bring one shin across in front of you, extend the other leg behind you, lean forward and hold 30 sec each side. Drink water and eat something with protein and carbs within 30 minutes (a shake, a banana with peanut butter, or a meal).',
    },

    // ──────────────────────────────────────────────
    // WEEK 2 — BUILD
    // ──────────────────────────────────────────────
    {
      day: 'Day 4',
      title: 'W2 · Intervals',
      warmup: '10 min: Easy jog for 5 min, then 30 sec high knees and 30 sec butt kicks. Finish with 3 strides over 100m — a little faster than last week, building to about 85% speed. Walk back between each.',
      duration: '50 min',
      sections: [{'name':'Speed Work','start':0}],
      exercises: [
        { name: '800m at Race Pace', sets: 5, reps: '800m (2 laps or ~3 min)', rest: '2:00 easy jog', cues: 'One more rep than last week — 5 total. Same race pace as Week 1. Your goal this week is consistency — try to run every rep at the same speed. If your last rep is way slower than your first, you started too fast. Keep your shoulders relaxed (drop them away from your ears) and unclench your jaw. Tension in your upper body wastes energy.' },
        { name: '400m Fast Finish', sets: 4, reps: '400m (1 lap or ~90 sec)', rest: '1:00 walk', cues: 'Same as last week — faster than race pace. Start strong through the first half and fight to hold that speed through the second half. Focus on quick arm pumps (hands should swing from hip to chin height) and keeping your posture tall. Walk between each rep.' },
      ],
      cooldown: '5 min easy jog, then stretch everything — calves, hip flexors, hamstrings, quads (30 sec each side).',
    },
    {
      day: 'Day 5',
      title: 'W2 · Tempo',
      warmup: '10 min: Easy jog for 5 min, then leg swings (10 forward/back and 10 side-to-side each leg) and hip circles (10 each direction). Finish with 3 strides over 100m, walk back between each.',
      duration: '48 min',
      sections: [{'name':'Tempo','start':0},{'name':'Speed Play','start':1}],
      exercises: [
        { name: 'Tempo Run', sets: 1, reps: '20 min', rest: '-', cues: '2 minutes longer than last week. Same effort — you can speak in short phrases but not full sentences. The first 5 minutes might feel rough as your body adjusts. That\'s normal. Push through it and you\'ll settle into a rhythm. Once you find it, lock in and hold steady. Keep your breathing controlled — in through nose and mouth, out through mouth.' },
        { name: 'Speed Play — Hard/Easy', sets: 4, reps: '1 min hard / 1 min easy', rest: '-', cues: 'One more round than last week — 4 total (8 minutes). Hard portions are your race effort or faster. Easy portions are a slow jog to catch your breath. Don\'t stop moving during the easy portions — jogging keeps blood flowing to your muscles and helps them recover faster than standing still. Push through the 4th round even when you want to quit.' },
      ],
      cooldown: '5 min walk. Foam roll calves, quads, and outer thighs if you have one. Stretch hamstrings and hip flexors (30 sec each side).',
    },
    {
      day: 'Day 6',
      title: 'W2 · Long Run',
      warmup: 'Walk 2 min, then easy jog. Let the first few minutes be your warmup.',
      duration: '55 min',
      sections: [{'name':'Endurance','start':0},{'name':'Finish','start':1}],
      exercises: [
        { name: 'Long Run — 45 min Easy', sets: 1, reps: '45 min', rest: '-', cues: '5 minutes longer than last week. Same easy, conversational pace — if you can\'t chat comfortably, slow down. Bring water or plan a route that passes a water fountain. Your body is getting more efficient at burning fat and delivering oxygen to your muscles. Trust the easy pace — the time on your feet is what builds endurance, not speed.' },
        { name: 'Pick-Up Finish', sets: 1, reps: '3 min', rest: '-', cues: 'Last 3 minutes, gradually increase to your race effort. Your legs are more tired than last week and that\'s the point — you\'re teaching your body to push when fatigued. Finish strong with good posture.' },
      ],
      cooldown: '5 min walk. Full stretch — calves, hip flexors, hamstrings, quads, pigeon stretch (30 sec each). Drink water and eat within 30 minutes — protein and carbs (chicken and rice, a protein shake and banana, whatever works).',
    },

    // ──────────────────────────────────────────────
    // WEEK 3 — SHARPEN
    // ──────────────────────────────────────────────
    {
      day: 'Day 7',
      title: 'W3 · Intervals',
      warmup: '10 min: Easy jog for 5 min, then high knees and butt kicks (30 sec each). Finish with 3 strides over 100m building to 85% speed. Walk back between each.',
      duration: '50 min',
      sections: [{'name':'Speed Work','start':0}],
      exercises: [
        { name: '1K Repeat at Race Pace', sets: 4, reps: '1km (2.5 laps or about 5-6 min of running)', rest: '2:00 easy jog', cues: 'Longer intervals this week — 1 kilometer each (about 2.5 laps around a track, or roughly 5-6 minutes of running). Hold your race pace — that "comfortably hard" effort. These longer reps teach your body to sustain that speed. The 3rd and 4th reps will feel harder than the first two — that\'s where the growth happens. Jog slowly for 2 minutes between each rep to recover.' },
        { name: '200m Build-Up Sprint', sets: 4, reps: '200m (half a lap or about 30-40 sec)', rest: '1:30 walk back', cues: 'These are "acceleration runs." Start at an easy jog and gradually speed up over 200 meters (half a lap), reaching about 90% of your top speed by the end. Don\'t explode out of the gate — smooth and controlled, like a plane taking off. Walk back to your starting point to rest (about 90 seconds). These teach your legs to change speeds smoothly.' },
      ],
      cooldown: '5 min easy jog, then full stretch — calves, hip flexors, hamstrings, quads (30 sec each side).',
    },
    {
      day: 'Day 8',
      title: 'W3 · Tempo',
      warmup: '10 min: Easy jog for 5 min, leg swings (10 each direction each leg), hip circles (10 each direction), then 3 strides over 100m. Walk back between each.',
      duration: '52 min',
      sections: [{'name':'Tempo','start':0},{'name':'Speed Play','start':1}],
      exercises: [
        { name: 'Tempo Run', sets: 1, reps: '22 min', rest: '-', cues: 'Your body is getting stronger at this effort. Same rule — short phrases, not sentences. By now you should feel the rhythm settling in faster than Week 1. Once you find your groove, hold it there. If you notice yourself speeding up or slowing down, reset. Consistency is more important than pushing harder. Relax your hands — pretend you\'re holding potato chips and don\'t crush them.' },
        { name: 'Speed Play — Hard/Easy', sets: 4, reps: '90 sec hard / 90 sec easy', rest: '-', cues: '4 rounds, 12 minutes total. The hard portions are 90 seconds this week (longer than before). Run at your race pace or slightly faster. The easy portions are 90 seconds of slow jogging. Keep moving the entire time. The 4th round is the most important one — push through it even when your legs are tired.' },
      ],
      cooldown: '5 min walk. Foam roll if you have one — calves, quads, outer thighs (30 sec each). Stretch everything. Drink plenty of water tonight.',
    },
    {
      day: 'Day 9',
      title: 'W3 · Long Run',
      warmup: 'Walk 2 min, easy jog to start. Let the first few minutes be your warmup.',
      duration: '58 min',
      sections: [{'name':'Endurance','start':0},{'name':'Finish','start':1}],
      exercises: [
        { name: 'Long Run — 48 min Easy', sets: 1, reps: '48 min', rest: '-', cues: 'Your longest run yet. Same easy, conversational pace. Around the 25-30 minute mark, you might feel a dip in energy or motivation — that\'s completely normal and happens to every runner. Push through it mentally and your body will settle back in. Bring water. If your legs feel heavy, shorten your stride slightly and increase your step rate — it takes pressure off your joints.' },
        { name: 'Pick-Up Finish', sets: 1, reps: '4 min', rest: '-', cues: 'Last 4 minutes (one minute longer than before), increase to your race effort. Focus on strong arm drive (pump them forward and back, not across your body), quick feet, and controlled breathing. Finish proud — you just completed your longest run of the program so far.' },
      ],
      cooldown: '5 min walk. Full stretch — calves, hip flexors, hamstrings, quads, pigeon stretch (30 sec each). This was a big effort. Refuel within 30 minutes and rest well.',
    },

    // ──────────────────────────────────────────────
    // WEEK 4 — PEAK INTENSITY
    // ──────────────────────────────────────────────
    {
      day: 'Day 10',
      title: 'W4 · Intervals',
      warmup: '10 min: Easy jog for 5 min, then high knees and butt kicks (30 sec each). Finish with 3 strides over 100m, building to 90% speed. Take an extra minute if you need it — today is a big session.',
      duration: '55 min',
      sections: [{'name':'Speed Work','start':0}],
      exercises: [
        { name: '1K Repeat at Race Pace', sets: 5, reps: '1km (~5-6 min each)', rest: '1:45 easy jog', cues: 'Peak interval session — 5 reps with slightly less rest between them (1:45 instead of 2:00). This is intentional. In a race, you don\'t get full recovery — your body has to perform on tired legs. Hold your race pace on every rep. If rep 5 is the same speed as rep 1, you are ready. If you\'re fading, that\'s okay — it means you\'re pushing your limits, which is exactly how you get better.' },
        { name: '400m Fast Finish', sets: 3, reps: '400m (~90 sec each)', rest: '1:00 walk', cues: 'Faster than race pace. By Week 4, these should feel more natural than Week 1 — same speed but you\'re less winded. That\'s your fitness improving. Stand tall, drive your arms, and focus on quick foot turnover (how fast your feet hit the ground, not how far each step goes). Walk between reps.' },
      ],
      cooldown: '5 min easy jog, full stretch (30 sec each side). This was a big session — take extra time on anything that feels tight.',
    },
    {
      day: 'Day 11',
      title: 'W4 · Tempo',
      warmup: '10 min: Easy jog for 5 min, leg swings and hip circles (10 each direction), then 3 strides over 100m. Walk back between each.',
      duration: '55 min',
      sections: [{'name':'Tempo','start':0},{'name':'Speed Play','start':1}],
      exercises: [
        { name: 'Tempo Run', sets: 1, reps: '25 min', rest: '-', cues: 'This is the hardest tempo run of the program. 25 minutes at that "short phrases only" effort. Here\'s how to break it down mentally: the first 8 minutes are about finding your rhythm. Minutes 8-18 are the middle — lock in and hold. The last 7 minutes are a mental test — your body will want to slow down but you are stronger than that. Keep your form: shoulders relaxed, arms swinging forward/back (not across your body), feet landing under your hips.' },
        { name: 'Speed Play — Hard/Easy', sets: 4, reps: '90 sec hard / 90 sec easy', rest: '-', cues: '4 rounds, 12 minutes total. The hard portions should feel harder than previous weeks — run like someone is chasing you. The easy portions are still a jog, not a walk. Your body is learning to recover faster between hard efforts. This is exactly what happens in a race when you hit hills or need to surge past someone.' },
      ],
      cooldown: '5 min walk. Foam roll everything if possible. Full stretch series. Get to bed early tonight — your body rebuilds while you sleep.',
    },
    {
      day: 'Day 12',
      title: 'W4 · Long Run',
      warmup: 'Walk 2 min, then easy jog. Bring water with you or plan a route that passes a water fountain.',
      duration: '60 min',
      sections: [{'name':'Endurance','start':0},{'name':'Finish','start':1}],
      exercises: [
        { name: 'Long Run — 50 min Easy', sets: 1, reps: '50 min', rest: '-', cues: 'Conversational pace — if you can\'t talk comfortably, you\'re going too fast. Take a few sips of water every 15-20 minutes (don\'t wait until you\'re thirsty — by then you\'re already dehydrated). You might feel great at the 25-minute mark and want to speed up — resist that urge. Saving energy for the finish is a skill, and you\'re practicing it right now.' },
        { name: 'Pick-Up Finish', sets: 1, reps: '5 min', rest: '-', cues: 'Last 5 minutes, increase to race effort. Your legs are tired — that\'s exactly the point. In a half marathon, the last few miles are the hardest. By practicing this now, you\'re training your body AND your mind to push through fatigue. Stand tall, pump your arms, and finish strong.' },
      ],
      cooldown: '5 min walk (don\'t sit down right away — walking helps your body recover). Full stretch. Eat within 30 min — your muscles need protein and carbs to repair. A meal, a shake, a protein bar and fruit — get something in.',
    },

    // ──────────────────────────────────────────────
    // WEEK 5 — PEAK DISTANCE
    // ──────────────────────────────────────────────
    {
      day: 'Day 13',
      title: 'W5 · Intervals',
      warmup: '10 min: Easy jog for 5 min, high knees and butt kicks (30 sec each). Finish with 3 strides over 100m building to 90% speed. Walk back between each.',
      duration: '55 min',
      sections: [{'name':'Speed Work','start':0}],
      exercises: [
        { name: '1K Repeat at Race Pace', sets: 5, reps: '1km (~5-6 min each)', rest: '1:30 easy jog', cues: 'Same 5 reps as last week but even less rest — just 1:30 between them. This is the hardest interval session of the entire program. Your legs will feel heavy on reps 4 and 5. That discomfort is your body adapting and getting stronger. Hold your pace. Breathe rhythmically. Relax your face and hands. You\'re tougher than you think.' },
        { name: '200m Build-Up Sprint', sets: 4, reps: '200m (~30-40 sec each)', rest: '1:30 walk back', cues: 'Start at a jog and gradually accelerate to about 95% of your top speed over 200 meters. These should feel sharp and fast — your legs are primed from the 1K reps. Walk back to rest. This is the last hard speed workout before race week. Run with confidence — you\'ve earned this speed.' },
      ],
      cooldown: '5 min easy jog, full stretch. If you have access to an ice bath or can take a cold shower for 3-5 minutes, your legs will thank you tomorrow.',
    },
    {
      day: 'Day 14',
      title: 'W5 · Tempo',
      warmup: '10 min: Easy jog for 5 min, leg swings and hip circles (10 each direction), then 3 strides over 100m. Walk back between each.',
      duration: '58 min',
      sections: [{'name':'Tempo','start':0},{'name':'Speed Play','start':1}],
      exercises: [
        { name: 'Tempo Run', sets: 1, reps: '28 min', rest: '-', cues: 'This is the longest and hardest tempo run of the program — 28 minutes at that "short phrases only" effort. Break it into chunks: first 10 minutes to settle in, middle 10 minutes to hold steady, last 8 minutes to prove you\'re ready. Your body has been building to this moment for 5 weeks. When the last few minutes get tough, remember — if you can hold this pace for 28 minutes, you can absolutely hold your race pace on race day.' },
        { name: 'Speed Play — Hard/Easy', sets: 3, reps: '90 sec hard / 90 sec easy', rest: '-', cues: '3 rounds (9 minutes). After 28 minutes of hard running, these simulate the toughest part of a half marathon — when your legs are tired but you still need to push. The hard portions should be at race effort or faster. Keep jogging during the easy portions. You are almost done with the hard training. Push through this.' },
      ],
      cooldown: '5 min walk. Foam roll everything — spend extra time on anything that feels tight or sore. Full stretch. Drink plenty of water. Next week the training gets easier (that\'s called "tapering") so your body can rest and absorb all the work you\'ve done.',
    },
    {
      day: 'Day 15',
      title: 'W5 · Long Run',
      warmup: 'Walk 2 min, then easy jog. Bring water — you\'ll need it today.',
      duration: '60 min',
      sections: [{'name':'Endurance','start':0},{'name':'Finish','start':1}],
      exercises: [
        { name: 'Long Run — 50 min Easy', sets: 1, reps: '50 min', rest: '-', cues: 'Your longest run of the program. Same easy conversational pace. Sip water every 15 minutes. If you plan to use energy gels or chews on race day, practice with them today — try one at the 30-minute mark. Never try anything new on race day. Your body needs to rehearse everything: pace, hydration, fueling. This run is your dress rehearsal.' },
        { name: 'Race Pace Finish', sets: 1, reps: '5 min', rest: '-', cues: 'Last 5 minutes, increase to race pace. After 50 minutes of easy running, this will feel challenging — that\'s exactly what the last couple miles of a half marathon feel like. Push through it. Strong arms, quick feet, tall posture. If you can do this today, you can do it on race day.' },
      ],
      cooldown: '5 min walk. Full stretch (hold each stretch 45 sec). Eat and hydrate immediately. Rest and sleep are critical this week — your body repairs and strengthens while you sleep. Next week is race week — the hard work is done.',
    },

    // ──────────────────────────────────────────────
    // WEEK 6 — TAPER + RACE PREP
    // ──────────────────────────────────────────────
    {
      day: 'Day 16',
      title: 'W6 · Intervals',
      warmup: '10 min: Easy jog for 5 min, high knees and butt kicks (30 sec each). 3 strides over 100m at about 80% speed. Keep it relaxed — this week is about staying sharp, not working hard.',
      duration: '40 min',
      sections: [{'name':'Speed Work','start':0}],
      exercises: [
        { name: '800m at Race Pace', sets: 3, reps: '800m (~3 min each)', rest: '2:30 easy jog', cues: 'Only 3 reps with plenty of rest. This is "taper week" — your body is absorbing 5 weeks of training and getting stronger while doing LESS. These reps should feel surprisingly easy. Your legs are fresh and your fitness is at its peak. Just lock in your race pace and feel how smooth it is. This is how race day will feel.' },
        { name: '400m Fast Finish', sets: 2, reps: '400m (~90 sec each)', rest: '1:30 walk', cues: 'Just 2 reps. Fast and clean — no need to destroy yourself. The goal is to keep your legs feeling sharp and responsive. Run with good form, walk between reps, and save your energy. These are the last hard reps before race day.' },
      ],
      cooldown: '5 min easy jog. Gentle stretch — don\'t force anything deep. Your legs should feel good this week. Save everything for race day.',
    },
    {
      day: 'Day 17',
      title: 'W6 · Tempo',
      warmup: '10 min: Easy jog for 5 min, leg swings (10 each direction each leg), 3 relaxed strides over 100m — don\'t race them.',
      duration: '38 min',
      sections: [{'name':'Tempo','start':0},{'name':'Speed Play','start':1}],
      exercises: [
        { name: 'Tempo Run', sets: 1, reps: '15 min', rest: '-', cues: 'Half the time of last week. This should feel almost easy — and that\'s a GOOD sign. It means 5 weeks of training have made you stronger. Your body can now handle this effort more efficiently. Don\'t get excited and push harder — save every ounce of energy for race day. Just confirm that your body feels good and your rhythm is dialed in.' },
        { name: 'Speed Play — Hard/Easy', sets: 2, reps: '1 min hard / 1 min easy', rest: '-', cues: 'Just 2 rounds (4 minutes total). Run the hard portions at your race pace — no faster. The goal is to remind your legs what that speed feels like so they\'re ready on race day. Keep the easy portions at a comfortable jog. Short and sweet.' },
      ],
      cooldown: '5 min walk. Gentle stretching (20-30 sec each). Focus on sleeping 8+ hours every night this week. Sleep is when your body does its final repairs.',
    },
    {
      day: 'Day 18',
      title: 'W6 · Pre-Race Shakeout',
      warmup: 'Walk 2 min, then easy jog. Keep everything relaxed and easy.',
      duration: '35 min',
      sections: [{'name':'Endurance','start':0},{'name':'Finish','start':1}],
      exercises: [
        { name: 'Easy Run', sets: 1, reps: '20 min', rest: '-', cues: 'Run at a pace that feels almost too easy — like you could do this forever. Your legs should feel springy and fresh. If they don\'t, slow down. This is NOT the time to test your fitness or squeeze in one more hard workout. The work is already done. All 5 weeks of training are stored in your muscles. This run just keeps the blood flowing and the muscles loose.' },
        { name: 'Race Pace Strides', sets: 4, reps: '100m (~15-20 sec each)', rest: '1:00 walk back', cues: 'Run 100 meters (one straight of a track, or the length of a football field) at your race pace. Short, smooth, and confident. Walk back to your starting point between each one. The goal is to remind your body what race pace feels like one last time. Smooth and controlled, not all-out.' },
      ],
      cooldown: 'Walk 5 min. Stretch everything gently (30 sec each). Now get ready: lay out your race clothes tonight, pin your bib number to your shirt, charge your GPS watch, set TWO alarms. Eat a carb-heavy dinner (pasta, rice, bread). Drink water but don\'t overdo it. You\'ve put in 6 weeks of work. Trust your training. Go compete.',
    },
  ],
}
