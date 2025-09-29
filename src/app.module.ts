import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OpenaiModule } from './openai/openai.module';
import { ChatgptService } from './chatgpt/chatgpt.service';

@Module({
  imports: [OpenaiModule],
  controllers: [AppController],
  providers: [AppService, ChatgptService],
})
export class AppModule {}
