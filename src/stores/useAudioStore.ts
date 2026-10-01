import { create } from 'zustand';
import { AudioSettings } from '@/types';

// ============================================================================
// AUTHENTIC WEST AFRICAN PROCEDURAL AUDIO ENGINE (Web Audio API)
// Synthesizes:
// - Traditional Mandingue Kora (21-string harp-lute with calabash resonator)
// - Generative Mandingue Pentatonic Ostinato (Kumbengo melody)
// - Sahelian Savanna Ambience (Warm Harmattan wind & savanna bush cicadas)
// - Leather sandals on dry red laterite clay footsteps
// - Dried calabash & cowrie shell rattle (Chékéré aux Cauris)
// - Authentic West African Djembe (Bass / Tone / Slap)
// - Wooden Balafon with vibrating gourd mirlitons
// ============================================================================

class AfricanAudioEngine {
  private ctx: AudioContext | null = null;
  private isInitialized = false;

  // Master ambient gain node
  private ambientGain: GainNode | null = null;
  private windGain: GainNode | null = null;
  private cicadaGain: GainNode | null = null;
  private koraGain: GainNode | null = null;
  private drumGain: GainNode | null = null;
  private drumFilter: BiquadFilterNode | null = null;

  // Active looping nodes
  private windSource: AudioBufferSourceNode | null = null;
  private windFilter: BiquadFilterNode | null = null;
  private cicadaInterval: number | null = null;
  private koraInterval: number | null = null;
  private drumInterval: number | null = null;
  private drumStep = 0;

  // Noise buffers cache
  private noiseBuffer: AudioBuffer | null = null;

  // Footstep alternation state
  private footstepToggle = false;

  // Mandingue Pentatonic Scale (D major pentatonic / Sawuta tuning)
  // Traditional Kora notes: D3, F#3, A3, B3, D4, E4, F#4, A4, B4, D5
  private readonly koraScale = [
    146.83, // D3 (Bass root)
    185.0,  // F#3
    220.0,  // A3 (Fifth)
    246.94, // B3
    293.66, // D4 (Octave root)
    329.63, // E4
    369.99, // F#4
    440.0,  // A4
    493.88, // B4
    587.33, // D5 (High bell)
  ];

  // Traditional Mandingue Ostinato Pattern (Kumbengo index sequence)
  private readonly kumbengoPattern = [
    0, 4, 2, 5, 1, 4, 3, 6,
    0, 5, 2, 7, 3, 6, 2, 4,
    1, 4, 3, 5, 2, 6, 4, 8,
    0, 2, 4, 6, 5, 7, 6, 4
  ];
  private koraStep = 0;

