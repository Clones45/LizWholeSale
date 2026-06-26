// services.js — Asymmetric grid service cards with hover lift
import { revealOnScroll } from '../lib/gsap-config.js';

export function initServices() {
  revealOnScroll('#services .section-header', { y: 40, stagger: 0 });
  revealOnScroll('#services .service-card', {
    y: 0,
    opacity: 0,
    stagger: 0.1,
    duration: 0.7,
    start: 'top 85%',
  });
}
