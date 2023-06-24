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
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({
    summary: '유저 정보 조회',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get()
  public getUserByUserId(@CurrentUser() { uid }: CurrentUserDto) {
    return this.usersService.getUserByUserId(uid);
  }

  @ApiOperation({
    summary: '유저 정보 수정',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Put()
  public updateUser(
    @CurrentUser() { uid }: CurrentUserDto,
    @Body() dto: UpdateUserDto,
  ) {
    return this.usersService.updateUser(dto, uid);
  }

  @ApiOperation({
    summary: '유저 delete',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Delete()
  public deleteUser(@CurrentUser() { uid }: CurrentUserDto) {
    return this.usersService.deleteUser(uid);
  }
}
