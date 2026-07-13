# Painting Doctorz

A production-grade, enterprise-ready luxury website for **Painting Doctorz**, a premium interior & exterior painting studio. Built with the Next.js Pages Router, React 18, Tailwind CSS, and Framer Motion.

---

## Tech stack

- **Framework:** Next.js 14 (Pages Router, `/pages`)
- **UI:** React 18 (JavaScript, no TypeScript)
- **State:** Context API (`context/ThemeContext.js`)
- **Styling:** Tailwind CSS only (custom light/dark design matrix — no inline styles, no component frameworks)
- **Motion:** Framer Motion (page transitions, scroll reveals, micro-interactions)
- **Images:** `next/image`
- **SEO:** `next/head` with Open Graph, Twitter Cards, and JSON-LD (LocalBusiness + Service schema)

---

## Getting started

```bash
# 1. Install dependencies
npm install

# 2. Run the dev server
npm run dev
# open http://localhost:3000

# 3. Production build
npm run build
npm run start
```

> Node.js 18.17+ is recommended for Next.js 14.

---

## Project structure

```
painting-doctorz/
├── components/
│   ├── layout/
│   │   ├── Navbar.js          # Glassmorphic sticky nav + mobile drawer + theme toggle
│   │   └── Footer.js          # Company info, nav, services, hours, socials
│   └── ui/
│       ├── Button.js          # Primary / Secondary / Ghost variants (motion)
│       ├── SectionHeading.js  # Stagger-ready eyebrow + title + description
│       ├── BeforeAfterSlider.js # Mouse + touch + keyboard split slider
│       └── TestimonialCard.js # Star rating + hover lift
├── context/
│   └── ThemeContext.js        # Theme state, localStorage cache, system preference
├── data/
│   └── siteData.js            # Single source of truth for all site content
├── pages/
│   ├── _app.js                # ThemeProvider + layout + AnimatePresence transitions
│   ├── _document.js           # <html lang>, font preconnect, no-flash theme script
│   ├── index.js               # Home: hero, services, counters, process, before/after
│   ├── about.js               # Timeline, values, mission, culture
│   ├── portfolio.js           # Filterable animated gallery
│   ├── book.js                # 4-step booking form + success animation
│   └── contact.js             # Contact points, hours, message form
├── seo/
│   └── Meta.js                # OG / Twitter / JSON-LD generator
├── styles/
│   └── globals.css            # Font loading, custom scrollbars, baseline classes
├── public/                    # favicon, robots.txt
├── tailwind.config.js         # Full light/dark colour + type extensions
├── next.config.js
└── postcss.config.js
```

---

## Design system

Colours, typography, and layout tokens live in `tailwind.config.js`. Dark mode is class-based (`darkMode: "class"`) and toggled through `ThemeContext`, which caches the preference in `localStorage` and falls back to the OS colour scheme.

- **Typeface:** Plus Jakarta Sans (loaded in `styles/globals.css`)
- **Light accent:** `#B68D40` · **Dark accent:** `#D0A85C`
- Use utility classes like `container-luxe`, `eyebrow`, `glass-panel`, `divider-luxe`, `link-underline`, and `text-gradient-gold`.

---

## Editing content

All copy, services, milestones, stats, portfolio items, testimonials, and contact details are centralized in **`data/siteData.js`**. Update that one file to change content site-wide.

Portfolio and hero images currently point to Unsplash for demonstration. Replace those URLs with your own hosted assets (and add their hostnames to `next.config.js` `images.remotePatterns`, or drop local files in `/public`).

---

## Notes

- Both forms (`book.js`, `contact.js`) are front-end only and show local success states. Wire them to an API route (`/pages/api/*`) or a form service to receive submissions.
- Accessibility: skip link, keyboard-operable slider, ARIA roles, visible focus rings, and `prefers-reduced-motion` support are built in.
