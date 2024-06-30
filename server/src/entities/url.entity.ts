import { Column, Entity, OneToMany } from 'typeorm';
import { MediaEntity } from './media.entity';
import { AbstractEntity } from '../common/abstract.entity';

@Entity({ name: 'urls' })
export class UrlEntity extends AbstractEntity {
  @Column({ type: 'text' })
  url!: string;

  @OneToMany(() => MediaEntity, media => media.url)
  media!: MediaEntity[];

  @Column({ type: 'boolean', default: false })
  isScraped!: boolean;
}