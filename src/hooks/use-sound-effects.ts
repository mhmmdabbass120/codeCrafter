import { useCallback, useRef } from 'react';

type SoundEffect = 
  | 'success'
  | 'error' 
  | 'click'
  | 'levelUp'
  | 'achievement'
  | 'notification'
  | 'typing'
  | 'complete'
  | 'hint'
  | 'focus';

interface SoundConfig {
  frequency?: number;
  duration?: number;
  volume?: number;
  type?: OscillatorType;
}

const SOUND_CONFIGS: Record<SoundEffect, SoundConfig[]> = {
  success: [
    { frequency: 523.25, duration: 200, volume: 0.3, type: 'sine' },
    { frequency: 659.25, duration: 200, volume: 0.3, type: 'sine' },
    { frequency: 783.99, duration: 300, volume: 0.3, type: 'sine' }
  ],
  error: [
    { frequency: 220, duration: 150, volume: 0.2, type: 'sawtooth' },
    { frequency: 196, duration: 150, volume: 0.2, type: 'sawtooth' },
    { frequency: 174.61, duration: 200, volume: 0.2, type: 'sawtooth' }
  ],
  click: [
    { frequency: 800, duration: 50, volume: 0.1, type: 'square' }
  ],
  levelUp: [
    { frequency: 261.63, duration: 150, volume: 0.4, type: 'sine' },
    { frequency: 329.63, duration: 150, volume: 0.4, type: 'sine' },
    { frequency: 392, duration: 150, volume: 0.4, type: 'sine' },
    { frequency: 523.25, duration: 300, volume: 0.4, type: 'sine' },
    { frequency: 659.25, duration: 400, volume: 0.4, type: 'sine' }
  ],
  achievement: [
    { frequency: 440, duration: 100, volume: 0.3, type: 'sine' },
    { frequency: 554.37, duration: 100, volume: 0.3, type: 'sine' },
    { frequency: 659.25, duration: 100, volume: 0.3, type: 'sine' },
    { frequency: 880, duration: 200, volume: 0.3, type: 'sine' },
    { frequency: 1108.73, duration: 300, volume: 0.3, type: 'sine' }
  ],
  notification: [
    { frequency: 800, duration: 100, volume: 0.2, type: 'sine' },
    { frequency: 1000, duration: 100, volume: 0.2, type: 'sine' }
  ],
  typing: [
    { frequency: 1200, duration: 30, volume: 0.05, type: 'square' }
  ],
  complete: [
    { frequency: 523.25, duration: 150, volume: 0.3, type: 'sine' },
    { frequency: 659.25, duration: 150, volume: 0.3, type: 'sine' },
    { frequency: 783.99, duration: 150, volume: 0.3, type: 'sine' },
    { frequency: 1046.5, duration: 400, volume: 0.3, type: 'sine' }
  ],
  hint: [
    { frequency: 660, duration: 80, volume: 0.15, type: 'sine' },
    { frequency: 880, duration: 120, volume: 0.15, type: 'sine' }
  ],
  focus: [
    { frequency: 400, duration: 40, volume: 0.08, type: 'sine' }
  ]
};

export const useSoundEffects = () => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const enabledRef = useRef(false); // Disabled by default to remove peeping sounds

  const getAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioContextRef.current;
  }, []);

  const playTone = useCallback(async (config: SoundConfig) => {
    if (!enabledRef.current) return;

    try {
      const audioContext = getAudioContext();
      
      // Resume context if suspended (required for user interaction)
      if (audioContext.state === 'suspended') {
        await audioContext.resume();
      }

      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.setValueAtTime(config.frequency || 440, audioContext.currentTime);
      oscillator.type = config.type || 'sine';

      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(config.volume || 0.1, audioContext.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + (config.duration || 100) / 1000);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + (config.duration || 100) / 1000);
    } catch (error) {
      console.warn('Audio playback failed:', error);
    }
  }, [getAudioContext]);

  const playSound = useCallback(async (soundEffect: SoundEffect) => {
    if (!enabledRef.current) return;

    const configs = SOUND_CONFIGS[soundEffect];
    
    for (let i = 0; i < configs.length; i++) {
      const config = configs[i];
      if (i > 0) {
        await new Promise(resolve => setTimeout(resolve, configs[i - 1].duration || 100));
      }
      playTone(config);
    }
  }, [playTone]);

  const playSequence = useCallback(async (sounds: SoundEffect[], delay: number = 100) => {
    for (let i = 0; i < sounds.length; i++) {
      if (i > 0) {
        await new Promise(resolve => setTimeout(resolve, delay));
      }
      playSound(sounds[i]);
    }
  }, [playSound]);

  const playTypingSound = useCallback(() => {
    // Throttle typing sounds to avoid overwhelming
    const now = Date.now();
    if (!playTypingSound.lastPlayed || now - playTypingSound.lastPlayed > 100) {
      playSound('typing');
      (playTypingSound as any).lastPlayed = now;
    }
  }, [playSound]);

  const enable = useCallback(() => {
    enabledRef.current = true;
  }, []);

  const disable = useCallback(() => {
    enabledRef.current = false;
  }, []);

  const toggle = useCallback(() => {
    enabledRef.current = !enabledRef.current;
    return enabledRef.current;
  }, []);

  // Preset sound combinations
  const playCelebration = useCallback(() => {
    playSequence(['achievement', 'success'], 200);
  }, [playSequence]);

  const playProgressSound = useCallback(() => {
    playSound('complete');
  }, [playSound]);

  const playInteractionSound = useCallback(() => {
    playSound('click');
  }, [playSound]);

  const playFeedbackSound = useCallback((type: 'positive' | 'negative' | 'neutral') => {
    switch (type) {
      case 'positive':
        playSound('success');
        break;
      case 'negative':
        playSound('error');
        break;
      case 'neutral':
        playSound('notification');
        break;
    }
  }, [playSound]);

  return {
    playSound,
    playSequence,
    playTypingSound,
    playCelebration,
    playProgressSound,
    playInteractionSound,
    playFeedbackSound,
    enable,
    disable,
    toggle,
    isEnabled: () => enabledRef.current
  };
};
