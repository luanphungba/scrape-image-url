import {
  DateField,
  UUIDField,
} from '../../decorators';
import { type AbstractEntity } from '../abstract.entity';

export class AbstractDto {
  @UUIDField()
  id!: Uuid;

  @DateField()
  created_at!: Date;

  @DateField()
  updated_at!: Date;

  constructor(entity: AbstractEntity) {
    this.id = entity.id;
    this.created_at = entity.created_at;
    this.updated_at = entity.updated_at;
  }
}
