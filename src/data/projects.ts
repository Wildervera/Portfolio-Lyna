import { Project } from '../types';

export const PROJECTS: Project[] = [
  {
    id: 0,
    type: 'hero',
    title: 'Lyna Seridji',
    tags: [],
    description: '',
    cta: "Let's Talk",
    backgroundColor: '#FBF9F5',
    textColor: '#000000',
    accentColor: '#000000',
    images: [],
  },
  {
    id: 1,
    title: 'From Prototype To Scalable Product',
    tags: ['SaaS Platform', 'Healthcare', 'B2B'],
    description: 'Designing The "Phase 0" Foundation For A Series B Healthcare Startup To Reduce Cognitive Load And Error Rates.',
    cta: 'SEE CASE STUDY',
    backgroundColor: '#3D3D7A',
    textColor: '#ffffff',
    accentColor: '#ffffff',
    type: 'project',
    images: [
      '/projets/thumbnail notable copy.webp'
    ],
    mockup: '/projets/thumbnail notable copy.webp',
    fullContent: 'In this project, we focused on streamlining the clinician workflow by reducing the steps required for data entry by 40%. The design system utilized high-contrast typography and subtle elevation to distinguish between critical and non-critical patient data.',
    caseStudy: {
      heroTitle: 'From Engineering Concept to Scalable Product.',
      heroSubtitle: 'Designing the "Phase 0" foundation for a Series B Healthcare startup to reduce cognitive load and error rates.',
      heroImage: '/projets/thumbnail notable copy.webp',
      projectInfo: [
        { label: 'TIMELINE', value: 'OCT 2025- NOV 2025' },
        { label: 'PLATFORM', value: 'SaaS PRODUCT 0-1' },
        { label: 'INDUSTRY', value: 'HEALTHCARE (SERIE B)' },
        { label: 'ROLE', value: 'LEAD PRODUCT DESIGNER' }
      ],
      overview: {
        problem: {
          icon: 'x',
          title: 'The Problem',
          description: 'The engineer prototype from extreme cognitive overload. Friction in the UI increased data entry errors, which directly caused revenue loss for providers.'
        },
        goal: {
          icon: 'target',
          title: 'The Goal',
          description: 'Design a scalable "Phase 0" platform that simplifies the workflow, builds trust in the AI backend, and drastically reduces claim processing time.'
        },
        role: {
          icon: 'user',
          title: 'My Role',
          description: 'I led the full "0 to 1" design cycle: auditing the prototype, restructuring Information Architecture, and delivering the final UI system.'
        }
      },
      research: {
        sectionNumber: '01',
        title: 'Who we build this for?',
        description: 'Creating detailed personas allowed me to develop a clear understanding of who I was designing for and identify the key challenges and frustrations in their product experience.',
        personas: [
          {
            icon: '👩‍💼',
            title: 'Operation Managers',
            subtitle: 'STRATEGIC OVERSIGHT',
            description: 'Needs high-level visibility into team performance to drive operational excellence'
          },
          {
            icon: '👨‍💻',
            title: 'Billing Specialist',
            subtitle: 'EXECUTION & SPEED',
            description: 'Focuses on processing volume quickly and accuracy to ensure claims get paid.'
          },
          {
            icon: '👶',
            title: 'New Staff Members',
            subtitle: 'RAPID ONBOARDING',
            description: 'Needs to ramp up quickly and learn how to use the product efficiently without constant help.'
          }
        ]
      },
      keyFindings: {
        title: 'Interview Key Findings',
        description: 'I conducted 12 user interviews with Operation Managers and Billing Specialists. The consensus was clear: the tool was getting in their way, not helping them.',
        keyInsight: 'Users didn\'t trust the system because they couldn\'t see the status of their work. Visibility was the #1 missing feature.',
        findings: [
          {
            type: 'quote',
            content: 'I feel blind to what my team is doing.',
            label: 'PAIN POINT',
            subtext: 'Managers rely on spreadsheets, causing delayed interventions.'
          },
          {
            type: 'stat',
            value: '72%',
            content: 'Managers rely on spreadsheets, causing delayed interventions.'
          },
          {
            type: 'quote',
            content: 'I spend half my day copy-pasting data.',
            label: 'PAIN POINT',
            subtext: 'Specialists frustrated by lack of automation.'
          },
          {
            type: 'stat',
            value: '4 hrs',
            content: 'Lost daily to manual data entry tasks.'
          }
        ]
      },
      strategy: {
        sectionNumber: '02',
        title: 'Structuring the Chaos',
        description: 'I organized the platform\'s structure into clear, purpose-driven zones. This hierarchy separates the "noise" of admin settings from the "signal" of day-to-day workflows.',
        diagramImage: '/projets/notable-ia-diagram.png'
      },
      iteration: {
        sectionNumber: '03',
        title: 'Refining the Upload Experience',
        description: 'While I designed the entire platform from scratch, I selected the document upload flow to highlight my iteration process. It\'s a clear example of how I explore different options, test assumptions, and refine the experience toward a final solution.',
        versions: [
          {
            title: 'V1: Inline Upload Feedback Inside the Modal',
            status: 'discarded',
            pros: [
              'Real-time status for each document',
              'Supports multiple uploads at once'
            ],
            cons: [
              'Status in modal was redundant',
              'Mixed states created visual clutter',
              'Harder to focus on failed files during bulk uploads'
            ]
          },
          {
            title: 'V2: Two structured Tabs: "Uploading" & "Failed"',
            status: 'winner',
            pros: [
              'Clear separation of in-progress vs. failed uploads',
              'Easier to identify and fix problematic files',
              'Cleaner, more scalable layout',
              'Reduce cognitive load in bulk uploads'
            ],
            cons: [
              'Requires switching between two tabs'
            ]
          }
        ]
      },
      solution: {
        sectionNumber: '04',
        title: 'The Final Design',
        description: 'The most critical friction point was document ingestion. I explored two design directions to solve for speed and clarity.',
        features: [
          { number: 1, title: 'Structured Left Navigation', description: 'A clear separation between main navigation, workflows, and user settings makes it easy for users to find the right tools based on their role.' },
          { number: 2, title: 'Top-Level Metrics Summary', description: 'Quick, at-a-glance visibility into total documents, processing items, and issues helps users understand workload instantly.' },
          { number: 3, title: 'Cleaner Table Layout', description: 'Stronger text hierarchy and clearer status labels make scanning documents faster and reduce cognitive load.' },
          { number: 4, title: 'Unified Search & Filters', description: 'Search and filters are grouped together to simplify document discovery and allow more precise filtering when needed.' },
          { number: 5, title: 'High-Visibility Upload Button', description: 'High-contrast CTA makes uploading easy to access.' },
          { number: 6, title: 'Simplified Upload Modal', description: 'Clear instructions, drag-and-drop support, and immediate feedback make uploading straightforward and reduce mistakes.' },
          { number: 7, title: 'Two-Tab Upload Status', description: 'Separating uploading files from failed ones brings clarity, makes troubleshooting easier, and avoids mixing states in one list.' },
          { number: 8, title: 'Order Extraction Workspace', description: 'A clean split view between the document and extracted data helps users work more efficiently without constant context switching.' },
          { number: 9, title: 'Admin Settings Overview', description: 'A simple grid for Roles & Permissions and Work Distribution keeps configuration organized and easy to navigate.' },
          { number: 10, title: 'Roles & Permissions Matrix', description: 'Helps admins quickly understand differences between roles and adjust access with confidence.' }
        ]
      },
      outcome: {
        title: 'The Outcome',
        description: 'The "Phase 0" foundation successfully reduced onboarding time for new billing specialists and provided management with the real-time visibility they lacked.',
        metrics: [
          { value: '-40%', label: 'DATA ENTRY ERRORS' },
          { value: '2x', label: 'FASTER ONBOARDING' }
        ]
      }
    }
  },
  {
    id: 2,
    title: 'Evoleum',
    tags: ['E-Commerce Experience', 'Cosmetics', 'B2C'],
    description: 'Redesigning A Cosmetic Website More Friendly User',
    cta: 'SEE CASE STUDY',
    backgroundColor: '#8FAE8B',
    textColor: '#ffffff',
    accentColor: '#ffffff',
    type: 'project',
    images: [
      '/projets/thumbnail Evoleum.webp'
    ],
    mockup: '/projets/thumbnail Evoleum.webp',
    fullContent: 'Evoleum required a digital identity that mirrored their physical luxury products. We implemented a grid-light layout with high-resolution video textures to create an immersive shopping experience.',
    caseStudy: {
      heroTitle: 'Evoleum',
      heroSubtitle: 'Redesigning A Cosmetic Website to be More User-Friendly',
      heroImage: '/projets/thumbnail Evoleum.webp',
      projectInfo: [
        { label: 'TIMELINE', value: 'MARCH 2024-MAY 2024' },
        { label: 'PLATFORM', value: 'Ecommerce website' },
        { label: 'INDUSTRY', value: 'COSMETICS' },
        { label: 'ROLE', value: 'LEAD PRODUCT DESIGNER' }
      ],
      overview: {
        problem: {
          icon: 'x',
          title: 'The Problem',
          description: 'The original website was cluttered and hard to navigate. Inconsistent branding and poor structure made it difficult for users to find key products, causing confusion and drop-offs.'
        },
        goal: {
          icon: 'target',
          title: 'The Goal',
          description: 'The goal was to redesign the site to improve clarity, simplify navigation, and create a clean, elegant layout that matched Evoleum\'s high-end image.'
        },
        role: {
          icon: 'user',
          title: 'My Role',
          description: 'I led the audit and redesign. I conducted heuristic analysis and competitor research, then restructured the navigation, layout, and visuals to improve usability and align with the brand.'
        }
      },
      approach: {
        title: 'How I Tackled the Redesign?',
        description: 'I looked closely at Evoleum\'s website to find what wasn\'t working. The menu had too many options, and important products were hard to find. Users had to click several times to get to what they needed. The site felt messy and confusing. The navigation bar alone had 6 categories, 2 of which had dropdown menus containing 14 different options. Also, key items were buried three clicks deep.'
      },
      keyInsight: {
        icon: 'key',
        text: 'I knew simplification was key.'
      },
      contentSections: [
        {
          title: 'Simplifying the Maze',
          description: 'The old navigation was a puzzle. I combined the "Shop" and "Needs" categories into one, with a dropdown menu that lets users easily shop based on the brand\'s offerings or their specific needs. Now, users can directly access solutions for dryness or acne, in just one click. This made the navigation cleaner and easier to use.',
          image: '/projets/evoleum-navigation.png'
        },
        {
          title: 'Highlighting What Matters',
          description: 'Important products weren\'t easy to spot. I added a clear Best Seller section to highlight the most popular items. This helps users quickly see what others love and makes it easier to find top products.',
          image: '/projets/evoleum-bestsellers.png'
        }
      ],
      impact: {
        title: 'The impact',
        description: 'Before, the website was messy and hard to use. Now it\'s clean and organized. I reduced the menu from over 14 options to just a few. Bestsellers are easy to find, and the shop section is clear and focused. The new colors match the brand and feel more modern. It\'s too early for data, but a simpler site means less stress for users and a better chance they\'ll take action.'
      },
      quote: 'Redesigning Evoleum felt like helping a friend declutter her closet. We kept the timeless pieces, donated the rest, and made everything effortlessly findable.',
      lessonLearned: {
        title: 'Lesson learned',
        description: 'This project reminded me that good design isn\'t about adding more, it\'s about removing what\'s not needed. At first, I thought more menus and buttons would help. But I realized they just created confusion. By cutting extra sections, combining menus, and giving bestsellers their own space, the site became simpler and more effective.'
      }
    }
  },
  {
    id: 3,
    title: 'Alula',
    tags: ['Mobile App', 'Healthcare', 'B2B'],
    description: 'Building A Coaching Mental Health App MVP In 4 Weeks',
    cta: 'SEE CASE STUDY',
    backgroundColor: '#C9C2E3',
    textColor: '#ffffff',
    accentColor: '#ffffff',
    type: 'project',
    images: [
      '/projets/Thumbnail alula.webp'
    ],
    mockup: '/projets/Thumbnail alula.webp',
    fullContent: 'Alula is a companion for those on a journey of mental wellness. The UX focuses on low-friction logging and positive reinforcement cycles, using soft gradients and rounded corners to evoke safety.'
  },
  {
    id: 4,
    type: 'testimonials',
    title: 'Testimonials',
    backgroundColor: '#FBF9F5',
    textColor: '#1a1a1a',
    accentColor: '#000000',
    description: 'What partners say about our collaboration.',
    images: [],
  }
];
