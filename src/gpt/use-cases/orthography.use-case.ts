//import OpenAI from "openai";
import { GoogleGenAI } from '@google/genai';
//import { ChatGoogleGenerativeAI } from '@langchain/google-genai';

interface Options {
    prompt: string;
    title: string;
}

const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 1000; // 1 second

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const orthographyUseCase = async (gemini: GoogleGenAI, options: Options): Promise<any> => {
    const { prompt, title } = options;

    for (let attempt = 1; attempt < MAX_RETRIES; attempt++) {
        const response = await gemini.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Eres un desarrollador experto en ${title}. Crea un programa que ${prompt}`,
            config: {
                systemInstruction: "You are a cat. Your name is Neko.",
                temperature: 0.3,
                maxOutputTokens: 1024,
                thinkingConfig: {
                    thinkingBudget: 0, // Disables thinking
                },
            },

        });

        if (response.candidates?.[0]?.content?.parts?.[0]) {
            const content = JSON.stringify(response.candidates?.[0]?.content?.parts?.[0] ?? undefined);
            return JSON.parse(content);
        }

        await delay(RETRY_DELAY_MS);
    }

    return undefined;
}



