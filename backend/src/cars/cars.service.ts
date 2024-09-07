import { HttpException, Injectable } from '@nestjs/common';
import { FileService } from 'src/file/file.service';
import { PrismaService } from 'src/prisma.service';
import { CarDto } from './dto/car.dto';
import { Prisma } from '@prisma/client';
import { MotorEnum } from './enums/motor.enum';
import { IFilter } from './interfaces/filter.interface';
import { IPagination } from './interfaces/pagination.interface';

@Injectable()
export class CarsService {
  constructor(
    private prisma: PrismaService,
    private fileService: FileService,
  ) {}

  async create(dto: CarDto, file: Express.Multer.File) {
    const existsCar = await this.prisma.car.findUnique({
      where: {
        name: dto.name,
      },
    });

    if (existsCar) throw new HttpException('Car already exists', 400);

    const img = this.fileService.uploadFile(file);

    const car = await this.prisma.car.create({
      data: {
        ...dto,
        transmission:
          dto.motor === MotorEnum.ELECTRIC ? null : dto.transmission,
        reserve: dto.motor === MotorEnum.ELECTRIC ? dto.reserve : null,
        img,
        price: +dto.price,
      },
    });

    return car;
  }

  async getAll(
    orderType: string,
    orderBy: string,
    pagination: IPagination,
    filters?: IFilter,
  ) {
    const whereInput: Prisma.CarWhereInput = {
      color: {
        is: {
          id: {
            in: filters?.colorId?.map((id) => id),
          },
        },
      },

      brand: {
        is: {
          id: {
            in: filters?.brandId?.map((id) => id),
          },
        },
      },
    };

    const cars = await this.prisma.car.findMany({
      include: {
        brand: true,
        color: true,
      },
      orderBy: {
        [orderBy]: orderType,
      },
      where: whereInput ?? undefined,
      skip: +pagination.offset,
      take: +pagination.limit,
    });

    if (!cars) throw new HttpException('Cars not found', 404);

    return cars;
  }

  async getById(id: string) {
    const car = await this.prisma.car.findUnique({
      where: {
        id,
      },

      include: {
        brand: true,
        color: true,
      },
    });

    if (!car) throw new HttpException('Car not found', 404);

    return car;
  }

  async removeById(id: string) {
    const existsCar = await this.getById(id);

    const car = await this.prisma.car.delete({
      where: {
        id: existsCar.id,
      },
    });

    return { car, message: 'Car deleted' };
  }
}
