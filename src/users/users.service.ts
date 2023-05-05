import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  public async getUserByUserId(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    return user;
  }

  public async createUser({ name, email, password }: CreateUserDto) {
    const createUser = await this.prisma.user.create({
      data: { name, email, password },
    });

    return createUser;
  }

  public async updateUser({ id, name, email, password }: UpdateUserDto) {
    const updateUserInfo = await this.prisma.user.update({
      where: {
        id,
      },
      data: { name, email, password },
    });

    return updateUserInfo;
  }

  public async deleteUser(id: number) {
    const deletedUser = await this.prisma.user.delete({
      where: { id },
    });

    return deletedUser;
  }
}
