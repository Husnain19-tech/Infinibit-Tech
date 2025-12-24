import { Variants, Transition } from 'framer-motion';

// ============================================
// ANIMATION VARIANTS LIBRARY
// Centralized animation configurations for Infinibit Tech
// ============================================

// Transition presets
export const transitions = {
  smooth: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } as Transition,
  spring: { type: 'spring', stiffness: 100, damping: 15 } as Transition,
  quick: { duration: 0.3, ease: 'easeOut' } as Transition,
  slow: { duration: 1, ease: [0.4, 0, 0.2, 1] } as Transition,
  bounce: { type: 'spring', stiffness: 300, damping: 20 } as Transition,
};

// ============================================
// FADE ANIMATIONS
// ============================================
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: transitions.smooth },
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: transitions.smooth },
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -40 },
  visible: { opacity: 1, y: 0, transition: transitions.smooth },
};

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: transitions.smooth },
};

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: transitions.smooth },
};

// ============================================
// SCALE ANIMATIONS
// ============================================
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: transitions.spring },
};

export const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { opacity: 1, scale: 1, transition: transitions.bounce },
};

export const popIn: Variants = {
  hidden: { opacity: 0, scale: 0 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { type: 'spring', stiffness: 500, damping: 25 } 
  },
};

// ============================================
// 3D ANIMATIONS
// ============================================
export const flipIn: Variants = {
  hidden: { opacity: 0, rotateY: -90 },
  visible: { opacity: 1, rotateY: 0, transition: transitions.smooth },
};

export const rotate3D: Variants = {
  hidden: { opacity: 0, rotateX: -15, rotateY: -15 },
  visible: { opacity: 1, rotateX: 0, rotateY: 0, transition: transitions.spring },
};

export const float: Variants = {
  animate: {
    y: [0, -20, 0],
    transition: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
  },
};

export const pulse: Variants = {
  animate: {
    scale: [1, 1.05, 1],
    opacity: [0.5, 1, 0.5],
    transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
  },
};

// ============================================
// STAGGER CONTAINER ANIMATIONS
// ============================================
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const staggerContainerFast: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05,
    },
  },
};

export const staggerContainerSlow: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2,
    },
  },
};

// ============================================
// PAGE TRANSITION ANIMATIONS
// ============================================
export const pageTransition: Variants = {
  initial: { 
    opacity: 0, 
    scale: 0.98,
    filter: 'blur(10px)',
  },
  animate: { 
    opacity: 1, 
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
  },
  exit: { 
    opacity: 0, 
    scale: 1.02,
    filter: 'blur(10px)',
    transition: { duration: 0.3, ease: 'easeIn' },
  },
};

export const slidePageLeft: Variants = {
  initial: { opacity: 0, x: '100%' },
  animate: { opacity: 1, x: 0, transition: transitions.smooth },
  exit: { opacity: 0, x: '-100%', transition: transitions.quick },
};

export const slidePageRight: Variants = {
  initial: { opacity: 0, x: '-100%' },
  animate: { opacity: 1, x: 0, transition: transitions.smooth },
  exit: { opacity: 0, x: '100%', transition: transitions.quick },
};

// ============================================
// HERO ANIMATIONS
// ============================================
export const heroTextReveal: Variants = {
  hidden: { opacity: 0, y: 100, rotateX: -30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    rotateX: 0,
    transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
  },
};

export const heroSubtitle: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, delay: 0.3, ease: 'easeOut' },
  },
};

export const heroCTA: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { duration: 0.5, delay: 0.6, ease: 'easeOut' },
  },
};

// ============================================
// CARD ANIMATIONS
// ============================================
export const cardHover = {
  rest: { scale: 1, boxShadow: '0 0 0 rgba(0, 229, 255, 0)' },
  hover: { 
    scale: 1.02, 
    boxShadow: '0 0 30px rgba(0, 229, 255, 0.3)',
    transition: transitions.quick,
  },
};

export const card3DTilt = {
  rest: { rotateX: 0, rotateY: 0 },
  hover: { rotateX: 5, rotateY: 5 },
};

// ============================================
// GLOW ANIMATIONS
// ============================================
export const glowPulse: Variants = {
  animate: {
    boxShadow: [
      '0 0 20px rgba(0, 229, 255, 0.3)',
      '0 0 40px rgba(0, 229, 255, 0.5)',
      '0 0 20px rgba(0, 229, 255, 0.3)',
    ],
    transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
  },
};

export const neonGlow: Variants = {
  animate: {
    textShadow: [
      '0 0 10px rgba(0, 229, 255, 0.5)',
      '0 0 20px rgba(0, 229, 255, 0.8)',
      '0 0 10px rgba(0, 229, 255, 0.5)',
    ],
    transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
  },
};

// ============================================
// UTILITY FUNCTIONS
// ============================================
export const getStaggerDelay = (index: number, baseDelay: number = 0.1): number => {
  return index * baseDelay;
};

export const createDelayedVariant = (
  variant: Variants, 
  delay: number
): Variants => {
  const delayedVariant = { ...variant };
  if (delayedVariant.visible && typeof delayedVariant.visible === 'object') {
    delayedVariant.visible = {
      ...delayedVariant.visible,
      transition: {
        ...(delayedVariant.visible.transition as object),
        delay,
      },
    };
  }
  return delayedVariant;
};
