import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import { UrlEntity } from 'entities/url.entity';
import { MediaEntity } from 'entities/media.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

puppeteer.use(StealthPlugin());

@Injectable()
export class ScrapeService implements OnModuleInit, OnModuleDestroy {
    private browser: any;
    constructor(
        @InjectRepository(UrlEntity)
        private urlRepository: Repository<UrlEntity>,
        @InjectRepository(MediaEntity)
        private mediaRepository: Repository<MediaEntity>,
    ) {}

    async onModuleInit() {
        console.log('run init browser')
        this.browser = await puppeteer.launch({
            headless: true,
            ignoreDefaultArgs: ['--disable-extensions'],
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        }); 
    }

    async onModuleDestroy() {
        console.log('run close browser')
        await this.browser.close();
    }

    public async scrapeMedia(url: string) {
        try {
            const page = await this.browser.newPage();
            await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });

            const media = await page.evaluate(() => {
                const imgElements = document.querySelectorAll('img');
                const videoElements = document.querySelectorAll('video');
                const mediaSrcs: { images: string[], videos: string[] } = {
                    images: [],
                    videos: []
                };

                imgElements.forEach(img => {
                    if (img.src) {
                        mediaSrcs.images.push(img.src);
                    }
                });

                videoElements.forEach(video => {
                    if (video.src) {
                        mediaSrcs.videos.push(video.src);
                    }
                });

                return mediaSrcs;
            });

            // Save media to the database
            await this.saveToDatabase(url, media);

            await page.close();
        } catch (error) {
            console.error('Error fetching the page:', error);
        }
    }

    private async saveToDatabase(url: string, media: { images: string[], videos: string[] }) {
        const urlEntity = await this.urlRepository.findOne({ where: { url } });
        if (urlEntity) {
            const mediaEntities: MediaEntity[] = [];

            for (const imageUrl of media.images) {
                mediaEntities.push(this.mediaRepository.create({
                    url: urlEntity,
                    mediaType: 'image',
                    mediaUrl: imageUrl
                }));
            }

            for (const videoUrl of media.videos) {
                mediaEntities.push(this.mediaRepository.create({
                    url: urlEntity,
                    mediaType: 'video',
                    mediaUrl: videoUrl
                }));
            }
            console.log('mediaEntities ', mediaEntities)

            if (mediaEntities.length > 0) {
                await this.mediaRepository.save(mediaEntities);
            }

            urlEntity.isScraped = true;
            await this.urlRepository.save(urlEntity);
        } else {
            console.error('URL not found in the database:', url);
        }
    }
}