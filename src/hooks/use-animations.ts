import { useCallback, useRef } from 'react';

export type AnimationType = 
  | 'bounce'
  | 'pulse'
  | 'shake'
  | 'glow'
  | 'slideIn'
  | 'fadeIn'
  | 'flip'
  | 'scale'
  | 'confetti'
  | 'celebration';

interface AnimationConfig {
  duration?: number;
  delay?: number;
  easing?: string;
  iterations?: number;
}

const ANIMATION_DEFINITIONS: Record<AnimationType, string> = {
  bounce: `
    @keyframes bounce {
      0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
      40% { transform: translateY(-20px); }
      60% { transform: translateY(-10px); }
    }
  `,
  pulse: `
    @keyframes pulse {
      0% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.05); opacity: 0.8; }
      100% { transform: scale(1); opacity: 1; }
    }
  `,
  shake: `
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
      20%, 40%, 60%, 80% { transform: translateX(4px); }
    }
  `,
  glow: `
    @keyframes glow {
      0%, 100% { 
        box-shadow: 0 0 5px rgba(59, 130, 246, 0.5), 0 0 20px rgba(59, 130, 246, 0.3); 
      }
      50% { 
        box-shadow: 0 0 20px rgba(59, 130, 246, 0.8), 0 0 40px rgba(59, 130, 246, 0.6); 
      }
    }
  `,
  slideIn: `
    @keyframes slideIn {
      0% { transform: translateY(30px); opacity: 0; }
      100% { transform: translateY(0); opacity: 1; }
    }
  `,
  fadeIn: `
    @keyframes fadeIn {
      0% { opacity: 0; }
      100% { opacity: 1; }
    }
  `,
  flip: `
    @keyframes flip {
      0% { transform: rotateY(0); }
      50% { transform: rotateY(180deg); }
      100% { transform: rotateY(360deg); }
    }
  `,
  scale: `
    @keyframes scale {
      0% { transform: scale(0.8); opacity: 0; }
      50% { transform: scale(1.1); opacity: 0.8; }
      100% { transform: scale(1); opacity: 1; }
    }
  `,
  confetti: `
    @keyframes confetti {
      0% { 
        transform: translateY(-100vh) rotate(0deg); 
        opacity: 1; 
      }
      100% { 
        transform: translateY(100vh) rotate(360deg); 
        opacity: 0; 
      }
    }
  `,
  celebration: `
    @keyframes celebration {
      0%, 100% { transform: scale(1) rotate(0deg); }
      25% { transform: scale(1.2) rotate(-5deg); }
      50% { transform: scale(1.1) rotate(5deg); }
      75% { transform: scale(1.15) rotate(-3deg); }
    }
  `
};

