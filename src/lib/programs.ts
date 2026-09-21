export type Exercise = {
  name: string
  sets: number
  reps: string
  tempo?: string
  rest: string
  cues: string
  videoUrl?: string
}

export type WarmupItem = {
  name: string
  detail: string
  reps?: string
  circuit?: string
  section?: string
}

export type TrainingDay = {
  day: string
  title: string
  warmup?: string
  sections?: { name: string; start: number }[]
  exercises: Exercise[]
  cooldown?: string
  duration: string
}

function splitOutsideParens(text: string): string[] {
  const parts: string[] = []
  let depth = 0
  let start = 0
  for (let i = 0; i < text.length; i++) {
    if (text[i] === '(') depth++
    else if (text[i] === ')') depth--
    else if (text[i] === ',' && depth === 0) {
      parts.push(text.slice(start, i).trim())
      start = i + 1
    }
  }
  parts.push(text.slice(start).trim())
  return parts.filter(Boolean)
}

function parseSubExercise(raw: string, roundsCount: string): WarmupItem | null {
  let part = raw.replace(/^and\s+/i, '').replace(/\.\s*$/, '').trim()
  if (!part) return null

  const parenIdx = part.indexOf('(')
  let name = '', detail = ''
  if (parenIdx > 0) {
    name = part.slice(0, parenIdx).trim()
    detail = part.slice(parenIdx + 1).replace(/\)\s*$/, '').trim()
  } else {
    name = part
  }

  let reps: string | undefined
  const repMatch = name.match(/[×x]\d+(?:\s+(?:each|skips?|fast|sec|reps?)(?:\s+(?:each|arm|leg|side))?)?/i)
    || name.match(/\d+\/\d+\s*(?:calories?|cal)\b/i)
    || name.match(/\d+\s*(?:yards?|yds?|calories?|cal|sec|seconds?|skips?)\b/i)
  if (repMatch) {
    reps = repMatch[0].trim()
    name = name.replace(repMatch[0], '').trim()
  }
  const circuit = roundsCount ? `${roundsCount} Rounds` : undefined

  name = name.replace(/^\d+\s+/, '').replace(/,\s*$/, '').trim()
  if (!name) return null
  name = name.charAt(0).toUpperCase() + name.slice(1)
  return { name, detail: detail || '', reps, circuit }
}

