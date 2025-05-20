import { ApiHeaders, ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';

import { CreateUserDto } from '@modules/users/dto/CreateUser.dto';
import { UserService } from '@modules/users/user.service';
import { LoginDto } from './dto/Login.dto';
import { AuthService } from './auth.service';
import { GetToken } from 'src/decorators/GetToken';
import { SelfUpdateGuard } from 'src/guards';
import { ResponseSend } from '@modules/shared/responseSend';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) { }

  @Post('/register')
  async registerUser(@Body() payload: CreateUserDto) {
    const result = await this.userService.create(payload);

    if (result.isLeft()) return ResponseSend(
      null,
      result.value.message,
      HttpStatus.BAD_REQUEST,
    );

    return ResponseSend(
      result.value,
      null,
      HttpStatus.CREATED,
    );
  }

  @Post('/login')
  async login(@Body() payload: LoginDto) {
    console.log(payload)
    const result = await this.authService.login(payload);

    if (result.isLeft()) return ResponseSend(
      null,
      result.value.message,
      HttpStatus.BAD_REQUEST,
    );

    return ResponseSend(
      result.value,
      null,
      HttpStatus.OK,
    );
  }

  @Get('/logout')
  @UseGuards(SelfUpdateGuard)
  @ApiHeaders([{
    name: 'Authorization',
    description: 'Authorization Bearer Token, necessary to logout.',
    required: true,
  }])
  async logout(@GetToken() token: string) {
    const result = await this.authService.logout(token);

    if (result.isLeft()) return ResponseSend(
      null,
      result.value.message,
      HttpStatus.BAD_REQUEST,
    );

    return ResponseSend(
      null,
      'Logout bem sucedido.',
      HttpStatus.OK,
    );
  }
}
