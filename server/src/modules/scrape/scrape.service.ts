import { Injectable } from '@nestjs/common';
import { ProducerService } from 'shared/services/producer.service';
import { UrlEntity } from '../../entities/url.entity';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MediaEntity } from '../../entities/media.entity';

@Injectable()
export class ScrapeService {
  constructor(
    private producerService: ProducerService,
    @InjectRepository(UrlEntity)
    private urlRepository: Repository<UrlEntity>,
    @InjectRepository(MediaEntity)
    private mediaRepository: Repository<MediaEntity>,
  ) {}

  async scrapeAndStoreUrls(urls: string[]) {
    // Fetch existing URLs from the database
    const existingUrls = await this.urlRepository.find({
      where: {
        url: In(urls),
      },
    });

    // Extract existing URLs for comparison
    const existingUrlSet = new Set(existingUrls.map(urlEntity => urlEntity.url));

    // Filter out URLs that are already in the database
    const newUrls = urls.filter(url => !existingUrlSet.has(url));

    // Insert new URLs in bulk
    if (newUrls.length > 0) {
      await this.urlRepository.insert(newUrls.map(url => ({ url })));
    }

    for(let url of newUrls) {
      this.producerService.addToUrlScrapeQueue(url).catch(error => {
        console.log('error ', error)
      });
    }
  }

  async getMedia({ page, limit, type, search }: { page: number, limit: number, type?: string, search?: string }) {
    const query = this.mediaRepository.createQueryBuilder('media')
      .leftJoinAndSelect('media.url', 'url')
      .skip((page - 1) * limit)
      .take(limit);

    if (type) {
      query.andWhere('media.mediaType = :type', { type });
    }

    if (search) {
      query.andWhere('media.mediaUrl LIKE :search OR url.url LIKE :search', { search: `%${search}%` });
    }

    const [results, total] = await query.getManyAndCount();

    return {
      results,
      total,
      page,
      limit,
    };
  }
}