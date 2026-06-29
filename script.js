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
  goTo(0);
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
