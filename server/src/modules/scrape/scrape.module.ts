import { Module } from '@nestjs/common';

import { ScrapeController } from './scrape.controller';
import { ScrapeService } from './scrape.service';
import { ProducerService } from '../../shared/services/producer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UrlEntity } from '../../entities/url.entity';
import { MediaEntity } from '../../entities/media.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UrlEntity, MediaEntity]), // Import the UrlEntity repository
  ],
  controllers: [ScrapeController],
  providers: [ScrapeService, ProducerService],
  exports: [ScrapeService],
})
export class ScrapeModule {}
