import type { Program } from './programs'

export const strengthProgram: Program = {
  id: 'strength',
  name: 'CTC Strength',
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
      warmup: '5 min to wake up your chest and shoulders before you press heavy. Band pull-aparts: hold a light band with both hands out in front of your chest, arms straight, and pull it apart until it touches your chest — squeeze your shoulder blades together each time, 15 reps. Arm circles: arms straight out to your sides, make small circles — 15 forward, 15 backward. Push-up walkouts: stand tall, bend forward and walk your hands out on the floor until you\'re in push-up position, do 1 push-up, then walk your hands back to your feet and stand up — 5 reps. Rotator cuff external rotations: elbow bent 90 degrees and glued to your side, holding a light band or light dumbbell, rotate your forearm outward away from your body and back in — 15 each arm.',
      duration: '65 min',
      exercises: [
        {
          name: 'Bench Press',
          sets: 5,
          reps: '5',
          rest: '3:00',
          cues: 'Lie on the bench and slightly arch your upper back — think "proud chest" — but keep your lower back flat on the bench, not arched. Pull your shoulder blades down and together like you\'re tucking them into your back pockets — this gives you a stable base. Lower the bar under control until it touches the middle of your chest, then drive it straight back up hard. You should feel this mostly in your chest, with help from your shoulders and the backs of your upper arms. This is your baseline weight for the whole program — pick a weight you can complete all 5 sets of 5 with good form, not one you\'re fighting to finish.',
        },
        {
          name: 'Overhead Press',
          sets: 4,
          reps: '6',
          rest: '2:30',
          cues: 'Stand with feet shoulder-width apart, bar resting on your upper chest, hands just outside shoulder width — no leg bend or push to help you here, your shoulders do all the work. Squeeze your glutes and brace your stomach like someone\'s about to poke you in the gut — this keeps your lower back safe. Press the bar straight up close to your face, and once it clears your forehead, push your head through so you finish with the bar directly over your ears, arms fully locked out. You\'ll feel this in your shoulders and the backs of your arms.',
        },
        {
          name: 'Close-Grip Bench Press',
          sets: 3,
          reps: '8',
          rest: '1:30',
          cues: 'Same setup as bench press, but bring your hands in to about shoulder-width instead of wide. Keep your elbows tucked close to your ribs as you lower the bar to your chest, then press it back up. Because your hands are closer together, the back of your upper arm (triceps) does more of the work — that\'s exactly the point. This builds the lockout strength that finishes a heavy bench press rep.',
        },
        {
          name: 'Incline Dumbbell Bench Press',
          sets: 3,
          reps: '10',
          rest: '1:30',
          cues: 'Set the bench to a slight incline — about 30 degrees, like a lounge chair, not sitting straight up. Press two dumbbells up until your arms are straight over your upper chest, then lower them slowly until you feel a full stretch across your chest, elbows dropping just below bench level. Squeeze your chest hard at the top before lowering again. Control the weight on the way down instead of letting it drop.',
        },
        {
          name: 'Dumbbell Lateral Raise',
          sets: 4,
          reps: '12',
          rest: '1:00',
          cues: 'Stand holding a light dumbbell in each hand at your sides. With a slight bend in your elbows, raise both arms out to the sides — lead with your elbows, not your hands, like you\'re pouring water out of two cans — until your arms are about level with your shoulders, no higher. Lower back down slowly over a full 2 seconds. You should feel this on the side of your shoulder, not your neck or traps.',
        },
        {
          name: 'Cable Tricep Pushdown',
          sets: 3,
          reps: '12',
          rest: '1:00',
          cues: 'Stand facing a cable machine with a bar or rope attached at head height. Pin your elbows to your sides and keep them glued there the whole set. Push the bar straight down until your arms are fully extended, squeeze the back of your upper arms hard at the bottom, then let the bar rise back up under control. If your elbows drift away from your body, the weight is too heavy.',
        },
      ],
      cooldown: '5 min: doorway chest stretch (stand in a doorway, forearm on the frame at shoulder height, gently lean forward until you feel a stretch across your chest — 30 sec each side), cross-body shoulder stretch (pull one straight arm across your chest with your other arm, 30 sec each side), overhead tricep stretch (raise one arm overhead, bend the elbow so your hand drops behind your head, use your other hand to gently press the elbow back — 30 sec each side).',
    },

    // ---- Day 2: W1 · Pull — Strength ----
    {
      day: 'Day 2',
      title: 'W1 · Pull — Strength',
      warmup: '5 min to prep your back and grip before pulling heavy. Band pull-aparts: 15 reps, pulling a light band apart at chest height. Cat-cow: on hands and knees, arch your back up toward the ceiling like a scared cat, then let it sag down while lifting your chest — 10 slow reps, this loosens up your spine. Dead hangs: hang from a pull-up bar with straight arms for 30 seconds — this opens up your shoulders and back and warms up your grip. Scap retractions on the bar: still hanging, without bending your elbows, pull your shoulder blades down and together so your body rises an inch or two, then relax back down — 10 reps. This teaches your back muscles to fire before you add a pull-up.',
      duration: '60 min',
      exercises: [
        {
          name: 'Barbell Deadlift',
          sets: 5,
          reps: '5',
          rest: '3:00',
          cues: 'Stand with the bar over the middle of your feet, shins almost touching it. Bend down and grab the bar just outside your legs, keeping your back flat (not rounded) — chest up, like you\'re trying to show someone the logo on your shirt. Take a big breath into your belly and brace your core like you\'re about to take a punch. Stand up by pushing the floor away with your legs — don\'t think about pulling with your arms, your arms are just hooks. Finish by squeezing your glutes and locking your hips and knees straight at the same time. This works your entire back side — glutes, hamstrings, and back. Set your baseline weight today: something you can lift for 5 clean sets of 5.',
        },
        {
          name: 'Weighted Pull-Ups',
          sets: 4,
          reps: '6',
          rest: '2:30',
          cues: 'Hang from the bar with a full dead hang — arms completely straight. Pull yourself up by driving your elbows down toward your hips, thinking about using your back muscles (lats), not your biceps, until your chin clears the bar. Lower yourself back down slowly, taking a full 3 seconds, all the way to a dead hang before the next rep. Once you can do all 6 reps clean with just your bodyweight, start adding a small amount of weight with a dip belt or a weight held between your feet.',
        },
        {
          name: 'Barbell Bent-Over Row',
          sets: 4,
          reps: '8',
          rest: '2:00',
          cues: 'Hold the bar with hands shoulder-width apart, bend forward at the hips until your torso is at about a 45-degree angle (halfway between standing and bent all the way over), knees slightly bent, back flat. Pull the bar up toward your lower chest/upper stomach, driving your elbows back and squeezing your shoulder blades together for a full second at the top. Lower it back down under control. Don\'t use your legs or lower back to heave the weight up — that\'s your back muscles cheating themselves out of the work.',
        },
        {
          name: 'Cable Face Pull',
          sets: 3,
          reps: '15',
          rest: '1:00',
          cues: 'Set a rope attachment at about face height on a cable machine. Grab both ends and pull the rope toward your face, splitting your hands apart as it arrives so your elbows flare out wide and your hands end up beside your ears. You should feel this in the back of your shoulders and upper back — it should burn a little by the end. This exercise protects your shoulders from injury as you lift heavier — never skip it, even when you\'re tired.',
        },
        {
          name: 'Barbell Curl',
          sets: 3,
          reps: '10',
          rest: '1:00',
          cues: 'Stand holding the bar with an underhand grip, hands shoulder-width apart, elbows pinned to your sides. Curl the bar up by bending your elbows only — no swinging your hips or leaning back to help it up. Squeeze your biceps at the top, then lower the bar slowly over 2 seconds. If your elbows are drifting forward or your back is swaying, drop the weight.',
        },
        {
          name: 'Dumbbell Hammer Curl',
          sets: 3,
          reps: '12',
          rest: '1:00',
          cues: 'Hold a dumbbell in each hand with your thumbs pointing up (like you\'re holding a hammer, not palms facing forward). Keeping your elbows locked at your sides, curl both weights up toward your shoulders, then lower slowly. This works the muscle on the side of your upper arm that makes your arm look thick from the front — a different muscle than the regular curl targets.',
        },
      ],
      cooldown: '5 min: lat hang stretch (hang from a bar or doorframe with straight arms, let your back stretch out for 30 sec), bicep wall stretch (place your palm flat on a wall behind you, arm straight, and gently turn your body away until you feel a stretch down the front of your arm — 30 sec each side), seated lower back twist (sit with legs out, cross one foot over the opposite knee, twist your torso toward that knee — 30 sec each side).',
    },

    // ---- Day 3: W1 · Legs — Strength ----
    {
      day: 'Day 3',
      title: 'W1 · Legs — Strength',
      warmup: '5 min to get your legs and hips ready to squat heavy. Bodyweight squats: 15 reps with no weight, going as low as feels comfortable, just to get the motion moving. Leg swings (front/side): hold onto a wall for balance, swing one leg forward and back 10 times, then side to side 10 times, then switch legs — this loosens your hips. Hip circles: stand with hands on hips and make big circles with your hips, 10 each direction, like a hula hoop. Glute bridges: lie on your back, knees bent, feet flat, push your hips up toward the ceiling squeezing your glutes at the top, 15 reps — this wakes up your glutes so they help (not your lower back). Foam roll quads: roll the front of your thighs on a foam roller for 1 minute.',
      duration: '65 min',
      exercises: [
        {
          name: 'Barbell Back Squat',
          sets: 5,
          reps: '5',
          rest: '3:00',
          cues: 'Set the bar across your upper back (not your neck), feet about shoulder-width apart, toes turned out slightly. Take a big breath into your belly and brace your stomach hard — like someone\'s about to punch you. Bend at your hips and knees at the same time, sitting your hips back and down like you\'re sitting into a low chair, keeping your chest up and proud the whole way down. Go down until your hip crease is at or below your knee, then drive back up by pushing the floor away with your whole foot. You\'ll feel this in your quads, glutes, and hamstrings. This is your baseline — find a weight you can hit for a clean 5x5.',
        },
        {
          name: 'Front Squat',
          sets: 3,
          reps: '6',
          rest: '2:30',
          cues: 'The bar rests on the front of your shoulders instead of your back, elbows lifted high in front of you (almost parallel to the floor) to create a shelf for the bar. Keep your upper back tight and your elbows up the entire squat — if your elbows drop, the bar will roll off your shoulders. Sit straight down between your hips, staying as upright as possible, then drive through your heels to stand. This hits your quads even harder than a back squat because of the upright torso position.',
        },
        {
          name: 'Barbell Hip Thrust',
          sets: 4,
          reps: '10',
          rest: '1:30',
          cues: 'Sit on the ground with your upper back resting against a bench, a barbell rolled over your hips (pad it with a towel or barbell pad), feet flat on the floor. Drive your hips straight up toward the ceiling by pushing through your heels, squeezing your glutes hard for a full second at the top, then lower back down under control. Don\'t arch your lower back to get extra height — the movement should come from your hips, not your spine. This directly targets your glutes, the biggest muscle in your body.',
        },
        {
          name: 'Walking Lunge',
          sets: 3,
          reps: '10 each',
          rest: '1:30',
          cues: 'Hold a dumbbell in each hand at your sides. Step forward into a long stride, lowering your back knee toward the floor (don\'t slam it down) while keeping your torso upright — don\'t lean forward. Push through your front heel to stand up and step into your next stride with the other leg. Keep walking forward, alternating legs. You\'ll feel this in your quads and glutes, especially the leading leg.',
        },
        {
          name: 'Leg Curl',
          sets: 3,
          reps: '12',
          rest: '1:15',
          cues: 'Lie face down on the leg curl machine, pads resting just above your heels. Curl your heels up toward your glutes by bending your knees, squeezing your hamstrings hard at the top. Lower back down slowly over 3 seconds — don\'t just let the weight slam back down. This works the back of your thigh, the muscle group that balances out all the squatting.',
        },
        {
          name: 'Standing Calf Raise',
          sets: 4,
          reps: '15',
          rest: '1:00',
          cues: 'Stand on the edge of a step or calf raise machine with your heels hanging off the back. Let your heels drop down as far as comfortable to feel a full stretch, then rise up onto your toes as high as you can, pausing for 1 second at the top before lowering again. Don\'t rush these — a slow, controlled rep builds your calves better than a fast bouncy one.',
        },
      ],
      cooldown: '5 min: pigeon stretch (from all fours, bring one knee forward and turn it out to the side, back leg stretched behind you, lower your chest toward the floor — 30 sec each side, this opens the hips), standing quad stretch (grab one ankle behind you and pull your heel toward your glutes — 30 sec each side), seated hamstring stretch (sit with one leg straight out, reach toward your toes — 30 sec each side).',
    },

    // ---- Day 4: W1 · Push — Volume ----
    {
      day: 'Day 4',
      title: 'W1 · Push — Volume',
      warmup: '5 min to loosen up the chest and shoulders before higher-rep pressing. Band pull-aparts: 15 reps. Arm circles: 15 each direction. Light push-ups: 10 reps, slow and controlled, just to prime the chest. Shoulder dislocates with a band: hold a light band with a wide overhand grip, arms straight, and slowly raise it up and over your head to behind your back, then bring it back over — 10 slow reps, this improves shoulder mobility for overhead pressing.',
      duration: '55 min',
      exercises: [
        {
          name: 'Dumbbell Bench Press',
          sets: 4,
          reps: '10',
          tempo: '3-1-1-0',
          rest: '1:30',
          cues: 'Lie on a flat bench holding a dumbbell in each hand at chest level. Lower the dumbbells slowly, taking 3 full seconds, letting your chest open up until you feel a good stretch, pause for 1 second at the bottom, then press them back up in 1 second, squeezing the dumbbells together at the top like you\'re trying to touch them. The slow lowering (tempo) is the whole point of this exercise — it builds strength and muscle by keeping tension on your chest longer.',
        },
        {
          name: 'Dumbbell Arnold Press',
          sets: 4,
          reps: '10',
          rest: '1:30',
          cues: 'Sit or stand holding dumbbells at shoulder height with your palms facing you (like you just finished a curl). As you press the dumbbells overhead, rotate your palms to face forward, finishing with arms locked out and palms away from you. Reverse the rotation as you lower back down. This twisting motion works all three parts of your shoulder muscle instead of just the front.',
        },
        {
          name: '1a. Cable Fly',
          sets: 3,
          reps: '12',
          rest: '0:00',
          cues: 'Stand between two cable towers with a handle in each hand, arms out to your sides with a slight bend in the elbows that you lock in place for the whole set (don\'t let your elbows bend more as you go). Bring your hands together in front of your chest in a hugging motion, squeezing your chest at the point where your hands meet, then let your arms open back out slowly to feel a stretch. This is a superset — go straight into the front raise below with no rest.',
        },
        {
          name: '1b. Dumbbell Front Raise',
          sets: 3,
          reps: '12',
          rest: '1:00',
          cues: 'Hold a light dumbbell in each hand in front of your thighs, thumbs pointing up. Raise one or both arms straight out in front of you to about eye level, keeping a slight bend in the elbow, then lower slowly — don\'t swing the weight up using your back. This targets the front of your shoulder. Rest 1:00 after completing both exercises in the superset.',
        },
        {
          name: 'Overhead Tricep Extension',
          sets: 3,
          reps: '12',
          rest: '1:00',
          cues: 'Hold one dumbbell with both hands behind your head, elbows pointing straight up toward the ceiling (not flared out to the sides). Extend your arms to lift the dumbbell straight up overhead, then lower it back down behind your head slowly until you feel a good stretch in the back of your upper arm. Keep your elbows still the whole time — only your forearms should move.',
        },
        {
          name: 'Push-Up — Burnout',
          sets: 2,
          reps: 'Max reps',
          rest: '1:00',
          cues: 'Hands just outside shoulder-width, body in a straight line from head to heels. Lower your chest all the way to the floor on every single rep — no half reps — then push back up. When your form starts to break down on your toes, drop to your knees and keep going until you truly can\'t do another rep. This is the last exercise of the day — empty the tank.',
        },
      ],
      cooldown: '5 min: doorway chest stretch (30 sec each side), shoulder cross-body stretch (pull one straight arm across your chest, 30 sec each side), wrist circles (rotate both wrists 10 times each direction — your wrists took a beating today from all the pressing).',
    },

    // ---- Day 5: W1 · Pull — Volume ----
    {
      day: 'Day 5',
      title: 'W1 · Pull — Volume',
      warmup: '5 min to prep your back for higher-rep pulling. Band pull-aparts: 15 reps. Scap push-ups: start in a push-up plank position with straight arms, without bending your elbows let your shoulder blades pinch together (chest drops slightly) then push the floor away to spread them apart — 10 reps, this activates your upper back. Cat-cow: 10 slow reps to loosen your spine. Light cable rows: 15 reps with a very light weight on the cable row machine, just to get blood into your back muscles.',
      duration: '55 min',
      exercises: [
        {
          name: 'Chest-Supported Dumbbell Row',
          sets: 4,
          reps: '10',
          rest: '1:30',
          cues: 'Set an incline bench to about a 30-45 degree angle and lie face-down on it, chest flat against the pad, a dumbbell in each hand hanging straight down. Pull both dumbbells up toward your hips, driving your elbows back and squeezing your back muscles together for a full second at the top. Because your chest is supported by the bench, you can\'t cheat with your lower back — every ounce of the work goes straight to your back muscles.',
        },
        {
          name: 'Lat Pulldown',
          sets: 4,
          reps: '10',
          rest: '1:30',
          cues: 'Sit at the lat pulldown machine, grab the bar with hands wider than shoulder-width. Lean back very slightly and pull the bar down to your upper chest by driving your elbows down and back — imagine trying to put your elbows into your back pockets. Squeeze your back muscles (lats) hard at the bottom, then let the bar rise back up under control until your arms are straight.',
        },
        {
          name: '1a. Seated Cable Row',
          sets: 3,
          reps: '12',
          rest: '0:00',
          cues: 'Sit at the cable row machine with knees slightly bent, feet braced on the platform. Pull the handle toward your belly button, keeping your chest tall and upright — don\'t round forward to reach the handle or lean back to yank it in. Squeeze your shoulder blades together at the end of the pull before returning under control. This is a superset — move straight into reverse flys with no rest between.',
        },
        {
          name: '1b. Reverse Fly',
          sets: 3,
          reps: '15',
          rest: '1:00',
          cues: 'Bend forward at the hips (or lie face-down on an incline bench) holding a light dumbbell in each hand, arms hanging down with a slight bend in the elbows. Raise both arms out to the sides until they\'re about level with your shoulders, squeezing your shoulder blades together, then lower slowly. You\'ll feel this in the back of your shoulders — it should burn a bit by the last few reps. Rest 1:00 after finishing the superset.',
        },
        {
          name: '2a. Incline Dumbbell Curl',
          sets: 3,
          reps: '10',
          rest: '0:00',
          cues: 'Sit on a bench set to about 45 degrees, letting your arms hang straight down behind you for a deep stretch at the bottom of each rep. Curl the dumbbells up toward your shoulders with control — don\'t use momentum or swing them up. This position stretches your biceps more than a standing curl, which builds more muscle over time. Superset straight into concentration curls with no rest.',
        },
        {
          name: '2b. Concentration Curl',
          sets: 3,
          reps: '10 each',
          rest: '1:00',
          cues: 'Sit on a bench, brace the back of your upper arm against your inner thigh on the same side, and let the dumbbell hang straight down. Curl it up toward your shoulder, squeeze at the top and hold for a beat, then lower slowly. Bracing your arm against your leg removes any chance of cheating with momentum — it\'s pure bicep work. Do all reps on one arm, then switch.',
        },
      ],
      cooldown: '5 min: lat hang stretch (hang from a bar with straight arms, 30 sec), bicep wall stretch (palm flat on a wall behind you, gently rotate away — 30 sec each side), foam roll upper back (roll your upper back over a foam roller for 1 minute).',
    },

    // ---- Day 6: W1 · Legs — Power ----
    {
      day: 'Day 6',
      title: 'W1 · Legs — Power',
      warmup: '5 min to get your nervous system firing before explosive work. Foam roll quads and glutes: 1 minute each. Leg swings: 10 forward/back and 10 side to side, each leg. Bodyweight squats: 15 reps. 3 low box jumps: step up onto a low, sturdy box or step (6-12 inches), then step back down — just get the pattern moving, don\'t go max effort yet, this primes your nervous system for the power work ahead.',
      duration: '60 min',
      exercises: [
        {
          name: 'Box Squat',
          sets: 4,
          reps: '5',
          rest: '2:30',
          cues: 'Set a box or bench behind you at a height where your hip crease is level with or slightly below your knee when you sit on it. Squat down under control and sit your hips back onto the box (don\'t just plop down and relax) — pause there for 1 full second with your muscles still tight, then explode back up as fast as you can. Keep your shins as vertical as possible the whole time. This teaches your body to generate power from a dead stop, like starting a car from a red light.',
        },
        {
          name: 'Trap Bar Deadlift',
          sets: 4,
          reps: '5',
          rest: '2:30',
          cues: 'Stand inside the trap bar (a hexagon-shaped bar you step into), handles at your sides, feet hip-width apart. Grip the handles with a neutral grip (palms facing each other), hips back, chest up. Push the floor away with your legs to stand up — don\'t pull with your arms or round your back. Lock out hard at the top by squeezing your glutes, then reset your whole position (re-brace, re-grip) before every single rep instead of bouncing into the next one.',
        },
        {
          name: 'Leg Press',
          sets: 4,
          reps: '12',
          rest: '1:30',
          cues: 'Sit in the leg press machine with your feet flat on the platform, about shoulder-width apart. Lower the platform toward you with control until your knees are bent deeply, but keep your lower back flat against the pad the entire time — if your hips start to lift off the seat, you\'ve gone too deep. Push through your whole foot (not just your toes) to press the platform back up.',
        },
        {
          name: 'Bulgarian Split Squat',
          sets: 3,
          reps: '10 each',
          rest: '1:30',
          cues: 'Stand a couple feet in front of a bench, rest the top of one foot behind you on the bench. Drop straight down by bending your front knee until your back knee nearly touches the floor, keeping your front knee tracking over your toes (not caving inward). Drive through your front heel to stand back up. This single-leg exercise builds strength and balance evenly on both sides — do all reps on one leg before switching.',
        },
        {
          name: 'Seated Calf Raise',
          sets: 4,
          reps: '15',
          rest: '1:00',
          cues: 'Sit at the seated calf raise machine with the pads resting on your lower thighs, balls of your feet on the platform. Let your heels drop down as far as comfortable for a full stretch, then push up onto your toes as high as you can and hold the squeeze for a second. Take your time with these — slow, controlled reps build up the smaller calf muscle (soleus) that gives your calf its width.',
        },
        {
          name: 'Ab Wheel Rollout',
          sets: 3,
          reps: '10',
          rest: '1:00',
          cues: 'Kneel on the floor holding an ab wheel with both hands. Brace your core hard, then slowly roll the wheel forward, keeping your hips from sagging toward the floor — your body should stay in a straight line from your knees to your shoulders. Only roll out as far as you can control, then pull back to the start using your abs, not your arms. If your lower back starts to arch, you\'ve rolled out too far — pull back sooner next time.',
        },
      ],
      cooldown: '5 min: standing quad stretch (grab your ankle behind you, pull heel to glutes — 30 sec each side), seated hamstring stretch (leg straight out, reach for your toes — 30 sec each side), hip flexor stretch (kneel in a lunge position, push your hips forward — 30 sec each side).',
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
      warmup: '5 min: band pull-aparts (15 reps, pulling a light band apart at chest height), arm circles (15 each direction), push-up walkouts (bend forward, walk your hands out to a push-up position, do 1 push-up, walk back and stand — 5 reps), shoulder external rotations (elbow bent 90 degrees at your side, rotate your forearm out and back with a light band or dumbbell — 15 each arm).',
      duration: '65 min',
      exercises: [
        {
          name: 'Bench Press',
          sets: 5,
          reps: '5',
          rest: '3:00',
          cues: 'Add 5 lbs to last week\'s weight. Same form as last week: arch your upper back slightly, pull your shoulder blades together and down, lower the bar to the middle of your chest under control, then drive it back up hard. If you hit all 25 reps clean last week (5 sets of 5), you\'ve earned this small jump — if last week felt like a grind, repeat that weight instead.',
        },
        {
          name: 'Overhead Press',
          sets: 4,
          reps: '6',
          rest: '2:30',
          cues: 'Same weight as last week, or add 5 lbs if it felt comfortable. Strict press — no leg bend to help you. Squeeze your glutes, brace your stomach, and press the bar in a straight line up and over your head until your arms lock out directly above your ears.',
        },
        {
          name: 'Close-Grip Bench Press',
          sets: 3,
          reps: '8',
          rest: '1:30',
          cues: 'Add 5 lbs, or aim for one extra rep on each set if you\'d rather build reps first. Hands shoulder-width apart, elbows tucked tight to your ribs the whole way down and up. This is building the lockout strength — the last few inches of a heavy bench press — so keep the bar path smooth and controlled.',
        },
        {
          name: 'Incline Dumbbell Bench Press',
          sets: 3,
          reps: '10',
          rest: '1:30',
          cues: 'Move up to the next dumbbell size if last week\'s set of 10 felt easy. Full range of motion — lower until you feel a stretch across your chest, then squeeze hard at the top of every rep.',
        },
        {
          name: 'Dumbbell Lateral Raise',
          sets: 4,
          reps: '12',
          rest: '1:00',
          cues: 'Same weight as last week — this week is about making every rep look perfect. Lead with your elbows, raise to shoulder height, pause a beat at the top, and own the slow lowering on the way back down.',
        },
        {
          name: 'Cable Tricep Pushdown',
          sets: 3,
          reps: '15',
          rest: '1:00',
          cues: 'Bump the reps up to 15 this week instead of adding weight. Full extension at the bottom, full squeeze in your triceps, elbows locked to your sides. Chase the burning, pumped feeling — that\'s blood flowing into the muscle and doing its job.',
        },
      ],
      cooldown: '5 min: doorway chest stretch (30 sec each side), cross-body shoulder stretch (30 sec each side), overhead tricep stretch (30 sec each side).',
    },

    // ---- Day 8: W2 · Pull — Strength ----
    {
      day: 'Day 8',
      title: 'W2 · Pull — Strength',
      warmup: '5 min: band pull-aparts (15 reps), cat-cow (10 slow reps on hands and knees, arching and sagging your back), dead hangs (30 sec hanging from a pull-up bar with straight arms), scap retractions on the bar (still hanging, pull your shoulder blades together so your body rises slightly without bending your elbows, 10 reps).',
      duration: '60 min',
      exercises: [
        {
          name: 'Barbell Deadlift',
          sets: 5,
          reps: '5',
          rest: '3:00',
          cues: 'Add 5–10 lbs to last week. Same setup as before: flat back, bar against your shins, big brace before you pull. Push the floor away with your legs to stand up. Every rep is its own separate lift — reset your whole position (re-grip, re-brace) at the bottom instead of bouncing into the next one.',
        },
        {
          name: 'Weighted Pull-Ups',
          sets: 4,
          reps: '6',
          rest: '2:30',
          cues: 'Add 2.5–5 lbs if you hit all 6 reps clean last week. Full dead hang at the bottom, pull yourself up by driving your elbows down (think lats, not biceps), slow 3-second lowering. If the jump in weight feels like too much, stick with last week\'s weight and aim for 7 reps instead.',
        },
        {
          name: 'Barbell Bent-Over Row',
          sets: 4,
          reps: '8',
          rest: '2:00',
          cues: 'Add 5 lbs. Same 45-degree torso angle as last week — bent forward, back flat. Pull the bar to your lower chest and hold the squeeze at the top for a beat. Your back should be doing the work here, not your arms yanking the bar up.',
        },
        {
          name: 'Cable Face Pull',
          sets: 3,
          reps: '15',
          rest: '1:00',
          cues: 'Same weight as last week — focus on better execution. Pull the rope to your face, splitting your hands apart so your elbows flare wide and your hands land by your ears, rotating outward. Hold the peak position for 2 seconds. Your rear shoulders and rotator cuffs will thank you for this one.',
        },
        {
          name: 'Barbell Curl',
          sets: 3,
          reps: '10',
          rest: '1:00',
          cues: 'Same weight, better reps this week. Zero swinging — if you notice your back leaning to help the bar up, that\'s a sign the weight is too heavy. Squeeze for a full second at the top of every rep.',
        },
        {
          name: 'Dumbbell Hammer Curl',
          sets: 3,
          reps: '12',
          rest: '1:00',
          cues: 'Neutral grip (thumbs up), elbows locked at your sides. Go up 5 lbs if last week felt easy. Slow negative — take 3 full seconds to lower the weight back down each rep.',
        },
      ],
      cooldown: '5 min: lat hang stretch (30 sec), bicep wall stretch (30 sec each side), seated lower back twist (30 sec each side).',
    },

    // ---- Day 9: W2 · Legs — Strength ----
    {
      day: 'Day 9',
      title: 'W2 · Legs — Strength',
      warmup: '5 min: bodyweight squats (15 reps), leg swings (10 each direction, each leg, holding a wall for balance), hip circles (10 each direction), glute bridges (15 reps, lying on your back and pushing your hips up), foam roll quads and adductors (inner thighs) — 1 minute each.',
      duration: '65 min',
      exercises: [
        {
          name: 'Barbell Back Squat',
          sets: 5,
          reps: '5',
          rest: '3:00',
          cues: 'Add 5–10 lbs. Same bracing (big breath, tight stomach) and same depth as last week — if you cut your depth short last week, keep the same weight this time and focus on going deeper instead. Getting the full range of motion matters more than the number on the bar.',
        },
        {
          name: 'Front Squat',
          sets: 3,
          reps: '6',
          rest: '2:30',
          cues: 'Add 5 lbs. Keep your elbows lifted high the entire set — that\'s your reminder to keep your upper back tight. Sit straight down between your hips and drive through your heels to stand.',
        },
        {
          name: 'Barbell Hip Thrust',
          sets: 4,
          reps: '10',
          rest: '1:30',
          cues: 'Add 10 lbs. Drive through your heels, get full hip extension at the top, squeeze your glutes for 1 full second. Keep your chin tucked slightly — don\'t crane your neck back, that\'s a sign you\'re overextending your lower back instead of your hips.',
        },
        {
          name: 'Walking Lunge',
          sets: 3,
          reps: '12 each',
          rest: '1:30',
          cues: 'Bump the reps to 12 per leg this week. Use the same weight or slightly heavier dumbbells. Long strides, back knee kisses the floor gently, stay upright through your torso the whole way.',
        },
        {
          name: 'Leg Curl',
          sets: 3,
          reps: '12',
          rest: '1:15',
          cues: 'Add weight if last week felt clean. Same slow 3-second lowering on every rep — your hamstrings grow most from that slow lowering phase, so don\'t rush it or let the weight drop.',
        },
        {
          name: 'Standing Calf Raise',
          sets: 4,
          reps: '15',
          rest: '1:00',
          cues: 'Add a 2-second hold at the very top this week. Full stretch at the bottom, full squeeze at the top, hold for 2 seconds before lowering. Your calves respond best to spending extra time under tension.',
        },
      ],
      cooldown: '5 min: pigeon stretch (30 sec each side, opens the hips), standing quad stretch (30 sec each side), banded hamstring stretch (loop a band around one foot, leg straight up, gently pull toward you — 30 sec each side).',
    },

    // ---- Day 10: W2 · Push — Volume ----
    {
      day: 'Day 10',
      title: 'W2 · Push — Volume',
      warmup: '5 min: band pull-aparts (15 reps), arm circles (15 each direction), light push-ups (10 reps), shoulder dislocates with a light band (raise the band overhead and behind your back and back over, 10 slow reps).',
      duration: '55 min',
      exercises: [
        {
          name: 'Dumbbell Bench Press',
          sets: 4,
          reps: '12',
          tempo: '3-1-1-0',
          rest: '1:30',
          cues: 'Bump the reps to 12 this week, same weight as before. Same tempo — 3 seconds lowering, 1 second pause, 1 second pressing up. Chase the stretch at the bottom (let your chest open) and the squeeze at the top (bring the dumbbells together).',
        },
        {
          name: 'Dumbbell Arnold Press',
          sets: 4,
          reps: '12',
          rest: '1:30',
          cues: 'More reps this week, same weight. Rotate smoothly from palms-in to palms-out as you press overhead. Full lockout at the top every rep. You should feel all three parts of your shoulder working through this twisting motion.',
        },
        {
          name: '1a. Cable Fly',
          sets: 3,
          reps: '15',
          rest: '0:00',
          cues: 'Bump to 15 reps. Slight bend in the elbows locked in place, bring your hands together in a hugging motion in front of your chest, squeeze your chest at the peak. Superset straight into front raises with no rest.',
        },
        {
          name: '1b. Dumbbell Front Raise',
          sets: 3,
          reps: '12',
          rest: '1:00',
          cues: 'Same weight as last week. Thumbs up, raise to eye level, control the lowering — don\'t rush through this superset just because your chest is already tired.',
        },
        {
          name: 'Overhead Tricep Extension',
          sets: 3,
          reps: '15',
          rest: '1:00',
          cues: 'Bump the reps to 15. Full stretch behind your head at the bottom, full extension overhead at the top. This one hits the long head of your tricep — the part that gets sore the hardest.',
        },
        {
          name: 'Push-Up — Burnout',
          sets: 3,
          reps: 'Max reps',
          rest: '1:00',
          cues: 'One extra set compared to last week — try to beat your total rep count from Week 1. Chest touches the floor every single rep, no half reps. Drop to your knees when your toes give out and keep grinding out reps.',
        },
      ],
      cooldown: '5 min: chest stretch (doorway, 30 sec each side), shoulder stretch (cross-body, 30 sec each side), tricep stretch (overhead, 30 sec each side).',
    },

    // ---- Day 11: W2 · Pull — Volume ----
    {
      day: 'Day 11',
      title: 'W2 · Pull — Volume',
      warmup: '5 min: band pull-aparts (15 reps), scap push-ups (10 reps, from a plank position pinch your shoulder blades together then spread them apart), cat-cow (10 slow reps), light cable rows (15 reps, very light weight, to warm the back up).',
      duration: '55 min',
      exercises: [
        {
          name: 'Chest-Supported Dumbbell Row',
          sets: 4,
          reps: '12',
          rest: '1:30',
          cues: 'Bump to 12 reps. Same incline bench setup, chest pressed flat against the pad. Pull the dumbbells to your hip, squeeze your back for a full second. With no way to cheat using your lower back, this is a great exercise for really feeling your back muscles work — pay attention to that feeling.',
        },
        {
          name: 'Lat Pulldown',
          sets: 4,
          reps: '12',
          rest: '1:30',
          cues: 'More reps, same weight as last week. Pull to your upper chest, lean back just a touch (not a big recline). Drive your elbows down and back, feeling your back muscles stretch at the top and contract hard at the bottom of each rep.',
        },
        {
          name: '1a. Seated Cable Row',
          sets: 3,
          reps: '15',
          rest: '0:00',
          cues: 'Bump to 15 reps. Pull to your belly button, chest tall the whole time. Squeeze your shoulder blades together at the end of each pull. Superset straight into reverse flys.',
        },
        {
          name: '1b. Reverse Fly',
          sets: 3,
          reps: '15',
          rest: '1:00',
          cues: 'Same reps as last week — focus on really feeling the squeeze at the top of each rep, holding it for a beat. Your rear shoulders are working overtime in this superset — let them do the work instead of your traps.',
        },
        {
          name: '2a. Incline Dumbbell Curl',
          sets: 3,
          reps: '12',
          rest: '0:00',
          cues: 'Bump to 12 reps. The full stretch at the bottom (arms hanging straight down) is non-negotiable — don\'t cut it short. Curl with control, squeeze at the top. Superset straight into concentration curls.',
        },
        {
          name: '2b. Concentration Curl',
          sets: 3,
          reps: '12 each',
          rest: '1:00',
          cues: 'More reps this week. Elbow braced on your inner thigh, squeeze at the top, 2-second slow lowering. This is pure isolation work for your biceps — make every single rep count instead of rushing through them.',
        },
      ],
      cooldown: '5 min: lat hang stretch (30 sec), bicep wall stretch (30 sec each side), foam roll upper back (1 minute).',
    },

    // ---- Day 12: W2 · Legs — Power ----
    {
      day: 'Day 12',
      title: 'W2 · Legs — Power',
      warmup: '5 min: foam roll quads and glutes (1 minute each), leg swings (10 each direction, each leg), bodyweight squats (15 reps), 4 low box jumps (step up onto a low sturdy box and step back down, priming your nervous system for the power work today).',
      duration: '60 min',
      exercises: [
        {
          name: 'Box Squat',
          sets: 4,
          reps: '5',
          rest: '2:30',
          cues: 'Add 5–10 lbs. Same form as last week — sit back onto the box, pause for a full second, then explode up. Try to move the bar faster than you did last week — speed off the box is the whole goal of a power day, not just the weight on the bar.',
        },
        {
          name: 'Trap Bar Deadlift',
          sets: 4,
          reps: '5',
          rest: '2:30',
          cues: 'Add 5–10 lbs. Neutral grip, push the floor away with your legs. Every rep should feel aggressive coming off the floor — full lockout at the top, then reset your whole position before the next rep.',
        },
        {
          name: 'Leg Press',
          sets: 4,
          reps: '12',
          rest: '1:30',
          cues: 'Add weight. Same full range of motion as last week — lower back stays pressed against the pad the whole time. Push through your entire foot and control the weight as it lowers back down.',
        },
        {
          name: 'Bulgarian Split Squat',
          sets: 3,
          reps: '10 each',
          rest: '1:30',
          cues: 'Add 5 lbs per hand. Rear foot resting on the bench behind you, drop straight down. Front knee tracks over your toes (not caving in). Drive through your front heel to stand.',
        },
        {
          name: 'Seated Calf Raise',
          sets: 4,
          reps: '15',
          rest: '1:00',
          cues: 'Add weight. Full stretch at the bottom, full squeeze at the top, hold for 2 seconds. Slow, deliberate reps build thicker calf muscles than fast, bouncy ones.',
        },
        {
          name: 'Ab Wheel Rollout',
          sets: 3,
          reps: '12',
          rest: '1:00',
          cues: 'Bump to 12 reps. Try to roll a little further out than last week if you can still control it and pull back with your abs. The instant your lower back starts to arch, that\'s your signal you\'ve gone too far — pull back sooner.',
        },
      ],
      cooldown: '5 min: standing quad stretch (30 sec each side), seated hamstring stretch (30 sec each side), hip flexor stretch (30 sec each side).',
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
      warmup: '5 min: band pull-aparts (15 reps), arm circles (15 each direction), push-up walkouts (5 reps), rotator cuff work (15 external rotations each arm), then 2 light bench sets — a few easy reps with just the empty bar or a light weight to rehearse your setup before the heavy work.',
      duration: '65 min',
      exercises: [
        {
          name: 'Paused Bench Press',
          sets: 5,
          reps: '3',
          rest: '3:00',
          cues: 'A new variation this week: lower the bar to your chest exactly like your normal bench press, but stop and hold it still on your chest for a full 2-second count before pressing back up. This kills any bounce off your chest and builds real pressing power from a dead stop. Work up to a weight that feels hard but doable for 3 reps — about 80% of your best single-rep max, or if you don\'t know that number, a weight where you have maybe 1-2 reps left in the tank after the set (this effort level is called an RPE 8).',
        },
        {
          name: 'Push Press',
          sets: 4,
          reps: '5',
          rest: '2:30',
          cues: 'Start like your overhead press, bar at your upper chest. Dip your knees slightly, then drive up explosively through your legs to help launch the bar, finishing by pressing it the rest of the way overhead with your arms until locked out. Because your legs are helping, you can use more weight here than your strict overhead press. This builds serious overhead strength.',
        },
        {
          name: 'Close-Grip Floor Press',
          sets: 4,
          reps: '6',
          rest: '2:00',
          cues: 'Lie on the floor (not a bench) holding the bar with hands about shoulder-width apart. Lower the bar until the backs of your upper arms touch the floor on every rep, then press back up. The floor stops the bar short of a full range of motion, which puts extra focus on your lockout strength — the part of the bench press many beginners are weakest at. Keep your elbows tucked in tight.',
        },
        {
          name: 'Incline Dumbbell Bench Press',
          sets: 4,
          reps: '8',
          rest: '1:30',
          cues: 'Heavier dumbbells than the last two weeks, fewer reps. Same 30-degree bench angle. Full stretch at the bottom, hard squeeze at the top. Take 2 full seconds to control the weight on the way down instead of dropping it.',
        },
        {
          name: 'Dumbbell Lateral Raise',
          sets: 4,
          reps: '10',
          rest: '1:00',
          cues: 'Slightly heavier than Weeks 1-2, fewer reps — quality over quantity. Lead with your elbows, raise to shoulder height, and pause for a beat at the top of every rep.',
        },
        {
          name: 'Weighted Dips',
          sets: 3,
          reps: '8',
          rest: '1:30',
          cues: 'A new movement this week. Grip the parallel bars of a dip station and lower your body by bending your elbows until your upper arms are about parallel to the floor, then press back up to straight arms — add a small weight with a dip belt or by holding a dumbbell between your feet once bodyweight gets easy. Lean your torso slightly forward to put more emphasis on your chest. This builds serious tricep and chest strength.',
        },
      ],
      cooldown: '5 min: doorway chest stretch (30 sec each side), shoulder stretch (cross-body, 30 sec each side), tricep stretch (overhead, 30 sec each side), wrist circles (10 each direction).',
    },

    // ---- Day 14: W3 · Pull — Strength ----
    {
      day: 'Day 14',
      title: 'W3 · Pull — Strength',
      warmup: '5 min: band pull-aparts (15 reps), cat-cow (10 slow reps), dead hangs (30 sec), scap retractions on the bar (10 reps), then 2 light deadlift sets — a few easy reps with a light weight to groove your setup before the heavy work.',
      duration: '65 min',
      exercises: [
        {
          name: 'Deficit Deadlift',
          sets: 5,
          reps: '3',
          rest: '3:00',
          cues: 'Stand on a low platform or a stack of plates, about 2-3 inches high, before setting up for your deadlift. This small height increase means the bar has to travel farther, which builds more power off the floor where most beginners are weakest. Same flat back and hard brace as your regular deadlift. Work up to about 80% of your regular deadlift weight — a weight that leaves roughly 1-2 reps in reserve after the set (RPE 8).',
        },
        {
          name: 'Weighted Pull-Ups',
          sets: 5,
          reps: '4',
          rest: '2:30',
          cues: 'Heavier than the last two weeks — add 5-10 lbs. Fewer reps per set but one more set overall, because this week is about building raw pulling strength instead of endurance. Full dead hang at the bottom, chin clears the bar at the top on every rep.',
        },
        {
          name: 'Pendlay Row',
          sets: 4,
          reps: '6',
          rest: '2:00',
          cues: 'A new variation this week — the bar starts resting flat on the floor for every single rep instead of hovering. Bend forward until your torso is parallel to the floor, grip the bar, and pull it explosively up to your lower chest, then set it back down on the floor completely and reset your position before the next rep. This is heavier than your regular bent-over row because you\'re not using any momentum from a swinging bar.',
        },
        {
          name: 'Cable Face Pull',
          sets: 4,
          reps: '12',
          rest: '1:00',
          cues: 'One more set than the last two weeks. Pull the rope to your face, elbows flaring wide, rotating your hands outward at the end. Hold the peak position for 2 full seconds. This keeps your shoulders and upper back healthy — never skip it, no matter how heavy the rest of the day gets.',
        },
        {
          name: 'Barbell Curl',
          sets: 4,
          reps: '8',
          rest: '1:00',
          cues: 'Heavier weight, fewer reps than the last two weeks. Strict form — absolutely no swinging your body to help the bar up. Squeeze hard at the top, then lower slowly over 3 seconds. This builds the peak of your bicep.',
        },
        {
          name: 'Dumbbell Hammer Curl',
          sets: 3,
          reps: '10',
          rest: '1:00',
          cues: 'Heavier than before. Neutral grip, elbows pinned to your sides. Slow negatives on the way down. This works the brachialis, the muscle underneath your bicep — keep your wrist straight (neutral) the whole set.',
        },
      ],
      cooldown: '5 min: lat hang stretch (30 sec), bicep stretch (30 sec each side), lower back stretch (seated twist, 30 sec each side), foam roll thoracic spine (roll your upper back over a foam roller for 1 minute).',
    },

    // ---- Day 15: W3 · Legs — Strength ----
    {
      day: 'Day 15',
      title: 'W3 · Legs — Strength',
      warmup: '5 min: bodyweight squats (15 reps), leg swings (10 each direction, each leg), hip circles (10 each direction), glute bridges (15 reps), then 2 light squat sets — a few easy reps at a light weight to rehearse your setup before going heavy.',
      duration: '65 min',
      exercises: [
        {
          name: 'Pin Squat',
          sets: 5,
          reps: '3',
          rest: '3:00',
          cues: 'Set the safety pins on a squat rack at the depth where your hip crease is level with your knee. Squat down and rest the bar directly on the pins for a full second with zero tension in your legs — a true dead stop, no bounce — then explode back up. Because there\'s no spring-back to help you, this builds raw strength out of the bottom of the squat, which is usually the hardest part for beginners. Work to about 80% of your regular back squat weight.',
        },
        {
          name: 'Paused Front Squat',
          sets: 4,
          reps: '4',
          rest: '2:30',
          cues: 'A new variation this week — same front squat setup as before, but pause for 2 full seconds at the bottom before standing. Keep your elbows high and your core braced hard through the pause. This exposes any weaknesses in your position — if your torso starts to collapse forward during the pause, use a lighter weight and focus on fixing that first.',
        },
        {
          name: 'Barbell Hip Thrust',
          sets: 4,
          reps: '8',
          rest: '1:30',
          cues: 'Heavier than the last two weeks, fewer reps. Drive through your heels, get full hip extension, hold the squeeze at the top for 1 second. Keep your ribcage pulled down instead of flaring it up — that keeps the work in your glutes instead of your lower back.',
        },
        {
          name: 'Walking Lunge',
          sets: 3,
          reps: '8 each',
          rest: '1:30',
          cues: 'Heavier dumbbells, fewer reps than before. Long strides, back knee gently kisses the floor, stay upright through your torso. This is real strength work now, not just movement practice.',
        },
        {
          name: 'Leg Curl',
          sets: 4,
          reps: '10',
          rest: '1:15',
          cues: 'Heavier weight, one more set than before. Squeeze hard at full contraction, 3-second slow lowering on every rep. Your hamstrings need that heavy, slow lowering phase to keep growing.',
        },
        {
          name: 'Standing Calf Raise',
          sets: 4,
          reps: '12',
          rest: '1:00',
          cues: 'Heavier, fewer reps than before. Full stretch at the bottom, hold the squeeze at the top for 2 seconds. Your calf muscle (the gastrocnemius) responds well to heavier loads — push yourself here.',
        },
      ],
      cooldown: '5 min: pigeon stretch (30 sec each side), quad stretch (30 sec each side), hamstring stretch (30 sec each side), hip flexor stretch (30 sec each side).',
    },

    // ---- Day 16: W3 · Push — Volume ----
    {
      day: 'Day 16',
      title: 'W3 · Push — Volume',
      warmup: '5 min: band pull-aparts (15 reps), arm circles (15 each direction), light push-ups (10 reps), shoulder dislocates with a band (10 slow reps).',
      duration: '55 min',
      exercises: [
        {
          name: 'Dumbbell Bench Press',
          sets: 4,
          reps: '8',
          tempo: '2-1-1-0',
          rest: '1:15',
          cues: 'Heavier dumbbells, fewer reps, shorter rest between sets than the last two weeks. The lowering is a little faster this time — 2 seconds down instead of 3. This week is about moving more weight for quality volume, so really feel your chest doing the work on every rep.',
        },
        {
          name: 'Dumbbell Arnold Press',
          sets: 4,
          reps: '8',
          rest: '1:15',
          cues: 'Heavier, fewer reps. Full rotation from palms-in to palms-out, full lockout overhead. Shorter rest between sets keeps the intensity high — expect to feel it.',
        },
        {
          name: '1a. Cable Fly — Low to High',
          sets: 3,
          reps: '12',
          rest: '0:00',
          cues: 'A new angle this week — set the cables at the low position and bring your hands up and together at chest height, like you\'re scooping something up off the ground. This targets the upper part of your chest. Superset straight into plate raises.',
        },
        {
          name: '1b. Plate Front Raise',
          sets: 3,
          reps: '12',
          rest: '1:00',
          cues: 'Hold a weight plate (25 or 45 lbs) with both hands at your sides. Raise it straight out in front of you to eye level, squeeze at the top, then control the lowering. Superset straight back into cable flys with no rest.',
        },
        {
          name: 'Skull Crushers',
          sets: 3,
          reps: '10',
          rest: '1:00',
          cues: 'A new movement — lie on a bench holding an EZ-bar or straight bar with a shoulder-width grip, arms straight above your chest. Bend only your elbows to lower the bar toward your forehead (elbows should point up at the ceiling the whole time, not flare out), then extend back up. This hammers the long head of your tricep, so expect a deep burn.',
        },
        {
          name: 'Diamond Push-Up — Burnout',
          sets: 2,
          reps: 'Max reps',
          rest: '1:00',
          cues: 'Bring your hands together under your chest so your thumbs and index fingers form a diamond shape. This puts almost all the work on your triceps instead of your chest. Go until you truly can\'t do another rep, then widen your hands to a normal push-up position and keep going a few more reps to finish the day empty.',
        },
      ],
      cooldown: '5 min: doorway chest stretch (30 sec each side), shoulder stretch (30 sec each side), wrist stretches (gently pull your fingers back with your other hand, 20 sec each side).',
    },

    // ---- Day 17: W3 · Pull — Volume ----
    {
      day: 'Day 17',
      title: 'W3 · Pull — Volume',
      warmup: '5 min: band pull-aparts (15 reps), scap push-ups (10 reps), cat-cow (10 slow reps), light cable rows (15 reps, very light weight).',
      duration: '55 min',
      exercises: [
        {
          name: 'Chest-Supported Dumbbell Row',
          sets: 4,
          reps: '8',
          rest: '1:15',
          cues: 'Heavier dumbbells than before. 8 quality reps — pull to your hip, squeeze your back hard, hold for 1 second at the peak. Shorter rest and higher intensity this week compared to the volume weeks.',
        },
        {
          name: 'Wide-Grip Lat Pulldown',
          sets: 4,
          reps: '8',
          rest: '1:15',
          cues: 'A new grip this week — take your hands out wider than usual on the bar. This puts extra emphasis on the outer part of your back muscles, which helps build width. Pull to your upper chest, squeeze for a beat, and lean back only slightly.',
        },
        {
          name: '1a. Cable Row — Close Grip',
          sets: 3,
          reps: '10',
          rest: '0:00',
          cues: 'Use a V-handle attachment. Pull to your belly, elbows tucked tight to your body instead of flared out. This shifts the focus to your mid-back and lower lats. Superset straight into reverse flys.',
        },
        {
          name: '1b. Reverse Fly',
          sets: 3,
          reps: '12',
          rest: '1:00',
          cues: 'Slightly heavier, fewer reps than before. Hold the peak contraction (arms out, shoulder blades squeezed) for 2 full seconds. Your rear shoulders should be burning by the second set.',
        },
        {
          name: '2a. Preacher Curl',
          sets: 3,
          reps: '10',
          rest: '0:00',
          cues: 'A new movement — rest your upper arms on the angled pad of a preacher bench, holding an EZ-bar or dumbbells. This position makes it impossible to cheat with momentum — it\'s pure bicep work. Full extension at the bottom, full contraction at the top. Superset straight into cable curls.',
        },
        {
          name: '2b. Cable Curl',
          sets: 3,
          reps: '12',
          rest: '1:00',
          cues: 'The cable keeps tension on your biceps through the entire range of motion, unlike a dumbbell where the bottom of the rep feels easy. Squeeze at the top, slow lowering, elbows pinned at your sides. Chase the pump.',
        },
      ],
      cooldown: '5 min: lat hang stretch (30 sec), bicep stretch (30 sec each side), foam roll upper back and lats (1 minute).',
    },

    // ---- Day 18: W3 · Legs — Power ----
    {
      day: 'Day 18',
      title: 'W3 · Legs — Power',
      warmup: '5 min: foam roll quads and glutes (1 minute each), leg swings (10 each direction, each leg), bodyweight squats (15 reps), 4 box jumps at a medium height (step up onto a sturdy box, step down, priming your nervous system for explosive work).',
      duration: '60 min',
      exercises: [
        {
          name: 'Box Squat',
          sets: 5,
          reps: '3',
          rest: '2:30',
          cues: 'Heavier weight, fewer reps than the last two weeks. Sit back onto the box, pause a full second with no bounce, then explode up with everything you have. This is about producing maximum force in a short amount of time. Work to about 80% of your regular squat weight.',
        },
        {
          name: 'Trap Bar Deadlift',
          sets: 5,
          reps: '3',
          rest: '2:30',
          cues: 'Heavier, fewer reps. Push the floor away aggressively — every rep should be fast off the floor. Full lockout, full reset before the next rep. Work to about 80% of your max.',
        },
        {
          name: 'Leg Press',
          sets: 4,
          reps: '10',
          rest: '1:30',
          cues: 'Heavier than the last two weeks, fewer reps. Full depth with your lower back staying flat on the pad. Push through your whole foot and don\'t bounce the weight at the bottom of the rep — control it.',
        },
        {
          name: 'Weighted Step-Ups',
          sets: 3,
          reps: '8 each',
          rest: '1:30',
          cues: 'A new movement — hold a dumbbell in each hand and step up onto a sturdy bench with one foot. Drive through that top foot only to lift your body up — don\'t push off your back foot to help. This builds strength and power one leg at a time, which is exactly what you need for sprinting, cutting, and everyday movement.',
        },
        {
          name: 'Seated Calf Raise',
          sets: 4,
          reps: '12',
          rest: '1:00',
          cues: 'Heavier. Full stretch at the bottom, full squeeze at the top, hold for 2 seconds. Fewer reps this week, more load on the muscle.',
        },
        {
          name: 'Hanging Leg Raise',
          sets: 3,
          reps: '12',
          rest: '1:00',
          cues: 'A new core movement — hang from a pull-up bar with straight arms. Raise your legs up in front of you to about parallel with the floor (or higher if you can) using only your abs, not by swinging your body. Lower back down slowly under control. This builds your lower abs and hip flexors.',
        },
      ],
      cooldown: '5 min: quad stretch (30 sec each side), hamstring stretch (30 sec each side), hip flexor stretch (30 sec each side), child\'s pose (kneel and sit back on your heels, reach your arms forward on the floor, hold for 30 sec — this is a tough day, this stretch calms your whole body down).',
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
      warmup: '5 min: band pull-aparts (15 reps), arm circles (15 each direction), push-up walkouts (5 reps), rotator cuff work (15 external rotations each arm), then 2 warm-up bench sets at a light weight to rehearse your setup before the heavy work.',
      duration: '65 min',
      exercises: [
        {
          name: 'Paused Bench Press',
          sets: 5,
          reps: '3',
          rest: '3:00',
          cues: 'Add 5-10 lbs over last week\'s weight. Same 2-second pause on your chest before pressing. You should be working at about 82-85% of your best single-rep max — a weight that leaves only 1-2 reps in reserve after the set. Every rep should feel like a grind, and that\'s exactly the point this week.',
        },
        {
          name: 'Push Press',
          sets: 4,
          reps: '4',
          rest: '2:30',
          cues: 'Heavier than last week, one fewer rep. Quick dip with your knees, then a violent drive up through your legs to help launch the bar overhead. Lock it out at the top. This trains your body to move heavy weight fast, which builds power you\'ll use in every other lift.',
        },
        {
          name: 'Close-Grip Floor Press',
          sets: 4,
          reps: '5',
          rest: '2:00',
          cues: 'Heavier, fewer reps than last week. The backs of your upper arms touch the floor on every rep, brief pause, then press hard. This is building the lockout strength on your bench press. Hands shoulder-width apart, elbows tucked tight.',
        },
        {
          name: 'Incline Barbell Bench Press',
          sets: 4,
          reps: '6',
          rest: '1:30',
          cues: 'Switching from dumbbells to a barbell this week so you can load more weight. Same 30-degree incline. Lower the bar to touch your upper chest, then press it back up to lockout. You\'ll feel this in your upper chest and the front of your shoulders.',
        },
        {
          name: 'Cable Lateral Raise',
          sets: 4,
          reps: '10',
          rest: '1:00',
          cues: 'A cable keeps constant tension on your shoulder throughout the whole movement, unlike a dumbbell which gets easier at the top and bottom. Raise your arm out to shoulder height, pause for 1 second, then lower slowly. This gives a better stimulus for shoulder growth than dumbbells at this stage.',
        },
        {
          name: 'Weighted Dips',
          sets: 4,
          reps: '6',
          rest: '1:30',
          cues: 'Add more weight than last week. Fewer reps, heavier load. Full depth (upper arms about parallel to the floor), full lockout at the top, lean slightly forward for chest emphasis. This is a real mass builder for your chest and triceps.',
        },
      ],
      cooldown: '5 min: doorway chest stretch (30 sec each side), shoulder stretch (30 sec each side), tricep stretch (30 sec each side).',
    },

    // ---- Day 20: W4 · Pull — Strength ----
    {
      day: 'Day 20',
      title: 'W4 · Pull — Strength',
      warmup: '5 min: band pull-aparts (15 reps), cat-cow (10 slow reps), dead hangs (30 sec), scap retractions on the bar (10 reps), then 2 warm-up deadlift sets at a light weight.',
      duration: '65 min',
      exercises: [
        {
          name: 'Deficit Deadlift',
          sets: 5,
          reps: '3',
          rest: '3:00',
          cues: 'Add 5-10 lbs over last week. Same 2-3 inch deficit platform, flat back, big brace before every rep. Work to about 82-85% of your regular deadlift max — a weight that only leaves 1-2 reps in reserve. Every rep off the floor should feel like an explosive, violent pull.',
        },
        {
          name: 'Weighted Pull-Ups',
          sets: 5,
          reps: '3',
          rest: '2:30',
          cues: 'Heavier than last week. This is 5 sets of 3 reps — keep it simple: 3 perfect reps, heavy weight, full range of motion every time. If you can\'t get all 3 clean reps, drop the weight — quality beats ego here.',
        },
        {
          name: 'Pendlay Row',
          sets: 4,
          reps: '5',
          rest: '2:00',
          cues: 'Heavier, fewer reps than last week. Bar rests dead on the floor between every rep, torso parallel to the ground. Explosive pull up, controlled return to the floor. Your upper back is being built hard right now.',
        },
        {
          name: 'Cable Face Pull',
          sets: 4,
          reps: '12',
          rest: '1:00',
          cues: 'Same as last week — this is your shoulder health insurance and it never changes even as everything else gets heavier. Pull to your face, rotate your hands outward, hold for 2 seconds. Don\'t sacrifice this exercise just because the rest of the day is heavy.',
        },
        {
          name: 'Barbell Curl',
          sets: 4,
          reps: '6',
          rest: '1:15',
          cues: 'Heavier than last week. 6 strict reps — zero body swing. If your body starts moving to help the bar up, that means the weight is too heavy for good form. Squeeze at the top, 3-second slow lowering.',
        },
        {
          name: 'Dumbbell Hammer Curl',
          sets: 3,
          reps: '8',
          rest: '1:00',
          cues: 'Heavier. 8 strict reps with a slow lowering. Neutral grip (thumbs up), elbows locked at your sides. Building thick arms takes patience and control on the way down, not just lifting the weight up fast.',
        },
      ],
      cooldown: '5 min: lat stretch (30 sec), bicep stretch (30 sec each side), lower back stretch (30 sec each side), thoracic foam rolling (roll your upper back for 1 minute).',
    },

    // ---- Day 21: W4 · Legs — Strength ----
    {
      day: 'Day 21',
      title: 'W4 · Legs — Strength',
      warmup: '5 min: bodyweight squats (15 reps), leg swings (10 each direction, each leg), hip circles (10 each direction), glute bridges (15 reps), then 2 warm-up squat sets at a light weight.',
      duration: '65 min',
      exercises: [
        {
          name: 'Pin Squat',
          sets: 5,
          reps: '3',
          rest: '3:00',
          cues: 'Add 5-10 lbs over last week. Same setup as before — lower to the pins, come to a true dead stop, then explode up. Work to about 82-85% of your regular squat weight. This should feel genuinely hard — that\'s the point of this week.',
        },
        {
          name: 'Paused Front Squat',
          sets: 4,
          reps: '3',
          rest: '2:30',
          cues: 'Heavier than last week, one fewer rep. Same 2-second pause at the bottom of the squat. Elbows high, core braced hard through the whole pause. If your elbows drop during the pause, the weight has won — drop the load and rebuild your position.',
        },
        {
          name: 'Barbell Hip Thrust',
          sets: 4,
          reps: '6',
          rest: '1:30',
          cues: 'Heavy this week — 6 reps with a full 2-second squeeze at the top of every rep. Drive through your heels. Keep your ribcage pulled down so you don\'t overextend your lower back. This is building serious glute strength, not just range of motion.',
        },
        {
          name: 'Reverse Lunge — Barbell',
          sets: 3,
          reps: '6 each',
          rest: '1:30',
          cues: 'A new variation this week — with the barbell resting across your upper back (same as a back squat), step backward into a lunge instead of forward. Your front knee should stay directly over your ankle. Drive through your front heel to stand back up. A barbell on your back lets you load this movement much heavier than holding dumbbells.',
        },
        {
          name: 'Nordic Hamstring Curl',
          sets: 3,
          reps: '6',
          rest: '1:30',
          cues: 'A new, challenging movement — kneel on a soft pad with your ankles anchored (either a partner holding them down or hooked under something heavy and stable). Slowly lean your body forward from the knees, resisting the fall with your hamstrings for as long as you can, then catch yourself with your hands and push back up. If you can\'t control the full lowering yet, only lower yourself as far as you can before catching yourself — that\'s completely normal when you\'re new to this.',
        },
        {
          name: 'Standing Calf Raise',
          sets: 4,
          reps: '10',
          rest: '1:00',
          cues: 'Heavier than before, fewer reps. Full stretch at the bottom, explosive drive up onto your toes, 2-second squeeze at the top. Heavy loads like this are what build up your visible calf muscle (gastrocnemius).',
        },
      ],
      cooldown: '5 min: pigeon stretch (30 sec each side), quad stretch (30 sec each side), hamstring stretch (30 sec each side), hip flexor stretch (30 sec each side).',
    },

    // ---- Day 22: W4 · Push — Volume ----
    {
      day: 'Day 22',
      title: 'W4 · Push — Volume',
      warmup: '5 min: band pull-aparts (15 reps), arm circles (15 each direction), light push-ups (10 reps), shoulder dislocates with a band (10 slow reps).',
      duration: '55 min',
      exercises: [
        {
          name: 'Dumbbell Bench Press',
          sets: 4,
          reps: '8',
          tempo: '2-1-1-0',
          rest: '1:15',
          cues: 'Same weight as last week, or slightly heavier. Focus on really feeling your chest doing the work on every rep instead of just moving the weight — think about squeezing your chest muscles together, not just pushing the dumbbells up. Full stretch at the bottom, hard squeeze at the top.',
        },
        {
          name: 'Dumbbell Arnold Press',
          sets: 4,
          reps: '8',
          rest: '1:15',
          cues: 'Heavier than last week if you can manage it. Full rotation from palms-in to palms-out, full lockout at the top. Try to make every rep look identical to the last one — that consistency is what builds real strength.',
        },
        {
          name: '1a. Cable Fly — High to Low',
          sets: 3,
          reps: '10',
          rest: '0:00',
          cues: 'A new angle — set the cables high above your head and pull down and together in front of you, like you\'re chopping wood. This targets the lower fibers of your chest. Squeeze hard at the bottom. Superset straight into lateral raises.',
        },
        {
          name: '1b. Dumbbell Lateral Raise',
          sets: 3,
          reps: '10',
          rest: '1:00',
          cues: 'Moderate weight, strict form. Lead with your elbows, pause at shoulder height, control the lowering for a full 2 seconds.',
        },
        {
          name: 'Skull Crushers',
          sets: 3,
          reps: '10',
          rest: '1:00',
          cues: 'Slightly heavier than last week. Lower the bar to your forehead by bending only your elbows, extend back up. Keep your elbows pointed at the ceiling the whole time — don\'t let them flare out to the sides.',
        },
        {
          name: 'Close-Grip Push-Up — Burnout',
          sets: 2,
          reps: 'Max reps',
          rest: '1:00',
          cues: 'Hands close together under your chest, elbows tucked tight to your body as you lower and press. Chest touches the floor every rep. When you truly can\'t do another full rep, hold the bottom position (chest just above the floor) for as long as you can — that\'s how you finish this exercise.',
        },
      ],
      cooldown: '5 min: chest stretch (30 sec each side), shoulder stretch (30 sec each side), tricep stretch (30 sec each side), wrist circles (10 each direction).',
    },

    // ---- Day 23: W4 · Pull — Volume ----
    {
      day: 'Day 23',
      title: 'W4 · Pull — Volume',
      warmup: '5 min: band pull-aparts (15 reps), scap push-ups (10 reps), cat-cow (10 slow reps), light cable rows (15 reps).',
      duration: '55 min',
      exercises: [
        {
          name: 'Chest-Supported Dumbbell Row',
          sets: 4,
          reps: '8',
          rest: '1:15',
          cues: 'Heavier than last week. Pull the dumbbells to your hip, squeeze your back hard, hold for 1 second at the top. You should feel every fiber in your mid-back working here since your chest is locked to the bench and can\'t help cheat.',
        },
        {
          name: 'Lat Pulldown — Neutral Grip',
          sets: 4,
          reps: '8',
          rest: '1:15',
          cues: 'A new grip — use a handle where your palms face each other instead of a wide bar. This shifts more emphasis to your lower lats. Pull to your upper chest, lean back only slightly, and squeeze hard at the bottom.',
        },
        {
          name: '1a. Seated Cable Row',
          sets: 3,
          reps: '10',
          rest: '0:00',
          cues: 'Heavier than before. Pull to your belly, chest tall and upright. Squeeze your shoulder blades together at the end of the pull. Superset straight into face pulls.',
        },
        {
          name: '1b. Cable Face Pull',
          sets: 3,
          reps: '12',
          rest: '1:00',
          cues: 'Same setup as your strength day — pull to your face, rotate your hands outward, hold for 2 seconds. Rear shoulder and upper back work never gets old — it keeps you healthy for everything else you lift.',
        },
        {
          name: '2a. Preacher Curl',
          sets: 3,
          reps: '8',
          rest: '0:00',
          cues: 'Heavier than last week, fewer reps. Strict form on the preacher pad — no momentum, no swinging. Full extension at the bottom, full contraction at the top. Superset straight into cable hammer curls.',
        },
        {
          name: '2b. Cable Hammer Curl — Rope',
          sets: 3,
          reps: '10',
          rest: '1:00',
          cues: 'Use a rope attachment with a neutral grip (thumbs up). The cable gives constant tension the whole rep. Pull the two ends of the rope apart as you reach the top for an extra squeeze, then lower slowly.',
        },
      ],
      cooldown: '5 min: lat stretch (30 sec), bicep stretch (30 sec each side), foam roll upper back and lats (1 minute).',
    },

    // ---- Day 24: W4 · Legs — Power ----
    {
      day: 'Day 24',
      title: 'W4 · Legs — Power',
      warmup: '5 min: foam roll quads and glutes (1 minute each), leg swings (10 each direction, each leg), bodyweight squats (15 reps), 5 box jumps at a medium-to-high box (step up, step down carefully, this primes your nervous system for explosive work).',
      duration: '60 min',
      exercises: [
        {
          name: 'Box Squat',
          sets: 5,
          reps: '3',
          rest: '2:30',
          cues: 'Heavier than last week — about 82-85% of your squat weight. Sit back onto the box, a full dead pause with no bounce, then produce maximum force to explode up. You should be moving real weight by this point in the program.',
        },
        {
          name: 'Trap Bar Deadlift',
          sets: 5,
          reps: '3',
          rest: '2:30',
          cues: 'Heavier than last week. Every rep should be explosive off the floor. Full lockout, full reset before the next rep. You\'re teaching your body to produce force fast even under a heavy load.',
        },
        {
          name: 'Leg Press',
          sets: 4,
          reps: '8',
          rest: '1:30',
          cues: 'Heavier, fewer reps than before. Load the sled up. Full depth with your lower back staying flat on the pad. Push through your whole foot with authority — don\'t let the weight bounce.',
        },
        {
          name: 'Bulgarian Split Squat',
          sets: 3,
          reps: '8 each',
          rest: '1:30',
          cues: 'Heavier dumbbells than before. Rear foot resting on the bench, drop straight down. This builds strength and stability one leg at a time — 8 reps per leg, no shortcuts, no rushing.',
        },
        {
          name: 'Seated Calf Raise',
          sets: 4,
          reps: '12',
          rest: '1:00',
          cues: 'Heavier than before. Full stretch at the bottom, explosive drive to the top, 2-second squeeze. Your calf muscles are being built under real load this week.',
        },
        {
          name: 'Ab Wheel Rollout',
          sets: 3,
          reps: '12',
          rest: '1:00',
          cues: 'Go a little further than Week 2 if you can control it. If you can already fully extend from your knees, start trying it from your toes for an extra challenge. Core braced hard the entire time — never let your lower back arch.',
        },
      ],
      cooldown: '5 min: quad stretch (30 sec each side), hamstring stretch (30 sec each side), hip flexor stretch (30 sec each side), child\'s pose (30 sec — a good day to breathe and let your whole body settle down).',
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
      warmup: '5 min: band pull-aparts (15 reps), arm circles (15 each direction), push-up walkouts (5 reps), rotator cuff work (15 external rotations each arm), then 3 progressive warm-up bench sets — start light and add weight each set to build up to today\'s heavy work.',
      duration: '65 min',
      exercises: [
        {
          name: 'Bench Press',
          sets: 4,
          reps: '3',
          rest: '3:00',
          cues: 'Back to your regular bench press — no pause this week, press with normal speed off your chest. Work up to about 85-88% of your best single-rep max, a weight that leaves only 1-2 reps in reserve after the set. These reps should feel heavy but still clean and controlled — you\'ve done the hard building work, now trust it.',
        },
        {
          name: 'Overhead Press',
          sets: 4,
          reps: '3',
          rest: '2:30',
          cues: 'Heavy triples this week. Strict press — no leg drive. Work up to a weight that leaves only 1-2 reps in reserve. Lock out hard overhead, and push your head through so the bar ends directly above your ears.',
        },
        {
          name: 'Close-Grip Bench Press',
          sets: 3,
          reps: '5',
          rest: '2:00',
          cues: 'Heavier than the foundation weeks. 5 reps, focus on your lockout strength. Hands shoulder-width, elbows tucked tight. This builds confidence in the top half of your press.',
        },
        {
          name: 'Incline Dumbbell Bench Press',
          sets: 3,
          reps: '8',
          rest: '1:30',
          cues: 'Moderate weight — this is supporting work this week, not the main event. Full range of motion, good squeeze at the top. Keep your shoulders feeling healthy going into the rest of the week.',
        },
        {
          name: 'Dumbbell Lateral Raise',
          sets: 3,
          reps: '12',
          rest: '1:00',
          cues: 'Moderate weight, clean reps. Lead with your elbows, pause at the top of every rep. This is maintenance volume to keep your shoulders active without wearing them out.',
        },
        {
          name: 'Cable Tricep Pushdown',
          sets: 3,
          reps: '10',
          rest: '1:00',
          cues: 'Moderate weight. Full extension, full squeeze. This is about keeping your triceps healthy and pumped, not going to absolute failure — save your energy for the big lifts this week.',
        },
      ],
      cooldown: '5 min: chest stretch (30 sec each side), shoulder stretch (30 sec each side), tricep stretch (30 sec each side).',
    },

    // ---- Day 26: W5 · Pull — Strength ----
    {
      day: 'Day 26',
      title: 'W5 · Pull — Strength',
      warmup: '5 min: band pull-aparts (15 reps), cat-cow (10 slow reps), dead hangs (30 sec), scap retractions on the bar (10 reps), then 3 progressive warm-up deadlift sets — start light and build up to today\'s heavy work.',
      duration: '65 min',
      exercises: [
        {
          name: 'Barbell Deadlift',
          sets: 4,
          reps: '2',
          rest: '3:00',
          cues: 'Back to your regular deadlift, pulling from the floor. Heavy doubles at about 87-90% of your best single-rep max — a weight that leaves only 1-2 reps in reserve. Perfect setup on every single rep — flat back, big brace, push the floor away. This is what all the previous weeks have been building toward.',
        },
        {
          name: 'Weighted Pull-Ups',
          sets: 4,
          reps: '3',
          rest: '2:30',
          cues: 'Heavy triples. Full dead hang, chin clears the bar every rep. If this weight would have felt impossible 4 weeks ago, that\'s proof of how much stronger you\'ve gotten.',
        },
        {
          name: 'Barbell Bent-Over Row',
          sets: 4,
          reps: '5',
          rest: '2:00',
          cues: 'Heavy 5s. Same 45-degree torso angle. Pull the bar to your lower chest with real authority, squeeze your back at the top. Your row should be noticeably stronger than it was in Week 1.',
        },
        {
          name: 'Cable Face Pull',
          sets: 3,
          reps: '15',
          rest: '1:00',
          cues: 'Back to higher reps this week — this is recovery and shoulder health work. Pull to your face, rotate outward, hold the squeeze. Keep your shoulders feeling good heading into test week.',
        },
        {
          name: 'Barbell Curl',
          sets: 3,
          reps: '8',
          rest: '1:00',
          cues: 'Moderate-heavy weight. 8 strict reps, squeeze at the top. Your biceps are support muscles this week — don\'t hammer them into the ground, just keep them working.',
        },
      ],
      cooldown: '5 min: lat stretch (30 sec), bicep stretch (30 sec each side), lower back stretch (30 sec each side), foam roll (1 minute on your upper back).',
    },

    // ---- Day 27: W5 · Legs — Strength ----
    {
      day: 'Day 27',
      title: 'W5 · Legs — Strength',
      warmup: '5 min: bodyweight squats (15 reps), leg swings (10 each direction, each leg), hip circles (10 each direction), glute bridges (15 reps), then 3 progressive warm-up squat sets — start light and build up to today\'s heavy work.',
      duration: '65 min',
      exercises: [
        {
          name: 'Barbell Back Squat',
          sets: 4,
          reps: '3',
          rest: '3:00',
          cues: 'Back to your regular competition squat this week. Heavy triples at about 85-88% of your best single-rep max — a weight that leaves only 1-2 reps in reserve. Big breath, hard brace, break parallel every rep. You should feel strong and confident under this weight after everything you\'ve built.',
        },
        {
          name: 'Front Squat',
          sets: 3,
          reps: '3',
          rest: '2:30',
          cues: 'Heavy triples. Elbows high, core braced, go below parallel. This is your final prep before test week — your front squat should feel noticeably stronger than it did in Week 1.',
        },
        {
          name: 'Barbell Hip Thrust',
          sets: 3,
          reps: '8',
          rest: '1:30',
          cues: 'Moderate-heavy — this is supporting volume to keep your glutes strong and active without wearing you down before test week. Full extension, 1-second squeeze at the top.',
        },
        {
          name: 'Walking Lunge',
          sets: 3,
          reps: '8 each',
          rest: '1:30',
          cues: 'Moderate weight, clean reps. Long strides, back knee gently kisses the floor. This maintains your single-leg strength without adding excess fatigue right before test week.',
        },
        {
          name: 'Leg Curl',
          sets: 3,
          reps: '10',
          rest: '1:15',
          cues: 'Moderate weight. Squeeze at the top, 3-second slow lowering. Keep your hamstrings healthy and balanced heading into the final push.',
        },
        {
          name: 'Standing Calf Raise',
          sets: 3,
          reps: '15',
          rest: '1:00',
          cues: 'Moderate weight, full range of motion. Maintenance volume this week — don\'t push these to failure, save your energy for the big lifts.',
        },
      ],
      cooldown: '5 min: pigeon stretch (30 sec each side), quad stretch (30 sec each side), hamstring stretch (30 sec each side), hip flexor stretch (30 sec each side).',
    },

    // ---- Day 28: W5 · Push — Volume ----
    {
      day: 'Day 28',
      title: 'W5 · Push — Volume',
      warmup: '5 min: band pull-aparts (15 reps), arm circles (15 each direction), light push-ups (10 reps), shoulder dislocates with a band (10 slow reps).',
      duration: '50 min',
      exercises: [
        {
          name: 'Dumbbell Bench Press',
          sets: 4,
          reps: '10',
          tempo: '3-1-1-0',
          rest: '1:30',
          cues: 'Back to moderate weight and higher reps this week — this is active recovery volume for your chest, not a max effort day. Full stretch at the bottom, good squeeze at the top. Don\'t chase a personal record here, just move well.',
        },
        {
          name: 'Dumbbell Arnold Press',
          sets: 4,
          reps: '10',
          rest: '1:30',
          cues: 'Moderate weight. Full rotation, full lockout. Keep your shoulders feeling good — this is support work leading into next week\'s heavy pressing.',
        },
        {
          name: '1a. Cable Fly',
          sets: 3,
          reps: '12',
          rest: '0:00',
          cues: 'Cables at mid-height. Squeeze your chest at the peak. Moderate weight with great form is the goal here, not chasing heavier weight. Superset straight into front raises.',
        },
        {
          name: '1b. Dumbbell Front Raise',
          sets: 3,
          reps: '12',
          rest: '1:00',
          cues: 'Thumbs up, raise to eye level. Control the weight down, don\'t rush it. This week is recovery volume, so stay smooth and relaxed.',
        },
        {
          name: 'Overhead Tricep Extension',
          sets: 3,
          reps: '12',
          rest: '1:00',
          cues: 'Moderate weight. Full stretch, full extension. Keep the back of your arms feeling healthy and mobile heading into test week.',
        },
        {
          name: 'Push-Up — Burnout',
          sets: 2,
          reps: 'Max reps',
          rest: '1:00',
          cues: 'Finish the session strong. Chest to the floor every rep. Try to beat your Week 1 total — this should feel noticeably easier than it did 4 weeks ago, which tells you how far you\'ve come.',
        },
      ],
      cooldown: '5 min: chest stretch (30 sec each side), shoulder stretch (30 sec each side), wrist circles (10 each direction).',
    },

    // ---- Day 29: W5 · Pull — Volume ----
    {
      day: 'Day 29',
      title: 'W5 · Pull — Volume',
      warmup: '5 min: band pull-aparts (15 reps), scap push-ups (10 reps), cat-cow (10 slow reps), light cable rows (15 reps).',
      duration: '50 min',
      exercises: [
        {
          name: 'Chest-Supported Dumbbell Row',
          sets: 4,
          reps: '10',
          rest: '1:30',
          cues: 'Moderate weight. Pull to your hip, 1-second squeeze at the top. This is volume to support recovery this week — chase quality reps, not a grind.',
        },
        {
          name: 'Lat Pulldown',
          sets: 4,
          reps: '10',
          rest: '1:30',
          cues: 'Moderate weight. Pull to your upper chest, squeeze your back muscles. Keep your back feeling healthy and pumped. Standard grip this week.',
        },
        {
          name: '1a. Seated Cable Row',
          sets: 3,
          reps: '12',
          rest: '0:00',
          cues: 'Pull to your belly, chest tall the whole time. Shoulder blades squeezed together at the finish. Smooth, controlled reps. Superset straight into reverse flys.',
        },
        {
          name: '1b. Reverse Fly',
          sets: 3,
          reps: '15',
          rest: '1:00',
          cues: 'Light weight, high reps. This is maintenance for your rear shoulders. Hold the peak position for 1 second. This kind of work is what keeps your posture strong long-term.',
        },
        {
          name: '2a. Incline Dumbbell Curl',
          sets: 3,
          reps: '10',
          rest: '0:00',
          cues: 'Full stretch at the bottom, curl with intention rather than momentum. Moderate weight. Superset straight into concentration curls.',
        },
        {
          name: '2b. Concentration Curl',
          sets: 3,
          reps: '10 each',
          rest: '1:00',
          cues: 'Elbow braced on your thigh. Squeeze at the top, slow lowering. This is maintenance volume — keep your arms feeling full and strong heading into test week.',
        },
      ],
      cooldown: '5 min: lat stretch (30 sec), bicep stretch (30 sec each side), foam roll upper back (1 minute).',
    },

    // ---- Day 30: W5 · Legs — Power ----
    {
      day: 'Day 30',
      title: 'W5 · Legs — Power',
      warmup: '5 min: foam roll (1 minute), leg swings (10 each direction, each leg), bodyweight squats (15 reps), 5 box jumps at a medium height — focus on landing softly with bent knees, this teaches good landing mechanics before the heavier jump work.',
      duration: '55 min',
      exercises: [
        {
          name: 'Box Jump',
          sets: 4,
          reps: '5',
          rest: '2:00',
          cues: 'Pure power work. Quick dip with your knees, jump explosively up onto the box, land softly with bent knees to absorb the impact. Step back down off the box — never jump down, that\'s hard on your joints for no benefit. Rest fully between reps so each jump is as explosive as the last.',
        },
        {
          name: 'Box Squat',
          sets: 4,
          reps: '3',
          rest: '2:30',
          cues: 'Heavy but fast this week — about 80% of your squat weight. Sit onto the box, pause, then explode up. The bar should move quickly. If it feels slow and grindy, the weight is too heavy for a power day like this one.',
        },
        {
          name: 'Speed Trap Bar Deadlift',
          sets: 5,
          reps: '2',
          rest: '2:00',
          cues: 'About 70% of your max — these are speed pulls, meaning the bar should fly off the floor as fast as you can move it. Full lockout, full reset between reps. Every rep is about moving as fast as possible, which trains your nervous system to be explosive.',
        },
        {
          name: 'Leg Press',
          sets: 3,
          reps: '10',
          rest: '1:30',
          cues: 'Moderate weight. Full depth. This is support volume this week — don\'t wreck your legs right before test week, just keep them moving.',
        },
        {
          name: 'Seated Calf Raise',
          sets: 3,
          reps: '15',
          rest: '1:00',
          cues: 'Moderate weight, full range of motion. Maintenance work — full stretch, full squeeze, nothing fancy this week.',
        },
        {
          name: 'Hanging Leg Raise',
          sets: 3,
          reps: '12',
          rest: '1:00',
          cues: 'Legs to parallel or higher, using your abs, not momentum. Control the lowering. Keep your core strong heading into the final week of the program.',
        },
      ],
      cooldown: '5 min: quad stretch (30 sec each side), hamstring stretch (30 sec each side), hip flexor stretch (30 sec each side), child\'s pose (30 sec).',
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
      warmup: '8 min: a thorough warm-up since today is a test day. Band pull-aparts (15 reps), arm circles (15 each direction), push-up walkouts (5 reps), rotator cuff work (15 external rotations each arm). Then work up through progressive bench sets: empty bar for 10 reps, 50% of today\'s target weight for 5 reps, 65% for 3 reps, 75% for 2 reps, 85% for 1 rep — each set gets you closer to your top effort so your body is fully ready when it matters.',
      duration: '60 min',
      exercises: [
        {
          name: 'Bench Press — Work to New 3RM',
          sets: 6,
          reps: '3-2-1-1-3-3',
          rest: '3:00',
          cues: 'This is the day you\'ve been building toward. Work up through the sets: hit a solid triple at about 85% of your estimated max, then a double at about 90%, then attempt a heavy single (or a new personal best single if it feels there). After that, drop back down to about 85% for 2 more sets of 3 reps to finish strong. Trust the training you\'ve put in over the last 5 weeks. Stay tight through your whole body on every rep — you\'ve earned this test.',
        },
        {
          name: 'Overhead Press — Heavy Triple',
          sets: 3,
          reps: '3',
          rest: '2:30',
          cues: 'Work up to a heavy triple (3 reps). Strict press, no leg help. This should be the heaviest strict overhead press for 3 reps you\'ve ever done. Lock it out hard overhead.',
        },
        {
          name: 'Close-Grip Bench Press',
          sets: 3,
          reps: '5',
          rest: '1:30',
          cues: 'Moderate-heavy weight. This is supporting work — don\'t empty your tank here, you already tested on the main bench press today. 5 clean, controlled reps.',
        },
        {
          name: 'Dumbbell Lateral Raise',
          sets: 3,
          reps: '12',
          rest: '1:00',
          cues: 'Light to moderate weight. Keep your shoulders moving and feeling healthy. Easy pump work to close out the day.',
        },
        {
          name: 'Cable Tricep Pushdown',
          sets: 3,
          reps: '10',
          rest: '1:00',
          cues: 'Light pump work. Full extension, full squeeze. You\'re just keeping blood flowing through the muscle here — today was all about the bench press test.',
        },
      ],
      cooldown: '5 min: chest stretch (30 sec each side), shoulder stretch (30 sec each side), tricep stretch (30 sec each side). Write down your new bench press numbers — you\'ll want to remember them.',
    },

    // ---- Day 32: W6 · Pull — Strength (TEST DAY) ----
    {
      day: 'Day 32',
      title: 'W6 · Pull — Strength',
      warmup: '8 min: a thorough warm-up for today\'s test. Band pull-aparts (15 reps), cat-cow (10 slow reps), dead hangs (30 sec). Then work up through progressive deadlift sets: 135 lbs (or a light bar weight) for 5 reps, 50% of today\'s target for 5 reps, 65% for 3 reps, 75% for 2 reps, 85% for 1 rep — this gets your whole body primed for the heavy pulling ahead.',
      duration: '60 min',
      exercises: [
        {
          name: 'Barbell Deadlift — Work to New 3RM',
          sets: 6,
          reps: '3-2-1-1-3-3',
          rest: '3:00',
          cues: 'Test day. Work up through the sets: a triple at about 85% of your estimated max, then a double at about 90%, then go for a heavy single or a new personal best if it\'s there. Follow that with 2 more sets of 3 reps at about 85% to close it out. Perfect setup on every single rep — flat back, big brace, push the floor away with your legs. Record your numbers when you\'re done.',
        },
        {
          name: 'Weighted Pull-Ups — Heavy Triple',
          sets: 3,
          reps: '3',
          rest: '2:30',
          cues: 'Work up to the heaviest triple (3 reps) you can do with clean form. Full dead hang at the bottom, chin clears the bar, slow controlled lowering. This is your pulling strength benchmark for the program.',
        },
        {
          name: 'Barbell Bent-Over Row',
          sets: 3,
          reps: '5',
          rest: '2:00',
          cues: 'Moderate-heavy. Same 45-degree torso angle as always. Pull to your lower chest. This is supporting work — don\'t burn yourself out right after testing your deadlift.',
        },
        {
          name: 'Cable Face Pull',
          sets: 3,
          reps: '15',
          rest: '1:00',
          cues: 'Light weight. Shoulder health work to close the day. Pull to your face, rotate outward, hold the squeeze. Keep your rear shoulders and rotator cuffs happy after all that pulling.',
        },
        {
          name: 'Barbell Curl',
          sets: 3,
          reps: '8',
          rest: '1:00',
          cues: 'Moderate weight. Easy pump work. Strict form, squeeze at the top. A good way to close out a session where you just tested your deadlift and set a new number.',
        },
      ],
      cooldown: '5 min: lat stretch (30 sec), bicep stretch (30 sec each side), lower back stretch (30 sec each side). Record your new deadlift numbers.',
    },

    // ---- Day 33: W6 · Legs — Strength (TEST DAY) ----
    {
      day: 'Day 33',
      title: 'W6 · Legs — Strength',
      warmup: '8 min: a thorough warm-up for today\'s test. Bodyweight squats (15 reps), leg swings (10 each direction, each leg), glute bridges (15 reps). Then work up through progressive squat sets: empty bar for 10 reps, 50% of today\'s target for 5 reps, 65% for 3 reps, 75% for 2 reps, 85% for 1 rep — building up gradually so you\'re fully warm for the heavy work.',
      duration: '60 min',
      exercises: [
        {
          name: 'Barbell Back Squat — Work to New 3RM',
          sets: 6,
          reps: '3-2-1-1-3-3',
          rest: '3:00',
          cues: 'This is the day. Work up through the sets: a triple at about 85% of your estimated max, then a double at about 90%, then attempt a heavy single or a new personal best if it\'s there. Finish with 2 more sets of 3 reps at about 85%. Big breath, hard brace, break parallel every rep. Everything you\'ve built over 5 weeks comes together right here.',
        },
        {
          name: 'Front Squat — Heavy Triple',
          sets: 3,
          reps: '3',
          rest: '2:30',
          cues: 'Work up to a heavy triple (3 reps). Elbows high, core tight the whole time. This should be a personal best for your front squat at 3 reps. If your form breaks down, it doesn\'t count — stay clean.',
        },
        {
          name: 'Barbell Hip Thrust',
          sets: 3,
          reps: '8',
          rest: '1:30',
          cues: 'Moderate weight, supporting work. Full hip extension, 1-second squeeze at the top. Keep your glutes active without crushing yourself right after the squat test.',
        },
        {
          name: 'Leg Curl',
          sets: 3,
          reps: '10',
          rest: '1:15',
          cues: 'Moderate weight. Squeeze at the top, 3-second slow lowering. Balance work for your hamstrings to close out the day.',
        },
        {
          name: 'Standing Calf Raise',
          sets: 3,
          reps: '15',
          rest: '1:00',
          cues: 'Light-moderate weight, full range of motion. An easy finish — the squat was the main event today, so don\'t push these hard.',
        },
      ],
      cooldown: '5 min: pigeon stretch (30 sec each side), quad stretch (30 sec each side), hamstring stretch (30 sec each side). Record your new squat numbers — that\'s the big three done: bench, deadlift, squat.',
    },

    // ---- Day 34: W6 · Push — Volume (DELOAD) ----
    {
      day: 'Day 34',
      title: 'W6 · Push — Volume',
      warmup: '5 min: band pull-aparts (15 reps), arm circles (15 each direction), light push-ups (10 reps).',
      duration: '45 min',
      exercises: [
        {
          name: 'Dumbbell Bench Press',
          sets: 3,
          reps: '10',
          tempo: '3-1-1-0',
          rest: '1:30',
          cues: 'This is a deload day, so use a light to moderate weight — not a max effort day. Focus on feeling the stretch at the bottom and the squeeze at the top of every rep. Your chest is still recovering from testing yesterday, so the goal here is just to move blood through the muscle, not chase load.',
        },
        {
          name: 'Dumbbell Arnold Press',
          sets: 3,
          reps: '10',
          rest: '1:30',
          cues: 'Light to moderate weight. Full rotation, full lockout. This is easy pump work for your shoulders — enjoy the movement without pushing hard.',
        },
        {
          name: '1a. Cable Fly',
          sets: 3,
          reps: '12',
          rest: '0:00',
          cues: 'Light weight. Squeeze your chest at the peak of each rep. This is about blood flow for recovery, not building strength today. Superset straight into front raises.',
        },
        {
          name: '1b. Dumbbell Front Raise',
          sets: 3,
          reps: '12',
          rest: '1:00',
          cues: 'Light weight. Thumbs up, raise to eye level. Controlled reps. An easy way to finish this superset.',
        },
        {
          name: 'Overhead Tricep Extension',
          sets: 3,
          reps: '12',
          rest: '1:00',
          cues: 'Light weight. Full stretch, full extension. Keep your triceps moving and mobile — this is recovery volume, not a burnout.',
        },
      ],
      cooldown: '5 min: chest stretch (30 sec each side), shoulder stretch (30 sec each side), tricep stretch (30 sec each side).',
    },

    // ---- Day 35: W6 · Pull — Volume (DELOAD) ----
    {
      day: 'Day 35',
      title: 'W6 · Pull — Volume',
      warmup: '5 min: band pull-aparts (15 reps), scap push-ups (10 reps), cat-cow (10 slow reps), light cable rows (15 reps).',
      duration: '45 min',
      exercises: [
        {
          name: 'Chest-Supported Dumbbell Row',
          sets: 3,
          reps: '10',
          rest: '1:30',
          cues: 'Light to moderate weight. Pull to your hip, squeeze for a second at the top. This is recovery volume — move some blood through your back without grinding out a hard set.',
        },
        {
          name: 'Lat Pulldown',
          sets: 3,
          reps: '10',
          rest: '1:30',
          cues: 'Light to moderate weight. Standard grip. Pull to your upper chest, squeeze your back muscles. Smooth, controlled reps — nothing heavy today.',
        },
        {
          name: '1a. Seated Cable Row',
          sets: 3,
          reps: '12',
          rest: '0:00',
          cues: 'Light weight. Pull to your belly, shoulder blades together at the finish. Superset straight into reverse flys.',
        },
        {
          name: '1b. Reverse Fly',
          sets: 3,
          reps: '15',
          rest: '1:00',
          cues: 'Light weight. Hold the peak position for a second. This is rear shoulder and posture maintenance work — keep it easy.',
        },
        {
          name: 'Incline Dumbbell Curl',
          sets: 3,
          reps: '10',
          rest: '1:00',
          cues: 'Light weight. Full stretch, full contraction. Enjoy the pump — your pulling muscles are recovering from the deadlift test yesterday.',
        },
      ],
      cooldown: '5 min: lat stretch (30 sec), bicep stretch (30 sec each side), foam roll upper back (1 minute). Almost done with the whole program.',
    },

    // ---- Day 36: W6 · Legs — Power (FINAL SESSION) ----
    {
      day: 'Day 36',
      title: 'W6 · Legs — Power',
      warmup: '5 min: foam roll (1 minute), leg swings (10 each direction, each leg), bodyweight squats (15 reps), 5 box jumps at a medium height — focus on being explosive and landing clean, this is your last session so make every warmup rep count too.',
      duration: '50 min',
      exercises: [
        {
          name: 'Box Jump',
          sets: 5,
          reps: '3',
          rest: '2:00',
          cues: 'Pure explosive power to celebrate the finish line. Quick dip, jump with everything you have, land softly with bent knees on top of the box. Step back down — never jump down. Rest fully between reps so every single jump is your best effort. This is about being athletic, not just strong.',
        },
        {
          name: 'Speed Deadlift',
          sets: 5,
          reps: '2',
          rest: '1:30',
          cues: 'Use a regular barbell, not the trap bar. Load it to about 60% of your new 1-rep max from Tuesday\'s test. These are speed pulls — the bar should fly off the floor as fast as you can move it. Full lockout, full reset every rep. Notice how much faster this weight moves now compared to Week 1 — that\'s real proof of how much stronger you\'ve gotten.',
        },
        {
          name: 'Leg Press',
          sets: 3,
          reps: '10',
          rest: '1:30',
          cues: 'Moderate weight. Full depth. Easy volume to close out the program — your legs have been through a lot over 6 weeks, so give them some lighter work today.',
        },
        {
          name: 'Bulgarian Split Squat',
          sets: 3,
          reps: '8 each',
          rest: '1:30',
          cues: 'Moderate dumbbells. Rear foot on the bench, drop straight down. Clean reps to maintain the single-leg strength you built over the program.',
        },
        {
          name: 'Seated Calf Raise',
          sets: 3,
          reps: '15',
          rest: '1:00',
          cues: 'Light to moderate weight. Full stretch, full squeeze. This is the last set of calf work in the whole program — make it count.',
        },
        {
          name: 'Ab Wheel Rollout',
          sets: 3,
          reps: '10',
          rest: '1:00',
          cues: 'Roll out as far as you\'ve earned over these 6 weeks. Core braced, no sagging in your lower back. This is the very last exercise of the program — leave everything you\'ve got on the floor. You showed up for 36 days and got stronger. That\'s what being Called to Compete means.',
        },
      ],
      cooldown: '10 min: a full-body stretch to close out the program — quads (standing, pull heel to glutes, 30 sec each side), hamstrings (seated, reach for your toes, 30 sec each side), hip flexors (kneeling lunge stretch, 30 sec each side), chest (doorway stretch, 30 sec each side), shoulders (cross-body stretch, 30 sec each side), lats (hang from a bar, 30 sec). You just finished a serious 6-week strength program. Record your final numbers, compare them to where you started in Week 1, and be proud of the work you put in.',
    },
  ],
}
