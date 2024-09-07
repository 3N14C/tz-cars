import { Controller, Delete, Get, Param, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('get-all')
  async getAll() {
    return this.usersService.getAll();
  }

  @Get('get-by-id/:id')
  async getById(@Param('id') id: string) {
    return this.usersService.getById(id);
  }

  @Get('get-by-email/:email')
  async getByEmail(@Param('email') email: string) {
    return this.usersService.getByEmail(email);
  }

  @UseGuards(AuthGuard())
  @Get('get-profile')
  async getProfile(@Req() req) {
    const { user } = req;
    return this.usersService.getProfile(user.userId);
  }

  @Delete('remove-by-id/:id')
  async removeUserById(@Param('id') id: string) {
    return this.usersService.removeUserById(id);
  }
}
