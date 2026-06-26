// stats.js — Animated counter section
import { animateCounter } from '../lib/gsap-config.js';
import { $$ } from '../lib/utils.js';

export function initStats() {
  const counters = $$('[data-counter]');

  counters.forEach(el => {
    const target = parseFloat(el.dataset.counter);
    const suffix = el.dataset.suffix || '';
    animateCounter(el, target, suffix);
  });
}
