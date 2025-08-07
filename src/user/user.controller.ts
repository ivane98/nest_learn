import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/guards/auth.guard';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { User } from '@prisma/client';
import { Role, Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles/roles.guard';
import { UserDto } from './dto/user.dto';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @Get('me')
  getUser(@GetUser() user: User) {
    return user;
  }

  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @Put(':id')
  updateUser(@Param('id', ParseIntPipe) id: number, @Body() userDto: UserDto) {
    return this.userService.updateUser(id, userDto);
  }
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.deleteUser(id);
  }
}
