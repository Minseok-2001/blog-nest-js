import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/common/guard/auth.guard';
import { CurrentUser } from 'src/common/decorator/current-user.decorator';
import { CurrentUserDto } from './dto/current-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard)
  @Get()
  public getUserByUserId(@CurrentUser() { id }: CurrentUserDto) {
    return this.usersService.getUserByUserId(id);
  }

  @Post()
  public createUser(@Body() dto: CreateUserDto) {
    return this.usersService.createUser(dto);
  }

  @Put()
  public updateUser(
    @CurrentUser() { id }: CurrentUserDto,
    @Body() dto: UpdateUserDto,
  ) {
    return this.usersService.updateUser(dto, id);
  }

  @Delete()
  public deleteUser(@CurrentUser() { id }: CurrentUserDto) {
    return this.usersService.deleteUser(id);
  }
}
