import { Project } from '../types';

export const PROJECTS: Project[] = [
  {
    id: 0,
    type: 'hero',
    title: 'Lyna Seridji',
    tags: [],
    description: '',
    cta: "Let's Talk",
    backgroundColor: '#FAF9F6',
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
    backgroundColor: '#3C416C',
    textColor: '#ffffff',
    accentColor: '#ffffff',
    type: 'project',
    images: [
      '/projets/thumbnail notable copy.webp'
    ],
    mockup: '/projets/thumbnail notable copy.webp',
    fullContent: 'In this project, we focused on streamlining the clinician workflow by reducing the steps required for data entry by 40%. The design system utilized high-contrast typography and subtle elevation to distinguish between critical and non-critical patient data.',
    caseStudy: {
      heroTitle: 'From Engineering Concept to Scalable Product',
      heroSubtitle: 'Designing the Phase 0 foundation for a Series B Healthcare startup to reduce cognitive load and error rates.',
      heroImage: '/projets/thumbnail notable copy.webp',
      projectInfo: [
        { label: 'Timeline', value: '1.5 month' },
        { label: 'Industry', value: 'Healthcare' },
        { label: 'Platform', value: 'SaaS Product' },
        { label: 'Role', value: 'UX/UI designer' }
      ],
      team: {
        members: [
          { name: 'Edwin Alonso' },
          { name: 'Anis' },
        ],
        additionalCount: 5,
      },
      overview: {
        problem: {
          icon: 'x',
          title: 'Problem',
          description: 'The engineer prototype from extreme cognitive overload. Friction in the UI increased data entry errors, which directly caused revenue loss for providers.'
        },
        goal: {
          icon: 'target',
          title: 'Goal',
          description: 'Design a scalable Phase 0 platform that simplifies the workflow, builds trust in the AI backend, and drastically reduces claim processing time.'
        },
        outcome: {
          icon: 'check',
          title: 'Outcome',
          description: 'The Phase 0 foundation successfully reduced onboarding time for new billing specialists and provided management with the real-time visibility they lacked.'
        }
      },
      research: {
        sectionNumber: '01',
        title: 'Who we build this for?',
        description: 'Creating detailed personas allowed me to develop a clear understanding of who I was designing for and identify the key challenges and frustrations in their product experience.',
        cardAccentColor: '#3C416C',
        personas: [
          {
            icon: '👩‍💼',
            title: 'Operation Managers',
            subtitle: 'STRATEGIC OVERSIGHT',
            description: 'Needs high-level visibility into team performance to drive operational excellence'
          },
          {
            icon: '🧑‍💻',
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
        diagramImage: '/projets/project 1/MC.png'
      },
      iteration: {
        sectionNumber: '03',
        title: 'Refining the Upload Experience',
        description: 'While I designed the entire platform from scratch, I selected the document upload flow to highlight my iteration process. It\'s a clear example of how I explore different options, test assumptions, and refine the experience toward a final solution.',
        versions: [
          {
            title: 'V1: Inline Upload Feedback Inside the Modal',
            status: 'discarded',
            video: '/projets/project 1/T1.mov',
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
            video: '/projets/project 1/T2.mov',
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
        ],
        demoVideo: '/projets/project 1/Final_product.mp4',
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
    title: 'Rebuilding A Monday Plugin For Clarity, Speed, And Accuracy',
    tags: ['SaaS Product', 'Construction', 'B2B'],
    description: 'Designing a structured Monday.com plugin form that helps clients submit accurate project details and enables to generate quotes efficiently.',
    cta: 'SEE CASE STUDY',
    backgroundColor: '#B4CAD5', // Updated for Next Project card apperance
    textColor: '#565555',
    accentColor: '#565555',
    type: 'project',
    images: [
      '/projets/Project2/mockup.png'
    ],
    mockup: '/projets/Project2/mockup.png',
    fullContent: 'Rebuilding a Monday.com plugin to streamline the quoting process for a construction company, improving clarity, speed, and accuracy in project submissions.',
    caseStudy: {
      sectionHeaderColor: '#565555',
      heroTitle: 'Rebuilding A Monday Plugin For Clarity, Speed, And Accuracy',
      heroSubtitle: 'Designing a structured Monday.com plugin form that helps clients submit accurate project details and enables to generate quotes efficiently.',
      heroImage: '/projets/Project2/mockup.png',
      projectInfo: [
        { label: 'Timeline', value: '1 month' },
        { label: 'Industry', value: 'Construction' },
        { label: 'Platform', value: 'SaaS Product' },
        { label: 'Role', value: 'UX/UI designer' }
      ],
      team: {
        members: [
          { name: 'Joseph Hernandez' },
          { name: 'Anis' },
        ],
        additionalCount: 3,
      },
      overview: {
        problem: {
          icon: 'x',
          title: 'Problem',
          description: 'The original plugin form was excessively long, lacked structure, and required heavy scrolling. Clients couldn\'t easily understand what information was needed, which led to inconsistent submissions and delays in generating accurate quotes.'
        },
        goal: {
          icon: 'target',
          title: 'Goal',
          description: 'Create a clean, segmented, and intuitive form flow that guides clients step-by-step. Reduce vertical fatigue and ensure the company receives complete and accurate data to generate quotes without extra back-and-forth.'
        },
        outcome: {
          icon: 'check',
          title: 'Outcome',
          description: 'The redesigned form reduced vertical fatigue and made the submission process more intuitive. 70% decrease in incomplete submissions, 40% fewer data-entry errors, and a notable reduction in the time needed to generate quotes.'
        }
      },
      research: {
        sectionNumber: '01',
        title: 'Who we build this for?',
        description: 'Interviews with internal teams and reviews of past submissions clarified who uses the form and what they need.',
        cardAccentColor: '#CAFA89', // Greenish accent from screenshots
        personaImage: '/projets/Project2/persona.png',
        personas: [
          {
            icon: '🙋',
            title: 'Clients submitting new project requests',
            subtitle: 'NEED: CLARITY & GUIDANCE',
            description: 'Need a simple, structured way to provide details without guessing what the company requires.'
          },
          {
            icon: '🧑‍💻',
            title: 'Parkaway Operations Team',
            subtitle: 'NEED: EFFICIENCY & ACCURACY',
            description: 'Needs complete, standardized information to generate precise quotes without repetitive follow-ups.'
          },
          {
            icon: '🤷',
            title: 'Sales Representatives',
            subtitle: 'NEED: SPEED & CONSISTENCY',
            description: 'Require a streamlined intake flow that reduces delays and ensures data is always formatted the same way.'
          }
        ]
      },
      keyFindings: {
        title: 'Main Insight from research',
        description: 'Users lose track of their progress because the form presents all fields at once, causing overwhelm and incomplete submissions.',
        keyInsight: undefined,
        findings: []
      },
      strategy: {
        sectionNumber: '02',
        title: 'User Flow',
        description: 'To reduce scrolling and clarify the flow, the form was restructured into four main sections: Project type, General Info, Scope & Specs, Doc & Notes.',
        diagramImage: '/projets/Project2/user_flow.png'
      },
      iteration: {
        sectionNumber: '03',
        title: 'Wireframes',
        description: 'We translated the new multi-step flow into low-fidelity wireframes to validate structure and clarity early on. These wireframes focused on the simplified steps, essential-first fields, and the added progress indicator, allowing us to quickly test the flow before moving into high-fidelity design. While I designed the entire platform from scratch, I selected the document upload flow to highlight my iteration process.',
        versions: [
          {
            title: 'Step 1: Project Type',
            image: '/projets/Project2/Interface 1 - PROJECT TYPE.png',
            status: undefined,
            pros: [],
            cons: []
          },
          {
            title: 'Step 2: General Info',
            image: '/projets/Project2/Interface 2 - GENERAL INFO.png',
            status: undefined,
            pros: [],
            cons: []
          },
          {
            title: 'Step 2b: Team Details',
            image: '/projets/Project2/Interface 2 -TEAM.png',
            status: undefined,
            pros: [],
            cons: []
          },
          {
            title: 'Step 3: Scope & Specs',
            image: '/projets/Project2/Interface 3 - SCOPE & SPECS.png',
            status: undefined,
            pros: [],
            cons: []
          },
          {
            title: 'Step 4: Finalize',
            image: '/projets/Project2/Interface 4 - FINALIZE.png',
            status: undefined,
            pros: [],
            cons: []
          },
          {
            title: 'Step 5: Confirmation',
            image: '/projets/Project2/Interface 5 - CONFIRMATION.png',
            status: undefined,
            pros: [],
            cons: []
          }
        ]
      },
      solution: {
        sectionNumber: '04',
        title: 'The Final Design',
        description: 'See the final result in the next section.',
        features: [],
        demoVideo: '' // No video provided
      }
    },
  },
  {
    id: 3,
    title: 'Designing a User-Centered Coaching App Experience',
    tags: ['Mobile App', 'Healthcare', 'B2B'],
    description: 'Creating a functional first iteration aimed at validating user needs and product viability.',
    cta: 'SEE CASE STUDY',
    backgroundColor: '#B5AEE2',
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
    backgroundColor: '#FAF9F6',
    textColor: '#1a1a1a',
    accentColor: '#000000',
    description: 'What partners say about our collaboration.',
    images: [],
  }
];
