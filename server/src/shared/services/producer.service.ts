import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import amqp, { ChannelWrapper } from 'amqp-connection-manager';
import { Channel } from 'amqplib';
import { ApiConfigService } from './api-config.service';

@Injectable()
export class ProducerService {
  private channelWrapper: ChannelWrapper;

  constructor(private readonly configService: ApiConfigService) {
    const { host, port, user, password } = this.configService.rabbitConfig;
    const connectionUrl = `amqp://${user}:${password}@${host}:${port}`;
    const connection = amqp.connect([connectionUrl]);
    this.channelWrapper = connection.createChannel({
      setup: (channel: Channel) => {
        return channel.assertQueue('urlScrapeQueue', { durable: true });
      },
    });
  }

  async addToUrlScrapeQueue(url: string) {
    try {
      await this.channelWrapper.sendToQueue(
        'urlScrapeQueue',
        Buffer.from(JSON.stringify({ url })),
      );
      Logger.log('Sent To Queue');
    } catch (error) {
      throw new HttpException(
        'Error adding URL to queue',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
