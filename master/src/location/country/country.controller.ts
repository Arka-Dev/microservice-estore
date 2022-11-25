import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MasterStateByCountryIdDTO } from '../../dto/master-state-by-country-id.dto';
import { CountryService } from './country.service';

@Controller('country')
export class CountryController {

    constructor(
        private countryService: CountryService
    ){}

    @MessagePattern('get_master_countries')
    async masterActiveCountries(@Payload() message: any){
        const countries = await this.countryService.findAllActiveCountries();
        return countries;
    }

    @MessagePattern('get_master_states')
    async masterActiveStatesByCountryId(@Payload() masterStateByCountryId: MasterStateByCountryIdDTO){
        return await this.countryService.findAllActiveStatesByCountryId(masterStateByCountryId);
    }
}
