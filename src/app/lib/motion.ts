import type { Variants } from 'framer-motion';

/** Container that staggers its children as they enter the viewport. */
export const staggerContainer = (stagger = 0.12, delay = 0): Variants => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren: stagger,
      delayChildren: delay,
    },
  },
});

/** Fade + rise, with a gentle spring. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 90, damping: 16, mass: 0.6 },
  },
};

/** Slide in from a side (direction: -1 = from left, 1 = from right). */
export const slideIn = (direction: -1 | 1): Variants => ({
  hidden: { opacity: 0, x: 64 * direction },
  show: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring', stiffness: 80, damping: 18 },
  },
});

/** Scale + fade for cards. */
export const popIn: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 120, damping: 18 },
  },
};

/** Heading reveal. */
export const headingReveal: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};
