import { Body, Controller, Post } from '@nestjs/common';
import { GptService } from './gpt.service';
import { CreateGptDto } from './dto/create-gpt.dto';

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

  @Post('orthography-openai-from-gemini')
  orthographyOpenAIFromGemini(@Body() createGptDto: CreateGptDto) {
    console.log('Llamando a orthographyOpenAIFromGemini con DTO:', createGptDto);
    return this.gptService.callOpenAIFromGemini(createGptDto);
  }
}
  