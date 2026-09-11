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
  category: 'strength' | 'hybrid' | 'conditioning' | 'functional' | 'running' | 'athletic'
  image?: string
}

import { athleticProgram } from './athlete-program'
import { executiveProgram } from './executive-program'
import { hybridProgram } from './hybrid-program'
import { strengthProgram } from './strength-program'
import { runningProgram } from './running-program'

export { athleticProgram, executiveProgram, hybridProgram, strengthProgram, runningProgram }

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
      warmup: '10 min: stationary bike 2 min, monster walks, single-arm dumbbell external rotations, banded hip hinges, bodyweight squats',
      duration: '60 min',
      exercises: [
        {
          name: 'Barbell Back Squat',
          sets: 4,
          reps: '8-6-4-4',
          rest: '2:30',
          cues: 'Progressive loading across 8 weeks — Coach Tyler will guide your weights each session. Chest up, drive through heels, full depth. Hip crease below the knee on every rep.',
        },
        {
          name: 'Barbell Deadlift',
          sets: 4,
          reps: '8-6-4-4',
          rest: '2:30',
          cues: 'Same loading progression as the squat. Flat back, bar tight against shins. Push the floor away. Lock hips and knees at the top.',
        },
        {
          name: 'Bench Press',
          sets: 4,
          reps: '8-6-4-4',
          rest: '2:30',
          cues: 'Same loading progression as the squat. Shoulder blades pinched, feet flat. Controlled descent, explosive press.',
        },
        {
          name: 'Barbell Bent-Over Row',
          sets: 3,
          reps: '10',
          rest: '1:30',
          cues: '45-degree torso angle. Pull to lower chest, squeeze the shoulder blades together. Lower with control.',
        },
        {
          name: 'Walking Lunge',
          sets: 3,
          reps: '12',
          rest: '1:30',
          cues: 'Long stride, back knee kisses the floor. Stay tall, chest up. Dumbbells at your sides.',
        },
        {
          name: 'Pull-Ups',
          sets: 3,
          reps: '8',
          rest: '1:30',
          cues: 'Full dead hang to chin over the bar. Control the negative on the way down. No kipping.',
        },
        {
          name: 'Plank',
          sets: 3,
          reps: '30 sec',
          rest: '0:45',
          cues: 'Straight line from head to heels. Squeeze glutes, brace core. Breathe — don\'t hold your breath.',
        },
        {
          name: 'Ab Rollouts',
          sets: 3,
          reps: '8',
          rest: '1:00',
          cues: 'Core tight, don\'t let the hips sag. Roll out as far as you can control, then pull back with your abs.',
        },
      ],
      cooldown: '5 min: foam roll quads, hamstrings, glutes',
    },
    {
      day: 'Day 2',
      title: 'Volume & Bodybuilding',
      warmup: '10 min: ski erg 2 min, banded pull-aparts, single-arm dumbbell overhead carry, lunge jumps',
      duration: '55 min',
      exercises: [
        {
          name: '1a. Incline Dumbbell Bench Press',
          sets: 4,
          reps: '15-12-10-8',
          rest: '1:30',
          cues: 'Increase weight each set. Full stretch at the bottom, squeeze the chest together at the top.',
        },
        {
          name: '1b. Seated Low Row',
          sets: 4,
          reps: '10',
          rest: '1:15',
          cues: 'Pull to belly button, squeeze shoulder blades together. Chest tall, no rounding forward.',
        },
        {
          name: '2a. Arnold Press',
          sets: 3,
          reps: '10',
          rest: '1:15',
          cues: 'Start palms facing you, rotate as you press overhead. Full lockout at the top.',
        },
        {
          name: '2b. Cable Tricep Extensions',
          sets: 3,
          reps: '12',
          rest: '1:00',
          cues: 'Elbows pinned to your sides, full extension at the bottom. Squeeze the triceps hard.',
        },
        {
          name: '3a. Reverse Cable Crossover',
          sets: 3,
          reps: '15',
          rest: '1:00',
          cues: 'Slight bend in elbows. Squeeze the rear delts at the end of every rep.',
        },
        {
          name: '3b. Farmer Carry + Shrugs',
          sets: 3,
          reps: '20 yd carry + 10 shrugs',
          rest: '1:30',
          cues: 'Heavy dumbbells, tall posture. Carry 20 yards then immediately hit 10 shrugs. Grip strength is earned here.',
        },
        {
          name: 'Dumbbell Split Squat',
          sets: 3,
          reps: '10 each',
          rest: '1:15',
          cues: 'Rear foot elevated on a bench. Front knee tracks over toes. Stay upright — don\'t lean forward.',
        },
        {
          name: 'Barbell Hip Thrust',
          sets: 2,
          reps: '10 + 10 sec hold + 10',
          rest: '1:30',
          cues: 'Upper back on bench. Drive through heels. Full hip extension — squeeze glutes at the top. Hold 10 seconds between rep blocks.',
        },
        {
          name: 'Cable Crunches',
          sets: 2,
          reps: '20',
          rest: '0:45',
          cues: 'Kneel at the cable, crunch down hard. Exhale on every rep. Feel the abs contract.',
        },
        {
          name: 'Dumbbell Oblique Crunch',
          sets: 2,
          reps: '15 each side',
          rest: '0:45',
          cues: 'Side crunch with a dumbbell for resistance. Controlled movement — don\'t rush.',
        },
      ],
      cooldown: '5 min: chest stretch, lat stretch, shoulder stretch',
    },
    {
      day: 'Day 3',
      title: 'Power & Speed',
      warmup: '10 min: line hops, lateral hops, high knees, A-skips, build-up sprints',
      duration: '55 min',
      exercises: [
        {
          name: 'Double Leg Line Hops',
          sets: 2,
          reps: '15 sec',
          rest: '0:30',
          cues: 'Warm up the nervous system — quick feet, soft landings. Stay light on your toes.',
        },
        {
          name: 'Double Leg Lateral Line Hops',
          sets: 2,
          reps: '15 sec',
          rest: '0:30',
          cues: 'Side to side over the line. Stay light, stay fast. Absorb each landing.',
        },
        {
          name: 'Single Leg Line Hops',
          sets: 2,
          reps: '10 sec each',
          rest: '0:30',
          cues: 'Balance and speed. Land soft on each hop. Control your body.',
        },
        {
          name: '1a. Power Clean',
          sets: 4,
          reps: '5-4-3-3',
          rest: '2:30',
          cues: 'Triple extension — hips, knees, ankles. Catch in front rack position. Weight builds across the 8-week cycle.',
        },
        {
          name: '1b. Box Jumps',
          sets: 4,
          reps: '2',
          rest: '1:30',
          cues: 'Explosive — max height you can land safely. Step down every rep. Full hip extension at the top.',
        },
        {
          name: '2a. Explosive Sled Rows',
          sets: 4,
          reps: '8',
          rest: '1:15',
          cues: 'Explosive pull, controlled return. Full body tension — brace your core, drive with your back.',
        },
        {
          name: '2b. Explosive Push-Ups',
          sets: 4,
          reps: '10',
          rest: '1:00',
          cues: 'Hands leave the ground on every rep. Land soft, absorb, then explode back up.',
        },
        {
          name: '3a. Heavy Sled Pushes',
          sets: 3,
          reps: '30 yards',
          rest: '2:00',
          cues: 'Low body angle, arms locked out. Short, powerful steps. Drive through the ground.',
        },
        {
          name: '3b. Kettlebell Swing',
          sets: 3,
          reps: '12',
          rest: '1:00',
          cues: 'Hip hinge, snap the hips forward. Bell floats to chest height. Power comes from the hips, not the arms.',
        },
        {
          name: 'Finisher',
          sets: 1,
          reps: 'Max rounds in 8-10 min',
          rest: '-',
          cues: '200m run + 10 dumbbell thrusters. Keep moving — rest only when you have to. Push the pace.',
        },
      ],
      cooldown: '5 min: full body foam roll and stretch',
    },
  ],
}

export const allPrograms: Program[] = [
  athleticProgram,
  functionalFitnessProgram,
  hybridProgram,
  strengthProgram,
  executiveProgram,
  runningProgram,
]

export function getProgram(identity: string): Program {
  return identity === 'athlete' ? athleticProgram : executiveProgram
}

export function getProgramById(id: string): Program | undefined {
  return allPrograms.find((p) => p.id === id)
}
