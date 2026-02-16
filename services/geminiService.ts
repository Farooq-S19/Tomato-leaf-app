
import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult } from "../types";

export const analyzeLeafImage = async (base64Image: string): Promise<AnalysisResult> => {
  // Always use this exact initialization pattern as per guidelines.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `Analyze this image of a plant leaf. The system is currently optimized for tomato plant (Solanum lycopersicum) diagnostics, but should identify any species present.
  
  1. Determine the botanical species.
  2. Perform a clinical health assessment. 
  3. Look for common tomato pathologies like Early Blight, Late Blight, Tomato Mosaic Virus, Leaf Mold, or Spider Mites if applicable.
  4. If a disease or nutrient deficiency is found, name it clearly and provide specific morphological symptoms and clinical treatment recommendations.
  
  Return the result in strict JSON format.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: base64Image.split(',')[1] || base64Image,
            },
          },
          { text: prompt },
        ],
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            plantName: { type: Type.STRING },
            healthStatus: { type: Type.STRING, enum: ['Healthy', 'Diseased', 'Unknown'] },
            diseaseName: { type: Type.STRING },
            confidence: { type: Type.NUMBER },
            description: { type: Type.STRING },
            symptoms: { type: Type.ARRAY, items: { type: Type.STRING } },
            recommendations: { type: Type.ARRAY, items: { type: Type.STRING } },
          },
          required: ['plantName', 'healthStatus', 'confidence', 'description', 'symptoms', 'recommendations'],
        },
      },
    });

    const result = JSON.parse(response.text || '{}');
    return result as AnalysisResult;
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw new Error("Failed to analyze image. Please ensure the tomato leaf is centered and well-lit.");
  }
};