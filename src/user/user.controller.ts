import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { get } from 'http';
import path from 'path';
import { NotFoundError } from 'rxjs';

class UserDataModel {
	constructor(
		public id: Number,
		public name: String
	) { }
}

class CreateUserDto {
	name!: String;
}

class UpdateUserDto {
	name?: String;
}

let database: Array<UserDataModel> = [
	new UserDataModel(1, "Jhon Doe"),
	new UserDataModel(2, "Jesus Morales")
];

@Controller('user')
export class UserController {
	@Get()
	getUsers(): Array<UserDataModel> {
		return database
	}

	@Get(':id')
	getUserById(@Param('id', ParseIntPipe) id: Number) {
		return database.find((item) => item.id == id);
	}

	@Post()
	createUser(@Body() body: CreateUserDto) {
		const newUser: UserDataModel = new UserDataModel(database.length + 1, body.name);

		database.push(newUser);
		return newUser
	}

	@Put(':id')
	updateUser(@Param('id', ParseIntPipe) id: Number, @Body() body: UpdateUserDto) {
		const userIndex = database.findIndex((item) => item.id === id);
		if (userIndex === -1) {
			throw new NotFoundException(`El usuario con ID ${id} no existe`);
		}

		if (body.name) {
			database[userIndex].name = body.name;
		}
		return database[userIndex];
	}

	@Delete(':id')
	deleteUser(@Param('id', ParseIntPipe) id: Number){
    const userIndex = database.findIndex((item) => item.id === id);
    if (userIndex === -1) {
      throw new NotFoundException(`El usuario con ID ${id} no existe`);
    }

    const deletedUser = database[userIndex];
    database.splice(userIndex, 1);
    return {
      message: `Usuario con ID ${id} eliminado correctamente`,
      user: deletedUser,
    };
	}
}