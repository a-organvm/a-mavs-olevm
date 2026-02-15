'use strict';

// Chamber initialization
document.addEventListener('DOMContentLoaded', function () {
  // Initialize Living Pantheon if available
  if (
    typeof LivingPantheonCore !== 'undefined' &&
    ETCETER4_CONFIG.livingPantheon?.enabled
  ) {
    LivingPantheonCore.getInstance()
      .initialize({
        chamberId: 'khronos',
        chamberColor: '#4169E1',
      })
      .start();
  }

  // Initialize Khronos timeline
  if (typeof KhronosTimeline !== 'undefined') {
    KhronosTimeline.initialize(KHRONOS_CONFIG);
  }
});
