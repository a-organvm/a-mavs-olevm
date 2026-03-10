# Absorb-Alchemize Integration Plan

## Executive Summary

This plan outlines how to integrate components from the four absorb-alchemize projects into ETCETER4's existing codebase. The focus is on extracting reusable audio-reactive, visualization, and AI-powered components while maintaining compatibility with ETCETER4's global-scope SPA architecture.

---

## Project Analysis

### Source Projects

| Project               | Key Components                                       | Integration Value                      |
| --------------------- | ---------------------------------------------------- | -------------------------------------- |
| **audio-orb**         | 3D audio-reactive sphere, FFT analyzer, GLSL shaders | High - Direct audio-visual integration |
| **gemini-ink-studio** | Lattice Boltzmann fluid sim, voice AI tools          | Medium - Standalone creative tool      |
| **p5js-playground**   | AI code generation, sandboxed execution              | High - Sketch generation for ETCETER4  |
| **synthwave-space**   | Three.js game generation, remix system               | Medium - Pre-built games as content    |

### Target Integration Points in ETCETER4

| Component       | Location                         | Current Tech              |
| --------------- | -------------------------------- | ------------------------- |
| Audio Analysis  | `js/audioAnalyzerBridge.js`      | Howler.js + Web Audio API |
| 3D Environments | `js/3d/ogod/environments/`       | Three.js                  |
| Audio Engine    | `js/3d/ogod/OGODAudioEngine.js`  | Tone.js                   |
| Scene Manager   | `js/3d/ogod/OGODSceneManager.js` | Three.js                  |
| p5.js Sketches  | `js/sketches/`                   | p5.js                     |

---

## Phase 1: Audio-Orb Component Extraction

### 1.1 Extract FFT Analyzer Class

**Source:** `absorb-alchemize/audio-orb/analyser.ts`

**Target:** `js/3d/audio/FFTAnalyzer.js`

The audio-orb analyzer is simpler than ETCETER4's existing AudioAnalyzerBridge but uses a different approach (direct node connection vs Howler.js bridge). We'll create a unified analyzer that supports both approaches.

```javascript
// js/3d/audio/FFTAnalyzer.js
// Extracted from audio-orb with modifications for ETCETER4
class FFTAnalyzer {
  constructor(audioNode, options = {}) {
    this.fftSize = options.fftSize || 32;
    this.analyser = audioNode.context.createAnalyser();
    this.analyser.fftSize = this.fftSize;
    this.bufferLength = this.analyser.frequencyBinCount;
    this.dataArray = new Uint8Array(this.bufferLength);
    audioNode.connect(this.analyser);
  }

  update() {
    this.analyser.getByteFrequencyData(this.dataArray);
  }

  get data() {
    return this.dataArray;
  }

  // Vector4 output for shader uniforms (matches audio-orb format)
  getVector4() {
    return {
      x: this.dataArray[0] / 255,
      y: this.dataArray[1] / 255,
      z: this.dataArray[2] / 255,
      w: this.dataArray[3] / 255,
    };
  }
}
```

### 1.2 Extract Sphere Shader

**Source:** `absorb-alchemize/audio-orb/sphere-shader.ts`

**Target:** `js/3d/shaders/audioReactiveSphere.glsl.js`

The sphere shader uses Three.js's `#include` directives for standard material chunks. We'll preserve this pattern for compatibility.

```javascript
// js/3d/shaders/audioReactiveSphere.glsl.js
const audioReactiveSphereVert = `#define STANDARD
varying vec3 vViewPosition;
// ... full shader code from sphere-shader.ts

uniform float time;
uniform vec4 inputData;
uniform vec4 outputData;

vec3 calc(vec3 pos) {
  vec3 dir = normalize(pos);
  vec3 p = dir + vec3(time, 0., 0.);
  return pos +
    1. * inputData.x * inputData.y * dir * (.5 + .5 * sin(inputData.z * pos.x + time)) +
    1. * outputData.x * outputData.y * dir * (.5 + .5 * sin(outputData.z * pos.y + time));
}
// ...
`;
```

### 1.3 Create AudioReactiveSphere Environment

**Target:** `js/3d/ogod/environments/AudioOrbEnv.js`

