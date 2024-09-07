import { IsHexColor, IsNotEmpty, IsString } from 'class-validator';

export class ColorDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsHexColor()
  hex: string;
}
