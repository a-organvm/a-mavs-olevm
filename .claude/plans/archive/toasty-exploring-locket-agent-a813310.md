# WaveformVisualizer.js Implementation Plan

## Objective

Create a Canvas-based waveform visualization component at `/Users/4jp/Workspace/a-mavs-olevm/js/media/audio/WaveformVisualizer.js`

## Context & Configuration

### Project Structure

- ETCETER4: Custom SPA without build step, JavaScript runs directly in browser
- Uses global scope for cross-file communication
- Code style: ES6+, strict mode, JSDoc comments, no var
- Configuration centralized in `/Users/4jp/Workspace/a-mavs-olevm/js/config.js`

### Waveform Config (from ETCETER4_CONFIG.media.audio.waveform)

Located at lines 486-494 of config.js:

```javascript
waveform: {
  height: 80,
  barWidth: 2,
  barGap: 1,
  primaryColor: '#00FFFF',      // Cyan
  secondaryColor: '#FF00FF',    // Magenta
  progressColor: '#FFFFFF',     // White
  backgroundColor: 'transparent',
}
```

### Related Code Patterns

1. **AudioAnalyzerBridge** - Provides frequency band data (bass, mid, treble, overall)
2. **AudioAnalyzer** - FFT analyzer with frequency ranges
3. **JSDoc Documentation** - All files use comprehensive JSDoc headers and method documentation
4. **Class Structure** - Modern ES6 classes with strict JSDoc typing

## Implementation Requirements

### Constructor Options

```javascript
WaveformVisualizer(options) where:
- container: DOM element or selector for canvas parent
- waveformData: Array of amplitude values (0-1)
- interactive: boolean to enable click-to-seek
- colors: optional color override object
```

### Public Methods

1. **render(waveformData)**
   - Draw waveform from amplitude array
   - Accept array of normalized values (0-1)
   - Update display on requestAnimationFrame

2. **setProgress(percent)**
   - Update playback position indicator
   - percent: 0-100
   - Draw semi-transparent overlay showing playback progress

3. **resize()**
   - Handle container resize events
   - Recalculate canvas dimensions
   - Redraw current state

4. **dispose()**
   - Clean up resources
   - Remove event listeners
   - Clear canvas references

### Features to Implement

1. **Canvas Rendering**
   - Bars visualization (barWidth: 2px, barGap: 1px)
   - Dynamic height calculation from config (80px)
   - Smooth rendering at requestAnimationFrame

2. **Click-to-Seek**
   - Clickable canvas area
   - Calculate seek position from click coordinates
   - Emit 'seek' event with percent (0-100)

3. **Hover Time Tooltip**
   - Show time at hover position
   - Format: MM:SS based on total duration
   - Display duration metadata requirement

4. **Progress Indicator**
   - Vertical line or fill showing current playback position
   - Updates via setProgress(percent)
   - Uses progressColor (#FFFFFF)

5. **Color System**
   - Primary: #00FFFF (cyan) for unplayed bars
   - Secondary: #FF00FF (magenta) for alternate effect
   - Progress: #FFFFFF (white) for playback position
   - Background: transparent

### Technical Details

1. **Event System**
   - Emit custom 'seek' event with detail: { percent, time }
   - Allow event listeners for integration with player
   - Follow DOM event patterns

2. **Canvas Management**
   - DPI-aware scaling for retina displays
   - Responsive to container resizes
   - Memory efficient (single canvas element)

3. **State Management**
   - Track current waveform data
   - Track playback progress
   - Cache computed values

### Code Style Compliance

- 'use strict' at top
- const over let, never var
- Arrow functions for callbacks
- Template literals over concatenation
- === and !== strictly
- Always use curly braces
- Expose as window.WaveformVisualizer global
- Comprehensive JSDoc comments
- Descriptive method names (verbNoun pattern)

## File Location

`/Users/4jp/Workspace/a-mavs-olevm/js/media/audio/WaveformVisualizer.js`

## Dependencies

- None (vanilla JavaScript, uses HTML5 Canvas API)
- No external libraries required
- Integrates with ETCETER4_CONFIG via window global

## Integration Points

1. **Config Integration**: Read from ETCETER4_CONFIG.media.audio.waveform
2. **Audio Integration**: Accept waveform data arrays from audio analyzer
3. **Event System**: Emit 'seek' events for player integration
4. **Global Exposure**: window.WaveformVisualizer for cross-file access

## Deliverable

Complete, production-ready JavaScript file with:

- Full JSDoc documentation
- All required methods
- Event system
- Responsive canvas rendering
- Color configuration support
- Error handling and validation
