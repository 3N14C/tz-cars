import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AuthDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async signUp(dto: AuthDto) {
    const existsUser = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (existsUser) throw new HttpException('User already exists', 400);

    const user = await this.prisma.user.create({
      data: dto,
    });

    const token = this.jwtService.sign(user);

    return { user, token };
  }

  async signIn(dto: AuthDto) {
    const existsUser = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
        password: dto.password,
      },
    });

    if (!existsUser) throw new HttpException('Wrong email or password', 400);

    const token = this.jwtService.sign(existsUser);

    return { existsUser, token };
  }
}
