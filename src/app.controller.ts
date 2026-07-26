import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) { }

	@Get()
	@ApiOperation({ summary: 'Initial endpoint' })
	@ApiResponse({
		status: 200,
		description: 'Returns hello world',
		schema: {
			example: {
				"message": "Hello World"
			}
		}
	})
	getHello(): string {
		return this.appService.getHello();
	}
}
