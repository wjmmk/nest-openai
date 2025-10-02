import { Injectable } from '@nestjs/common';
import { CreateGptDto } from './dto/create-gpt.dto';
import { orthographyUseCase } from './use-cases/orthography.use-case';
import OpenAI from 'openai';


@Injectable()
export class GptService {
    // Este servicio es solo para llamar casos de Uso.

   private openai = new OpenAI({
         apiKey: process.env.OPENAI_API_KEY,
   })

   orthographyCheck(createGptDto: CreateGptDto) {
       return {
           code: 200,
           message: `Corrected orthography for: ${createGptDto.title}`,   
       }
    }
   
   orthographyCheckUseCase(createGptDto: CreateGptDto) {
         return orthographyUseCase(this.openai, {
             prompt: createGptDto.prompt,
             title: createGptDto.title ?? ''
         });
   }
}   