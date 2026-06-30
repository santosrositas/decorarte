// Carousel
(function() {
  const track = document.getElementById('carouselTrack');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const dotsWrap = document.getElementById('carouselDots');
  if (!track) return;

  const cards = track.querySelectorAll('.carousel-card');
  let current = 0;
  const visible = () => window.innerWidth < 640 ? 1 : window.innerWidth < 960 ? 2 : 4;

  cards.forEach((_, i) => {
    const d = document.createElement('button');
    d.className = 'carousel-dot' + (i === 0 ? ' active' : '');
    d.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(d);
  });

  function goTo(idx) {
    const v = visible();
    const max = Math.max(0, cards.length - v);
    current = Math.min(Math.max(idx, 0), max);
    const gap = 16;
    const w = cards[0].offsetWidth + gap;
    track.style.transform = `translateX(-${current * w}px)`;
    dotsWrap.querySelectorAll('.carousel-dot').forEach((d, i) => d.classList.toggle('active', i === current));
    prevBtn.disabled = current === 0;
    nextBtn.disabled = current >= max;
    // Hide arrows on desktop (all cards visible)
    const hide = v >= cards.length;
    prevBtn.style.display = hide ? 'none' : '';
    nextBtn.style.display = hide ? 'none' : '';
    dotsWrap.style.display = hide ? 'none' : '';
  }

  prevBtn.addEventListener('click', () => goTo(current - 1));
  nextBtn.addEventListener('click', () => goTo(current + 1));
  window.addEventListener('resize', () => goTo(current));

  // Touch/swipe support
  let touchStartX = 0;
  track.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) goTo(diff > 0 ? current + 1 : current - 1);
  }, { passive: true });

  goTo(0);
})();

// Lightbox
(function() {
  const lb = document.getElementById('lightbox');
  const img = document.getElementById('lightboxImg');
  const close = document.getElementById('lightboxClose');
  const backdrop = document.getElementById('lightboxBackdrop');

  function open(src, alt) { img.src = src; img.alt = alt; lb.classList.add('open'); document.body.style.overflow = 'hidden'; }
  function closeLb() { lb.classList.remove('open'); document.body.style.overflow = ''; }

  document.querySelectorAll('.card__img-wrap img, .carousel-card__img img').forEach(el => {
    el.addEventListener('click', () => open(el.src, el.alt));
  });

  close.addEventListener('click', closeLb);
  backdrop.addEventListener('click', closeLb);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLb(); });
})();

// Mobile nav toggle
const toggle = document.getElementById('navToggle');
const nav = document.getElementById('nav');
toggle?.addEventListener('click', () => nav.classList.toggle('open'));

// Close nav on link click
nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));

// Scroll reveal
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
}, { threshold: 0.1 });

document.querySelectorAll('.card, .contact__item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity .5s ease, transform .5s ease';
  observer.observe(el);
});

document.addEventListener('DOMContentLoaded', () => {
  const style = document.createElement('style');
  style.textContent = '.visible { opacity: 1 !important; transform: none !important; }';
  document.head.appendChild(style);
});
