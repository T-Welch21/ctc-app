import type { Program } from './programs'

export const strengthProgram: Program = {
  id: 'strength',
  name: 'Strength',
  weeks: 6,
  frequency: '6x / week',
  description: 'Push. Pull. Legs. Repeat. Build serious strength and size.',
  category: 'strength',
  image: '/programs/strength.jpg',
  days: [
    // =====================================================================
    // WEEK 1 — FOUNDATION / ACCUMULATION
    // Establish baselines. Nail form. Build work capacity.
    // Strength days: 5×5 main lifts. Volume days: 4×10 compounds.
    // =====================================================================

    // ---- Day 1: W1 · Push — Strength ----
    {
      day: 'Day 1',
      title: 'W1 · Push — Strength',
      warmup: '5 min: band pull-aparts, arm circles, push-up walkouts, rotator cuff external rotations',
      duration: '65 min',
      exercises: [
        {
          name: 'Bench Press',
          sets: 5,
          reps: '5',
          rest: '3:00',
          cues: 'Arch the upper back, not the lower. Retract and depress the shoulder blades. Bar touches mid-chest — explode off the chest. This is your baseline weight — pick something you can hit all 5x5 clean.',
        },
        {
          name: 'Overhead Press',
          sets: 4,
          reps: '6',
          rest: '2:30',
          cues: 'Strict press — no leg drive. Bar starts at the chin, lock out directly overhead. Squeeze the glutes to stabilize. Head pokes through at lockout.',
        },
        {
          name: 'Close-Grip Bench Press',
          sets: 3,
          reps: '8',
          rest: '1:30',
          cues: 'Hands shoulder-width apart. Elbows tucked tight to the body. Press through the triceps — this builds your lockout.',
        },
        {
          name: 'Incline Dumbbell Bench Press',
          sets: 3,
          reps: '10',
          rest: '1:30',
          cues: '30-degree bench. Full stretch at the bottom — feel the chest open. Squeeze hard at the top. Control the negative.',
        },
        {
          name: 'Dumbbell Lateral Raise',
          sets: 4,
          reps: '12',
          rest: '1:00',
          cues: 'Lead with the elbows, not the hands. Raise to shoulder height — no higher. Controlled 2-second negative every rep.',
        },
        {
          name: 'Cable Tricep Pushdown',
          sets: 3,
          reps: '12',
          rest: '1:00',
          cues: 'Elbows pinned to your sides the entire time. Full extension at the bottom. Squeeze the tricep hard, then control the return.',
        },
      ],
      cooldown: '5 min: chest doorway stretch, cross-body shoulder stretch, overhead tricep stretch',
    },

    // ---- Day 2: W1 · Pull — Strength ----
    {
      day: 'Day 2',
      title: 'W1 · Pull — Strength',
      warmup: '5 min: band pull-aparts, cat-cow, dead hangs (30s), scap retractions on bar',
      duration: '60 min',
      exercises: [
        {
          name: 'Barbell Deadlift',
          sets: 5,
          reps: '5',
          rest: '3:00',
          cues: 'Flat back, bar against the shins. Big breath, brace the core. Push the floor away — don\'t pull with the arms. Lock hips and knees together at the top. Set your baseline weight today.',
        },
        {
          name: 'Weighted Pull-Ups',
          sets: 4,
          reps: '6',
          rest: '2:30',
          cues: 'Full dead hang to chin over bar. Initiate with the lats, not the biceps. Slow 3-second negative. Add weight when you hit all reps clean.',
        },
        {
          name: 'Barbell Bent-Over Row',
          sets: 4,
          reps: '8',
          rest: '2:00',
          cues: '45-degree torso angle. Pull to the lower chest. Squeeze the shoulder blades for a full second at the top. No body English.',
        },
        {
          name: 'Cable Face Pull',
          sets: 3,
          reps: '15',
          rest: '1:00',
          cues: 'Pull to the forehead, externally rotate at the end. Rear delts and upper back should burn. This is your shoulder health exercise — never skip it.',
        },
        {
          name: 'Barbell Curl',
          sets: 3,
          reps: '10',
          rest: '1:00',
          cues: 'Strict form — zero body swing. Squeeze at the top, 2-second negative on every rep. Elbows stay at your sides.',
        },
        {
          name: 'Dumbbell Hammer Curl',
          sets: 3,
          reps: '12',
          rest: '1:00',
          cues: 'Neutral grip, thumbs up. Elbows locked in place. This builds the brachialis — the muscle that makes your arms look thick.',
        },
      ],
      cooldown: '5 min: lat hang stretch, bicep wall stretch, seated lower back twist',
    },

    // ---- Day 3: W1 · Legs — Strength ----
    {
      day: 'Day 3',
      title: 'W1 · Legs — Strength',
      warmup: '5 min: bodyweight squats, leg swings (front/side), hip circles, glute bridges, foam roll quads',
      duration: '65 min',
      exercises: [
        {
          name: 'Barbell Back Squat',
          sets: 5,
          reps: '5',
          rest: '3:00',
          cues: 'Big breath into the belly, brace like someone is going to punch you. Break at the hips and knees together. Fight to keep your chest up out of the hole. This is your baseline — find a solid 5x5 weight.',
        },
        {
          name: 'Front Squat',
          sets: 3,
          reps: '6',
          rest: '2:30',
          cues: 'Elbows high, upper back tight. Sit straight down between the hips. Drive through the heels. If your elbows drop, the weight wins.',
        },
        {
          name: 'Barbell Hip Thrust',
          sets: 4,
          reps: '10',
          rest: '1:30',
          cues: 'Upper back on the bench, feet flat. Drive through the heels. Full hip extension at the top — squeeze the glutes for a full second. Don\'t hyperextend the lower back.',
        },
        {
          name: 'Walking Lunge',
          sets: 3,
          reps: '10 each',
          rest: '1:30',
          cues: 'Dumbbells at your sides. Long stride — back knee to the floor. Stay upright through the torso. Push through the front heel to stand.',
        },
        {
          name: 'Leg Curl',
          sets: 3,
          reps: '12',
          rest: '1:15',
          cues: 'Squeeze hard at full contraction. 3-second negative on every rep — don\'t let it slam back. Feel the hamstrings work.',
        },
        {
          name: 'Standing Calf Raise',
          sets: 4,
          reps: '15',
          rest: '1:00',
          cues: 'Full stretch at the bottom — let the heel drop. Pause at the top for 1 second. Don\'t rush these.',
        },
      ],
      cooldown: '5 min: pigeon stretch, standing quad stretch, seated hamstring stretch',
    },

    // ---- Day 4: W1 · Push — Volume ----
    {
      day: 'Day 4',
      title: 'W1 · Push — Volume',
      warmup: '5 min: band pull-aparts, arm circles, light push-ups, shoulder dislocates with band',
      duration: '55 min',
      exercises: [
        {
          name: 'Dumbbell Bench Press',
          sets: 4,
          reps: '10',
          tempo: '3-1-1-0',
          rest: '1:30',
          cues: 'Full stretch at the bottom — let the chest open up. Squeeze the dumbbells together at the top. The tempo is the point: 3 seconds down, 1 pause, 1 up.',
        },
        {
          name: 'Dumbbell Arnold Press',
          sets: 4,
          reps: '10',
          rest: '1:30',
          cues: 'Start palms facing you. Rotate as you press overhead. Full lockout at the top. This hits all three delt heads.',
        },
        {
          name: '1a. Cable Fly',
          sets: 3,
          reps: '12',
          rest: '0:00',
          cues: 'Slight bend in the elbows — locked in place. Bring hands together at chest height. Squeeze the chest at the peak. Superset with front raises.',
        },
        {
          name: '1b. Dumbbell Front Raise',
          sets: 3,
          reps: '12',
          rest: '1:00',
          cues: 'Thumbs up, raise to eye level. Control the weight — don\'t swing it. This is about the front delt, not your ego.',
        },
        {
          name: 'Overhead Tricep Extension',
          sets: 3,
          reps: '12',
          rest: '1:00',
          cues: 'Dumbbell behind the head, elbows pointing forward. Extend fully. Feel the stretch at the bottom on every rep.',
        },
        {
          name: 'Push-Up — Burnout',
          sets: 2,
          reps: 'Max reps',
          rest: '1:00',
          cues: 'Chest to the floor every single rep. Drop to your knees when you have to. Empty the tank — this is the finish line.',
        },
      ],
      cooldown: '5 min: chest doorway stretch, shoulder cross-body stretch, wrist circles',
    },

    // ---- Day 5: W1 · Pull — Volume ----
    {
      day: 'Day 5',
      title: 'W1 · Pull — Volume',
      warmup: '5 min: band pull-aparts, scap push-ups, cat-cow, light cable rows',
      duration: '55 min',
      exercises: [
        {
          name: 'Chest-Supported Dumbbell Row',
          sets: 4,
          reps: '10',
          rest: '1:30',
          cues: 'Incline bench, chest flat against it. Pull the dumbbells to your hip — squeeze the back for a full second. Zero momentum.',
        },
        {
          name: 'Lat Pulldown',
          sets: 4,
          reps: '10',
          rest: '1:30',
          cues: 'Pull to the upper chest. Lean back slightly. Think about driving your elbows into your back pockets. Squeeze the lats at the bottom.',
        },
        {
          name: '1a. Seated Cable Row',
          sets: 3,
          reps: '12',
          rest: '0:00',
          cues: 'Pull to the belly button. Keep the chest tall — don\'t round forward. Squeeze the shoulder blades together at the end. Superset with reverse flys.',
        },
        {
          name: '1b. Reverse Fly',
          sets: 3,
          reps: '15',
          rest: '1:00',
          cues: 'Bent over on an incline bench or standing. Slight bend in the elbows. Raise to shoulder height — feel the rear delts work.',
        },
        {
          name: '2a. Incline Dumbbell Curl',
          sets: 3,
          reps: '10',
          rest: '0:00',
          cues: 'Bench at 45 degrees. Let the arms hang for a full stretch at the bottom. Curl with intention — don\'t just swing. Superset with concentration curls.',
        },
        {
          name: '2b. Concentration Curl',
          sets: 3,
          reps: '10 each',
          rest: '1:00',
          cues: 'Elbow braced on your inner thigh. Squeeze at the top — hold for a beat. Slow negative on every rep.',
        },
      ],
      cooldown: '5 min: lat hang stretch, bicep wall stretch, foam roll upper back',
    },

    // ---- Day 6: W1 · Legs — Power ----
    {
      day: 'Day 6',
      title: 'W1 · Legs — Power',
      warmup: '5 min: foam roll quads and glutes, leg swings, bodyweight squats, 3 low box jumps to prime the CNS',
      duration: '60 min',
      exercises: [
        {
          name: 'Box Squat',
          sets: 4,
          reps: '5',
          rest: '2:30',
          cues: 'Sit back to the box — don\'t plop. Pause on the box for 1 second, then explode up. Focus on speed out of the hole. Keep the shins vertical.',
        },
        {
          name: 'Trap Bar Deadlift',
          sets: 4,
          reps: '5',
          rest: '2:30',
          cues: 'Neutral grip, hips back. Push the floor away from you — don\'t pull. Lock out hard at the top. Reset completely between every rep.',
        },
        {
          name: 'Leg Press',
          sets: 4,
          reps: '12',
          rest: '1:30',
          cues: 'Feet shoulder-width on the platform. Full depth without the lower back coming off the pad. Push through the whole foot.',
        },
        {
          name: 'Bulgarian Split Squat',
          sets: 3,
          reps: '10 each',
          rest: '1:30',
          cues: 'Rear foot elevated on a bench. Drop straight down — front knee tracks over toes. Drive through the front heel to stand.',
        },
        {
          name: 'Seated Calf Raise',
          sets: 4,
          reps: '15',
          rest: '1:00',
          cues: 'Full stretch at the bottom, full squeeze at the top. Slow reps — this builds the soleus, which gives your calf its width.',
        },
        {
          name: 'Ab Wheel Rollout',
          sets: 3,
          reps: '10',
          rest: '1:00',
          cues: 'Core braced, don\'t let the hips sag. Roll out as far as you can control, then pull back with the abs. If your back arches, you went too far.',
        },
      ],
      cooldown: '5 min: quad stretch, hamstring stretch, hip flexor stretch',
    },

    // =====================================================================
    // WEEK 2 — FOUNDATION / ACCUMULATION (continued)
    // Same movements. Add 5 lbs to main lifts or chase extra reps.
    // You're building the motor patterns that will carry heavier loads.
    // =====================================================================

    // ---- Day 7: W2 · Push — Strength ----
    {
      day: 'Day 7',
      title: 'W2 · Push — Strength',
      warmup: '5 min: band pull-aparts, arm circles, push-up walkouts, shoulder external rotations',
      duration: '65 min',
      exercises: [
        {
          name: 'Bench Press',
          sets: 5,
          reps: '5',
          rest: '3:00',
          cues: 'Add 5 lbs to last week\'s weight. Same form — retract the scaps, bar to mid-chest, drive hard. If you got all 25 reps last week, you earned this jump.',
        },
        {
          name: 'Overhead Press',
          sets: 4,
          reps: '6',
          rest: '2:30',
          cues: 'Same weight or +5 lbs if last week felt comfortable. Strict press — squeeze glutes, brace core, press in a straight line over your head.',
        },
        {
          name: 'Close-Grip Bench Press',
          sets: 3,
          reps: '8',
          rest: '1:30',
          cues: 'Add 5 lbs or aim for an extra rep on each set. Hands shoulder-width, elbows tight. Build that lockout strength.',
        },
        {
          name: 'Incline Dumbbell Bench Press',
          sets: 3,
          reps: '10',
          rest: '1:30',
          cues: 'Go up one dumbbell size if last week\'s 10s were easy. Full range of motion. Squeeze hard at the top.',
        },
        {
          name: 'Dumbbell Lateral Raise',
          sets: 4,
          reps: '12',
          rest: '1:00',
          cues: 'Same weight as last week — focus on making every rep perfect. Lead with elbows, pause at the top. Own the negative.',
        },
        {
          name: 'Cable Tricep Pushdown',
          sets: 3,
          reps: '15',
          rest: '1:00',
          cues: 'Bump the reps to 15 this week. Full extension, full squeeze. Chase the pump — that\'s blood flow doing its job.',
        },
      ],
      cooldown: '5 min: chest doorway stretch, cross-body shoulder stretch, overhead tricep stretch',
    },

    // ---- Day 8: W2 · Pull — Strength ----
    {
      day: 'Day 8',
      title: 'W2 · Pull — Strength',
      warmup: '5 min: band pull-aparts, cat-cow, dead hangs (30s), scap retractions on bar',
      duration: '60 min',
      exercises: [
        {
          name: 'Barbell Deadlift',
          sets: 5,
          reps: '5',
          rest: '3:00',
          cues: 'Add 5–10 lbs to last week. Same setup — flat back, bar on shins, brace hard. Push the floor away. Every rep is a single — reset at the bottom.',
        },
        {
          name: 'Weighted Pull-Ups',
          sets: 4,
          reps: '6',
          rest: '2:30',
          cues: 'Add 2.5–5 lbs if you hit all reps last week. Full dead hang, pull with the lats, slow negative. If the weight jumps too much, aim for 7 reps at last week\'s load.',
        },
        {
          name: 'Barbell Bent-Over Row',
          sets: 4,
          reps: '8',
          rest: '2:00',
          cues: 'Add 5 lbs. Same 45-degree torso. Pull to the lower chest, hold the squeeze. Your back should be doing the work, not your arms.',
        },
        {
          name: 'Cable Face Pull',
          sets: 3,
          reps: '15',
          rest: '1:00',
          cues: 'Same weight, better execution. Pull to the forehead, rotate externally, hold the peak for 2 seconds. Your rear delts and rotator cuffs will thank you.',
        },
        {
          name: 'Barbell Curl',
          sets: 3,
          reps: '10',
          rest: '1:00',
          cues: 'Same weight, better reps. Zero swing. Squeeze for a full second at the top. If you feel your back helping, go lighter.',
        },
        {
          name: 'Dumbbell Hammer Curl',
          sets: 3,
          reps: '12',
          rest: '1:00',
          cues: 'Neutral grip, elbows locked. Go up 5 lbs if last week was easy. Slow negative — 3 seconds down.',
        },
      ],
      cooldown: '5 min: lat hang stretch, bicep wall stretch, seated lower back twist',
    },

    // ---- Day 9: W2 · Legs — Strength ----
    {
      day: 'Day 9',
      title: 'W2 · Legs — Strength',
      warmup: '5 min: bodyweight squats, leg swings, hip circles, glute bridges, foam roll quads and adductors',
      duration: '65 min',
      exercises: [
        {
          name: 'Barbell Back Squat',
          sets: 5,
          reps: '5',
          rest: '3:00',
          cues: 'Add 5–10 lbs. Same bracing, same depth. If you cut depth last week, keep the same weight and go deeper. Depth before load.',
        },
        {
          name: 'Front Squat',
          sets: 3,
          reps: '6',
          rest: '2:30',
          cues: 'Add 5 lbs. Elbows high the entire time — that\'s your cue for upper back tightness. Sit between the hips. Drive through the heels.',
        },
        {
          name: 'Barbell Hip Thrust',
          sets: 4,
          reps: '10',
          rest: '1:30',
          cues: 'Add 10 lbs. Drive through the heels, full hip extension, 1-second squeeze at the top. Keep your chin slightly tucked — don\'t hyperextend the neck.',
        },
        {
          name: 'Walking Lunge',
          sets: 3,
          reps: '12 each',
          rest: '1:30',
          cues: 'Bump the reps to 12 each leg. Same weight or slightly heavier dumbbells. Long strides, back knee kisses the floor. Stay upright.',
        },
        {
          name: 'Leg Curl',
          sets: 3,
          reps: '12',
          rest: '1:15',
          cues: 'Add weight if last week was clean. Same 3-second negatives. The hamstrings grow on the eccentric — don\'t cheat yourself.',
        },
        {
          name: 'Standing Calf Raise',
          sets: 4,
          reps: '15',
          rest: '1:00',
          cues: 'Add a 2-second hold at the top this week. Full stretch, full squeeze, 2-second pause. Calves respond to time under tension.',
        },
      ],
      cooldown: '5 min: pigeon stretch, standing quad stretch, banded hamstring stretch',
    },

    // ---- Day 10: W2 · Push — Volume ----
    {
      day: 'Day 10',
      title: 'W2 · Push — Volume',
      warmup: '5 min: band pull-aparts, arm circles, light push-ups, shoulder dislocates',
      duration: '55 min',
      exercises: [
        {
          name: 'Dumbbell Bench Press',
          sets: 4,
          reps: '12',
          tempo: '3-1-1-0',
          rest: '1:30',
          cues: 'Bump the reps to 12 this week. Same tempo — 3 seconds down, 1 pause, 1 up. Chase the stretch at the bottom and the squeeze at the top.',
        },
        {
          name: 'Dumbbell Arnold Press',
          sets: 4,
          reps: '12',
          rest: '1:30',
          cues: 'More reps, same weight. Rotate smoothly through the press. Full lockout overhead every rep. Feel all three delt heads working.',
        },
        {
          name: '1a. Cable Fly',
          sets: 3,
          reps: '15',
          rest: '0:00',
          cues: 'Bump to 15 reps. Slight elbow bend, locked in place. Bring hands together, squeeze the chest. Superset with front raises.',
        },
        {
          name: '1b. Dumbbell Front Raise',
          sets: 3,
          reps: '12',
          rest: '1:00',
          cues: 'Same weight as last week. Thumbs up, raise to eye level. Control the eccentric. Don\'t rush the superset.',
        },
        {
          name: 'Overhead Tricep Extension',
          sets: 3,
          reps: '15',
          rest: '1:00',
          cues: 'Bump the reps to 15. Full stretch at the bottom, full extension at the top. The long head of the tricep gets hit hardest here.',
        },
        {
          name: 'Push-Up — Burnout',
          sets: 3,
          reps: 'Max reps',
          rest: '1:00',
          cues: 'One extra set this week. Beat your total rep count from Week 1. Chest to the floor every rep — no half reps. Drop to knees when needed.',
        },
      ],
      cooldown: '5 min: chest stretch, shoulder stretch, tricep stretch',
    },

    // ---- Day 11: W2 · Pull — Volume ----
    {
      day: 'Day 11',
      title: 'W2 · Pull — Volume',
      warmup: '5 min: band pull-aparts, scap push-ups, cat-cow, light cable rows',
      duration: '55 min',
      exercises: [
        {
          name: 'Chest-Supported Dumbbell Row',
          sets: 4,
          reps: '12',
          rest: '1:30',
          cues: 'Bump to 12 reps. Same incline bench setup. Pull to the hip, squeeze the back for a full second. Build the mind-muscle connection here.',
        },
        {
          name: 'Lat Pulldown',
          sets: 4,
          reps: '12',
          rest: '1:30',
          cues: 'More reps, same weight. Pull to the upper chest, lean back just a touch. Drive elbows down and back — feel the lats stretch and contract.',
        },
        {
          name: '1a. Seated Cable Row',
          sets: 3,
          reps: '15',
          rest: '0:00',
          cues: 'Bump to 15 reps. Pull to the belly button, chest tall. Squeeze the shoulder blades together. Superset with reverse flys.',
        },
        {
          name: '1b. Reverse Fly',
          sets: 3,
          reps: '15',
          rest: '1:00',
          cues: 'Same reps, focus on the peak contraction. Hold the top position for a beat. Your rear delts are working overtime — let them.',
        },
        {
          name: '2a. Incline Dumbbell Curl',
          sets: 3,
          reps: '12',
          rest: '0:00',
          cues: 'Bump to 12 reps. Full stretch at the bottom is non-negotiable. Curl with control, squeeze at the top. Superset with concentration curls.',
        },
        {
          name: '2b. Concentration Curl',
          sets: 3,
          reps: '12 each',
          rest: '1:00',
          cues: 'More reps this week. Elbow on the inner thigh, squeeze at the top, 2-second negative. This is isolation work — make every rep count.',
        },
      ],
      cooldown: '5 min: lat hang stretch, bicep wall stretch, foam roll upper back',
    },

    // ---- Day 12: W2 · Legs — Power ----
    {
      day: 'Day 12',
      title: 'W2 · Legs — Power',
      warmup: '5 min: foam roll quads and glutes, leg swings, bodyweight squats, 4 low box jumps',
      duration: '60 min',
      exercises: [
        {
          name: 'Box Squat',
          sets: 4,
          reps: '5',
          rest: '2:30',
          cues: 'Add 5–10 lbs. Same form — sit back, pause, explode. Move the bar faster than last week. Speed is the goal on power day.',
        },
        {
          name: 'Trap Bar Deadlift',
          sets: 4,
          reps: '5',
          rest: '2:30',
          cues: 'Add 5–10 lbs. Neutral grip, push the floor away. Every rep should be aggressive off the floor. Full lockout, full reset.',
        },
        {
          name: 'Leg Press',
          sets: 4,
          reps: '12',
          rest: '1:30',
          cues: 'Add weight. Same full depth — lower back stays on the pad. Push through the whole foot. Control the eccentric.',
        },
        {
          name: 'Bulgarian Split Squat',
          sets: 3,
          reps: '10 each',
          rest: '1:30',
          cues: 'Add 5 lbs per hand. Rear foot on the bench, drop straight down. Front knee tracks over the toes. Drive through the front heel.',
        },
        {
          name: 'Seated Calf Raise',
          sets: 4,
          reps: '15',
          rest: '1:00',
          cues: 'Add weight. Full stretch, full squeeze, hold the top for 2 seconds. Slow reps build thick soleus muscles.',
        },
        {
          name: 'Ab Wheel Rollout',
          sets: 3,
          reps: '12',
          rest: '1:00',
          cues: 'Bump to 12 reps. Go further out than last week if you can control it. Core braced — the second your back arches, you\'ve gone too far.',
        },
      ],
      cooldown: '5 min: quad stretch, hamstring stretch, hip flexor stretch',
    },

    // =====================================================================
    // WEEK 3 — INTENSIFICATION
    // Heavier loads, lower reps on strength days (5×3).
    // Exercise variations to break through sticking points.
    // Volume days: 4×8, heavier. Reduced rest on accessories.
    // =====================================================================

    // ---- Day 13: W3 · Push — Strength ----
    {
      day: 'Day 13',
      title: 'W3 · Push — Strength',
      warmup: '5 min: band pull-aparts, arm circles, push-up walkouts, rotator cuff work, 2 light bench sets',
      duration: '65 min',
      exercises: [
        {
          name: 'Paused Bench Press',
          sets: 5,
          reps: '3',
          rest: '3:00',
          cues: 'New variation — 2-second pause on the chest before pressing. This builds power off the chest and eliminates bounce. Work up to ~80% of your 1RM. RPE 8.',
        },
        {
          name: 'Push Press',
          sets: 4,
          reps: '5',
          rest: '2:30',
          cues: 'Slight dip, then explosive drive. Use leg power to get the bar moving, then press through to lockout. Go heavier than your strict press. This builds overhead strength.',
        },
        {
          name: 'Close-Grip Floor Press',
          sets: 4,
          reps: '6',
          rest: '2:00',
          cues: 'Lie on the floor, upper arms touch the ground each rep. This limits the range and overloads the lockout. Hands shoulder-width, elbows tight.',
        },
        {
          name: 'Incline Dumbbell Bench Press',
          sets: 4,
          reps: '8',
          rest: '1:30',
          cues: 'Heavier dumbbells, fewer reps. 30-degree bench. Full stretch, hard squeeze. Control the negative for 2 seconds.',
        },
        {
          name: 'Dumbbell Lateral Raise',
          sets: 4,
          reps: '10',
          rest: '1:00',
          cues: 'Slightly heavier than weeks 1–2. Fewer reps, better quality. Lead with the elbows. Pause at shoulder height.',
        },
        {
          name: 'Weighted Dips',
          sets: 3,
          reps: '8',
          rest: '1:30',
          cues: 'New movement — add a weight belt or hold a dumbbell between your feet. Lean slightly forward for chest emphasis. Full depth, full lockout. Big tricep builder.',
        },
      ],
      cooldown: '5 min: chest doorway stretch, shoulder stretch, tricep stretch, wrist circles',
    },

    // ---- Day 14: W3 · Pull — Strength ----
    {
      day: 'Day 14',
      title: 'W3 · Pull — Strength',
      warmup: '5 min: band pull-aparts, cat-cow, dead hangs, scap retractions, 2 light deadlift sets',
      duration: '65 min',
      exercises: [
        {
          name: 'Deficit Deadlift',
          sets: 5,
          reps: '3',
          rest: '3:00',
          cues: 'Stand on a 2–3 inch platform or plate. This increases range of motion and builds power off the floor. Flat back, brace hard. Work to ~80% of your regular deadlift. RPE 8.',
        },
        {
          name: 'Weighted Pull-Ups',
          sets: 5,
          reps: '4',
          rest: '2:30',
          cues: 'Heavier than weeks 1–2. Add 5–10 lbs. Fewer reps but more sets — this is about building maximal pulling strength. Full dead hang to chin over bar.',
        },
        {
          name: 'Pendlay Row',
          sets: 4,
          reps: '6',
          rest: '2:00',
          cues: 'New variation — bar starts dead on the floor each rep. Torso parallel to the ground. Explosive pull to the lower chest. Reset completely between reps. Heavier than your bent-over row.',
        },
        {
          name: 'Cable Face Pull',
          sets: 4,
          reps: '12',
          rest: '1:00',
          cues: 'Bump to 4 sets. Pull to the forehead, external rotate hard. Hold the peak for 2 seconds. Upper back and rotator cuff health — never skip this.',
        },
        {
          name: 'Barbell Curl',
          sets: 4,
          reps: '8',
          rest: '1:00',
          cues: 'Heavier weight, fewer reps. Strict form — no swinging. Squeeze at the top, slow 3-second negative. Build the peak.',
        },
        {
          name: 'Dumbbell Hammer Curl',
          sets: 3,
          reps: '10',
          rest: '1:00',
          cues: 'Heavier. Neutral grip, elbows pinned. Slow negatives. The brachialis is doing the work — keep the wrist neutral.',
        },
      ],
      cooldown: '5 min: lat hang stretch, bicep stretch, lower back stretch, foam roll thoracic spine',
    },

    // ---- Day 15: W3 · Legs — Strength ----
    {
      day: 'Day 15',
      title: 'W3 · Legs — Strength',
      warmup: '5 min: bodyweight squats, leg swings, hip circles, glute bridges, 2 light squat sets',
      duration: '65 min',
      exercises: [
        {
          name: 'Pin Squat',
          sets: 5,
          reps: '3',
          rest: '3:00',
          cues: 'Set the safety pins at parallel depth. Lower the bar to the pins, pause for 1 second with zero tension, then explode up. This eliminates the stretch reflex and builds raw strength out of the hole. ~80% of your back squat.',
        },
        {
          name: 'Paused Front Squat',
          sets: 4,
          reps: '4',
          rest: '2:30',
          cues: 'New variation — 2-second pause in the hole. Elbows stay high, core stays braced. This exposes weaknesses. If your torso collapses, go lighter and fix the position.',
        },
        {
          name: 'Barbell Hip Thrust',
          sets: 4,
          reps: '8',
          rest: '1:30',
          cues: 'Heavier than weeks 1–2, fewer reps. Drive through the heels, full hip extension. 1-second squeeze at the top. Keep the ribcage down.',
        },
        {
          name: 'Walking Lunge',
          sets: 3,
          reps: '8 each',
          rest: '1:30',
          cues: 'Heavier dumbbells, fewer reps. Long strides, back knee to the floor. Stay upright. This is strength work now, not just movement prep.',
        },
        {
          name: 'Leg Curl',
          sets: 4,
          reps: '10',
          rest: '1:15',
          cues: 'Heavier, add a set. Squeeze hard at full contraction. 3-second negatives. The hamstrings need heavy eccentric work to grow.',
        },
        {
          name: 'Standing Calf Raise',
          sets: 4,
          reps: '12',
          rest: '1:00',
          cues: 'Heavier, fewer reps. Full stretch, 2-second pause at the top. The gastrocnemius responds to heavier loads — push it.',
        },
      ],
      cooldown: '5 min: pigeon stretch, quad stretch, hamstring stretch, hip flexor stretch',
    },

    // ---- Day 16: W3 · Push — Volume ----
    {
      day: 'Day 16',
      title: 'W3 · Push — Volume',
      warmup: '5 min: band pull-aparts, arm circles, light push-ups, shoulder dislocates',
      duration: '55 min',
      exercises: [
        {
          name: 'Dumbbell Bench Press',
          sets: 4,
          reps: '8',
          tempo: '2-1-1-0',
          rest: '1:15',
          cues: 'Heavier dumbbells, fewer reps, shorter rest. Faster tempo — 2 seconds down. This is about moving more weight for quality volume. Feel the chest work.',
        },
        {
          name: 'Dumbbell Arnold Press',
          sets: 4,
          reps: '8',
          rest: '1:15',
          cues: 'Heavier, fewer reps. Full rotation, full lockout. Shorter rest between sets. Keep the intensity high.',
        },
        {
          name: '1a. Cable Fly — Low to High',
          sets: 3,
          reps: '12',
          rest: '0:00',
          cues: 'New angle — cables from the low position, bring hands up and together at chest height. This hits the upper chest fibers. Superset with plate raises.',
        },
        {
          name: '1b. Plate Front Raise',
          sets: 3,
          reps: '12',
          rest: '1:00',
          cues: 'Hold a 25 or 45 lb plate at the sides. Raise to eye level. Squeeze at the top. Control the negative. Superset with cable flys.',
        },
        {
          name: 'Skull Crushers',
          sets: 3,
          reps: '10',
          rest: '1:00',
          cues: 'New movement. EZ-bar or straight bar. Lower to the forehead — elbows point to the ceiling. Extend fully at the top. This destroys the long head of the tricep.',
        },
        {
          name: 'Diamond Push-Up — Burnout',
          sets: 2,
          reps: 'Max reps',
          rest: '1:00',
          cues: 'Hands together under the chest, diamond shape. All triceps. Go to failure, then widen the hands and keep going. Finish the day empty.',
        },
      ],
      cooldown: '5 min: chest doorway stretch, shoulder stretch, wrist stretches',
    },

    // ---- Day 17: W3 · Pull — Volume ----
    {
      day: 'Day 17',
      title: 'W3 · Pull — Volume',
      warmup: '5 min: band pull-aparts, scap push-ups, cat-cow, light cable rows',
      duration: '55 min',
      exercises: [
        {
          name: 'Chest-Supported Dumbbell Row',
          sets: 4,
          reps: '8',
          rest: '1:15',
          cues: 'Heavier dumbbells. 8 quality reps — pull to the hip, squeeze the back. 1-second hold at peak contraction. Shorter rest, higher intensity.',
        },
        {
          name: 'Wide-Grip Lat Pulldown',
          sets: 4,
          reps: '8',
          rest: '1:15',
          cues: 'New grip — go wide. This emphasizes the outer lats. Pull to the upper chest, squeeze for a beat. Lean back slightly.',
        },
        {
          name: '1a. Cable Row — Close Grip',
          sets: 3,
          reps: '10',
          rest: '0:00',
          cues: 'V-handle attachment. Pull to the belly, elbows tight to the body. This hits the mid-back and lower lats. Superset with reverse flys.',
        },
        {
          name: '1b. Reverse Fly',
          sets: 3,
          reps: '12',
          rest: '1:00',
          cues: 'Slightly heavier, fewer reps. Hold the peak contraction for 2 seconds. Rear delts should be burning by set 2.',
        },
        {
          name: '2a. Preacher Curl',
          sets: 3,
          reps: '10',
          rest: '0:00',
          cues: 'New movement. EZ-bar or dumbbells on the preacher bench. No momentum possible — pure bicep. Full extension, full contraction. Superset with cable curls.',
        },
        {
          name: '2b. Cable Curl',
          sets: 3,
          reps: '12',
          rest: '1:00',
          cues: 'Constant tension from the cable. Squeeze at the top, slow negative. Keep the elbows pinned. Chase the pump.',
        },
      ],
      cooldown: '5 min: lat hang stretch, bicep stretch, foam roll upper back and lats',
    },

    // ---- Day 18: W3 · Legs — Power ----
    {
      day: 'Day 18',
      title: 'W3 · Legs — Power',
      warmup: '5 min: foam roll quads and glutes, leg swings, bodyweight squats, 4 box jumps (medium height)',
      duration: '60 min',
      exercises: [
        {
          name: 'Box Squat',
          sets: 5,
          reps: '3',
          rest: '2:30',
          cues: 'Heavier weight, fewer reps. Sit back, 1-second pause on the box, then explode with everything you have. This is about maximal force production. ~80% of your squat.',
        },
        {
          name: 'Trap Bar Deadlift',
          sets: 5,
          reps: '3',
          rest: '2:30',
          cues: 'Heavier, fewer reps. Push the floor away aggressively. Every rep should be fast off the floor. Full lockout. Full reset. ~80% of your max.',
        },
        {
          name: 'Leg Press',
          sets: 4,
          reps: '10',
          rest: '1:30',
          cues: 'Heavier than weeks 1–2, fewer reps. Full depth. Push through the whole foot. No bouncing at the bottom.',
        },
        {
          name: 'Weighted Step-Ups',
          sets: 3,
          reps: '8 each',
          rest: '1:30',
          cues: 'New movement. Dumbbells at your sides, step onto a sturdy bench. Drive through the top foot only — don\'t push off the back foot. Builds unilateral power.',
        },
        {
          name: 'Seated Calf Raise',
          sets: 4,
          reps: '12',
          rest: '1:00',
          cues: 'Heavier. Full stretch, full squeeze, 2-second hold at the top. Fewer reps, more load.',
        },
        {
          name: 'Hanging Leg Raise',
          sets: 3,
          reps: '12',
          rest: '1:00',
          cues: 'New core movement. Dead hang from the bar. Raise the legs to parallel — or higher if you can. No swinging. Control the negative. This builds the lower abs and hip flexors.',
        },
      ],
      cooldown: '5 min: quad stretch, hamstring stretch, hip flexor stretch, child\'s pose',
    },

    // =====================================================================
    // WEEK 4 — INTENSIFICATION (continued)
    // Push the load further. Master the new variations.
    // Volume days get heavier, rest stays short.
    // =====================================================================

    // ---- Day 19: W4 · Push — Strength ----
    {
      day: 'Day 19',
      title: 'W4 · Push — Strength',
      warmup: '5 min: band pull-aparts, arm circles, push-up walkouts, rotator cuff work, 2 warm-up bench sets',
      duration: '65 min',
      exercises: [
        {
          name: 'Paused Bench Press',
          sets: 5,
          reps: '3',
          rest: '3:00',
          cues: 'Add 5–10 lbs over Week 3. Same 2-second pause on the chest. You should be at ~82–85% of your 1RM. RPE 8–9. Every rep is a grind — that\'s the point.',
        },
        {
          name: 'Push Press',
          sets: 4,
          reps: '4',
          rest: '2:30',
          cues: 'Heavier than Week 3, one fewer rep. Quick dip, violent drive. Lock out overhead. This is training your nervous system to move heavy weight fast.',
        },
        {
          name: 'Close-Grip Floor Press',
          sets: 4,
          reps: '5',
          rest: '2:00',
          cues: 'Heavier, fewer reps. Triceps touch the floor each rep, brief pause, then press hard. Building that bench lockout. Hands shoulder-width.',
        },
        {
          name: 'Incline Barbell Bench Press',
          sets: 4,
          reps: '6',
          rest: '1:30',
          cues: 'Switching to barbell for more load. 30-degree incline. Touch the upper chest, press to lockout. Feel the upper chest and front delts work.',
        },
        {
          name: 'Cable Lateral Raise',
          sets: 4,
          reps: '10',
          rest: '1:00',
          cues: 'Constant tension from the cable. Raise to shoulder height, 1-second pause. Slow negative. Better stimulus than dumbbells at this point.',
        },
        {
          name: 'Weighted Dips',
          sets: 4,
          reps: '6',
          rest: '1:30',
          cues: 'Add more weight than Week 3. Fewer reps, heavier load. Full depth, full lockout. Lean slightly forward for chest emphasis. This is a mass builder.',
        },
      ],
      cooldown: '5 min: chest doorway stretch, shoulder stretch, tricep stretch',
    },

    // ---- Day 20: W4 · Pull — Strength ----
    {
      day: 'Day 20',
      title: 'W4 · Pull — Strength',
      warmup: '5 min: band pull-aparts, cat-cow, dead hangs, scap retractions, 2 warm-up deadlift sets',
      duration: '65 min',
      exercises: [
        {
          name: 'Deficit Deadlift',
          sets: 5,
          reps: '3',
          rest: '3:00',
          cues: 'Add 5–10 lbs over Week 3. Same 2–3 inch deficit. Flat back, big brace. ~82–85% of your regular deadlift max. Every rep off the floor should be violent.',
        },
        {
          name: 'Weighted Pull-Ups',
          sets: 5,
          reps: '3',
          rest: '2:30',
          cues: 'Heavier than Week 3. 5×3 is brutally simple — 3 perfect reps, heavy weight, full range. If you can\'t get 3, drop weight. Quality over ego.',
        },
        {
          name: 'Pendlay Row',
          sets: 4,
          reps: '5',
          rest: '2:00',
          cues: 'Heavier, fewer reps. Bar dead on the floor each rep. Torso parallel. Explosive pull, controlled return. Your upper back is getting forged here.',
        },
        {
          name: 'Cable Face Pull',
          sets: 4,
          reps: '12',
          rest: '1:00',
          cues: 'Same as Week 3 — this is your shoulder health insurance. Pull, rotate, hold 2 seconds. Don\'t sacrifice this for heavier work.',
        },
        {
          name: 'Barbell Curl',
          sets: 4,
          reps: '6',
          rest: '1:15',
          cues: 'Heavier than Week 3. 6 strict reps — zero swing. If your body moves, the weight is too heavy. Squeeze at the top, 3-second negative.',
        },
        {
          name: 'Dumbbell Hammer Curl',
          sets: 3,
          reps: '8',
          rest: '1:00',
          cues: 'Heavier. 8 strict reps with a slow negative. Neutral grip, elbows locked. Building thick arms takes patience and heavy eccentrics.',
        },
      ],
      cooldown: '5 min: lat stretch, bicep stretch, lower back stretch, thoracic foam rolling',
    },

    // ---- Day 21: W4 · Legs — Strength ----
    {
      day: 'Day 21',
      title: 'W4 · Legs — Strength',
      warmup: '5 min: bodyweight squats, leg swings, hip circles, glute bridges, 2 warm-up squat sets',
      duration: '65 min',
      exercises: [
        {
          name: 'Pin Squat',
          sets: 5,
          reps: '3',
          rest: '3:00',
          cues: 'Add 5–10 lbs over Week 3. Same setup — lower to pins, dead stop, explode. ~82–85% of your squat. RPE 8–9. You should feel this in your soul.',
        },
        {
          name: 'Paused Front Squat',
          sets: 4,
          reps: '3',
          rest: '2:30',
          cues: 'Heavier than Week 3, one fewer rep. 2-second pause in the hole. Elbows high, core braced. If the elbows drop, the weight wins. Stay tight.',
        },
        {
          name: 'Barbell Hip Thrust',
          sets: 4,
          reps: '6',
          rest: '1:30',
          cues: 'Heavy. 6 reps with a 2-second squeeze at the top. Drive through the heels. Keep the ribcage down — don\'t hyperextend. This is about glute strength, not range of motion.',
        },
        {
          name: 'Reverse Lunge — Barbell',
          sets: 3,
          reps: '6 each',
          rest: '1:30',
          cues: 'New variation — barbell on the back. Step back into the lunge, front knee stays over the ankle. Drive through the front heel. More load than dumbbells allow.',
        },
        {
          name: 'Nordic Hamstring Curl',
          sets: 3,
          reps: '6',
          rest: '1:30',
          cues: 'New movement. Kneel on a pad, have someone hold your ankles or hook them under something heavy. Lower yourself as slowly as you can, catch yourself, push back up. If you can\'t do the full eccentric yet, lower as far as you can control.',
        },
        {
          name: 'Standing Calf Raise',
          sets: 4,
          reps: '10',
          rest: '1:00',
          cues: 'Heavier than before, fewer reps. Full stretch, explosive drive up, 2-second squeeze at the top. The heavy loads build the gastrocs.',
        },
      ],
      cooldown: '5 min: pigeon stretch, quad stretch, hamstring stretch, hip flexor stretch',
    },

    // ---- Day 22: W4 · Push — Volume ----
    {
      day: 'Day 22',
      title: 'W4 · Push — Volume',
      warmup: '5 min: band pull-aparts, arm circles, light push-ups, shoulder dislocates',
      duration: '55 min',
      exercises: [
        {
          name: 'Dumbbell Bench Press',
          sets: 4,
          reps: '8',
          tempo: '2-1-1-0',
          rest: '1:15',
          cues: 'Same weight as Week 3 or slightly heavier. Focus on mind-muscle connection — feel the chest doing the work. Full stretch, hard squeeze.',
        },
        {
          name: 'Dumbbell Arnold Press',
          sets: 4,
          reps: '8',
          rest: '1:15',
          cues: 'Heavier than Week 3 if possible. Full rotation, full lockout. Make every rep look the same.',
        },
        {
          name: '1a. Cable Fly — High to Low',
          sets: 3,
          reps: '10',
          rest: '0:00',
          cues: 'New angle — cables from the top, pull down and together. This targets the lower chest fibers. Squeeze at the bottom. Superset with lateral raises.',
        },
        {
          name: '1b. Dumbbell Lateral Raise',
          sets: 3,
          reps: '10',
          rest: '1:00',
          cues: 'Moderate weight, strict form. Lead with elbows, pause at the top. Control the negative for 2 seconds.',
        },
        {
          name: 'Skull Crushers',
          sets: 3,
          reps: '10',
          rest: '1:00',
          cues: 'Slightly heavier than Week 3. Lower to the forehead, extend fully. Keep the elbows pointing at the ceiling — don\'t let them flare.',
        },
        {
          name: 'Close-Grip Push-Up — Burnout',
          sets: 2,
          reps: 'Max reps',
          rest: '1:00',
          cues: 'Hands close together, elbows tight to the body. Chest to the floor. When you can\'t do any more, hold the bottom position for as long as you can. Done.',
        },
      ],
      cooldown: '5 min: chest stretch, shoulder stretch, tricep stretch, wrist circles',
    },

    // ---- Day 23: W4 · Pull — Volume ----
    {
      day: 'Day 23',
      title: 'W4 · Pull — Volume',
      warmup: '5 min: band pull-aparts, scap push-ups, cat-cow, light cable rows',
      duration: '55 min',
      exercises: [
        {
          name: 'Chest-Supported Dumbbell Row',
          sets: 4,
          reps: '8',
          rest: '1:15',
          cues: 'Heavier than Week 3. Pull to the hip, squeeze the back hard. 1-second hold at the top. You should feel every fiber in your mid-back working.',
        },
        {
          name: 'Lat Pulldown — Neutral Grip',
          sets: 4,
          reps: '8',
          rest: '1:15',
          cues: 'New grip — use a neutral/V-bar handle. This shifts emphasis to the lower lats. Pull to the upper chest, lean back slightly. Squeeze.',
        },
        {
          name: '1a. Seated Cable Row',
          sets: 3,
          reps: '10',
          rest: '0:00',
          cues: 'Heavier. Pull to the belly, chest up. Squeeze the shoulder blades together. Superset with face pulls.',
        },
        {
          name: '1b. Cable Face Pull',
          sets: 3,
          reps: '12',
          rest: '1:00',
          cues: 'Same as your strength day setup. Pull to the forehead, externally rotate. 2-second hold. Rear delt and upper back work never gets old.',
        },
        {
          name: '2a. Preacher Curl',
          sets: 3,
          reps: '8',
          rest: '0:00',
          cues: 'Heavier than Week 3, fewer reps. Strict form on the preacher pad. No momentum. Full extension, full contraction. Superset with cable hammer curls.',
        },
        {
          name: '2b. Cable Hammer Curl — Rope',
          sets: 3,
          reps: '10',
          rest: '1:00',
          cues: 'Rope attachment, neutral grip. Constant tension from the cable. Pull the rope apart at the top for peak contraction. Slow negative.',
        },
      ],
      cooldown: '5 min: lat stretch, bicep stretch, foam roll upper back and lats',
    },

    // ---- Day 24: W4 · Legs — Power ----
    {
      day: 'Day 24',
      title: 'W4 · Legs — Power',
      warmup: '5 min: foam roll, leg swings, bodyweight squats, 5 box jumps (medium–high)',
      duration: '60 min',
      exercises: [
        {
          name: 'Box Squat',
          sets: 5,
          reps: '3',
          rest: '2:30',
          cues: 'Heavier than Week 3. ~82–85% of your squat. Sit back, dead pause on the box, then maximum force production. You should be moving serious weight now.',
        },
        {
          name: 'Trap Bar Deadlift',
          sets: 5,
          reps: '3',
          rest: '2:30',
          cues: 'Heavier. Every rep should be explosive off the floor. Full lockout, full reset. You\'re teaching your body to produce force fast under heavy load.',
        },
        {
          name: 'Leg Press',
          sets: 4,
          reps: '8',
          rest: '1:30',
          cues: 'Heavier, fewer reps. Load the sled up. Full depth without the lower back coming off the pad. Push through the whole foot with authority.',
        },
        {
          name: 'Bulgarian Split Squat',
          sets: 3,
          reps: '8 each',
          rest: '1:30',
          cues: 'Heavier dumbbells. Rear foot on the bench, drop straight down. This builds unilateral strength and stability. 8 per leg, no shortcuts.',
        },
        {
          name: 'Seated Calf Raise',
          sets: 4,
          reps: '12',
          rest: '1:00',
          cues: 'Heavier. Full stretch at the bottom, explosive drive to the top, 2-second squeeze. Building the soleus under real load.',
        },
        {
          name: 'Ab Wheel Rollout',
          sets: 3,
          reps: '12',
          rest: '1:00',
          cues: 'Go further than Week 2. If you can reach full extension from the knees, start trying from the toes. Core braced the entire time.',
        },
      ],
      cooldown: '5 min: quad stretch, hamstring stretch, hip flexor stretch, child\'s pose',
    },

    // =====================================================================
    // WEEK 5 — PEAK / REALIZATION
    // Heavy doubles and triples on strength days (4×2-3).
    // Volume days maintain moderate load to support recovery.
    // Power day gets more explosive — box jumps, speed work.
    // =====================================================================

    // ---- Day 25: W5 · Push — Strength ----
    {
      day: 'Day 25',
      title: 'W5 · Push — Strength',
      warmup: '5 min: band pull-aparts, arm circles, push-up walkouts, rotator cuff work, 3 progressive warm-up bench sets',
      duration: '65 min',
      exercises: [
        {
          name: 'Bench Press',
          sets: 4,
          reps: '3',
          rest: '3:00',
          cues: 'Back to competition bench — no pause. Work up to ~85–88% of your 1RM. RPE 8–9. These should feel heavy but clean. You\'re peaking — trust the process.',
        },
        {
          name: 'Overhead Press',
          sets: 4,
          reps: '3',
          rest: '2:30',
          cues: 'Heavy triples. Strict press — no leg drive. Work up to RPE 8–9. Lock out hard overhead. Head pokes through at the top.',
        },
        {
          name: 'Close-Grip Bench Press',
          sets: 3,
          reps: '5',
          rest: '2:00',
          cues: 'Heavier than the foundation weeks. 5 reps, focus on the lockout. Hands shoulder-width, elbows tight. Build confidence in your pressing strength.',
        },
        {
          name: 'Incline Dumbbell Bench Press',
          sets: 3,
          reps: '8',
          rest: '1:30',
          cues: 'Moderate weight — this is supporting volume, not the main work. Full range, good squeeze. Protect the shoulders.',
        },
        {
          name: 'Dumbbell Lateral Raise',
          sets: 3,
          reps: '12',
          rest: '1:00',
          cues: 'Moderate weight. Clean reps. Lead with the elbows, pause at the top. This is maintenance volume for the side delts.',
        },
        {
          name: 'Cable Tricep Pushdown',
          sets: 3,
          reps: '10',
          rest: '1:00',
          cues: 'Moderate weight. Full extension, full squeeze. Keep the triceps healthy and pumped. Don\'t go to failure — save it for the big lifts.',
        },
      ],
      cooldown: '5 min: chest stretch, shoulder stretch, tricep stretch',
    },

    // ---- Day 26: W5 · Pull — Strength ----
    {
      day: 'Day 26',
      title: 'W5 · Pull — Strength',
      warmup: '5 min: band pull-aparts, cat-cow, dead hangs, scap retractions, 3 progressive warm-up deadlift sets',
      duration: '65 min',
      exercises: [
        {
          name: 'Barbell Deadlift',
          sets: 4,
          reps: '2',
          rest: '3:00',
          cues: 'Back to conventional pulls from the floor. Heavy doubles at ~87–90% of your 1RM. RPE 8–9. Perfect setup every rep. Push the floor away. This is what you\'ve been building toward.',
        },
        {
          name: 'Weighted Pull-Ups',
          sets: 4,
          reps: '3',
          rest: '2:30',
          cues: 'Heavy triples. Full dead hang to chin over bar. If this weight would have been impossible 4 weeks ago, you\'re on track.',
        },
        {
          name: 'Barbell Bent-Over Row',
          sets: 4,
          reps: '5',
          rest: '2:00',
          cues: 'Heavy 5s. 45-degree torso. Pull to the lower chest with authority. Squeeze the back. Your row should be significantly stronger than Week 1.',
        },
        {
          name: 'Cable Face Pull',
          sets: 3,
          reps: '15',
          rest: '1:00',
          cues: 'Back to higher reps. This is recovery and prehab. Pull, rotate, hold. Keep your shoulders healthy for test week.',
        },
        {
          name: 'Barbell Curl',
          sets: 3,
          reps: '8',
          rest: '1:00',
          cues: 'Moderate-heavy. 8 strict reps. Squeeze at the top. The biceps are support muscles this week — don\'t annihilate them.',
        },
      ],
      cooldown: '5 min: lat stretch, bicep stretch, lower back stretch, foam roll',
    },

    // ---- Day 27: W5 · Legs — Strength ----
    {
      day: 'Day 27',
      title: 'W5 · Legs — Strength',
      warmup: '5 min: bodyweight squats, leg swings, hip circles, glute bridges, 3 progressive warm-up squat sets',
      duration: '65 min',
      exercises: [
        {
          name: 'Barbell Back Squat',
          sets: 4,
          reps: '3',
          rest: '3:00',
          cues: 'Back to competition squat. Heavy triples at ~85–88%. RPE 8–9. Big breath, brace hard, break parallel. You should feel strong and confident under this weight.',
        },
        {
          name: 'Front Squat',
          sets: 3,
          reps: '3',
          rest: '2:30',
          cues: 'Heavy triples. Elbows high, core braced. Below parallel. This is final prep before test week. Your front squat should feel much stronger than Week 1.',
        },
        {
          name: 'Barbell Hip Thrust',
          sets: 3,
          reps: '8',
          rest: '1:30',
          cues: 'Moderate-heavy. Supporting volume — keep the glutes strong and active. Full extension, 1-second squeeze. Don\'t destroy yourself before test week.',
        },
        {
          name: 'Walking Lunge',
          sets: 3,
          reps: '8 each',
          rest: '1:30',
          cues: 'Moderate weight. Clean reps. Long strides, back knee to the floor. Maintaining single-leg strength without excess fatigue.',
        },
        {
          name: 'Leg Curl',
          sets: 3,
          reps: '10',
          rest: '1:15',
          cues: 'Moderate weight. Squeeze at the top, 3-second negatives. Keep the hamstrings healthy and balanced.',
        },
        {
          name: 'Standing Calf Raise',
          sets: 3,
          reps: '15',
          rest: '1:00',
          cues: 'Moderate weight. Full range of motion. Maintenance volume. Don\'t push to failure this week.',
        },
      ],
      cooldown: '5 min: pigeon stretch, quad stretch, hamstring stretch, hip flexor stretch',
    },

    // ---- Day 28: W5 · Push — Volume ----
    {
      day: 'Day 28',
      title: 'W5 · Push — Volume',
      warmup: '5 min: band pull-aparts, arm circles, light push-ups, shoulder dislocates',
      duration: '50 min',
      exercises: [
        {
          name: 'Dumbbell Bench Press',
          sets: 4,
          reps: '10',
          tempo: '3-1-1-0',
          rest: '1:30',
          cues: 'Back to moderate weight, higher reps. This is active recovery volume for the chest. Full stretch at the bottom, good squeeze. Don\'t chase a PR here.',
        },
        {
          name: 'Dumbbell Arnold Press',
          sets: 4,
          reps: '10',
          rest: '1:30',
          cues: 'Moderate weight. Full rotation, full lockout. Keep the shoulders feeling good. This is support work for next week\'s heavy pressing.',
        },
        {
          name: '1a. Cable Fly',
          sets: 3,
          reps: '12',
          rest: '0:00',
          cues: 'Mid-height cables. Squeeze the chest at the peak. Moderate weight, great form. Superset with front raises.',
        },
        {
          name: '1b. Dumbbell Front Raise',
          sets: 3,
          reps: '12',
          rest: '1:00',
          cues: 'Thumbs up, eye level. Control the weight. Don\'t rush. Recovery volume.',
        },
        {
          name: 'Overhead Tricep Extension',
          sets: 3,
          reps: '12',
          rest: '1:00',
          cues: 'Moderate weight. Full stretch, full extension. Keep the long head of the tricep healthy and mobile for test week.',
        },
        {
          name: 'Push-Up — Burnout',
          sets: 2,
          reps: 'Max reps',
          rest: '1:00',
          cues: 'Finish the session. Chest to the floor every rep. Beat your Week 1 total. This should feel easier than it did 4 weeks ago.',
        },
      ],
      cooldown: '5 min: chest stretch, shoulder stretch, wrist circles',
    },

    // ---- Day 29: W5 · Pull — Volume ----
    {
      day: 'Day 29',
      title: 'W5 · Pull — Volume',
      warmup: '5 min: band pull-aparts, scap push-ups, cat-cow, light cable rows',
      duration: '50 min',
      exercises: [
        {
          name: 'Chest-Supported Dumbbell Row',
          sets: 4,
          reps: '10',
          rest: '1:30',
          cues: 'Moderate weight. Pull to the hip, 1-second squeeze. This is volume to support recovery. Quality reps, no grinding.',
        },
        {
          name: 'Lat Pulldown',
          sets: 4,
          reps: '10',
          rest: '1:30',
          cues: 'Moderate weight. Pull to the upper chest, squeeze the lats. Keep the back healthy and pumped. Standard grip.',
        },
        {
          name: '1a. Seated Cable Row',
          sets: 3,
          reps: '12',
          rest: '0:00',
          cues: 'Pull to the belly, chest tall. Shoulder blades together. Smooth reps. Superset with reverse flys.',
        },
        {
          name: '1b. Reverse Fly',
          sets: 3,
          reps: '15',
          rest: '1:00',
          cues: 'Light weight, high reps. Rear delt maintenance. Hold the peak for 1 second. This keeps your posture honest.',
        },
        {
          name: '2a. Incline Dumbbell Curl',
          sets: 3,
          reps: '10',
          rest: '0:00',
          cues: 'Full stretch at the bottom, curl with intention. Moderate weight. Superset with concentration curls.',
        },
        {
          name: '2b. Concentration Curl',
          sets: 3,
          reps: '10 each',
          rest: '1:00',
          cues: 'Elbow on the thigh. Squeeze at the top, slow negative. Maintenance volume. Keep the arms looking full heading into test week.',
        },
      ],
      cooldown: '5 min: lat stretch, bicep stretch, foam roll upper back',
    },

    // ---- Day 30: W5 · Legs — Power ----
    {
      day: 'Day 30',
      title: 'W5 · Legs — Power',
      warmup: '5 min: foam roll, leg swings, bodyweight squats, 5 box jumps (medium height — focus on landing mechanics)',
      duration: '55 min',
      exercises: [
        {
          name: 'Box Jump',
          sets: 4,
          reps: '5',
          rest: '2:00',
          cues: 'Pure power. Quick dip, explosive jump, stick the landing. Step down — don\'t jump down. Recover between reps. This is about rate of force development.',
        },
        {
          name: 'Box Squat',
          sets: 4,
          reps: '3',
          rest: '2:30',
          cues: 'Heavy but fast. ~80% of your squat. Sit, pause, explode. The bar should move fast. If it\'s slow, the weight is too heavy for power day.',
        },
        {
          name: 'Speed Trap Bar Deadlift',
          sets: 5,
          reps: '2',
          rest: '2:00',
          cues: '~70% of your max. These are speed pulls — the bar should fly off the floor. Full lockout, full reset. Every rep is as fast as possible. This trains your nervous system.',
        },
        {
          name: 'Leg Press',
          sets: 3,
          reps: '10',
          rest: '1:30',
          cues: 'Moderate weight. Full depth. This is support volume. Don\'t wreck your legs before test week.',
        },
        {
          name: 'Seated Calf Raise',
          sets: 3,
          reps: '15',
          rest: '1:00',
          cues: 'Moderate weight. Full range. Maintenance. Full stretch, full squeeze.',
        },
        {
          name: 'Hanging Leg Raise',
          sets: 3,
          reps: '12',
          rest: '1:00',
          cues: 'Legs to parallel or higher. No swinging. Control the negative. Keep the core strong heading into the final week.',
        },
      ],
      cooldown: '5 min: quad stretch, hamstring stretch, hip flexor stretch, child\'s pose',
    },

    // =====================================================================
    // WEEK 6 — REALIZATION / TEST WEEK
    // Test your strength. Work up to new rep maxes on the big three.
    // Lower total sets. Volume days are pure deload support.
    // Power day is explosive finisher work.
    // =====================================================================

    // ---- Day 31: W6 · Push — Strength (TEST DAY) ----
    {
      day: 'Day 31',
      title: 'W6 · Push — Strength',
      warmup: '8 min: thorough warm-up. Band pull-aparts, arm circles, push-up walkouts, rotator cuff work, then progressive bench sets: bar x10, 50% x5, 65% x3, 75% x2, 85% x1',
      duration: '60 min',
      exercises: [
        {
          name: 'Bench Press — Work to New 3RM',
          sets: 6,
          reps: '3-2-1-1-3-3',
          rest: '3:00',
          cues: 'This is the day. Work up: hit a solid triple at ~85%, then a double at ~90%, then go for a heavy single or new 1RM if it\'s there. Then drop to ~85% for 2 backdown triples. Trust your training. Stay tight. You earned this.',
        },
        {
          name: 'Overhead Press — Heavy Triple',
          sets: 3,
          reps: '3',
          rest: '2:30',
          cues: 'Work up to a heavy triple. Strict press. This should be the heaviest strict press you\'ve ever hit for 3. Lock out hard.',
        },
        {
          name: 'Close-Grip Bench Press',
          sets: 3,
          reps: '5',
          rest: '1:30',
          cues: 'Moderate-heavy. Supporting work. Don\'t empty the tank here — you already tested on bench. 5 clean reps.',
        },
        {
          name: 'Dumbbell Lateral Raise',
          sets: 3,
          reps: '12',
          rest: '1:00',
          cues: 'Light to moderate. Keep the shoulders moving and healthy. Easy pump work to finish.',
        },
        {
          name: 'Cable Tricep Pushdown',
          sets: 3,
          reps: '10',
          rest: '1:00',
          cues: 'Light pump work. Full extension, full squeeze. You\'re just keeping blood flowing. Today was about the bench.',
        },
      ],
      cooldown: '5 min: chest stretch, shoulder stretch, tricep stretch. Take note of your new bench numbers.',
    },

    // ---- Day 32: W6 · Pull — Strength (TEST DAY) ----
    {
      day: 'Day 32',
      title: 'W6 · Pull — Strength',
      warmup: '8 min: thorough warm-up. Band pull-aparts, cat-cow, dead hangs, then progressive deadlift sets: 135 x5, 50% x5, 65% x3, 75% x2, 85% x1',
      duration: '60 min',
      exercises: [
        {
          name: 'Barbell Deadlift — Work to New 3RM',
          sets: 6,
          reps: '3-2-1-1-3-3',
          rest: '3:00',
          cues: 'Test day. Work up: triple at ~85%, double at ~90%, then go for a heavy single or new 1RM. Then 2 backdown triples at ~85%. Perfect setup on every rep. Flat back, big brace, push the floor away. Record your numbers.',
        },
        {
          name: 'Weighted Pull-Ups — Heavy Triple',
          sets: 3,
          reps: '3',
          rest: '2:30',
          cues: 'Work to the heaviest triple you can hit cleanly. Full dead hang, chin over bar. Slow negative. This is your pulling strength benchmark.',
        },
        {
          name: 'Barbell Bent-Over Row',
          sets: 3,
          reps: '5',
          rest: '2:00',
          cues: 'Moderate-heavy. 45-degree torso. Pull to the lower chest. Supporting work — don\'t burn out after the deadlift test.',
        },
        {
          name: 'Cable Face Pull',
          sets: 3,
          reps: '15',
          rest: '1:00',
          cues: 'Light. Shoulder health work. Pull, rotate, hold. Keep the rear delts and rotator cuffs happy.',
        },
        {
          name: 'Barbell Curl',
          sets: 3,
          reps: '8',
          rest: '1:00',
          cues: 'Moderate. Easy pump work. Strict form, squeeze at the top. Celebrate the work you\'ve done on your pulls.',
        },
      ],
      cooldown: '5 min: lat stretch, bicep stretch, lower back stretch. Record your new deadlift numbers.',
    },

    // ---- Day 33: W6 · Legs — Strength (TEST DAY) ----
    {
      day: 'Day 33',
      title: 'W6 · Legs — Strength',
      warmup: '8 min: thorough warm-up. Bodyweight squats, leg swings, glute bridges, then progressive squat sets: bar x10, 50% x5, 65% x3, 75% x2, 85% x1',
      duration: '60 min',
      exercises: [
        {
          name: 'Barbell Back Squat — Work to New 3RM',
          sets: 6,
          reps: '3-2-1-1-3-3',
          rest: '3:00',
          cues: 'This is the day. Work up: triple at ~85%, double at ~90%, then go for a heavy single or new 1RM if it\'s there. Then 2 backdown triples at ~85%. Big breath, brace hard, break parallel. Everything you\'ve built comes together right here.',
        },
        {
          name: 'Front Squat — Heavy Triple',
          sets: 3,
          reps: '3',
          rest: '2:30',
          cues: 'Work to a heavy triple. Elbows high, core tight. This should be a front squat PR for 3 reps. Stay clean or it doesn\'t count.',
        },
        {
          name: 'Barbell Hip Thrust',
          sets: 3,
          reps: '8',
          rest: '1:30',
          cues: 'Moderate weight. Supporting work. Full hip extension, 1-second squeeze. Keep the glutes active without crushing yourself.',
        },
        {
          name: 'Leg Curl',
          sets: 3,
          reps: '10',
          rest: '1:15',
          cues: 'Moderate. Squeeze at the top, 3-second negative. Balance work for the hamstrings.',
        },
        {
          name: 'Standing Calf Raise',
          sets: 3,
          reps: '15',
          rest: '1:00',
          cues: 'Light-moderate. Full range. Easy finish. The squat was the main event today.',
        },
      ],
      cooldown: '5 min: pigeon stretch, quad stretch, hamstring stretch. Record your new squat numbers. That\'s the big three done.',
    },

    // ---- Day 34: W6 · Push — Volume (DELOAD) ----
    {
      day: 'Day 34',
      title: 'W6 · Push — Volume',
      warmup: '5 min: band pull-aparts, arm circles, light push-ups',
      duration: '45 min',
      exercises: [
        {
          name: 'Dumbbell Bench Press',
          sets: 3,
          reps: '10',
          tempo: '3-1-1-0',
          rest: '1:30',
          cues: 'Deload volume. Light to moderate weight. Focus on the stretch and squeeze. Your chest is recovering from test day. Move blood, don\'t chase load.',
        },
        {
          name: 'Dumbbell Arnold Press',
          sets: 3,
          reps: '10',
          rest: '1:30',
          cues: 'Light to moderate. Full rotation, full lockout. Easy pump work for the shoulders. Enjoy the movement.',
        },
        {
          name: '1a. Cable Fly',
          sets: 3,
          reps: '12',
          rest: '0:00',
          cues: 'Light weight. Squeeze at the peak. Blood flow for recovery. Superset with front raises.',
        },
        {
          name: '1b. Dumbbell Front Raise',
          sets: 3,
          reps: '12',
          rest: '1:00',
          cues: 'Light. Thumbs up, eye level. Controlled reps. Easy finish.',
        },
        {
          name: 'Overhead Tricep Extension',
          sets: 3,
          reps: '12',
          rest: '1:00',
          cues: 'Light. Full stretch, full extension. Keep the triceps moving and mobile. Recovery volume.',
        },
      ],
      cooldown: '5 min: chest stretch, shoulder stretch, tricep stretch',
    },

    // ---- Day 35: W6 · Pull — Volume (DELOAD) ----
    {
      day: 'Day 35',
      title: 'W6 · Pull — Volume',
      warmup: '5 min: band pull-aparts, scap push-ups, cat-cow, light cable rows',
      duration: '45 min',
      exercises: [
        {
          name: 'Chest-Supported Dumbbell Row',
          sets: 3,
          reps: '10',
          rest: '1:30',
          cues: 'Light to moderate. Pull to the hip, squeeze for a second. Recovery volume. Move blood through the back.',
        },
        {
          name: 'Lat Pulldown',
          sets: 3,
          reps: '10',
          rest: '1:30',
          cues: 'Light to moderate. Standard grip. Pull to the upper chest, squeeze the lats. Smooth, controlled reps.',
        },
        {
          name: '1a. Seated Cable Row',
          sets: 3,
          reps: '12',
          rest: '0:00',
          cues: 'Light. Pull to the belly, shoulder blades together. Superset with reverse flys.',
        },
        {
          name: '1b. Reverse Fly',
          sets: 3,
          reps: '15',
          rest: '1:00',
          cues: 'Light. Hold the peak for a second. Rear delt and posture work. Easy reps.',
        },
        {
          name: 'Incline Dumbbell Curl',
          sets: 3,
          reps: '10',
          rest: '1:00',
          cues: 'Light. Full stretch, full contraction. Enjoy the pump. Your pulling muscles are recovering from test day.',
        },
      ],
      cooldown: '5 min: lat stretch, bicep stretch, foam roll upper back. Almost done.',
    },

    // ---- Day 36: W6 · Legs — Power (FINAL SESSION) ----
    {
      day: 'Day 36',
      title: 'W6 · Legs — Power',
      warmup: '5 min: foam roll, leg swings, bodyweight squats, 5 box jumps (medium — focus on explosiveness and clean landings)',
      duration: '50 min',
      exercises: [
        {
          name: 'Box Jump',
          sets: 5,
          reps: '3',
          rest: '2:00',
          cues: 'Pure explosive power. Quick dip, max effort jump. Stick the landing. Step down, don\'t jump down. Recover fully between reps. This is about being athletic.',
        },
        {
          name: 'Speed Deadlift',
          sets: 5,
          reps: '2',
          rest: '1:30',
          cues: 'Conventional barbell. ~60% of your new 1RM. These are speed pulls — the bar should fly. Maximum force production off the floor. Full lockout, full reset. Celebrate how fast this weight moves now.',
        },
        {
          name: 'Leg Press',
          sets: 3,
          reps: '10',
          rest: '1:30',
          cues: 'Moderate weight. Full depth. Easy volume to finish the program. Your legs have been through a war — give them some easy work.',
        },
        {
          name: 'Bulgarian Split Squat',
          sets: 3,
          reps: '8 each',
          rest: '1:30',
          cues: 'Moderate dumbbells. Rear foot on bench, drop straight down. Clean reps. Maintain that unilateral strength you built.',
        },
        {
          name: 'Seated Calf Raise',
          sets: 3,
          reps: '15',
          rest: '1:00',
          cues: 'Light to moderate. Full stretch, full squeeze. Last set of calves in the program. Make them count.',
        },
        {
          name: 'Ab Wheel Rollout',
          sets: 3,
          reps: '10',
          rest: '1:00',
          cues: 'Full extension if you\'ve earned it. Core braced, no sagging. This is the last exercise of the program. Leave it all on the floor. You showed up for 36 days and got stronger — that\'s what being Called to Compete means.',
        },
      ],
      cooldown: '10 min: full body stretch — quads, hamstrings, hip flexors, chest, shoulders, lats. You just finished a serious strength program. Record your final numbers, compare them to Week 1, and be proud of the work.',
    },
  ],
}