```javascript
// New environment extending EnvironmentBase
class AudioOrbEnvironment extends EnvironmentBase {
  constructor(options) {
    super(options);
    this.inputAnalyzer = null;
    this.outputAnalyzer = null;
  }

  async initialize() {
    // Create icosahedron sphere with audio-reactive shader
    const geometry = new THREE.IcosahedronGeometry(1, 10);
    const material = new THREE.MeshStandardMaterial({
      color: 0x000010,
      metalness: 0.5,
      roughness: 0.1,
      emissive: 0x000010,
      emissiveIntensity: 1.5,
    });

    material.onBeforeCompile = shader => {
      shader.uniforms.time = { value: 0 };
      shader.uniforms.inputData = { value: new THREE.Vector4() };
      shader.uniforms.outputData = { value: new THREE.Vector4() };
      shader.vertexShader = audioReactiveSphereVert;
      material.userData.shader = shader;
    };

    this.sphere = new THREE.Mesh(geometry, material);
    this.sceneManager.add(this.sphere);
  }

  update(delta, audioData) {
    if (this.sphere.material.userData.shader && audioData) {
      const shader = this.sphere.material.userData.shader;
      shader.uniforms.time.value += delta * 0.1;
      shader.uniforms.inputData.value.set(
        audioData.bass || 0,
        audioData.mid || 0,
        audioData.treble || 0,
        0
      );
    }
  }
}
```

### 1.4 Tasks

1. Create `js/3d/audio/FFTAnalyzer.js` - Extract analyzer class
2. Create `js/3d/shaders/audioReactiveSphere.glsl.js` - Extract shader
3. Create `js/3d/ogod/environments/AudioOrbEnv.js` - New environment
4. Update `OGODSceneManager.js` - Add 'audio-orb' archetype case
5. Add environment to `config.js` - Track mapping for audio-orb

---

## Phase 2: Ink Simulation Integration

### 2.1 Extract InkSimulation Engine

**Source:** `absorb-alchemize/gemini-ink-studio/services/inkSimulation.ts`

**Target:** `js/creative/InkSimulation.js`

The Lattice Boltzmann fluid simulation is framework-agnostic. We'll convert TypeScript to JavaScript and remove React dependencies.

```javascript
// js/creative/InkSimulation.js
// Lattice Boltzmann D2Q9 fluid simulation
// Extracted from gemini-ink-studio

const BrushType = {
  ROUND: 'round',
  FLAT: 'flat',
  SUMI: 'sumi',
  SPRAY: 'spray',
  WATER: 'water',
};

const PaperType = {
  RICE: 'rice',
  CANVAS: 'canvas',
  WATERCOLOR: 'watercolor',
  SMOOTH: 'smooth',
};

class InkSimulation {
  constructor(width, height) {
    this.w = width;
    this.h = height;
    this.size = width * height;
    // ... rest of constructor from inkSimulation.ts
  }

  // ... all methods converted to JS
}

window.InkSimulation = InkSimulation;
window.BrushType = BrushType;
window.PaperType = PaperType;
```

### 2.2 Create Standalone Ink Studio Page

**Target:** `creative/ink-studio.html`

Create a new HTML page for the ink studio that can be loaded via iframe or as a standalone experience.

```html
<!-- creative/ink-studio.html -->
<!DOCTYPE html>
<html>
  <head>
    <title>Ink Studio | ETCETER4</title>
    <script src="../js/creative/InkSimulation.js"></script>
  </head>
  <body>
    <canvas id="inkCanvas"></canvas>
    <script>
      const sim = new InkSimulation(512, 512);
      // ... initialization and event handlers
    </script>
  </body>
</html>
```

### 2.3 Tasks

1. Create `js/creative/InkSimulation.js` - Convert TypeScript to JavaScript
2. Create `creative/ink-studio.html` - Standalone ink studio page
3. Create `js/creative/inkStudioControls.js` - UI controls (non-React)
4. Add page to `pageData.js` - Navigation integration
5. Update ESLint config for new files

---

## Phase 3: p5.js Playground Integration

### 3.1 Create AI Sketch Generator

**Source:** `absorb-alchemize/p5js-playground/playground.tsx`

**Target:** `js/creative/aiSketchGenerator.js`

Extract the code generation and sandboxed execution pattern.

