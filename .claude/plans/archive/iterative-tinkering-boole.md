# Simplify Visual Modes — Remove S/B/E, Default Extreme, Decouple Theme from Background

## Context

The S/B/E (Subtle/Bold/Extreme) mode switcher appears in both the Header and Footer, contributing to footer clutter. The three modes were useful for experimentation but "extreme" is the desired permanent state — the oversaturated spectrum is the site's identity. The light/dark theme toggle currently dims and desaturates the p5.js background in light mode, which undermines the generative art. The user wants the theme toggle to only affect foreground elements (text, cards, borders) while leaving the canvas untouched.

**Goal**: Remove S/B/E switching entirely, bake "extreme" as the permanent visual mode, and decouple the theme toggle from `#bg-canvas`.

---

## Changes

### 1. Bake extreme mode into `:root` defaults (`src/styles/global.css`)

Merge the extreme overrides into `:root` so no `data-bg-mode` attribute is needed:

```css
/* Current :root values → replaced with extreme equivalents */
--text-primary: #e8e6e3;     → #FFFFFF
--text-secondary: #a09e9b;   → rgba(255,255,255,0.9)
--text-muted: #9e9c99;       → rgba(255,255,255,0.75)
--bg-card: rgba(0,0,0,0.55); → rgba(0,0,0,0.65)
--bg-card-hover: rgba(0,0,0,0.65); → rgba(0,0,0,0.75)
```

Apply the extreme canvas filter as the default `#bg-canvas` rule:

```css
#bg-canvas {
  filter: saturate(1.6) contrast(1.15); /* ...existing rules */
}
```

Then **delete** all three `body[data-bg-mode="..."]` rule blocks (subtle, bold, extreme) — they're now redundant.

### 2. Remove light-theme canvas filters (`src/styles/global.css`)

Delete these 13 lines that make the theme toggle affect the background:

- `[data-theme="light"] #bg-canvas { filter: ... }`
- `[data-theme="light"][data-bg-mode="bold"] #bg-canvas { ... }`
- `[data-theme="light"][data-bg-mode="extreme"] #bg-canvas { ... }`

Also delete the light-mode S/B/E override blocks:

- `[data-theme="light"] body[data-bg-mode="subtle"] { ... }`
- `[data-theme="light"] body[data-bg-mode="bold"], [data-theme="light"] body[data-bg-mode="extreme"] { ... }`

The light theme's foreground overrides (text colors, bg-card, borders, etc. in `:root[data-theme="light"]`) stay — those are correct.

### 3. Remove S/B/E buttons from Header (`src/components/Header.astro`)

Delete the `.header__mode-switch` div (lines 105-109) and all its CSS (`.header__mode-switch`, `.bg-mode-btn`, `.bg-mode-btn:hover`, `.bg-mode-btn--active`, and the mobile override block).

### 4. Remove S/B/E buttons + simplify Footer (`src/components/Footer.astro`)

Delete the `.bg-mode-switch` div and its CSS. Keep the theme toggle in the footer (it remains useful at the bottom of long pages). The footer becomes: links | secondary nav | theme toggle + copyright — significantly less crowded.

### 5. Remove S/B/E initialization (`src/components/scripts/ThemeRestore.astro`)

Delete the `bg-mode` localStorage/URL-param logic (the `validModes`, `urlParam`, `initialMode` block). Remove `data-bg-mode="subtle"` from the `<body>` tag in `Layout.astro`.

### 6. Remove `initModeButtons` function (`src/components/Footer.astro`)

Delete the `initModeButtons` function and its registration in the `astro:page-load` listener.

### 7. Remove hero mode hint (`src/components/home/HeroSection.astro`)

Delete the `.hero__mode-hint` paragraph that says "This site has three visual modes — look for S / B / E in the header." and its CSS.

---

## Files Modified

| File                                        | Change                                                                            |
| ------------------------------------------- | --------------------------------------------------------------------------------- |
| `src/styles/global.css`                     | Bake extreme into `:root`, remove S/B/E blocks, remove light-theme canvas filters |
| `src/components/Header.astro`               | Remove `.header__mode-switch` markup + CSS                                        |
| `src/components/Footer.astro`               | Remove `.bg-mode-switch` markup + CSS, remove `initModeButtons`                   |
| `src/components/scripts/ThemeRestore.astro` | Remove bg-mode initialization                                                     |
| `src/layouts/Layout.astro`                  | Remove `data-bg-mode` from `<body>`                                               |
| `src/components/home/HeroSection.astro`     | Remove mode hint paragraph + CSS                                                  |

---

## Verification

```bash
npm run build          # 31 pages, no errors
npm run test           # All tests pass
npm run test:a11y      # No a11y regressions
npm run validate       # HTML valid, all links resolve
```

Manual check: `npm run dev` → confirm background canvas renders at full saturation in both dark and light themes, with no visual change when toggling theme.
