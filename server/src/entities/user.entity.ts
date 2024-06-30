import { Column, Entity } from 'typeorm';
import { RoleType } from '../constants';
import { AbstractEntity } from '../common/abstract.entity';

@Entity({ name: 'users' })
export class UserEntity extends AbstractEntity{
  @Column({ nullable: true, type: 'varchar' })
  first_name!: string | null;

  @Column({ nullable: true, type: 'varchar' })
  last_name!: string | null;

  @Column({ nullable: true, type: 'varchar' })
  username!: string | null;

  @Column({ type: 'enum', enum: RoleType, default: RoleType.USER })
  role!: RoleType;

  @Column({ unique: true, nullable: true, type: 'varchar' })
  email!: string | null;

  @Column({ nullable: true, type: 'varchar' })
  password!: string | null;
}
