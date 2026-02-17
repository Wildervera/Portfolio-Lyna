export interface Persona {
  icon: string;
  title: string;
  subtitle: string;
  description: string;
}

export interface KeyFinding {
  type: 'quote' | 'stat';
  content: string;
  value?: string;
  label?: string;
  highlight?: string;
  subtext?: string;
}

export interface DesignVersion {
  title: string;
  status?: 'winner' | 'discarded';
  image?: string;
  video?: string;
  pros?: string[];
  cons?: string[];
}

export interface Feature {
  number: number;
  title: string;
  description: string;
}

export interface OutcomeMetric {
  value: string;
  label: string;
}

export interface ProjectInfo {
  label: string;
  value: string;
}

export interface TeamMember {
  name: string;
  avatar?: string;
}

export interface ProjectTeam {
  members: TeamMember[];
  additionalCount?: number;
}

export interface ContentSection {
  title: string;
  description: string;
  image?: string;
  imageCaption?: string;
}

export interface ProjectCaseStudy {
  heroStyle?: 'card' | 'open';
  sectionHeaderColor?: string;
  heroTitle: string;
  heroSubtitle: string;
  heroImage?: string;
  projectInfo?: ProjectInfo[];
  team?: ProjectTeam;
  overview: {
    problem: { icon: string; title: string; description: string };
    goal: { icon: string; title: string; description: string };
    role?: { icon: string; title: string; description: string };
    outcome?: { icon: string; title: string; description: string };
  };
  research?: {
    sectionNumber: string;
    title: string;
    description: string;
    personas: Persona[];
    personaImage?: string;
    cardAccentColor?: string;
  };
  keyFindings?: {
    title: string;
    description: string;
    keyInsight?: string;
    findings: KeyFinding[];
  };
  strategy?: {
    sectionNumber: string;
    title: string;
    description: string;
    diagramImage?: string;
  };
  iteration?: {
    sectionNumber: string;
    title?: string;
    description?: string;
    versions: DesignVersion[];
  };
  solution?: {
    sectionNumber: string;
    title: string;
    description: string;
    features: Feature[];
    demoVideo?: string;
  };
  outcome?: {
    title: string;
    description: string;
    metrics: OutcomeMetric[];
  };
  // Narrative-style sections (for projects like Evoleum)
  approach?: {
    title: string;
    description: string;
  };
  keyInsight?: {
    icon: string;
    text: string;
  };
  contentSections?: ContentSection[];
  impact?: {
    title: string;
    description: string;
  };
  quote?: string;
  lessonLearned?: {
    title: string;
    description: string;
  };
}

export interface Project {
  id: number;
  title: string;
  tags?: string[];
  description: string;
  cta?: string;
  backgroundColor: string;
  textColor: string;
  accentColor: string;
  images: string[];
  mockup?: string;
  type?: 'bio' | 'testimonials' | 'project' | 'hero';
  fullContent?: string;
  caseStudy?: ProjectCaseStudy;
}

export interface Testimonial {
  text: string;
  author: string;
  role: string;
  avatar: string;
}