```javascript
// js/creative/aiSketchGenerator.js
// AI-powered p5.js sketch generation
// Requires Gemini API key

class AISketchGenerator {
  constructor(options = {}) {
    this.apiKey = options.apiKey;
    this.targetFrame = options.targetFrame; // iframe element
    this.onCodeGenerated = options.onCodeGenerated || (() => {});
    this.onError = options.onError || (() => {});
  }

  async generateSketch(prompt, existingCode = '') {
    // Gemini API call with system instruction
    const systemPrompt = `You're a creative coding agent. Write javascript code
    assuming it's in a live p5js environment. Use setup() and draw().
    Return only the code, no markdown.`;

    // ... API call implementation
  }

  runCode(code) {
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.3/p5.min.js"></script>
      </head>
      <body>
        <script>
          try { ${code} } catch(e) {
            parent.postMessage(JSON.stringify({error: e.toString()}), '*');
          }
        </script>
      </body>
      </html>
    `;
    this.targetFrame.srcdoc = html;
  }
}

window.AISketchGenerator = AISketchGenerator;
```

### 3.2 Create Playground Page

**Target:** `creative/p5-playground.html`

```html
<!-- creative/p5-playground.html -->
<!DOCTYPE html>
<html>
  <head>
    <title>p5.js Playground | ETCETER4</title>
    <link rel="stylesheet" href="../css/vendor/tachyons.min.css" />
    <link rel="stylesheet" href="../css/playground.css" />
  </head>
  <body>
    <div id="playground">
      <div id="chat"></div>
      <iframe id="preview"></iframe>
    </div>
    <script src="../js/creative/aiSketchGenerator.js"></script>
    <script src="../js/creative/playgroundUI.js"></script>
  </body>
</html>
```

### 3.3 Tasks

1. Create `js/creative/aiSketchGenerator.js` - Code generation class
2. Create `js/creative/playgroundUI.js` - Chat and code editor UI
3. Create `creative/p5-playground.html` - Playground page
4. Create `css/playground.css` - Styling
5. Add page to navigation

---

## Phase 4: Synthwave Space Game Integration

### 4.1 Host Pre-Generated Games

**Source:** `absorb-alchemize/synthwave-space/init/*.html`

**Target:** `games/synthwave/`

The pre-generated games can be hosted directly as static content.

```
games/
├── synthwave/
│   ├── gemini2p5.html  (copy from init/)
│   ├── gemini3.html    (copy from init/)
│   └── index.html      (game selector)
```

### 4.2 Create Game Selector Page

**Target:** `games/synthwave/index.html`

```html
<!-- games/synthwave/index.html -->
<!DOCTYPE html>
<html>
  <head>
    <title>Synthwave Space | ETCETER4</title>
  </head>
  <body>
    <div id="selector">
      <h1>Synthwave Space</h1>
      <p>AI-Generated 3D Games</p>
      <button onclick="loadGame('gemini2p5')">Gemini 2.5 Pro</button>
      <button onclick="loadGame('gemini3')">Gemini 3 Pro</button>
    </div>
    <iframe id="game"></iframe>
    <script>
      function loadGame(version) {
        document.getElementById('game').src = `./${version}.html`;
        document.getElementById('selector').style.display = 'none';
      }
    </script>
  </body>
</html>
```

### 4.3 Tasks

1. Copy game files to `games/synthwave/`
2. Create `games/synthwave/index.html` - Game selector
3. Add page to navigation
4. Optional: Add remix capability via Gemini API

---

## Phase 5: Unified Audio-Reactive Bridge

### 5.1 Enhance AudioAnalyzerBridge

Merge capabilities from audio-orb's analyzer into the existing bridge.

**Target:** Modify `js/audioAnalyzerBridge.js`

```javascript
// Add to existing AudioAnalyzerBridge class

/**
 * Get data in Vector4 format for shader uniforms
 * Compatible with audio-orb shader format
 * @returns {Object} {x, y, z, w} normalized values
 */
getShaderVector4() {
  if (!this.isConnected || !this.dataArray) {
    return { x: 0, y: 0, z: 0, w: 0 };
  }
  return {
    x: this.smoothBands.bass,
    y: this.smoothBands.mid,
    z: this.smoothBands.treble,
    w: this.smoothBands.overall
  };
}

/**
 * Connect to any AudioNode (not just Howler)
 * @param {AudioNode} node - Web Audio API node
 */
