# Carrillo Tech Solutions — Website Command Center

**Carrillo Tech Solutions LLC** is a Cleveland-based IT support and data analytics brand built around practical problem solving, clean technical presentation, and a futuristic command-center visual identity.

**Tagline:** Engineered for Performance. Secured for the Future.  
**Owner:** Giovanni Carrillo  
**Location:** Cleveland, Ohio  
**Live Site:** https://carrillotech.pages.dev/  
**Admin Portal:** `/admin`

---

## Project Overview

This website is the public digital headquarters for Carrillo Tech Solutions LLC. It presents the business as a professional IT operation while also documenting technical writing, infrastructure projects, service offerings, support intake, and original creative writing work.

The site is intentionally built as a static-first web project with CMS-managed Markdown content. That means the public pages load quickly, while the admin portal can still add or edit posts, creative archive entries, services, portfolio projects, images, and audio files without manually editing every HTML page.

---

## Main Purpose

The site is designed to do five things:

1. Present Carrillo Tech Solutions LLC as a professional IT support and data analytics brand.
2. Show real technical skill through services, project work, and written field dispatches.
3. Provide a support request path for visitors who need help with technology.
4. Display a Creative Archive for original lyrics, manuscripts, beat references, and multimedia writing evidence.
5. Maintain a clean public README page that documents the structure, purpose, and functionality of the entire project.

---

## Core Features

### Business Website

- Hero section with CTS branding and command-center styling.
- Services section for IT support, diagnostics, hardware help, networking, security, data analysis, and consulting.
- Portfolio section for infrastructure builds and technical project evidence.
- Architect section for owner profile, credentials, and professional positioning.
- Contact/support section with a visitor support request form.
- Privacy Policy and Terms of Service pages.

### Intelligence Hub

- Markdown-based technical posts stored in `_posts/`.
- Dynamic post loading from the repository.
- Modal-based dispatch reader on the homepage.
- Shareable individual dispatch page through `dispatch.html`.
- Category, excerpt, featured image, draft status, and publish date support.

### Creative Archive

- Dedicated Creative Archive page at `/creative/`.
- Creative manuscript entries stored in `_creative/`.
- Supports finalized pieces and draft/process entries.
- Displays title, excerpt, publish date, featured image, BPM, musical key, genre, draft status, and manuscript body.
- Supports YouTube links, SoundCloud links, and direct uploaded audio files.
- Uses Markdown formatting so headings, bold text, lists, and preserved lyric spacing display properly on the live site.

### README Viewer

- Public README page at `/readme/`.
- Pulls content directly from `README.md`.
- Uses Markdown rendering through Marked.js.
- Matches the rest of the CTS site design.


### Audio-Visual Evidence Sections

These sections were added to support the Audio-Visual Methods and Materials course requirements without changing the original CTS design direction.

- **Media & Assets** section on the homepage for project screenshots, Cleveland-themed FiveM assets, liveries, UI configurations, server trailer links, and brand visuals.
- **Hardware Configuration** section for PC build photos, workstation layout notes, cable management notes, airflow decisions, captions, and end-user benefits.
- **Service Guides & How-To Docs** section for instructional content that uses text, screenshots, captions, and clear steps to explain IT support tasks.
- All three sections are CMS-managed so new proof can be added from the Admin Portal instead of hardcoding every update.

### Audio-Visual Course Language

The site now uses clearer course-aligned headings such as **Digital Media Integration**, **Visual Asset Management**, **User Interface Design**, **Technical Documentation**, and **Instructional Use**. This makes the website stronger as school evidence because it shows media selection, preparation, organization, communication, and audio-visual aids in direct language.

### Accessibility Assist Mode

- Floating **Access** button appears on site pages that load `main.js`.
- The original CTS design stays active by default. Visitors can turn Assist Mode on only when they need it.
- Toggle options include high contrast, larger text, readable font, reduced motion, and transcript notes.
- Keyboard users get a skip link, visible focus outlines, and improved menu button state.
- Screen reader support was improved with clearer landmarks, better alt text, decorative icon hiding, modal labels, live form messages, and keyboard-friendly Creative Archive cards.
- Deaf or hard-of-hearing users can turn on transcript notes for audio and media. Creative manuscripts already provide the written version of the audio content.

### Admin Portal

- Sveltia CMS admin dashboard at `/admin`.

- Project Media & Assets collection for visual asset management, FiveM media, UI captures, trailers, screenshots, captions, and alt text.
- Hardware Configuration Docs collection for PC build photos, specs, organization notes, and end-user benefits.
- Instructional Use — Service Guides collection for how-to guides, troubleshooting steps, screenshots, and audio-visual method notes.
- GitHub-backed content management.
- Admin-managed collections for blog posts, creative pieces, portfolio items, services, and site settings.
- Upload support for images and optimized audio files.

