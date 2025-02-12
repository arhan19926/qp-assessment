import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'src/modules/users/dto/createUser.dto';
import { UsersService } from 'src/modules/users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  async processSignUp(payload: CreateUserDto) {
    try {
      console.log(`Inside AuthService method processSignUp`);
      const result = this.userService.processAddUser(payload);
      return result;
    } catch (error) {
      console.log(
        `Error Occurred in Service method processCreateItem:${error?.message || 'unknown'}`,
      );
      throw error;
    }
  }

  async validateUser(email: string, password: string) {
    try {
      const user =
        await this.userService.processGetUserForAuthentication(email);

      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const isPasswordValid = password === user.password;
      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid credentials');
      }
      delete user.password;
      return user;
    } catch (error) {
      console.log(
        `Error Occurred in Service method processCreateItem:${error?.message || 'unknown'}`,
      );
      throw error;
    }
  }
}
//add global auth guard ,add RBAC ,Add order API in which multiple items can be clubbed,containerize with docker
