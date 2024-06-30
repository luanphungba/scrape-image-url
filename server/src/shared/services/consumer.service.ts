import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import amqp, { ChannelWrapper } from 'amqp-connection-manager';
import { ConfirmChannel } from 'amqplib';
import { ApiConfigService } from './api-config.service';
import { ScrapeService } from './scrape.service';

@Injectable()
export class ConsumerService implements OnModuleInit {
  private channelWrapper: ChannelWrapper;
  private readonly logger = new Logger(ConsumerService.name);

  constructor(
    private readonly configService: ApiConfigService,
    private readonly scrapeService: ScrapeService // Inject ScrapeService
  ) {
    const { host, port, user, password } = this.configService.rabbitConfig;
    const connectionUrl = `amqp://${user}:${password}@${host}:${port}`;
    const connection = amqp.connect([connectionUrl]);
    this.channelWrapper = connection.createChannel();
  }

  public async onModuleInit() {
    try {
      await this.channelWrapper.addSetup(async (channel: ConfirmChannel) => {
        await channel.assertQueue('urlScrapeQueue', { durable: true }); // Update queue name
        await channel.prefetch(10); // Set the maximum number of messages to handle concurrently
        await channel.consume('urlScrapeQueue', async (message) => { // Update queue name
          if (message) {
            const content = JSON.parse(message.content.toString());
            this.logger.log('Received message:', content);
            try {
              await this.scrapeService.scrapeMedia(content.url); // Call scrapeUrl method
              this.logger.log('Scraping completed for URL:', content.url);
            } catch (error) {
              this.logger.error('Error scraping URL:', content.url, error);
            }
            channel.ack(message);
          }
        });
      });
      this.logger.log('Consumer service started and listening for messages.');
    } catch (err) {
      this.logger.error('Error starting the consumer:', err);
    }
  }
}