//import OpenAI from "openai";
import { GoogleGenAI } from '@google/genai';
//import { ChatGoogleGenerativeAI } from '@langchain/google-genai';

interface Options {
    prompt: string;
    title: string;
}

export const orthographyUseCase = async (gemini: GoogleGenAI, options: Options): Promise<any> => {
    const { prompt, title } = options;

    const response = await gemini.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `Eres un desarrollador experto en ${title}. Crea un programa que ${prompt}`,
        config: {
            thinkingConfig: {
                thinkingBudget: 0, // Disables thinking
            },
        }        
    });

    return response.candidates?.[0]?.content?.parts?.[0]?.text ?? undefined
}
    