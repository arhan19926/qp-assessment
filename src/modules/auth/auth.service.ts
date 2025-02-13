import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'src/modules/users/dto/createUser.dto';
import { UsersService } from 'src/modules/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { config } from 'dotenv';
config();
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}

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

  async getToken(email: string, password: string) {
    try {
      console.log(`Inside AuthService method getToken`);
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

      const token = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      };

      const jwt = this.jwtService.signAsync(token, {
        secret: process.env.JWT_SECRET,
      });

      return jwt;
    } catch (error) {
      console.log(
        `Error Occurred in Service method getToken:${error?.message || 'unknown'}`,
      );
      throw error;
    }
  }

  async processSignIn(email: string, password: string) {
    try {
      console.log(`Inside AuthService method processSignIn`);
      const userToken = await this.getToken(email, password);

      return userToken;
    } catch (error) {
      console.log(
        `Error Occurred in Service method processSignIn:${error?.message || 'unknown'}`,
      );
      throw error;
    }
  }

  async validate(token: string) {
    try {
      console.log(`Inside AuthService method validate`);
      const userToken = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      return userToken;
    } catch (error) {
      console.log(
        `Error Occurred in Service method validate:${error?.message || 'unknown'}`,
      );
      throw error;
    }
  }
}
