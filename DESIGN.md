# Design Brief: Bold Global Lifestyle Brand — Dual Neon & Refined Palette

**Purpose**: Multi-page e-commerce for global lifestyle brand fusing Indian folk/Mughal, Japanese, Mexican, African, vintage Americana with streetwear/graffiti energy. Two completely distinct modes: neon-glow Funky and refined Chic.

**Tone**: Be Funky = maximalist, graffiti street-art, neon energy. Chic Look = timeless, editorial, refined elegance. Shared cultural DNA at different intensities.

**Differentiation**: Completely separate palettes per mode. Funky: neon lime/hot pink/neon blue on near-black (glow effects, aggressive patterns). Chic: saffron/indigo/crimson on off-white (subtle textures, editorial spacing).

---

## Palette (OKLCH)

### Be Funky Mode
| Name | L | C | H | Role | Hex Ref |
|------|---|---|---|----|---------|
| Neon Lime | 0.88 | 0.30 | 130 | Primary accent, CTAs, highlights | #CCFF00 |
| Hot Pink | 0.60 | 0.32 | 330 | Interactive accents, hover states | #FF0090 |
| Neon Blue | 0.65 | 0.28 | 210 | Primary text/links, interactive | #00D4FF |
| Near-black | 0.08 | 0.02 | 280 | Background, card surface | #0A0A0A |
| Muted Dark | 0.20 | 0.04 | 280 | Secondary surface, borders | — |

### Chic Look Mode
| Name | L | C | H | Role | Hex Ref |
|------|---|---|---|----|---------|
| Saffron | 0.76 | 0.18 | 72 | Primary accent, CTAs | #F59E0B |
| Indigo | 0.48 | 0.20 | 273 | Primary foreground, depth | #4F46E5 |
| Crimson | 0.54 | 0.24 | 22 | Destructive/highlight | #DC2626 |
| Off-white | 0.98 | 0.01 | 70 | Background, card surface | #FAF9F6 |
| Muted Cream | 0.94 | 0.02 | 75 | Secondary surface, dividers | — |

---

## Typography

| Layer | Font | Weight | Size | Use |
|-------|------|--------|------|-----|
| Display | Bricolage Grotesque | 700–800 | 48–72px | Headlines, CTAs, brand moments |
| Body | DM Sans | 400–500 | 14–16px | Body copy, product descriptions, forms |
| Mono | Geist Mono | 400 | 12–14px | Technical info, SKUs, prices |

---

## Color Application by Mode

**Be Funky**: High-saturation neons, glow text-shadow effects on headlines, aggressive block-print pattern (8% opacity), loud interactive states, neon card borders on hover, dark near-black backgrounds create maximum contrast.

**Chic Look**: Desaturated palette (-8% chroma vs standard), subtle patterns (<2% opacity), refined hover lift + shadow, editorial-clean typography, light off-white backgrounds for breathing room.

Both inherit: `--secondary: lime` / `--saffron` (Funky/Chic), `--primary: neonblue` / `--indigo`, `--accent: hotpink` / `--saffron`.

---

## Structural Zones

| Zone | Funky Surface | Chic Surface | Treatment |
|------|------------|---------|-----------|
| Header/Nav | `#0A0A0A` + lime accents | `#FAF9F6` + indigo accents | Border-b, theme toggle visible |
| Hero | `#0A0A0A` + glow text | `#FAF9F6` + editorial spacing | Large bold headlines, pattern texture |
| Product Grid | `#0A0A0A` cards, neon borders | `#FAF9F6` cards, subtle border | Alternating muted rows, rhythm |
| CTA Sections | Hot pink/lime bg, glow | Saffron bg, refined | Neon vs refined conversion moments |
| Footer | `#0A0A0A` + hot pink border | `#FAF9F6` + indigo border | Grounding, secondary nav |

---

## Spacing & Rhythm

Mobile-first breakpoints: `sm: 640px`, `md: 768px`, `lg: 1024px`, `xl: 1280px`.

- **Padding**: `4px, 8px, 12px, 16px, 24px, 32px` — no arbitrary spacing.
- **Grid**: 12-column desktop, 4-column mobile; gap: `16px` / `12px` mobile.
- **Card spacing**: `20px` vertical / `24px` horizontal (Funky) vs `28px` / `32px` (Chic).

---

## Component Patterns

- **Buttons**: Funky = neon lime/hot pink with glow. Chic = indigo/saffron with lift.
- **Cards**: Funky = dark surface + neon border glow. Chic = light surface + subtle shadow.
- **Form inputs**: Funky = dark input, neon focus ring. Chic = cream input, indigo focus.
- **CTA sections**: Funky = neon gradient, glow text. Chic = saffron/indigo, refined type.

---

## Motion

- **Entrance**: `fade-in 0.5s`, `slide-up 0.5s` for cards/modals.
- **Interaction**: `transition-smooth` (0.3s cubic-bezier) on all interactive.
- **Hover states**: Funky = neon glow shift + lift. Chic = shadow elevation + subtle scale.
- **Reduced motion**: Disabled animations if `prefers-reduced-motion`.

---

## Signature Details

**Funky**: Neon text-glow on headlines (`text-shadow` with lime/hot pink), block-print pattern texture at 8% opacity, glow card borders on hover, aggressive glow shadows on CTAs.

**Chic**: Cultural border accents (saffron top/bottom on key sections), paisley pattern at 2% opacity, refined lifted shadows on cards, editorial typography hierarchy.

---

## Cultural Motifs

Both modes retain: `pattern-block-print` (crossed diagonal lines), `pattern-paisley` (elliptical dots), `pattern-mandala` (conic radials) — adjustable opacity per mode, rotated/layered for visual interest.
