// High-Fidelity Multi-Channel Audio & Distinct Synthetic Voice Engine for DEAL OR DANDA
// Built using Web Audio API and Web Speech API. 100% self-contained, 0 external API dependencies.

import { InvestorId, AudioSettings } from '../types/game';

class SoundEngine {
  private ctx: AudioContext | null = null;
  private introNodes: { stop: () => void } | null = null;
  private isIntroPlaying = false;
  private lastDandaPlayTime = 0;

  private settings: AudioSettings = {
    masterMuted: false,
    musicMuted: false,
    sfxMuted: false,
    voiceMuted: false,
    musicVolume: 0.8,
    sfxVolume: 0.9,
    voiceVolume: 1.0,
  };

  private speechSynth: SpeechSynthesis | null = null;
  private availableVoices: SpeechSynthesisVoice[] = [];
  private onSpeakingStateChange?: (investorId: InvestorId | null, isSpeaking: boolean, text?: string) => void;

  constructor() {
    this.loadSettings();
    if (typeof window !== 'undefined') {
      if ('speechSynthesis' in window) {
        this.speechSynth = window.speechSynthesis;
        this.loadVoices();
        if (this.speechSynth.onvoiceschanged !== undefined) {
          this.speechSynth.onvoiceschanged = () => this.loadVoices();
        }
      }
    }
  }

  private loadSettings() {
    try {
      const stored = localStorage.getItem('deal_or_danda_audio_settings');
      if (stored) {
        this.settings = { ...this.settings, ...JSON.parse(stored) };
      }
    } catch {
      // ignore
    }
  }

  public saveSettings() {
    try {
      localStorage.setItem('deal_or_danda_audio_settings', JSON.stringify(this.settings));
    } catch {
      // ignore
    }
  }

  public getSettings(): AudioSettings {
    return { ...this.settings };
  }

  public updateSettings(partial: Partial<AudioSettings>) {
    this.settings = { ...this.settings, ...partial };
    this.saveSettings();
    if (this.settings.masterMuted || this.settings.voiceMuted) {
      this.stopSpeaking();
    }
    if (this.settings.masterMuted || this.settings.musicMuted) {
      this.stopIntroMusic();
    }
  }

  public setSpeakingListener(listener: (investorId: InvestorId | null, isSpeaking: boolean, text?: string) => void) {
    this.onSpeakingStateChange = listener;
  }

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  // Public async method to safely resume AudioContext inside user click handlers
  public async resumeContext(): Promise<boolean> {
    this.initContext();
    if (this.ctx && this.ctx.state === 'suspended') {
      try {
        await this.ctx.resume();
        return true;
      } catch (err) {
        console.warn('AudioContext resume rejected by browser:', err);
        return false;
      }
    }
    return this.ctx?.state === 'running';
  }

  private loadVoices() {
    if (this.speechSynth) {
      this.availableVoices = this.speechSynth.getVoices();
    }
  }

  // Pre-process Indian English / Hinglish text for natural prosody, pronunciation, and dramatic pauses
  public preprocessHinglishText(text: string, investorId: InvestorId): string {
    let processed = text;

    // Currency and unit expansions for clean speech pronunciation
    processed = processed.replace(/₹\s*([0-9.]+)\s*Cr/gi, '$1 Crore rupees');
    processed = processed.replace(/₹\s*([0-9.]+)\s*Lakh/gi, '$1 Lakh rupees');
    processed = processed.replace(/₹\s*([0-9.]+)\s*k/gi, '$1 thousand rupees');
    processed = processed.replace(/₹\s*([0-9,]+)/g, '$1 rupees');
    processed = processed.replace(/\bCAC\b/g, 'C-A-C');
    processed = processed.replace(/\bLTV\b/g, 'L-T-V');
    processed = processed.replace(/\bARR\b/g, 'A-R-R');
    processed = processed.replace(/\bEBITDA\b/g, 'Ee-bit-da');
    processed = processed.replace(/\bNPS\b/g, 'N-P-S');
    processed = processed.replace(/\bD2C\b/g, 'D to C');
    processed = processed.replace(/\bB2B\b/g, 'B to B');
    processed = processed.replace(/\bP2P\b/g, 'Peer to Peer');

    // Emphasize signature "Doglapan!" with dramatic pause
    processed = processed.replace(/\bDoglapan\b!*/gi, '... Doglapan!');

    // Character-specific prosody additions
    switch (investorId) {
      case 'ashneer':
        // Cashneer: Sarcastic, sharp staccato pauses
        processed = processed.replace(/\bBhai\b/gi, 'Bhai,');
        processed = processed.replace(/\bNumbers\b/gi, 'Numbers,');
        processed = processed.replace(/\bValuation\b/gi, 'Valuation,');
        break;
      case 'aman':
        // Demand: Friendly, energetic conversational pauses
        processed = processed.replace(/\bBoss\b/gi, 'Boss,');
        processed = processed.replace(/\bHero\b/gi, 'Hero,');
        processed = processed.replace(/\bYaar\b/gi, 'Yaar,');
        break;
      case 'vineeta':
        // Win-ita: Precise analytical commas
        processed = processed.replace(/\bUnit economics\b/gi, 'Unit economics,');
        processed = processed.replace(/\bGross margin\b/gi, 'Gross margin,');
        break;
      case 'namita':
        // Namita: Dramatic pauses before declarations
        processed = processed.replace(/\bOUT\b/g, '... OUT');
        processed = processed.replace(/\bFoundation\b/gi, 'Foundation,');
        break;
    }

    return processed;
  }

