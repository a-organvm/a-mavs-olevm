'use strict';

// Chamber initialization and section navigation
document.addEventListener('DOMContentLoaded', function () {
  // Initialize Living Pantheon if available
  if (
    typeof LivingPantheonCore !== 'undefined' &&
    typeof akademiaConfig !== 'undefined'
  ) {
    if (
      akademiaConfig.livingPantheon &&
      akademiaConfig.livingPantheon.enabled
    ) {
      LivingPantheonCore.getInstance()
        .initialize({
          chamberId: 'akademia',
          chamberColor: '#00FFFF',
        })
        .start();
    }
  }

  // Section navigation
  const sectionBtns = document.querySelectorAll('.akademia-section-btn');
  sectionBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      const sectionId = this.getAttribute('data-section');

      // Update active button
      sectionBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      // Update content visibility
      const sections = document.querySelectorAll('.akademia-content-section');
      sections.forEach(section => {
        section.classList.add('dn');
      });

      const targetSection = document.getElementById(sectionId + '-content');
      if (targetSection) {
        targetSection.classList.remove('dn');
      }
    });
  });
});
