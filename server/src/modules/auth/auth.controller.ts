import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { UserService } from 'modules/user/user.service';
import { LoginPayloadDto } from './dto/login-payload.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { Response } from 'express';
import moment from 'moment';
import { UserDto } from 'modules/user/dtos/user.dto';


@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: LoginPayloadDto,
    description: 'User info with access token',
  })
  async userLogin(
    @Body() userLoginDto: UserLoginDto,
    @Res({passthrough: true}) response: Response,
  ): Promise<LoginPayloadDto> {
    const userEntity = await this.authService.validateUser(userLoginDto);
    
    if(!userEntity){
      throw new BadRequestException()
    }

    const token = await this.authService.createAccessToken({
      userId: userEntity.id,
      role: userEntity.role,
      username: userEntity.username || ''
    });
    response.cookie('access_token', token?.accessToken, {secure: false, httpOnly: false, path: '/', expires: moment().add(token.expiresIn, 'seconds').toDate()});

    return new LoginPayloadDto(token);
  }

  @Post('register')
  @HttpCode(HttpStatus.OK)
  async userRegister(
    @Body() userRegisterDto: UserRegisterDto
  ): Promise<UserDto> {
    const createdUser = await this.userService.createUser(
      userRegisterDto
    );
    return new UserDto(createdUser);
  }
  
}
