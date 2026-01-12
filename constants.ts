
import { Project } from './types';

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'From Engineer Concept To Scalable Product',
    tags: ['SaaS Product 0-1', 'Healthcare', 'B2C'],
    description: 'Designing The “Phase 0” Foundation For A Series B Healthcare Startup To Reduce Cognitive Load',
    cta: 'OPEN CASE STUDY',
    backgroundColor: '#EEebff',
    textColor: '#1a1a1a',
    accentColor: '#4c35de',
    type: 'project',
    images: [
      'https://images.unsplash.com/photo-1586772002130-b0f3daa6288b?w=1200&q=80',
      'https://images.unsplash.com/photo-1576091160550-2187d80a18f3?w=800&q=80',
      'https://images.unsplash.com/photo-1551076805-e1869033e561?w=800&q=80'
    ],
    mockup: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80',
    fullContent: 'In this project, we focused on streamlining the clinician workflow by reducing the steps required for data entry by 40%. The design system utilized high-contrast typography and subtle elevation to distinguish between critical and non-critical patient data.'
  },
  {
    id: 2,
    title: 'Evoleum',
    tags: ['E-Commerce Redesign', 'Cosmetics', 'B2C'],
    description: 'Redesigning A Cosmetic Website To Be More Friendly and Luxurious.',
    cta: 'OPEN CASE STUDY',
    backgroundColor: '#F9F1EB',
    textColor: '#4a4a4a',
    accentColor: '#d4b08c',
    type: 'project',
    images: [
      'https://images.unsplash.com/photo-1596462502278-27bfdd403cc2?w=1200&q=80',
      'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80',
      'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=800&q=80'
    ],
    mockup: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80',
    fullContent: 'Evoleum required a digital identity that mirrored their physical luxury products. We implemented a grid-light layout with high-resolution video textures to create an immersive shopping experience.'
  },
  {
    id: 3,
    title: 'Alula',
    tags: ['Mobile Product/ App', 'Health', 'B2C'],
    description: 'Building A Safe And Empathetic UX For A Self-Improvement App',
    cta: 'OPEN CASE STUDY',
    backgroundColor: '#F3E5F5',
    textColor: '#1a1a1a',
    accentColor: '#a855f7',
    type: 'project',
    images: [
      'https://images.unsplash.com/photo-1551650975-87bd5e86d61e?w=1200&q=80',
      'https://images.unsplash.com/photo-1526498460593-81ef6a8719e5?w=800&q=80',
      'https://images.unsplash.com/photo-1512428813834-c702c7702b78?w=800&q=80'
    ],
    mockup: 'https://images.unsplash.com/photo-1551650975-87bd5e86d61e?w=600&q=80',
    fullContent: 'Alula is a companion for those on a journey of mental wellness. The UX focuses on low-friction logging and positive reinforcement cycles, using soft gradients and rounded corners to evoke safety.'
  },
  {
    id: 4,
    type: 'bio',
    title: 'About Me',
    backgroundColor: '#F9FAFB', // Soft light gray to help the white Polaroid frame pop
    textColor: '#1a1a1a',
    accentColor: '#000000',
    description: 'A look into the designer behind the work.',
    images: ['https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1200&q=80'],
  },
  {
    id: 5,
    type: 'testimonials',
    title: 'Testimonials',
    backgroundColor: '#ffffff',
    textColor: '#1a1a1a',
    accentColor: '#9333ea',
    description: 'What partners say about our collaboration.',
    images: ['https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&q=80'],
  }
];

export const GLOBAL_STYLES = `
  :root {
    --font-serif: 'Playfair Display', Georgia, serif;
    /* San Francisco Pro stack */
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
`;
