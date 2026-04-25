/* ═══════════════════════════════════════════════════
   CARRILLO TECH SOLUTIONS — main.js
   Canvas particle network + scroll behaviors + form
   ═══════════════════════════════════════════════════ */

// ── Canvas Particle Network ──────────────────────────
(function initCanvas() {
  const canvas = document.getElementById('bgCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H, particles = [], animId;
  const COUNT = 60;
  const PURPLE = '155, 93, 229';
  const CYAN   = '0, 245, 212';

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function Particle() {
    this.x  = Math.random() * W;
    this.y  = Math.random() * H;
    this.vx = (Math.random() - 0.5) * 0.35;
    this.vy = (Math.random() - 0.5) * 0.35;
    this.r  = Math.random() * 1.8 + 0.5;
    this.color = Math.random() > 0.5 ? PURPLE : CYAN;
  }

  function init() {
    particles = [];
    for (let i = 0; i < COUNT; i++) particles.push(new Particle());
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i], b = particles[j];
        const dist = Math.hypot(a.x - b.x, a.y - b.y);
        if (dist < 160) {
          const alpha = (1 - dist / 160) * 0.25;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(${a.color}, ${alpha})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }

    // Draw particles
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.color}, 0.7)`;
      ctx.fill();

      // Glow
      const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
      g.addColorStop(0, `rgba(${p.color}, 0.15)`);
      g.addColorStop(1, 'transparent');
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
      ctx.fillStyle = g;
      ctx.fill();

      // Move
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;
    });

    animId = requestAnimationFrame(draw);
  }

  window.addEventListener('resize', () => { resize(); init(); });
  resize();
  init();
  draw();
})();

// ── Navigation Scroll Behavior ───────────────────────
(function initNav() {
  const nav    = document.getElementById('mainNav');
  const toggle = document.getElementById('navToggle');
  const links  = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  toggle.addEventListener('click', () => {
    links.classList.toggle('open');
    toggle.classList.toggle('active');
  });

  // Close on link click
  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      links.classList.remove('open');
      toggle.classList.remove('active');
    });
  });

  // Active link highlight
  const sections = document.querySelectorAll('section[id]');
  const navLinkEls = document.querySelectorAll('.nav-link');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navLinkEls.forEach(l => {
          l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id);
        });
      }
    });
  }, { threshold: 0.3, rootMargin: '-80px 0px 0px 0px' });
  sections.forEach(s => observer.observe(s));
})();

// ── Scroll Reveal ────────────────────────────────────
(function initReveal() {
  const revealEls = document.querySelectorAll(
    '.service-card, .portfolio-card, .blog-card, .cred-item, .architect-profile-card, .cred-panel, .creator-panel, .contact-info-item'
  );
  revealEls.forEach(el => el.classList.add('reveal'));

  const io = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 80);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  revealEls.forEach(el => io.observe(el));
})();

// ── Typed Terminal Cursor in Badge ───────────────────
(function initTerminal() {
  const badge = document.querySelector('.hero-badge span:last-child');
  if (!badge) return;
  const text = badge.textContent;
  badge.textContent = '';
  let i = 0;
  const cursor = document.createElement('span');
  cursor.textContent = '|';
  cursor.style.cssText = 'animation: blink 1s step-end infinite; color: var(--cyan);';
  badge.after(cursor);

  const interval = setInterval(() => {
    badge.textContent += text[i++];
    if (i >= text.length) clearInterval(interval);
  }, 50);
})();

// ── Contact Form Handler ─────────────────────────────
function handleFormSubmit(e) {
  e.preventDefault();

  const btn = document.getElementById('submitBtn');
  const msg = document.getElementById('formMsg');

  const name    = document.getElementById('contactName').value.trim();
  const contact = document.getElementById('contactVerify').value.trim();
  const mission = document.getElementById('missionType').value;
  const brief   = document.getElementById('missionBrief').value.trim();

  if (!name || !contact || !mission || !brief) {
    showMsg(msg, 'error', '⚠ ALL REQUIRED FIELDS MUST BE COMPLETED.');
    return;
  }

  // Simulate submission
  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Transmitting...';

  setTimeout(() => {
    btn.innerHTML = '<i class="fas fa-check"></i> Deployment Request Sent';
    btn.style.background = '#22c55e';
    btn.style.borderColor = '#22c55e';
    btn.style.boxShadow = '0 0 25px rgba(34, 197, 94, 0.4)';
    showMsg(msg, 'success', '✓ TICKET TRANSMITTED. RESPONSE WITHIN 24 HOURS.');

    // Reset after 5s
    setTimeout(() => {
      btn.disabled = false;
      btn.innerHTML = '<i class="fas fa-paper-plane"></i> Submit Deployment Request';
      btn.style.cssText = '';
      msg.style.display = 'none';
      document.getElementById('ticketForm').querySelectorAll('input, select, textarea').forEach(f => f.value = '');
    }, 5000);
  }, 1800);
}

function showMsg(el, type, text) {
  el.className = 'form-message ' + type;
  el.textContent = text;
  el.style.display = 'block';
}

// ── Glitch effect on hero headline on load ───────────
window.addEventListener('load', () => {
  const headline = document.querySelector('.hero-headline');
  if (!headline) return;
  headline.style.animation = 'fadeSlideUp 1s ease both';
});
// ── INTEL HUB: MODAL & MARKDOWN RENDERER ──────────────────────
function openDispatch(slug) {
  const modal = document.getElementById('dispatchModal');
  const body = document.getElementById('dispatchBody');
  modal.classList.add('active');
  body.innerHTML = '<p style="text-align:center; color:#00F5D4;"><i class="fas fa-spinner fa-spin"></i> DECRYPTING DISPATCH...</p>';

  // Fetch the raw text file from your _posts folder
  fetch(`/_posts/${slug}.md`)
    .then(response => {
      if (!response.ok) throw new Error('File not found');
      return response.text();
    })
    .then(markdown => {
      // Strip out the YAML frontmatter (the hidden config stuff at the top of the file)
      const content = markdown.replace(/^---[\s\S]*?---/, '');
      // Translate the Markdown to HTML
      body.innerHTML = marked.parse(content);
    })
    .catch(err => {
      body.innerHTML = `<h3 style="color:#ef4444;">ERROR: 404 DATA NOT FOUND</h3><p>The requested file could not be decrypted.</p>`;
    });
}

function closeDispatch() {
  document.getElementById('dispatchModal').classList.remove('active');
}

// Catch the Cloudflare redirect and open the modal safely
window.addEventListener('load', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const dispatch = urlParams.get('dispatch');

  if (dispatch) {
    window.history.replaceState({}, '', '/'); // Clean the URL instantly
    setTimeout(() => openDispatch(dispatch), 300); // Open the modal
  }
});
