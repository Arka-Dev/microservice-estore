import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { LocationController } from './location/location.controller';

@Module({
    imports: [
        ConfigModule.forRoot(),
        ClientsModule.register([{
            name: 'MASTER_SERVICE',
            transport: Transport.KAFKA,
            options: {
                client: {
                clientId: 'master',
                brokers: [process.env.KAFKA_URL]
                },
                consumer: {
                groupId: process.env.KAFKA_MASTER_CONSUMER
                }
            }
        }]),
    ],
    controllers: [LocationController]
})
export class MasterModule {}
