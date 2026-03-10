─────┬──────────────────────────────────────────────────────────────────────────
│ STDIN
─────┼──────────────────────────────────────────────────────────────────────────
1 │ # Plan: Create LivingPantheonCore.js Singleton
2 │
3 │ ## Overview
4 │ Create the central orchestrator singleton for Living Pantheon generative features at:
5 │ `/Users/4jp/Workspace/a-mavs-olevm/js/living-pantheon/LivingPantheonCore.js`
6 │
7 │ ## Requirements Analysis
8 │
9 │ ### Core Pattern
10 │ - **Singleton Pattern**: Single static instance via `getInstance()`
11 │ - **Strict Mode**: Use `'use strict'` at top
12 │ - **Global Export**: Expose as `window.LivingPantheonCore`
13 │ - **JSDoc Comments**: Complete API documentation
14 │
15 │ ### Initialization Logic
16 │ 1. Check `ETCETER4_CONFIG.livingPantheon.enabled` flag
17 │ 2. Load user preference from localStorage key: `'etceter4-living-pantheon-enabled'`
18 │ 3. Check `prefers-reduced-motion` media query and respect it
19 │ 4. Initialize on page load if enabled
20 │
21 │ ### Lifecycle Methods
22 │ - `initialize()` - Setup and validation
23 │ - `start()` - Begin active features
24 │ - `stop()` - Pause features
25 │ - `dispose()` - Cleanup resources
26 │
27 │ ### Keyboard Shortcut
28 │ - **Ctrl+Shift+L**: Toggle Living Pantheon on/off
29 │ - Respect `allowUserToggle` config setting
30 │
31 │ ### Accessibility
32 │ - Respect `accessibility.respectReducedMotion` from config
33 │ - Use matchMedia listener for `prefers-reduced-motion`
34 │ - Honor user preference overrides
35 │
36 │ ### Chamber-Specific Support
37 │ - Support initialization for specific chambers
38 │ - Track active chambers
39 │
40 │ ### Config Structure
41 │ Expected from `ETCETER4_CONFIG.livingPantheon`:
42 │ `javascript
  43 │ {
  44 │   enabled: true,
  45 │   glitch: { /* subsystem config */ },
  46 │   morphing: { /* subsystem config */ },
  47 │   ambient: { /* subsystem config */ },
  48 │   animation: { /* subsystem config */ },
  49 │   accessibility: {
  50 │     respectReducedMotion: true,
  51 │     allowUserToggle: true,
  52 │     storageKey: 'etceter4-living-pantheon-enabled'
  53 │   }
  54 │ }
  55 │ `
