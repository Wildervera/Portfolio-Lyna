
import { GoogleGenAI, Type } from "@google/genai";
import { Project } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getDesignerInsights = async (project: Project, question?: string) => {
  const systemInstruction = `
    You are Lyna's AI Design Assistant. Your goal is to explain the design rationale behind Lyna's portfolio projects.
    
    Current Project Context:
    - Title: ${project.title}
    - Tags: ${project.tags?.join(', ')}
    - Description: ${project.description}
    - Full Details: ${project.fullContent || 'A premium focus on UX and visual aesthetics.'}
    
    Be concise, professional, and slightly artistic in your tone. Focus on UX patterns, visual hierarchy, and the emotional impact of design choices.
    If the user asks a specific question, answer it based on this context. If they just ask for insights, provide 2-3 bullet points about the design approach.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: question || "Tell me about the design approach for this project.",
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble connecting to the creative ether right now. Please try again in a moment.";
  }
};

export const startDesignChat = (project: Project) => {
  const chat = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: `You are Lyna's Creative Partner. You help visitors understand the 'why' behind her work on '${project.title}'. You are knowledgeable about typography, color theory, and SaaS UX. Be helpful and inspiring.`,
    },
  });
  return chat;
};
