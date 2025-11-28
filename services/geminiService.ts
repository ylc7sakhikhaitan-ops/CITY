import { GoogleGenAI, Type } from "@google/genai";
import { Mood } from "../types";

// Initialize Gemini Client
// Note: In a real production app, ensure API_KEY is handled securely.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateDailyMood = async (): Promise<Mood> => {
  try {
    const model = 'gemini-2.5-flash';
    
    // Schema definition for strict JSON output
    const responseSchema = {
      type: Type.OBJECT,
      properties: {
        title: { type: Type.STRING, description: "A poetic, short title for the day's vibe (e.g., 'Gentle Tuesday')" },
        subtitle: { type: Type.STRING, description: "A two-word theme (e.g., 'Architecture & Artisan')" },
        description: { type: Type.STRING, description: "A single, elegant sentence describing the suggested flow of the day." },
      },
      required: ["title", "subtitle", "description"],
    };

    const response = await ai.models.generateContent({
      model: model,
      contents: "Generate a sophisticated, 'Old Money aesthetic' daily mood card content for a user in a city like Paris or New York. It is currently a pleasant afternoon.",
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.7, 
      },
    });

    const text = response.text;
    if (text) {
      return JSON.parse(text) as Mood;
    }
    
    throw new Error("No text returned from Gemini");
  } catch (error) {
    console.error("Gemini API Error:", error);
    // Fallback content if API fails or key is missing
    return {
      title: "Serene Afternoon",
      subtitle: "Quiet Luxury & History",
      description: "Immerse yourself in the timeless architecture of the old quarter followed by a private tasting."
    };
  }
};