  private initContext() {
    if (this.isInitialized || typeof window === 'undefined') return;
    try {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();

      // Pre-generate a 3-second natural pink/brown noise buffer for wind & textures
      const sampleRate = this.ctx.sampleRate;
      const bufferSize = sampleRate * 3;
      this.noiseBuffer = this.ctx.createBuffer(1, bufferSize, sampleRate);
      const data = this.noiseBuffer.getChannelData(0);
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        // Soft brown/pink filter integration for organic acoustic warmth
        lastOut = (lastOut + 0.02 * white) / 1.02;
        data[i] = lastOut * 3.5;
      }

      this.isInitialized = true;
    } catch {
      console.warn('Web Audio API not supported on this browser');
    }
  }

  public ensureContext() {
    if (!this.ctx) this.initContext();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  // --------------------------------------------------------------------------
  // 1. SAHELIAN SAVANNA & KORA AMBIENT SOUNDSCAPE
  // --------------------------------------------------------------------------
  public startAmbient(volume: number) {
    this.ensureContext();
    if (!this.ctx || this.ambientGain) return;

    try {
      const now = this.ctx.currentTime;

      // Master ambient sub-mixer
      this.ambientGain = this.ctx.createGain();
      this.ambientGain.gain.setValueAtTime(Math.max(0.0001, volume), now);
      this.ambientGain.connect(this.ctx.destination);

      // --- A) Warm Savanna Breeze (Souffle de l'Harmattan) ---
      if (this.noiseBuffer) {
        this.windSource = this.ctx.createBufferSource();
        this.windSource.buffer = this.noiseBuffer;
        this.windSource.loop = true;

        this.windFilter = this.ctx.createBiquadFilter();
        this.windFilter.type = 'bandpass';
        this.windFilter.frequency.setValueAtTime(260, now);
        this.windFilter.Q.setValueAtTime(1.8, now);

        this.windGain = this.ctx.createGain();
        this.windGain.gain.setValueAtTime(0.08, now);

        // Wind slow breathing LFO
        const windLfo = this.ctx.createOscillator();
        const windLfoGain = this.ctx.createGain();
        windLfo.frequency.setValueAtTime(0.12, now); // Slow 8-second wave
        windLfoGain.gain.setValueAtTime(120, now); // Sweeps 260Hz +/- 120Hz

        windLfo.connect(windLfoGain);
        windLfoGain.connect(this.windFilter.frequency);
        windLfo.start(now);

        this.windSource.connect(this.windFilter);
        this.windFilter.connect(this.windGain);
        this.windGain.connect(this.ambientGain);
        this.windSource.start(now);
      }

      // --- B) Savanna Bush Cicadas & Crickets (Grillons de la Savane) ---
      this.cicadaGain = this.ctx.createGain();
      this.cicadaGain.gain.setValueAtTime(0.04, now);
      this.cicadaGain.connect(this.ambientGain);

      // Periodic natural cricket chirp clusters
      this.cicadaInterval = window.setInterval(() => {
        if (!this.ctx || !this.cicadaGain || Math.random() > 0.65) return;
        this.triggerCicadaChirp();
      }, 1800);

      // --- C) Mandingue Kora Generative Melodic Ostinato (Kumbengo) ---
      this.koraGain = this.ctx.createGain();
      this.koraGain.gain.setValueAtTime(0.24, now);
      this.koraGain.connect(this.ambientGain);

      // Start gentle rhythmic Kora playing (approx 120 BPM relaxed Mandingue cadence)
      this.koraInterval = window.setInterval(() => {
        if (!this.ctx || !this.koraGain) return;
        this.triggerKoraStep();
      }, 420);

      // --- D) Subtle Sahelian Drum Groove (Battement de Tambour Mandingue) ---
      // Delicate, warm background heartbeat (Dundun, Djembe soft tones & Calabash)
      this.drumGain = this.ctx.createGain();
      this.drumGain.gain.setValueAtTime(0.065, now);

      this.drumFilter = this.ctx.createBiquadFilter();
      this.drumFilter.type = 'lowpass';
      this.drumFilter.frequency.setValueAtTime(460, now);

      this.drumGain.connect(this.drumFilter);
      this.drumFilter.connect(this.ambientGain);

      this.drumStep = 0;
      // Traditional 16-step African cadence at ~96 BPM (approx 155ms per 16th/8th pulse)
      this.drumInterval = window.setInterval(() => {
        if (!this.ctx || !this.drumGain) return;
        this.triggerDrumGrooveStep();
      }, 155);

      // Play first gentle Kora note immediately
      this.playKoraPluck(this.koraScale[4], 0.22);
    } catch (e) {
      console.warn('Failed to start authentic African ambient audio', e);
    }
  }

  // Soft cicada chirp cluster in the savanna grass
  private triggerCicadaChirp() {
    if (!this.ctx || !this.cicadaGain) return;
    try {
      const now = this.ctx.currentTime;
      const pulses = 3 + Math.floor(Math.random() * 3);

      for (let i = 0; i < pulses; i++) {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(4900 + Math.random() * 600, now + i * 0.045);

        filter.type = 'highpass';
        filter.frequency.setValueAtTime(4200, now + i * 0.045);

        gain.gain.setValueAtTime(0.015, now + i * 0.045);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.045 + 0.035);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.cicadaGain);

        osc.start(now + i * 0.045);
        osc.stop(now + i * 0.045 + 0.04);
      }
    } catch {}
  }

  // Play next step of the Mandingue Kora melody pattern
  private triggerKoraStep() {
    if (!this.ctx || !this.koraGain) return;

    // Subtle rhythmic variation (skip occasional note for breathing room)
    if (this.koraStep % 4 === 3 && Math.random() > 0.5) {
      this.koraStep = (this.koraStep + 1) % this.kumbengoPattern.length;
      return;
    }

    const scaleIdx = this.kumbengoPattern[this.koraStep];
    const freq = this.koraScale[scaleIdx] || 293.66;
    const velocity = (scaleIdx <= 2 ? 0.26 : 0.18) + Math.random() * 0.06;

    this.playKoraPluck(freq, velocity);
    this.koraStep = (this.koraStep + 1) % this.kumbengoPattern.length;
  }

  // Physical modeling of a single plucked Kora string with calabash resonance
  public playKoraPluck(frequency: number, velocity = 0.22) {
    if (!this.ctx || !this.koraGain) return;
    try {
      const now = this.ctx.currentTime;

      // 1. Calabash body resonator filter (gives the distinctive warm hollow acoustic body)
      const calabashFilter = this.ctx.createBiquadFilter();
      calabashFilter.type = 'bandpass';
      calabashFilter.frequency.setValueAtTime(320, now);
      calabashFilter.Q.setValueAtTime(3.2, now);

      const noteGain = this.ctx.createGain();
      noteGain.gain.setValueAtTime(velocity, now);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

      // 2. Fundamental & partial string harmonics
      const partials = [
        { mult: 1.0, gain: 0.8, decay: 1.1 },
        { mult: 2.01, gain: 0.35, decay: 0.7 },
        { mult: 3.02, gain: 0.15, decay: 0.45 },
        { mult: 4.8, gain: 0.08, decay: 0.25 },
      ];

      partials.forEach((p) => {
        const osc = this.ctx!.createOscillator();
        const pGain = this.ctx!.createGain();

        // Authentic string pluck attack with initial micro pitch bend
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(frequency * p.mult * 1.02, now);
        osc.frequency.exponentialRampToValueAtTime(frequency * p.mult, now + 0.015);

        pGain.gain.setValueAtTime(p.gain, now);
        pGain.gain.exponentialRampToValueAtTime(0.001, now + p.decay);

        osc.connect(pGain);
        pGain.connect(calabashFilter);

        osc.start(now);
        osc.stop(now + p.decay + 0.02);
      });

      // 3. Fingertip skin pluck transient (micro noise click on attack)
      const clickOsc = this.ctx.createOscillator();
      const clickGain = this.ctx.createGain();
      clickOsc.type = 'sine';
      clickOsc.frequency.setValueAtTime(frequency * 4.2, now);
      clickOsc.frequency.exponentialRampToValueAtTime(80, now + 0.012);

      clickGain.gain.setValueAtTime(velocity * 0.3, now);
      clickGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.012);

      clickOsc.connect(clickGain);
      clickGain.connect(calabashFilter);
      clickOsc.start(now);
      clickOsc.stop(now + 0.015);

      calabashFilter.connect(noteGain);
      noteGain.connect(this.koraGain);
    } catch {}
  }

  // --------------------------------------------------------------------------
  // DELICATE BACKGROUND AFRICAN DRUM GROOVE (Dundun, Djembe & Tama pulse)
  // Synthesizes a soft, warm Sahelian acoustic heartbeat at low volume
  // --------------------------------------------------------------------------
  private triggerDrumGrooveStep() {
    if (!this.ctx || !this.drumGain) return;
    try {
      const now = this.ctx.currentTime;
      const step = this.drumStep % 16;
      this.drumStep++;

      switch (step) {
        case 0:
          // Deep soft Dundun bass + subtle calabash shaker whisper
          this.playAmbientDrumBass(now, 0.42);
          this.playAmbientDrumShaker(now, 0.12);
          break;
        case 1:
        case 3:
        case 5:
        case 9:
        case 11:
        case 13:
          // Ghost shaker whisper tick
          this.playAmbientDrumShaker(now, 0.08);
          break;
        case 2:
          // Tama (talking drum) soft downward bend
          this.playAmbientDrumTone(now, 195, 160, 0.28);
          break;
        case 4:
          // Second warm bass pulse
          this.playAmbientDrumBass(now, 0.36);
          this.playAmbientDrumShaker(now, 0.1);
          break;
        case 6:
          // Singing djembe tone + soft touch
          this.playAmbientDrumTone(now, 225, 185, 0.32);
          this.playAmbientDrumSlap(now, 0.14);
          break;
        case 7:
          this.playAmbientDrumShaker(now, 0.1);
          break;
        case 8:
          // Deep soft Dundun bass
          this.playAmbientDrumBass(now, 0.44);
          this.playAmbientDrumShaker(now, 0.12);
          break;
        case 10:
          // Tama singing tone
          this.playAmbientDrumTone(now, 240, 195, 0.34);
          break;
        case 12:
          // Syncopated double bass pulse
          this.playAmbientDrumBass(now, 0.32);
          this.playAmbientDrumShaker(now, 0.1);
          break;
        case 14:
          // Warm tone
          this.playAmbientDrumTone(now, 215, 175, 0.3);
          this.playAmbientDrumSlap(now, 0.13);
          break;
        case 15:
          this.playAmbientDrumShaker(now, 0.12);
          break;
      }
    } catch {}
  }

  // Soft low Dundun / Djembe bass pulse (sub-bass warmth)
  private playAmbientDrumBass(now: number, velocity: number) {
    if (!this.ctx || !this.drumGain) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(68, now);
    osc.frequency.exponentialRampToValueAtTime(42, now + 0.28);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(140, now);

    gain.gain.setValueAtTime(velocity * 0.45, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.drumGain);

    osc.start(now);
    osc.stop(now + 0.32);
  }

  // Subtle open tone / talking drum pitch bend
  private playAmbientDrumTone(now: number, startFreq: number, endFreq: number, velocity: number) {
    if (!this.ctx || !this.drumGain) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(startFreq, now);
    osc.frequency.exponentialRampToValueAtTime(endFreq, now + 0.18);

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime((startFreq + endFreq) / 2, now);
    filter.Q.setValueAtTime(3.0, now);

    gain.gain.setValueAtTime(velocity * 0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.drumGain);

    osc.start(now);
    osc.stop(now + 0.22);
  }

  // Very delicate soft rim slap / ghost tap
  private playAmbientDrumSlap(now: number, velocity: number) {
    if (!this.ctx || !this.drumGain) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(360, now);
    osc.frequency.exponentialRampToValueAtTime(150, now + 0.06);

    gain.gain.setValueAtTime(velocity * 0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

    osc.connect(gain);
    gain.connect(this.drumGain);

    osc.start(now);
    osc.stop(now + 0.08);
  }

  // Soft calabash shaker / cowrie rattle whisper
  private playAmbientDrumShaker(now: number, velocity: number) {
    if (!this.ctx || !this.drumGain || !this.noiseBuffer) return;
    const source = this.ctx.createBufferSource();
    source.buffer = this.noiseBuffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(2200, now);
    filter.Q.setValueAtTime(2.5, now);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(velocity * 0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.045);

    source.connect(filter);
    filter.connect(gain);
    gain.connect(this.drumGain);

    source.start(now);
    source.stop(now + 0.05);
  }

  public setAmbientVolume(volume: number) {
    if (this.ambientGain && this.ctx) {
      const target = Math.max(0.0001, volume);
      this.ambientGain.gain.setTargetAtTime(target, this.ctx.currentTime, 0.1);
    }
  }

  public stopAmbient() {
    if (this.cicadaInterval) {
      clearInterval(this.cicadaInterval);
      this.cicadaInterval = null;
    }
    if (this.koraInterval) {
      clearInterval(this.koraInterval);
      this.koraInterval = null;
    }
    if (this.drumInterval) {
      clearInterval(this.drumInterval);
      this.drumInterval = null;
    }
    if (this.windSource) {
      try {
        this.windSource.stop();
        this.windSource.disconnect();
      } catch {}
      this.windSource = null;
    }
    if (this.drumGain) {
      this.drumGain.disconnect();
      this.drumGain = null;
    }
    if (this.drumFilter) {
      this.drumFilter.disconnect();
      this.drumFilter = null;
    }
    if (this.ambientGain) {
      this.ambientGain.disconnect();
      this.ambientGain = null;
    }
  }

  // --------------------------------------------------------------------------
  // 2. FOOTSTEPS: CRISP SANDALS ON DRY RED LATERITE SAVANNA SOIL
  // --------------------------------------------------------------------------
  public playFootstep(volume: number) {
    this.ensureContext();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      this.footstepToggle = !this.footstepToggle;

      // A) Granular crunch of red soil sand particles (filtered noise burst)
      if (this.noiseBuffer) {
        const sandSource = this.ctx.createBufferSource();
        sandSource.buffer = this.noiseBuffer;

        const sandFilter = this.ctx.createBiquadFilter();
        sandFilter.type = 'bandpass';
        sandFilter.frequency.setValueAtTime(
          this.footstepToggle ? 1350 : 1550,
          now
        );
        sandFilter.Q.setValueAtTime(2.2, now);

        const sandGain = this.ctx.createGain();
        sandGain.gain.setValueAtTime(volume * 0.14, now);
        sandGain.gain.exponentialRampToValueAtTime(0.001, now + 0.045);

        sandSource.connect(sandFilter);
        sandFilter.connect(sandGain);
        sandGain.connect(this.ctx.destination);

        sandSource.start(now);
        sandSource.stop(now + 0.05);
      }

      // B) Leather sole ground impact thud (low warm clay pop)
      const thudOsc = this.ctx.createOscillator();
      const thudFilter = this.ctx.createBiquadFilter();
      const thudGain = this.ctx.createGain();

      const startFreq = this.footstepToggle ? 110 : 95;
      thudOsc.type = 'sine';
      thudOsc.frequency.setValueAtTime(startFreq, now);
      thudOsc.frequency.exponentialRampToValueAtTime(45, now + 0.06);

      thudFilter.type = 'lowpass';
      thudFilter.frequency.setValueAtTime(220, now);

      thudGain.gain.setValueAtTime(volume * 0.12, now);
      thudGain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

      thudOsc.connect(thudFilter);
      thudFilter.connect(thudGain);
      thudGain.connect(this.ctx.destination);

      thudOsc.start(now);
      thudOsc.stop(now + 0.065);
    } catch {}
  }

  // --------------------------------------------------------------------------
  // 3. INTERACTIVE CHÉKÉRÉ AUX CAURIS (COWRIE SHELL SHAKER)
  // --------------------------------------------------------------------------
  public playInteract(volume: number) {
    this.ensureContext();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;

      // Authentic Cowrie Shaker / Chékéré rattle: two rapid rhythmic bead clicks
      [0, 0.035].forEach((offset, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        const filter = this.ctx!.createBiquadFilter();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(idx === 0 ? 880 : 1320, now + offset);
        osc.frequency.exponentialRampToValueAtTime(400, now + offset + 0.03);

        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(2400, now + offset);
        filter.Q.setValueAtTime(3.5, now + offset);

        gain.gain.setValueAtTime(volume * (idx === 0 ? 0.14 : 0.18), now + offset);
        gain.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.06);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(now + offset);
        osc.stop(now + offset + 0.07);
      });

      // Accompany with gentle Kalimba wooden tine ping
      const tine = this.ctx.createOscillator();
      const tineGain = this.ctx.createGain();
      tine.type = 'sine';
      tine.frequency.setValueAtTime(587.33, now); // D5
      tineGain.gain.setValueAtTime(volume * 0.08, now);
      tineGain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

      tine.connect(tineGain);
      tineGain.connect(this.ctx.destination);
      tine.start(now);
      tine.stop(now + 0.29);
    } catch {}
  }

  // --------------------------------------------------------------------------
  // 4. PORTAL / DOORWAY: FLUTE PEULE & WOODEN BREEZE
  // --------------------------------------------------------------------------
  public playPortalOpen(volume: number) {
    this.ensureContext();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      // Pastoral Fulani wood flute ascending tri-tone (A4 -> D5 -> F#5)
      [440.0, 587.33, 739.99].forEach((f, i) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        const filter = this.ctx!.createBiquadFilter();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, now + i * 0.09);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1400, now + i * 0.09);

        gain.gain.setValueAtTime(0, now);
        gain.gain.setValueAtTime(volume * 0.16, now + i * 0.09);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.09 + 0.38);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(now + i * 0.09);
        osc.stop(now + i * 0.09 + 0.39);
      });
    } catch {}
  }

  // --------------------------------------------------------------------------
  // 5. SUCCESS: JOYFUL BALAFON CELEBRATION ARPEGGIO WITH GOURD BUZZ
  // --------------------------------------------------------------------------
  public playSuccess(volume: number) {
    this.ensureContext();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      // Traditional Mandingue Balafon scale ascending cascade
      const balafonNotes = [293.66, 329.63, 369.99, 440.0, 493.88, 587.33, 739.99];

      balafonNotes.forEach((freq, idx) => {
        const time = now + idx * 0.065;

        // Wooden slat attack
        const woodOsc = this.ctx!.createOscillator();
        const woodGain = this.ctx!.createGain();
        woodOsc.type = 'triangle';
        woodOsc.frequency.setValueAtTime(freq, time);

        // Gourd mirliton buzz harmonic
        const buzzOsc = this.ctx!.createOscillator();
        const buzzGain = this.ctx!.createGain();
        buzzOsc.type = 'sawtooth';
        buzzOsc.frequency.setValueAtTime(freq * 2.02, time);

        const filter = this.ctx!.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(freq * 1.5, time);
        filter.Q.setValueAtTime(2.8, time);

        const masterNoteGain = this.ctx!.createGain();
        masterNoteGain.gain.setValueAtTime(0, now);
        masterNoteGain.gain.setValueAtTime(volume * 0.18, time);
        masterNoteGain.gain.exponentialRampToValueAtTime(0.001, time + 0.45);

        woodGain.gain.setValueAtTime(0.8, time);
        buzzGain.gain.setValueAtTime(0.2, time);

        woodOsc.connect(woodGain);
        buzzOsc.connect(buzzGain);
        woodGain.connect(filter);
        buzzGain.connect(filter);
        filter.connect(masterNoteGain);
        masterNoteGain.connect(this.ctx!.destination);

        woodOsc.start(time);
        woodOsc.stop(time + 0.46);
        buzzOsc.start(time);
        buzzOsc.stop(time + 0.46);
      });
    } catch {}
  }

  // --------------------------------------------------------------------------
  // 6. AUTHENTIC WEST AFRICAN DJEMBE HAND DRUM
  // Synthesizes the 3 true traditional tones:
  // - Bass (Goundo): center fist/palm strike, deep low skin vibration
  // - Tone (Pa): perimeter strike with flat fingers, clear singing pitch
  // - Slap (Ta): edge rim slap, biting explosive crack
  // --------------------------------------------------------------------------
  public playDjembe(pitch: 'bass' | 'tone' | 'slap', volume: number) {
    this.ensureContext();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;

      if (pitch === 'bass') {
        // Deep round 65Hz palm strike into 42Hz with wood cavity resonance
        const bassOsc = this.ctx.createOscillator();
        const bassGain = this.ctx.createGain();
        const bassFilter = this.ctx.createBiquadFilter();

        bassOsc.type = 'sine';
        bassOsc.frequency.setValueAtTime(74, now);
        bassOsc.frequency.exponentialRampToValueAtTime(44, now + 0.35);

        bassFilter.type = 'lowpass';
        bassFilter.frequency.setValueAtTime(160, now);

        bassGain.gain.setValueAtTime(volume * 0.55, now);
        bassGain.gain.exponentialRampToValueAtTime(0.001, now + 0.42);

        bassOsc.connect(bassFilter);
        bassFilter.connect(bassGain);
        bassGain.connect(this.ctx.destination);

        bassOsc.start(now);
        bassOsc.stop(now + 0.45);
      } else if (pitch === 'tone') {
        // Clear open tone ringing on the perimeter (~230Hz fundamental + 460Hz overtone)
        const toneOsc = this.ctx.createOscillator();
        const toneGain = this.ctx.createGain();
        const toneFilter = this.ctx.createBiquadFilter();

        toneOsc.type = 'triangle';
        toneOsc.frequency.setValueAtTime(235, now);
        toneOsc.frequency.exponentialRampToValueAtTime(175, now + 0.22);

        toneFilter.type = 'bandpass';
        toneFilter.frequency.setValueAtTime(260, now);
        toneFilter.Q.setValueAtTime(3.8, now);

        toneGain.gain.setValueAtTime(volume * 0.42, now);
        toneGain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

        toneOsc.connect(toneFilter);
        toneFilter.connect(toneGain);
        toneGain.connect(this.ctx.destination);

        toneOsc.start(now);
        toneOsc.stop(now + 0.26);
      } else {
        // Sharp, biting rim slap (~720Hz acoustic snap + high noise burst)
        const slapOsc = this.ctx.createOscillator();
        const slapGain = this.ctx.createGain();
        const slapFilter = this.ctx.createBiquadFilter();

        slapOsc.type = 'triangle';
        slapOsc.frequency.setValueAtTime(720, now);
        slapOsc.frequency.exponentialRampToValueAtTime(280, now + 0.08);

        slapFilter.type = 'highpass';
        slapFilter.frequency.setValueAtTime(550, now);

        slapGain.gain.setValueAtTime(volume * 0.48, now);
        slapGain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

        slapOsc.connect(slapFilter);
        slapFilter.connect(slapGain);
        slapGain.connect(this.ctx.destination);

        slapOsc.start(now);
        slapOsc.stop(now + 0.14);

        // Rim skin crackle burst
        if (this.noiseBuffer) {
          const crackSource = this.ctx.createBufferSource();
          crackSource.buffer = this.noiseBuffer;

          const crackFilter = this.ctx.createBiquadFilter();
          crackFilter.type = 'bandpass';
          crackFilter.frequency.setValueAtTime(2800, now);
          crackFilter.Q.setValueAtTime(4.0, now);

          const crackGain = this.ctx.createGain();
          crackGain.gain.setValueAtTime(volume * 0.22, now);
          crackGain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

          crackSource.connect(crackFilter);
          crackFilter.connect(crackGain);
          crackGain.connect(this.ctx.destination);

          crackSource.start(now);
          crackSource.stop(now + 0.07);
        }
      }
    } catch {}
  }
}

