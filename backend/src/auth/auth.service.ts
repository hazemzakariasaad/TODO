/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}
  
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const userObj = user.toObject(); // ✅ convert from Mongoose Document to plain object
      const { password, ...safeUser } = userObj;
      return safeUser;
    }
    return null;
  }
  
  async login(user: any) {
    const payload = { email: user.email, userId: user._id };
    const accessToken = this.jwtService.sign(payload);
    console.log('payload payload:', payload); // Log the access token for debugging
    console.log('Access Token:', accessToken); // Log the access token for debugging
    console.log('User:', user); // Log the user object for debugging
    return {
      message: 'Login successful',
      user: {
        name: user.name,
        email: user.email,
      },
      access_token: accessToken,
    };
  }
  async register(createAuthDto: CreateUserDto) {
    try {
      const user = await this.usersService.create(createAuthDto);
      return {
        message: 'User created successfully',
        user: {
          name: user.name,
          email: user.email,
        },
      };
    } catch (error) {
      if (error.code === 11000) {
        // 11000 is MongoDB Duplicate Key error
        throw new ConflictException('Email already exists');
      }
      throw error; // rethrow other errors
    }
  }
}
