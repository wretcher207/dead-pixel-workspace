/**
 * YIN pitch detection algorithm.
 * Based on de Cheveigne & Kawahara (2002).
 *
 * Optimized for guitar: reliable from ~60Hz to ~1400Hz.
 * Buffer size of 4096 samples at 44100Hz provides adequate
 * resolution for low E (~82Hz, period ~538 samples).
 */

export interface PitchResult {
  frequency: number;
  confidence: number;
}

/**
 * Detect pitch using the YIN algorithm.
 *
 * @param buffer - Time-domain audio samples (Float32Array)
 * @param sampleRate - Audio sample rate (e.g., 44100)
 * @param threshold - YIN threshold (lower = stricter, 0.10-0.20 typical)
 * @returns PitchResult or null if no confident pitch found
 */
export function detectPitch(
  buffer: Float32Array,
  sampleRate: number,
  threshold: number = 0.15
): PitchResult | null {
  const halfSize = Math.floor(buffer.length / 2);

  // Step 1: Difference function
  // d(tau) = sum of (x[j] - x[j + tau])^2
  const difference = new Float32Array(halfSize);
  for (let tau = 0; tau < halfSize; tau++) {
    let sum = 0;
    for (let j = 0; j < halfSize; j++) {
      const delta = buffer[j] - buffer[j + tau];
      sum += delta * delta;
    }
    difference[tau] = sum;
  }

  // Step 2: Cumulative mean normalized difference
  // d'(tau) = d(tau) / ((1/tau) * sum(d(1..tau)))
  const cmnd = new Float32Array(halfSize);
  cmnd[0] = 1;
  let runningSum = 0;
  for (let tau = 1; tau < halfSize; tau++) {
    runningSum += difference[tau];
    cmnd[tau] = difference[tau] * tau / runningSum;
  }

  // Step 3: Absolute threshold
  // Find the first tau where cmnd drops below threshold
  // Start at tau=2 to skip trivially short periods
  let bestTau = -1;
  for (let tau = 2; tau < halfSize; tau++) {
    if (cmnd[tau] < threshold) {
      // Walk forward to find the local minimum
      while (tau + 1 < halfSize && cmnd[tau + 1] < cmnd[tau]) {
        tau++;
      }
      bestTau = tau;
      break;
    }
  }

  // No pitch found under threshold
  if (bestTau === -1) return null;

  // Step 4: Parabolic interpolation for sub-sample accuracy
  let refinedTau: number;
  if (bestTau > 0 && bestTau < halfSize - 1) {
    const s0 = cmnd[bestTau - 1];
    const s1 = cmnd[bestTau];
    const s2 = cmnd[bestTau + 1];
    const shift = (s0 - s2) / (2 * (s0 - 2 * s1 + s2));
    refinedTau = bestTau + (isFinite(shift) ? shift : 0);
  } else {
    refinedTau = bestTau;
  }

  // Step 5: Convert to frequency
  const frequency = sampleRate / refinedTau;

  // Confidence: 1 - cmnd value at best tau
  const confidence = 1 - cmnd[bestTau];

  // Reject if frequency is outside guitar-useful range
  if (frequency < 50 || frequency > 2000) return null;

  return { frequency, confidence };
}

/**
 * Compute RMS (root mean square) of a signal buffer.
 * Used to gate silence before running pitch detection.
 */
export function computeRMS(buffer: Float32Array): number {
  let sum = 0;
  for (let i = 0; i < buffer.length; i++) {
    sum += buffer[i] * buffer[i];
  }
  return Math.sqrt(sum / buffer.length);
}
