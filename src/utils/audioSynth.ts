/**
 * Romantic Ambient Audio Synthesizer using Web Audio API
 * Generates soft, warm acoustic guitar/music box tones with gentle reverberation.
 */

class RomanticAudioSynth {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private intervalId: number | null = null;
  private onTimeUpdateCallback: ((time: number, duration: number) => void) | null = null;
  private onPlayStateChangeCallback: ((playing: boolean) => void) | null = null;
  private currentTime = 0;
  private duration = 221; // 3:41 in seconds

  private melodyNotes = [
    // Chord progression: C - G/B - Am - Fmaj7 (Romantic ballad feel)
    { freq: 261.63, duration: 1.2 }, // C4
    { freq: 329.63, duration: 1.2 }, // E4
    { freq: 392.00, duration: 1.2 }, // G4
    { freq: 523.25, duration: 1.8 }, // C5
    { freq: 493.88, duration: 1.2 }, // B4
    { freq: 392.00, duration: 1.2 }, // G4
    { freq: 329.63, duration: 1.2 }, // E4
    { freq: 440.00, duration: 1.8 }, // A4
    { freq: 349.23, duration: 1.2 }, // F4
    { freq: 440.00, duration: 1.2 }, // A4
    { freq: 523.25, duration: 1.2 }, // C5
    { freq: 659.25, duration: 2.0 }, // E5
  ];

  private noteIndex = 0;

  private initContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public playNote(freq: number, dur: number) {
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const oscHarmonic = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      // Warm sine + subtle triangle overtone
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      oscHarmonic.type = 'triangle';
      oscHarmonic.frequency.setValueAtTime(freq * 2, now);

      // Envelope
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.18, now + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + dur);

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1400, now);

      osc.connect(gain);
      oscHarmonic.connect(gain);
      gain.connect(filter);
      filter.connect(this.ctx.destination);

      osc.start(now);
      oscHarmonic.start(now);
      osc.stop(now + dur + 0.1);
      oscHarmonic.stop(now + dur + 0.1);
    } catch {
      // Audio fallback handling
    }
  }

  public playBloomChime() {
    this.initContext();
    if (!this.ctx) return;
    try {
      const notes = [261.63, 329.63, 392.0, 493.88, 523.25, 659.25, 783.99, 1046.5];
      const now = this.ctx.currentTime;
      notes.forEach((freq, idx) => {
        const time = now + idx * 0.08;
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, time);

        gain.gain.setValueAtTime(0, time);
        gain.gain.linearRampToValueAtTime(0.15, time + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.8);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(time);
        osc.stop(time + 0.85);
      });
    } catch {
      // Audio fallback
    }
  }

  public playSparkleChime() {
    this.initContext();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.exponentialRampToValueAtTime(1318.5, now + 0.15);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.36);
    } catch {
      // Audio fallback
    }
  }

  public start() {
    this.initContext();
    this.isPlaying = true;
    this.onPlayStateChangeCallback?.(true);

    if (this.intervalId) clearInterval(this.intervalId);

    // Play initial note
    const firstNote = this.melodyNotes[this.noteIndex % this.melodyNotes.length];
    this.playNote(firstNote.freq, firstNote.duration);
    this.noteIndex++;

    this.intervalId = window.setInterval(() => {
      if (!this.isPlaying) return;
      this.currentTime += 1;
      if (this.currentTime >= this.duration) {
        this.currentTime = 0;
      }
      this.onTimeUpdateCallback?.(this.currentTime, this.duration);

      // Play next note every ~1.5s
      if (this.currentTime % 2 === 0) {
        const note = this.melodyNotes[this.noteIndex % this.melodyNotes.length];
        this.playNote(note.freq, note.duration);
        this.noteIndex++;
      }
    }, 1000);
  }

  public pause() {
    this.isPlaying = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.onPlayStateChangeCallback?.(false);
  }

  public toggle() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.start();
    }
  }

  public seek(seconds: number) {
    this.currentTime = Math.max(0, Math.min(seconds, this.duration));
    this.onTimeUpdateCallback?.(this.currentTime, this.duration);
  }

  public setTimeUpdateListener(cb: (time: number, duration: number) => void) {
    this.onTimeUpdateCallback = cb;
  }

  public setPlayStateListener(cb: (playing: boolean) => void) {
    this.onPlayStateChangeCallback = cb;
  }

  public getIsPlaying() {
    return this.isPlaying;
  }

  public getCurrentTime() {
    return this.currentTime;
  }

  public getDuration() {
    return this.duration;
  }

  /**
   * Generates a gentle WAV audio file so user can download a real romantic song file
   */
  public generateDownloadableSongUrl(): string {
    const sampleRate = 22050;
    const numSeconds = 6; // Compact soothing melody sample
    const numSamples = sampleRate * numSeconds;
    const buffer = new ArrayBuffer(44 + numSamples * 2);
    const view = new DataView(buffer);

    // WAV Header
    const writeString = (offset: number, str: string) => {
      for (let i = 0; i < str.length; i++) {
        view.setUint8(offset + i, str.charCodeAt(i));
      }
    };

    writeString(0, 'RIFF');
    view.setUint32(4, 36 + numSamples * 2, true);
    writeString(8, 'WAVE');
    writeString(12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true); // PCM
    view.setUint16(22, 1, true); // Mono
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * 2, true);
    view.setUint16(32, 2, true);
    view.setUint16(34, 16, true);
    writeString(36, 'data');
    view.setUint32(40, numSamples * 2, true);

    // Generate peaceful soothing chime melody samples
    const notes = [261.63, 329.63, 392.00, 523.25, 659.25];
    for (let i = 0; i < numSamples; i++) {
      const t = i / sampleRate;
      const noteIdx = Math.floor(t * 1.2) % notes.length;
      const freq = notes[noteIdx];
      const noteLocalT = (t * 1.2) % 1;
      const decay = Math.exp(-noteLocalT * 3.5);
      const sample = Math.sin(2 * Math.PI * freq * t) * decay * 0.45;
      const intSample = Math.max(-32768, Math.min(32767, Math.floor(sample * 32767)));
      view.setInt16(44 + i * 2, intSample, true);
    }

    const blob = new Blob([buffer], { type: 'audio/wav' });
    return URL.createObjectURL(blob);
  }
}

export const romanticAudio = new RomanticAudioSynth();
