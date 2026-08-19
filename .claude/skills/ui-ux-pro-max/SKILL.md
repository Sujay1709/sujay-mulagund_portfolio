---
name: ui-ux-pro-max
description: Design brain for building calm, high-craft front-end pages. Use whenever creating or restyling a web page, section, or component — it sets the spacing, type, colour, motion, and accessibility standards so everything a page renders follows one system.
---

# UI/UX Pro Max

A house style for interfaces that read as *considered*, not decorated. The goal is
restraint: every element earns its place, motion serves meaning, and the page works
for everyone. When asked to "use the ui-ux pro max skill," follow these rules.

## 1. Layout & spacing
- One content column, generous margins. Cap reading width around `max-w-3xl`.
- Use a consistent spacing scale (4 / 8 / 12 / 16 / 24 / 40 / 64 px). Never eyeball
  one-off gaps.
- Separate major sections with a hairline border and vertical rhythm, not boxes.
- Design mobile-first. Every layout must look right on a 375px-wide phone before
  desktop. Test the phone view, not a resized window.

## 2. Typography
- Two typefaces at most: one expressive (serif/display) for headlines, one neutral
  (Inter or system) for body. A monospaced accent only when showing code.
- Clear type scale; don't crowd sizes. Body ~16px, line-height ~1.6.
- Uppercase, letter-spaced labels for section eyebrows. Sentence case elsewhere.

## 3. Colour & contrast
- A near-neutral base (paper light / near-black dark) with ONE restrained accent.
- Drive colours through CSS variables so light/dark is a single flip.
- Meet WCAG AA contrast (4.5:1 body text). Never rely on colour alone to signal state.

## 4. Motion — subtle, purposeful
Motion should feel like the page settling into place, never like it is performing.
- Library: **Motion** (`import { motion, useReducedMotion } from "motion/react"`).
- **Entrance:** fade + a small upward translate (16–24px). Content fades *up* on load.
- **Scroll reveal:** sections animate once as they enter the viewport
  (`whileInView` + `viewport={{ once: true, amount: 0.15 }}`). Never re-animate on
  scroll-back.
- **Stagger** hero children ~60–90ms apart for a composed entrance.
- **Duration** 0.4–0.6s. **Easing** a gentle ease-out (`[0.22, 1, 0.36, 1]`).
  Nothing bouncy, nothing longer than ~0.7s.
- **Hover:** micro-only — opacity or a 1–2px lift. No large scale jumps.
- **Always** honour `prefers-reduced-motion`: when reduced, render final state with
  no transforms (`useReducedMotion()` → skip variants).
- Restraint test: if an animation draws attention to itself rather than the content,
  cut it.

## 5. Accessibility & semantics
- Real semantic tags (`header`, `nav`, `section`, `footer`, `h1…h3`, `ul/li`).
- All interactive elements keyboard-reachable with a visible focus state.
- `alt` text on images; `aria-label` on icon-only buttons.
- Respect reduced motion (see §4) and don't trap focus.

## 6. Performance & polish (ship checklist)
- Loads in under 3 seconds; images optimised, lazy-loaded below the fold.
- Real text and real images — no lorem ipsum, no dead links.
- Page title, meta description, favicon, and social/OG image set.
- Looks right on a real phone; works in light and dark.

## Working method
Build one section at a time — navbar → hero → content → footer. After each,
look at it in the browser, name exactly what feels wrong ("heading too large,
spacing above the button is tight"), fix that one thing, and commit to git as a
save point. Small instructions, frequent commits.
