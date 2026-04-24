# Carrillo Tech Solutions — Website

**Cyberpunk command-center website for Carrillo Tech Solutions LLC**
Engineered for Performance. Secured for the Future.

---

## File Structure

```
carrillo-tech/
├── index.html          ← Homepage (all sections)
├── styles.css          ← Master stylesheet (CSS variables, responsive)
├── main.js             ← Particle canvas, scroll behaviors, form handler
├── netlify.toml        ← Netlify deploy config + headers
├── assets/
│   ├── cts-logo.png    ← ← ADD YOUR LOGO HERE (transparent PNG, ~500px)
│   └── uploads/        ← CMS media uploads go here
└── admin/
    ├── index.html      ← Decap CMS admin entry point
    └── config.yml      ← CMS collections: Blog, Portfolio, Services, Settings
```

---

## Deployment

### Option A — Netlify (Recommended, enables CMS)

1. Push this folder to a GitHub repo.
2. Connect the repo to [Netlify](https://netlify.com).
3. Set build settings: **Publish directory = `.`** (root), no build command.
4. Enable **Netlify Identity** in Site Settings → Identity.
5. Enable **Git Gateway** in Site Settings → Identity → Services.
6. Invite yourself as a user with the "Owner" role.
7. Visit `https://yoursite.netlify.app/admin` to log in and manage content.

### Option B — GitHub Pages (static only, no CMS login)

1. Push to GitHub, enable Pages from the `main` branch root.
2. CMS admin UI will be visible at `/admin` but login requires Netlify Identity or a separate OAuth app.
3. For GitHub Pages OAuth setup, see: https://decapcms.org/docs/github-backend/

---

## Adding Your Logo

1. Place your `cts-logo.png` (transparent background recommended) in the `assets/` folder.
2. The site automatically uses it in the navbar, hero, and footer.
3. If no image is found, a styled text/icon fallback renders automatically.

---

## CMS Collections

| Collection | Folder | Purpose |
|---|---|---|
| Intelligence Hub (Blog) | `_posts/` | Technical writeups, dispatches |
| Infrastructure Portfolio | `_portfolio/` | Completed project showcases |
| Enterprise Services | `_services/` | Service card content |
| Site Settings | `_data/settings.yml` | Global text, social links, availability |

---

## Color Palette

| Token | Value | Usage |
|---|---|---|
| `--bg` | `#0B0C10` | Deep Space Black background |
| `--purple` | `#9B5DE5` | Neon Purple — primary accent |
| `--cyan` | `#00F5D4` | Electric Cyan — secondary accent |

---

© 2026 Carrillo Tech Solutions LLC. Cleveland, Ohio.
