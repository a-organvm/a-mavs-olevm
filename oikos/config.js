/**
 * @file oikos/config.js
 * @description OIKOS chamber configuration
 * Metadata for reflections, dreams, and confessions sections
 */
'use strict';
/**
 * @global {Object} OIKOS_CONFIG - Oikos chamber configuration
 */
// eslint-disable-next-line no-unused-vars
const OIKOS_CONFIG = {
  /**
   * Chamber identification and display
   */
  chamber: {
    id: 'oikos',
    name: 'OIKOS',
    subtitle: 'Reflections, dreams, confessions',
    description:
      'The intimate chamber of personal reflection, unconscious exploration, and honest confession',
    color: '#FF8C00',
    secondaryColor: '#FFB6C1',
    darkColor: '#CC7000',
    lightColor: '#FFD9B3',
  },
  /**
   * Sections configuration
   * Each section has metadata and entry management settings
   */
  sections: {
    reflections: {
      id: 'reflections',
      name: 'REFLECTIONS',
      icon: '◇',
      description: 'Conscious observations and meditations',
      color: '#FF8C00',
      entryCount: 0,
      sortOrder: 'desc', // Most recent first
      dateFormat: 'MMDDYY',
      storageKey: 'oikos-reflections',
    },
    dreams: {
      id: 'dreams',
      name: 'DREAMS',
      icon: '◐',
      description: 'Nocturnal visions and subconscious narratives',
      color: '#FFB6C1',
      entryCount: 0,
      sortOrder: 'desc',
      dateFormat: 'MMDDYY',
      storageKey: 'oikos-dreams',
    },
    confessions: {
      id: 'confessions',
      name: 'CONFESSIONS',
      icon: '◆',
      description: 'Honest admissions and vulnerable truths',
      color: '#FFD9B3',
      entryCount: 0,
      sortOrder: 'desc',
      dateFormat: 'MMDDYY',
      storageKey: 'oikos-confessions',
    },
  },
  /**
   * Entry display and formatting
   */
  entries: {
    // Maximum characters per entry preview
    previewLength: 300,
    // Character limit for full entry display
    maxLength: 50000,
    // Whether to show timestamps
    showTimestamp: true,
    // Date display format (MMDDYY or YYYY-MM-DD)
    dateDisplay: 'MMDDYY',
    // Truncation indicator
    truncationMarker: '…',
    // Show entry count per section
    showCounts: true,
    // Enable entry search
    searchEnabled: true,
  },
  /**
   * Storage configuration
   * How entries are persisted and managed
   */
  storage: {
    // Use localStorage for entries
    enabled: true,
    // Sync to server endpoint (optional)
    syncEnabled: false,
    syncEndpoint: '/api/chambers/oikos/entries',
    // Backup frequency in milliseconds (24 hours)
    backupInterval: 86400000,
    // Maximum stored entries per section
    maxEntriesPerSection: 1000,
  },
  /**
   * Animation and UI settings
   */
  ui: {
    // Fade in duration for entries (ms)
    fadeInDuration: 500,
    // Transition between sections (ms)
    transitionDuration: 300,
    // Show/hide animation easing
    easing: 'easeInOutQuad',
    // Card hover effects
    hoverEffects: true,
    // Glow intensity on hover
    glowIntensity: 0.3,
  },
  /**
   * Privacy and security
   */
  privacy: {
    // Whether entries are private by default
    private: true,
    // Allow sharing of individual entries
    allowSharing: false,
    // Encrypt stored entries (client-side)
    encryptionEnabled: false,
    // Auto-lock after inactivity (minutes)
    autoLockTimeout: 30,
  },
  /**
   * Metadata for entry templates
   */
  entryTemplate: {
    reflections: {
      prompt: 'What clarity emerged today?',
      placeholder: 'Record your observation...',
    },
    dreams: {
      prompt: 'What did your unconscious reveal?',
      placeholder: 'Describe your dream...',
    },
    confessions: {
      prompt: 'What truth do you need to speak?',
      placeholder: 'Write your confession...',
    },
  },
};
