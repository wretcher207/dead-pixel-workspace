import type { VelocityMode } from '../../types'

export interface VelocityParams {
  baseVelocity: number
  velocityMode: VelocityMode
  humanize: number         // 0-100
  isLeftFoot: boolean
  leftFootStrength: number // 0-100
}

const MODE_SCALE: Record<VelocityMode, number> = {
  0: 0.85,
  1: 1.0,
  2: 1.1,
}

export function computeVelocity(params: VelocityParams): number {
  let vel = params.baseVelocity * MODE_SCALE[params.velocityMode]

  if (params.isLeftFoot) {
    vel = vel * (params.leftFootStrength / 100)
  }

  const variance = Math.floor(20 * (params.humanize / 100))
  if (variance > 0) {
    vel += Math.floor(Math.random() * (variance * 2 + 1)) - variance
  }

  return Math.max(1, Math.min(127, Math.floor(vel)))
}
