import { RoleType } from '../../../constants';
import {
  EmailFieldOptional,
  EnumFieldOptional,
  StringFieldOptional,
} from '../../../decorators';
import { type UserEntity } from 'entities';
import { AbstractDto } from '../../../common/dto/abstract.dto';

// TODO, remove this class and use constructor's second argument's type
export type UserDtoOptions = Partial<{ isActive: boolean }>;

export class UserDto extends AbstractDto{
  @StringFieldOptional({ nullable: true })
  first_name?: string | null;

  @StringFieldOptional({ nullable: true })
  last_name?: string | null;

  @EnumFieldOptional(() => RoleType)
  role?: RoleType;

  @EmailFieldOptional({ nullable: true })
  email?: string | null;

  constructor(user: UserEntity) {
    super(user);
    this.first_name = user.first_name;
    this.last_name = user.last_name;
    this.role = user.role;
    this.email = user.email;
  }
}