  // Find strictly gender-consistent and Indian-accented voices
  private getVoiceForInvestor(investorId: InvestorId): SpeechSynthesisVoice | null {
    if (!this.availableVoices || this.availableVoices.length === 0) {
      this.loadVoices();
    }
    const voices = this.availableVoices;
    if (!voices || voices.length === 0) return null;

    // Filter by locale: prefer Indian English (en-IN) or Hindi (hi-IN)
    const inVoices = voices.filter((v) => v.lang.includes('en-IN') || v.lang.includes('hi-IN'));

    // Strictly classify female vs male voices across all installed voices
    const isFemaleVoice = (v: SpeechSynthesisVoice) => {
      const name = v.name.toLowerCase();
      return (
        name.includes('female') ||
        name.includes('zira') ||
        name.includes('neerja') ||
        name.includes('heera') ||
        name.includes('swara') ||
        name.includes('kavya') ||
        name.includes('kalpana') ||
        name.includes('samantha') ||
        name.includes('victoria') ||
        name.includes('linda') ||
        name.includes('karen') ||
        name.includes('catherine') ||
        name.includes('susan')
      );
    };

    const isMaleVoice = (v: SpeechSynthesisVoice) => {
      const name = v.name.toLowerCase();
      return (
        name.includes('male') ||
        name.includes('david') ||
        name.includes('ravi') ||
        name.includes('prabhat') ||
        name.includes('madhav') ||
        name.includes('mark') ||
        name.includes('richard') ||
        name.includes('george') ||
        name.includes('guy') ||
        name.includes('oliver')
      );
    };

    const inMaleVoices = inVoices.filter((v) => isMaleVoice(v) || (!isFemaleVoice(v) && !v.name.toLowerCase().includes('female')));
    const inFemaleVoices = inVoices.filter((v) => isFemaleVoice(v));
    const allMaleVoices = voices.filter((v) => isMaleVoice(v) || !isFemaleVoice(v));
    const allFemaleVoices = voices.filter((v) => isFemaleVoice(v));

    switch (investorId) {
      case 'ashneer': {
        // Cashneer Grover: Deep forceful male
        return inMaleVoices[0] || allMaleVoices[0] || voices[0];
      }
      case 'aman': {
        // Demand Gupta: Younger energetic male (different voice from Cashneer if available)
        return inMaleVoices[1] || inMaleVoices[0] || allMaleVoices[1] || allMaleVoices[0] || voices[0];
      }
      case 'vineeta': {
        // Win-ita Singh: Articulate confident female
        return inFemaleVoices[0] || allFemaleVoices[0] || voices[0];
      }
      case 'namita': {
        // Namita Tappar: Mature composed female (distinct female voice if available)
        return inFemaleVoices[1] || inFemaleVoices[0] || allFemaleVoices[1] || allFemaleVoices[0] || voices[0];
      }
      default:
        return voices[0] || null;
    }
  }

