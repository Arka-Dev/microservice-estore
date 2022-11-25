import { Injectable } from "@nestjs/common";
import { PrismaService } from "../common/prisma.service";

@Injectable()
export class CountryRepository {
    constructor(
        private readonly prismaService: PrismaService
    ){}

    async activeCountries(){
        const where = { has_states: true, has_cities: true};
        return await this.prismaService.cog_countries.findMany({
            where
        });
    }
}