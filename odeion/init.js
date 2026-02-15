'use strict';

// Chamber initialization
document.addEventListener('DOMContentLoaded', function () {
  // Initialize Odeion chamber
  if (typeof OdeionChamber !== 'undefined') {
    OdeionChamber.initialize();
  }

  // Initialize Living Pantheon if available
  if (
    typeof LivingPantheonCore !== 'undefined' &&
    ETCETER4_CONFIG.livingPantheon?.enabled
  ) {
    LivingPantheonCore.getInstance()
      .initialize({
        chamberId: 'odeion',
        chamberColor: '#FFD700',
      })
      .start();
  }
});
