import { Body, Controller, Get, HttpCode, Inject, OnModuleInit, Post, Request, UsePipes } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { StatesByCountryIdDTO } from '../../dto/states-by-country-id.dto';
import { StatesByCountryIdPipe } from '../states-by-country-id/states-by-country-id.pipe';

@Controller('location')
export class LocationController implements OnModuleInit{

    constructor(
        @Inject('MASTER_SERVICE') private readonly masterClient: ClientKafka
    ){}

    async onModuleInit() {
        this.masterClient.subscribeToResponseOf('get_master_countries');
        this.masterClient.subscribeToResponseOf('get_master_states');
    }

    @Get('countries')
    @HttpCode(201)
    async getCountryMaster(@Body() res: any){
        let all_countries = {};
        all_countries = await this.masterClient.send('get_master_countries', {});
        return all_countries;
    }

    @Post('states')
    @UsePipes(StatesByCountryIdPipe)
    async getStatesbyCountryId(@Body() statesByCountryReq: StatesByCountryIdDTO, @Request() req: any){
        const {country_id} =  statesByCountryReq;
        let states = await this.masterClient.send('get_master_states', { country_id });
        return states;
    }
}
