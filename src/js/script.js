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

  const logo = navbar.querySelector('.logo-text');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      navbar.classList.add('navbar-scrolled');
      if (logo) {
        logo.classList.remove('text-white');
        logo.classList.add('text-blue-400');
      }
    } else {
      navbar.classList.remove('navbar-scrolled');
      if (logo) {
        logo.classList.remove('text-blue-400');
        logo.classList.add('text-white');
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

// ========== Contact Form Handler (AJAX via FormSubmit.co) ==========
function handleSubmit(e) {
  e.preventDefault();

  const form = e.target;
  const btn = document.getElementById('submit-btn');
  const status = document.getElementById('form-status');
  const originalText = btn.innerHTML;

  // Show loading
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
  btn.disabled = true;
  status.classList.add('hidden');

  // Send via fetch to FormSubmit.co
  const formData = new FormData(form);

  fetch('https://formsubmit.co/ajax/raissick@gmail.com', {
    method: 'POST',
    body: formData
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        // Success
        btn.innerHTML = '<i class="fas fa-check"></i> Terkirim!';
        btn.classList.remove('bg-blue-500', 'hover:bg-blue-600');
        btn.classList.add('bg-green-500');
        status.textContent = '✅ Pesan berhasil dikirim ke Gmail!';
        status.className = 'mt-4 text-center text-sm text-green-400';
        form.reset();
      } else {
        throw new Error('Gagal mengirim');
      }
    })
    .catch(error => {
      btn.innerHTML = '<i class="fas fa-times"></i> Gagal!';
      btn.classList.remove('bg-blue-500', 'hover:bg-blue-600');
      btn.classList.add('bg-red-500');
      status.textContent = '❌ Gagal mengirim. Coba lagi atau hubungi via WhatsApp.';
      status.className = 'mt-4 text-center text-sm text-red-400';
    })
    .finally(() => {
      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.disabled = false;
        btn.classList.remove('bg-green-500', 'bg-red-500');
        btn.classList.add('bg-blue-500', 'hover:bg-blue-600');
      }, 3000);
    });
}
