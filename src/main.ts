import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransfomInterceptor } from './interceptor/transform.interceptor';

const port = 3000;
async function bootstrap() {
  const logger = new Logger('Application Started', { timestamp: true });
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransfomInterceptor());
  await app.listen(port);
  logger.log(`Application is running on Port ==> ${port}`);
}
bootstrap();
