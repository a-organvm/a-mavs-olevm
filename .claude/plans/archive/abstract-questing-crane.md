# Fix Skipped E2E Tests

## Current State

**Total skipped:** 111 tests (37 per browser × 3 browsers)
**Total passed:** 137 tests
**Total failed:** 1 (flaky)

### Skipped Test Breakdown

| Category                             | Tests | Per Browser | Total | Fixable?             |
| ------------------------------------ | ----- | ----------- | ----- | -------------------- |
| WebGL/GPU (ogod-3d.spec.js)          | 29    | ×3          | 87    | Maybe                |
| Mobile menu (mobile.spec.js)         | 4     | ×3          | 12    | Yes                  |
| Hash navigation (navigation.spec.js) | 2     | ×3          | 6     | Yes                  |
| Touch swipe (carousel.spec.js)       | 1     | ×3          | 3     | Yes                  |
| Settings panel (ogod-3d.spec.js)     | 2     | ×3          | 6     | No (feature missing) |

---

## Fix Plan

### Fix 1: Mobile Menu Tests (mobile.spec.js)

**Problem:** Click handlers and body.style.overflow changes don't reliably execute in headless browsers.

**Solution:** Use `page.evaluate()` to directly manipulate DOM state instead of relying on click events.

**Tests to unskip:**

- `should close mobile menu on second click`
- `should lock scroll when menu is open`
- `should unlock scroll when menu closes`
- `should have correct aria-expanded state`

**Approach:**

1. Add state reset in `beforeEach` to ensure clean state
2. Use `page.evaluate()` to verify/manipulate hamburger state directly
3. Use `waitForSelector` with specific class conditions instead of timeouts

```javascript
// Reset state before each test
await page.evaluate(() => {
  const hamburger = document.querySelector('.c-hamburger');
  const mobileMenu = document.querySelector('.mobileMenu');
  if (hamburger) {
    hamburger.classList.remove('is-active');
    hamburger.setAttribute('aria-expanded', 'false');
  }
  if (mobileMenu) {
    mobileMenu.classList.remove('open');
  }
  document.body.style.overflow = '';
});
```

---

### Fix 2: Hash Navigation Tests (navigation.spec.js)

**Problem:** `page.goto('/#menu')` doesn't reliably trigger the document.ready handler.

**Solution:** Use the `navigateToPage` helper pattern from chambers.spec.js.

**Tests to unskip:**

- `should navigate to menu from landing`
- `should navigate via hash change`

**Approach:**

1. Add `navigateToPage` helper function
2. Replace `page.goto('/#hash')` with `navigateToPage(page, '#hash')`

---

### Fix 3: Touch Swipe Test (carousel.spec.js)

**Problem:** Playwright's mouse events don't trigger `touchstart`/`touchend` handlers.

**Solution:** Use `dispatchEvent` to fire actual TouchEvent objects.

**Test to unskip:**

- `should support touch swipe on mobile`

**Approach:**

```javascript
await page.evaluate(
  ({ startX, endX, y }) => {
    const container = document.querySelector('#stills');

    const touchStart = new TouchEvent('touchstart', {
      bubbles: true,
      touches: [
        new Touch({
          identifier: 0,
          target: container,
          clientX: startX,
          clientY: y,
        }),
      ],
    });
    container.dispatchEvent(touchStart);

    const touchEnd = new TouchEvent('touchend', {
      bubbles: true,
      changedTouches: [
        new Touch({
          identifier: 0,
          target: container,
          clientX: endX,
          clientY: y,
        }),
      ],
    });
    container.dispatchEvent(touchEnd);
  },
  { startX, endX, y }
);
```

---

### Fix 4: WebGL Tests (ogod-3d.spec.js)

**Problem:** Tests blanket-skip in CI/headless mode, but SwiftShader may provide software WebGL.

**Solution:** Check actual WebGL availability instead of blanket skipping.

**Approach:**

```javascript
test.beforeEach(async ({ page }, testInfo) => {
  await page.goto('http://localhost:3000/ogod-3d.html');

  const hasWebGL = await page.evaluate(() => {
    const canvas = document.createElement('canvas');
    return !!(canvas.getContext('webgl') || canvas.getContext('webgl2'));
  });

  if (!hasWebGL) {
    test.skip(true, 'WebGL not available in this browser environment');
  }
});
```

**Risk:** SwiftShader may not render correctly. If tests fail after this change, revert to current skip logic.

---

### Fix 5: Settings Panel Tests - SKIP (Feature Not Implemented)

These tests (`settings panel opens/closes on button click`) require `#settings-btn` and `#settings-panel` elements that don't exist yet. Keep skipped until feature is implemented.

---

## Files to Modify

| File                           | Changes                                              |
| ------------------------------ | ---------------------------------------------------- |
| `tests/e2e/mobile.spec.js`     | Unskip 4 tests, add state reset, use page.evaluate() |
| `tests/e2e/navigation.spec.js` | Unskip 2 tests, add navigateToPage helper            |
| `tests/e2e/carousel.spec.js`   | Unskip 1 test, use TouchEvent dispatch               |
| `tests/e2e/ogod-3d.spec.js`    | Change skip logic to check actual WebGL availability |

---

## Implementation Order

1. **navigation.spec.js** - Simplest fix, proven pattern from chambers.spec.js
2. **mobile.spec.js** - State reset + evaluate approach
3. **carousel.spec.js** - TouchEvent dispatch
4. **ogod-3d.spec.js** - WebGL availability check (may need rollback)

---

## Expected Results

**Best case (WebGL works):**

- 111 skipped → 6 skipped (settings panel only)
- 137 passed → 242 passed

**Conservative (WebGL doesn't work):**

- 111 skipped → 93 skipped (WebGL + settings)
- 137 passed → 155 passed (+18 tests)

---

## Verification

```bash
# Run full E2E suite
npx playwright test --config=.config/playwright.config.js

# Run specific fixed tests
npx playwright test tests/e2e/mobile.spec.js --project=chromium
npx playwright test tests/e2e/navigation.spec.js --project=chromium
npx playwright test tests/e2e/carousel.spec.js --project=chromium

# Test WebGL fix
npx playwright test tests/e2e/ogod-3d.spec.js --project=chromium
```

---

## Rollback Plan

If WebGL tests fail after fix, revert ogod-3d.spec.js to current skip logic:

```javascript
const isCI = !!process.env.CI;
const isHeadless = projectUse.headless !== false;
if (isCI || isHeadless) {
  test.skip(true, 'WebGL/3D tests require headed browser with GPU access');
}
```
