import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { BrandsService } from './brands.service';
import { BrandDto } from './dto/brand.dto';

@Controller('brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @Post('create')
  async create(@Body() dto: BrandDto) {
    return this.brandsService.create(dto);
  }

  @Get('get-all')
  async getAll() {
    return this.brandsService.getAll();
  }

  @Get('get-by-id/:id')
  async getById(@Param('id') id: string) {
    return this.brandsService.getById(id);
  }

  @Delete('remove-by-id/:id')
  async removeById(@Param('id') id: string) {
    return this.brandsService.removeById(id);
  }
}
