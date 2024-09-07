import {
  IsEmpty,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';
import { MotorEnum } from '../enums/motor.enum';
import { TransmissionEnum } from '../enums/transmission.enum';

export class CarDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumberString()
  price: number;

  @IsNotEmpty()
  @IsString()
  year: string;

  @IsNotEmpty()
  @IsEnum(MotorEnum)
  motor: MotorEnum;

  @IsOptional()
  @IsEnum(TransmissionEnum)
  transmission: TransmissionEnum;

  @IsOptional()
  @IsString()
  reserve: string;

  @IsNotEmpty()
  @IsString()
  brandId: string;

  @IsNotEmpty()
  @IsString()
  colorId: string;
}
