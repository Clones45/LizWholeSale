// main.js — Home page entry point
import './styles/reset.css';
import './styles/tokens.css';
import './styles/typography.css';
import './styles/animations.css';
import './styles/layout.css';
import './styles/components.css';
import './styles/home.css';

import { initNav }          from './components/nav.js';
import { initHero }         from './components/hero.js';
import { initStats }        from './components/stats.js';
import { initProcess }      from './components/process.js';
import { initServices }     from './components/services.js';
import { initTestimonials } from './components/testimonials.js';
import { initLeadForm }     from './components/lead-form.js';
import { initFooter }       from './components/footer.js';
import { injectSchema }     from './lib/schema.js';

document.addEventListener('DOMContentLoaded', () => {
  injectSchema();
  initFooter();
  initNav();
  initHero();
  initStats();
  initProcess();
  initServices();
  initTestimonials();
  initLeadForm();
});
