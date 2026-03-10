# Enhanced Audio Player Implementation Plan

## Objective

Create `/Users/4jp/Workspace/a-mavs-olevm/js/media/audio/EnhancedAudioPlayer.js` - a complete audio player class using Howler.js to replace Bandcamp embeds.

## Requirements Analysis

### Class Structure

- Constructor: `EnhancedAudioPlayer(options)` where options include:
  - `container`: DOM element or selector for player UI
  - `tracks`: Array of track objects
  - `autoplay`: Boolean (default: false)
  - `loop`: Boolean (default: false)
  - `shuffle`: Boolean (default: false)

### Core Methods

1. `load(track)` - Load a specific track
2. `play()` - Start playback
3. `pause()` - Pause playback
4. `stop()` - Stop and reset
5. `next()` - Play next track
6. `previous()` - Play previous track
7. `seek(time)` - Jump to specific time
8. `setVolume(vol)` - Set volume (0-1)

### Features

- Track queue management
- Crossfade between tracks (1000ms default from config)
- Event system: play, pause, stop, ended, timeupdate, error
- Keyboard controls:
  - Space: play/pause
  - Arrow keys: seek left/right, volume up/down
- Integration with ETCETER4_CONFIG.media.audio settings

### Technical Details

- Use Howler.js API: `new Howl({src, volume, onplay, onend})`
- Use 'use strict' mode
- Use JSDoc for all public methods
- Expose as `window.EnhancedAudioPlayer` for global access
- Follow ETCETER4 code patterns (const/let, arrow functions, template literals)

## Code Structure

### File Organization

- JSDoc header with @file, @description, @requires
- 'use strict' declaration
- Global Howler check (`/* global Howler */`)
- EnhancedAudioPlayer class
- Event emitter pattern
- Keyboard listener setup
- Module export to window global

### Configuration Integration

- Use `ETCETER4_CONFIG.media.audio`:
  - `crossfadeDuration`: 1000ms
  - `defaultVolume`: 0.8
  - `fadeOutDuration`: 500ms
  - `fadeInDuration`: 500ms
  - `formatPriority`: ['mp3', 'flac', 'ogg']

### Event System

- Simple event emitter with `on()` and `emit()` methods
- Supported events: 'play', 'pause', 'stop', 'ended', 'timeupdate', 'error'
- Event listeners stored in `this.events` object

## Implementation Steps

1. Create file with proper header and strict mode
2. Implement EnhancedAudioPlayer class constructor
3. Add track management (queue, current index)
4. Implement core playback methods (play, pause, stop, load)
5. Implement navigation methods (next, previous, seek)
6. Add volume control (setVolume)
7. Implement event emitter pattern (on, emit)
8. Add keyboard listener setup
9. Add crossfade logic
10. Expose to window global
11. Export class

## Files to Check

- `/Users/4jp/Workspace/a-mavs-olevm/js/config.js` - Configuration structure
- `/Users/4jp/Workspace/a-mavs-olevm/js/audioPlayer.js` - Existing audio player for reference
- `/Users/4jp/Workspace/a-mavs-olevm/js/audioAnalyzerBridge.js` - Howler.js usage patterns

## Configuration Available

From ETCETER4_CONFIG.media.audio:

- formatPriority: ['mp3', 'flac', 'ogg']
- previewDuration: 30
- crossfadeDuration: 1000
- defaultVolume: 0.8
- fadeOutDuration: 500
- fadeInDuration: 500
- waveform: { height: 80, barWidth: 2, barGap: 1, colors... }

## Status

Ready to implement when user approves.
