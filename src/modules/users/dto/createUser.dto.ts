import {
  IsAlpha,
  IsAlphanumeric,
  IsEmail,
  IsEnum,
  IsNotEmpty,
} from 'class-validator';
import { ROLE } from 'src/modules/users/users.entity';

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

  @IsEnum(ROLE)
  role: string = ROLE.USER;
}
