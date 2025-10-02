//import OpenAI from "openai";
import { GoogleGenAI } from '@google/genai';
//import { ChatGoogleGenerativeAI } from '@langchain/google-genai';

interface Options {
    prompt: string;
    title: string;
}

export const orthographyUseCase = async (gemini: GoogleGenAI, options: Options): Promise<any> => {
    const { prompt, title } = options;

    const completion = await fetch("https://openrouter.ai/api/v1/chat/completions",{
        method: "POST",
        headers: {
            "Authorization": `Bearer ${process.env.GOOGLE_API_KEY}`, // Replace with your actual API key
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "model": "google/gemini-2.5-flash",
            "messages": [
                {
                    "role": "user",
                    "content": [
                        { role: 'user', content: `Eres un desarrollador experto en ${title}. Crea un programa que ${prompt}` },
                        {
                            "type": "image_url",
                            "image_url": {
                                "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg"
                            }
                        }
                    ]
                }
            ]
        })
    });

    return completion.json();
}
    