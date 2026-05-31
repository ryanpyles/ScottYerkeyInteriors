// When ?instant=1 is in the URL, use a huge rootMargin so IntersectionObserver
// fires immediately on element mount regardless of scroll position.
// This lets the preview tool screenshot all sections without real scrolling.
const isInstant =
  typeof window !== 'undefined' &&
  new URLSearchParams(window.location.search).has('instant');

export const VP = (margin = '-80px') => ({
  once: true,
  margin: isInstant ? '9999px' : margin,
});
