import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class AuthDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;
}
