import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const port = app.get(ConfigService).get('port');
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(port, () => {
    console.log(`listen at port ${port}`);
  });
}
bootstrap();
