import { Body, Controller, Get, HttpStatus, Param, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { CreateUserDto } from "./dto/CreateUser.dto";
import { UserService } from "./user.service";
import { UpdateUserDto } from "./dto/UpdateUser.dto";

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  async createUser(
    @Body() data: CreateUserDto,
  ) {
    const result = await this.userService.create(data);

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

  @Get()
  async findManyUsers() {
    const result = await this.userService.findMany();

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

  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() payload: UpdateUserDto,
  ) {
    const result = await this.userService.update(id, payload);

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