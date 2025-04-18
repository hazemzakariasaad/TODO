/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException,BadRequestException, ConflictException, InternalServerErrorException} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { isValidObjectId } from 'mongoose';
import { Task, TaskDocument } from './schemas/task.schema';
import { User } from '../users/schemas/user.schema';
import { UsersService } from '../users/users.service';
import { UserDocument } from '../users/schemas/user.schema';
import { userInfo } from 'os';
@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel:Model<Task>,
  @InjectModel(User.name) private userModel: Model<UserDocument>,) {}
  async create(createTaskDto: CreateTaskDto, userId: string) {
    const newTask = new this.taskModel({ ...createTaskDto, user: userId });
  
    try {
      const user = await this.userModel.findById(userId).exec();
      if (!user) {
        throw new NotFoundException(`User with ID ${userId} not found`);
      }
  
      // Save the task first so it gets a valid ObjectId
      const savedTask = await newTask.save();
  
      // Add the task to the user's task array and save the user
      user.tasks.push(savedTask._id);
      await user.save(); // ✅ now this updates the user in the DB
  
      return savedTask;
    } catch (error: any) {
      console.error('❌ Task creation failed:', error);
      if (error.code === 11000) {
        throw new ConflictException(`Task with this title already exists`);
      }
      throw new InternalServerErrorException(`Failed to create task`);
    }
  }
  
  async findAll(userId: string) {
    return this.taskModel.find({user:userId}).exec();
  }

  async findOne(id: string, userId: string): Promise<Task> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException(`"${id}" is not a valid task ID`);
    }
    const task = await this.taskModel.findOne({_id:id, user:userId}).exec();
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto, userId: string): Promise<Task> {
    const task = await this.taskModel.findOneAndUpdate({ _id: id, user: userId }, updateTaskDto, { new: true }).exec();
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  async remove(id: string , userId: string) {
    const task = await this.taskModel.findOne({ _id: id, user: userId }).exec();
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    await task.deleteOne();
    return task;
  }
}
