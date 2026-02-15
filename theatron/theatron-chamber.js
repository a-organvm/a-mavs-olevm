'use strict';

/**
 * TheatronChamber - Video performance chamber controller
 */
const TheatronChamber = (function () {
  let videoPlayer = null;
  let currentVideo = null;
  let currentSection = 'performances';

  /**
   * Initialize the chamber
   */
  function initialize() {
    setupVideoPlayer();
    setupSectionNavigation();
    renderPerformanceCards('performances');
    renderPerformanceCards('rehearsals');
    initializeLivingPantheon();
  }

  /**
   * Setup the EnhancedVideoPlayer
   */
  function setupVideoPlayer() {
    const container = document.getElementById('theatron-video-container');
    if (!container) {
      return;
    }

    videoPlayer = new EnhancedVideoPlayer({
      container: container,
      hlsSupport: true,
      controls: true,
      fullscreen: true,
      volume: THEATRON_CONFIG.videoPlayer?.defaultVolume || 0.8,
    });

    // Event listeners
    videoPlayer.on('qualitiesavailable', handleQualitiesAvailable);
    videoPlayer.on('qualitychange', handleQualityChange);
    videoPlayer.on('ended', handleVideoEnded);
    videoPlayer.on('error', handleVideoError);

    // Setup quality selector
    const qualitySelect = document.getElementById('quality-select');
    if (qualitySelect) {
      qualitySelect.addEventListener('change', function () {
        videoPlayer.setQuality(this.value === 'auto' ? -1 : this.value);
      });
    }
  }

  /**
   * Handle available qualities
   */
  function handleQualitiesAvailable(data) {
    const selector = document.getElementById('quality-selector');
    const select = document.getElementById('quality-select');
    if (!selector || !select || !data.qualities) {
      return;
    }

    select.innerHTML = '<option value="auto">Auto</option>';
    data.qualities.forEach(q => {
      const option = document.createElement('option');
      option.value = q.index;
      option.textContent = q.name;
      select.appendChild(option);
    });

    selector.style.display = 'flex';
  }

  /**
   * Handle quality change
   */
  function handleQualityChange(data) {
    const select = document.getElementById('quality-select');
    if (select && data.levelIndex !== undefined) {
      select.value = data.levelIndex === -1 ? 'auto' : data.levelIndex;
    }
  }

  /**
   * Handle video ended
   */
  function handleVideoEnded() {
    // Could auto-play next video or show recommendations
  }

  /**
   * Handle video errors
   */
  function handleVideoError(data) {
    console.error('Video playback error:', data.error);
  }

  /**
   * Setup section navigation
   */
  function setupSectionNavigation() {
    const sectionBtns = document.querySelectorAll('.theatron-section-btn');
    const sections = document.querySelectorAll('.theatron-section');

    sectionBtns.forEach(btn => {
      btn.addEventListener('click', function () {
        const targetSection = this.dataset.section;
        currentSection = targetSection;

        sectionBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        sections.forEach(section => {
          section.classList.remove('active');
        });
        document
          .getElementById(targetSection + '-section')
          .classList.add('active');
      });
    });
  }

  /**
   * Render performance cards for a section
   */
  function renderPerformanceCards(section) {
    const container = document.getElementById('chamber-items-' + section);
    if (!container) {
      return;
    }

    const items = THEATRON_CONFIG[section] || [];

    if (items.length === 0) {
      container.innerHTML = `
        <div class="theatron-placeholder">
          <p class="theatron-text f6 tracked-mega">${section === 'performances' ? 'Performance' : 'Rehearsal'} recordings coming soon</p>
          <p class="white-60 f7">Stage documentation and video archives</p>
        </div>
      `;
      return;
    }

    container.innerHTML = items
      .map(item => createPerformanceCard(item))
      .join('');
    attachCardListeners(container);
  }

  /**
   * Create a performance card HTML
   */
  function createPerformanceCard(item) {
    const thumbUrl =
      item.thumbnail ||
      MediaURLResolver.resolve(item.id + '/thumb.jpg', 'video');
    return `
      <div class="performance-card theatron-dramatic pa3 br2 pointer" data-video-id="${escapeHtml(item.id)}" tabindex="0" role="button" aria-label="Play ${escapeHtml(item.title)}">
        <div class="performance-thumbnail aspect-ratio aspect-ratio--16x9 mb2 relative overflow-hidden br2">
          <img src="${thumbUrl}" alt="${escapeHtml(item.title)}" loading="lazy" class="aspect-ratio--object cover" onerror="this.style.display='none'">
          <div class="play-overlay absolute absolute--fill flex items-center justify-center bg-black-50 o-0 hover-o-100 transition-opacity">
            <span class="f2 theatron-text">&#9654;</span>
          </div>
          ${item.duration ? `<span class="duration absolute bottom-0 right-0 bg-black-70 white f7 pa1 ma1 br1">${escapeHtml(item.duration)}</span>` : ''}
        </div>
        <div class="performance-info">
          <h4 class="f5 theatron-text-light tracked mb1 truncate">${escapeHtml(item.title)}</h4>
          <p class="f7 white-60 mb0">${escapeHtml(item.venue || '')}${item.venue && item.year ? ' \u00b7 ' : ''}${item.year || ''}</p>
        </div>
      </div>
    `;
  }

  /**
   * Attach click listeners to cards
   */
  function attachCardListeners(container) {
    container.querySelectorAll('.performance-card').forEach(card => {
      const handler = function () {
        const videoId = this.dataset.videoId;
        const items = [
          ...(THEATRON_CONFIG.performances || []),
          ...(THEATRON_CONFIG.rehearsals || []),
        ];
        const videoData = items.find(v => v.id === videoId);
        if (videoData) {
          playVideo(videoData);
        }
      };

      card.addEventListener('click', handler);
      card.addEventListener('keypress', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handler.call(this);
        }
      });
    });
  }

  /**
   * Play a video
   */
  function playVideo(videoData) {
    if (!videoPlayer) {
      return;
    }

    currentVideo = videoData;

    // Show the video section
    const playerSection = document.getElementById('video-player-section');
    if (playerSection) {
      playerSection.style.display = 'block';
      playerSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // Resolve video URL
    const videoUrl = MediaURLResolver.resolveVideo(videoData.id, 'auto');

    // Load with options
    videoPlayer.load(videoUrl, {
      chapters: videoData.chapters || [],
      subtitles: videoData.subtitles || [],
      posterUrl: videoData.thumbnail || null,
    });

    // Update info display
    updateVideoInfo(videoData);

    // Auto-play
    videoPlayer.play().catch(err => {
      // Autoplay may be blocked - user can click play
    });
  }

  /**
   * Update video info display
   */
  function updateVideoInfo(videoData) {
    const titleEl = document.getElementById('video-title');
    const metaEl = document.getElementById('video-meta');
    const descEl = document.getElementById('video-description');
    const chaptersEl = document.getElementById('video-chapters');
    const chaptersList = document.getElementById('chapters-list');

    if (titleEl) {
      titleEl.textContent = videoData.title;
    }
    if (metaEl) {
      const parts = [];
      if (videoData.venue) {
        parts.push(videoData.venue);
      }
      if (videoData.year) {
        parts.push(videoData.year);
      }
      if (videoData.duration) {
        parts.push(videoData.duration);
      }
      metaEl.textContent = parts.join(' \u00b7 ');
    }
    if (descEl) {
      descEl.textContent = videoData.description || '';
    }

    // Render chapters
    if (
      chaptersEl &&
      chaptersList &&
      videoData.chapters &&
      videoData.chapters.length > 0
    ) {
      chaptersList.innerHTML = videoData.chapters
        .map(
          (ch, i) => `
          <li class="chapter-item pv1 pointer hover-theatron" data-chapter-index="${i}" tabindex="0">
            <span class="f7 white-40 mr2">${formatTime(ch.time)}</span>
            <span class="f7 white-80">${escapeHtml(ch.title)}</span>
          </li>
        `
        )
        .join('');

      // Attach chapter click handlers
      chaptersList.querySelectorAll('.chapter-item').forEach(item => {
        item.addEventListener('click', function () {
          const index = parseInt(this.dataset.chapterIndex, 10);
          videoPlayer.goToChapter(index);
        });
      });

      chaptersEl.style.display = 'block';
    } else if (chaptersEl) {
      chaptersEl.style.display = 'none';
    }
  }

  /**
   * Format seconds to mm:ss
   */
  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  /**
   * Escape HTML special characters
   */
  function escapeHtml(str) {
    if (!str) {
      return '';
    }
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  /**
   * Initialize Living Pantheon
   */
  function initializeLivingPantheon() {
    if (
      typeof LivingPantheonCore !== 'undefined' &&
      ETCETER4_CONFIG.livingPantheon?.enabled
    ) {
      LivingPantheonCore.getInstance()
        .initialize({
          chamberId: 'theatron',
          chamberColor: '#da70d6',
        })
        .start();
    }
  }

  return {
    initialize,
    playVideo,
  };
})();

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', function () {
  TheatronChamber.initialize();
});
