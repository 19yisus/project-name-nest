import { IsString, IsEmail, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(3)
  name!: String;
  @IsEmail()
  @MinLength(10)
  email!: String
}