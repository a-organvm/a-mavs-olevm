# OGOD Animation Revival: Remaining Integration Work

## Context

The OGOD TKOL Glitch renderer and Export Pipeline have been **implemented and calibrated** across 4 phases. The TKOL renderer (`js/ogod/renderers/OGODTKOLRenderer.js`) uses full-image pixel sorting + WebGL shaders to recreate the original 2014 TKOL aesthetic. The export pipeline (`js/ogod/OGODExportPipeline.js`) provides browser-based frame capture. All 29 standalone `ogod/*.html` pages have mode switchers with TKOL as the default.

**However, two integration gaps remain:**

1. **`index.html` (SPA context) is missing the TKOL renderer and Export Pipeline script tags** — the SPA loads OGODCanvasRenderer, OGODWebGLRenderer, and OGODGenerativeRenderer but NOT OGODTKOLRenderer or OGODExportPipeline
2. **No E2E tests exist for the standalone OGOD pages** — the existing `ogod-3d.spec.js` tests the 3D immersive experience only, not the `ogod/*.html` animation pages

Additionally, all new files in `js/ogod/` and `scripts/ogod-assemble.sh` are **untracked** (need staging/committing).

---

## Step 1: Add missing script tags to `index.html`

**File**: `index.html` (~line 2241)

Insert after `OGODGenerativeRenderer.js` (line 2241), before `OGODAudioAdapter.js` (line 2242):

```html
<script
  type="text/javascript"
  src="js/ogod/renderers/OGODTKOLRenderer.js"
  defer
></script>
<script
  type="text/javascript"
  src="js/ogod/OGODExportPipeline.js"
  defer
></script>
```

This ensures the SPA context can use `tkol` mode and the export pipeline.

---

## Step 2: Add E2E tests for standalone OGOD pages

**New file**: `tests/e2e/ogod-standalone.spec.js`

Tests should cover:

1. **Page loads without JS errors** — open `ogod/I.html`, check for critical console errors
2. **Canvas element is created** — the OGOD engine creates a `#ogod-canvas-container` with a `<canvas>` inside
3. **Mode switcher works** — select each mode (faithful, enhanced, generative, tkol), verify no errors on switch
4. **TKOL mode is default** — verify the `<select>` has `tkol` selected by default
5. **Navigation between tracks** — click the next-track link, verify new page loads

These tests should follow the same pattern as `ogod-3d.spec.js` — skip in CI/headless since they require WebGL, use the same error filtering approach.

---

## Step 3: Run existing E2E tests for regression

Run: `npx playwright test --config .config/playwright.config.js --project chromium`

Verify no regressions in `chambers.spec.js`, `navigation.spec.js`, or other test suites from the modified files (`index.html`, `js/ogod.js`, `js/config.js`, `js/pageData.js`).

---

## Step 4: Lint and format all modified/new files

```bash
npm run lint
npm run format:check
```

Ensure 0 new errors (81 pre-existing warnings is the baseline).

---

## Files Summary

| File                                | Action                     |
| ----------------------------------- | -------------------------- |
| `index.html`                        | Edit (add 2 script tags)   |
| `tests/e2e/ogod-standalone.spec.js` | Create (new E2E test file) |

---

## Verification

1. `npm run lint` → 0 errors
2. `npm run format:check` → all clean
3. `npx playwright test --config .config/playwright.config.js --project chromium` → no regressions
4. `npm run dev` → open `ogod/I.html` → TKOL mode loads by default → vertical pixel-sort streaks visible
5. Switch between all 4 modes without errors
6. Open `index.html` in SPA context → verify no console errors from missing TKOL renderer
