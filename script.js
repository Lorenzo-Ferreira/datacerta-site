/* Data Certa — script.js */

/* ── NAV: scroll shadow ── */
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  });
}

/* ── HAMBURGER MENU ── */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });
  // Close on link click
  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => mobileMenu.classList.remove('open'));
  });
}

/* ── REVEAL ON SCROLL ── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger sibling reveals
      const siblings = entry.target.parentElement.querySelectorAll('.reveal:not(.visible)');
      let delay = 0;
      siblings.forEach(el => {
        if (el === entry.target || el.getBoundingClientRect().top < window.innerHeight + 40) {
          setTimeout(() => el.classList.add('visible'), delay);
          delay += 80;
        }
      });
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ── SMOOTH ACTIVE NAV LINKS ── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

if (sections.length && navLinks.length) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.style.color = '';
          if (link.getAttribute('href') === '#' + id) {
            link.style.color = 'var(--red)';
          }
        });
      }
    });
  }, { threshold: 0.4 });
  sections.forEach(s => sectionObserver.observe(s));
}

/* ── COUNTER ANIMATION ── */
function animateCounter(el, target, duration = 1800) {
  const start = performance.now();
  const isDecimal = target % 1 !== 0;
  const update = (time) => {
    const progress = Math.min((time - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = target * eased;
    el.textContent = isDecimal ? current.toFixed(1) : Math.round(current).toLocaleString('pt-BR');
    if (progress < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

/* Trigger counters when stat numbers enter viewport */
document.querySelectorAll('.stat-num, .data-card-num, .mf-num').forEach(el => {
  const raw = el.textContent.replace(/[^0-9.,]/g, '').replace(',', '.');
  const num = parseFloat(raw);
  if (!num) return;
  const suffix = el.textContent.replace(/[0-9.,]/g, '').trim();
  const original = el.textContent;

  const obs = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      animateCounter(el, num);
      obs.disconnect();
    }
  }, { threshold: 0.5 });
  obs.observe(el);
});

/* ── TECH PAGE: code highlight effect ── */
document.querySelectorAll('code').forEach(el => {
  el.addEventListener('click', () => {
    navigator.clipboard?.writeText(el.textContent).then(() => {
      const orig = el.textContent;
      el.textContent = 'Copiado!';
      setTimeout(() => el.textContent = orig, 1200);
    });
  });
  el.title = 'Clique para copiar';
  el.style.cursor = 'pointer';
});

/* ── SCROLL TO TOP (appears after 600px) ── */
const scrollBtn = document.createElement('button');
scrollBtn.innerHTML = '↑';
scrollBtn.setAttribute('aria-label', 'Voltar ao topo');
scrollBtn.style.cssText = `
  position: fixed; bottom: 2rem; right: 2rem; z-index: 99;
  width: 44px; height: 44px; border-radius: 50%;
  background: var(--red); color: #fff; border: none;
  font-size: 1.1rem; font-weight: 700; cursor: pointer;
  opacity: 0; pointer-events: none;
  transition: opacity .3s, transform .2s;
  box-shadow: 0 4px 16px rgba(192,57,43,.35);
  font-family: sans-serif;
`;
document.body.appendChild(scrollBtn);
scrollBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
window.addEventListener('scroll', () => {
  const show = window.scrollY > 600;
  scrollBtn.style.opacity = show ? '1' : '0';
  scrollBtn.style.pointerEvents = show ? 'auto' : 'none';
});
scrollBtn.addEventListener('mouseenter', () => scrollBtn.style.transform = 'scale(1.1)');
scrollBtn.addEventListener('mouseleave', () => scrollBtn.style.transform = 'scale(1)');