export const useAnimations = () => {
  const styleSheetRef = useRef<HTMLStyleElement | null>(null);

  const ensureStyleSheet = useCallback(() => {
    if (!styleSheetRef.current) {
      styleSheetRef.current = document.createElement('style');
      document.head.appendChild(styleSheetRef.current);
      
      // Add all animation definitions
      const allAnimations = Object.values(ANIMATION_DEFINITIONS).join('\n');
      styleSheetRef.current.textContent = allAnimations;
    }
  }, []);

  const animate = useCallback((
    element: HTMLElement | string,
    animation: AnimationType,
    config: AnimationConfig = {}
  ) => {
    ensureStyleSheet();
    
    const el = typeof element === 'string' ? document.querySelector(element) as HTMLElement : element;
    if (!el) return;

    const {
      duration = 600,
      delay = 0,
      easing = 'ease-in-out',
      iterations = 1
    } = config;

    // Remove any existing animation
    el.style.animation = '';
    
    // Apply new animation
    requestAnimationFrame(() => {
      el.style.animation = `${animation} ${duration}ms ${easing} ${delay}ms ${iterations}`;
    });

    // Clean up after animation
    const cleanup = () => {
      el.style.animation = '';
      el.removeEventListener('animationend', cleanup);
    };
    
    el.addEventListener('animationend', cleanup);
  }, [ensureStyleSheet]);

  const animateSuccess = useCallback((element: HTMLElement | string) => {
    animate(element, 'bounce', { duration: 600 });
  }, [animate]);

  const animateError = useCallback((element: HTMLElement | string) => {
    animate(element, 'shake', { duration: 400 });
  }, [animate]);

  const animateAchievement = useCallback((element: HTMLElement | string) => {
    animate(element, 'celebration', { duration: 800, iterations: 2 });
  }, [animate]);

  const animateProgress = useCallback((element: HTMLElement | string) => {
    animate(element, 'glow', { duration: 1000, iterations: 3 });
  }, [animate]);

  const animateEnter = useCallback((element: HTMLElement | string) => {
    animate(element, 'slideIn', { duration: 400 });
  }, [animate]);

  const animateFocus = useCallback((element: HTMLElement | string) => {
    animate(element, 'pulse', { duration: 400 });
  }, [animate]);

  const createConfetti = useCallback((container?: HTMLElement) => {
    const targetContainer = container || document.body;
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff'];
    
    for (let i = 0; i < 50; i++) {
      const confetti = document.createElement('div');
      confetti.style.position = 'fixed';
      confetti.style.left = Math.random() * 100 + 'vw';
      confetti.style.top = '-10px';
      confetti.style.width = '10px';
      confetti.style.height = '10px';
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.borderRadius = '50%';
      confetti.style.pointerEvents = 'none';
      confetti.style.zIndex = '9999';
      confetti.style.animation = `confetti ${2 + Math.random() * 3}s linear`;
      
      targetContainer.appendChild(confetti);
      
      // Remove after animation
      setTimeout(() => {
        if (confetti.parentNode) {
          confetti.parentNode.removeChild(confetti);
        }
      }, 5000);
    }
  }, []);

  const createFloatingText = useCallback((
    text: string, 
    element: HTMLElement, 
    options: {
      color?: string;
      fontSize?: string;
      direction?: 'up' | 'down' | 'left' | 'right';
      duration?: number;
    } = {}
  ) => {
    const {
      color = '#4ade80',
      fontSize = '16px',
      direction = 'up',
      duration = 2000
    } = options;

    const rect = element.getBoundingClientRect();
    const floatingEl = document.createElement('div');
    
    floatingEl.textContent = text;
    floatingEl.style.position = 'fixed';
    floatingEl.style.left = rect.left + rect.width / 2 + 'px';
    floatingEl.style.top = rect.top + 'px';
    floatingEl.style.color = color;
    floatingEl.style.fontSize = fontSize;
    floatingEl.style.fontWeight = 'bold';
    floatingEl.style.pointerEvents = 'none';
    floatingEl.style.zIndex = '9999';
    floatingEl.style.transform = 'translateX(-50%)';
    floatingEl.style.transition = `all ${duration}ms ease-out`;
    
    document.body.appendChild(floatingEl);
    
    // Animate
    requestAnimationFrame(() => {
      const distance = 50;
      switch (direction) {
        case 'up':
          floatingEl.style.transform = `translateX(-50%) translateY(-${distance}px)`;
          break;
        case 'down':
          floatingEl.style.transform = `translateX(-50%) translateY(${distance}px)`;
          break;
        case 'left':
          floatingEl.style.transform = `translateX(calc(-50% - ${distance}px))`;
          break;
        case 'right':
          floatingEl.style.transform = `translateX(calc(-50% + ${distance}px))`;
          break;
      }
      floatingEl.style.opacity = '0';
    });
    
    // Remove after animation
    setTimeout(() => {
      if (floatingEl.parentNode) {
        floatingEl.parentNode.removeChild(floatingEl);
      }
    }, duration);
  }, []);

  const createRipple = useCallback((element: HTMLElement, event: MouseEvent) => {
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    const ripple = document.createElement('div');
    ripple.style.position = 'absolute';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.style.width = size + 'px';
    ripple.style.height = size + 'px';
    ripple.style.borderRadius = '50%';
    ripple.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'ripple 600ms linear';
    ripple.style.pointerEvents = 'none';
    
    // Add ripple animation if not exists
    if (!document.querySelector('#ripple-style')) {
      const style = document.createElement('style');
      style.id = 'ripple-style';
      style.textContent = `
        @keyframes ripple {
          to {
            transform: scale(2);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
      if (ripple.parentNode) {
        ripple.parentNode.removeChild(ripple);
      }
    }, 600);
  }, []);

  return {
    animate,
    animateSuccess,
    animateError,
    animateAchievement,
    animateProgress,
    animateEnter,
    animateFocus,
    createConfetti,
    createFloatingText,
    createRipple
  };
};
