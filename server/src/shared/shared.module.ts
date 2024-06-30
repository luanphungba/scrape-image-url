import { Global, Module, type Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ApiConfigService } from './services/api-config.service';
import { GeneratorService } from './services/generator.service';
import { TranslationService } from './services/translation.service';
import { ProducerService } from './services/producer.service';
import { ConsumerService } from './services/consumer.service';
import { ScrapeService } from './services/scrape.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UrlEntity } from '../entities/url.entity';
import { MediaEntity } from '../entities/media.entity';



const providers: Provider[] = [
  ApiConfigService,
  GeneratorService,
  TranslationService,
  ProducerService,
  ConsumerService,
  ScrapeService
];

@Global()
@Module({
  providers,
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([UrlEntity, MediaEntity]),
  ],
  exports: [...providers, CqrsModule],
})
export class SharedModule {}
