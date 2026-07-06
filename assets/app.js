const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');

function scrollToHash(hash, behavior = 'smooth') {
  const target = document.querySelector(hash);
  const topbar = document.querySelector('.topbar');
  if (!target) return false;

  const offset = (topbar?.offsetHeight || 0) + 18;
  const top = target.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior });
  history.replaceState(null, '', hash);
  return true;
}

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });

  nav.addEventListener('click', (event) => {
    if (event.target.tagName === 'A') {
      const hash = event.target.getAttribute('href');
      if (hash?.startsWith('#') && scrollToHash(hash)) {
        event.preventDefault();
      }
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
}

if (window.location.hash) {
  window.addEventListener('load', () => {
    setTimeout(() => scrollToHash(window.location.hash, 'auto'), 80);
  });
}

document.querySelector('[data-print]')?.addEventListener('click', () => window.print());
