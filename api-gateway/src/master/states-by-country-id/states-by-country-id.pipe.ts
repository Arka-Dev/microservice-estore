import { ArgumentMetadata, HttpException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class StatesByCountryIdPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    let responseData = {};
    if(value.country_id){
      return value;
    }
    else{
      responseData['response_code'] = 401;
      responseData['message'] = "Bad Request";
      responseData['status'] = 0;

      throw new HttpException(responseData, 401);
    }
  }
}
