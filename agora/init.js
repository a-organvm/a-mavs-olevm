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
        chamberId: 'agora',
        chamberColor: '#DC143C',
      })
      .start();
  }
  // Initialize Agora functionality
  if (typeof AgoraUI !== 'undefined') {
    AgoraUI.init();
  }
});
