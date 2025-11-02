import { GoogleGenerativeAI } from '@google/generative-ai';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';

let genAI: GoogleGenerativeAI | null = null;

if (GEMINI_API_KEY) {
  genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
}

export async function generateProjectNames(keywords: string): Promise<string[]> {
  if (!genAI) {
    throw new Error('Gemini API key not configured. Please add VITE_GEMINI_API_KEY to your .env file');
  }

  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

  const prompt = `Generate 10 unique, brandable project names based on these keywords: "${keywords}"

Requirements:
- Names should be catchy and memorable
- Should be suitable for branding
- Mix of creative and professional options
- Each name should be on a new line
- No numbers or special characters unless it adds value
- Keep names between 2-3 words when possible

Return only the names, one per line, no numbering or bullets.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Parse the names from the response
    const names = text
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0 && !line.match(/^\d+[\.\)]/))
      .slice(0, 10);
    
    return names;
  } catch (error) {
    console.error('Error generating project names:', error);
    throw error;
  }
}

