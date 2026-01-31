export const GLOBAL_STYLES = `
  :root {
    --font-serif: 'Playfair Display', Georgia, serif;
    --font-sans: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", Helvetica, Arial, sans-serif;
    --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  }

  body {
    font-family: var(--font-sans);
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  body::-webkit-scrollbar {
    display: none;
  }

  /* Utility class to hide scrollbar */
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }

  /* Line clamp utilities */
  .line-clamp-6 {
    display: -webkit-box;
    -webkit-line-clamp: 6;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .cinematic-grain::before {
    content: '';
    position: fixed;
    inset: 0;
    z-index: 50;
    pointer-events: none;
    opacity: 0.04;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
    mix-blend-mode: overlay;
  }

  .font-serif-italic {
    font-family: var(--font-serif);
    font-style: italic;
  }

  .font-serif {
    font-family: var(--font-serif);
  }

  .font-sans {
    font-family: var(--font-sans);
  }

  .perspective-1000 {
    perspective: 1000px;
  }
`;
