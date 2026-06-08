/* ================================
   NOVA Creative Studio — script.js
   ================================ */

/* ---------- Custom Cursor ---------- */
const cursor    = document.getElementById('cursor');
const cursorRing = document.getElementById('cursor-ring');

let mouseX = 0, mouseY = 0;
let ringX  = 0, ringY  = 0;

// Move dot cursor instantly
document.addEventListener('mousemove', function (e) {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
});

// Animate ring cursor with lag for smooth trailing effect
function animateRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  cursorRing.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
  requestAnimationFrame(animateRing);
}
animateRing();


/* ---------- Scroll Reveal ---------- */
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -60px 0px'
});

revealElements.forEach(function (el) {
  revealObserver.observe(el);
});


/* ---------- Counter Animation ---------- */
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const suffix = target >= 100 ? '+' : '';
  let current = 0;
  const step   = target / 60;

  function update() {
    current = Math.min(current + step, target);
    el.textContent = Math.floor(current) + suffix;
    if (current < target) {
      requestAnimationFrame(update);
    } else {
      el.textContent = target + suffix;
    }
  }
  update();
}

const counterObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-num[data-target]').forEach(function (el) {
  counterObserver.observe(el);
});


/* ---------- Navbar Scroll Background ---------- */
const nav = document.querySelector('nav');

window.addEventListener('scroll', function () {
  if (window.scrollY > 60) {
    nav.style.background = 'rgba(10, 10, 10, 0.95)';
  } else {
    nav.style.background = 'linear-gradient(to bottom, rgba(10,10,10,0.9) 0%, transparent 100%)';
  }
});


/* ---------- Contact Form Submit ---------- */
const submitBtn = document.getElementById('submitBtn');

submitBtn.addEventListener('click', function () {
  const inputs    = document.querySelectorAll('.form-field input, .form-field textarea, .form-field select');
  const nameInput = document.querySelector('.form-field input[type="text"]');

  // Basic validation: check if name is filled
  if (nameInput && nameInput.value.trim() === '') {
    nameInput.style.borderColor = '#ff6b35';
    nameInput.focus();
    setTimeout(function () {
      nameInput.style.borderColor = '';
    }, 2000);
    return;
  }

  // Success state
  submitBtn.textContent       = '✓ Message Sent!';
  submitBtn.style.background  = 'var(--accent)';
  submitBtn.style.borderColor = 'var(--accent)';
  submitBtn.style.color       = '#0a0a0a';

  // Clear all fields
  inputs.forEach(function (el) {
    el.value = '';
  });

  // Reset button after 3 seconds
  setTimeout(function () {
    submitBtn.textContent       = 'Send Message →';
    submitBtn.style.background  = '';
    submitBtn.style.borderColor = '';
    submitBtn.style.color       = '';
  }, 3000);
});


/* ---------- Smooth Scroll for Nav Links ---------- */
document.querySelectorAll('a[href^="#"]').forEach(function (link) {
  link.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const targetEl = document.querySelector(targetId);
    if (targetEl) {
      e.preventDefault();
      targetEl.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