### Cloudflare Pages Functions

- GitHub OAuth support files for admin authentication flow.
- Support form submission endpoint.
- Serverless structure inside the `functions/` directory.

---

## Live Route Map

| Route | File/Folder | Purpose |
|---|---|---|
| `/` | `index.html` | Main Carrillo Tech Solutions homepage |
| `/creative/` | `creative/index.html` | Clean Creative Archive route |
| `/creative.html` | `creative.html` | Direct Creative Archive page file |
| `/readme/` | `readme/index.html` | Clean public README route |
| `/readme.html` | `readme.html` | Direct README viewer page file |
| `/dispatch.html` | `dispatch.html` | Individual dispatch/blog reader |
| `/dispatch?post=slug` | `_redirects` → `dispatch.html` | Clean dispatch redirect support |
| `/privacy.html` | `privacy.html` | Privacy Policy |
| `/terms.html` | `terms.html` | Terms of Service |
| `/admin` | `admin/index.html` | Sveltia CMS admin portal |
| `/api/submit` | `functions/api/submit.js` | Support request function endpoint |

---

## Current File Structure

```text
CTS-main/
├── README.md
├── index.html
├── creative.html
├── dispatch.html
├── readme.html
├── privacy.html
├── terms.html
├── styles.css
├── main.js
├── creative-index.json
├── _redirects
├── download
├── admin/
│   ├── index.html
│   └── config.yml
├── assets/
│   ├── cts-logo.png
│   ├── cts-logo-icon.png
│   ├── music/
│   │   ├── .gitkeep
│   │   ├── 215to216.mp3
│   │   └── low-battery.mp3
│   └── uploads/
│       ├── 215to216.png
│       ├── humansil.png
│       └── low-battery.png
├── creative/
│   ├── .gitkeep
│   └── index.html
├── readme/
│   ├── .gitkeep
│   └── index.html
├── _creative/
│   ├── .gitkeep
│   ├── 2026-04-28-two-one-five-to-two-one-six.md
│   └── 2026-05-02-low-battery.md
├── _data/
│   └── settings.yml
├── _portfolio/
│   └── .gitkeep
├── _posts/
│   ├── .gitkeep
│   ├── 2026-03-12-excel-as-a-bi-tool-advanced-pivot-techniques.md
│   ├── 2026-03-20-vlan-segmentation-for-the-home-lab.md
│   ├── 2026-04-14-a-forensic-breakdown-of-thermal-management-failures-in-modern-laptops-#U2014-and-how-to-surgically-fix-them-without-voiding-your-warranty.md
│   └── 2026-04-28-the-ghost-in-the-machine-navigating-the-ethics-of-automated-labor.md
├── _services/
│   └── .gitkeep
└── functions/
    ├── auth.js
    ├── callback.js
    └── api/
        └── submit.js
```

---

## File and Folder Purpose

| Path | Purpose |
|---|---|
| `index.html` | Main homepage layout and public business presentation |
| `styles.css` | Main visual system, page layout, responsive styling, cards, modals, archive styling, and README styling |
| `main.js` | Homepage effects, navigation behavior, dispatch loading, modal behavior, and Markdown/frontmatter parsing helpers |
| `creative.html` | Creative Archive page for direct file access |
| `creative/index.html` | Clean `/creative/` route version of the Creative Archive page |
| `readme.html` | README viewer for direct file access |
| `readme/index.html` | Clean `/readme/` route version of the README viewer |
| `dispatch.html` | Standalone reader for individual Intelligence Hub posts |
| `privacy.html` | Privacy Policy |
| `terms.html` | Terms of Service |
| `_redirects` | Cloudflare Pages route rules for clean URLs and dispatch redirects |
| `creative-index.json` | Local fallback list for Creative Archive Markdown files |
| `admin/index.html` | Admin dashboard entry point |
| `admin/config.yml` | Sveltia CMS backend, collections, fields, uploads, and content settings |
| `_posts/` | Intelligence Hub Markdown posts |
| `_creative/` | Creative Archive Markdown entries |
| `_portfolio/` | CMS-managed portfolio entries |
| `_services/` | CMS-managed service entries |
| `_data/settings.yml` | Site identity and editable global settings |
| `assets/` | Logos, uploaded images, and media files |
| `assets/music/` | Optimized audio files used by Creative Archive entries |
| `assets/uploads/` | Uploaded images used by posts and creative entries |
| `functions/` | Cloudflare Pages Functions for authentication and support form behavior |

---

## Content Collections

