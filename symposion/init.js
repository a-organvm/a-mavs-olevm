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
        chamberId: 'symposion',
        chamberColor: '#722F37',
      })
      .start();
  }

  // Initialize Symposion chamber
  if (typeof SymposionChamber !== 'undefined') {
    SymposionChamber.initialize();
  }
});
