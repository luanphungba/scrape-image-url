import {
  ClassSerializerInterceptor,
  HttpStatus,
  UnprocessableEntityException,
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import {
  ExpressAdapter,
  type NestExpressApplication,
} from '@nestjs/platform-express';
import compression from 'compression';
import helmet from 'helmet';
import morgan from 'morgan';
import { initializeTransactionalContext } from 'typeorm-transactional';

import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters/bad-request.filter';
import { AllHttpExceptionFilter } from './filters/http-exception.filter';
import { QueryFailedFilter } from './filters/query-failed.filter';
import { ApiConfigService } from './shared/services/api-config.service';
import { SharedModule } from './shared/shared.module';
import { TranslationInterceptor } from './interceptors/translation-interceptor.service';
import { TranslationService } from './shared/services/translation.service';
import { join } from 'path';
import { urlencoded, json } from 'express';
const cookieParser = require('cookie-parser')

export async function bootstrap(): Promise<NestExpressApplication> {
  initializeTransactionalContext();
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter()
  );
  const configService = app.select(SharedModule).get(ApiConfigService);
  function fnCors(origin, callback) {
    if (!origin || configService.getAllowOriginUrls.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS: '));
    }
  }
  app.enableCors({
    credentials: true,
    origin: fnCors
  })
  app.enable('trust proxy'); // only if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
  app.use(helmet());
  app.use(cookieParser());
  app.setGlobalPrefix('/api');
  app.use(compression());
  app.use(morgan('combined'));
  app.enableVersioning();
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));

  const reflector = app.get(Reflector);

  app.useGlobalFilters(
    new HttpExceptionFilter(reflector),
    new QueryFailedFilter(reflector),
    new AllHttpExceptionFilter(app.select(SharedModule).get(TranslationService))
  );

  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(reflector),
    new TranslationInterceptor(
      app.select(SharedModule).get(TranslationService),
    ),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      transform: true,
      dismissDefaultMessages: true,
      exceptionFactory: (errors) => {
        return new UnprocessableEntityException(errors)
      },
    }),
  );

  app.useStaticAssets(join(__dirname, '..', 'public'), {
    index: false,
    prefix: '/public',
  });

  

  // Starts listening for shutdown hooks
  if (!configService.isDevelopment) {
    app.enableShutdownHooks();
  }

  const port = configService.appConfig.port;
  await app.listen(port);

  console.info(`server running on ${await app.getUrl()}`);

  return app;
}

void bootstrap();
