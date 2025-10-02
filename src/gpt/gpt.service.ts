import { Injectable } from '@nestjs/common';
import { CreateGptDto } from './dto/create-gpt.dto';
import { orthographyUseCase } from './use-cases/orthography.use-case';


@Injectable()
export class GptService {
    // Este servicio es solo para llamar casos de Uso.

   orthographyCheck(createGptDto: CreateGptDto) {
       return {
           code: 200,
           message: `Corrected orthography for: ${createGptDto.title}`,   
       }
    }
   
   orthographyCheckUseCase(createGptDto: CreateGptDto) {
         return orthographyUseCase({
             prompt: createGptDto.prompt,
             title: createGptDto.title ?? ''
         });
   }
}   