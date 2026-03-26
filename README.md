# LightworkAI — Business Website

> Heavy problems. Lightwork.

Static HTML/CSS/JS website for LightworkAI, an AI automation and custom tools service.
Hosted on GitHub Pages. No frameworks, no CMS, no database dependencies.

## Live Site

**https://joepalek.github.io/jlp-studio-website/**

## Pages

| File | Description |
|------|-------------|
| `index.html` | Homepage — hero, problem grid, portfolio, escrow promise, services tiles |
| `about.html` | Who we are, built projects, real numbers |
| `services.html` | Six service areas with deliverables and starting prices |
| `process.html` | Four-step process, FAQ |
| `contact.html` | Intake form (mailto / Supabase-ready) |
| `privacy.html` | Privacy policy (required for Meta App Review) |
| `terms.html` | Terms of service |
| `pages/` | SEO ghost pages (location + service targeting) |

## Ghost Pages

| File | SEO Target |
|------|------------|
| `pages/ebay-reseller-automation-tennessee.html` | "eBay reseller automation Tennessee" |

## Tech Stack

- Static HTML5 / CSS3 / vanilla JS
- Google Fonts (Inter + JetBrains Mono)
- GitHub Pages hosting
- No build step, no dependencies, no framework

## Updating

Edit files directly and push to `master`. GitHub Pages rebuilds in ~60 seconds.

```bash
git add -A
git commit -m "your message"
git push origin master
```

## Contact Form

Currently uses `mailto:` fallback. To switch to Supabase:

1. Add to each page `<head>`:
   ```html
   <script>
     window.SUPABASE_URL = 'your-url';
     window.SUPABASE_ANON_KEY = 'your-key';
   </script>
   ```
2. `js/main.js` auto-detects and routes to Supabase when keys are present.

## Brand

- **Name:** LightworkAI
- **Tagline:** Heavy problems. Lightwork.
- **Accent color:** `#1D9E75` (teal)
- **Nav logo HTML:** `Lightwork<span>AI</span>`