| Collection | Folder/File | Managed In Admin | Purpose |
|---|---|---:|---|
| Intelligence Hub | `_posts/` | Yes | Technical dispatches, articles, tutorials, and commentary |
| Creative Archive | `_creative/` | Yes | Lyrics, poems, manuscripts, drafts, beats, and multimedia writing evidence |
| Infrastructure Portfolio | `_portfolio/` | Yes | Project cards and technical work examples |
| Enterprise Services | `_services/` | Yes | Service offerings and details |
| Site Settings | `_data/settings.yml` | Yes | Global site identity and contact information |
| README | `README.md` | No | Public project documentation displayed at `/readme/` |

---

## Current Intelligence Hub Posts

| Title | Date | Category | File |
|---|---:|---|---|
| Excel as a BI Tool: Advanced Pivot Techniques | 2026-03-12 | Data | `_posts/2026-03-12-excel-as-a-bi-tool-advanced-pivot-techniques.md` |
| VLAN Segmentation for the Home Lab | 2026-03-20 | Networking | `_posts/2026-03-20-vlan-segmentation-for-the-home-lab.md` |
| A forensic breakdown of thermal management failures in modern laptops — and how to surgically fix them without voiding your warranty. | 2026-04-14 | Hardware | `_posts/2026-04-14-a-forensic-breakdown-of-thermal-management-failures-in-modern-laptops-#U2014-and-how-to-surgically-fix-them-without-voiding-your-warranty.md` |
| The Ghost in the Machine: Navigating the Ethics of Automated Labor | 2026-04-28 | AI | `_posts/2026-04-28-the-ghost-in-the-machine-navigating-the-ethics-of-automated-labor.md` |

---

## Current Creative Archive Entries

| Title | Date | Status | BPM | Key | Genre | Audio/Image |
|---|---:|---|---|---|---|---|
| Two-One-Five to Two-One-Six | 2026-03-17 | Finalized | 86 BPM | D Minor | Gaming Rap / Cinematic Hip-Hop | `215to216.mp3`, `215to216.png` |
| Low Battery | 2025-09-07 | Finalized | 70 BPM | C# Minor | Melodic Hip-Hop / Sad Trap | `low-battery.mp3`, `low-battery.png` |

---

## Creative Archive Markdown Format

Each Creative Archive entry uses frontmatter at the top of the Markdown file.

```yaml
title: Low Battery
date: 2025-09-07
excerpt: A short description of the creative piece.
image: /assets/uploads/low-battery.png
beat_source: ''
beat_file: /assets/music/low-battery.mp3
bpm: 70 BPM
musical_key: C# Minor
genre: Melodic Hip-Hop / Sad Trap
draft: false
```

The lyric or manuscript body goes under the frontmatter. Markdown formatting is supported.

```md
# **Song Title**

#### [Intro]

First lyric line

Second lyric line

#### [Hook]

**This line appears bold on the live site.**
```

---

## Creative Archive Field Guide

| Field | What It Controls |
|---|---|
| `title` | Song, poem, manuscript, or creative piece title |
| `date` | Published date shown in the archive card and reader |
| `excerpt` | Short description shown before opening the manuscript |
| `image` | Cover image for the archive card and manuscript display |
| `beat_source` | External beat link, usually YouTube or SoundCloud |
| `beat_file` | Uploaded audio file stored in `/assets/music/` |
| `bpm` | Tempo metadata |
| `musical_key` | Musical key metadata |
| `genre` | Genre or style label |
| `draft` | `false` shows it under Published Pieces; `true` shows it in Drafting Room |
| `body` | Main lyrics, manuscript, poem, or draft text |

---

## Audio Upload Rules

Creative Archive entries support external links and direct audio uploads.

Supported direct audio formats:

- `.mp3`
- `.m4a`
- `.ogg`

MP3 is recommended because it keeps file sizes smaller and works reliably in browsers. Audio files should stay under 24 MB to match the current admin upload configuration and keep deployments stable.

Current direct audio files:

```text
/assets/music/215to216.mp3
/assets/music/low-battery.mp3
```

---

## Image Upload Rules

Images uploaded through the admin portal are stored in:

```text
/assets/uploads/
```

Current uploaded image assets:

```text
/assets/uploads/215to216.png
/assets/uploads/humansil.png
/assets/uploads/low-battery.png
```

---

## Markdown Rendering

The site uses Marked.js to convert Markdown into live HTML for readable public pages.

Markdown is used for:

- README page content
- Intelligence Hub dispatch content
- Creative Archive manuscript bodies
- CMS-managed service and portfolio descriptions

Supported formatting includes:

