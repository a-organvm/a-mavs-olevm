# ETCETER4: P5.js Animation System Expansion

**Goal:** Extend the sound/vision canvas aesthetics to EVERY interactive element across ALL pages

**Style Reference:** Bold CMYK colors, kinetic motion, the existing soundCanvas (noise grid) and visionCanvas (glitch slices)

---

## Color Palette (Locked)

```javascript
const E4Colors = {
  cyan: '#00FFFF', // RGB(0, 255, 255)
  magenta: '#FF00FF', // RGB(255, 0, 255)
  yellow: '#FFFF00', // RGB(255, 255, 0)
  black: '#000000',
  white: '#FFFFFF',
  // Canvas backgrounds
  hotPink: [255, 55, 100], // soundCanvas
  limeGreen: [120, 255, 10], // visionCanvas
  infoBlue: [50, 100, 205], // infoCanvas
  gray: [155, 155, 155], // wordsCanvas
};
```

---

## File Structure

```
js/animations/
├── index.js                    # E4Animations manager
├── effects/
│   ├── NoiseGridEffect.js      # Sound-inspired: CMYK text noise
│   ├── GlitchSliceEffect.js    # Vision-inspired: moving slices + blend modes
│   ├── ParticleBurstEffect.js  # New: radial particle explosions
│   ├── WordCloudEffect.js      # Words-inspired: mini floating text
│   ├── WaveformEffect.js       # New: audio sine waves
│   ├── PixelDissolveEffect.js  # New: pixel scatter
│   ├── ScanlineEffect.js       # New: CRT scanlines
│   └── CMYKShiftEffect.js      # New: color channel separation
├── core/
│   ├── CanvasPool.js           # Instance pooling (max 3 simultaneous)
│   ├── EffectRegistry.js       # Effect type registration
│   └── ElementTracker.js       # Element-to-effect mapping
└── config/
    ├── elementMappings.js      # Selector → effect assignments
    ├── colorPalette.js         # CMYK definitions
    └── performanceConfig.js    # Device-based modes
```

---

## 8 Animation Effects

### 1. NoiseGridEffect (from soundCanvas)

- Grid of `.` and `:` characters
- Weighted colors: 10% cyan, 20% yellow, 45% black, 25% magenta
- Hot pink background or transparent
- **Use:** Menu links, OGOD tracks, loophole links

### 2. GlitchSliceEffect (from visionCanvas)

- 3-5 moving horizontal slices
- `difference` + `overlay` blend modes
- Velocity-based physics with acceleration
- **Use:** Gallery nav, vision sub-links

### 3. ParticleBurstEffect (new)

- 15-30 particles burst radially
- CMYK color cycle
- 30-60 frame lifespan
- **Use:** Enter button, social icons, back button

### 4. WordCloudEffect (from wordsCanvas)

- 5-10 floating words
- Perlin noise movement
- Bodoni font
- **Use:** Main menu hover enhancement

### 5. WaveformEffect (new)

- 2-4 animated sine waves
- CMYK gradient
- Responsive amplitude
- **Use:** Sound links, audio elements

### 6. PixelDissolveEffect (new)

- 4-8px pixel scatter
- Random dissolve direction
- Fast 0.5s animation
- **Use:** Gallery images, diary nav

### 7. ScanlineEffect (new)

- 2-4px spacing scanlines
- Vertical scroll motion
- Optional flicker
- **Use:** Footer links, hamburger menu

### 8. CMYKShiftEffect (new)

- 2-6px color channel offset
- Cyan/Magenta/Yellow layers
- Subtle jitter
- **Use:** Akademia cards, info links

---

## Element Mappings

### index.html (~50 elements)

| Element            | Selector                                  | Effect                       |
| ------------------ | ----------------------------------------- | ---------------------------- |
| Enter button       | `#toMenuPage`                             | ParticleBurstEffect          |
| Menu: SOUND        | `#toSoundPage`                            | NoiseGridEffect + existing   |
| Menu: WORDS        | `#toWordsPage`                            | WordCloudEffect + existing   |
| Menu: VISION       | `#toVisionPage`                           | GlitchSliceEffect + existing |
| Menu: INFO         | `#toInfoPage`                             | CMYKShiftEffect + existing   |
| Words sub-links    | `#words a`                                | WordCloudEffect              |
| Vision sub-links   | `#vision a`                               | GlitchSliceEffect            |
| Info sub-links     | `#info a`                                 | CMYKShiftEffect              |
| Gallery left/right | `#stills-left, #stills-right`             | PixelDissolveEffect          |
| Diary left/right   | `#stills-left-diary, #stills-right-diary` | PixelDissolveEffect          |
| Back button        | `#backButton`                             | ParticleBurstEffect          |
| Hamburger          | `.c-hamburger`                            | ScanlineEffect               |
| Footer links       | `#subscribe a`                            | ScanlineEffect               |
| Social icons       | `.social-link`                            | ParticleBurstEffect          |
| Mobile menu items  | `.mobileMenu li a`                        | NoiseGridEffect              |

