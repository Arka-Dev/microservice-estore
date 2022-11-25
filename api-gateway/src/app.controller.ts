import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientKafka } from '@nestjs/microservices';

@Controller()
export class AppController{
  constructor(
      private readonly appService: AppService,
      @Inject('USER_SERVICE') private readonly userClient: ClientKafka  
    ) {}


  @Get()
  getHello(): string {
    this.userClient.emit('user_test_event', "This is a test event" );
    return this.appService.getHello();
  }
}
