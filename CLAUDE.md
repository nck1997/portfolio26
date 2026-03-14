# CLAUDE.md — AI Assistant Guide for portfolio26

This file provides context and conventions for AI assistants working on this codebase.

## Project Overview

**Nischal Kelwadkar's professional portfolio site** — a custom-built, dependency-free static website replacing a previous Squarespace site.

- **Live URL:** https://www.nischalkelwadkar.com
- **Stack:** Pure HTML5 / CSS3 / Vanilla JavaScript — zero frameworks, zero build tools
- **Hosting:** GitHub Pages (auto-deploys on push to `main`)
- **Purpose:** UX Content Designer / AI Systems portfolio showcasing 6 case studies

## Repository Structure

```
portfolio26/
├── index.html              # Homepage (hero, experience, projects, testimonials, contact)
├── contact.html            # Standalone contact page
├── resume.html             # Interactive resume with deep links to projects
├── projects.json           # Single source of truth for all project metadata
├── Nischal_Resume_2026.pdf # Downloadable PDF resume
│
├── css/
│   ├── style.css           # Global styles (737 lines) — colors, layout, components
│   └── project.css         # Project detail page styles (238 lines)
│
├── js/
│   └── main.js             # All client-side logic (221 lines)
│
├── projects/               # Individual case study pages (6 HTML files)
│   ├── ai-content-systems.html
│   ├── lacerte-forms-help.html
│   ├── tax-season-automation.html
│   ├── cgi-meditation.html
│   ├── sales-support.html
│   └── telecom-ux.html
│
├── images/                 # All images in .webp format (~40 files, ~11 MB total)
│
├── Documentation/
│   ├── README.md           # Project guide and instructions
│   ├── DEPLOY.md           # GitHub Pages deployment walkthrough
│   ├── SITE-COMPLETE.md    # Feature completion status
│   └── NEXT-STEPS.md       # Quick deployment instructions
│
├── CNAME                   # Custom domain: www.nischalkelwadkar.com
└── .gitignore              # macOS, editor, and temp file exclusions
```

## Key Files to Understand

### `projects.json`
The **single source of truth** for all project content. Each project object contains:
```json
{
  "id": "project-slug",
  "title": "Project Title",
  "tagline": "Short description",
  "client": "Company Name",
  "deliverables": ["deliverable1", "deliverable2"],
  "summary": "One paragraph overview",
  "featured": true,
  "tags": ["tag1", "tag2"],
  "year": "2024",
  "image": "images/filename.webp"  // optional
}
```
When adding or editing projects, **always start here** before touching HTML.

### `js/main.js`
- `loadProjects()` — fetches `projects.json`, filters `featured: true` projects
- `initRotatingText()` — types "UX Content" (5s hold) then "AI Systems" (15s hold) in the hero
- `renderProjects()` / `createProjectCard()` — builds DOM cards from JSON data
- Smooth scroll — overrides anchor `<a>` clicks to account for sticky header offset
- Intersection Observer — fade-in `opacity + translateY` for all `.fade-in` elements

### `css/style.css` — CSS Variables
```css
--primary: #1a1a1a      /* Near-black text */
--secondary: #4a4a4a    /* Gray text */
--accent: #2563eb       /* Blue — links, CTAs, highlights */
--background: #ffffff
--bg-alt: #f8f9fa       /* Light gray sections */
--max-width: 1200px
--font: 'Inter', sans-serif
```

### `css/project.css`
Project detail pages use `max-width: 800px` for readability. Supports image layouts:
- `.hero-image` — full-width top image
- `.grid-2` — two-column image grid
- `.flow-gallery` — sequential image flow
- `.highlight-box` — accent-bordered insight callout

## Development Workflow

### Local Development
```bash
# Serve locally (no build step needed)
python3 -m http.server 8000
# OR
npx serve

# Open in browser
open http://localhost:8000
```

