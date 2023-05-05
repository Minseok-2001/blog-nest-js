import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  public findUserByUserId(@Param() id: number) {
    console.log(id);
    return this.usersService.getUserByUserId(id);
  }

  @Post()
  public createUser(@Body() dto: CreateUserDto) {
    return this.usersService.createUser(dto);
  }

  @Put()
  public updateUser(@Body() dto: UpdateUserDto) {
    return this.usersService.updateUser(dto);
  }

  @Delete()
  public deleteUser(@Query() id: number) {
    return this.usersService.deleteUser(id);
  }
}
