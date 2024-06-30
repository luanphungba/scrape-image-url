import {
  EmailField,
  EnumField,
  StringField,
} from '../../../decorators';
import { RoleType } from '../../../constants';

export class UserRegisterDto {
  @EmailField()
  readonly email!: string;

  @StringField()
  readonly password!: string;

  @EnumField(() => RoleType, { default: RoleType.USER })
  readonly role: RoleType = RoleType.USER;
}
