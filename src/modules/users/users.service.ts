import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/modules/users/dto/createUser.dto';
import { User } from 'src/modules/users/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async processGetUsers() {
    try {
      console.log(`Inside User Service Method processGetUsers`);
      const users = this.userRepository.find();
      return users;
    } catch (error) {
      console.log(
        `Error Occurred in Service method processGetUsers:${error?.message || 'unknown'}`,
      );
      throw new InternalServerErrorException(
        error?.message || 'Unkown error Occured',
      );
    }
  }

  async processAddUser(payload: CreateUserDto) {
    try {
      console.log(`Inside User Service Method processAddUser`);
      const user = this.userRepository.create(payload);
      return await this.userRepository.save(user);
    } catch (error) {
      console.log(
        `Error Occurred in Service method processAddUser:${error?.message || 'unknown'}`,
      );
      throw new InternalServerErrorException(
        error?.message || 'Unkown error Occured',
      );
    }
  }
}
