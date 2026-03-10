# Absorb-Alchemize Project Analysis

## Project Overview

| Project               | Type             | Primary Purpose                                          | Tech Stack                          |
| --------------------- | ---------------- | -------------------------------------------------------- | ----------------------------------- |
| **audio-orb**         | Interactive Demo | Real-time voice AI with 3D audio visualization           | Lit + Three.js + Gemini Live Audio  |
| **gemini-ink-studio** | Creative Tool    | AI voice-controlled digital painting with fluid dynamics | React + Custom LBM Physics + Gemini |
| **p5js-playground**   | IDE/Playground   | AI-powered p5.js sketch generation via chat              | Lit + Gemini 2.5 Pro + p5.js        |
| **synthwave-space**   | Game Showcase    | AI-generated 3D arcade game demonstration                | React + Three.js + Gemini           |

---

## Feature Comparison Matrix

### Audio Capabilities

| Feature                |  audio-orb  | gemini-ink-studio | p5js-playground | synthwave-space |
| ---------------------- | :---------: | :---------------: | :-------------: | :-------------: |
| Real-time microphone   |     ✅      |        ✅         |       ❌        |       ❌        |
| Audio playback         |     ✅      |        ✅         |       ❌        |       ❌        |
| FFT analysis           | ✅ (32-bin) |        ❌         |       ❌        |       ❌        |
| Audio-reactive visuals |     ✅      |        ❌         |       ❌        |       ❌        |
| Voice AI interaction   |     ✅      |        ✅         |       ❌        |       ❌        |
| Web Audio API          |     ✅      |        ✅         |       ❌        |       ❌        |

### Visual/Graphics Capabilities

| Feature            |   audio-orb   | gemini-ink-studio | p5js-playground | synthwave-space |
| ------------------ | :-----------: | :---------------: | :-------------: | :-------------: |
| 3D rendering       |  ✅ Three.js  |        ❌         | ✅ p5.js WEBGL  |   ✅ Three.js   |
| 2D Canvas          |      ❌       |  ✅ LBM physics   |    ✅ p5.js     |       ❌        |
| Custom shaders     |    ✅ GLSL    |        ❌         | ⚠️ (generated)  | ✅ (generated)  |
| Post-processing    | ✅ Bloom/FXAA |        ❌         |       ❌        |    ✅ Bloom     |
| Particle systems   |      ✅       |        ❌         | ⚠️ (generated)  | ✅ (generated)  |
| Physics simulation |      ❌       | ✅ Fluid dynamics | ⚠️ (generated)  | ⚠️ (generated)  |

### AI/Gemini Integration

| Feature             |  audio-orb   | gemini-ink-studio | p5js-playground  | synthwave-space |
| ------------------- | :----------: | :---------------: | :--------------: | :-------------: |
| Gemini Live Audio   | ✅ 2.5 Flash |   ✅ 2.5 Flash    |        ❌        |       ❌        |
| Gemini Text API     |      ❌      |        ❌         |    ✅ 2.5 Pro    |  ✅ 2.5/3 Pro   |
| Voice commands      |      ✅      |  ✅ Tool calling  |        ❌        |       ❌        |
| Code generation     |      ❌      |   ✅ Sketch gen   | ✅ Full sketches |  ✅ Full games  |
| Streaming responses |      ✅      |        ✅         |        ✅        |  ❌ (one-shot)  |
| Error recovery      |      ❌      |        ❌         | ✅ AI debugging  |       ❌        |

### Platform & Architecture

| Feature          | audio-orb | gemini-ink-studio | p5js-playground |   synthwave-space   |
| ---------------- | :-------: | :---------------: | :-------------: | :-----------------: |
| Framework        |    Lit    |       React       |       Lit       |        React        |
| TypeScript       |    ✅     |        ✅         |       ✅        |         ✅          |
| Build tool       |   Vite    |       Vite        |      Vite       |        Vite         |
| Iframe sandbox   |    ❌     |        ❌         |       ✅        |         ✅          |
| Mobile support   |    ⚠️     |     ✅ Touch      |       ✅        | ✅ Virtual joystick |
| API key required | ✅ Gemini |     ✅ Gemini     |    ✅ Gemini    |      ✅ Gemini      |

### Unique Features

