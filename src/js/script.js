// ========== DOM Ready ==========
document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  initTypingAnimation();
  initScrollReveal();
  initNavbarScroll();
  initMobileMenu();
  initSmoothScroll();
  initCounterAnimation();
  initSkillBars();
  initActiveNavHighlight();
});

// ========== Floating Particles ==========
function initParticles() {
  const container = document.querySelector('.particles');
  if (!container) return;

  for (let i = 0; i < 30; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    particle.style.left = Math.random() * 100 + '%';
    particle.style.width = particle.style.height = (Math.random() * 6 + 2) + 'px';
    particle.style.animationDuration = (Math.random() * 8 + 6) + 's';
    particle.style.animationDelay = (Math.random() * 10) + 's';
    container.appendChild(particle);
  }
}

// ========== Typing Animation ==========
function initTypingAnimation() {
  const el = document.getElementById('typing-text');
  if (!el) return;

  const texts = [
    'Freelance Web Developer',
    'Frontend Enthusiast',
    'UI/UX Designer',
    'Problem Solver'
  ];
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const currentText = texts[textIndex];

    if (isDeleting) {
      el.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
    } else {
      el.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
    }

    let speed = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === currentText.length) {
      speed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      speed = 500;
    }

    setTimeout(type, speed);
  }

  type();
}

// ========== Scroll Reveal ==========
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

  reveals.forEach(el => observer.observe(el));
}

// ========== Navbar Scroll Effect ==========
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const navLinks = navbar.querySelectorAll('.nav-link');
  const logo = navbar.querySelector('.logo-text');
  const menuToggle = document.getElementById('menu-toggle');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      navbar.classList.add('navbar-scrolled');
      navLinks.forEach(l => {
        l.classList.remove('text-white');
        l.classList.add('text-gray-700');
      });
      if (logo) {
        logo.classList.remove('text-white');
        logo.classList.add('text-blue-700');
      }
      if (menuToggle) {
        menuToggle.classList.remove('text-white');
        menuToggle.classList.add('text-gray-700');
      }
    } else {
      navbar.classList.remove('navbar-scrolled');
      navLinks.forEach(l => {
        l.classList.remove('text-gray-700');
        l.classList.add('text-white');
      });
      if (logo) {
        logo.classList.remove('text-blue-700');
        logo.classList.add('text-white');
      }
      if (menuToggle) {
        menuToggle.classList.remove('text-gray-700');
        menuToggle.classList.add('text-white');
      }
    }
  });
}

// ========== Mobile Menu ==========
function initMobileMenu() {
  const toggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('mobile-menu');
  const closeBtn = document.getElementById('menu-close');

  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => menu.classList.add('open'));

  if (closeBtn) {
    closeBtn.addEventListener('click', () => menu.classList.remove('open'));
  }

  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => menu.classList.remove('open'));
  });
}

// ========== Smooth Scroll ==========
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
}

// ========== Counter Animation ==========
function initCounterAnimation() {
  const counters = document.querySelectorAll('.stat-number');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.animated) {
        entry.target.dataset.animated = 'true';
        animateCounter(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}

function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const suffix = el.dataset.suffix || '';
  const duration = 2000;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target) + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

// ========== Skill Bars ==========
function initSkillBars() {
  const bars = document.querySelectorAll('.skill-bar-fill');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const width = entry.target.dataset.width;
        entry.target.style.width = width;
        entry.target.classList.add('animate');
      }
    });
  }, { threshold: 0.3 });

  bars.forEach(bar => observer.observe(bar));
}

// ========== Active Nav Highlight ==========
function initActiveNavHighlight() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - 120;
      if (window.scrollY >= top) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  });
}

// ========== Contact Form Handler ==========
function handleSubmit(e) {
  e.preventDefault();

  const form = e.target;
  const btn = form.querySelector('button[type="submit"]');
  const originalText = btn.innerHTML;

  // Get form values
  const nama = form.querySelector('input[placeholder="Nama lengkap Anda"]').value;
  const email = form.querySelector('input[type="email"]').value;
  const subjek = form.querySelector('input[placeholder="Subjek pesan"]').value;
  const pesan = form.querySelector('textarea').value;

  // Build mailto link
  const subject = encodeURIComponent(subjek);
  const body = encodeURIComponent(
    `Halo Muhammad Rais,\n\n${pesan}\n\n---\nDari: ${nama}\nEmail: ${email}`
  );
  const mailtoLink = `mailto:raissick@gmail.com?subject=${subject}&body=${body}`;

  // Show loading animation
  btn.innerHTML = `
    <svg class="animate-spin h-5 w-5 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
    </svg>
  `;
  btn.disabled = true;

  // Open email client
  window.location.href = mailtoLink;

  setTimeout(() => {
    btn.innerHTML = '✓ Email Client Terbuka!';
    btn.classList.remove('bg-blue-600', 'hover:bg-blue-700');
    btn.classList.add('bg-green-500');

    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.disabled = false;
      btn.classList.remove('bg-green-500');
      btn.classList.add('bg-blue-600', 'hover:bg-blue-700');
      form.reset();
    }, 2500);
  }, 1000);
}
