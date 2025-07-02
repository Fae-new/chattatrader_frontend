// src/lib/viewportHeight.ts
// Utility to set --vh CSS variable for mobile viewport height issues
export function setViewportHeightVar() {
  const setVh = () => {
    document.documentElement.style.setProperty(
      '--vh',
      `${window.innerHeight * 0.01}px`
    );
  };
  setVh();
  window.addEventListener('resize', setVh);
}
