import { Injectable } from '@nestjs/common';
import { StateRepository } from '../../repositories/state.repository';
import { CountryRepository } from '../../repositories/country.repository';

@Injectable()
export class CountryService {

    constructor(
        private countryRepository: CountryRepository,
        private stateRepository: StateRepository
    ){}

    async findAllActiveCountries(){
        return await this.countryRepository.activeCountries();
    }

    async findAllActiveStatesByCountryId({country_id}){
        return await this.stateRepository.activeStatesByCountryId({country_id});
    }
}
