 import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    Logger,
    CallHandler,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  import { tap } from 'rxjs/operators';
  
  @Injectable()
  export class LoggingInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      const className = context.getClass().name;
      const methodName = context.getHandler().name;
  
      const body = context.switchToHttp().getRequest().body;
      Logger.log(`${className}.${methodName} started...`);
      if (body !== null) {
        Logger.log(`RequestBody - ${JSON.stringify(body)}`);
      }
  
      return next
        .handle()
        .pipe(tap(() => Logger.log(`${className}.${methodName} exited`)));
    }
  }
  