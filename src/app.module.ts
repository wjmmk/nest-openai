import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OpenaiModule } from './openai/openai.module';
import { OutServiceService } from './openai/out-service/out-service.service';
import { GptModule } from './gpt/gpt.module';

@Module({
  imports: [OpenaiModule, GptModule],
  controllers: [AppController],
  providers: [AppService, OutServiceService],
})
export class AppModule {}
