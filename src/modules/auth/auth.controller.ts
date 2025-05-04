import { ApiTags } from "@nestjs/swagger";
import { Body, Controller, Get, HttpStatus, Param, Post, UseGuards } from "@nestjs/common";

import { CreateUserDto } from "@modules/users/dto/CreateUser.dto";
import { UserService } from "@modules/users/user.service";
import { LoginDto } from "./dto/Login.dto";
import { AuthService } from "./auth.service";
import { GetToken } from "src/decorators/GetToken";
import { SelfUpdateGuard } from "./self.guard";

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) { }

  @Post("/register")
  async registerUser(
    @Body() payload: CreateUserDto,
  ) {
    const result = await this.userService.create(payload);

    if (result.isLeft()) return {
      data: null,
      message: result.value.message,
      statusCode: HttpStatus.BAD_REQUEST
    }

    return {
      data: result.value,
      message: null,
      statusCode: HttpStatus.OK
    }
  }

  @Post("/login")
  async login(
    @Body() payload: LoginDto
  ) {
    const result = await this.authService.login(payload)

    if (result.isLeft()) return {
      data: null,
      message: result.value.message,
      statusCode: HttpStatus.BAD_REQUEST
    }

    return {
      data: result.value,
      message: null,
      statusCode: HttpStatus.OK
    }
  }

  @Get("/logout")
  @UseGuards(SelfUpdateGuard)
  async logout(
    @GetToken() token: string,
  ) {
    const result = await this.authService.logout(token);

    if (result.isLeft()) return {
      data: null,
      message: result.value.message,
      statusCode: HttpStatus.BAD_REQUEST
    }

    return {
      data: result.value,
      message: null,
      statusCode: HttpStatus.OK
    }
  }
}