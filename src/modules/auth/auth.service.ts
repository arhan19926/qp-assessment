import { Injectable } from '@nestjs/common';
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
}