### ogod.html (29 track links)

| Element         | Selector        | Effect                         |
| --------------- | --------------- | ------------------------------ |
| All track links | `#OGODvisual a` | NoiseGridEffect (cycle colors) |

### loophole.html

| Element      | Selector  | Effect            |
| ------------ | --------- | ----------------- |
| Random links | `#loop a` | GlitchSliceEffect |

### akademia/index.html

| Element       | Selector        | Effect                      |
| ------------- | --------------- | --------------------------- |
| Nav links     | `nav a`         | ScanlineEffect              |
| Content cards | `.content-card` | CMYKShiftEffect             |
| Tags          | `.tag`          | ParticleBurstEffect (micro) |

---

## Architecture

### Micro-Canvas Positioning

```javascript
// Canvas positioned absolutely over hovered element
function createMicroCanvas(element, effectFn) {
  var rect = element.getBoundingClientRect();
  var wrapper = document.createElement('div');
  wrapper.style.cssText = `
    position: absolute;
    pointer-events: none;
    z-index: 1000;
    left: ${rect.left + window.scrollX}px;
    top: ${rect.top + window.scrollY}px;
    width: ${rect.width}px;
    height: ${rect.height}px;
  `;
  document.body.appendChild(wrapper);
  return new p5(effectFn, wrapper);
}
```

### Performance Strategy

```javascript
// Max 3 simultaneous canvases
// Auto-detect device capability
var PerformanceConfig = {
  normal: { maxCanvases: 3, frameRate: 30, particles: 25 },
  reduced: { maxCanvases: 2, frameRate: 20, particles: 15 },
  minimal: { maxCanvases: 1, frameRate: 15, particles: 8 },
};

// Detect mode
if (/Mobi|Android/i.test(navigator.userAgent)) mode = 'reduced';
if (window.matchMedia('(prefers-reduced-motion)').matches) mode = 'minimal';
```

### Touch Support

- `touchstart` → startEffect
- `touchend/touchcancel` → stopEffect
- Debounce rapid events (100ms)

---

## Implementation Phases

### Phase 1: Core Infrastructure

- [ ] Create `js/animations/` directory
- [ ] `CanvasPool.js` - instance pooling
- [ ] `EffectRegistry.js` - effect registration
- [ ] `ElementTracker.js` - element binding
- [ ] `colorPalette.js` - CMYK constants
- [ ] `performanceConfig.js` - device modes
- [ ] `index.js` - E4Animations manager

### Phase 2: Port Existing Effects

- [ ] `NoiseGridEffect.js` - extract from soundCanvas
- [ ] `GlitchSliceEffect.js` - extract from visionCanvas
- [ ] `WordCloudEffect.js` - extract from wordsCanvas

### Phase 3: New Effects

- [ ] `ParticleBurstEffect.js`
- [ ] `WaveformEffect.js`
- [ ] `PixelDissolveEffect.js`
- [ ] `ScanlineEffect.js`
- [ ] `CMYKShiftEffect.js`

### Phase 4: Element Binding

- [ ] `elementMappings.js` - all selectors
- [ ] Bind index.html elements
- [ ] Bind ogod.html elements
- [ ] Bind loophole.html elements
- [ ] Bind akademia elements

### Phase 5: Testing

- [ ] Chrome, Firefox, Safari
- [ ] iOS Safari, Android Chrome
- [ ] Performance profiling
- [ ] Memory leak checks

---

## Critical Files

| File                  | Purpose                                 |
| --------------------- | --------------------------------------- |
| `js/sketch.js`        | Existing canvases - preserve and extend |
| `js/page.js`          | Page navigation - respect lifecycle     |
| `css/styles.css`      | Link hover states (lines 291-469)       |
| `index.html`          | Main element selectors                  |
| `akademia/index.html` | Chamber template                        |

---

## Verification

1. Run `npm run dev` and test each page
2. Hover every menu item - verify canvas appears
3. Test gallery navigation buttons
4. Test mobile menu on device/emulator
5. Check `prefers-reduced-motion` respect
6. Profile memory usage in DevTools
7. Test all 29 OGOD track links
8. Verify no interference with page navigation

---

_Bold colors. Kinetic motion. Every element alive._
