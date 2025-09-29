import { Module } from '@nestjs/common';
import { OpenaiService } from './openai.service';
import { OpenaiController } from './openai.controller';
import { ChatgptService } from './chatgpt/chatgpt.service';
import { OutServiceService } from './out-service/out-service.service';

@Module({
  controllers: [OpenaiController],
  providers: [OpenaiService, ChatgptService, OutServiceService],
})
export class OpenaiModule {}
