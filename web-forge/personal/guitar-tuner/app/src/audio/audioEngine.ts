/**
 * Manages microphone access and raw audio data extraction.
 * Creates AudioContext on user gesture (power button),
 * connects MediaStreamSource to AnalyserNode.
 */
export class AudioEngine {
  private context: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private source: MediaStreamAudioSourceNode | null = null;
  private stream: MediaStream | null = null;
  private buffer: Float32Array<ArrayBuffer> | null = null;

  async start(): Promise<'granted' | 'denied'> {
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false,
        },
      });
    } catch {
      return 'denied';
    }

    this.context = new AudioContext();
    this.analyser = this.context.createAnalyser();
    this.analyser.fftSize = 4096;
    this.buffer = new Float32Array(this.analyser.fftSize) as Float32Array<ArrayBuffer>;

    this.source = this.context.createMediaStreamSource(this.stream);
    this.source.connect(this.analyser);

    return 'granted';
  }

  stop(): void {
    if (this.source) {
      this.source.disconnect();
      this.source = null;
    }
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
    }
    if (this.context) {
      this.context.close();
      this.context = null;
    }
    this.analyser = null;
    this.buffer = null;
  }

  /**
   * Get the current time-domain audio samples.
   * Returns null if engine is not active.
   */
  getTimeDomainData(): Float32Array<ArrayBuffer> | null {
    if (!this.analyser || !this.buffer) return null;

    // Resume context if suspended (browser autoplay policy)
    if (this.context?.state === 'suspended') {
      this.context.resume();
    }

    this.analyser.getFloatTimeDomainData(this.buffer);
    return this.buffer;
  }

  getSampleRate(): number {
    return this.context?.sampleRate ?? 44100;
  }

  isActive(): boolean {
    return this.context !== null && this.context.state !== 'closed';
  }
}
