export type Exercise = {
  name: string
  sets: number
  reps: string
  tempo?: string
  rest: string
  cues: string
  videoUrl?: string
}

export type TrainingDay = {
  day: string
  title: string
  warmup?: string
  exercises: Exercise[]
  cooldown?: string
  duration: string
}

export type Program = {
  id: string
  name: string
  weeks: number
  days: TrainingDay[]
  frequency: string
  description: string
  category: 'strength' | 'hybrid' | 'conditioning' | 'functional' | 'running' | 'athletic' | 'sprint'
  image?: string
}

import { athleticProgram } from './athlete-program'
import { strengthProgram } from './strength-program'
import { runningProgram } from './running-program'
import { sprintProgram } from './sprint-program'

export { athleticProgram, strengthProgram, runningProgram, sprintProgram }

export const functionalFitnessProgram: Program = {
  id: 'functional-fitness',
  name: 'CTC Foundations',
  weeks: 8,
  frequency: '3x / week',
  description: '8-week periodized program. Strength, volume, and power — your starting point to compete.',
  category: 'functional',
  image: '/programs/functional.jpg',
  days: [
    {
      day: 'Day 1',
      title: 'Strength',
      warmup: '10 min: Start with 2 minutes on the stationary bike at an easy pace to get your blood flowing and your joints warm. Then monster walks — put a resistance band around your ankles, get into a quarter-squat position, and take small steps sideways, keeping tension on the band the whole time (this wakes up your hips and glutes). Next, single-arm dumbbell external rotations — hold a light dumbbell, elbow bent at 90 degrees and pinned to your side, and rotate your forearm outward away from your body (this warms up your shoulder joint for pressing and pulling). Then banded hip hinges — loop a band around a rack at hip height, step back until there\'s tension, then hinge at your hips (push your butt back, soft knees, flat back) until you feel a stretch in your hamstrings, then stand tall and squeeze your glutes. Finish with bodyweight squats — feet shoulder-width apart, sit your hips back and down like you\'re sitting in a chair, chest up, then stand back up.',
      duration: '60 min',
      exercises: [
        {
          name: 'Barbell Back Squat',
          sets: 4,
          reps: '8-6-4-4',
          rest: '2:30',
          cues: 'This is a foundational movement — squatting down like you\'re sitting in a chair, then standing back up with weight on your back. Coach Tyler will guide how much weight you use and increase it each week — don\'t worry about the number, just focus on the movement. Set the bar across your upper back (not your neck), grip it wide, and stand tall. Keep your chest up and eyes forward the whole time. Push your hips back first, then bend your knees, and sit down until your hip crease drops below your knee — that\'s "full depth." Drive through your heels (not your toes) to stand back up. You\'ll feel this in your quads (front of thighs), glutes (butt), and core.',
        },
        {
          name: 'Barbell Deadlift',
          sets: 4,
          reps: '8-6-4-4',
          rest: '2:30',
          cues: 'This move teaches you to pick something heavy up off the ground safely — one of the most useful strength skills you\'ll ever build. You\'ll follow the same progressive weight increases as the squat. Stand with the bar over your shoelaces, feet hip-width apart. Bend down and grip the bar just outside your legs, keeping your back flat (not rounded) and your chest up — imagine someone could read a logo on your shirt the whole time. Take a big breath, brace your core like you\'re about to get punched in the stomach, then push the floor away with your legs while keeping the bar close against your shins. Finish by squeezing your glutes and standing up tall — hips and knees locked out at the top. You\'ll feel this in your hamstrings, glutes, and lower back.',
        },
        {
          name: 'Bench Press',
          sets: 4,
          reps: '8-6-4-4',
          rest: '2:30',
          cues: 'Lying on a bench, you\'ll press a weighted bar up and away from your chest — this builds your chest, shoulders, and triceps (back of your upper arm). Same weight progression as the squat. Lie back, feet flat on the floor, and pinch your shoulder blades together and down (like you\'re tucking them into your back pockets) — this protects your shoulders and gives you a stable base. Lower the bar under control until it lightly touches your chest, then press it back up explosively in a straight line. Keep your wrists stacked directly over your elbows.',
        },
        {
          name: 'Barbell Bent-Over Row',
          sets: 3,
          reps: '10',
          rest: '1:30',
          cues: 'This move works your entire back — think of it as the opposite motion of the bench press. Hold the bar with an overhand grip, hinge forward at your hips until your torso is at about a 45-degree angle (like you\'re bowing slightly), knees soft, back flat. Let the bar hang, then pull it up toward your lower chest, squeezing your shoulder blades together at the top like you\'re trying to pinch a pencil between them. Lower it back down with control — don\'t just let it drop. You should feel this between your shoulder blades and in your upper back.',
        },
        {
          name: 'Walking Lunge',
          sets: 3,
          reps: '12',
          rest: '1:30',
          cues: 'Holding a dumbbell in each hand, take a long step forward and lower your body straight down until your back knee lightly taps the floor (or hovers just above it) — both knees should be bent around 90 degrees. Push off your front foot to step through into the next lunge, alternating legs as you walk forward. Keep your torso tall and chest up the whole time — don\'t lean forward. This builds strength and balance in your quads, glutes, and hamstrings, one leg at a time.',
        },
        {
          name: 'Pull-Ups',
          sets: 3,
          reps: '8',
          rest: '1:30',
          cues: 'Grip a pull-up bar with your palms facing away from you, hands just outside shoulder width. Start from a full dead hang (arms completely straight) and pull your body up until your chin clears the bar, driving your elbows down toward your hips. Lower yourself back down slowly and under control (this is called "the negative") until your arms are straight again — don\'t just drop. No swinging or kicking your legs for momentum ("kipping") — this is a strict, controlled pull. You\'ll feel this in your back (lats) and biceps. If you can\'t do a full pull-up yet, that\'s okay — Coach Tyler will help you scale it until you build up to it.',
        },
        {
          name: 'Plank',
          sets: 3,
          reps: '30 sec',
          rest: '0:45',
          cues: 'Get into a push-up position but rest on your forearms instead of your hands, elbows directly under your shoulders. Your body should form one straight line from your head to your heels — no sagging hips, no butt in the air. Squeeze your glutes and brace your core like you\'re about to get poked in the stomach. Keep breathing normally the whole time — don\'t hold your breath. This builds the core strength that protects your spine in every other lift.',
        },
        {
          name: 'Ab Rollouts',
          sets: 3,
          reps: '8',
          rest: '1:00',
          cues: 'Kneeling on the floor holding an ab wheel (or a barbell with weight plates) in both hands, brace your core tight and slowly roll the wheel forward, letting your body extend out as far as you can while keeping full control — don\'t let your lower back sag or your hips drop toward the floor. Once you reach your limit, use your abs (not your hips) to pull yourself back to the starting position. Go slow — this is about control, not speed.',
        },
      ],
      cooldown: '5 min: Grab a foam roller and slowly roll out your quads (front of your thighs) — lie face down, roller under your thighs, and roll from hip to knee, pausing on any tight spots for a few seconds. Then your hamstrings (back of your thighs) — sit with the roller under your legs, roll from your glutes to just above your knee. Finish with your glutes — sit on the roller, cross one ankle over the opposite knee, and roll that side. This helps flush out soreness and speeds up recovery.',
    },
    {
      day: 'Day 2',
      title: 'Volume & Bodybuilding',
      warmup: '10 min: Start with 2 minutes on the ski erg (the standing cable machine that mimics a skiing motion) at an easy pace to raise your heart rate and warm up your upper body. Then banded pull-aparts — hold a resistance band in front of you with both hands, arms straight, and pull it apart until it touches your chest, squeezing your shoulder blades together, then return with control (this wakes up your upper back and shoulders for pressing and pulling). Next, single-arm dumbbell overhead carry — hold a light dumbbell straight overhead with one arm locked out, and walk a short distance while keeping your core tight and the weight steady (this builds shoulder stability). Finish with lunge jumps — start in a lunge position, then jump up and switch legs in the air, landing softly in a lunge on the other side (this fires up your legs and gets your heart rate up).',
      duration: '55 min',
      exercises: [
        {
          name: '1a. Incline Dumbbell Bench Press',
          sets: 4,
          reps: '15-12-10-8',
          rest: '1:30',
          cues: 'Set an adjustable bench to about a 30-45 degree incline. Holding a dumbbell in each hand at chest level, press them straight up until your arms are extended, then lower them slowly until you feel a full stretch across your chest. Increase the weight slightly each set as you warm up. Squeeze your chest together at the top like you\'re hugging a tree. This targets your upper chest more than a flat bench press does.',
        },
        {
          name: '1b. Seated Low Row',
          sets: 4,
          reps: '10',
          rest: '1:15',
          cues: 'Sit at the cable row machine with your knees slightly bent, feet on the platform. Grab the handle and sit up tall — don\'t round your lower back. Pull the handle straight back toward your belly button, driving your elbows behind you and squeezing your shoulder blades together like you\'re trying to hold a pencil between them. Return slowly with control, letting your arms extend and your shoulder blades stretch forward, without rounding your chest forward.',
        },
        {
          name: '2a. Arnold Press',
          sets: 3,
          reps: '10',
          rest: '1:15',
          cues: 'Hold a dumbbell in each hand at shoulder height with your palms facing your body (like you just finished a bicep curl). As you press the weights overhead, rotate your wrists so your palms end up facing forward at the top, arms fully locked out. Reverse the rotation as you lower back down. This hits your shoulders from multiple angles in one rep.',
        },
        {
          name: '2b. Cable Tricep Extensions',
          sets: 3,
          reps: '12',
          rest: '1:00',
          cues: 'Stand facing a cable machine with a rope or bar attachment set at the top. Pin your elbows to your sides and keep them locked in place — they shouldn\'t move for the whole set. Push the attachment down until your arms are fully straight, squeezing your triceps (back of your upper arm) hard at the bottom, then let it rise back up with control until your forearms are parallel to the floor.',
        },
        {
          name: '3a. Reverse Cable Crossover',
          sets: 3,
          reps: '15',
          rest: '1:00',
          cues: 'Set two cables at chest height and cross the handles (right hand grabs the left cable, left hand grabs the right). With a slight bend in your elbows, pull your arms out and back in a wide arc, like you\'re opening your arms for a hug in reverse. Squeeze your rear delts (the back of your shoulders) hard at the end of every rep before returning to the start with control.',
        },
        {
          name: '3b. Farmer Carry + Shrugs',
          sets: 3,
          reps: '20 yd carry + 10 shrugs',
          rest: '1:30',
          cues: 'Pick up a heavy dumbbell in each hand and walk 20 yards with tall posture — shoulders back, core tight, like you\'re carrying grocery bags but staying perfectly upright. As soon as you finish the carry, immediately do 10 shrugs with the same dumbbells — just lift your shoulders straight up toward your ears, then lower them back down. Your grip will be screaming by the end — that\'s exactly the point. This builds real-world grip and shoulder strength.',
        },
        {
          name: 'Dumbbell Split Squat',
          sets: 3,
          reps: '10 each',
          rest: '1:15',
          cues: 'Stand a couple feet in front of a bench, holding a dumbbell in each hand. Place the top of your back foot on the bench behind you, so you\'re balancing on your front leg. Lower your body straight down by bending your front knee — it should track in line with your toes, not cave inward. Keep your torso upright the whole time; don\'t lean forward over your front knee. Push through your front heel to stand back up. You\'ll feel this hard in your front leg\'s quad and glute.',
        },
        {
          name: 'Barbell Hip Thrust',
          sets: 2,
          reps: '10 + 10 sec hold + 10',
          rest: '1:30',
          cues: 'Sit on the ground with your upper back resting against a bench, a barbell rolled over your hips (use a pad for comfort). Feet flat on the floor, knees bent. Drive through your heels to push your hips straight up until your body forms a straight line from your shoulders to your knees, squeezing your glutes hard at the top — that\'s "full hip extension." Lower back down with control. After each block of reps, hold the top position for 10 seconds before starting the next block. This is one of the best exercises for building glute strength.',
        },
        {
          name: 'Cable Crunches',
          sets: 2,
          reps: '20',
          rest: '0:45',
          cues: 'Kneel facing a cable machine with a rope attachment set at the top. Hold the rope by your head and crunch down, rounding your upper back and bringing your elbows toward your knees — like you\'re curling into a ball. Exhale hard as you crunch down and really feel your abs squeeze. Rise back up with control. Your hips should stay still — all the movement comes from your abs, not your hips.',
        },
        {
          name: 'Dumbbell Oblique Crunch',
          sets: 2,
          reps: '15 each side',
          rest: '0:45',
          cues: 'Stand tall holding a single dumbbell down at your side with one hand. Without leaning forward or backward, crunch your torso sideways, bringing your ribcage down toward your hip on the same side as the dumbbell — you\'ll feel this in your obliques (the sides of your core). Return to standing with control. Don\'t rush the movement — this is about a controlled squeeze, not momentum. Finish all your reps on one side before switching.',
        },
      ],
      cooldown: '5 min: Chest stretch — stand in a doorway, place your forearm on the frame with your elbow bent at 90 degrees, and gently lean forward until you feel a stretch across your chest, hold 20-30 seconds each side. Lat stretch — reach one arm overhead and grab a sturdy post or rack, then lean your hips away from it until you feel a stretch down your side/lat, hold 20-30 seconds each side. Shoulder stretch — bring one arm straight across your chest and use your other arm to gently pull it closer, hold 20-30 seconds each side.',
    },
    {
      day: 'Day 3',
      title: 'Power & Speed',
      warmup: '10 min: Line hops — hop forward and back over a line on the ground with both feet together, quick and light. Lateral hops — same idea but hopping side to side over the line. High knees — jog in place (or moving forward) driving your knees up toward your chest as fast as you can, pumping your arms. A-skips — a skipping drill where you drive one knee up sharply while hopping on the opposite foot, then switch — it teaches your body the knee-drive pattern used in sprinting. Finish with a few build-up sprints — jog into a gradual sprint, building from an easy jog up to about 70% speed over 20-30 yards, then walk back and repeat. This wakes up your whole nervous system for the explosive work ahead.',
      duration: '55 min',
      exercises: [
        {
          name: 'Double Leg Line Hops',
          sets: 2,
          reps: '15 sec',
          rest: '0:30',
          cues: 'Stand with feet together next to a line on the ground (tape, a stick, or just an imaginary line works). Hop side to side over the line with both feet together, as quick and light as possible. Land softly on the balls of your feet each time — think "quiet feet." This wakes up your nervous system and prepares your legs for the explosive work coming up.',
        },
        {
          name: 'Double Leg Lateral Line Hops',
          sets: 2,
          reps: '15 sec',
          rest: '0:30',
          cues: 'Same setup as the line hops, but now imagine the line running left to right in front of you and you\'re hopping side to side across it with both feet together. Stay light and fast, and bend your knees slightly on each landing to absorb the impact — don\'t land stiff-legged.',
        },
        {
          name: 'Single Leg Line Hops',
          sets: 2,
          reps: '10 sec each',
          rest: '0:30',
          cues: 'Balance on one foot and hop side to side over the line, landing soft and controlled on that same foot each time. This is much harder than the double-leg version — it trains the balance and ankle stability you need for sprinting and cutting on one leg at a time. Do your reps on one leg, then switch.',
        },
        {
          name: '1a. Power Clean',
          sets: 4,
          reps: '5-4-3-3',
          rest: '2:30',
          cues: 'This is an advanced, technical lift — Coach Tyler will walk you through it hands-on before you load any real weight, and the weight builds gradually across the 8 weeks. The basic idea: start with the bar on the floor, pull it up explosively by extending your hips, knees, and ankles all at once (that\'s "triple extension") like you\'re jumping while holding the bar. As the bar rises, pull yourself underneath it and "catch" it across the front of your shoulders with your elbows up — that\'s the front rack position. It looks complicated at first, but it\'s one of the best ways to build total-body power. Don\'t rush it — technique first, weight later.',
        },
        {
          name: '1b. Box Jumps',
          sets: 4,
          reps: '2',
          rest: '1:30',
          cues: 'Stand facing a sturdy box or platform. Bend your knees and swing your arms back, then explode upward and land softly on top of the box with both feet, knees bent to absorb the landing. Choose a height you can land on safely and with control — this isn\'t about jumping as high as possible if it means a sloppy landing. Stand up fully at the top, hips completely extended. Always step back down one foot at a time — never jump down, that\'s hard on your joints.',
        },
        {
          name: '2a. Explosive Sled Rows',
          sets: 4,
          reps: '8',
          rest: '1:15',
          cues: 'Attach a rope or handles to a loaded sled and face the sled with the rope in both hands. Pull the sled toward you explosively, driving hard with your back and arms, then return the rope with control (not letting it just fly back). Keep your whole body tight — brace your core like you\'re about to get hit — and drive the movement from your back, not just your arms.',
        },
        {
          name: '2b. Explosive Push-Ups',
          sets: 4,
          reps: '10',
          rest: '1:00',
          cues: 'Start in a standard push-up position. Lower yourself down under control, then push up so explosively that your hands actually leave the ground. Land softly with slightly bent elbows to absorb the impact, then immediately lower back down into the next rep. This builds explosive upper-body power — the same quality that makes your push and press movements faster and stronger.',
        },
        {
          name: '3a. Heavy Sled Pushes',
          sets: 3,
          reps: '30 yards',
          rest: '2:00',
          cues: 'Load up a sled and get behind it with your arms locked straight out in front of you on the handles. Lean your whole body forward at a low angle — you should feel like you\'re almost falling forward, with the sled holding you up. Take short, powerful, driving steps, pushing hard through the ground with each stride. This builds explosive leg drive and conditions your whole body at the same time.',
        },
        {
          name: '3b. Kettlebell Swing',
          sets: 3,
          reps: '12',
          rest: '1:00',
          cues: 'Stand with feet shoulder-width apart, kettlebell on the ground in front of you. Hinge at your hips (push your butt back, soft knees, flat back) and grab the bell with both hands. Hike it back between your legs like a football snap, then explosively snap your hips forward — that snap is what sends the bell floating up to about chest height, arms staying relatively relaxed. Let it swing back down between your legs and immediately hinge into the next rep. The power comes entirely from your hips snapping forward, not from lifting with your arms or shoulders.',
        },
        {
          name: 'Finisher',
          sets: 1,
          reps: 'Max rounds in 8-10 min',
          rest: '-',
          cues: 'This is a conditioning finisher to cap off the workout. Run 200 meters (half a lap around a standard track), then immediately do 10 dumbbell thrusters — hold a dumbbell in each hand at your shoulders, squat down, then stand up explosively and press the dumbbells overhead in one fluid motion. That\'s one round. Repeat for as many rounds as you can in the time given. Keep moving the whole time — only rest when you absolutely have to catch your breath. Push your pace; this is about testing your conditioning after a hard day of lifting.',
        },
      ],
      cooldown: '5 min: Grab a foam roller and roll out your major muscle groups — quads, hamstrings, glutes, and upper back — spending extra time on any spots that feel tight or sore. Follow with a few full-body stretches, holding each for 20-30 seconds: a standing quad stretch, a seated hamstring reach, and a cross-body shoulder stretch. This is a hard training day — give your body the time it needs to start recovering.',
    },
  ],
}

export const allPrograms: Program[] = [
  athleticProgram,
  strengthProgram,
  functionalFitnessProgram,
  runningProgram,
  sprintProgram,
]

export function getProgram(identity: string): Program {
  return identity === 'athlete' ? athleticProgram : functionalFitnessProgram
}

export function getProgramById(id: string): Program | undefined {
  return allPrograms.find((p) => p.id === id)
}
