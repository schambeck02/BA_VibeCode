
import { GoogleGenAI } from "@google/genai";

export class GeminiService {
  // Use a private instance variable, but ensure it's initialized with the direct env variable.
  private ai: GoogleGenAI;

  constructor() {
    /* Always use process.env.API_KEY directly when initializing the GoogleGenAI client instance. */
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  async analyzeESGResults(context: string) {
    try {
      /* Use ai.models.generateContent to query GenAI with both the model name and prompt. */
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Analyze the following financial ESG performance data and provide a concise, executive insight (2-3 sentences) for each research question: ${context}`,
        config: {
          temperature: 0.7,
          topP: 0.9,
        }
      });
      /* The GenerateContentResponse object features a text property that directly returns the string output. */
      return response.text;
    } catch (error) {
      console.error("Gemini analysis failed:", error);
      return "Unable to generate AI insights at this time. Please review the visual data panels for details.";
    }
  }
}

export const geminiService = new GeminiService();
