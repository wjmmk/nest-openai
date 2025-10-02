import { Injectable } from '@nestjs/common';
import { CreateGptDto } from './dto/create-gpt.dto';
import { orthographyUseCase } from './use-cases/orthography.use-case';
//import OpenAI from 'openai';
import { GoogleGenAI } from '@google/genai';
//import { ChatGoogleGenerativeAI } from '@langchain/google-genai';

@Injectable()
export class GptService {
    // Este servicio es solo para llamar casos de Uso.

  /*  private openai = new OpenAI({
         baseURL: 'https://openrouter.ai/api/v1',
         apiKey: process.env.OPENAI_API_KEY,
   }) */

  

   private gemini = new GoogleGenAI({apiKey: process.env.GOOGLE_API_KEY}); 


    async callModelAi(createGptDto: CreateGptDto): Promise<any> {
        const { prompt, title } = createGptDto;
        //return this.callOpenRouterAPI(createGptDto);
        const response = await this.gemini.models.generateContentStream({
            model: "gemini-2.5-flash",
            contents: `Eres un aprendiz de ${title}. Crea un receta ${prompt}`
        });

        for await (const chunk of response) {
            //console.log(chunk.text);
            return chunk.text;
        }
    }

async callOpenRouterAPI(createGptDto: CreateGptDto): Promise<any> {
    const { prompt, title } = createGptDto;
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${process.env.GOOGLE_API_KEY}`, // Replace with your actual API key
            "HTTP-Referer": "<YOUR_SITE_URL>", // Optional. Site URL for rankings on openrouter.ai.
            "X-Title": "<YOUR_SITE_NAME>", // Optional. Site title for rankings on openrouter.ai.
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
    return response.json();
 }


   orthographyCheck(createGptDto: CreateGptDto) {
       return {
           code: 200,
           message: `Corrected orthography for: ${createGptDto.title}`,   
       }
    }
   
   orthographyCheckUseCase(createGptDto: CreateGptDto) {
        return orthographyUseCase(this.gemini, {
            prompt: createGptDto.prompt,
            title: createGptDto.title ?? ''
        });
   }
}   