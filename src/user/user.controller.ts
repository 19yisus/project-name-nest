import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { User } from './model/User.model';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) { }

	@Get()
	getUsers(@Query('name') name: String = ''): Array<User> {
		return this.userService.findAllUsers(name)
	}

	@Get(':id')
	getUserById(@Param('id', ParseIntPipe) id: Number): User | null {
		return this.userService.findUserById(id);
	}

	@Post()
	createUser(@Body() body: CreateUserDto): User | null {
		return this.userService.createUser(body)
	}

	@Put(':id')
	updateUser(@Param('id', ParseIntPipe) id: Number, @Body() body: UpdateUserDto): User | null {
		return this.userService.updateUser(id, body)
	}

	@Delete(':id')
	deleteUser(@Param('id', ParseIntPipe) id: Number): User | null {
		return this.userService.deleteUser(id)
	}
}