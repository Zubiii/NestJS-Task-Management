import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransfomInterceptor } from './interceptor/transform.interceptor';

const port = 3000;
async function bootstrap() {
  // Init logger
  const logger = new Logger('Application Started', { timestamp: true });

  const app = await NestFactory.create(AppModule);

  // Set prefix to the route
  app.setGlobalPrefix('api');

  app.useGlobalPipes(new ValidationPipe());

  // Set Global Interceptor
  app.useGlobalInterceptors(new TransfomInterceptor());

  // Enable CORS
  app.enableCors();

  //litining on port
  await app.listen(port);
  logger.log(`Application is running on Port ==> ${port}`);
}
bootstrap();
