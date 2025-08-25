
import { GoogleGenAI } from "@google/genai";
import { GEMINI_PROMPT_TEMPLATE } from '../constants';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

/**
 * Generates React UI component code from a JSON configuration string.
 * @param jsonConfig The JSON string describing the form variables.
 * @returns A promise that resolves to the generated React component code as a string.
 */
export const generateUiCode = async (jsonConfig: string): Promise<string> => {
  try {
    const fullPrompt = `${GEMINI_PROMPT_TEMPLATE}\n${jsonConfig}`;
    
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: fullPrompt,
    });
    
    const code = response.text;

    // Clean up potential markdown fences that the model might accidentally add
    const cleanedCode = code.replace(/^```tsx\s*|```\s*$/g, '').trim();

    return cleanedCode;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to generate code from Gemini API.");
  }
};