  // Voice Actor Engine for the 4 Sharks
  public speak(investorId: InvestorId, rawText: string, onEndCallback?: () => void) {
    if (this.settings.masterMuted || this.settings.voiceMuted) {
      if (this.onSpeakingStateChange) {
        this.onSpeakingStateChange(investorId, false, rawText);
      }
      onEndCallback?.();
      return;
    }

    if (!this.speechSynth || typeof window === 'undefined') {
      onEndCallback?.();
      return;
    }

    // Cancel any previous spoken lines cleanly
    this.speechSynth.cancel();

    const spokenText = this.preprocessHinglishText(rawText, investorId);
    const utterance = new SpeechSynthesisUtterance(spokenText);
    const voice = this.getVoiceForInvestor(investorId);
    if (voice) {
      utterance.voice = voice;
    }

    // High-definition acoustic character tuning
    switch (investorId) {
      case 'ashneer': // Cashneer Grover: Deep, rough, fast, intimidating
        utterance.pitch = 0.76;
        utterance.rate = 1.08;
        break;
      case 'aman': // Demand Gupta: Younger, upbeat, energetic, playful
        utterance.pitch = 1.12;
        utterance.rate = 1.04;
        break;
      case 'vineeta': // Win-ita Singh: Confident, articulate, analytical female
        utterance.pitch = 1.14;
        utterance.rate = 0.98;
        break;
      case 'namita': // Namita Tappar: Mature, composed, decisive female
        utterance.pitch = 0.94;
        utterance.rate = 0.90;
        break;
    }

    utterance.volume = this.settings.voiceVolume;

    utterance.onstart = () => {
      this.onSpeakingStateChange?.(investorId, true, rawText);
    };

    utterance.onend = () => {
      this.onSpeakingStateChange?.(null, false, undefined);
      onEndCallback?.();
    };

    utterance.onerror = () => {
      this.onSpeakingStateChange?.(null, false, undefined);
      onEndCallback?.();
    };

    try {
      this.speechSynth.speak(utterance);
    } catch {
      onEndCallback?.();
    }
  }

  public stopSpeaking() {
    if (this.speechSynth) {
      this.speechSynth.cancel();
    }
    this.onSpeakingStateChange?.(null, false, undefined);
  }

  // 1. CASHNEER'S SIGNATURE "DOGLAPAN!" MOMENT AUDIO & DRAMATIC STING
  public playDoglapanSting() {
    if (this.settings.masterMuted || this.settings.sfxMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(this.settings.sfxVolume * 0.9, t);
    gain.connect(this.ctx.destination);

    // Dramatic dissonant shock brass stab (F# & C tritone + heavy sub thud)
    const notes = [185, 261.63, 370, 523.25];
    notes.forEach((freq) => {
      const osc = this.ctx!.createOscillator();
      const oscGain = this.ctx!.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, t);
      oscGain.gain.setValueAtTime(0.3, t);
      oscGain.gain.exponentialRampToValueAtTime(0.001, t + 0.55);
      osc.connect(oscGain);
      oscGain.connect(gain);
      osc.start(t);
      osc.stop(t + 0.55);
    });

    // Timpani drum impact shock
    const timpani = this.ctx.createOscillator();
    const timpaniGain = this.ctx.createGain();
    timpani.type = 'triangle';
    timpani.frequency.setValueAtTime(140, t);
    timpani.frequency.exponentialRampToValueAtTime(32, t + 0.6);
    timpaniGain.gain.setValueAtTime(0.85, t);
    timpaniGain.gain.exponentialRampToValueAtTime(0.001, t + 0.65);
    timpani.connect(timpaniGain);
    timpaniGain.connect(gain);
    timpani.start(t);
    timpani.stop(t + 0.65);
  }

  // Play dramatic shock sting for Doglapan moment
  public playDoglapanAlert() {
    this.playDoglapanSting();
  }

  // Standalone catchphrase call: "Doglapan!" with exact prompt requirements
  public speakDoglapan(onEndCallback?: () => void) {
    // Speak with angry contemptuous delivery and sting
    this.speak('ashneer', 'Bhai, ek minute! Pehle kuch aur bola, ab kuch aur bol rahe ho. Yeh kya Doglapan hai?!', () => {
      this.playDoglapanSting();
      onEndCallback?.();
    });
    // Also trigger initial shock sting at start
    this.playDoglapanSting();
  }

