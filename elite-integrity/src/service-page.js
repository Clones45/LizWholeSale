// service-page.js — Shared entry point for all 6 service landing pages
import './styles/reset.css';
import './styles/tokens.css';
import './styles/typography.css';
import './styles/animations.css';
import './styles/layout.css';
import './styles/components.css';
import './styles/home.css';

import { initNav }    from './components/nav.js';
import { initFooter } from './components/footer.js';

document.addEventListener('DOMContentLoaded', () => {
  initFooter();
  initNav();
});
