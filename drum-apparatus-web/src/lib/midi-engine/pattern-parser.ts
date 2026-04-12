import type { StepEvent, KitPiece } from '../../types'

export function parseNotation(kick: string, snare: string): StepEvent[] {
  const events: StepEvent[] = []
  const maxLen = Math.max(kick.length, snare.length)

  for (let i = 0; i < maxLen; i++) {
    const kChar = i < kick.length ? kick[i] : '-'
    const sChar = i < snare.length ? snare[i] : '-'

    if (kChar !== '-') {
      const foot: KitPiece = ((i + 1) % 2 === 0) ? 'KICK_L' : 'KICK_R'
      if (kChar === 'K') {
        events.push({ step: i, piece: foot, velocity: 127, articulation: 'hard' })
      } else if (kChar === 'k') {
        events.push({ step: i, piece: foot, velocity: 110, articulation: 'soft' })
      }
    }

    if (sChar !== '-') {
      if (sChar === 'S') {
        events.push({ step: i, piece: 'SNARE', velocity: 127, articulation: 'hard' })
      } else if (sChar === 's') {
        events.push({ step: i, piece: 'SNARE', velocity: 110, articulation: 'soft' })
      } else if (sChar === 'g') {
        const vel = Math.floor(Math.random() * (45 - 25 + 1)) + 25
        events.push({ step: i, piece: 'SNARE_GHOST', velocity: vel, articulation: 'ghost' })
      } else if (sChar === 'f') {
        events.push({ step: i, piece: 'SNARE_FLAM', velocity: 115, articulation: 'flam' })
      }
    }
  }

  return events
}

export function stepsToNotation(events: StepEvent[], stepCount: number): { kick: string; snare: string } {
  const kickArr = new Array(stepCount).fill('-')
  const snareArr = new Array(stepCount).fill('-')

  for (const event of events) {
    if (event.step >= stepCount) continue

    if (event.piece === 'KICK_R' || event.piece === 'KICK_L') {
      kickArr[event.step] = event.articulation === 'hard' ? 'K' : 'k'
    } else if (event.piece === 'SNARE') {
      snareArr[event.step] = event.articulation === 'hard' ? 'S' : 's'
    } else if (event.piece === 'SNARE_GHOST') {
      snareArr[event.step] = 'g'
    } else if (event.piece === 'SNARE_FLAM') {
      snareArr[event.step] = 'f'
    }
  }

  return { kick: kickArr.join(''), snare: snareArr.join('') }
}
