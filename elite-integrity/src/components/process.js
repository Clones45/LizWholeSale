// process.js — 3-step "How It Works" scroll-reveal
import { revealOnScroll } from '../lib/gsap-config.js';
import { $ } from '../lib/utils.js';

export function initProcess() {
  const section = $('#how-it-works');
  if (!section) return;

  revealOnScroll('#how-it-works .section-header', { y: 40, stagger: 0 });
  revealOnScroll('#how-it-works .process-card', {
    y: 60,
    stagger: 0.18,
    start: 'top 80%',
  });
}