| Project               | Standout Capabilities                                                                  |
| --------------------- | -------------------------------------------------------------------------------------- |
| **audio-orb**         | Real-time voice conversation with AI, audio-reactive 3D sphere, dual input/output FFT  |
| **gemini-ink-studio** | Lattice Boltzmann fluid sim, CMY color model, voice-controlled painting, brush physics |
| **p5js-playground**   | Chat-based code generation, error→AI fix loop, extended thinking display               |
| **synthwave-space**   | Model comparison (2.5 vs 3), remix system, complete game generation                    |

---

## Detailed Project Breakdown

### audio-orb

**Real-time Voice AI with 3D Audio Visualization**

**Architecture:**

```
Microphone → MediaStreamSource → ScriptProcessor → Analyser (FFT)
                                       ↓
                               Gemini Live Audio API
                                       ↓
                               AI Voice Response → AudioBuffer → Speaker
                                       ↓
                               FFT Data → Three.js Shader Uniforms → 3D Sphere
```

**Key Components:**

- `index.tsx` - Main Lit component, Gemini connection, audio contexts
- `visual-3d.ts` - Three.js scene with icosahedron sphere + backdrop
- `sphere-shader.ts` - GLSL vertex shader with audio displacement
- `analyser.ts` - 32-bin FFT frequency extraction
- `utils.ts` - PCM ↔ Base64 audio encoding/decoding

**Technical Highlights:**

- Dual FFT analysis (input mic + output speaker)
- Post-processing: EffectComposer → BloomPass → FXAAPass
- EXR environment map for PBR reflections (1.8MB)
- Camera orbits based on audio input intensity

---

### gemini-ink-studio

**AI Voice-Controlled Digital Painting with Fluid Dynamics**

**Architecture:**

```
Voice Input → Gemini Live Audio → Tool Calling → UI State
                                                    ↓
Mouse/Touch → InkSimulation (LBM) → Canvas 2D → Display
```

**Key Components:**

- `App.tsx` - Main React component (800+ lines), state management
- `inkSimulation.ts` - Lattice Boltzmann Method physics engine
- `liveApi.ts` - Gemini voice connection with tool declarations
- `ControlPanel.tsx` - Tabbed settings UI

**Fluid Simulation Details:**

- D2Q9 lattice (9-direction velocity)
- CMY pigment transport (separate cyan/magenta/yellow channels)
- Paper fiber density affects ink absorption
- Fixed vs floating pigments (absorbed vs. moving)
- Configurable: viscosity, drying speed, paper resistance

**AI Tool Calling:**

- Brush parameters (size, water, ink, type)
- Paper settings (type, roughness, resolution)
- Color mixing (HSV adjustments)
- Sketch generation (AI draws pencil guides)
- Canvas operations (clear, undo, view toggle)

---

### p5js-playground

**AI-Powered p5.js IDE with Chat Interface**

**Architecture:**

```
User Prompt → Gemini 2.5 Pro (streaming) → Markdown + Code
                                              ↓
                                    Code Extraction → Sandboxed iframe
                                              ↓
                                    Runtime Errors → System Message → AI Fix
```

**Key Components:**

- `playground.tsx` - Main Lit element with chat + code tabs
- `index.html` - iframe template with p5.js CDN

**Notable Patterns:**

- Extended thinking mode for better reasoning
- Error recovery loop: error → "Improve" button → AI debugging
- Syntax highlighting with highlight.js + marked
- postMessage communication for play/stop/reload

**System Instruction:**

> "You're an extremely proficient creative coding agent... Write javascript code assuming it's in a live p5js environment..."

---

### synthwave-space

**AI-Generated 3D Arcade Game Showcase**

**Architecture:**

```
Prompt → Gemini (2.5 or 3 Pro) → Complete HTML Game
                                       ↓
                                 Sandboxed iframe
                                       ↓
                              Remix Request + Current HTML → Modified Game
```

**Key Components:**

- `index.tsx` - React app with model switcher + remix UI
- `init/gemini2p5.html` - Pre-generated game (2.5 Pro version)
- `init/gemini3.html` - Pre-generated game (3 Pro version)

**Generated Game Features:**

- Three.js scene with synthwave aesthetic
- Third-person spaceship controls (WASD/arrows)
- Laser firing (spacebar) + collision detection
- Particle effects on enemy destruction
- UnrealBloomPass for neon glow
- Mobile virtual joystick