  // 2. DRAMATIC INTRO MUSIC (5–8 Seconds Synchronized Indian Business TV Intro)
  public playDramaticIntro(onProgress?: (step: number) => void, onComplete?: () => void) {
    if (this.settings.masterMuted || this.settings.musicMuted) {
      onComplete?.();
      return;
    }
    this.initContext();
    if (!this.ctx) {
      onComplete?.();
      return;
    }

    this.stopIntroMusic();
    this.isIntroPlaying = true;

    const t = this.ctx.currentTime;
    const masterGain = this.ctx.createGain();
    masterGain.gain.setValueAtTime(this.settings.musicVolume * 0.75, t);
    masterGain.connect(this.ctx.destination);

    // Section 1: Low dramatic sub-drone & stage power-up (0s - 2s)
    const subOsc = this.ctx.createOscillator();
    const subGain = this.ctx.createGain();
    subOsc.type = 'sawtooth';
    subOsc.frequency.setValueAtTime(55, t); // A1 note
    subOsc.frequency.exponentialRampToValueAtTime(110, t + 4.5);
    subGain.gain.setValueAtTime(0.01, t);
    subGain.gain.linearRampToValueAtTime(0.4, t + 1.2);
    subGain.gain.exponentialRampToValueAtTime(0.01, t + 6.2);
    subOsc.connect(subGain);
    subGain.connect(masterGain);
    subOsc.start(t);
    subOsc.stop(t + 6.3);

    // Section 2: Dramatic Indian Taal / Dholak-style rhythmic pulses (Every 0.8s)
    const beats = [0.2, 0.9, 1.6, 2.3, 3.0, 3.6, 4.2, 4.8];
    beats.forEach((btTime) => {
      const beatOsc = this.ctx!.createOscillator();
      const beatGain = this.ctx!.createGain();
      beatOsc.type = 'triangle';
      beatOsc.frequency.setValueAtTime(160, t + btTime);
      beatOsc.frequency.exponentialRampToValueAtTime(45, t + btTime + 0.18);
      beatGain.gain.setValueAtTime(0.6, t + btTime);
      beatGain.gain.exponentialRampToValueAtTime(0.001, t + btTime + 0.2);
      beatOsc.connect(beatGain);
      beatGain.connect(masterGain);
      beatOsc.start(t + btTime);
      beatOsc.stop(t + btTime + 0.2);
    });

    // Section 3: Resonant Ascending Sitar / Brass Lead Arpeggio (2.0s - 5.0s)
    const leadNotes = [
      { f: 220, time: 1.6, dur: 0.3 },
      { f: 261.63, time: 2.0, dur: 0.3 },
      { f: 293.66, time: 2.4, dur: 0.3 },
      { f: 329.63, time: 2.8, dur: 0.4 },
      { f: 370.0, time: 3.3, dur: 0.4 },
      { f: 440.0, time: 3.8, dur: 0.5 },
      { f: 523.25, time: 4.4, dur: 0.6 },
      { f: 587.33, time: 4.9, dur: 0.5 },
    ];

    leadNotes.forEach((n) => {
      const leadOsc = this.ctx!.createOscillator();
      const leadGain = this.ctx!.createGain();
      leadOsc.type = 'sawtooth';
      leadOsc.frequency.setValueAtTime(n.f, t + n.time);
      leadGain.gain.setValueAtTime(0.25, t + n.time);
      leadGain.gain.exponentialRampToValueAtTime(0.001, t + n.time + n.dur);
      leadOsc.connect(leadGain);
      leadGain.connect(masterGain);
      leadOsc.start(t + n.time);
      leadOsc.stop(t + n.time + n.dur);
    });

    // Section 4: Final Dramatic Orchestral Sting & Brass Hit (5.5s - 6.8s)
    const stingChord = [220, 277.18, 329.63, 440, 554.37, 659.25];
    stingChord.forEach((f) => {
      const stingOsc = this.ctx!.createOscillator();
      const stingGain = this.ctx!.createGain();
      stingOsc.type = 'triangle';
      stingOsc.frequency.setValueAtTime(f, t + 5.5);
      stingGain.gain.setValueAtTime(0.35, t + 5.5);
      stingGain.gain.exponentialRampToValueAtTime(0.001, t + 6.8);
      stingOsc.connect(stingGain);
      stingGain.connect(masterGain);
      stingOsc.start(t + 5.5);
      stingOsc.stop(t + 6.8);
    });

    const timers = [
      setTimeout(() => onProgress?.(0), 100),
      setTimeout(() => onProgress?.(1), 1200),
      setTimeout(() => onProgress?.(2), 2400),
      setTimeout(() => onProgress?.(3), 3800),
      setTimeout(() => {
        onProgress?.(4);
        this.isIntroPlaying = false;
        onComplete?.();
      }, 5500),
    ];

    this.introNodes = {
      stop: () => {
        timers.forEach(clearTimeout);
        try {
          masterGain.gain.linearRampToValueAtTime(0.001, this.ctx!.currentTime + 0.1);
          setTimeout(() => masterGain.disconnect(), 150);
        } catch {
          // ignore
        }
        this.isIntroPlaying = false;
      },
    };
  }

