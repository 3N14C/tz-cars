import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import { AuthModule } from './auth/auth.module';
import { BrandsModule } from './brands/brands.module';
import { CarsModule } from './cars/cars.module';
import { ColorsModule } from './colors/colors.module';
import { FileModule } from './file/file.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, '..', 'uploads'),
      serveRoot: '/api/uploads',
    }),
    AuthModule,
    UsersModule,
    ColorsModule,
    BrandsModule,
    CarsModule,
    FileModule,
  ],
  providers: [],
})
export class AppModule {}