**Remix System:**

- "Hyper Speed" - Faster gameplay
- "Vaporwave Filter" - Visual style change
- "God Mode" - Invincibility
- Custom remix prompts

---

## Use Case Recommendations

| Use Case                          | Recommended Project(s)        |
| --------------------------------- | ----------------------------- |
| Voice-controlled art installation | audio-orb + gemini-ink-studio |
| Audio-reactive 3D visuals         | audio-orb                     |
| Digital painting with physics     | gemini-ink-studio             |
| AI code generation IDE            | p5js-playground               |
| Game generation/prototyping       | synthwave-space               |
| Creative coding education         | p5js-playground               |
| Voice AI experimentation          | audio-orb, gemini-ink-studio  |
| Three.js + AI integration         | audio-orb, synthwave-space    |

---

# Deep Dive: Technical Details

## 1. audio-orb - Three.js Audio Visualization

### Audio Pipeline

```javascript
// Microphone capture
const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
const source = audioContext.createMediaStreamSource(stream);
const scriptProcessor = audioContext.createScriptProcessor(4096, 1, 1);

// FFT Analysis
const analyser = audioContext.createAnalyser();
analyser.fftSize = 64; // 32-bin output
source.connect(analyser);

// Get frequency data
const dataArray = new Uint8Array(analyser.frequencyBinCount);
analyser.getByteFrequencyData(dataArray);
```

### Sphere Shader (Audio-Reactive)

```glsl
// sphere-shader.ts - Vertex displacement based on audio
uniform float inputData[32];
uniform float outputData[32];
uniform float time;

void main() {
  // Map vertex position to frequency bin
  float theta = atan(position.y, position.x);
  float phi = acos(position.z / length(position));
  int bin = int(mod(theta * 5.0 + phi * 3.0, 32.0));

  // Displace vertex based on audio
  float displacement = inputData[bin] * 0.3 + outputData[bin] * 0.2;
  vec3 newPosition = position + normal * displacement * sin(time);

  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}
```

### Post-Processing Setup

```javascript
const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));
composer.addPass(
  new UnrealBloomPass(
    new THREE.Vector2(width, height),
    1.5, // strength
    0.4, // radius
    0.85 // threshold
  )
);
```

---

## 2. gemini-ink-studio - Lattice Boltzmann Fluid

### D2Q9 Lattice Configuration

```javascript
// 9 velocity directions for 2D fluid
const D2Q9 = {
  velocities: [
    [0, 0], // rest
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1], // cardinal
    [1, 1],
    [-1, 1],
    [-1, -1],
    [1, -1], // diagonal
  ],
  weights: [4 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 36, 1 / 36, 1 / 36, 1 / 36],
};
```

### Collision Step (BGK)

```javascript
// Relaxation toward equilibrium
for (let i = 0; i < 9; i++) {
  const feq = weights[i] * rho * (1 + 3*u·e[i] + 4.5*(u·e[i])² - 1.5*u²);
  f[i] = f[i] - (f[i] - feq) / tau;  // tau = viscosity
}
```

### Pigment Transport (CMY)

```javascript
// Each pigment channel advected separately
cyanFixed[x][y] += cyanFloating[x][y] * dryingRate;
cyanFloating[x][y] *= 1 - dryingRate;
cyanFloating[x][y] += advection(cyanFloating, velocity);
```

### Voice Tool Calling

```javascript
const tools = [
  {
    name: 'set_brush_size',
    description: 'Set the brush diameter',
    parameters: { size: { type: 'number', min: 1, max: 100 } },
  },
  {
    name: 'generate_sketch',
    description: 'AI draws a pencil guide from description',
    parameters: { description: { type: 'string' } },
  },
];

// Gemini responds with tool calls
session.on('toolCall', ({ name, args }) => {
  toolHandler[name](args);
});
```

---

## 3. p5js-playground - AI Code Generation

### Streaming Response Handler

```javascript
const response = await model.generateContentStream({
  contents: [{ role: 'user', parts: [{ text: prompt }] }],
  generationConfig: {
    thinkingConfig: { thinkingBudget: 1024 },
  },
});

for await (const chunk of response.stream) {
  const text = chunk.text();
  messageDiv.innerHTML = marked.parse(text);

  // Extract code from markdown
  const code = getCode(text);
  if (code) updateIframe(code);
}
```

