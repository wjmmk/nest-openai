import { Body, Controller, Post } from '@nestjs/common';
import { GptService } from './gpt.service';
import { CreateGptDto } from './dto/create-gpt.dto';
import { ProsConsDiscusserDto } from './dto/proscons-discusser.dto';

@Controller('gpt')
export class GptController {
  constructor(private readonly gptService: GptService) {}

  @Post('orthography')
  correctOrthography(@Body() createGptDto: CreateGptDto) {
    return this.gptService.callModelAi(createGptDto);
  }

  @Post('orthography-use-case')
  orthographyUseCase(@Body() createGptDto : CreateGptDto) {
    return this.gptService.orthographyCheckUseCase(createGptDto);
  }


  /**
   * Endpoint to call OpenAI from Gemini
   */
  @Post('orthography-openai-from-gemini')
  orthographyOpenAIFromGemini(@Body() createGptDto: CreateGptDto) {
    return this.gptService.callOpenAIFromGemini(createGptDto);
  }

  @Post('orthography-openai-pros-cons-discusser')
  orthographyOpenAIProsConsDiscusser(@Body() discusserGptDto: ProsConsDiscusserDto) {
    return this.gptService.prosConsDiscusser(discusserGptDto);
  }

   @Post('orthography-openai-pros-cons-discusser')
  orthographyOpenAIProsConsDiscusserStream(@Body() discusserGptDto: ProsConsDiscusserDto) {
    return this.gptService.prosConsDiscusser(discusserGptDto);
  }
}
  