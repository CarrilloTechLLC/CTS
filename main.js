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

  fetch(`/_posts/${slug}.md`)
    .then(response => {
      if (!response.ok) throw new Error('File not found');
      return response.text();
    })
    .then(markdown => {
      // Extract the CMS Frontmatter
      const fmMatch = markdown.match(/^---\n([\s\S]*?)\n---/);
      let title = slug.split('-').slice(3).join(' ').toUpperCase();
      let date = slug.split('-').slice(0,3);
      let formattedDate = `${date[1]}/${date[2]}/${date[0]}`;
      let category = "Intelligence";
      let excerpt = "";

      if (fmMatch && fmMatch[1]) {
        const fmText = fmMatch[1];
        const titleMatch = fmText.match(/title:\s*(.+)/i);
        const dateMatch = fmText.match(/date:\s*(.+)/i);
        const catMatch = fmText.match(/category:\s*(.+)/i);
        const excerptMatch = fmText.match(/excerpt:\s*(.+)/i);

        if (titleMatch) title = titleMatch[1].replace(/^['"]|['"]$/g, '').trim();
        if (catMatch) category = catMatch[1].replace(/^['"]|['"]$/g, '').trim();
        if (excerptMatch) excerpt = excerptMatch[1].replace(/^['"]|['"]$/g, '').trim();
        if (dateMatch) {
            const rawDate = dateMatch[1].replace(/^['"]|['"]$/g, '').trim().split('T')[0].split('-');
            if (rawDate.length >= 3) formattedDate = `${rawDate[1]}/${rawDate[2]}/${rawDate[0]}`;
        }
      }

      // Get just the body text
      const content = markdown.replace(/^---[\s\S]*?---/, '');

      // Inject the structured layout
      body.innerHTML = `
        <div style="margin-bottom: 25px; border-bottom: 1px solid #333; padding-bottom: 20px;">
          <p style="color: #a0a0a0; font-size: 0.8rem; text-transform: uppercase; margin: 0 0 5px 0;">Title</p>
          <h2 style="color: #00f0ff; margin: 0 0 20px 0; font-family: 'Orbitron', sans-serif;">${title}</h2>
          
          <div style="display: flex; gap: 30px; margin-bottom: 20px;">
            <div>
              <p style="color: #a0a0a0; font-size: 0.8rem; text-transform: uppercase; margin: 0 0 5px 0;">Publish Date</p>
              <p style="color: #e0e0e0; margin: 0; font-family: 'Share Tech Mono', monospace;">${formattedDate}</p>
            </div>
            <div>
              <p style="color: #a0a0a0; font-size: 0.8rem; text-transform: uppercase; margin: 0 0 5px 0;">Category</p>
              <p style="color: #b026ff; margin: 0; font-weight: bold;">${category}</p>
            </div>
          </div>

          ${excerpt ? `
          <div style="margin-bottom: 20px;">
            <p style="color: #a0a0a0; font-size: 0.8rem; text-transform: uppercase; margin: 0 0 5px 0;">Excerpt</p>
            <p style="color: #e0e0e0; font-style: italic; margin: 0;">${excerpt}</p>
          </div>` : ''}
        </div>
        
        <div>
          <p style="color: #a0a0a0; font-size: 0.8rem; text-transform: uppercase; margin: 0 0 10px 0;">Body</p>
          <div class="dispatch-markdown-content" style="color: #e0e0e0;">
            ${marked.parse(content)}
          </div>
        </div>
      `;
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
// Intercept success signal and trigger custom HTML modal
document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  
  if (urlParams.get('status') === 'signal_received') {
    const modal = document.getElementById('dispatchModal');
    const modalBody = document.getElementById('dispatchBody');
    
    if (modal && modalBody) {
      // Inject the custom styled success message
      modalBody.innerHTML = `
        <h3 style="color: #b026ff; margin-bottom: 15px;">[ SIGNAL RECEIVED ]</h3>
        <p>Thank you for your submission.</p>
        <p>Carrillo Tech Solutions will review your deployment request and respond within <strong>24-48 hours</strong>.</p>
      `;
      
      // Force the modal to open
      modal.style.display = 'flex'; 
      modal.style.opacity = '1';
      modal.style.visibility = 'visible';
      modal.classList.add('active');

      // Wire a dedicated kill switch to the X button
      const closeBtn = modal.querySelector('.modal-close');
      if (closeBtn) {
        closeBtn.addEventListener('click', () => {
          modal.style.display = 'none';
          modal.style.opacity = '0';
          modal.style.visibility = 'hidden';
          modal.classList.remove('active');
        });
      }
    }
    
    // Clean the URL so the pop-up doesn't happen again on refresh
    window.history.replaceState({}, document.title, window.location.pathname);
  }
});



// ── DYNAMIC DISPATCH LOADER ──────────────────────
let allPosts = [];
const POSTS_PER_PAGE = 3;

async function loadAutoDispatches() {
    const blogGrid = document.getElementById('blogGrid');
    const expandContainer = document.getElementById('blogExpandContainer');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (!blogGrid) return;

    try {
        const response = await fetch('https://api.github.com/repos/CarrilloTechLLC/CTS/contents/_posts');
        const files = await response.json();
        
        allPosts = files.filter(f => f.name.endsWith('.md')).reverse();

        if (allPosts.length > POSTS_PER_PAGE) {
            expandContainer.style.display = 'block';
        }

        renderPosts(allPosts.slice(0, POSTS_PER_PAGE));

        loadMoreBtn.addEventListener('click', () => {
            renderPosts(allPosts.slice(POSTS_PER_PAGE)); 
            expandContainer.style.display = 'none'; 
        });

    } catch (error) {
        console.error("Auto-load failed.", error);
    }
}

function renderPosts(postsToRender) {
    const blogGrid = document.getElementById('blogGrid');
    
    postsToRender.forEach(post => {
        const fileName = post.name.replace('.md', '');
        
        // Format Date to MM/DD/YYYY
        const dateParts = fileName.split('-').slice(0, 3);
        let displayDate = "UNKNOWN";
        if (dateParts.length === 3) {
            displayDate = `${dateParts[1]}/${dateParts[2]}/${dateParts[0]}`;
        }

        const displayTitle = fileName.split('-').slice(3).join(' ').toUpperCase() || "NEW DISPATCH";

        const card = document.createElement('article');
        card.className = 'blog-card';
        card.innerHTML = `
            <div class="blog-tag" id="tag-${fileName}">Intelligence</div>
            <h4>${displayTitle}</h4>
            <p id="desc-${fileName}">Decrypting secure data...</p>
            <div class="blog-meta">
                <span><i class="fas fa-calendar"></i> ${displayDate}</span>
                <a href="javascript:void(0)" onclick="openDispatch('${fileName}')" class="blog-read">
                    Read Dispatch <i class="fas fa-arrow-right"></i>
                </a>
            </div>
        `;
        blogGrid.appendChild(card);

        // Fetch the file to grab the exact CMS Excerpt and Category
        fetch(`/_posts/${post.name}`)
            .then(res => res.text())
            .then(text => {
                let excerpt = "Field dispatch retrieved from secure storage.";
                let category = "Intelligence";

                // Grab Excerpt (Strictly from the CMS field)
                const excerptMatch = text.match(/excerpt:\s*(.+)/i);
                if (excerptMatch && excerptMatch[1]) {
                    excerpt = excerptMatch[1].replace(/^['"]|['"]$/g, '').trim();
                }

                // Grab Category to update the tag
                const catMatch = text.match(/category:\s*(.+)/i);
                if (catMatch && catMatch[1]) {
                    category = catMatch[1].replace(/^['"]|['"]$/g, '').trim();
                }

                document.getElementById(`desc-${fileName}`).textContent = excerpt;
                document.getElementById(`tag-${fileName}`).textContent = category;
            })
            .catch(err => console.error("Decryption failed", err));
    });
}

document.addEventListener('DOMContentLoaded', loadAutoDispatches);
