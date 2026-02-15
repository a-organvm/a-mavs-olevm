'use strict';

document.addEventListener('DOMContentLoaded', function () {
  // Initialize Living Pantheon if available
  if (
    typeof LivingPantheonCore !== 'undefined' &&
    ETCETER4_CONFIG.livingPantheon?.enabled
  ) {
    LivingPantheonCore.getInstance()
      .initialize({
        chamberId: 'ergasterion',
        chamberColor: '#00FF00',
      })
      .start();
  }

  // Section navigation functionality
  const sectionBtns = document.querySelectorAll('.section-btn');
  const experimentSection = document.getElementById('experiments-section');
  const toolsSection = document.getElementById('tools-section');

  sectionBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      const section = this.dataset.section;

      // Update button states
      sectionBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      // Show/hide sections
      if (section === 'experiments') {
        experimentSection.style.display = 'block';
        toolsSection.style.display = 'none';
      } else if (section === 'tools') {
        experimentSection.style.display = 'none';
        toolsSection.style.display = 'block';
      }
    });
  });

  // Terminal logging helper
  window.logToTerminal = function (message, type = 'log') {
    const terminal = document.getElementById('terminal-output');
    const logEntry = document.createElement('div');
    logEntry.className = `log ${type}`;
    logEntry.textContent = '$ ' + message;
    terminal.appendChild(logEntry);
  };

  // Execute button handlers
  document.querySelectorAll('.btn-execute').forEach(btn => {
    btn.addEventListener('click', function () {
      const card = this.closest('.experiment-card, .tool-card');
      const title = card.querySelector('h3').textContent;
      console.log('Executing:', title);
    });
  });

  // Copy button handlers
  document.querySelectorAll('.btn-copy').forEach(btn => {
    btn.addEventListener('click', function () {
      const card = this.closest('.experiment-card');
      if (card) {
        this.textContent = 'Copied!';
        setTimeout(() => {
          this.textContent = 'Copy Code';
        }, 2000);
      }
    });
  });
});
