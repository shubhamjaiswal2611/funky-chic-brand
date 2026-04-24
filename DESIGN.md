# Design Brief: Bold Global Lifestyle Brand

**Purpose**: Multi-page shopping experience for multi-category lifestyle brand fusing Indian folk/Mughal, Japanese, Mexican, African, vintage Americana with streetwear and graffiti energy.

**Tone**: Maximalist, culturally-rooted, streetwear-forward. Bold typography hierarchy with accent color bursts. Two energy modes sharing same DNA.

**Differentiation**: Cultural motifs (block print, paisley, mandala) as decorative texture layers—not the interface. Modes toggle intensity, not aesthetic identity. Street-influenced yet refined.

---

## Palette (OKLCH)

| Name | L | C | H | Role | Hex Ref |
|------|---|---|---|----|---------|
| Saffron | 0.72 | 0.22 | 82 | Primary accent, pattern fills, CTAs | #F59E0B |
| Indigo | 0.35 | 0.18 | 310 | Primary foreground, depth, headers | #4F46E5 |
| Crimson | 0.55 | 0.22 | 25 | Destructive/highlight, accent burst | #DC2626 |
| Off-white | 0.98 | 0.01 | 70 | Background, card surface, text | #FAF9F6 |
| Dark Indigo | 0.12 | 0.01 | 70 | Dark mode background | — |
| Muted Cream | 0.92 | 0.02 | 70 | Secondary surface, dividers | — |

---

## Typography

| Layer | Font | Weight | Size | Use |
|-------|------|--------|------|-----|
| Display | Bricolage Grotesque | 700 | 48–72px | Headlines, brand moments, CTAs |
| Body | DM Sans | 400 | 16px | Body copy, product descriptions, forms |
| Mono | Geist Mono | 400 | 12–14px | Technical info, SKUs, prices |

---

## Color Application by Mode

**Be Funky**: Saturated palette, high-contrast accents, visible patterns (block print 5–8% opacity), large bold type, bright interactive states.

**Chic Look**: Desaturated palette (-20% chroma), patterns subtle (<3% opacity), refined type scale, muted interaction feedback, editorial spacing.

Both inherit: `--primary: indigo`, `--accent: saffron`, `--destructive: crimson`, `--background: off-white`, `--border: muted-cream`.

---

## Structural Zones

| Zone | Surface | Treatment | Purpose |
|------|---------|-----------|---------|
| Header/Nav | `bg-background` | Thin `border-b-2 border-accent` | Brand visibility, cultural flag |
| Hero | `bg-card` | `pattern-block-print`, large headlines | First impression, product teaser |
| Product Grid | `bg-background` | Alternating `bg-muted/20` rows | Content rhythm, accessibility |
| CTA Sections | `bg-accent` | `shadow-elevated-brand`, cultural border-top | Conversion moments, brand energy |
| Footer | `bg-muted/30` | `border-t border-border` | Grounding, secondary navigation |

---

## Spacing & Rhythm

Mobile-first breakpoints: `sm: 640px`, `md: 768px`, `lg: 1024px`, `xl: 1280px`.

- **Padding**: `4px, 8px, 12px, 16px, 24px, 32px` — no arbitrary spacing.
- **Grid**: 12-column on desktop, 4-column mobile; gap: `16px` / `12px` mobile.
- **Card spacing**: `24px` horizontal, `20px` vertical (Be Funky) vs `32px` / `28px` (Chic Look).

---

## Component Patterns

- **Buttons**: `primary` (indigo bg, saffron on hover), `secondary` (saffron border), `ghost` (text-only, indigo).
- **Cards**: `shadow-subtle-brand` light mode, elevated on hover. Pattern overlay in Be Funky mode.
- **Form inputs**: Cream background, indigo border on focus, saffron ring accent.
- **Newsletter CTA**: Saffron background, indigo text, bold display font.

---

## Motion

- **Entrance**: `fade-in 0.4s`, `slide-up 0.4s` for cards/modals.
- **Interaction**: `transition-smooth` (0.3s cubic-bezier) on all interactive elements.
- **Hover states**: Color shift + slight scale lift (`scale-105`), shadow elevation.
- **No animations**: Disable if `prefers-reduced-motion`.

---

## Dark Mode

Inherits Be Funky/Chic modes. Background darkens to `#1a1a1a` (L 0.12), text to cream. Accent chroma reduced by 15% for screen comfort. Borders subtle, shadows deeper for depth.

---

## Signature Detail

**Cultural border accent**: Thin decorative top/bottom borders using `border-cultural` on key sections (hero, feature blocks). Saffron on light, brightened in dark mode. Pairs with block-print pattern texture in Be Funky mode.
