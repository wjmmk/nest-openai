import { Injectable } from '@nestjs/common';
import { CreateGptDto } from './dto/create-gpt.dto';
import { orthographyUseCase } from './use-cases/orthography.use-case';
//import OpenAI from 'openai';
import { GoogleGenAI } from '@google/genai';
//import { ChatGoogleGenerativeAI } from '@langchain/google-genai';

@Injectable()
export class GptService {
  /*  private openai = new OpenAI({
         baseURL: 'https://openrouter.ai/api/v1',
         apiKey: process.env.OPENAI_API_KEY,
   }) */


   private gemini = new GoogleGenAI({apiKey: process.env.GOOGLE_API_KEY}); 

   async callModelAi(createGptDto: CreateGptDto): Promise<any> {
      const { prompt, title } = createGptDto;
        //return this.callOpenRouterAPI(createGptDto);
        const response = await this.gemini.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Eres un desarrollador experto en ${title}. Crea un programa que ${prompt}`,
            config: {
            thinkingConfig: {
                thinkingBudget: 0, // Disables thinking
               },
            }
        });

        return response.candidates?.[0]?.content?.parts?.[0]?.text ?? undefined;  
    }

   
   async orthographyCheckUseCase(createGptDto: CreateGptDto): Promise<any> {
        return orthographyUseCase(this.gemini, {
            prompt: createGptDto.prompt,
            title: createGptDto.title ?? ''
        });
   }
}   