### Error Recovery Loop

```javascript
// iframe posts runtime errors to parent
window.addEventListener('message', e => {
  if (e.data.type === 'error') {
    addSystemMessage(`Error: ${e.data.message}`);
    showImproveButton(() => {
      const fixPrompt = `Fix this error: ${e.data.message}\n\nCurrent code:\n${currentCode}`;
      sendToGemini(fixPrompt);
    });
  }
});
```

### Sandboxed Execution

```html
<!-- iframe template -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.3/p5.min.js"></script>
<script>
  try {
    // User code injected here
    ${generatedCode}
  } catch (e) {
    parent.postMessage({ type: 'error', message: e.message }, '*');
  }
</script>
```

---

## 4. synthwave-space - Game Generation

### Prompt Engineering for Games

```javascript
const gamePrompt = `
Create a complete 3D synthwave space shooter game in a single HTML file.

Requirements:
- Three.js for 3D rendering
- Third-person spaceship with WASD/arrow controls
- Spacebar to fire lasers
- Enemy ships that approach player
- Particle effects on destruction
- Neon synthwave aesthetic (magenta, cyan, purple)
- UnrealBloomPass for glow effects
- Mobile virtual joystick support
- Score tracking

Return ONLY the complete HTML file, no explanations.
`;
```

### Remix System

```javascript
async function remixGame(option) {
  const remixPrompts = {
    hyper: 'Make the game 3x faster - ships, lasers, enemies',
    vaporwave: 'Change aesthetic to vaporwave - pastel colors, greek statues',
    godmode: 'Player cannot die, unlimited ammo, auto-aim',
  };

  const response = await model.generateContent({
    contents: [
      {
        role: 'user',
        parts: [
          {
            text: `
        Current game HTML:
        ${currentHtml}

        Modification request:
        ${remixPrompts[option]}

        Return the modified HTML.
      `,
          },
        ],
      },
    ],
  });

  updateIframe(response.text());
}
```

### Parent-iframe Communication

```javascript
// Pause game when modal opens
useEffect(() => {
  if (iframeRef.current) {
    iframeRef.current.contentWindow.postMessage(
      { type: 'PAUSE_GAME', payload: showModal },
      '*'
    );
  }
}, [showModal]);

// Game listens for pause
window.addEventListener('message', e => {
  if (e.data.type === 'PAUSE_GAME') {
    isPaused = e.data.payload;
  }
});
```

---

# ETCETER4 Compatibility Reference

## Current Project Stack

| Component       | Technology            | Location                  |
| --------------- | --------------------- | ------------------------- |
| 3D Rendering    | Three.js 0.160.0      | ogod-3d.html, js/3d/      |
| Audio Synthesis | Tone.js 14.8.49       | OGODAudioEngine.js        |
| Audio Playback  | Howler.js             | audioPlayer.js            |
| Audio Analysis  | AudioAnalyzerBridge   | js/audioAnalyzerBridge.js |
| Generative Art  | p5.js                 | js/sketches/              |
| UI Framework    | jQuery + Global Scope | js/page.js, js/main.js    |
| UI Sounds       | SoundJS               | js/uiSounds.js            |

## Compatibility Summary

| Project               | Web Compatible | Reusable Components                        | Integration Effort |
| --------------------- | -------------- | ------------------------------------------ | ------------------ |
| **audio-orb**         | ✅ Direct      | Three.js scene, FFT analyser, GLSL shaders | Low                |
| **gemini-ink-studio** | ✅ Direct      | InkSimulation class, Gemini Live client    | Medium             |
| **p5js-playground**   | ✅ Direct      | Code generation patterns, iframe sandbox   | Low                |
| **synthwave-space**   | ✅ Direct      | Game generation prompts, remix system      | Low                |

---

## Integration Notes by Project

### audio-orb

**Reusable for:** Voice-controlled experiences, audio-reactive 3D visuals

**Extractable Components:**
| Component | File | What It Does |
|-----------|------|--------------|
| 3D Visualizer | `visual-3d.ts` | Three.js scene with audio-reactive sphere |
| FFT Analyser | `analyser.ts` | 32-bin frequency extraction |
| Sphere Shader | `sphere-shader.ts` | GLSL vertex displacement |
| Audio Utils | `utils.ts` | PCM ↔ Base64 conversion |
| Gemini Client | `index.tsx` | Live audio streaming setup |

