// form-handler.js — Validation + webhook POST + success/error UI
// -----------------------------------------------------------------
// SWAP THIS URL to your GoHighLevel / n8n / Make webhook endpoint:
const WEBHOOK_URL = 'https://services.leadconnectorhq.com/hooks/dtYoeW5P9L3VTRMPUZ3q/webhook-trigger/654359f6-d9bb-4e3b-8fb3-1e935eaf3d1f';
// -----------------------------------------------------------------

/**
 * Validates a US phone number (basic format check).
 */
function isValidPhone(phone) {
  return /^\+?1?\s*[\-.]?\s*(\(?\d{3}\)?)\s*[\-.]?\s*\d{3}\s*[\-.]?\s*\d{4}$/.test(phone.trim());
}

/**
 * Validates an email address.
 */
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

/**
 * Shows an inline field error.
 */
function setFieldError(input, message) {
  const group = input.closest('.form-group');
  if (!group) return;
  group.classList.add('has-error');
  const errEl = group.querySelector('.form-error-msg');
  if (errEl) errEl.textContent = message;
  input.classList.add('error');
}

/**
 * Clears all field errors in a form.
 */
function clearErrors(form) {
  form.querySelectorAll('.form-group').forEach(g => g.classList.remove('has-error'));
  form.querySelectorAll('.form-input').forEach(i => i.classList.remove('error'));
}

/**
 * Shows an alert banner inside the form wrapper.
 */
function showBanner(form, type, message) {
  let banner = form.querySelector('.form-banner');
  if (!banner) {
    banner = document.createElement('div');
    banner.className = 'alert form-banner';
    form.appendChild(banner);
  }
  banner.className = `alert form-banner alert--${type}`;
  banner.innerHTML = `<span>${type === 'success' ? '✅' : '❌'}</span> ${message}`;
  banner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/**
 * Validates all form fields. Returns true if valid.
 */
function validateForm(form) {
  let valid = true;

  const name  = form.querySelector('[name="name"]');
  const email = form.querySelector('[name="email"]');
  const phone = form.querySelector('[name="phone"]');
  const smsConsent = form.querySelector('[name="smsConsent"]');

  if (name && !name.value.trim()) {
    setFieldError(name, 'Full name is required.');
    valid = false;
  }

  if (email && !isValidEmail(email.value)) {
    setFieldError(email, 'Please enter a valid email address.');
    valid = false;
  }

  if (phone && !isValidPhone(phone.value)) {
    setFieldError(phone, 'Please enter a valid US phone number.');
    valid = false;
  }

  if (smsConsent && !smsConsent.checked) {
    // The browser required attribute handles this, but extra safety:
    setFieldError(smsConsent.closest('.checkbox-group') || smsConsent, 'You must agree to receive text messages to submit this form.');
    valid = false;
  }

  return valid;
}

/**
 * Collects form data into a clean payload object.
 */
function collectPayload(form) {
  const data = new FormData(form);
  return {
    name:       data.get('name')       || '',
    email:      data.get('email')      || '',
    phone:      data.get('phone')      || '',
    address:    data.get('address')    || '',
    situation:  data.get('situation')  || '',
    message:    data.get('message')    || '',
    smsConsent: data.get('smsConsent') === 'on' ? true : false,
    source:     'Elite Integrity Property Solutions Website',
    timestamp:  new Date().toISOString(),
    page:       window.location.href,
  };
}

/**
 * Submits the form. Validates → POST to webhook → show result.
 * @param {HTMLFormElement} form
 */
export async function submitForm(form) {
  clearErrors(form);

  if (!validateForm(form)) return;

  const submitBtn = form.querySelector('[type="submit"]');
  const originalText = submitBtn ? submitBtn.innerHTML : '';

  // Disable + show spinner
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span class="spinner"></span> Sending…`;
  }

  const payload = collectPayload(form);

  try {
    const response = await fetch(WEBHOOK_URL, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(payload),
    });

    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    showBanner(
      form,
      'success',
      "🎉 Thank you! We received your request and will contact you within 24 hours with your cash offer."
    );
    form.reset();

  } catch (err) {
    console.error('Form submission error:', err);
    showBanner(
      form,
      'error',
      "We're sorry — something went wrong. Please call us directly or try again in a moment."
    );
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
    }
  }
}
