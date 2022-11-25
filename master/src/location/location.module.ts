import { Module } from '@nestjs/common';
import { StateRepository } from '../repositories/state.repository';
import { PrismaService } from '../common/prisma.service';
import { CountryRepository } from '../repositories/country.repository';
import { CountryController } from './country/country.controller';
import { CountryService } from './country/country.service';

@Module({
    controllers: [ CountryController ],
    providers: [CountryService, CountryRepository, PrismaService, StateRepository]
})
export class LocationModule {}
