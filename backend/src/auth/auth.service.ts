import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;
    const existingUser = await this.usersService.getUserByEmail(email);

    if (existingUser) {
      throw new ConflictException('user already exists');
    }

    const hashedPassword = await hash(password, 10);
    const user = await this.usersService.createUser({
      ...createUserDto,
      password: hashedPassword,
    });

    return user;
  }

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;
    const user = await this.usersService.getUserByEmail(email);

    if (!user?.password) {
      throw new NotFoundException('wrong password');
    }

    const passwordMatches = await compare(password, user.password);

    if (!passwordMatches) {
      throw new BadRequestException('not matched password');
    }

    return user;
  }

  generateAccessToken(userId: number) {
    const payload = { id: userId };
    return this.jwtService.sign(payload);
  }
}