56 │
57 │ ## Implementation Steps
58 │
59 │ ### Phase 1: Singleton Structure
60 │ - Private constructor
61 │ - Static `_instance` variable
62 │ - Static `getInstance()` method
63 │ - Instance property initialization
64 │
65 │ ### Phase 2: State Management
66 │ - Current enabled/disabled state
67 │ - Active chambers tracking
68 │ - Motion preference tracking
69 │ - Event listeners registration
70 │
71 │ ### Phase 3: Lifecycle Methods
72 │ - `initialize()`: Validate config, setup listeners
73 │ - `start()`: Enable features
74 │ - `stop()`: Disable features
75 │ - `dispose()`: Cleanup all listeners
76 │
77 │ ### Phase 4: Keyboard & Preferences
78 │ - Setup Ctrl+Shift+L listener
79 │ - localStorage persistence
80 │ - Media query listener for `prefers-reduced-motion`
81 │ - Dynamic toggle based on accessibility settings
82 │
83 │ ### Phase 5: Chamber Support
84 │ - Track chamber-specific initialization
85 │ - Expose chamber init methods
86 │ - Maintain chamber state
87 │
88 │ ### Phase 6: Auto-initialization
89 │ - Hook into page ready event (check existing patterns in `js/main.js`)
90 │ - Conditional init based on ETCETER4_CONFIG
91 │
92 │ ## Code Quality
93 │ - No external dependencies except existing globals (window, localStorage, matchMedia)
94 │ - Error handling for missing config
95 │ - Graceful degradation if features unavailable
96 │ - Logging for debugging (console.debug/warn)
97 │
98 │ ## Testing Points
99 │ - Singleton instantiation consistency
100 │ - Config validation and fallbacks
101 │ - Preference persistence in localStorage
102 │ - Keyboard shortcut functionality
103 │ - Media query listener updates
104 │ - Lifecycle method sequencing
105 │ - Chamber-specific operations
106 │ - Page unload cleanup
107 │
108 │ ## Integration Points
109 │ - Check if `ETCETER4_CONFIG` already exists in codebase
110 │ - Verify page load hook pattern (check `js/main.js`)
111 │ - Confirm event listener patterns used elsewhere
112 │ - Match error handling style of project
─────┴──────────────────────────────────────────────────────────────────────────
─────┬──────────────────────────────────────────────────────────────────────────
│ STDIN
─────┼──────────────────────────────────────────────────────────────────────────
1 │
2 │ ## Codebase Analysis Complete
3 │
4 │ ### Key Findings
5 │
6 │ #### Config Structure (config.js)
7 │ - `ETCETER4_CONFIG` is a large global object defined with 'use strict'
8 │ - livingPantheon config exists at lines 585-696 with all required fields:
9 │ - `enabled: true`
10 │ - `glitch`, `morphing`, `ambient`, `animation` subsystems
11 │ - `accessibility` with `respectReducedMotion`, `allowUserToggle`, `storageKey`
12 │ - Chamber-specific ambient tracks in `ambient.chamberTracks`
13 │
14 │ #### Existing Patterns (main.js & GlobalGlitchSystem.js)
15 │ - `'use strict'` at file top
16 │ - JSDoc comments with @file, @description, @class, @param, @returns
17 │ - Global scope communication via `window.*` objects
18 │ - Event listeners with `window.addEventListener()`
19 │ - Page initialization on `$(document).ready()` in main.js
20 │ - Lifecycle patterns: start/stop/dispose
21 │
22 │ #### GlobalGlitchSystem.js Style
23 │ - Constructor takes options object with defaults from ETCETER4_CONFIG
24 │ - Merges user options with config using Object.assign
25 │ - Instance properties for state tracking
26 │ - Private methods use `_methodName` convention
27 │ - Error handling with try/catch
28 │
29 │ #### Integration Points
30 │ 1. **Page initialization**: main.js uses `$(document).ready())` pattern
31 │ 2. **Global exports**: Expose via `window.LivingPantheonCore`
32 │ 3. **Config access**: Via `ETCETER4_CONFIG.livingPantheon`
33 │ 4. **Event listeners**: Pattern established in main.js and GlobalGlitchSystem.js
34 │
35 │ ### Implementation Details
36 │
37 │ #### Singleton Pattern
38 │ - Private constructor
39 │ - Static `_instance` variable
40 │ - Static `getInstance()` method with initialization check
41 │ - Private `_initialize()` method
42 │
43 │ #### State Properties
44 │ - `_isEnabled` - Current enable/disable state
45 │ - `_isRunning` - Whether features are actively running
46 │ - `_activeChambers` - Set of active chamber IDs
47 │ - `_prefersReducedMotion` - Cached media query state
48 │ - `_mediaQueryListener` - Reference to media query listener
49 │ - `_keyboardListener` - Reference to keyboard event listener
50 │ - `_config` - Reference to ETCETER4_CONFIG.livingPantheon
51 │
52 │ #### Methods Structure
53 │ - `initialize()` - Validate config, setup listeners, register shortcuts
54 │ - `start()` - Enable all features (glitch, morphing, ambient, animation)
55 │ - `stop()` - Disable all features
56 │ - `dispose()` - Cleanup and remove listeners
57 │ - `isEnabled()` - Getter for enabled state
58 │ - `toggleEnabled()` - Toggle based on accessibility settings
59 │ - `initializeChamber(chamberId)` - Load chamber-specific ambient
60 │ - `_loadUserPreference()` - From localStorage
61 │ - `_saveUserPreference()` - To localStorage
62 │ - `_setupMediaQueryListener()` - Watch prefers-reduced-motion
63 │ - `_setupKeyboardListener()` - Listen for Ctrl+Shift+L
64 │ - `_updateReducedMotionState()` - Called on media query change
65 │ - Private helpers for feature management
66 │
67 │ #### Keyboard Shortcut Details
68 │ From config (line 694): `{ ctrl: true, shift: true, key: 'l' }`
69 │ Implementation:
70 │ `javascript
  71 │ // In _setupKeyboardListener
  72 │ const event = {
  73 │   ctrlKey: config.accessibility.toggleShortcut.ctrl,
  74 │   shiftKey: config.accessibility.toggleShortcut.shift,
  75 │   key: config.accessibility.toggleShortcut.key
  76 │ }
  77 │ // Check event.ctrlKey && event.shiftKey && event.key.toLowerCase() === 'l'
  78 │ `
79 │
80 │ #### localStorage Integration
81 │ - Key: from `config.accessibility.storageKey` (default: 'etceter4-living-pantheon-enabled')
82 │ - Value: 'true' or 'false' string
83 │ - Load on initialize if `allowUserToggle` is true
84 │ - Save when toggled
85 │
86 │ #### Media Query Handling
87 │ `javascript
  88 │ const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  89 │ mediaQuery.addEventListener('change', (e) => {
  90 │   this._prefersReducedMotion = e.matches;
  91 │   if (this._config.accessibility.respectReducedMotion) {
  92 │     this._updateReducedMotionState();
  93 │   }
  94 │ });
  95 │ `
96 │
97 │ #### Chamber-Specific Init
98 │ - Called via `initializeChamber(chamberId)`
99 │ - Tracks in `_activeChambers` Set
100 │ - References chamber-specific ambient track from config
101 │ - Future: Will integrate with ambient audio system
102 │
103 │ ### Code Quality Notes
104 │ - No external dependencies (only browser globals)
105 │ - Graceful degradation if config missing
106 │ - Error handling with console.warn for issues
107 │ - Logging with console.debug for state changes
108 │ - Proper listener cleanup in dispose()
109 │ - Comments explain "why", not "what"
110 │
111 │ ### Testing Checklist
112 │ - [ ] getInstance() returns same instance on multiple calls
113 │ - [ ] Config validation handles missing livingPantheon config
114 │ - [ ] Media query listener fires on OS preference change
115 │ - [ ] localStorage preference persists across page reloads
116 │ - [ ] Keyboard shortcut Ctrl+Shift+L works
117 │ - [ ] allowUserToggle restricts keyboard toggle
118 │ - [ ] respectReducedMotion prevents animation subsystems
119 │ - [ ] Lifecycle: initialize → start → stop → dispose works
120 │ - [ ] Chamber init tracks active chambers
121 │ - [ ] Window.LivingPantheonCore is accessible from browser console
122 │ - [ ] Proper cleanup on dispose() (no memory leaks)
123 │
─────┴──────────────────────────────────────────────────────────────────────────
