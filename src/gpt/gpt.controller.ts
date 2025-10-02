import { Body, Controller, Post } from '@nestjs/common';
import { GptService } from './gpt.service';
import { CreateGptDto } from './dto/create-gpt.dto';

@Controller('gpt')
export class GptController {
  constructor(private readonly gptService: GptService) {}

  @Post('orthography')
  correctOrthography(@Body() createGptDto: CreateGptDto) {
    return this.gptService.orthographyCheck(createGptDto);
  }

  @Post('orthography-use-case')
  orthographyUseCase(@Body() createGptDto : CreateGptDto) {
    return this.gptService.callModelAi(createGptDto);
  }
}
  