connectToNode(node) {
  if (this.isConnected) {
    this.disconnect();
  }

  try {
    const ctx = node.context;
    this.analyser = ctx.createAnalyser();
    this.analyser.fftSize = this.fftSize;
    this.analyser.smoothingTimeConstant = 0.8;
    node.connect(this.analyser);
    this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
    this.isConnected = true;
    return true;
  } catch (error) {
    console.error('AudioAnalyzerBridge: Node connection error:', error);
    return false;
  }
}
```

### 5.2 Tasks

1. Update `js/audioAnalyzerBridge.js` - Add Vector4 output and node connection
2. Update shader files to use unified audio format
3. Test with both Howler.js and direct Web Audio sources

---

## Phase 6: Gemini Voice Integration (Optional)

### 6.1 Create Voice AI Client

**Source:** `absorb-alchemize/gemini-ink-studio/services/liveApi.ts`

**Target:** `js/ai/GeminiVoiceClient.js`

```javascript
// js/ai/GeminiVoiceClient.js
// Gemini Live Audio client for voice interactions
// Requires @google/genai library

class GeminiVoiceClient {
  constructor(options = {}) {
    this.apiKey = options.apiKey;
    this.onStatusChange = options.onStatusChange || (() => {});
    this.toolHandler = options.toolHandler || {};
    // ... initialization
  }

  async connect() {
    // ... connection logic from liveApi.ts
  }

  disconnect() {
    // ... cleanup
  }
}

window.GeminiVoiceClient = GeminiVoiceClient;
```

### 6.2 Tasks

1. Create `js/ai/GeminiVoiceClient.js` - Voice client class
2. Create tool handlers for ETCETER4 actions
3. Add voice control UI component
4. Document API key requirements

---

## Implementation Order

| Phase | Description              | Priority | Dependencies |
| ----- | ------------------------ | -------- | ------------ |
| 1     | Audio-Orb Components     | High     | None         |
| 2     | Ink Simulation           | Medium   | None         |
| 3     | p5.js Playground         | High     | None         |
| 4     | Synthwave Games          | Low      | None         |
| 5     | Audio Bridge Enhancement | High     | Phase 1      |
| 6     | Voice Integration        | Low      | Gemini API   |

---

## File Manifest

### New Files to Create

```
js/
├── 3d/
│   ├── audio/
│   │   └── FFTAnalyzer.js
│   ├── shaders/
│   │   └── audioReactiveSphere.glsl.js
│   └── ogod/
│       └── environments/
│           └── AudioOrbEnv.js
├── creative/
│   ├── InkSimulation.js
│   ├── inkStudioControls.js
│   ├── aiSketchGenerator.js
│   └── playgroundUI.js
└── ai/
    └── GeminiVoiceClient.js

creative/
├── ink-studio.html
└── p5-playground.html

games/
└── synthwave/
    ├── index.html
    ├── gemini2p5.html
    └── gemini3.html

css/
├── ink-studio.css
└── playground.css
```

### Files to Modify

```
js/
├── audioAnalyzerBridge.js  (add Vector4 output, node connection)
├── pageData.js            (add new pages)
└── 3d/
    └── ogod/
        └── OGODSceneManager.js  (add audio-orb archetype)

config.js                   (add track configurations)
eslint.config.js           (add new globals)
index.html                 (optional: add script tags)
```

---

## Testing Strategy

1. **Unit Tests** - Add tests for InkSimulation, FFTAnalyzer
2. **Visual Tests** - Manual verification of shader effects
3. **Integration Tests** - E2E tests for new pages
4. **API Tests** - Mock Gemini API for playground/voice features

---

## Estimated Effort

| Phase     | Files  | Complexity | Estimated Hours |
| --------- | ------ | ---------- | --------------- |
| 1         | 4      | Medium     | 4-6             |
| 2         | 4      | High       | 6-8             |
| 3         | 4      | Medium     | 4-6             |
| 4         | 3      | Low        | 2-3             |
| 5         | 2      | Medium     | 2-3             |
| 6         | 3      | High       | 6-8             |
| **Total** | **20** |            | **24-34**       |

---

## Risk Assessment

| Risk                   | Impact | Mitigation                           |
| ---------------------- | ------ | ------------------------------------ |
| Gemini API costs       | Medium | Implement usage limits, caching      |
| Performance (LBM sim)  | High   | Offer resolution options, throttling |
| Browser compatibility  | Medium | Test WebGL/Web Audio support         |
| Global scope conflicts | Low    | Use namespaced objects               |

---

## Open Questions

1. Should the Gemini API key be user-provided or server-proxied?
2. Should ink-studio and p5-playground be iframe-embedded or full pages?
3. Which OGOD tracks should use the new audio-orb environment?
4. Should synthwave games be integrated with OGOD audio engine?
