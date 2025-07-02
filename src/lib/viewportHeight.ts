// src/lib/viewportHeight.ts
// Utility to set --vh CSS variable for mobile viewport height issues
export function setViewportHeightVar() {
  const setVh = () => {
    // Use visualViewport if available (better for handling mobile keyboard)
    const height = window.visualViewport
      ? window.visualViewport.height
      : window.innerHeight;
    document.documentElement.style.setProperty('--vh', `${height * 0.01}px`);
  };

  setVh();
  window.addEventListener('resize', setVh);

  // Use visualViewport API for more accurate mobile keyboard handling
  if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', setVh);
    window.visualViewport.addEventListener('scroll', setVh);
  }

  // Add event listeners for mobile orientation change
  window.addEventListener('orientationchange', setVh);
}
