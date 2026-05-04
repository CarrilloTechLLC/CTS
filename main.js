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

  if (!nav || !toggle || !links) return;

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  toggle.addEventListener('click', () => {
    const isOpen = links.classList.toggle('open');
    toggle.classList.toggle('active', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Close on link click
  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      links.classList.remove('open');
      toggle.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Active link highlight for same-page anchors only.
  // Page links like /digital-media-integration/ keep their active class on standalone pages.
  const sections = document.querySelectorAll('section[id]');
  const navLinkEls = document.querySelectorAll('.nav-link');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navLinkEls.forEach(l => {
          const href = l.getAttribute('href') || '';
          if (href.startsWith('#')) {
            l.classList.toggle('active', href === '#' + e.target.id);
          }
        });
      }
    });
  }, { threshold: 0.3, rootMargin: '-80px 0px 0px 0px' });
  sections.forEach(s => observer.observe(s));
})();

// ── Scroll Reveal ────────────────────────────────────
(function initReveal() {
  const revealEls = document.querySelectorAll(
    '.service-card, .portfolio-card, .blog-card, .asset-card, .hardware-card, .guide-card, .cred-item, .architect-profile-card, .cred-panel, .creator-panel, .contact-info-item'
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

function normalizeMediaPath(value = '') {
  const mediaPath = cleanFrontmatterValue(String(value || ''));
  if (!mediaPath) return '';
  if (/^(https?:)?\/\//i.test(mediaPath) || mediaPath.startsWith('data:') || mediaPath.startsWith('/')) {
    return mediaPath;
  }
  return `/${mediaPath.replace(/^\.\//, '')}`;
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
    image: normalizeMediaPath(data.image || data.featured_image || ''),
    beatSource: cleanFrontmatterValue(data.beat_source || data.beat_file || data.beat || data.audio || ''),
    bpm: cleanFrontmatterValue(data.bpm || ''),
    musicalKey: cleanFrontmatterValue(data.musical_key || data.key || ''),
    genre: cleanFrontmatterValue(data.genre || ''),
    draft: /^true$/i.test(cleanFrontmatterValue(data.draft || 'false')),
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
  modal.setAttribute('aria-hidden', 'false');
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

          ${dispatch.image ? `
          <img class="dispatch-modal-image" src="${dispatch.image}" alt="Featured dispatch image" loading="lazy">` : ''}

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
  if (modal) {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
  }

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
      modal.setAttribute('aria-hidden', 'false');

      // Wire a dedicated kill switch to the X button
      const closeBtn = modal.querySelector('.modal-close');
      if (closeBtn) {
        closeBtn.addEventListener('click', () => {
          modal.style.display = 'none';
          modal.style.opacity = '0';
          modal.style.visibility = 'hidden';
          modal.classList.remove('active');
          modal.setAttribute('aria-hidden', 'true');
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
        const markdownFiles = files.filter(f => f.name.endsWith('.md')).reverse();

        const indexedPosts = await Promise.all(markdownFiles.map(async file => {
            const slug = file.name.replace('.md', '');
            try {
                const res = await fetch(getPostPath(slug));
                if (!res.ok) return null;
                return { ...file, dispatch: parseMarkdownDispatch(await res.text(), slug) };
            } catch {
                return file;
            }
        }));

        allPosts = indexedPosts
            .filter(Boolean)
            .filter(post => {
                const category = String(post.dispatch?.category || '').trim().toLowerCase();
                return category !== 'creative archive' && !post.dispatch?.draft;
            });

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
            <div class="blog-card-image" id="image-${fileName}" hidden></div>
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

        const applyDispatch = (dispatch) => {
            const excerpt = dispatch.excerpt || "Field dispatch retrieved from secure storage.";
            const category = dispatch.category || "Intelligence";

            document.getElementById(`title-${fileName}`).textContent = dispatch.title;
            document.getElementById(`desc-${fileName}`).textContent = excerpt;
            document.getElementById(`tag-${fileName}`).textContent = category;

            const imageSlot = document.getElementById(`image-${fileName}`);
            if (imageSlot && dispatch.image) {
                const img = document.createElement('img');
                img.src = dispatch.image;
                img.alt = `${dispatch.title} featured image`;
                img.loading = 'lazy';
                imageSlot.replaceChildren(img);
                imageSlot.hidden = false;
            }
        };

        if (post.dispatch) {
            applyDispatch(post.dispatch);
        } else {
            fetch(`/_posts/${encodeURIComponent(post.name)}`)
                .then(res => res.text())
                .then(text => applyDispatch(parseMarkdownDispatch(text, fileName)))
                .catch(err => console.error("Decryption failed", err));
        }
    });
}

document.addEventListener('DOMContentLoaded', loadAutoDispatches);


// ── CMS EVIDENCE SECTIONS: MEDIA, HARDWARE, SERVICE GUIDES ──────────────────────
const CMS_COLLECTION_FALLBACKS = {
  '_media_assets': ['2026-05-04-cleveland-fivem-visual-asset-management.md'],
  '_hardware_configurations': ['2026-05-04-i5-9400f-gtx-1650-super-workstation-layout.md'],
  '_service_guides': ['2026-05-04-basic-it-support-screenshot-guide.md']
};

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function formatCmsDate(value = '', fallbackSlug = '') {
  const raw = cleanFrontmatterValue(String(value || '')).split('T')[0];
  const parts = raw ? raw.split('-') : fallbackSlug.split('-').slice(0, 3);
  if (parts.length >= 3) return `${parts[1]}/${parts[2]}/${parts[0]}`;
  return 'CMS ENTRY';
}

function parseCmsEvidenceEntry(markdown, fallbackSlug = '') {
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

  const content = markdown.replace(/^---[\s\S]*?---/, '').trim();
  const fallbackTitle = fallbackSlug.split('-').slice(3).join(' ').replace(/-/g, ' ') || 'CMS Evidence Entry';

  return {
    title: data.title || fallbackTitle,
    date: formatCmsDate(data.date, fallbackSlug),
    project: data.project || '',
    assetType: data.asset_type || data.category || '',
    hardwareType: data.hardware_type || '',
    guideType: data.guide_type || '',
    skillArea: data.skill_area || '',
    image: normalizeMediaPath(data.image || data.featured_image || ''),
    videoUrl: cleanFrontmatterValue(data.video_url || data.video || ''),
    altText: data.alt_text || '',
    caption: data.caption || '',
    purpose: data.purpose || '',
    specs: data.specs || '',
    organizationNote: data.organization_note || '',
    endUserBenefit: data.end_user_benefit || '',
    summary: data.summary || data.excerpt || '',
    avMethod: data.av_method || '',
    draft: /^true$/i.test(cleanFrontmatterValue(data.draft || 'false')),
    content
  };
}

async function fetchCmsEvidenceCollection(folder) {
  let files = [];

  try {
    const response = await fetch(`https://api.github.com/repos/CarrilloTechLLC/CTS/contents/${folder}`);
    if (!response.ok) throw new Error(`GitHub list failed for ${folder}`);
    const listed = await response.json();
    files = listed.filter(file => file.name && file.name.endsWith('.md')).map(file => file.name).reverse();
  } catch (error) {
    files = CMS_COLLECTION_FALLBACKS[folder] || [];
  }

  const entries = await Promise.all(files.map(async fileName => {
    const slug = fileName.replace(/\.md$/i, '');
    try {
      const response = await fetch(`/${folder}/${encodeURIComponent(fileName)}`);
      if (!response.ok) throw new Error(`Entry not found: ${fileName}`);
      return parseCmsEvidenceEntry(await response.text(), slug);
    } catch (error) {
      return null;
    }
  }));

  return entries.filter(Boolean).filter(entry => !entry.draft);
}

function renderMediaAssetCard(item) {
  const title = escapeHtml(item.title);
  const assetType = escapeHtml(item.assetType || 'Media Asset');
  const project = escapeHtml(item.project || 'Project Evidence');
  const caption = escapeHtml(item.caption || 'Media asset managed through the CTS admin portal.');
  const purpose = escapeHtml(item.purpose || 'Selected to communicate project details visually.');
  const image = item.image ? `<div class="asset-image"><img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.altText || item.caption || item.title)}" loading="lazy"></div>` : `<div class="asset-image"><div class="asset-placeholder">Upload media in Admin Portal</div></div>`;
  const video = item.videoUrl ? `<a href="${escapeHtml(item.videoUrl)}" target="_blank" rel="noopener" class="cms-card-link">Open video/trailer <i class="fas fa-arrow-up-right-from-square" aria-hidden="true"></i></a>` : '';

  return `
    <article class="asset-card">
      ${image}
      <div class="asset-meta"><span>${assetType}</span><span>${project}</span></div>
      <h4>${title}</h4>
      <div class="asset-caption">${caption}</div>
      <p class="asset-purpose"><strong>Why this media:</strong> ${purpose}</p>
      ${video}
    </article>`;
}

function renderHardwareCard(item) {
  const title = escapeHtml(item.title);
  const hardwareType = escapeHtml(item.hardwareType || 'Hardware');
  const specs = escapeHtml(item.specs || 'Specs managed through the CTS admin portal.');
  const caption = escapeHtml(item.caption || 'Hardware photo and documentation entry.');
  const orgNote = escapeHtml(item.organizationNote || 'Preparation and organization notes can be added in the admin portal.');
  const benefit = escapeHtml(item.endUserBenefit || 'Clear documentation makes support and maintenance easier for the end user.');
  const image = item.image ? `<div class="hardware-image"><img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.altText || item.caption || item.title)}" loading="lazy"></div>` : `<div class="hardware-image"><div class="hardware-placeholder">Upload hardware photo in Admin Portal</div></div>`;

  return `
    <article class="hardware-card">
      ${image}
      <div class="hardware-meta"><span>${hardwareType}</span><span>${escapeHtml(item.date)}</span></div>
      <h4>${title}</h4>
      <p><strong>Core specs:</strong> ${specs}</p>
      <div class="hardware-caption">${caption}</div>
      <p><strong>Organization:</strong> ${orgNote}</p>
      <p class="hardware-benefit"><strong>End-user benefit:</strong> ${benefit}</p>
    </article>`;
}

function renderServiceGuideCard(item) {
  const title = escapeHtml(item.title);
  const guideType = escapeHtml(item.guideType || 'Service Guide');
  const skillArea = escapeHtml(item.skillArea || 'IT Support');
  const summary = escapeHtml(item.summary || 'Step-by-step instructional content managed through the admin portal.');
  const avMethod = escapeHtml(item.avMethod || 'Uses written steps with screenshots, captions, and structured visual support.');
  const image = item.image ? `<div class="guide-image"><img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.altText || item.summary || item.title)}" loading="lazy"></div>` : `<div class="guide-image"><div class="guide-placeholder">Upload guide screenshot in Admin Portal</div></div>`;
  const bodyPreview = item.content ? `<p>${escapeHtml(item.content.replace(/[#*_>`]/g, '').slice(0, 180))}${item.content.length > 180 ? '...' : ''}</p>` : '';

  return `
    <article class="guide-card">
      ${image}
      <div class="guide-meta"><span>${guideType}</span><span>${skillArea}</span></div>
      <h4>${title}</h4>
      <p>${summary}</p>
      <div class="guide-av-method"><strong>AV Method:</strong> ${avMethod}</div>
      ${bodyPreview}
    </article>`;
}

function renderEmptyCmsState(container, label, iconClass) {
  container.innerHTML = `
    <div class="portfolio-card cms-placeholder">
      <div class="placeholder-inner">
        <i class="${iconClass}" aria-hidden="true"></i>
        <span>No ${label} published yet</span>
        <a href="/admin" class="placeholder-link">Add one in Admin Portal</a>
      </div>
    </div>`;
}

async function loadEvidenceSections() {
  const mediaGrid = document.getElementById('mediaAssetGrid');
  const hardwareGrid = document.getElementById('hardwareConfigGrid');
  const guideGrid = document.getElementById('serviceGuideGrid');

  if (mediaGrid) {
    const assets = await fetchCmsEvidenceCollection('_media_assets');
    if (assets.length) mediaGrid.innerHTML = assets.map(renderMediaAssetCard).join('');
    else renderEmptyCmsState(mediaGrid, 'media assets', 'fas fa-photo-film');
  }

  if (hardwareGrid) {
    const hardware = await fetchCmsEvidenceCollection('_hardware_configurations');
    if (hardware.length) hardwareGrid.innerHTML = hardware.map(renderHardwareCard).join('');
    else renderEmptyCmsState(hardwareGrid, 'hardware docs', 'fas fa-screwdriver-wrench');
  }

  if (guideGrid) {
    const guides = await fetchCmsEvidenceCollection('_service_guides');
    if (guides.length) guideGrid.innerHTML = guides.map(renderServiceGuideCard).join('');
    else renderEmptyCmsState(guideGrid, 'service guides', 'fas fa-book-open');
  }
}

document.addEventListener('DOMContentLoaded', loadEvidenceSections);


// ── ACCESSIBILITY ASSIST MODE ─────────────────────────────
(function initAccessibilityTools() {
  const STORAGE_KEY = 'ctsAccessibilityPrefs';
  const defaults = {
    enabled: false,
    contrast: false,
    largeText: false,
    reduceMotion: false,
    readableFont: false,
    transcripts: false
  };

  function readPrefs() {
    try {
      return { ...defaults, ...JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') };
    } catch {
      return { ...defaults };
    }
  }

  function writePrefs(prefs) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  }

  function announce(message) {
    const live = document.getElementById('a11yStatus');
    if (live) live.textContent = message;
  }

  function applyPrefs(prefs, announceChange = false) {
    const active = Boolean(prefs.enabled);
    document.body.classList.toggle('a11y-enabled', active);
    document.body.classList.toggle('a11y-high-contrast', active && prefs.contrast);
    document.body.classList.toggle('a11y-large-text', active && prefs.largeText);
    document.body.classList.toggle('a11y-reduce-motion', active && prefs.reduceMotion);
    document.body.classList.toggle('a11y-readable-font', active && prefs.readableFont);
    document.body.classList.toggle('a11y-transcripts', active && prefs.transcripts);
    document.documentElement.style.scrollBehavior = active && prefs.reduceMotion ? 'auto' : '';
    document.dispatchEvent(new CustomEvent('ctsA11yChanged', { detail: { ...prefs, active } }));
    if (announceChange) announce(active ? 'Accessibility assist mode updated.' : 'Accessibility assist mode is off.');
  }

  function controlMarkup(id, label, description, checked) {
    return `
      <label class="a11y-switch" for="${id}">
        <span>
          <strong>${label}</strong>
          <small>${description}</small>
        </span>
        <input type="checkbox" id="${id}" ${checked ? 'checked' : ''} />
      </label>`;
  }

  function addSkipLink() {
    if (document.getElementById('main-content') && !document.querySelector('.skip-link')) {
      document.body.insertAdjacentHTML('afterbegin', '<a class="skip-link" href="#main-content">Skip to main content</a>');
    }
  }

  function addPageSummary() {
    const main = document.getElementById('main-content');
    if (!main || document.querySelector('.a11y-page-summary')) return;
    const summary = document.createElement('section');
    summary.className = 'a11y-page-summary';
    summary.setAttribute('aria-label', 'Accessibility summary');
    summary.innerHTML = `
      <h2>Accessibility Assist Mode</h2>
      <p>This page supports keyboard navigation, visible focus, descriptive image text, readable layout options, reduced motion, and transcript notes for media when available.</p>
    `;
    main.prepend(summary);
  }

  function addAccessibilityWidget() {
    if (document.getElementById('a11yLauncher')) return;
    const prefs = readPrefs();
    const widget = document.createElement('div');
    widget.className = 'a11y-widget';
    widget.innerHTML = `
      <div id="a11yStatus" class="sr-only" aria-live="polite"></div>
      <button type="button" class="a11y-launcher" id="a11yLauncher" aria-expanded="false" aria-controls="a11yPanel">
        <i class="fas fa-universal-access" aria-hidden="true"></i>
        <span>Access</span>
      </button>
      <section class="a11y-panel" id="a11yPanel" aria-labelledby="a11yPanelTitle" hidden>
        <div class="a11y-panel-head">
          <div>
            <h2 id="a11yPanelTitle">Accessibility Assist</h2>
            <p>Turn on support features without changing the default CTS design for everyone.</p>
          </div>
          <button type="button" class="a11y-close" id="a11yClose" aria-label="Close accessibility panel">×</button>
        </div>
        ${controlMarkup('a11yEnabled', 'Assist mode', 'Master switch for the features below.', prefs.enabled)}
        ${controlMarkup('a11yContrast', 'High contrast', 'Brighter text, stronger borders, and darker backgrounds.', prefs.contrast)}
        ${controlMarkup('a11yLargeText', 'Larger text', 'Increases reading size across the site.', prefs.largeText)}
        ${controlMarkup('a11yReadableFont', 'Readable font', 'Uses a simpler system font for easier reading.', prefs.readableFont)}
        ${controlMarkup('a11yReduceMotion', 'Reduce motion', 'Turns off animated backgrounds, spins, pulses, and smooth scroll.', prefs.reduceMotion)}
        ${controlMarkup('a11yTranscripts', 'Show transcript notes', 'Keeps audio/video transcript guidance visible for deaf or hard-of-hearing users.', prefs.transcripts)}
      </section>
    `;
    document.body.appendChild(widget);

    const launcher = document.getElementById('a11yLauncher');
    const panel = document.getElementById('a11yPanel');
    const close = document.getElementById('a11yClose');

    function setPanel(open) {
      panel.hidden = !open;
      launcher.setAttribute('aria-expanded', String(open));
      if (open) document.getElementById('a11yEnabled').focus();
    }

    launcher.addEventListener('click', () => setPanel(panel.hidden));
    close.addEventListener('click', () => setPanel(false));
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && !panel.hidden) setPanel(false);
    });

    const map = {
      a11yEnabled: 'enabled',
      a11yContrast: 'contrast',
      a11yLargeText: 'largeText',
      a11yReadableFont: 'readableFont',
      a11yReduceMotion: 'reduceMotion',
      a11yTranscripts: 'transcripts'
    };

    Object.entries(map).forEach(([id, key]) => {
      const input = document.getElementById(id);
      input.addEventListener('change', () => {
        const next = readPrefs();
        next[key] = input.checked;
        writePrefs(next);
        applyPrefs(next, true);
      });
    });

    applyPrefs(prefs, false);
  }

  function polishAssistiveMarkup() {
    document.querySelectorAll('i[class*="fa-"]').forEach(icon => {
      if (!icon.hasAttribute('aria-label')) icon.setAttribute('aria-hidden', 'true');
    });

    document.querySelectorAll('a[target="_blank"]').forEach(link => {
      if (!link.getAttribute('aria-label') && link.textContent.trim()) {
        link.setAttribute('aria-label', `${link.textContent.trim()} opens in a new tab`);
      }
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    addSkipLink();
    addPageSummary();
    addAccessibilityWidget();
    polishAssistiveMarkup();

    const observer = new MutationObserver(() => polishAssistiveMarkup());
    observer.observe(document.body, { childList: true, subtree: true });
  });
})();
