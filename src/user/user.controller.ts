import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { User } from './model/User.model';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) { }

	@Get()
	@ApiOperation({ summary: 'Get all users' })
	@ApiResponse({
		status: 200,
		description: 'Return all users.',
		schema: {
			example: {
				"statusCode": 200,
				"message": "Success",
				"result": [
					{
						"id": 1,
						"name": "John Doe",
						"email": "john.doe@example.com"
					}
				]
			}
		}
	})
	getUsers(@Query('name') name: String = ''): Array<User> {
		return this.userService.findAllUsers(name)
	}

	@Get(':id')
	@ApiOperation({ summary: 'Get a user by id' })
	@ApiResponse({
		status: 200,
		description: 'Return a single user.',
		schema: {
			example: {
				"statusCode": 200,
				"message": "Success",
				"result": {
					"id": 1,
					"name": "John Doe",
					"email": "john.doe@example.com"
				}
			}
		}
	})
	@ApiResponse({ status: 404, description: 'User not found.' })
	getUserById(@Param('id', ParseIntPipe) id: Number): User | null {
		return this.userService.findUserById(id);
	}

	@Post()
	@ApiOperation({ summary: 'Create a new user' })
	@ApiResponse({
		status: 201,
		description: 'The user has been successfully created.',
		schema: {
			example: {
				"statusCode": 201,
				"message": "Success",
				"result": {
					"id": 2,
					"name": "Jane Doe",
					"email": "jane.doe@example.com"
				}
			}
		}
	})
	@ApiResponse({ status: 400, description: 'Bad Request.' })
	createUser(@Body() body: CreateUserDto): User | null {
		return this.userService.createUser(body)
	}

	@Put(':id')
	@ApiOperation({ summary: 'Update a user' })
	@ApiResponse({
		status: 200,
		description: 'The user has been successfully updated.',
		schema: {
			example: {
				"statusCode": 200,
				"message": "Success",
				"result": {
					"id": 1,
					"name": "Johnathan Doe",
					"email": "john.doe.updated@example.com"
				}
			}
		}
	})
	@ApiResponse({ status: 404, description: 'User not found.' })
	updateUser(@Param('id', ParseIntPipe) id: Number, @Body() body: UpdateUserDto): User | null {
		return this.userService.updateUser(id, body)
	}

	@Delete(':id')
	@ApiOperation({ summary: 'Delete a user' })
	@ApiResponse({
		status: 200,
		description: 'The user has been successfully deleted.',
		schema: {
			example: {
				"statusCode": 200,
				"message": "Success",
				"result": {
					"id": 1,
					"name": "John Doe",
					"email": "john.doe@example.com"
				}
			}
		}
	})
	@ApiResponse({ status: 404, description: 'User not found.' })
	deleteUser(@Param('id', ParseIntPipe) id: Number): User | null {
		return this.userService.deleteUser(id)
	}
}