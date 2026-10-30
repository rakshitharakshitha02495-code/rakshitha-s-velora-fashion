const header = document.querySelector('.site-header');
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

// Sticky header colour change
const onScroll = () => header.classList.toggle('solid', window.scrollY > 60);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// Mobile menu
if (menuBtn) {
  menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('open');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    menuBtn.classList.remove('open');
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  }));
}

// Reveal on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Toast
function toast(msg) {
  let t = document.querySelector('.toast');
  if (!t) { t = document.createElement('div'); t.className = 'toast'; document.body.appendChild(t); }
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2400);
}

// Shop filters
document.querySelectorAll('.filter').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.filter;
    document.querySelectorAll('.product').forEach(p => {
      p.classList.toggle('hide', f !== 'all' && p.dataset.cat !== f);
    });
  });
});

// Quick add
document.querySelectorAll('.quick').forEach(b => b.addEventListener('click', () => toast('Added to your wishlist ♡')));

// Newsletter
document.querySelectorAll('.news-form').forEach(f => f.addEventListener('submit', e => {
  e.preventDefault();
  const input = f.querySelector('input');
  if (input.value.includes('@')) { toast('Thank you for subscribing'); f.reset(); }
  else toast('Please enter a valid email');
}));

// Contact form validation
const cf = document.getElementById('contact-form');
if (cf) {
  cf.addEventListener('submit', e => {
    e.preventDefault();
    let ok = true;
    cf.querySelectorAll('[required]').forEach(inp => {
      const bad = !inp.value.trim() || (inp.type === 'email' && !/^\S+@\S+\.\S+$/.test(inp.value));
      inp.closest('.field').classList.toggle('invalid', bad);
      if (bad) ok = false;
    });
    if (ok) {
      document.querySelector('.form-msg').classList.add('show');
      cf.reset();
    }
  });
}
