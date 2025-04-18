/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async create(createUserDto: CreateUserDto) {
    const hash = await bcrypt.hash(createUserDto.password, 10);
    const newUser = new this.userModel({
      ...createUserDto,
      password: hash,
    });
    return newUser.save();
  }
  findByEmail(email: string) {
    return this.userModel.findOne({ email }).exec();

  }

  findAll() {
    return this.userModel.find().exec();
  }
  findById(id: string) {
    return this.userModel.findById(id).exec();
  }

  update(id: string, updateUserDto: UpdateUserDto) {
  const user = this.userModel.findByIdAndUpdate(id,updateUserDto).exec();
  if (!user) {
    throw new Error('User not found');
  }
  return user;
  }

  remove(id: string) {
    const user = this.userModel.findByIdAndDelete(id).exec();
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }
}
