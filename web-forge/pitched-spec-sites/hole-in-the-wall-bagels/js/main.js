// Hole In The Wall Bagels — small, restrained interactions

// Nav toggle (mobile)
(() => {
  const nav = document.querySelector('.nav');
  const toggle = document.querySelector('.nav__toggle');
  if (!nav || !toggle) return;
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
})();

// Reveal on scroll — only engage hiding state if IntersectionObserver works
(() => {
  const items = document.querySelectorAll('.reveal');
  if (items.length === 0) return;

  if (!('IntersectionObserver' in window)) return; // stay visible

  document.documentElement.classList.add('js-reveal');

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  items.forEach(el => io.observe(el));
})();

// Live open/closed pill
(() => {
  const pill = document.querySelector('[data-live-status]');
  if (!pill) return;

  // Open Thu-Sun, 7am - 1pm (America/New_York is close enough for display)
  const now = new Date();
  const day = now.getDay(); // 0 Sun, 4 Thu, 5 Fri, 6 Sat
  const hour = now.getHours() + now.getMinutes() / 60;
  const isServiceDay = day === 0 || day === 4 || day === 5 || day === 6;
  const isOpen = isServiceDay && hour >= 7 && hour < 13;

  if (isOpen) {
    pill.innerHTML = '<span class="dot-open" aria-hidden="true"></span> Open now · until 1pm';
  } else {
    pill.innerHTML = 'Next service — Thursday 7am';
  }
})();
