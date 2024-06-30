import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Get,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ScrapeService } from './scrape.service';
import { RoleType } from '../../constants';
import { Auth } from '../../decorators';

@Controller('scrape')
@ApiTags('scrape')
export class ScrapeController {
  constructor(
    private scrapeService: ScrapeService,
  ) {}

  @Post()
  @Auth([RoleType.USER])
  async scrapeUrls(@Body() body: { urls: string[] }) {
    if (!body.urls || !Array.isArray(body.urls)) {
      throw new HttpException('Invalid input', HttpStatus.BAD_REQUEST);
    }

    try {
      const results = await this.scrapeService.scrapeAndStoreUrls(body.urls);
      return { message: 'URLs processed', results };
    } catch (error) {
      console.log('error ', error)
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('media')
  async getMedia(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('type') type?: string,
    @Query('search') search?: string,
  ) {
    try {
      const results = await this.scrapeService.getMedia({ page, limit, type, search });
      return results;
    } catch (error) {
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}