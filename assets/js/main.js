(() => {
  'use strict';

  const toolbar = document.querySelector('.publication-toolbar');
  const buttons = Array.from(document.querySelectorAll('[data-filter]'));
  const publications = Array.from(document.querySelectorAll('.publication-card'));
  const status = document.querySelector('#publication-status');

  if (toolbar && buttons.length && publications.length) {
    const filterPublications = (category) => {
      let visible = 0;
      publications.forEach((paper) => {
        const matches = category === 'all' || paper.dataset.category === category;
        paper.hidden = !matches;
        if (matches) visible += 1;
      });
      buttons.forEach((button) => {
        const active = button.dataset.filter === category;
        button.classList.toggle('is-active', active);
        button.setAttribute('aria-pressed', String(active));
      });
      const label = buttons.find((button) => button.dataset.filter === category);
      if (status) {
        status.textContent = `Showing ${visible} ${visible === 1 ? 'publication' : 'publications'}${category === 'all' ? '' : ` in ${label.textContent.trim()}`}.`;
      }
    };

    buttons.forEach((button) => {
      button.addEventListener('click', () => filterPublications(button.dataset.filter));
    });
    document.querySelectorAll('[data-research-filter]').forEach((link) => {
      link.addEventListener('click', (event) => {
        // Preserve browser behavior for opening the link in another tab.
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        const category = link.dataset.researchFilter;
        filterPublications(category);
        // Keep keyboard focus on the selected filter after the section jump.
        if (window.location.hash !== '#publications') {
          window.history.pushState(null, '', '#publications');
        }
        document.querySelector('#publications').scrollIntoView({ block: 'start' });
        buttons.find((button) => button.dataset.filter === category)?.focus({ preventScroll: true });
      });
    });
    toolbar.hidden = false;
  }

  const navLinks = Array.from(document.querySelectorAll('.site-nav a[href^="#"]'));
  if ('IntersectionObserver' in window) {
    const sections = navLinks.map((link) => document.querySelector(link.getAttribute('href'))).filter(Boolean);
    const visibleSections = new Set();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) visibleSections.add(entry.target.id);
        else visibleSections.delete(entry.target.id);
      });
      const current = sections.find((section) => visibleSections.has(section.id));
      navLinks.forEach((link) => {
        if (current && link.getAttribute('href') === `#${current.id}`) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }, { rootMargin: '-15% 0px -45% 0px', threshold: 0 });
    sections.forEach((section) => observer.observe(section));
  }
})();
