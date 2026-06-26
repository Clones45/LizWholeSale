// testimonials.js — Auto-playing testimonial carousel
import { gsap }           from '../lib/gsap-config.js';
import { revealOnScroll } from '../lib/gsap-config.js';
import { $, $$  }         from '../lib/utils.js';

export function initTestimonials() {
  const track    = $('#testimonials-track');
  const slides   = $$('.testimonial-slide');
  const prevBtn  = $('#testimonials-prev');
  const nextBtn  = $('#testimonials-next');
  const dots     = $$('.testimonial-dot');

  if (!track || slides.length === 0) return;

  let current   = 0;
  let autoplay;
  const total   = slides.length;

  function goTo(index, direction = 1) {
    const from = slides[current];
    const to   = slides[index];

    gsap.to(from, {
      opacity: 0,
      x: -40 * direction,
      duration: 0.45,
      ease: 'power2.in',
      onComplete: () => {
        from.style.display = 'none';
        gsap.set(to, { display: 'flex', opacity: 0, x: 40 * direction });
        gsap.to(to, { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' });
      },
    });

    dots.forEach((d, i) => d.classList.toggle('active', i === index));
    current = index;
  }

  // Show first slide, hide rest
  slides.forEach((s, i) => {
    if (i === 0) {
      s.style.display = 'flex';
      gsap.set(s, { opacity: 1, x: 0 });
    } else {
      s.style.display = 'none';
    }
  });

  if (dots[0]) dots[0].classList.add('active');

  function next() { goTo((current + 1) % total, 1); }
  function prev() { goTo((current - 1 + total) % total, -1); }

  function restartAutoplay() {
    clearInterval(autoplay);
    autoplay = setInterval(next, 5000);
  }

  nextBtn?.addEventListener('click', () => { next(); restartAutoplay(); });
  prevBtn?.addEventListener('click', () => { prev(); restartAutoplay(); });

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => { goTo(i); restartAutoplay(); });
  });

  restartAutoplay();

  // Scroll-reveal entrance
  revealOnScroll('#testimonials .section-header', { y: 40, stagger: 0 });
}
