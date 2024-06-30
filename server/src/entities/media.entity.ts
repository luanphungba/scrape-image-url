import { Column, Entity, ManyToOne } from 'typeorm';
import { AbstractEntity } from '../common/abstract.entity';
import { UrlEntity } from './url.entity';

@Entity({ name: 'media' })
export class MediaEntity extends AbstractEntity {
  @ManyToOne(() => UrlEntity, url => url.media)
  url!: UrlEntity;

  @Column({ type: 'text' })
  mediaType!: string;

  @Column({ type: 'text' })
  mediaUrl!: string;
}