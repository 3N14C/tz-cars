import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ColorDto } from './dto/color.dto';

@Injectable()
export class ColorsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: ColorDto) {
    const existsColor = await this.prisma.color.findUnique({
      where: {
        name: dto.name,
      },
    });

    if (existsColor) throw new HttpException('Color already exists', 400);

    const color = this.prisma.color.create({
      data: dto,
    });

    return color;
  }

  async getAll() {
    const colors = await this.prisma.color.findMany({
      include: {
        cars: true,
      },
    });

    return colors;
  }

  async getById(id: string) {
    const color = await this.prisma.color.findUnique({
      where: {
        id,
      },
    });

    if (!color) throw new HttpException('Color not found', 404);

    return color;
  }

  async removeById(id: string) {
    const existsColor = await this.getById(id);
    const color = await this.prisma.color.delete({
      where: {
        id: existsColor.id,
      },
    });

    return { color, message: 'Color deleted' };
  }

  async updateById(id: string, dto: ColorDto) {
    const existsColor = await this.getById(id);

    const color = await this.prisma.color.update({
      where: {
        id: existsColor.id,
      },

      data: dto,
    });

    return { color, message: 'Color updated' };
  }
}
