import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  public async getUserByUserId(uid: number) {
    const user = await this.prisma.user.findUnique({
      where: { uid },
    });

    return user;
  }

  public async getUserByEmail(email: string) {
    return this.prisma.user.findFirst({
      where: { email },
    });
  }

  public async createUser({ name, email, password }: CreateUserDto) {
    const checkExistsEmail = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (checkExistsEmail) {
      throw new BadRequestException('email already exists');
    }

    const createUser = await this.prisma.user.create({
      data: { name, email, password },
    });

    return createUser;
  }

  public async updateUser(
    { name, email, password }: UpdateUserDto,
    uid: number,
  ) {
    const updateUserInfo = await this.prisma.user.update({
      where: {
        uid,
      },
      data: { name, email, password },
    });

    return updateUserInfo;
  }

  public async deleteUser(uid: number) {
    const deletedUser = await this.prisma.user.delete({
      where: { uid },
    });

    return deletedUser;
  }
}
