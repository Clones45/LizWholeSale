// compliance.js — A2P 10DLC opt-in checkbox with custom SVG checkmark UI

/**
 * Builds and returns the A2P 10DLC compliant SMS opt-in checkbox HTML.
 * Uses a custom styled checkbox (hidden native input + SVG visual) to match the premium UI.
 * The native <input> is always present in the DOM for form validation — it is visually hidden
 * but remains accessible and submittable.
 *
 * @param {object} options
 * @param {string} options.privacyUrl  - path to privacy policy page
 * @param {string} options.termsUrl    - path to terms of service page
 * @returns {string} HTML string
 */
export function buildOptInCheckbox({ privacyUrl = '/privacy.html', termsUrl = '/terms.html' } = {}) {
  // Lucide-style thin checkmark SVG
  const checkSvg = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>`;

  return `
    <div class="form-group" id="sms-consent-group">
      <div class="checkbox-group">

        <!-- Hidden native input (screen readers + form submission) -->
        <input
          type="checkbox"
          id="smsConsent"
          name="smsConsent"
          class="checkbox-input"
          required
          aria-required="true"
          aria-describedby="sms-consent-desc"
          style="position:absolute;opacity:0;width:1px;height:1px;pointer-events:none;"
        />

        <!-- Custom visual checkbox — clicking label toggles native input -->
        <div class="checkbox-custom" id="checkbox-visual" aria-hidden="true">
          ${checkSvg}
        </div>

        <label for="smsConsent" class="checkbox-label" id="sms-consent-desc">
          By providing your phone number, you agree to receive text messages from
          <strong>Elite Integrity Property Solutions</strong> regarding your inquiry.
          Reply <strong>STOP</strong> to opt out. Message and data rates may apply.
          View our <a href="${privacyUrl}" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
          and <a href="${termsUrl}" target="_blank" rel="noopener noreferrer">Terms of Service</a>.
        </label>

      </div>
      <span class="form-error-msg" role="alert">You must agree to receive text messages to submit this form.</span>
    </div>
  `;
}

/**
 * Initializes custom checkbox click-sync behavior after the HTML is injected.
 * Call this after buildOptInCheckbox() HTML is inserted into the DOM.
 */
export function initCustomCheckbox() {
  const input  = document.getElementById('smsConsent');
  const visual = document.getElementById('checkbox-visual');
  if (!input || !visual) return;

  // Clicking the visual box also toggles the hidden native input
  visual.addEventListener('click', () => {
    input.checked = !input.checked;
    syncVisual(input, visual);
    // Trigger change event so any validation listeners fire
    input.dispatchEvent(new Event('change', { bubbles: true }));
  });

  // Keep visual in sync when native input changes (keyboard, programmatic)
  input.addEventListener('change', () => syncVisual(input, visual));
  syncVisual(input, visual); // init state
}

function syncVisual(input, visual) {
  if (input.checked) {
    visual.style.background  = 'var(--color-green-500)';
    visual.style.borderColor = 'var(--color-green-500)';
    visual.style.boxShadow   = '0 0 0 3px rgba(52,196,122,.2)';
    const svg = visual.querySelector('svg');
    if (svg) { svg.style.opacity = '1'; svg.style.transform = 'scale(1)'; }
  } else {
    visual.style.background  = 'rgba(255,255,255,.04)';
    visual.style.borderColor = 'rgba(255,255,255,.2)';
    visual.style.boxShadow   = 'none';
    const svg = visual.querySelector('svg');
    if (svg) { svg.style.opacity = '0'; svg.style.transform = 'scale(0.6)'; }
  }
}
