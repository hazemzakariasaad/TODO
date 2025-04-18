/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

import { UsersService } from '../users/users.service';
import { User } from '../users/schemas/user.schema';
export interface AuthPayload {
  userId:   string
  email:    string
}
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly usersService: UsersService,    // ← inject UsersService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET!,
    });
  }

  async validate(payload: any): Promise<AuthPayload> {
    const user = await this.usersService.findByEmail(payload.email);
    if (!user) {
      // will be turned into a 401 by Nest
      throw new UnauthorizedException('Invalid token or user does not exist');
    }
    const { password, ...result } = user.toObject();
    return{
        userId: user._id.toString(), // Include the _id field in the returned object
        email:  user.email,

    }; 
  }
}
