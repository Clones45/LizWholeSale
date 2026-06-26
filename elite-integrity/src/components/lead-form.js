// lead-form.js — Seller contact form with A2P compliance opt-in
import { buildOptInCheckbox, initCustomCheckbox } from './compliance.js';
import { submitForm } from '../lib/form-handler.js';
import { revealOnScroll } from '../lib/gsap-config.js';
import { $ } from '../lib/utils.js';

export function initLeadForm() {
  const formSection = $('#contact');
  const formEl      = $('#lead-form');

  if (!formEl) return;

  // Inject the compliant opt-in checkbox
  const checkboxMount = $('#sms-consent-mount');
  if (checkboxMount) {
    checkboxMount.innerHTML = buildOptInCheckbox({
      privacyUrl: '/privacy.html',
      termsUrl:   '/terms.html',
    });
    // Activate custom checkbox JS sync after injection
    initCustomCheckbox();
  }

  // Handle submission
  formEl.addEventListener('submit', async (e) => {
    e.preventDefault();
    await submitForm(formEl);
  });

  // Scroll reveal
  if (formSection) {
    revealOnScroll('#contact .contact-info', { y: 40, stagger: 0 });
    revealOnScroll('#contact .form-card',      { y: 50, stagger: 0, start: 'top 80%' });
    revealOnScroll('#contact .form-trust',     { y: 30, stagger: 0.1, start: 'top 85%' });
  }
}
