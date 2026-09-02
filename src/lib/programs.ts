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
}

export const athleticProgram: Program = {
  id: 'athletic-performance',
  name: 'Athletic Performance',
  weeks: 4,
  days: [
    {
      day: 'Day 1',
      title: 'Lower Body Power',
      warmup: '5 min dynamic stretching: leg swings, hip circles, walking lunges, high knees',
      duration: '55 min',
      exercises: [
        {
          name: 'Barbell Back Squat',
          sets: 4,
          reps: '6',
          tempo: '3-1-1-0',
          rest: '2:30',
          cues: 'Chest up, drive through heels. Full depth — hip crease below knee.',
        },
        {
          name: 'Romanian Deadlift',
          sets: 3,
          reps: '8',
          tempo: '3-1-1-0',
          rest: '2:00',
          cues: 'Hinge at hips, slight knee bend. Feel the stretch in hamstrings before driving up.',
        },
        {
          name: 'Bulgarian Split Squat',
          sets: 3,
          reps: '10 each',
          rest: '1:30',
          cues: 'Rear foot elevated. Front knee tracks over toes. Stay upright.',
        },
        {
          name: 'Box Jumps',
          sets: 4,
          reps: '5',
          rest: '1:30',
          cues: 'Explode up, land soft. Step down — don\'t jump down. Full hip extension at the top.',
        },
        {
          name: 'Sled Push',
          sets: 3,
          reps: '40 yards',
          rest: '2:00',
          cues: 'Low body angle, drive through the ground. Short powerful steps.',
        },
      ],
      cooldown: '5 min foam rolling: quads, hamstrings, glutes, calves',
    },
    {
      day: 'Day 2',
      title: 'Upper Body Strength',
      warmup: '5 min: band pull-aparts, arm circles, push-up to downward dog',
      duration: '50 min',
      exercises: [
        {
          name: 'Bench Press',
          sets: 4,
          reps: '6',
          tempo: '3-1-1-0',
          rest: '2:30',
          cues: 'Shoulder blades pinched, feet flat. Control the descent — explode up.',
        },
        {
          name: 'Bent-Over Barbell Row',
          sets: 4,
          reps: '8',
          tempo: '2-1-1-0',
          rest: '2:00',
          cues: '45-degree torso angle. Pull to lower chest, squeeze shoulder blades.',
        },
        {
          name: 'Dumbbell Shoulder Press',
          sets: 3,
          reps: '10',
          rest: '1:30',
          cues: 'Full range of motion. Don\'t arch the back. Lock out at the top.',
        },
        {
          name: 'Weighted Chin-Ups',
          sets: 3,
          reps: '6-8',
          rest: '2:00',
          cues: 'Full dead hang to chin over bar. Control the negative.',
        },
        {
          name: 'Face Pulls',
          sets: 3,
          reps: '15',
          rest: '1:00',
          cues: 'Pull to forehead level, external rotate at the end. Squeeze rear delts.',
        },
        {
          name: 'Farmer\'s Carry',
          sets: 3,
          reps: '40 yards',
          rest: '1:30',
          cues: 'Heavy weight, tall posture. Shoulders packed, core braced.',
        },
      ],
      cooldown: '5 min stretching: chest, lats, shoulders',
    },
    {
      day: 'Day 3',
      title: 'Speed & Agility',
      warmup: '10 min: A-skips, B-skips, lateral shuffles, karaoke, build-up sprints',
      duration: '45 min',
      exercises: [
        {
          name: '10-Yard Sprint',
          sets: 6,
          reps: '1',
          rest: '1:30',
          cues: 'Explosive start. Drive phase — 45-degree body angle for first 5 steps.',
        },
        {
          name: '5-10-5 Pro Agility',
          sets: 4,
          reps: '1',
          rest: '2:00',
          cues: 'Low center of gravity on cuts. Plant outside foot hard, drive opposite direction.',
        },
        {
          name: 'Lateral Bound',
          sets: 3,
          reps: '8 each',
          rest: '1:30',
          cues: 'Stick each landing for 1 second. Absorb with a soft knee.',
        },
        {
          name: 'Cone Drill — L-Drill',
          sets: 4,
          reps: '1',
          rest: '2:00',
          cues: 'Tight turns around cones. Stay low through transitions.',
        },
        {
          name: 'Broad Jump',
          sets: 4,
          reps: '3',
          rest: '1:30',
          cues: 'Load the hips, swing arms, explode forward. Stick the landing.',
        },
        {
          name: 'Sprint Intervals',
          sets: 6,
          reps: '100 yards',
          rest: '1:00',
          cues: '85% effort. Focus on mechanics — high knees, arm drive, relaxed face.',
        },
        {
          name: 'Ladder Drills',
          sets: 3,
          reps: '2 patterns',
          rest: '1:00',
          cues: 'Quick feet, light contact. Ickey shuffle + in-in-out-out.',
        },
      ],
      cooldown: '5 min: hip flexor stretch, hamstring stretch, calf stretch',
    },
    {
      day: 'Day 4',
      title: 'Total Body Conditioning',
      warmup: '5 min: jump rope, mountain climbers, inchworms',
      duration: '60 min',
      exercises: [
        {
          name: 'Power Clean',
          sets: 4,
          reps: '5',
          rest: '2:30',
          cues: 'Triple extension — hips, knees, ankles. Catch in a front rack, absorb in a quarter squat.',
        },
        {
          name: 'Dumbbell Thruster',
          sets: 3,
          reps: '12',
          rest: '1:30',
          cues: 'Squat deep, drive overhead in one motion. Lock out at the top.',
        },
        {
          name: 'Pull-Ups',
          sets: 4,
          reps: '8-10',
          rest: '1:30',
          cues: 'Full range. Dead hang to chin over bar. No kipping.',
        },
        {
          name: 'Battle Rope Slams',
          sets: 4,
          reps: '30 sec',
          rest: '1:00',
          cues: 'Full body — use your hips, not just arms. Controlled aggression.',
        },
        {
          name: 'Prowler Push + Pull',
          sets: 3,
          reps: '40 yards each',
          rest: '2:00',
          cues: 'Push: low angle, short steps. Pull: hand over hand, drive with legs.',
        },
      ],
      cooldown: '10 min: full body stretch and foam roll',
    },
    {
      day: 'Day 5',
      title: 'Recovery & Mobility',
      warmup: '5 min easy walk or light bike',
      duration: '35 min',
      exercises: [
        {
          name: 'Foam Roll — Full Body',
          sets: 1,
          reps: '60 sec each area',
          rest: '-',
          cues: 'Quads, hamstrings, glutes, IT band, lats, upper back. Slow passes.',
        },
        {
          name: '90/90 Hip Stretch',
          sets: 2,
          reps: '60 sec each side',
          rest: '-',
          cues: 'Sit tall, lean forward into the stretch. Breathe deep.',
        },
        {
          name: 'Cat-Cow',
          sets: 2,
          reps: '10',
          rest: '-',
          cues: 'Controlled movement. Full flexion and extension of the spine.',
        },
        {
          name: 'World\'s Greatest Stretch',
          sets: 2,
          reps: '5 each side',
          rest: '-',
          cues: 'Lunge, rotate, reach. Open up the hips and thoracic spine.',
        },
        {
          name: 'Banded Shoulder Distraction',
          sets: 2,
          reps: '45 sec each side',
          rest: '-',
          cues: 'Face away from anchor. Let the band pull the shoulder forward, rotate slowly.',
        },
        {
          name: 'Supine Spinal Twist',
          sets: 2,
          reps: '60 sec each side',
          rest: '-',
          cues: 'Knees stacked, arms out. Let gravity do the work. Breathe.',
        },
        {
          name: 'Diaphragmatic Breathing',
          sets: 1,
          reps: '3 min',
          rest: '-',
          cues: '4 seconds in through the nose, 6 seconds out through the mouth. Belly rises first.',
        },
        {
          name: 'Meditation / Visualization',
          sets: 1,
          reps: '5 min',
          rest: '-',
          cues: 'Eyes closed. Visualize tomorrow\'s training session. See yourself executing perfectly.',
        },
      ],
    },
  ],
}