**Integration Pattern:**

```javascript
// Standalone usage (remove Lit dependency)
const scene = new THREE.Scene();
const sphere = createAudioReactiveSphere(scene);
const analyser = createAnalyser(audioContext);

function animate() {
  const freqData = analyser.getFrequencyData();
  sphere.material.uniforms.audioData.value = freqData;
  requestAnimationFrame(animate);
}
```

**Considerations:**

- EXR environment map is 1.8MB (cache or replace)
- Gemini API: ~$0.08-0.30/min voice
- Lit web components use Shadow DOM (encapsulated)

---

### gemini-ink-studio

**Reusable for:** Fluid simulations, digital painting, physics-based art

**Extractable Components:**
| Component | File | What It Does |
|-----------|------|--------------|
| Fluid Engine | `inkSimulation.ts` | Lattice Boltzmann D2Q9 physics |
| Voice Client | `liveApi.ts` | Gemini tool calling integration |
| Brush System | (in App.tsx) | Pressure-sensitive input handling |

**Integration Pattern:**

```javascript
// Framework-agnostic fluid simulation
const sim = new InkSimulation(512, 512, {
  viscosity: 0.6,
  dryingRate: 0.001,
  paperType: 'rice',
});

canvas.addEventListener('pointermove', e => {
  if (e.buttons) {
    sim.addInput(e.offsetX, e.offsetY, velocity, e.pressure, currentColor);
  }
});

function animate() {
  sim.step();
  sim.render();
  requestAnimationFrame(animate);
}
```

**Considerations:**

- CMY color model (different from RGB)
- Performance scales with resolution (256/512/1024)
- React state management tightly coupled - needs extraction

---

### p5js-playground

**Reusable for:** AI code generation, creative coding tools, sandboxed execution

**Extractable Components:**
| Component | File | What It Does |
|-----------|------|--------------|
| Chat UI | `playground.tsx` | Streaming message display |
| Code Parser | `playground.tsx` | Extract JS from markdown |
| Sandbox | (iframe template) | Isolated p5.js execution |
| Error Loop | (message handler) | Runtime error → AI fix |

**Integration Pattern:**

```javascript
// Code generation without UI
async function generateSketch(prompt) {
  const response = await gemini.generateContentStream({
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
    systemInstruction: 'Write p5.js code. Return only code block.',
  });

  let code = '';
  for await (const chunk of response.stream) {
    code += chunk.text();
  }

  return extractCodeFromMarkdown(code);
}

// Execute in sandbox
const iframe = document.createElement('iframe');
iframe.srcdoc = `<script src="p5.min.js"></script><script>${code}</script>`;
```

**Considerations:**

- Gemini 2.5 Pro with extended thinking
- iframe sandbox for safe code execution
- postMessage for play/stop/error communication

---

### synthwave-space

**Reusable for:** AI game generation, Three.js scene generation, remix systems

**Extractable Components:**
| Component | File | What It Does |
|-----------|------|--------------|
| Game Prompts | `index.tsx` | Complete game generation prompt |
| Remix System | `index.tsx` | Modify existing HTML via AI |
| Model Switcher | `index.tsx` | Compare 2.5 vs 3 Pro outputs |
| Pre-built Games | `init/*.html` | Working Three.js games |

**Integration Pattern:**

```javascript
// Generate Three.js scene
const scenePrompt = `
Create a Three.js scene with:
- ${visualStyle} aesthetic
- Audio-reactive elements
- Post-processing bloom
Return complete HTML with inline JS.
`;

const response = await gemini.generateContent(scenePrompt);
const html = cleanMarkdown(response.text());

// Load in iframe
iframe.srcdoc = html;

// Remix existing
async function remix(currentHtml, modification) {
  const response = await gemini.generateContent({
    contents: [{ text: `Modify: ${modification}\n\nCurrent:\n${currentHtml}` }],
  });
  return cleanMarkdown(response.text());
}
```

**Considerations:**

- One-shot generation (not streaming)
- Pre-generated games work offline
- Parent ↔ iframe pause/resume protocol

