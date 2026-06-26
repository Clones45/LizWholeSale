// nav.js — Sticky navigation with glassmorphism scroll effect
import { gsap } from '../lib/gsap-config.js';
import { scrollTo, $, $$ } from '../lib/utils.js';

export function initNav() {
  const nav = $('#main-nav');
  if (!nav) return;

  // — Glassmorphism on scroll —
  const SCROLL_THRESHOLD = 80;
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    if (scrollY > SCROLL_THRESHOLD) {
      nav.classList.add('nav--scrolled');
    } else {
      nav.classList.remove('nav--scrolled');
    }

    // Hide nav on scroll down, show on scroll up
    if (scrollY > lastScroll && scrollY > 200) {
      nav.classList.add('nav--hidden');
    } else {
      nav.classList.remove('nav--hidden');
    }

    lastScroll = scrollY;
  }, { passive: true });

  // — Mobile menu toggle —
  const menuBtn = $('#nav-menu-btn');
  const mobileMenu = $('#nav-mobile-menu');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', isOpen);
      menuBtn.innerHTML = isOpen
        ? `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`
        : `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>`;
    });
  }

  // — Smooth scroll for anchor links —
  $$('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const href = link.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        scrollTo(target, 80);
        if (mobileMenu?.classList.contains('open')) {
          mobileMenu.classList.remove('open');
          menuBtn?.setAttribute('aria-expanded', false);
        }
      }
    });
  });

  // — Entrance: CSS animation only (never GSAP transform on nav — avoids CSS transition conflicts) —
  nav.style.opacity = '1';
  nav.style.visibility = 'visible';
  nav.classList.add('nav--animate-in');
}
