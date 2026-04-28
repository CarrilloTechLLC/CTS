# Carrillo Tech Solutions — Website

**Cyberpunk command-center website for Carrillo Tech Solutions LLC**  
Engineered for Performance. Secured for the Future.

## Overview

Carrillo Tech Solutions is a Cleveland-based IT support and data analytics brand focused on practical technical support, system diagnostics, hardware architecture, network hardening, creative technical production, and clean digital presentation. The website presents the company as a polished technical operation with a futuristic visual identity and clear paths for visitors to explore services, read technical dispatches, review creative manuscripts, and request support.

## Core Features

- **Enterprise Services:** Service-focused sections for hardware repair, system diagnostics, data analysis, network hardening, and IT consulting.
- **Infrastructure Portfolio:** Project-focused presentation for completed and active technical work.
- **The Architect:** Professional owner profile with credentials, platform links, and business positioning.
- **Intelligence Hub:** Technical writeups presented as field dispatches with modal reading support and shareable dispatch URLs.
- **Creative Archive:** Lyrical manuscripts, beat references, draft notes, and finalized creative writing pieces rendered from CMS posts.
- **Manuscript Reader:** Creative writing view with preserved lyric spacing, monospaced styling, metadata badges, and multimedia beat/player support.
- **Drafting Room:** Creative Archive section for draft-status posts and raw notes that show the creative development process.
- **Support Request Flow:** Branded contact section and serverless submission endpoint for visitor support requests.
- **Responsive Interface:** Mobile-friendly layout with animated background visuals, neon accents, cyberpunk cards, and clean spacing.
- **Admin-Managed Content:** Sveltia CMS configuration for posts, portfolio items, services, and site settings.

## Tech Stack

- **Frontend:** HTML, CSS, and JavaScript
- **Content:** Markdown-based posts, technical dispatches, and creative manuscripts
- **CMS:** Sveltia CMS with GitHub-backed content collections
- **Functions:** Cloudflare Pages Functions for authentication and support request handling
- **Markdown Rendering:** Marked.js for README, dispatch, and post content rendering
- **Styling:** Custom CSS variables, responsive grids, animated UI elements, and CTS brand assets
- **Typography:** Orbitron, Rajdhani, and Share Tech Mono
- **Media:** CTS logo assets, uploaded images, featured blog images, and optional audio files

## File Structure

```text
CTS-main/
├── index.html                                      # Main website page
├── creative.html                                   # Creative Archive and manuscript reader page
├── dispatch.html                                   # Shareable individual dispatch/blog page
├── readme.html                                     # Styled public README viewer
├── privacy.html                                    # Privacy policy page
├── terms.html                                      # Terms of service page
├── styles.css                                      # Main site styling, responsive layout, and page-specific UI
├── main.js                                         # Website interactions, post loading, dispatch logic, and UI behavior
├── README.md                                       # Project overview content displayed by readme.html
├── _redirects                                      # Cloudflare Pages redirect and route rules
├── admin/
│   ├── index.html                                  # Sveltia CMS admin entry page
│   └── config.yml                                  # CMS collections, fields, media settings, and backend config
├── assets/
│   ├── cts-logo.png                                # Full CTS brand logo
│   ├── cts-logo-icon.png                           # CTS icon logo
│   ├── music/
│   │   └── .gitkeep                                # Placeholder for optional direct audio files
│   └── uploads/
│       └── humansil.png                            # Uploaded featured image asset
├── _data/
│   └── settings.yml                                # Editable site settings data
├── _posts/
│   ├── .gitkeep                                    # Keeps the posts folder available in the repository
│   ├── 2026-03-12-excel-as-a-bi-tool-advanced-pivot-techniques.md
│   ├── 2026-03-20-vlan-segmentation-for-the-home-lab.md
│   ├── 2026-04-14-a-forensic-breakdown-of-thermal-management-failures-in-modern-laptops-#U2014-and-how-to-surgically-fix-them-without-voiding-your-warranty.md
│   └── 2026-04-28-the-ghost-in-the-machine-navigating-the-ethics-of-automated-labor.md
├── _portfolio/
│   └── .gitkeep                                    # Placeholder for CMS-managed portfolio entries
├── _services/
│   └── .gitkeep                                    # Placeholder for CMS-managed service entries
└── functions/
    ├── auth.js                                     # Cloudflare Pages GitHub OAuth start route
    ├── callback.js                                 # Cloudflare Pages GitHub OAuth callback route
    └── api/
        └── submit.js                               # Support request submission endpoint
```

## Content Collections

| Collection | Folder | Purpose |
|---|---|---|
| Intelligence Hub / Blog | `_posts/` | Technical dispatches, social commentary, and Creative Archive entries |
| Creative Archive | `_posts/` with `category: Creative Archive` | Lyrical manuscripts, beat sources, metadata, drafts, and finalized pieces |
| Infrastructure Portfolio | `_portfolio/` | CMS-managed technical project entries |
| Enterprise Services | `_services/` | CMS-managed service cards and service details |
| Site Settings | `_data/settings.yml` | Editable site identity, owner, platform, and hero content |

## Creative Archive Fields

| Field | Use |
|---|---|
| `category` | Set to `Creative Archive` to route the post to the Creative Archive page |
| `beat_source` | Accepts YouTube links, SoundCloud links, or direct audio paths |
| `bpm` | Stores tempo metadata for the manuscript |
| `musical_key` | Stores musical key metadata |
| `genre` | Stores genre metadata |
| `draft` | Separates Drafting Room entries from finalized published works |
| `body` | Stores the lyrical manuscript with preserved line breaks |

## Brand System

| Element | Direction |
|---|---|
| Visual Style | Deep-space cyberpunk command center |
| Primary Background | Deep Space Black |
| Accent Colors | Neon Purple and Electric Cyan |
| Voice | Professional, technical, confident, and client-focused |
| Audience | Clients needing IT support, diagnostics, hardware help, network support, data organization, and technical creative presentation |

## Project Notes

This site is designed to make Carrillo Tech Solutions feel sharp, reliable, and technically capable. The layout keeps the business message clear while using high-energy visuals to create a memorable brand experience. The content is written for public visitors, not developers, so each section focuses on services, trust, capabilities, creative proof, and client action.

## Location

Carrillo Tech Solutions LLC is based in Cleveland, Ohio.

## Copyright

© 2026 Carrillo Tech Solutions LLC. Cleveland, Ohio.
