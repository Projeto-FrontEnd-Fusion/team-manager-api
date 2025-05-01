import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateUserDto {
  @ApiProperty({ example: 'jhondoe@email.com' })
  @IsString()
  email: string;

  @ApiProperty({ example: 'Jhon' })
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'Doe' })
  @IsString()
  lastName: string;

  @ApiProperty({ example: '********' })
  @IsString()
  password: string;

  @ApiProperty({ example: '10/10/2002' })
  @IsString()
  birthDate: string;
}