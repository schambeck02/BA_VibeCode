
import { GoogleGenAI } from "@google/genai";

export class GeminiService {
  private ai: GoogleGenAI | null = null;
  private initialized = false;

  private initialize() {
    if (this.initialized) return;
    this.initialized = true;

    const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY;
    if (apiKey) {
      try {
        this.ai = new GoogleGenAI({ apiKey });
      } catch (error) {
        console.warn("Failed to initialize Gemini AI:", error);
        this.ai = null;
      }
    } else {
      console.warn("Gemini API key not configured. AI insights will be disabled.");
    }
  }

  async analyzeESGResults(context: string): Promise<string> {
    this.initialize();

    if (!this.ai) {
      return "AI insights unavailable. Set GEMINI_API_KEY in .env.local to enable AI analysis.";
    }

    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Analyze the following financial ESG performance data and provide a concise, executive insight (2-3 sentences) for each research question: ${context}`,
        config: {
          temperature: 0.7,
          topP: 0.9,
        }
      });
      return response.text;
    } catch (error) {
      console.error("Gemini analysis failed:", error);
      return "Unable to generate AI insights at this time. Please review the visual data panels for details.";
    }
  }
}

export const geminiService = new GeminiService();
