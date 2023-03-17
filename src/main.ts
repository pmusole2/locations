import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const server = express();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server), {
    cors: false,
  });
  const config: ConfigService = app.get(ConfigService);

  const logger = new Logger('Location-Mgt-Api');

  const port: number = config.get<number>('PORT');

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  app.enableCors({
    origin: '*',
  });

  app.setGlobalPrefix('api');

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Location Mgt API')
    .setDescription(
      'API list for the locations in Zambia, (Provinces, Districts, Constituencies and Wards)',
    )
    .setVersion('1.0')
    .addTag('Location Mgt API')
    .build();

  await app.startAllMicroservices();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  await app
    .listen(port, () => {
      logger.verbose('[Location-API]', `Server running on port ${port}`);
    })
    .catch((error) => {
      logger.warn(
        'ERROR ENCOUNTER - Location Mgt Api instance failed to start due to; \n',
        error,
      );
    });
}
bootstrap();
