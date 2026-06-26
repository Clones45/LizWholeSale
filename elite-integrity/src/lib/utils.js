// utils.js — Shared utility helpers

/**
 * Debounce a function call.
 */
export function debounce(fn, delay = 200) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

/**
 * Smooth-scroll to an element by selector or element.
 */
export function scrollTo(target, offset = 80) {
  const el = typeof target === 'string' ? document.querySelector(target) : target;
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: 'smooth' });
}

/**
 * Add class(es) to element.
 */
export function addClass(el, ...classes) {
  el?.classList.add(...classes);
}

/**
 * Remove class(es) from element.
 */
export function removeClass(el, ...classes) {
  el?.classList.remove(...classes);
}

/**
 * Toggle a class on an element.
 */
export function toggleClass(el, cls) {
  el?.classList.toggle(cls);
}

/**
 * Query helper — returns single element.
 */
export const $ = (sel, ctx = document) => ctx.querySelector(sel);

/**
 * Query helper — returns NodeList as array.
 */
export const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

/**
 * Check if element is in viewport.
 */
export function inViewport(el, offset = 0) {
  const rect = el.getBoundingClientRect();
  return rect.top <= window.innerHeight - offset && rect.bottom >= 0;
}

/**
 * Format phone number for display: (555) 123-4567
 */
export function formatPhone(raw) {
  const digits = raw.replace(/\D/g, '');
  if (digits.length === 10) {
    return `(${digits.slice(0,3)}) ${digits.slice(3,6)}-${digits.slice(6)}`;
  }
  return raw;
}
