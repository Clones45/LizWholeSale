// hero.js — Parallax hero with GSAP timeline
import { gsap, ScrollTrigger } from '../lib/gsap-config.js';
import { $ } from '../lib/utils.js';

export function initHero() {
  const hero       = $('#hero');
  const heroBg     = $('#hero-bg');
  const heroLabel  = $('#hero-label');
  const heroTitle  = $('#hero-title');
  const heroSub    = $('#hero-subtitle');
  const heroCtas   = $('#hero-ctas');
  const heroStats  = $('#hero-stats');

  if (!hero) return;

  // Force all hero elements visible — only Y transforms will animate
  gsap.set([heroLabel, heroTitle, heroSub, heroCtas, heroStats], { opacity: 1, y: 0 });

  // — Entrance timeline (y-slide only, opacity always 1) —
  const tl = gsap.timeline({ delay: 0.3 });

  tl.from(heroLabel, {
    y: 24,
    duration: 0.6,
    ease: 'power3.out',
  })
  .from(heroTitle, {
    y: 60,
    duration: 1,
    ease: 'power3.out',
  }, '-=0.3')
  .from(heroSub, {
    y: 40,
    duration: 0.8,
    ease: 'power3.out',
  }, '-=0.6')
  .from(heroCtas, {
    y: 30,
    duration: 0.7,
    ease: 'power3.out',
  }, '-=0.5')
  .from(heroStats, {
    y: 20,
    stagger: 0.12,
    duration: 0.6,
    ease: 'power3.out',
  }, '-=0.3');

  // — Parallax on scroll —
  if (heroBg) {
    gsap.to(heroBg, {
      yPercent: 30,
      ease: 'none',
      scrollTrigger: {
        trigger: hero,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });
  }

  // — Subtle scale on hero title on scroll —
  gsap.to(heroTitle, {
    opacity: 0,
    y: -40,
    ease: 'none',
    scrollTrigger: {
      trigger: hero,
      start: 'center top',
      end: 'bottom top',
      scrub: 1,
    },
  });
}