export const executiveProgram: Program = {
  id: 'executive-performance',
  name: 'Executive Performance Protocol',
  weeks: 4,
  days: [
    {
      day: 'Day 1',
      title: 'Strength Foundations',
      warmup: '5 min: bodyweight squats, arm circles, cat-cow, hip hinges',
      duration: '45 min',
      exercises: [
        {
          name: 'Goblet Squat',
          sets: 3,
          reps: '10',
          tempo: '3-1-1-0',
          rest: '1:30',
          cues: 'Elbows inside knees at the bottom. Chest up, weight in heels.',
        },
        {
          name: 'Dumbbell Bench Press',
          sets: 3,
          reps: '10',
          tempo: '3-1-1-0',
          rest: '1:30',
          cues: 'Control the descent. Press to full lockout. Shoulder blades pinched.',
        },
        {
          name: 'Single-Arm Dumbbell Row',
          sets: 3,
          reps: '10 each',
          rest: '1:15',
          cues: 'Pull to hip. Squeeze the lat at the top. Don\'t rotate the torso.',
        },
        {
          name: 'Kettlebell Deadlift',
          sets: 3,
          reps: '12',
          rest: '1:30',
          cues: 'Push hips back, flat back. Drive through heels to stand.',
        },
        {
          name: 'Plank Hold',
          sets: 3,
          reps: '45 sec',
          rest: '1:00',
          cues: 'Straight line head to heels. Squeeze glutes, brace core. Breathe.',
        },
      ],
      cooldown: '5 min: chest stretch, hip flexor stretch, child\'s pose',
    },
    {
      day: 'Day 2',
      title: 'Conditioning + Breathwork',
      warmup: '5 min: light jog, arm swings, leg swings',
      duration: '40 min',
      exercises: [
        {
          name: 'Kettlebell Swing',
          sets: 4,
          reps: '15',
          rest: '1:00',
          cues: 'Hip hinge — not a squat. Snap hips forward, float the bell to chest height.',
        },
        {
          name: 'Rowing Machine Intervals',
          sets: 5,
          reps: '250m',
          rest: '1:00',
          cues: 'Legs-back-arms on the drive, arms-back-legs on recovery. Aim for consistent split.',
        },
        {
          name: 'Push-Up to Rotation',
          sets: 3,
          reps: '8 each side',
          rest: '1:00',
          cues: 'Full push-up, rotate to side plank at the top. Open the chest.',
        },
        {
          name: 'Med Ball Slam',
          sets: 3,
          reps: '12',
          rest: '1:00',
          cues: 'Reach overhead, slam with your whole body. Pick up and reset each rep.',
        },
        {
          name: 'Box Breathing',
          sets: 1,
          reps: '5 min',
          rest: '-',
          cues: '4 seconds inhale, 4 hold, 4 exhale, 4 hold. Focus on complete stillness.',
        },
        {
          name: 'Wim Hof Breathing',
          sets: 3,
          reps: '30 breaths + hold',
          rest: '1:00',
          cues: 'Deep belly breaths in, passive exhale out. After 30, exhale and hold as long as comfortable.',
        },
      ],
      cooldown: '5 min: standing forward fold, doorway chest stretch',
    },
    {
      day: 'Day 3',
      title: 'Focus & Power',
      warmup: '5 min: jump rope, mobility flow',
      duration: '50 min',
      exercises: [
        {
          name: 'Trap Bar Deadlift',
          sets: 4,
          reps: '6',
          rest: '2:30',
          cues: 'Neutral spine, grip hard. Drive the floor away from you.',
        },
        {
          name: 'Dumbbell Push Press',
          sets: 3,
          reps: '8',
          rest: '1:30',
          cues: 'Quarter dip, drive explosively. Lock out overhead.',
        },
        {
          name: 'TRX Row',
          sets: 3,
          reps: '12',
          rest: '1:15',
          cues: 'Body straight as a plank. Pull chest to handles, squeeze at the top.',
        },
        {
          name: 'Dumbbell Walking Lunge',
          sets: 3,
          reps: '10 each',
          rest: '1:30',
          cues: 'Long stride, back knee kisses the floor. Stay tall and controlled.',
        },
        {
          name: 'Pallof Press',
          sets: 3,
          reps: '10 each side',
          rest: '1:00',
          cues: 'Resist the rotation. Press out slowly, hold for a beat, bring it back.',
        },
      ],
      cooldown: '5 min: pigeon stretch, thoracic spine rotation, deep breathing',
    },
    {
      day: 'Day 4',
      title: 'Recovery & Mobility',
      warmup: '5 min easy walk',
      duration: '30 min',
      exercises: [
        {
          name: 'Foam Roll — Full Body',
          sets: 1,
          reps: '60 sec each area',
          rest: '-',
          cues: 'Upper back, lats, quads, hamstrings, calves. Slow and controlled.',
        },
        {
          name: 'Hip 90/90 Flow',
          sets: 2,
          reps: '8 transitions',
          rest: '-',
          cues: 'Smooth transitions between sides. Sit tall throughout.',
        },
        {
          name: 'Thoracic Spine Rotation',
          sets: 2,
          reps: '8 each side',
          rest: '-',
          cues: 'Side-lying position. Follow the hand with your eyes. Open up fully.',
        },
        {
          name: 'Banded Pull-Apart',
          sets: 2,
          reps: '15',
          rest: '-',
          cues: 'Light band, slow reps. Focus on squeezing the upper back.',
        },
        {
          name: 'Yoga Flow',
          sets: 1,
          reps: '5 min',
          rest: '-',
          cues: 'Sun salutation A. Breathe with each movement. Move with intention.',
        },
        {
          name: 'Guided Visualization',
          sets: 1,
          reps: '5 min',
          rest: '-',
          cues: 'Close your eyes. See your biggest goal. Walk through each step to get there.',
        },
        {
          name: 'Gratitude Journaling',
          sets: 1,
          reps: '5 min',
          rest: '-',
          cues: 'Write 3 things you\'re grateful for. Be specific — not just "family" but why, today.',
        },
      ],
    },
  ],
}

export function getProgram(identity: string): Program {
  return identity === 'athlete' ? athleticProgram : executiveProgram
}
