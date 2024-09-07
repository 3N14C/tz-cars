import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    const users = await this.prisma.user.findMany();

    return users;
  }

  async getById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) throw new HttpException('User not found', 404);

    return user;
  }

  async getByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) throw new HttpException('User not found', 404);

    return user;
  }

  async removeUserById(id: string) {
    const existsUser = await this.getById(id);

    const user = await this.prisma.user.delete({
      where: {
        id: existsUser.id,
      },
    });

    return { user, message: 'User deleted' };
  }

  async getProfile(id: string) {
    const existsUser = await this.getById(id);

    return existsUser;
  }
}
