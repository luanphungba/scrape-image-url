import { ClassField } from '../../../decorators';
import { TokenPayloadDto } from './token-payload.dto';

export class LoginPayloadDto {

  @ClassField(() => TokenPayloadDto)
  token: TokenPayloadDto;

  constructor(token: TokenPayloadDto) {
    this.token = token;
  }
}
