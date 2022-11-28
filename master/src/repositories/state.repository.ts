import { Injectable } from "@nestjs/common";
import { PrismaService } from "../common/prisma.service";

@Injectable()
export class StateRepository {
    constructor(
        private readonly prismaService: PrismaService
    ){}

    async activeStatesByCountryId({country_id} : any){
        try{
            const where = { cog_countries_id: country_id, has_cities: true};
            let states = await this.prismaService.cog_states.findMany({
                where,
                select: {
                    name: true,
                    cities: {
                        where: {
                            is_active: "Y"
                        }
                    }
                }
            });
            /*for(let i = 0; i < states.length; i++){
                let cities = await this.prismaService.cog_cities.findMany({
                    where: {
                        is_active: "Y",
                        cog_states_id: states[i].id
                    }
                });
                states[i]["cities"] = cities;
            };*/
            return states;
        }
        catch(err){
            console.log(err)
            return [];
        }
    }
}