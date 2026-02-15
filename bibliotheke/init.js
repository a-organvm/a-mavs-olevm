'use strict';

// Bibliotheke chamber initialization
document.addEventListener('DOMContentLoaded', function () {
  // Section navigation
  document.querySelectorAll('.bibliotheke-section-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      const section = this.dataset.section;

      // Hide all sections
      document.querySelectorAll('.bibliotheke-content-section').forEach(sec => {
        sec.classList.add('dn');
      });

      // Show selected section
      document.getElementById(section + '-section').classList.remove('dn');

      // Update button states
      document.querySelectorAll('.bibliotheke-section-btn').forEach(b => {
        b.classList.remove('active');
      });
      this.classList.add('active');
    });
  });

  // Activate first button by default
  const firstBtn = document.querySelector('.bibliotheke-section-btn');
  if (firstBtn) {
    firstBtn.click();
  }

  // Initialize Living Pantheon if available
  if (
    typeof LivingPantheonCore !== 'undefined' &&
    ETCETER4_CONFIG.livingPantheon?.enabled
  ) {
    LivingPantheonCore.getInstance()
      .initialize({
        chamberId: 'bibliotheke',
        chamberColor: '#8B4513',
      })
      .start();
  }
});
