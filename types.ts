
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
  type?: 'bio' | 'testimonials' | 'project';
  fullContent?: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