const audioEngine = new AfricanAudioEngine();

interface AudioStore {
  settings: AudioSettings;
  setMasterVolume: (volume: number) => void;
  setMusicVolume: (volume: number) => void;
  setSfxVolume: (volume: number) => void;
  toggleMute: () => void;

  playFootstep: () => void;
  playInteract: () => void;
  playPortalOpen: () => void;
  playSuccess: () => void;
  playDjembe: (pitch?: 'bass' | 'tone' | 'slap') => void;
  initAmbient: () => void;
}

export const useAudioStore = create<AudioStore>((set, get) => ({
  settings: {
    masterVolume: 0.85,
    musicVolume: 0.7,
    sfxVolume: 0.85,
    muted: false,
  },

  setMasterVolume: (volume) => {
    set((state) => ({ settings: { ...state.settings, masterVolume: volume } }));
    const s = get().settings;
    audioEngine.setAmbientVolume(s.muted ? 0 : s.masterVolume * s.musicVolume);
  },

  setMusicVolume: (volume) => {
    set((state) => ({ settings: { ...state.settings, musicVolume: volume } }));
    const s = get().settings;
    audioEngine.setAmbientVolume(s.muted ? 0 : s.masterVolume * s.musicVolume);
  },

  setSfxVolume: (volume) =>
    set((state) => ({ settings: { ...state.settings, sfxVolume: volume } })),

  toggleMute: () => {
    set((state) => ({
      settings: { ...state.settings, muted: !state.settings.muted },
    }));
    const s = get().settings;
    if (s.muted) {
      audioEngine.setAmbientVolume(0);
    } else {
      audioEngine.ensureContext();
      audioEngine.startAmbient(s.masterVolume * s.musicVolume);
      audioEngine.setAmbientVolume(s.masterVolume * s.musicVolume);
    }
  },

  playFootstep: () => {
    const s = get().settings;
    if (s.muted) return;
    audioEngine.playFootstep(s.masterVolume * s.sfxVolume);
  },

  playInteract: () => {
    const s = get().settings;
    if (s.muted) return;
    audioEngine.playInteract(s.masterVolume * s.sfxVolume);
  },

  playPortalOpen: () => {
    const s = get().settings;
    if (s.muted) return;
    audioEngine.playPortalOpen(s.masterVolume * s.sfxVolume);
  },

  playSuccess: () => {
    const s = get().settings;
    if (s.muted) return;
    audioEngine.playSuccess(s.masterVolume * s.sfxVolume);
  },

  playDjembe: (pitch = 'bass') => {
    const s = get().settings;
    if (s.muted) return;
    audioEngine.playDjembe(pitch, s.masterVolume * s.sfxVolume);
  },

  initAmbient: () => {
    const s = get().settings;
    if (!s.muted) {
      audioEngine.startAmbient(s.masterVolume * s.musicVolume);
    }
  },
}));
