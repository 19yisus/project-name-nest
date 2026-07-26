import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @MinLength(3)
  name!: String;
  @ApiProperty()
  @IsEmail()
  @MinLength(10)
  email!: String
}