export function parseWarmup(text: string): { intro?: string; items: WarmupItem[] } {
  if (!text) return { items: [] }

  const trimmed = text.trim()

  if (trimmed.includes('\n')) {
    const blocks = trimmed.split('\n\n').filter(Boolean)
    const items: WarmupItem[] = []
    let intro: string | undefined

    for (let i = 0; i < blocks.length; i++) {
      const lines = blocks[i].split('\n').filter(Boolean)
      const firstLine = lines[0].trim()

      if (i === 0 && /^\d/.test(firstLine)) {
        intro = firstLine
        continue
      }

      const header = firstLine
      const body = lines.slice(1).join(' ').trim()
      if (!body) {
        items.push({ name: header, detail: '', section: header })
        continue
      }
      const drills = body.split('·').map(s => s.trim()).filter(Boolean)
      for (const drill of drills) {
        const parenIdx = drill.indexOf('(')
        const name = parenIdx > 0 ? drill.slice(0, parenIdx).trim() : drill
        const detail = parenIdx > 0 ? drill.slice(parenIdx + 1).replace(/\)$/, '').trim() : ''
        const repMatch = drill.match(/×\s*(\d+\s*(?:yards?|yds?))/i) || drill.match(/(\d+)\s+(?:each|per)/i)
        items.push({ name, detail, reps: repMatch?.[0]?.trim(), section: header })
      }
    }

    return { intro, items }
  }

  // Extract intro timing (e.g. "5 min:", "10 min, 2 rounds:")
  let introEnd = 0
  const timeMatch = trimmed.match(/^\d+\s*min\b[^.]*?[:.]\s*/)
  if (timeMatch) {
    introEnd = timeMatch[0].length
  }

  // Check if intro captured a "rounds" count
  let globalRoundsCount = ''
  if (timeMatch) {
    const rm = timeMatch[0].match(/(\d+)\s+rounds?\b/i)
    if (rm) globalRoundsCount = rm[1]
  }

  const body = trimmed.slice(introEnd).trim()
  if (!body) return { intro: trimmed, items: [] }

  const items: WarmupItem[] = []

  const exerciseBoundary = /\.\s+(?=(?:Then\s|Next,?\s|Finish with\s|[A-Z][a-zA-Z\s&'/-]*?(?::\s|—|–)))/g
  const segments = body.split(exerciseBoundary).map(s => s.trim()).filter(Boolean)

  for (const seg of segments) {
    let cleaned = seg
      .replace(/^Then\s+(?:do\s+)?/i, '')
      .replace(/^Next,?\s+/i, '')
      .replace(/^Finish\s+with\s+/i, '')
      .replace(/^Start\s+with\s+/i, '')
      .replace(/\.$/, '')

    // Detect "X rounds (of):" prefix
    const roundsMatch = cleaned.match(/^(\d+)\s+rounds?\s+(?:of\s*)?:\s*/i)
    let localRounds = ''
    if (roundsMatch) {
      localRounds = roundsMatch[1]
      cleaned = cleaned.slice(roundsMatch[0].length).trim()
    }

    // Split comma-separated exercise lists (from rounds blocks or paren-separated lists)
    const topLevelParts = splitOutsideParens(cleaned)
    const effectiveRounds = localRounds || globalRoundsCount
    const hasMultiParens = (cleaned.match(/\(/g) || []).length >= 2
    if (topLevelParts.length >= 2 && (effectiveRounds || hasMultiParens)) {
      for (const part of topLevelParts) {
        const item = parseSubExercise(part, effectiveRounds)
        if (item) items.push(item)
      }
      continue
    }

    // Single exercise parsing
    let name = ''
    let detail = ''

    const colonIdx = cleaned.indexOf(':')
    const dashIdx = cleaned.search(/\s[—–]\s/)

    if (colonIdx > 0 && colonIdx < 80 && (dashIdx < 0 || colonIdx < dashIdx)) {
      name = cleaned.slice(0, colonIdx).trim()
      detail = cleaned.slice(colonIdx + 1).trim()
    } else if (dashIdx > 0 && dashIdx < 80) {
      name = cleaned.slice(0, dashIdx).trim()
      detail = cleaned.slice(dashIdx).replace(/^\s*[—–]\s*/, '').trim()
    } else {
      const parenIdx = cleaned.indexOf('(')
      const commaIdx = cleaned.indexOf(',')
      const prepMatch = cleaned.match(/\s+(?:at\s+(?:an?\s+)?|to\s+(?:get|raise|warm|wake|prep|fire|loosen)|for\s+\d|keeping\s|while\s|without\s|like\s+you)/i)
      const cutoff = [parenIdx, commaIdx, prepMatch?.index].filter((i): i is number => i != null && i > 2 && i < 80)
      if (cutoff.length > 0) {
        const cut = Math.min(...cutoff)
        name = cleaned.slice(0, cut).trim()
        detail = cleaned.slice(cut).replace(/^\s*[,(]\s*/, '').replace(/\)$/, '').trim()
      } else {
        const words = cleaned.split(/\s+/)
        const nameLen = Math.min(5, words.length)
        name = words.slice(0, nameLen).join(' ')
        detail = words.slice(nameLen).join(' ')
      }
    }

    let reps: string | undefined
    const fullText = name + ' ' + detail
    const repPatterns = [
      /(\d+)\s*(?:×|x)\s*(\d+\s*(?:yards?|yds?|meters?|m|seconds?|sec|s))/i,
      /(\d+\s*sets?\s*(?:of\s*)?\d+\s*(?:yards?|reps?|sec|each)?)/i,
      /(\d+)\s*(?:reps?|each\s+(?:leg|arm|side|direction))/i,
      /(\d+\s*(?:sec|seconds?|min|minutes?))\s+(?:each|per|hold)?/i,
      /(\d+)\s+(?:forward|backward|each|per|slow)/i,
      /(\d+\s*(?:yards?|yds?|meters?|m)\b)/i,
    ]
    for (const pat of repPatterns) {
      const m = fullText.match(pat)
      if (m) { reps = m[0].trim(); break }
    }

    name = name
      .replace(/^\d+\s*(sec|seconds?|min|minutes?)\s+(?:of|on)\s+(?:the\s+)?/i, '')
      .replace(/^(a|an|the)\s+/i, '')
      .replace(/^\d+\s+/, '')

    if (name.length > 0) {
      name = name.charAt(0).toUpperCase() + name.slice(1)
    }

    if (name) {
      items.push({ name, detail: detail || cleaned, reps })
    }
  }

  if (items.length === 0) {
    return { items: [{ name: 'Warm-Up', detail: body }] }
  }

  let introText: string | undefined
  if (timeMatch) {
    let intro = trimmed.slice(0, introEnd).replace(/^\d+\s*min\b/, '').trim()
    if (globalRoundsCount) intro = intro.replace(/,?\s*\d+\s+rounds?\s*(?:of\s*)?/i, '').trim()
    intro = intro.replace(/^[^a-zA-Z]*/, '').replace(/[:.]\s*$/, '').trim()
    introText = intro || undefined
  }

  return { intro: introText || undefined, items }
}

export type Program = {
  id: string
  name: string
  weeks: number
  days: TrainingDay[]
  frequency: string
  description: string
  category: 'strength' | 'hybrid' | 'conditioning' | 'functional' | 'running' | 'athletic' | 'sprint' | 'baseball'
  image?: string
}

import { athleticProgram } from './athlete-program'
import { strengthProgram } from './strength-program'
import { runningProgram } from './running-program'
import { sprintProgram } from './sprint-program'
import { foundationsProgram } from './foundations-program'
import { baseballProgram } from './baseball-program'

export { athleticProgram, strengthProgram, runningProgram, sprintProgram, foundationsProgram, baseballProgram }

export const functionalFitnessProgram = foundationsProgram

export const allPrograms: Program[] = [
  athleticProgram,
  strengthProgram,
  functionalFitnessProgram,
  runningProgram,
  sprintProgram,
  baseballProgram,
]

export function getProgram(identity: string): Program {
  return identity === 'athlete' ? athleticProgram : functionalFitnessProgram
}

export function getProgramById(id: string): Program | undefined {
  return allPrograms.find((p) => p.id === id)
}
