# ETCETER4 Cleanup Plan: Tests, Lint, and Site Verification

## Executive Summary

Post-implementation cleanup to ensure production quality:

- **Original Site:** ✅ Verified intact - no action required
- **Failing Tests:** 6 tests in `living-pantheon.test.js` (not 254 as previously reported)
- **Lint Warnings:** 162 warnings (143 console + 19 unused vars)

---

## Task 1: Original Site Verification ✅ COMPLETE

**Status:** The original site is 100% intact and operational.

**Verified:**

- All 5 original pillars present (#sound, #stills, #diary, #vision, #words)
- OGOD 3D experience intact at `ogod-3d.html`
- Original CSS files unmodified
- Navigation flow preserved (Landing → Menu → Content → Detail)
- New chambers added alongside (not replacing) original content

**No action required** - site works independently.

---

## Task 2: Fix 6 Failing Tests

**File:** `tests/unit/living-pantheon.test.js`

### Failing Tests Analysis

| #   | Test Name                                             | Error                                      | Root Cause                         | Fix                                            |
| --- | ----------------------------------------------------- | ------------------------------------------ | ---------------------------------- | ---------------------------------------------- |
| 1   | `should call registered listeners on status change`   | `expected false to be true`                | Event not firing on `core.start()` | Fix event emission in mock                     |
| 2   | `should unregister listener`                          | `expected spy to be called 1 times, got 0` | Listener removal logic             | Fix `off()` method in mock                     |
| 3   | `should return false if no element to glitch`         | `expected true to be false`                | `triggerGlitch()` logic inverted   | Fix return value when `excludeSelectors=['*']` |
| 4   | `should accept custom config` (AnimatedContentSystem) | `expected true to be false`                | Config merge not deep              | Fix deep merge for `breathing.enabled`         |
| 5   | `should not start glitch when prefers-reduced-motion` | `expected true to be false`                | Motion check not preventing start  | Add media query check before start             |
| 6   | `should handle complete lifecycle`                    | `expected false to be true`                | `isInitialized` not set            | Set flag in `initialize()`                     |

### Implementation Plan

**Agent 1: Fix Living Pantheon Test Mocks**

- Fix `LivingPantheonCore` mock event emission
- Fix `GlobalGlitchSystem.triggerGlitch()` return logic
- Fix `AnimatedContentSystem` deep config merge
- Add `prefers-reduced-motion` detection

**Files to modify:**

- `tests/unit/living-pantheon.test.js` - Fix test expectations if needed
- `js/living-pantheon/LivingPantheonCore.js` - Fix initialization flag
- `js/living-pantheon/GlobalGlitchSystem.js` - Fix triggerGlitch return
- `js/living-pantheon/AnimatedContentSystem.js` - Fix config merge

---

## Task 3: Fix 162 Lint Warnings

### Warning Distribution

| Rule             | Count | Priority |
| ---------------- | ----- | -------- |
| `no-console`     | 143   | Medium   |
| `no-unused-vars` | 19    | High     |

### Files by Warning Count (Top 10)

| File                                       | Warnings | Type             |
| ------------------------------------------ | -------- | ---------------- |
| `js/namingAPI.js`                          | 31       | console          |
| `js/sketch.js`                             | 20       | console + unused |
| `js/media/cache/MediaServiceWorker.js`     | 16       | console          |
| `js/main.js`                               | 13       | console          |
| `js/page.js`                               | 13       | console + unused |
| `js/living-pantheon/LivingPantheonCore.js` | 10       | console          |
| `js/living-pantheon/LabyrinthGenerator.js` | 8        | console          |
| `js/living-pantheon/AmbientSoundLayer.js`  | 7        | console          |
| `js/media/audio/WaveformVisualizer.js`     | 5        | console          |
| `js/3d/ui/SessionManager.js`               | 5        | console          |

### Implementation Plan

**Agent 2: Fix Unused Variables (19 warnings)**

- Remove or use `cleanupDiary`, `cleanupStills`, `cleanupOgod`, `cleanupSketch` functions
- Remove unused helper functions in `sketch.js` (4 functions)
- Fix unused parameters with `_` prefix or remove
- Remove dead code variables

**Agent 3: Clean Console Statements - High Priority Files (77 warnings)**

- `js/namingAPI.js` (31) - Remove debug logs
- `js/sketch.js` (16) - Remove debug logs
- `js/media/cache/MediaServiceWorker.js` (16) - Keep error logs, remove debug
- `js/main.js` (13) - Remove debug logs

**Agent 4: Clean Console Statements - Medium Priority Files (66 warnings)**

- `js/page.js` (11) - Remove debug logs
- `js/living-pantheon/LivingPantheonCore.js` (10)
- `js/living-pantheon/LabyrinthGenerator.js` (8)
- `js/living-pantheon/AmbientSoundLayer.js` (7)
- All remaining living-pantheon and media files

---

## Execution Strategy

### Parallel Agent Deployment

| Agent       | Task                    | Files                                                           | Model |
| ----------- | ----------------------- | --------------------------------------------------------------- | ----- |
| **Agent 1** | Fix 6 failing tests     | living-pantheon tests + source                                  | haiku |
| **Agent 2** | Fix unused vars (19)    | diary.js, images.js, ogod.js, sketch.js, page.js, nameSearch.js | haiku |
| **Agent 3** | Clean console logs (77) | namingAPI.js, sketch.js, MediaServiceWorker.js, main.js         | haiku |
| **Agent 4** | Clean console logs (66) | page.js, living-pantheon/_.js, media/\*\*/_.js                  | haiku |

### Console Statement Strategy

For each console statement:

1. **Remove** if purely debug (most cases)
2. **Keep** if error handling (console.error for user-facing errors)
3. **Keep** if service worker debugging (MediaServiceWorker.js - wrap in `DEBUG` check)

```javascript
// Pattern for keeping necessary logs
const DEBUG = false; // Set to true for development
if (DEBUG) console.log('Debug info');
```

---

## Verification Plan

### After Test Fixes

```bash
npm test -- --reporter=verbose 2>&1 | head -100
# Expected: 806 tests, 806 passing, 0 failing
```

### After Lint Fixes

```bash
npm run lint 2>&1 | tail -20
# Expected: 0 warnings, 0 errors
```

### Final Verification

```bash
npm run dev &  # Start server
# Manual test: Navigate through original site
# Manual test: Check Living Pantheon toggle (Ctrl+Shift+L)
```

---

## Critical Files

### Test Files

- `tests/unit/living-pantheon.test.js`
- `tests/unit/setup.js` (mocks)

### Source Files (Lint + Tests)

- `js/living-pantheon/LivingPantheonCore.js`
- `js/living-pantheon/GlobalGlitchSystem.js`
- `js/living-pantheon/AnimatedContentSystem.js`

### Lint-Only Files (Console Cleanup)

- `js/namingAPI.js` (31 warnings)
- `js/sketch.js` (20 warnings)
- `js/media/cache/MediaServiceWorker.js` (16 warnings)
- `js/main.js` (13 warnings)
- `js/page.js` (13 warnings)
- 15+ additional files with <10 warnings each

---

## Success Criteria

- [ ] All 806 tests passing (0 failures)
- [ ] 0 lint warnings
- [ ] Original site navigation works
- [ ] Living Pantheon toggle works (Ctrl+Shift+L)
- [ ] No console errors in browser
