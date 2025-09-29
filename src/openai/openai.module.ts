import { Module } from '@nestjs/common';
import { OpenaiService } from './openai.service';
import { OpenaiController } from './openai.controller';
import { OutServiceService } from './out-service/out-service.service';

@Module({
  controllers: [OpenaiController],
  providers: [OpenaiService, OutServiceService],
})
export class OpenaiModule {}
