import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { LocationModule } from './location/location.module';

@Module({
  imports: [ConfigModule.forRoot(), LocationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
