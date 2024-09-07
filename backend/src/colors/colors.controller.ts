import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ColorsService } from './colors.service';
import { ColorDto } from './dto/color.dto';

@Controller('colors')
export class ColorsController {
  constructor(private readonly colorsService: ColorsService) {}

  @Post('create')
  async create(@Body() dto: ColorDto) {
    return this.colorsService.create(dto);
  }

  @Get('get-all')
  async getAll() {
    return this.colorsService.getAll();
  }

  @Get('get-by-id/:id')
  async getById(@Param('id') id: string) {
    return this.colorsService.getById(id);
  }

  @Delete('remove-by-id/:id')
  async removeById(@Param('id') id: string) {
    return this.colorsService.removeById(id);
  }

  @Patch('update-by-id/:id')
  async updateById(@Param('id') id: string, @Body() dto: ColorDto) {
    return this.colorsService.updateById(id, dto);
  }
}
