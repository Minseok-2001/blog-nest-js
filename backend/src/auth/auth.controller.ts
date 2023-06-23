import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const user = await this.authService.register(createUserDto);

    if (!user) {
      throw new UnauthorizedException();
    }

    const token = this.authService.generateToken(user.uid);

    return { token };
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    const user = await this.authService.login(loginUserDto);

    if (!user) {
      throw new NotFoundException('user not found');
    }

    const token = await this.authService.generateToken(user.uid);

    return { token };
  }
}
