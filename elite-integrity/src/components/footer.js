// footer.js — Global A2P compliance footer (injected on all pages)
// Uses Lucide-style thin-stroke SVGs for all contact icons

const ICON_PIN   = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`;
const ICON_PHONE = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41a2 2 0 0 1 1.99-2.18h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.06 6.06l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`;
const ICON_MAIL  = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`;
const ICON_LOCK  = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`;

/**
 * Injects the compliance footer into #site-footer.
 */
export function initFooter() {
  const mount = document.getElementById('site-footer');
  if (!mount) return;

  mount.innerHTML = `
    <footer class="footer" role="contentinfo" aria-label="Site footer">
      <div class="container">

        <!-- Top grid -->
        <div class="footer-grid">

          <!-- Brand column -->
          <div class="footer-brand">
            <div class="footer-logo">
              <a href="/" aria-label="Elite Integrity Property Solutions Home">
                <img src="/logo.png" alt="Elite Integrity Property Solutions" class="footer-logo-img" width="180" height="56" />
              </a>
            </div>
            <p class="footer-tagline">
              We buy houses fast for cash — any condition, any situation.
              No repairs, no fees, no commissions.
            </p>
            <div class="footer-badge">
              ${ICON_LOCK} A2P 10DLC Compliant SMS
            </div>
          </div>

          <!-- Quick Links -->
          <div class="footer-col">
            <h4 class="footer-col-title">Quick Links</h4>
            <ul class="footer-links">
              <li><a href="/#how-it-works">How It Works</a></li>
              <li><a href="/#services">Our Services</a></li>
              <li><a href="/#contact">Get Cash Offer</a></li>
              <li><a href="/terms.html">Terms of Service</a></li>
              <li><a href="/privacy.html">Privacy Policy</a></li>
            </ul>
          </div>

          <!-- Services -->
          <div class="footer-col">
            <h4 class="footer-col-title">We Buy Houses In</h4>
            <ul class="footer-links">
              <li><a href="/foreclosure.html">Foreclosure</a></li>
              <li><a href="/probate.html">Probate</a></li>
              <li><a href="/divorce.html">Divorce Situations</a></li>
              <li><a href="/fire-damage.html">Fire / Storm Damage</a></li>
              <li><a href="/inherited-homes.html">Inherited Homes</a></li>
              <li><a href="/relocation.html">Relocation Sales</a></li>
            </ul>
          </div>


          <!-- Contact (A2P Required) -->
          <div class="footer-col">
            <h4 class="footer-col-title">Contact Us</h4>
            <address class="footer-address" itemscope itemtype="https://schema.org/Organization">
              <meta itemprop="name" content="Elite Integrity Property Solutions" />
              <div class="footer-contact-item">
                <span class="footer-contact-icon">${ICON_PHONE}</span>
                <a href="tel:5597347472" itemprop="telephone">(559) 734-7472</a>
              </div>
            </address>
          </div>
        </div>

        <!-- Divider -->
        <div class="footer-divider"></div>

        <!-- Bottom bar -->
        <div class="footer-bottom">
          <div class="footer-legal">
            <p>
              &copy; ${new Date().getFullYear()} <strong>Elite Integrity Property Solutions</strong>. All rights reserved.
            </p>
            <p class="footer-disclaimer">
              We are a real estate solutions company. We are not a licensed real estate brokerage and do not provide legal or financial advice.
              By submitting your information, you consent to be contacted by Elite Integrity Property Solutions.
              SMS consent is not a condition of purchase. Message frequency varies.
              Reply <strong>STOP</strong> to opt out. Reply <strong>HELP</strong> for help.
            </p>
          </div>
          <div class="footer-legal-links">
            <a href="/privacy.html">Privacy Policy</a>
            <span class="footer-legal-sep">·</span>
            <a href="/terms.html">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  `;
}
