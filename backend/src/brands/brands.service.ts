import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { BrandDto } from './dto/brand.dto';

@Injectable()
export class BrandsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: BrandDto) {
    const existsBrand = await this.prisma.brand.findUnique({
      where: {
        name: dto.name,
      },
    });

    if (existsBrand) throw new HttpException('Brand already exists', 400);

    const brand = await this.prisma.brand.create({
      data: dto,
    });

    return brand;
  }

  async getAll() {
    const brands = await this.prisma.brand.findMany({
      include: {
        cars: true,
      },
    });

    if (!brands) throw new HttpException('Brands not found', 404);

    return brands
  }

  async getById(id: string) {
    const brand = await this.prisma.brand.findUnique({
      where: {
        id,
      },

      include: {
        cars: true,
      },
    });

    if (!brand) throw new HttpException('Brand not found', 404);

    return brand;
  }

  async removeById(id: string) {
    const existsBrand = await this.getById(id);

    const brand = await this.prisma.brand.delete({
      where: {
        id: existsBrand.id,
      },
    });

    return { brand, message: 'Brand deleted' };
  }
}
