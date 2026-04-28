// Carrillo Tech Solutions — main.js
// Canvas particle network, scroll behaviors, and form handling

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

// ── DISPATCH URL + FRONTMATTER HELPERS ──────────────────────
function getPostPath(slug) {
  return `/_posts/${encodeURIComponent(slug)}.md`;
}

function getDispatchUrl(slug) {
  return `/dispatch.html?post=${encodeURIComponent(slug)}`;
}

function cleanFrontmatterValue(value = '') {
  return value.replace(/^['"]|['"]$/g, '').trim();
}

function parseMarkdownDispatch(markdown, fallbackSlug = '') {
  const fmMatch = markdown.match(/^---\s*\n([\s\S]*?)\n---/);
  const data = {};

  if (fmMatch && fmMatch[1]) {
    let currentKey = null;
    fmMatch[1].split(/\r?\n/).forEach(line => {
      const keyMatch = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
      if (keyMatch) {
        currentKey = keyMatch[1].toLowerCase();
        data[currentKey] = cleanFrontmatterValue(keyMatch[2] || '');
      } else if (currentKey && /^\s+/.test(line)) {
        data[currentKey] = `${data[currentKey]} ${cleanFrontmatterValue(line)}`.trim();
      }
    });
  }

  const rawDateParts = fallbackSlug.split('-').slice(0, 3);
  const fallbackDate = rawDateParts.length === 3 ? `${rawDateParts[1]}/${rawDateParts[2]}/${rawDateParts[0]}` : 'UNKNOWN';
  let formattedDate = fallbackDate;

  if (data.date) {
    const dateParts = data.date.split('T')[0].split('-');
    if (dateParts.length >= 3) formattedDate = `${dateParts[1]}/${dateParts[2]}/${dateParts[0]}`;
  }

  const fallbackTitle = fallbackSlug.split('-').slice(3).join(' ').replace(/#U2014/gi, '—').toUpperCase() || 'NEW DISPATCH';
  const content = markdown.replace(/^---[\s\S]*?---/, '').trim();

  return {
    title: data.title || fallbackTitle,
    date: formattedDate,
    category: data.category || 'Intelligence',
    excerpt: data.excerpt || '',
    content
  };
}

// ── INTEL HUB: MODAL & MARKDOWN RENDERER ──────────────────────
function openDispatch(slug, updateUrl = true) {
  const modal = document.getElementById('dispatchModal');
  const body = document.getElementById('dispatchBody');
  if (!modal || !body || !slug) return;

  if (updateUrl) {
    window.history.pushState({ dispatch: slug }, '', `/?dispatch=${encodeURIComponent(slug)}`);
  }

  modal.classList.add('active');
  body.innerHTML = '<p style="text-align:center; color:#00F5D4;"><i class="fas fa-spinner fa-spin"></i> DECRYPTING DISPATCH...</p>';

  fetch(getPostPath(slug))
    .then(response => {
      if (!response.ok) throw new Error('File not found');
      return response.text();
    })
    .then(markdown => {
      const dispatch = parseMarkdownDispatch(markdown, slug);

      body.innerHTML = `
        <div style="margin-bottom: 25px; border-bottom: 1px solid #333; padding-bottom: 20px;">
          <p style="color: #a0a0a0; font-size: 0.8rem; text-transform: uppercase; margin: 0 0 5px 0;">Title</p>
          <h2 style="color: #00f0ff; margin: 0 0 20px 0; font-family: 'Orbitron', sans-serif;">${dispatch.title}</h2>
          
          <div style="display: flex; gap: 30px; flex-wrap: wrap; margin-bottom: 20px;">
            <div>
              <p style="color: #a0a0a0; font-size: 0.8rem; text-transform: uppercase; margin: 0 0 5px 0;">Publish Date</p>
              <p style="color: #e0e0e0; margin: 0; font-family: 'Share Tech Mono', monospace;">${dispatch.date}</p>
            </div>
            <div>
              <p style="color: #a0a0a0; font-size: 0.8rem; text-transform: uppercase; margin: 0 0 5px 0;">Category</p>
              <p style="color: #b026ff; margin: 0; font-weight: bold;">${dispatch.category}</p>
            </div>
          </div>

          ${dispatch.excerpt ? `
          <div style="margin-bottom: 20px;">
            <p style="color: #a0a0a0; font-size: 0.8rem; text-transform: uppercase; margin: 0 0 5px 0;">Excerpt</p>
            <p style="color: #e0e0e0; font-style: italic; margin: 0;">${dispatch.excerpt}</p>
          </div>` : ''}

          <a href="${getDispatchUrl(slug)}" class="blog-read" style="width: fit-content;">
            Open Shareable Page <i class="fas fa-arrow-up-right-from-square"></i>
          </a>
        </div>
        
        <div>
          <p style="color: #a0a0a0; font-size: 0.8rem; text-transform: uppercase; margin: 0 0 10px 0;">Body</p>
          <div class="dispatch-markdown-content" style="color: #e0e0e0;">
            ${marked.parse(dispatch.content)}
          </div>
        </div>
      `;
    })
    .catch(err => {
      body.innerHTML = `<h3 style="color:#ef4444;">ERROR: 404 DATA NOT FOUND</h3><p>The requested file could not be decrypted.</p>`;
    });
}

function closeDispatch() {
  const modal = document.getElementById('dispatchModal');
  if (modal) modal.classList.remove('active');

  const params = new URLSearchParams(window.location.search);
  if (params.has('dispatch')) {
    window.history.pushState({}, document.title, '/#intel');
  }
}

// Catch the Cloudflare redirect and open the modal safely
window.addEventListener('load', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const dispatch = urlParams.get('dispatch');

  if (dispatch) {
    setTimeout(() => openDispatch(dispatch, false), 300); // Keep the shareable URL visible
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
let isExpanded = false; // Memory switch to track if it's open or closed

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

        // Render the initial batch
        blogGrid.innerHTML = ''; 
        renderPosts(allPosts.slice(0, POSTS_PER_PAGE));

        // The Smart Toggle Logic
        loadMoreBtn.addEventListener('click', () => {
            blogGrid.innerHTML = ''; // Wipe the current grid clean
            
            if (!isExpanded) {
                // ACTION: Expand the grid
                renderPosts(allPosts); // Render all files
                loadMoreBtn.innerHTML = '<i class="fas fa-minus-square"></i> MINIMIZE FIELD DISPATCHES';
                isExpanded = true;
            } else {
                // ACTION: Minimize the grid
                renderPosts(allPosts.slice(0, POSTS_PER_PAGE)); // Render just the first 3 again
                loadMoreBtn.innerHTML = '<i class="fas fa-plus-square"></i> EXTEND FIELD DISPATCHES';
                isExpanded = false;
                
                // Smoothly scroll the user back to the top of the Intelligence Hub
                document.getElementById('intel').scrollIntoView({ behavior: 'smooth' });
            }
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

        const displayTitle = fileName.split('-').slice(3).join(' ').replace(/#U2014/gi, '—').toUpperCase() || "NEW DISPATCH";

        const card = document.createElement('article');
        card.className = 'blog-card';
        card.innerHTML = `
            <div class="blog-tag" id="tag-${fileName}">Intelligence</div>
            <h4 id="title-${fileName}">${displayTitle}</h4>
            <p id="desc-${fileName}">Decrypting secure data...</p>
            <div class="blog-meta">
                <span><i class="fas fa-calendar"></i> ${displayDate}</span>
                <a href="${getDispatchUrl(fileName)}" class="blog-read">
                    Read Dispatch <i class="fas fa-arrow-right"></i>
                </a>
            </div>
        `;
        blogGrid.appendChild(card);

        // Fetch the file to grab the exact CMS Excerpt and Category
        fetch(`/_posts/${encodeURIComponent(post.name)}`)
            .then(res => res.text())
            .then(text => {
                const dispatch = parseMarkdownDispatch(text, fileName);
                const excerpt = dispatch.excerpt || "Field dispatch retrieved from secure storage.";
                const category = dispatch.category || "Intelligence";

                document.getElementById(`title-${fileName}`).textContent = dispatch.title;
                document.getElementById(`desc-${fileName}`).textContent = excerpt;
                document.getElementById(`tag-${fileName}`).textContent = category;
            })
            .catch(err => console.error("Decryption failed", err));
    });
}

document.addEventListener('DOMContentLoaded', loadAutoDispatches);
