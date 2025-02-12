import { IsAlpha, IsAlphanumeric, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsAlpha()
  firstName: string;

  @IsAlpha()
  lastName: string;

  @IsNotEmpty()
  @IsAlphanumeric()
  password: string;

  image?: string;

  @IsEmail()
  email: string;
}
