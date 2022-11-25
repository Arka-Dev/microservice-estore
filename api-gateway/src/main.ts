import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import * as compression from 'compression';
import rateLimit from 'express-rate-limit';
import { AllExceptionFilter } from './common/all-exception.filter';

async function bootstrap() {
  const corsConfig = {
    origin: '*',
    optionsSuccessStatus: 200,
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Accept', 'x-api-key', 'authorization'],
    credentials: true,
  };
  const app = await NestFactory.create(AppModule, { cors: corsConfig });
  const WINDOWMS_START_TIME = 5;
  const WINDOWNMS_END_TIME = 60;
  const WINDOWN_TOTAL_TIME = 1000;
  app.use(
    rateLimit({
      windowMs: WINDOWMS_START_TIME * WINDOWNMS_END_TIME * WINDOWN_TOTAL_TIME, // 1000 minutes
      max: 2000, // limit each IP to 2000 request per windowMs
    }),
    helmet(), // protect some well-known web vulnerabilities using http headers appropriately
    compression(), // enable gzip to reduce response body size
  );
  app.enableCors();
  app.useGlobalFilters(new AllExceptionFilter());
  await app.listen(process.env.PORT);
}
bootstrap();
