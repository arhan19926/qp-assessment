import {
  Body,
  Controller,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/modules/users/dto/createUser.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signUp')
  async signUp(@Body() createUserDto: CreateUserDto) {
    try {
      console.log(`Received Request for User Sign Up`);
      const result = await this.authService.processSignUp(createUserDto);
      return result;
    } catch (error) {
      console.log(
        `Error Occurred in Controller method signUp:${error?.message || 'unknown'}`,
      );
      throw new InternalServerErrorException(
        error?.message || 'Unkown error Occured',
      );
    }
  }
}
