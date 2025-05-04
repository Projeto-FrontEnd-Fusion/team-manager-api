import { Body, Controller, Get, HttpStatus, Param, Patch, Post } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";

import { CreateUserDto, UpdateUserDto } from "./dto";
import { UserService } from "./user.service";
import { MemberService } from "@modules/members/member.service";

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly memberService: MemberService,
  ) { }

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

  @Get(':id')
  async findUserById(
    @Param('id') id: string,
  ) {
    const result = await this.userService.findById(id);

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

  @Get(':id')
  async profile(
    @Param('id') id: string,
  ) {
    const result = await this.memberService.findById(id);

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