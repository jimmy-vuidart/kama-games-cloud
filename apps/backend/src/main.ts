import { NestApplicationOptions } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as fs from 'node:fs';
import { AppModule } from './app.module';

async function bootstrap() {
  const config: NestApplicationOptions = {};

  if (process.env['ENABLE_SSL ']) {
    config.httpsOptions = {
      key: fs.readFileSync(process.env.HTTPS_KEY_LOCATION as string),
      cert: fs.readFileSync(process.env.HTTPS_CERT_LOCATION as string),
    };
  }

  const app = await NestFactory.create(AppModule, config);
  app.enableCors();
  app.setGlobalPrefix('kilsiworld/api');
  await app.listen(process.env.PORT || 3000);
}

bootstrap();
