import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { CarDto } from './dto/car.dto';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/roles/roles.decorator';
import { RoleGuard } from 'src/auth/role/role.guard';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Roles('ADMIN')
  @UseGuards(AuthGuard(), RoleGuard)
  @Post('create')
  @UseInterceptors(FileInterceptor('img'))
  async create(@UploadedFile() file, @Body() dto: CarDto) {
    return this.carsService.create(dto, file);
  }

  @Get('get-all')
  async getAll(@Req() req) {
    const { orderType, orderBy } = req.query;
    const { colorId, brandId } = req.query;
    const { offset, limit } = req.query;
    return this.carsService.getAll(
      orderType,
      orderBy,
      { limit, offset },
      { colorId, brandId },
    );
  }

  @Get('get-by-id/:id')
  async getById(@Param('id') id: string) {
    return this.carsService.getById(id);
  }

  @Delete('remove-by-id/:id')
  async removeById(@Param('id') id: string) {
    return this.carsService.removeById(id);
  }
}
