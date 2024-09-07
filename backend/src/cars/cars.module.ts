import { Module } from '@nestjs/common';
import { FileService } from 'src/file/file.service';
import { PrismaService } from 'src/prisma.service';
import { CarsController } from './cars.controller';
import { CarsService } from './cars.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [CarsController],
  providers: [CarsService, PrismaService, FileService],
})
export class CarsModule {}
