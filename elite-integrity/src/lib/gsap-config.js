// gsap-config.js — GSAP + ScrollTrigger registration & global defaults
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Global GSAP defaults
gsap.defaults({
  ease: 'power3.out',
  duration: 0.9,
});

// ScrollTrigger global defaults
ScrollTrigger.defaults({
  toggleActions: 'play none none none',
  once: true,
});

/**
 * Batch reveal elements with stagger on scroll enter — Y slide only (opacity not animated
 * so elements are never invisible if ScrollTrigger fails to fire).
 * @param {string|NodeList} targets - CSS selector or NodeList
 * @param {object} options
 */
export function revealOnScroll(targets, options = {}) {
  const {
    y        = 50,
    stagger  = 0.12,
    duration = 0.9,
    start    = 'top 85%',
    ease     = 'power3.out',
    delay    = 0,
  } = options;

  // Ensure elements are always visible — GSAP only handles Y movement
  gsap.set(targets, { opacity: 1 });

  gsap.from(targets, {
    y,
    stagger,
    duration,
    ease,
    delay,
    scrollTrigger: {
      trigger: typeof targets === 'string' ? targets : targets[0],
      start,
      toggleActions: 'play none none none',
      once: true,
    },
  });
}

/**
 * Animate a numeric counter from 0 to target value.
 * @param {HTMLElement} el
 * @param {number} target
 * @param {string} suffix  e.g. '+', '%', ' Days'
 */
export function animateCounter(el, target, suffix = '') {
  const obj = { value: 0 };
  gsap.to(obj, {
    value: target,
    duration: 2,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: el,
      start: 'top 85%',
      once: true,
    },
    onUpdate() {
      el.textContent = Math.round(obj.value) + suffix;
    },
  });
}

export { gsap, ScrollTrigger };
