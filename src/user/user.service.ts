import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './model/User.model';
import { LoggerService } from './user.logger';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';

@Injectable()
export class UserService {
	constructor(private readonly loggerService: LoggerService) { }

	private users: User[] = [
		{ id: 1, name: "John Doe", email: "john@example.com" },
		{ id: 2, name: "Jesus", email: "jesus@example.com" }
	]

	findAllUsers(name: String = ''): User[] {
		this.loggerService.log(`Find All Users ${name}`)
		return this.users.filter((user) =>
			user.name.toLowerCase().includes(name.toLocaleLowerCase())
		);
	}

	findUserById(id: Number): User {
		this.loggerService.log(`Find User ById ${id}`)
		const user = this.users.find((user) => user.id == id) ?? null

		if (!user) {
			throw new NotFoundException('User not found')
		}

		return user
	}

	createUser(dto: CreateUserDto): User {
		this.loggerService.log(`Create User ${dto}`)
		const newUser: User = { id: this.users.length + 1, ...dto }
		this.users.push(newUser)

		return newUser
	}

	updateUser(id: Number, dto: UpdateUserDto): User {
		this.loggerService.log(`Update User ${id} body => ${dto}`)
		const userIndex = this.users.findIndex((item) => item.id === id);
		if (userIndex === -1) {
			throw new NotFoundException(`El usuario con ID ${id} no existe`);
		}
		const userUpdated = this.users[userIndex] = { ...this.users[userIndex], ...dto }

		if (!userUpdated) throw new NotFoundException('User not found')
		return userUpdated
	}

	deleteUser(id: Number): User {
		const userIndex = this.users.findIndex((item) => item.id === id);
		if (userIndex === -1) {
			throw new NotFoundException(`El usuario con ID ${id} no existe`);
		}

		const [deleted] = this.users.slice(userIndex, 1);

		if (!deleted) throw new NotFoundException('User not found')

		return deleted
	}
}
