import { ApiProperty } from "@nestjs/swagger";
import { CreateUserDto } from "./createUser.dto";
import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsString, MinLength } from "class-validator";

export class UpdateUserDto extends PartialType(CreateUserDto) {
	@ApiProperty({
		description: 'The name of the user',
		example: 'John Doe',
		required: false,
	})
	@IsString()
	@MinLength(3)
	name?: String;

	@ApiProperty({
		description: 'The email of the user',
		example: 'john.doe@example.com',
		required: false,
	})
	@IsEmail()
	@MinLength(10)
	email?: String;
}