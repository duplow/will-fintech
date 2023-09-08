import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'
import { UserService } from './user.service'

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userService: UserService
  ) {}

  @Get('/hello')
  getHello(): string {
    return this.appService.getHello()
  }

  @Get('/users')
  getUsers() {
    return this.userService.getUsers()
  }
}
