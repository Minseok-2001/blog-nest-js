import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;
    const existingUser = await this.usersService.findUserByEmail(email);
    if (existingUser) {
      return null;
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
    const user = await this.usersService.findUserByEmail(email);
    if (!user?.password) {
      return null;
    }
    const passwordMatches = compare(password, user.password);
    if (!passwordMatches) {
      return null;
    }
    return user;
  }

  generateToken(userId: number) {
    const payload = { id: userId };
    return this.jwtService.sign(payload);
  }
}
