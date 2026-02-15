'use strict';

// Chamber initialization
document.addEventListener('DOMContentLoaded', function () {
  // Initialize Oikos chamber
  if (typeof OikosModule !== 'undefined') {
    OikosModule.init();
  }

  // Initialize Living Pantheon if available
  if (
    typeof LivingPantheonCore !== 'undefined' &&
    ETCETER4_CONFIG.livingPantheon?.enabled
  ) {
    LivingPantheonCore.getInstance()
      .initialize({
        chamberId: 'oikos',
        chamberColor: '#FF8C00',
      })
      .start();
  }
});
