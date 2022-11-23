import { Bind, Body, Controller, Get, Param, Post } from '@nestjs/common';

import { AppService } from './app.service';
import { User, UserLoginData } from './post-models/user.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('allUsers')
  getAllUsers() {
    return this.appService.getAllUsers();
  }

  @Get('userByEmail/:email')
  getUserByEmail(@Param('email') email: string) {
    const result = this.appService.getUserByEmail(email);
    return result;
  }

  @Post('createUser')
  createNewUser(@Body() createUser: User) {
    const result = this.appService.createNewUser(createUser).then((res) => {
      return 'create a new user ' + res.Name;
    });
    return result;
  }

  @Post('authUser')
  verifyAccount(@Body() loginData: UserLoginData) {
    const result = this.appService.verifyAccount(loginData);
    return result;
  }

  @Get('allThemes')
  getAllThemes() {
    const result = this.appService.getAllAppThemes();
    return result;
  }

  @Get('themeById/:id')
  getThemeById(@Param('id') id: number) {
    console.log(id)
    const result = this.appService.getAppThemeById(id);
    return result;
  }
}