```md
# Large Heading
## Medium Heading
### Smaller Heading
#### Section Label
**Bold text**
*Italic text*
- Bullet list item
1. Numbered list item
> Quote block
```

For song lyrics, section labels should normally use:

```md
#### [Intro]
#### [Verse 1]
#### [Hook]
#### [Outro]
```

---

## Admin Portal Overview

The admin portal is configured through:

```text
/admin/config.yml
```

The backend connects to:

```text
repo: CarrilloTechLLC/CTS
branch: main
base_url: https://carrillotech.pages.dev
```

The admin portal supports these major sections:

- Intelligence Hub — Blog
- Creative Archive
- Infrastructure Portfolio
- Enterprise Services
- Site Settings

---

## Site Settings

Global site settings are stored in:

```text
_data/settings.yml
```

Current settings include:

| Setting | Current Value |
|---|---|
| Site Title | Carrillo Tech Solutions |
| Tagline | Engineered for Performance. Secured for the Future. |
| Owner | Giovanni Carrillo |
| Location | Cleveland, Ohio |
| Email | Carrillo.giovanni215+carrillotech@outlook.com |
| Twitch | supergman2155 |
| YouTube | supergman215 |
| Instagram | G.io215 |
| LinkedIn | https://www.linkedin.com/in/giovanni-carrillo/ |
| Availability | Available |

---

## Brand System

| Element | Direction |
|---|---|
| Brand Name | Carrillo Tech Solutions LLC |
| Short Brand | CTS |
| Visual Style | Futuristic cyberpunk command center |
| Tone | Professional, technical, confident, and client-focused |
| Primary Audience | Individuals, students, families, gamers, small businesses, and people who need help understanding technology |
| Core Services | IT support, diagnostics, hardware help, data analytics, networking, security, and technical consulting |
| Typography | Orbitron, Rajdhani, Share Tech Mono |
| Logo Assets | `assets/cts-logo.png`, `assets/cts-logo-icon.png` |

---

## Technical Stack

| Layer | Technology |
|---|---|
| Frontend | HTML, CSS, JavaScript |
| Styling | Custom CSS with responsive layouts and animated UI effects |
| Content Format | Markdown with YAML frontmatter |
| Markdown Rendering | Marked.js |
| CMS | Sveltia CMS |
| Content Backend | GitHub repository content |
| Hosting Target | Cloudflare Pages |
| Functions | Cloudflare Pages Functions |
| Icons | Font Awesome |
| Fonts | Google Fonts: Orbitron, Rajdhani, Share Tech Mono |

---

## Support Request Flow

The homepage includes a support request form for visitors. The form is connected to a Pages Function endpoint:

```text
functions/api/submit.js
```

The form is designed to collect support-related details from visitors and route the request through the site backend.

---

## Redirect Rules

Current redirect rules are stored in `_redirects`.

```text
/creative /creative/ 301
/readme /readme/ 301
/dispatch /dispatch.html 200
/intel/* /dispatch.html?post=:splat 301
```

These rules help clean URLs load correctly.

---

## Current Project Status

| Area | Status |
|---|---|
| Homepage | Active |
| Creative Archive | Active |
| README page | Active |
| Intelligence Hub | Active |
| Admin Portal | Active |
| Direct audio uploads | Active for MP3/M4A/OGG under 24 MB |
| Portfolio CMS folder | Ready for entries |
| Services CMS folder | Ready for entries |
| Cloudflare Functions | Present |

---

## Maintenance Notes

- Keep public pages at the root level and clean route versions inside matching folders.
- Keep Creative Archive files in `_creative/`.
- Keep Intelligence Hub posts in `_posts/`.
- Keep uploaded images in `/assets/uploads/`.
- Keep uploaded audio in `/assets/music/`.
- Use MP3 instead of WAV for website audio.
- Update `creative-index.json` when adding Creative Archive files if a local fallback list is needed.
- Keep `creative.html` and `creative/index.html` matched so both direct and clean routes behave the same.
- Keep `readme.html` and `readme/index.html` matched so both README routes behave the same.
- Do not delete `.gitkeep` files unless the folders contain other tracked files.

---

## Copyright

© 2026 Carrillo Tech Solutions LLC. Cleveland, Ohio. All rights reserved.


## New CMS Evidence Folders

```text
_media_assets/              # Media & Assets entries for project visuals, FiveM screenshots, UI captures, and trailer links
_hardware_configurations/   # Hardware documentation entries with photos, specs, captions, and organization notes
_service_guides/            # Instructional how-to guides using steps, screenshots, and AV communication notes
```

When a new live-site feature allows content to be added or edited, it should also have a matching Admin Portal/CMS section so it can be managed from the admin side.
