import { Injectable } from '@nestjs/common';
import { CreateGptDto } from './dto/create-gpt.dto';
import { orthographyUseCase } from './use-cases/orthography.use-case';
import OpenAI from 'openai';
import { GoogleGenAI } from '@google/genai';
import { ProsConsDiscusserDto } from './dto/proscons-discusser.dto';
import { orthographyConsDiscusser } from './use-cases/orthografy-discusser-case';
import { orthographyConsDiscusserStream } from './use-cases/orthografy-stream-case';
//import { ChatGoogleGenerativeAI } from '@langchain/google-genai';

@Injectable()
export class GptService {
   private openai = new OpenAI({
         baseURL: 'https://generativelanguage.googleapis.com/v1beta/openai/',
         apiKey: process.env.GEMINI_API_KEY,
   })

   async callOpenAIFromGemini(createGptDto: CreateGptDto): Promise<any> {
      const { prompt, title } = createGptDto;
      const response = await this.openai.chat.completions.create({  
            model: 'gemini-2.5-flash',
            reasoning_effort: 'low',
            messages: [
               /* { role: 'system', content: 'You are a helpful assistant that translates English to Spanish.' }, */
               { role: 'system', content: `Eres un desarrollador experto en ${title}. Crea un programa que ${prompt}` },
            ],
            temperature: 0.3,
            max_tokens: 1024,
      });
        return response.choices[0].message?.content ?? undefined;
  }

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

   async prosConsDiscusser(discusserGptDto: ProsConsDiscusserDto): Promise<any> {
      return orthographyConsDiscusser(this.openai, {
            prompt: discusserGptDto.prompt,
        });
    }

    async prosConsDiscusserStream(discusserGptDto: ProsConsDiscusserDto): Promise<any> {
        return await orthographyConsDiscusserStream(this.openai, {
            prompt: discusserGptDto.prompt,
        });
    }
}   