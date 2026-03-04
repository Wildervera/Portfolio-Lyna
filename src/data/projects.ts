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
    title: 'From Engineering Concept to Scalable Product',
    tags: ['SaaS Platform', 'Healthcare', 'B2B'],
    description: 'From 0 to 1: AI-Driven System Simplifying Insurance & Billing Workflows for DME/HME Providers',
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
      heroSubtitle: 'From 0 to 1: AI-Driven System Simplifying Insurance & Billing Workflows for DME/HME Providers',
      heroImage: '/projets/thumbnail notable copy.webp',
      projectInfo: [
        { label: 'Timeline', value: '1.5 month' },
        { label: 'Industry', value: 'Healthcare' },
        { label: 'Platform', value: 'SaaS Product' },
        { label: 'Role', value: 'UX/UI designer' }
      ],
      team: {
        members: [
          {
            name: 'Edwin Alonso',
            avatar: '/projets/project 1/edwin alonso.jpeg'
          },
          {
            name: 'Anis',
            avatar: '/projets/project 1/anis.jpeg'
          },
        ],
        additionalCount: 4,
        description: '4 Dev, 1 PM, 1 designer',
      },
      overview: {
        context: {
          icon: 'info',
          title: 'Context',
          description: 'This project focused on creating a system designed to help DME/HME providers manage the medical equipment they supply to patients at home. The system uses AI to reduce errors in insurance claims, billing, and payments by automating data entry and catching missing information early.'
        },
        problem: {
          icon: 'x',
          title: 'Problem',
          description: 'The engineer prototype suffered from cognitive overload. Friction in the UI increased data entry errors, which directly caused revenue loss for DME/HME.'
        },
        goal: {
          icon: 'target',
          title: 'Goal',
          description: 'The goal was to design a scalable platform that simplify complex workflows, reduce cognitive overload, and help teams process claims faster and more accurately.'
        },
        outcome: {
          icon: 'check',
          title: 'Impact',
          metrics: [
            {
              trend: 'down',
              text: '40% reduction in onboarding time for new billing specialists.',
            },
            {
              trend: 'up',
              text: '25% improvement in claim processing speed, thanks to fewer manual steps and early error detection.',
            },
            {
              trend: 'up',
              text: '100% real-time visibility into claim status and workflow bottlenecks.',
            }
          ]
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
            icon: '🤷‍♂️',
            title: 'New Staff Members',
            subtitle: 'RAPID ONBOARDING',
            description: 'Needs to ramp up quickly and learn how to use the product efficiently without constant help.'
          }
        ]
      },
      keyFindings: {
        title: 'Interview Key Findings',
        description: 'Through 12 interviews with Operation Managers and Billing Specialists, I learned that the tool often made their tasks harder instead of easier.',
        keyInsight: 'Users didn\'t trust the system because they couldn\'t see the status of their work. Visibility was the #1 missing feature.',
        findings: [
          {
            type: 'quote',
            content: 'I feel blind to what my team is doing.',
            label: 'PAIN POINT',
            subtext: 'Managers use spreadsheets, which makes it hard to see what’s happening in real time and react quickly.'
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
        title: 'User Flow & Wireframes',
        description: 'I organized the platform\'s structure into clear, purpose-driven zones. This hierarchy separates the "noise" of admin settings from the "signal" of day-to-day workflows.',
        diagramImage: '/projets/project 1/MC.png',
        wireframes: [
          '/projets/project 1/wireframes/Admin - Roles & Permissions.png',
          '/projets/project 1/wireframes/Admin.png',
          '/projets/project 1/wireframes/Authentification- login.png',
          '/projets/project 1/wireframes/Authentification- verification.png',
          '/projets/project 1/wireframes/Order extraction.png',
          '/projets/project 1/wireframes/Order Intake.png'
        ]
      },
      iteration: {
        sectionNumber: '03',
        title: 'Refining the Upload Experience',
        description: 'While I designed the entire platform from scratch, I selected the document upload flow to highlight my iteration process. It\'s a clear example of how I explore different options, test assumptions, and refine the experience toward a final solution.',
        versions: [
          {
            title: 'Version A: Upload Status Listed Inline',
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
            title: 'Version B: Two structured Tabs "Uploading" & "Failed"',
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
        demoVideo: '/projets/project 1/final_demo.mov',
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
    title: 'Rebuilding a Monday plugin for clarity, speed, and accuracy',
    tags: ['SaaS Product', 'Construction', 'B2B'],
    description: 'Designing a structured Monday.com plugin form that helps clients submit accurate project details and enables to generate quotes efficiently.',
    cta: 'SEE CASE STUDY',
    backgroundColor: '#B4CAD5', // Updated for Next Project card apperance
    textColor: '#FFFFFF',
    accentColor: '#FFFFFF',
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
          { name: 'Joseph Hernandez', avatar: '/testimonials/joseph hernandez.webp' },
          { name: 'Anis', avatar: '/testimonials/anis.webp' },
        ],
        additionalCount: 1,
        description: '1 Dev, 1 PM, 1 designer',
        backgroundColor: '#B4CAD5',
        textColor: '#FFFFFF',
      },
      overview: {
        context: {
          icon: 'info',
          title: 'Context',
          description: 'Parkway is a construction company that manages all its operations through Monday.com. My role was to redesign their intake form, which functions as a plugin directly inside their Monday workspace and is used every day by the team to initiate, organize, and structure new projects more efficiently.'
        },
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
          title: 'Impact',
          metrics: [
            {
              trend: 'down',
              text: '70% decrease in incomplete submissions.',
            },
            {
              trend: 'down',
              text: '40% fewer data-entry errors.',
            },
            {
              trend: 'down',
              text: 'Notable reduction in the time needed to generate quotes.',
            }
          ]
        }
      },
      research: {
        sectionNumber: '01',
        title: 'Who we build this for?',
        description: 'Interviews with internal teams and reviews of past submissions clarified who uses the form and what they need.',
        cardAccentColor: '#CAFA89', // Greenish accent from screenshots
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
        backgroundImage: '/projets/Project2/main-insight-bg.jpg',
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
        description: 'These wireframes focused on the simple steps, key fields, and the new progress indicator. This helped me test the flow quickly before building the high-fidelity designs.',
        image: '/projets/Project2/Wireframe - 1.png',
        versions: []
      },
      iterationAfterTesting: {
        title: 'Improvement after testing',
        description: "I used the main feedback from each testing round to improve the flow, adjust the layout, and make the steps clearer. These changes helped shape the final design and made the experience easier to use.",
        images: [
          '/projets/Project2/Component 4.png',
          '/projets/Project2/Component 5.png',
          '/projets/Project2/Component 6.png',
          '/projets/Project2/Component 7.png',
          '/projets/Project2/Component 8.png'
        ],
        descriptions: [
          {
            before: 'The progress bar only showed a percentage, leaving users unsure of what steps were ahead or how far they were in the process.',
            after: 'Replaced the percentage bar with a clear four-step indicator, giving users instant visibility into the process and what comes next.'
          },
          {
            before: 'Multiple open text fields forced users to type everything manually, slowing them down and creating unnecessary friction.',
            after: 'Replaced open text fields with simple dropdown menus, making choices faster, clearer, and easier to complete.'
          },
          {
            before: 'The long list of text fields made the form feel confusing and slow to fill out.',
            after: 'A clear step-by-step layout breaks the form into smaller parts, making it easier to understand and complete.'
          },
          {
            before: 'The section felt a bit tight, which made the content slightly harder to scan at a glance.',
            after: 'A bit more spacing and breathing room makes the layout easier to read and helps users move through the information more smoothly.'
          },
          {
            before: "The confirmation screen felt a bit static, and the progress bar at the top didn’t add much clarity now that the task was finished.",
            after: "The cleaner layout removes the progress bar and puts full focus on the success message, making the confirmation screen feel simpler and more complete."
          }
        ]
      },
      solution: {
        sectionNumber: '04',
        title: 'The Final Design',
        description: 'After several rounds of research, testing, and iteration, the final design brings together all the improvements made during the process. The new flow is clearer, faster to complete, and easier for users to understand. The mockups below show the final interface and how the different steps work together to create a smoother experience',
        features: [],
        demoVideo: '/projets/Project2/Screen Recording final product.mov'
      }
    },
  },
  {
    id: 3,
    title: 'Designing a user-centered coaching app experience',
    tags: ['Mobile App', 'Healthcare', 'B2B'],
    description: 'Creating a functional first iteration aimed at validating user needs and product viability.',
    cta: 'COMING SOON',
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