  public stopIntroMusic() {
    if (this.introNodes) {
      this.introNodes.stop();
      this.introNodes = null;
    }
    this.isIntroPlaying = false;
  }

  // 3. DRAMATIC REJECTION SOUND ("I AM OUT!")
  public playRejectionSound() {
    if (this.settings.masterMuted || this.settings.sfxMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(this.settings.sfxVolume * 0.85, t);
    gain.connect(this.ctx.destination);

    // Heavy Gavel strike & metallic impact
    const thud = this.ctx.createOscillator();
    const thudGain = this.ctx.createGain();
    thud.type = 'sawtooth';
    thud.frequency.setValueAtTime(220, t);
    thud.frequency.exponentialRampToValueAtTime(30, t + 0.35);
    thudGain.gain.setValueAtTime(0.8, t);
    thudGain.gain.exponentialRampToValueAtTime(0.001, t + 0.4);
    thud.connect(thudGain);
    thudGain.connect(gain);
    thud.start(t);
    thud.stop(t + 0.4);

    // Deep sub drop
    const sub = this.ctx.createOscillator();
    const subGain = this.ctx.createGain();
    sub.type = 'sine';
    sub.frequency.setValueAtTime(110, t);
    sub.frequency.exponentialRampToValueAtTime(35, t + 0.6);
    subGain.gain.setValueAtTime(0.6, t);
    subGain.gain.exponentialRampToValueAtTime(0.001, t + 0.65);
    sub.connect(subGain);
    subGain.connect(gain);
    sub.start(t);
    sub.stop(t + 0.65);
  }

  // 4. ENHANCED COMEDIC DANDA BONK WITH WIND-UP
  public playDandaBonk() {
    if (this.settings.masterMuted || this.settings.sfxMuted) return;
    const now = Date.now();
    if (now - this.lastDandaPlayTime < 800) return;
    this.lastDandaPlayTime = now;

    this.initContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const masterSfx = this.ctx.createGain();
    masterSfx.gain.setValueAtTime(this.settings.sfxVolume, t);
    masterSfx.connect(this.ctx.destination);

    // A. Comedic rising slide whistle wind-up (0s - 0.25s)
    const windUp = this.ctx.createOscillator();
    const windUpGain = this.ctx.createGain();
    windUp.type = 'sine';
    windUp.frequency.setValueAtTime(250, t);
    windUp.frequency.exponentialRampToValueAtTime(950, t + 0.25);
    windUpGain.gain.setValueAtTime(0.35, t);
    windUpGain.gain.exponentialRampToValueAtTime(0.01, t + 0.26);
    windUp.connect(windUpGain);
    windUpGain.connect(masterSfx);
    windUp.start(t);
    windUp.stop(t + 0.26);

    // B. Wooden thwack impact (at 0.26s)
    const thwack = this.ctx.createOscillator();
    const thwackGain = this.ctx.createGain();
    thwack.type = 'triangle';
    thwack.frequency.setValueAtTime(180, t + 0.26);
    thwackGain.gain.setValueAtTime(0.85, t + 0.26);
    thwackGain.gain.exponentialRampToValueAtTime(0.001, t + 0.48);
    thwack.connect(thwackGain);
    thwackGain.connect(masterSfx);
    thwack.start(t + 0.26);
    thwack.stop(t + 0.48);

    // C. Wobbly spring "BOING" accent (0.32s - 0.75s)
    const boing = this.ctx.createOscillator();
    const boingGain = this.ctx.createGain();
    boing.type = 'sine';
    boing.frequency.setValueAtTime(300, t + 0.32);
    boing.frequency.linearRampToValueAtTime(680, t + 0.44);
    boing.frequency.linearRampToValueAtTime(340, t + 0.58);
    boing.frequency.linearRampToValueAtTime(560, t + 0.72);
    boingGain.gain.setValueAtTime(0.45, t + 0.32);
    boingGain.gain.exponentialRampToValueAtTime(0.001, t + 0.8);
    boing.connect(boingGain);
    boingGain.connect(masterSfx);
    boing.start(t + 0.32);
    boing.stop(t + 0.8);
  }

  // 5. BLUNDER BUZZ
  public playBuzz() {
    if (this.settings.masterMuted || this.settings.sfxMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(95, t);
    osc.frequency.setValueAtTime(90, t + 0.15);
    gain.gain.setValueAtTime(0.3 * this.settings.sfxVolume, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.4);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(t);
    osc.stop(t + 0.4);
  }

  // 6. QUESTION NOTIFICATION PING
  public playQuestionPing() {
    if (this.settings.masterMuted || this.settings.sfxMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(440, t);
    osc.frequency.exponentialRampToValueAtTime(880, t + 0.15);
    gain.gain.setValueAtTime(0.25 * this.settings.sfxVolume, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.4);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(t);
    osc.stop(t + 0.4);
  }

  // 7. POSITIVE CHIME
  public playCorrect() {
    if (this.settings.masterMuted || this.settings.sfxMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((freq, idx) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t + idx * 0.08);
      gain.gain.setValueAtTime(0.2 * this.settings.sfxVolume, t + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.08 + 0.35);
      osc.connect(gain);
      gain.connect(this.ctx!.destination);
      osc.start(t + idx * 0.08);
      osc.stop(t + idx * 0.08 + 0.35);
    });
  }

  // 8. DEAL FANFARE
  public playDealFanfare() {
    if (this.settings.masterMuted || this.settings.sfxMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const notes = [
      { f: 523.25, time: 0, dur: 0.15 },
      { f: 523.25, time: 0.16, dur: 0.15 },
      { f: 523.25, time: 0.32, dur: 0.15 },
      { f: 659.25, time: 0.48, dur: 0.35 },
      { f: 783.99, time: 0.85, dur: 0.5 },
      { f: 1046.5, time: 1.35, dur: 0.8 },
    ];

    notes.forEach((n) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(n.f, t + n.time);
      gain.gain.setValueAtTime(0.35 * this.settings.sfxVolume, t + n.time);
      gain.gain.exponentialRampToValueAtTime(0.001, t + n.time + n.dur);
      osc.connect(gain);
      gain.connect(this.ctx!.destination);
      osc.start(t + n.time);
      osc.stop(t + n.time + n.dur);
    });
  }

  // 9. TAP CLICK
  public playClick() {
    if (this.settings.masterMuted || this.settings.sfxMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(700, t);
    osc.frequency.exponentialRampToValueAtTime(300, t + 0.05);
    gain.gain.setValueAtTime(0.12 * this.settings.sfxVolume, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.06);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(t);
    osc.stop(t + 0.06);
  }

  // 10. COMEDIC CARTOON SLAP SOUND
  public playSlapSound() {
    if (this.settings.masterMuted || this.settings.sfxMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(this.settings.sfxVolume * 0.9, t);
    gain.connect(this.ctx.destination);

    // Wind-up ascending slide (0s - 0.15s)
    const whistle = this.ctx.createOscillator();
    const whistleGain = this.ctx.createGain();
    whistle.type = 'sine';
    whistle.frequency.setValueAtTime(220, t);
    whistle.frequency.exponentialRampToValueAtTime(880, t + 0.15);
    whistleGain.gain.setValueAtTime(0.3, t);
    whistleGain.gain.exponentialRampToValueAtTime(0.01, t + 0.15);
    whistle.connect(whistleGain);
    whistleGain.connect(gain);
    whistle.start(t);
    whistle.stop(t + 0.15);

    // Sharp slap crack impact (at 0.15s)
    const slap = this.ctx.createOscillator();
    const slapGain = this.ctx.createGain();
    slap.type = 'triangle';
    slap.frequency.setValueAtTime(320, t + 0.15);
    slap.frequency.exponentialRampToValueAtTime(60, t + 0.35);
    slapGain.gain.setValueAtTime(0.9, t + 0.15);
    slapGain.gain.exponentialRampToValueAtTime(0.001, t + 0.38);
    slap.connect(slapGain);
    slapGain.connect(gain);
    slap.start(t + 0.15);
    slap.stop(t + 0.38);

    // Comic spring wobble boing
    const wobble = this.ctx.createOscillator();
    const wobbleGain = this.ctx.createGain();
    wobble.type = 'sine';
    wobble.frequency.setValueAtTime(450, t + 0.2);
    wobble.frequency.linearRampToValueAtTime(700, t + 0.32);
    wobble.frequency.linearRampToValueAtTime(350, t + 0.44);
    wobble.frequency.linearRampToValueAtTime(500, t + 0.55);
    wobbleGain.gain.setValueAtTime(0.4, t + 0.2);
    wobbleGain.gain.exponentialRampToValueAtTime(0.001, t + 0.6);
    wobble.connect(wobbleGain);
    wobbleGain.connect(gain);
    wobble.start(t + 0.2);
    wobble.stop(t + 0.6);
  }

  // 11. CASHNEER DESK SLAM (Heavy table thud)
  public playDeskSlamSound() {
    if (this.settings.masterMuted || this.settings.sfxMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(this.settings.sfxVolume * 0.95, t);
    gain.connect(this.ctx.destination);

    // Heavy low frequency thud
    const osc = this.ctx.createOscillator();
    const oscGain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(120, t);
    osc.frequency.exponentialRampToValueAtTime(28, t + 0.3);
    oscGain.gain.setValueAtTime(0.8, t);
    oscGain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
    osc.connect(oscGain);
    oscGain.connect(gain);
    osc.start(t);
    osc.stop(t + 0.35);
  }

  // 12. VERDICT OFFER CHIME (Sparkling bell celebration)
  public playVerdictOfferSound() {
    if (this.settings.masterMuted || this.settings.sfxMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const masterGain = this.ctx.createGain();
    masterGain.gain.setValueAtTime(this.settings.sfxVolume * 0.8, t);
    masterGain.connect(this.ctx.destination);

    // Staggered bell arpeggio (C6, E6, G6, C7)
    const notes = [1046.5, 1318.5, 1567.98, 2093.0];
    notes.forEach((freq, i) => {
      const osc = this.ctx!.createOscillator();
      const g = this.ctx!.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t + i * 0.08);
      g.gain.setValueAtTime(0.35, t + i * 0.08);
      g.gain.exponentialRampToValueAtTime(0.001, t + i * 0.08 + 0.5);
      osc.connect(g);
      g.connect(masterGain);
      osc.start(t + i * 0.08);
      osc.stop(t + i * 0.08 + 0.5);
    });
  }

  // 13. VERDICT OUT BUZZER / GONG
  public playVerdictOutSound() {
    if (this.settings.masterMuted || this.settings.sfxMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(this.settings.sfxVolume * 0.75, t);
    gain.connect(this.ctx.destination);

    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const oscGain = this.ctx.createGain();
    osc1.type = 'sawtooth';
    osc2.type = 'triangle';
    osc1.frequency.setValueAtTime(110, t);
    osc2.frequency.setValueAtTime(114, t); // Dissonant beating
    osc1.frequency.exponentialRampToValueAtTime(65, t + 0.5);
    osc2.frequency.exponentialRampToValueAtTime(68, t + 0.5);
    oscGain.gain.setValueAtTime(0.5, t);
    oscGain.gain.exponentialRampToValueAtTime(0.001, t + 0.55);
    osc1.connect(oscGain);
    osc2.connect(oscGain);
    oscGain.connect(gain);
    osc1.start(t);
    osc2.start(t);
    osc1.stop(t + 0.55);
    osc2.stop(t + 0.55);
  }

  // 14. FINAL NO-OFFER DANDA GONG & BONK
  public playFinalDandaSound() {
    if (this.settings.masterMuted || this.settings.sfxMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(this.settings.sfxVolume, t);
    gain.connect(this.ctx.destination);

    // Low dramatic suspense gong
    const gong = this.ctx.createOscillator();
    const gongGain = this.ctx.createGain();
    gong.type = 'sine';
    gong.frequency.setValueAtTime(65, t);
    gong.frequency.exponentialRampToValueAtTime(25, t + 1.2);
    gongGain.gain.setValueAtTime(0.85, t);
    gongGain.gain.exponentialRampToValueAtTime(0.001, t + 1.3);
    gong.connect(gongGain);
    gongGain.connect(gain);
    gong.start(t);
    gong.stop(t + 1.3);

    // Followed by double danda impact
    setTimeout(() => {
      this.playDandaBonk();
    }, 450);
  }
}

export const sound = new SoundEngine();
