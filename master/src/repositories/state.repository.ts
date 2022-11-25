import { Injectable } from "@nestjs/common";
import { PrismaService } from "../common/prisma.service";

@Injectable()
export class StateRepository {
    constructor(
        private readonly prismaService: PrismaService
    ){}

    async activeStatesByCountryId({country_id} : any){
        const where = { cog_countries_id: country_id, has_cities: true};
        return await this.prismaService.cog_states.findMany({
            where
        });
    }
}