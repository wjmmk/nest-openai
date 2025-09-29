import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OpenaiModule } from './openai/openai.module';
import { OutServiceService } from './openai/out-service/out-service.service';

@Module({
  imports: [OpenaiModule],
  controllers: [AppController],
  providers: [AppService, OutServiceService],
})
export class AppModule {}
