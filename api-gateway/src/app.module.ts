import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { AllExceptionFilter } from './common/all-exception.filter';
import { LoggingInterceptor } from './common/logging.interceptor.';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MasterModule } from './master/master.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.register([{
      name: 'USER_SERVICE',
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: 'user',
          brokers: [process.env.KAFKA_URL]
        },
        consumer: {
          groupId: process.env.KAFKA_USER_CONSUMER
        }
      }
    }]),
    MasterModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    }
  ],
})
export class AppModule {}
