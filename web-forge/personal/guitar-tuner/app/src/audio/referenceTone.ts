import { TUNER_CONSTANTS } from '../types/tuner';

/**
 * Simple sine wave oscillator for reference tone playback.
 * Plain, utilitarian sound -- not a synth.
 */
export class ReferenceTone {
  private context: AudioContext | null = null;
  private oscillator: OscillatorNode | null = null;
  private gain: GainNode | null = null;

  start(frequency: number): void {
    this.stop();

    this.context = new AudioContext();
    this.gain = this.context.createGain();
    this.gain.gain.value = TUNER_CONSTANTS.REFERENCE_TONE_VOLUME;
    this.gain.connect(this.context.destination);

    this.oscillator = this.context.createOscillator();
    this.oscillator.type = 'sine';
    this.oscillator.frequency.value = frequency;
    this.oscillator.connect(this.gain);
    this.oscillator.start();
  }

  setFrequency(freq: number): void {
    if (this.oscillator && this.context) {
      this.oscillator.frequency.setValueAtTime(freq, this.context.currentTime);
    }
  }

  stop(): void {
    if (this.oscillator) {
      try { this.oscillator.stop(); } catch { /* already stopped */ }
      this.oscillator.disconnect();
      this.oscillator = null;
    }
    if (this.gain) {
      this.gain.disconnect();
      this.gain = null;
    }
    if (this.context) {
      this.context.close();
      this.context = null;
    }
  }

  isPlaying(): boolean {
    return this.oscillator !== null;
  }
}
