/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { GptService } from './gpt.service';
import { CreateGptDto } from './dto/create-gpt.dto';
import { ProsConsDiscusserDto } from './dto/proscons-discusser.dto';
import { Response } from 'express';

@Controller('gpt')
export class GptController {
  constructor(private readonly gptService: GptService) {}

  @Post('orthography')
  correctOrthography(@Body() createGptDto: CreateGptDto) {
    return this.gptService.orthographyCheckUseCase(createGptDto);
  }

  @Post('orthography-use-case')
  orthographyUseCase(@Body() createGptDto : CreateGptDto) {
    return this.gptService.orthographyCheckUseCase(createGptDto);
  }


  /**
   * Endpoint to call OpenAI from Gemini
   */
  @Post('orthography-openai-pros-cons-discusser')
  orthographyOpenAIProsConsDiscusser(@Body() discusserGptDto: ProsConsDiscusserDto) {
    return this.gptService.prosConsDiscusser(discusserGptDto);
  }

  @Post('orthography-openai-pros-cons-discusser-stream')
   async orthographyOpenAIProsConsDiscusserStream(
     @Body() discusserGptDto: ProsConsDiscusserDto,
     @Res() res: Response
   ) {
    const respStream = await this.gptService.prosConsDiscusserStream(discusserGptDto);

    res.setHeader('Content-Type', 'application/json');
    res.status(HttpStatus.OK);

    for await (const chunk of respStream) {
      try {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          const choice = chunk?.choices?.[0];
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          const piece = choice?.delta?.content ?? '';

          if (piece) {
            res.write(piece);
          }
      } catch (err) {
        console.error('Error procesando chunk:', err);
      }
    }
    res.end();
   }
}
  