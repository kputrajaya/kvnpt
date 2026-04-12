# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run lint     # ESLint with Next.js rules
```

No test framework configured.

## Architecture

**Stack:** Next.js (Pages Router) + React 19 + TypeScript + Tailwind CSS 4

**Content sources:**
- **Storyblok CMS** — blog posts, resume, home page content; fetched via `utils/storyblok.ts`
- **JSON files** — `data/photo-albums.json`, `data/song-albums.json` for media sections

**Key pages:**
- `pages/blog/` — dynamic posts with pagination (20/page), `[slug].tsx` for individual posts
- `pages/resume.tsx` — CV page driven by Storyblok content
- `pages/photos/` — image galleries backed by photo-albums JSON
- `pages/songs/` — audio player using `react-h5-audio-player`
- `pages/links.tsx` — redirect hub; short aliases (`/ba`, `/gh`, `/ig`, `/sp`) handled in `vercel.json`

**Images:** Served via ImageKit CDN; remote patterns configured in `next.config.js`

**SVGs:** Converted to React components via SVGR (Turbopack rule in `next.config.js`)

**TypeScript:** Strict mode disabled; target ES2020, `isolatedModules: true`
