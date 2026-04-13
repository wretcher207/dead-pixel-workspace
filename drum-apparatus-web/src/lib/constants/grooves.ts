export interface PresetGroove { name: string; kick: string; snare: string }
export interface GrooveCategory { category: string; grooves: PresetGroove[] }

export const GROOVE_LIBRARY: GrooveCategory[] = [
  { category: 'THALL', grooves: [
    { name: 'The Lurch (Displaced)', kick: '-K--K---K-K--K--', snare: '----S-------S---' },
    { name: 'Stutter Stabs', kick: 'KK-K---KK-K---K-', snare: '--------S-------' },
    { name: 'Half-Time Dread', kick: 'K---------------', snare: '--------S-------' },
    { name: 'Foundational 4/4', kick: 'K---K---K---K---', snare: '----S-------S---' },
  ]},
  { category: 'DJENT', grooves: [
    { name: 'Displaced Kick Grid', kick: 'K--K-K----K-K---', snare: '----S-------S---' },
    { name: '3-Against-4 Pattern', kick: 'K--K--K--K--K--K', snare: '----S-------S---' },
    { name: 'Meshuggah Cycle', kick: 'K--K-K-K--K-K-K-', snare: '----S-------S---' },
  ]},
  { category: 'DEATH METAL', grooves: [
    { name: 'Standard 16th Stream', kick: 'KKKKKKKKKKKKKKKK', snare: '----S-------S---' },
    { name: 'The Gallop', kick: 'K-kkK-kkK-kkK-kk', snare: '----S-------S---' },
    { name: 'Tech Death Pulse', kick: 'K-K-K-K-KKKKKKKK', snare: '----S-------S---' },
    { name: 'Hammer Blast', kick: 'KKKKKKKKKKKKKKKK', snare: 'S-S-S-S-S-S-S-S-' },
  ]},
  { category: 'SLAM DEATH', grooves: [
    { name: 'Slam Breakdown (Lurch)', kick: 'K-k-K--k-K-k-K--', snare: '--------S-------' },
    { name: 'Bomb Blast', kick: 'KKKKKKKKKKKKKKKK', snare: 'S---S---S---S---' },
    { name: 'Stuttered Double Kick', kick: 'KK-K---KK-K---K-', snare: '----S-------S---' },
    { name: 'Half-Time Crushing', kick: 'K---K-K-----K---', snare: '--------S-------' },
  ]},
  { category: 'BLACK METAL', grooves: [
    { name: 'Traditional Blast', kick: 'KKKKKKKKKKKKKKKK', snare: 'S-S-S-S-S-S-S-S-' },
    { name: 'Norsecore (Primitive)', kick: 'K-------K-------', snare: '----S-------S---' },
    { name: "D-Beat (Black 'n' Roll)", kick: 'K---K-K---K-K---', snare: '----S-------S---' },
  ]},
  { category: 'GRINDCORE', grooves: [
    { name: 'Traditional Blast', kick: 'KKKKKKKKKKKKKKKK', snare: 'S-S-S-S-S-S-S-S-' },
    { name: 'Hammer Blast (Unison)', kick: 'KKKKKKKKKKKKKKKK', snare: 'SSSSSSSSSSSSSSSS' },
    { name: 'Push Blast (Fotball)', kick: 'KKKKKKKKKKKKKKKK', snare: '-S-S-S-S-S-S-S-S' },
    { name: 'Slam Grind Breakdown', kick: 'K-K-k-K---K-k---', snare: '--------S-------' },
  ]},
  { category: 'METALCORE', grooves: [
    { name: 'Metalcore Verse', kick: 'K-K---K-K---K-K-', snare: '----S-------S---' },
    { name: 'D-Beat (Hardcore)', kick: 'K---K-K---K-K---', snare: '----S-------S---' },
    { name: 'Half-Time Breakdown', kick: 'K-------K-K-----', snare: '--------S-------' },
    { name: 'Gallop Kick Transition', kick: 'K-kkK---K-kkK---', snare: '----S-------S---' },
  ]},
  { category: 'DOOM & SLUDGE', grooves: [
    { name: 'Standard Half-Time', kick: 'K-------K-------', snare: '--------S-------' },
    { name: 'Funeral Crawl', kick: 'K---------------', snare: '----------------' },
    { name: 'Sludge Pound', kick: 'K---K-K-----K---', snare: '----S-------S---' },
  ]},
  { category: 'PROGRESSIVE METAL', grooves: [
    { name: 'Prog Half-Time', kick: 'K-------K-k-----', snare: '--------S-------' },
    { name: 'Linear Precision', kick: 'K---k---S---k---', snare: '----------------' },
    { name: '7/8 Grouping (2+2+3)', kick: 'K--K--K', snare: '---S---' },
    { name: '5/4 Shift', kick: 'K---K---K---K---K---', snare: '----S-------S-------' },
  ]},
  { category: 'ROCK', grooves: [
    { name: 'Basic Rock Beat', kick: 'K-------K-------', snare: '----S-------S---' },
    { name: 'Kick Syncopation', kick: 'K--K----K-------', snare: '----S-------S---' },
    { name: '16th Note Kick', kick: 'K--KK---K--K----', snare: '----S-------S---' },
  ]},
  { category: 'THRASH METAL', grooves: [
    { name: 'Skank Beat (Polka)', kick: 'K---K---K---K---', snare: '--S---S---S---S-' },
    { name: 'Thrash Gallop', kick: 'K-kkK-kkK-kkK-kk', snare: '----S-------S---' },
    { name: 'D-Beat Driving', kick: 'K--kK-k-K--kK-k-', snare: '----S-------S---' },
  ]},
  { category: 'BREAKDOWNS', grooves: [
    { name: 'The Pit Opener', kick: 'K-------K-------', snare: '--------S-------' },
    { name: 'Wall of Groove', kick: 'K---k---K---k---', snare: '--------S-------' },
    { name: 'Stutter Breakdown', kick: 'K-K---K-K-K---K-', snare: '--------S-------' },
    { name: 'The Silence Drop', kick: '----------------', snare: '----------------' },
  ]},
]
