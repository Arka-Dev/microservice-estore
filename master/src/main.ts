import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const appClient = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: [process.env.KAFKA_URL],
      },
      consumer: {
          groupId: process.env.KAFKA_CONSUMER,
      }
    }
  });
  await appClient.listen();
}
bootstrap();