---

## Quick Reference

### Immediate Use (No Modification)

| Project         | How to Use                         | Location                                 |
| --------------- | ---------------------------------- | ---------------------------------------- |
| p5js-playground | Embed via iframe or run standalone | `absorb-alchemize/p5js-playground/`      |
| synthwave-space | Host HTML files or embed games     | `absorb-alchemize/synthwave-space/init/` |

### Requires Extraction

| Project           | Component                     | Effort                      |
| ----------------- | ----------------------------- | --------------------------- |
| audio-orb         | Three.js visualizer + shaders | Low - remove Lit wrapper    |
| audio-orb         | Gemini Live Audio client      | Low - standalone class      |
| gemini-ink-studio | InkSimulation engine          | Medium - extract from React |
| gemini-ink-studio | Voice tool calling            | Low - adapt liveApi.ts      |

---

## API Requirements

| Service                       | Used By                      | Cost Estimate         |
| ----------------------------- | ---------------------------- | --------------------- |
| Gemini Live Audio (2.5 Flash) | audio-orb, gemini-ink-studio | ~$0.08-0.30/min voice |
| Gemini Text (2.5 Pro)         | p5js-playground              | ~$0.00125/1K tokens   |
| Gemini Text (3 Pro Preview)   | synthwave-space              | ~$0.00125/1K tokens   |

**API Key Setup:**

```bash
# All projects use .env.local
echo "GEMINI_API_KEY=your_key_here" > .env.local
```

---

## File Inventory

### absorb-alchemize/audio-orb/

```
├── index.html          # Entry point
├── index.tsx           # Main Lit component + Gemini connection
├── visual-3d.ts        # Three.js scene (sphere + backdrop)
├── visual.ts           # 2D canvas fallback (unused)
├── sphere-shader.ts    # GLSL vertex displacement
├── backdrop-shader.ts  # Procedural noise environment
├── analyser.ts         # FFT frequency extraction
├── utils.ts            # Audio encoding utilities
├── vite.config.ts      # Build config
└── public/piz_compressed.exr  # PBR environment map (1.8MB)
```

### absorb-alchemize/gemini-ink-studio/

```
├── index.html          # Entry point
├── index.tsx           # React bootstrap
├── App.tsx             # Main component (800+ lines)
├── types.ts            # TypeScript interfaces
├── defaultConfig.ts    # Simulation defaults
├── services/
│   ├── inkSimulation.ts    # Lattice Boltzmann physics
│   └── liveApi.ts          # Gemini voice + tool calling
└── components/
    ├── ControlPanel.tsx    # Settings UI
    ├── VoiceStatus.tsx     # Mic button
    └── SettingsPill.tsx    # Collapsed settings
```

### absorb-alchemize/p5js-playground/

```
├── index.html          # Entry point + iframe template
├── index.tsx           # Lit setup
├── playground.tsx      # Chat UI + code execution
├── index.css           # Styling
└── vite.config.ts      # Build config
```

### absorb-alchemize/synthwave-space/

```
├── index.html          # Entry point
├── index.tsx           # React app + remix UI
├── vite.config.ts      # Build config
└── init/
    ├── gemini2p5.html  # Pre-generated game (2.5 Pro)
    └── gemini3.html    # Pre-generated game (3 Pro)
```

---

## Future Integration Ideas

| Idea                                | Projects Involved                 | Notes                                   |
| ----------------------------------- | --------------------------------- | --------------------------------------- |
| Voice-controlled visual experiences | audio-orb + Tone.js               | Real-time conversation with AI narrator |
| Audio-reactive fluid painting       | gemini-ink-studio + AudioAnalyzer | Sound drives ink parameters             |
| AI-generated ETCETER4 content       | p5js-playground                   | Generate new sketches on demand         |
| Custom Three.js environments        | synthwave-space prompts           | Generate track-specific visuals         |
| Offline game collection             | synthwave-space init/             | Host pre-generated games                |

---

## Running Projects Locally

```bash
# Navigate to any project
cd absorb-alchemize/audio-orb

# Install dependencies
npm install

# Add API key
echo "GEMINI_API_KEY=your_key" > .env.local

# Run dev server
npm run dev
# Opens at http://localhost:3000
```

All projects use Vite and follow the same pattern.
