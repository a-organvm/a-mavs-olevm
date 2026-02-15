'use strict';

/**
 * PinakothekeChamber - Gallery chamber controller with lightbox
 */
const PinakothekeChamber = (function () {
  let currentItems = [];
  let currentIndex = 0;
  let lightboxOpen = false;

  // DOM references
  const elements = {};

  /**
   * Initialize the chamber
   */
  function initialize() {
    cacheElements();
    setupEventListeners();
    renderGallery(PINAKOTHEKE_CONFIG.items || []);
    initializeLivingPantheon();
  }

  /**
   * Cache DOM elements
   */
  function cacheElements() {
    elements.gallery = document.getElementById('chamber-items');
    elements.sectionBtns = document.querySelectorAll('.section-nav-btn');
    elements.lightbox = document.getElementById('gallery-lightbox');
    elements.lightboxImage = document.getElementById('lightbox-image');
    elements.lightboxTitle = document.getElementById('lightbox-title');
    elements.lightboxCategory = document.getElementById('lightbox-category');
    elements.lightboxDescription = document.getElementById(
      'lightbox-description'
    );
    elements.lightboxCounter = document.getElementById('lightbox-counter');
    elements.closeBtn = elements.lightbox?.querySelector('.lightbox-close');
    elements.prevBtn = elements.lightbox?.querySelector('.lightbox-prev');
    elements.nextBtn = elements.lightbox?.querySelector('.lightbox-next');
  }

  /**
   * Setup all event listeners
   */
  function setupEventListeners() {
    // Section navigation
    elements.sectionBtns.forEach(btn => {
      btn.addEventListener('click', handleSectionClick);
    });

    // Lightbox controls
    if (elements.closeBtn) {
      elements.closeBtn.addEventListener('click', closeLightbox);
    }
    if (elements.prevBtn) {
      elements.prevBtn.addEventListener('click', showPrevImage);
    }
    if (elements.nextBtn) {
      elements.nextBtn.addEventListener('click', showNextImage);
    }

    // Click outside to close
    if (elements.lightbox) {
      elements.lightbox.addEventListener('click', function (e) {
        if (
          e.target === elements.lightbox ||
          e.target.classList.contains('lightbox-content')
        ) {
          closeLightbox();
        }
      });
    }

    // Keyboard navigation
    document.addEventListener('keydown', handleKeydown);
  }

  /**
   * Handle section button click
   */
  function handleSectionClick() {
    const section = this.dataset.section;

    elements.sectionBtns.forEach(b => b.classList.remove('active'));
    this.classList.add('active');

    const allItems = PINAKOTHEKE_CONFIG.items || [];
    const filtered =
      section === 'all'
        ? allItems
        : allItems.filter(item => item.section === section);

    renderGallery(filtered);
  }

  /**
   * Render gallery items
   */
  function renderGallery(items) {
    currentItems = items;

    if (!elements.gallery) {
      return;
    }

    if (items.length === 0) {
      elements.gallery.innerHTML = `
        <div class="tc pa5 w-100">
          <p class="f5 pinakotheke-text">No items in this collection</p>
        </div>
      `;
      return;
    }

    elements.gallery.innerHTML = items
      .map((item, index) => createGalleryItem(item, index))
      .join('');
    attachGalleryListeners();
  }

  /**
   * Create gallery item HTML
   */
  function createGalleryItem(item, index) {
    return `
      <div class="gallery-item ${item.section || 'all'}" data-index="${index}" tabindex="0" role="button" aria-label="View ${escapeHtml(item.title)}">
        <div class="gallery-item-wrapper">
          <img src="${escapeHtml(item.thumbnail || item.image)}" alt="${escapeHtml(item.title)}" loading="lazy" />
          <div class="gallery-overlay">
            <h3 class="f5 tracked mb2">${escapeHtml(item.title)}</h3>
            <p class="f7 o-80">${escapeHtml(item.category)}</p>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Attach click listeners to gallery items
   */
  function attachGalleryListeners() {
    elements.gallery.querySelectorAll('.gallery-item').forEach(item => {
      item.addEventListener('click', function () {
        const index = parseInt(this.dataset.index, 10);
        openLightbox(index);
      });
      item.addEventListener('keypress', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const index = parseInt(this.dataset.index, 10);
          openLightbox(index);
        }
      });
    });
  }

  /**
   * Open lightbox at specific index
   */
  function openLightbox(index) {
    if (!elements.lightbox || currentItems.length === 0) {
      return;
    }

    currentIndex = index;
    lightboxOpen = true;
    elements.lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    updateLightboxContent();

    // Focus trap
    elements.closeBtn?.focus();
  }

  /**
   * Close lightbox
   */
  function closeLightbox() {
    if (!elements.lightbox) {
      return;
    }

    lightboxOpen = false;
    elements.lightbox.style.display = 'none';
    document.body.style.overflow = '';

    // Return focus to the gallery item
    const item = elements.gallery?.querySelector(
      `[data-index="${currentIndex}"]`
    );
    item?.focus();
  }

  /**
   * Show previous image
   */
  function showPrevImage() {
    if (currentItems.length === 0) {
      return;
    }
    currentIndex =
      (currentIndex - 1 + currentItems.length) % currentItems.length;
    updateLightboxContent();
  }

  /**
   * Show next image
   */
  function showNextImage() {
    if (currentItems.length === 0) {
      return;
    }
    currentIndex = (currentIndex + 1) % currentItems.length;
    updateLightboxContent();
  }

  /**
   * Update lightbox content for current index
   */
  function updateLightboxContent() {
    const item = currentItems[currentIndex];
    if (!item) {
      return;
    }

    // Show loading state
    elements.lightboxImage.style.opacity = '0.5';

    // Update image
    const fullImage = item.fullImage || item.image;
    elements.lightboxImage.onload = function () {
      elements.lightboxImage.style.opacity = '1';
    };
    elements.lightboxImage.src = fullImage;
    elements.lightboxImage.alt = item.title;

    // Update info
    if (elements.lightboxTitle) {
      elements.lightboxTitle.textContent = item.title;
    }
    if (elements.lightboxCategory) {
      elements.lightboxCategory.textContent = item.category || '';
    }
    if (elements.lightboxDescription) {
      elements.lightboxDescription.textContent = item.description || '';
    }
    if (elements.lightboxCounter) {
      elements.lightboxCounter.textContent = `${currentIndex + 1} / ${currentItems.length}`;
    }

    // Update nav button visibility
    if (elements.prevBtn) {
      elements.prevBtn.style.visibility =
        currentItems.length > 1 ? 'visible' : 'hidden';
    }
    if (elements.nextBtn) {
      elements.nextBtn.style.visibility =
        currentItems.length > 1 ? 'visible' : 'hidden';
    }
  }

  /**
   * Handle keyboard navigation
   */
  function handleKeydown(e) {
    if (!lightboxOpen) {
      return;
    }

    switch (e.key) {
      case 'Escape':
        closeLightbox();
        break;
      case 'ArrowLeft':
        e.preventDefault();
        showPrevImage();
        break;
      case 'ArrowRight':
        e.preventDefault();
        showNextImage();
        break;
    }
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
          chamberId: 'pinakotheke',
          chamberColor: '#FF00FF',
        })
        .start();
    }
  }

  return {
    initialize,
    openLightbox,
    closeLightbox,
  };
})();

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', function () {
  PinakothekeChamber.initialize();
});
