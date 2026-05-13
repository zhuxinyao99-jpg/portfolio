# Portfolio Redesign: Single-Page Scrolling

**Date:** 2026-05-13
**Status:** Approved

## Goal

Redesign the portfolio from a multi-page routed structure to a single-page scrolling narrative. Target audience is both recruiters (need quick scanning) and collaborators (want to understand the person). First impression should be: interesting person with depth, not a resume.

## Navigation

- Top navbar changes from page links to **anchor links** that scroll to sections
- Project detail pages (FiliTV, Coding) remain as **independent routes** — too much content for inline
- Project cards in the Projects section link out to these detail pages

## Page Structure & Narrative Order

```
① Intro Animation   — existing 3D ShaderGradient + enter button, preserved as-is
        ↓ seamless transition (no hard cut)
② Hero              — one-line identity statement + 3 key stats
        ↓
③ About             — bold lead quote → two-column: left = personality/values, right = timeline
        ↓
④ Skills            — capability overview
        ↓
⑤ Projects          — cards grid, each card links to independent detail page
        ↓
⑥ Contact           — contact links + CTA that echoes Hero tone
```

## Key Experience Details

- Intro → Hero transition is seamless, not a hard page cut
- Each section has scroll reveal animation on entry (already implemented via `useScrollReveal`)
- About section: one bold "lead quote" at the top that captures personality/values in one sentence; below it two columns — left for personality/values prose, right for timeline-style background
- Contact section CTA echoes the language and tone of the Hero section ("Think deep. Build real.")

## What Changes vs Current State

| Current | New |
|---|---|
| 6 separate routed pages | 1 scrolling page + 2 detail pages |
| Navbar links navigate to routes | Navbar links are anchor jumps |
| Home, About, Skills, Contact are separate | Merged into one scrolling page |
| FiliTV, Coding are separate | Remain separate (deep content) |

## What Stays the Same

- Intro animation (3D gradient, enter button, word cloud phase)
- `useScrollReveal` hook for section animations
- Design tokens (CSS variables, card styles, btn styles)
- FiliTV and Coding detail pages (content unchanged)