### Adding a New Project
1. Add entry to `projects.json` with `"featured": true`
2. Add project images to `images/` (use `.webp` format)
3. Copy an existing project HTML file from `projects/` as a template
4. Rename and edit the new HTML file with the case study content
5. Commit and push — GitHub Pages deploys automatically

### Editing Existing Content
- **Project cards on homepage** → edit `projects.json`
- **Project case study details** → edit the HTML file in `projects/`
- **Experience / testimonials** → edit `index.html` directly
- **Styles** → `css/style.css` (global) or `css/project.css` (project pages only)
- **Animations / interactivity** → `js/main.js`

### Deployment
```bash
git add <files>
git commit -m "Descriptive message"
git push origin main
# GitHub Pages auto-deploys within ~1-2 minutes
```

## Conventions and Standards

### HTML
- Semantic elements throughout (`<header>`, `<main>`, `<section>`, `<article>`, `<nav>`, `<footer>`)
- Deep-link anchors use `id` attributes on sections (e.g., `id="projects"`, `id="skills"`)
- All interactive skill/tool tags in `index.html` link to project anchors for discoverability
- Project pages include a back link to `index.html` at the top

### CSS
- Use existing CSS variables — do not hardcode colors or spacing
- Mobile breakpoints: `768px` (tablets) and `480px` (mobile)
- Grid layouts use `auto-fill, minmax(350px, 1fr)` for responsive columns
- Class naming is descriptive and flat (no BEM or utility frameworks)

### JavaScript
- No libraries or frameworks — pure vanilla JS only
- Functions are named and defined at module level (no class-based patterns)
- Project data is fetched async with `fetch()` and rendered to DOM via `innerHTML`
- The `Intersection Observer` targets `.fade-in` class for scroll animations

### Images
- All images must be `.webp` format
- Optimized for web before adding (keep under a few hundred KB each when possible)
- Filenames: lowercase, hyphenated (e.g., `ai-systems-overview.webp`)
- Store all images in the `/images/` directory

### Git
- Commit messages are imperative, descriptive, and lowercase
- Examples from history: `"Remove arrows and match hover states on resume links"`, `"Add interactive resume page with deep links to projects"`
- Never commit: `.DS_Store`, editor configs, temp files (covered by `.gitignore`)

## Content Conventions

### Portfolio Owner
- **Name:** Nischal Kelwadkar
- **Role:** UX Content Designer / AI Systems Designer
- **Current employer:** Intuit (Content Designer II, Oct 2023–Present)
- **Contact:** LinkedIn and email in `index.html` contact section
- **Tone:** Professional, direct, impact-focused — avoid jargon

### Projects
- Confidential projects (telecom-ux, sales-support) show limited detail and note NDA constraints
- Impact stats should be specific and verifiable (e.g., "60-minute workflow → 5 seconds")
- Case studies follow the structure: Overview → Context/Problem → Solution → Impact/Results

### Resume Page (`resume.html`)
- Skills and tools link back to relevant project sections via deep anchors
- PDF download links to `Nischal_Resume_2026.pdf`

## What NOT to Do

- **Do not introduce build tools, npm, or frameworks** — the zero-dependency approach is intentional
- **Do not use external CSS frameworks** (Bootstrap, Tailwind, etc.)
- **Do not hardcode colors** — always use CSS variables from `style.css`
- **Do not add new fonts** beyond Inter (already loaded from Google Fonts)
- **Do not edit CNAME** — this controls the live custom domain
- **Do not create separate JS files** without strong justification — keep logic in `main.js`
- **Do not use `.png` or `.jpg`** for new images — use `.webp`

## Testing Checklist (Manual)

Before pushing changes, verify:
- [ ] Homepage loads and project cards render from JSON
- [ ] Rotating text animation plays correctly
- [ ] Clicking a project card navigates to the correct detail page
- [ ] Back link on project pages returns to homepage
- [ ] Resume page deep links scroll to correct sections on `index.html`
- [ ] Mobile layout at 768px and 480px looks correct
- [ ] No broken image paths
- [ ] Smooth scroll works for nav links
- [ ] Fade-in animations trigger on scroll
