import OpenAI from "openai";
//import { GoogleGenAI } from '@google/genai';
//import { ChatGoogleGenerativeAI } from '@langchain/google-genai';

interface Options {
    prompt: string;
    title?: string;
}

const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 1000; // 1 second

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const orthographyUseCase = async (openai: OpenAI, options: Options): Promise<any> => {
    const { prompt } = options;

    for (let attempt = 1; attempt < MAX_RETRIES; attempt++) {
        const response = await openai.chat.completions.create({  
            model: 'gemini-2.5-flash',
            messages: [
                { role: 'user', content: prompt },
                { 
                  role: 'system', 
                  content: `Se te dará unos enunciados con posibles ERRORES ortográficos y gramaticales, tu tarea es corregir la ortografía 
                            y gramática del mismo retornando informacion relacionada a las soluciones, también debes de dar un PORCENTAJE
                            de confianza en la corrección relacionado con el acierto logrado por el Usuario.
                            Sí no hay errores, debes de retornar un mensaje de Felicidades con emojis.`
                },
            ],
            temperature: 0.2,
            max_tokens: 1024,
      });
       // return response.choices[0].message?.content ?? undefined;

        if (response.choices[0].message?.content) {
            const content = JSON.stringify(response.choices[0].message?.content ?? undefined);
            return content;
        }

        await delay(RETRY_DELAY_MS);
    }

    return undefined;
}


