/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from './schemas/task.schema';
import{ AuthModule } from '../auth/auth.module';
import { User, UserSchema } from '../users/schemas/user.schema'; // Import User schema

@Module({
  imports: [
    // only one TasksModule—no duplicates!
    MongooseModule.forFeature(
      [{ name: Task.name, schema: TaskSchema },
        { name: User.name, schema: UserSchema },
      ]),
    AuthModule,  
  ],
  controllers: [TasksController],
  providers: [TasksService],
  exports: [TasksService], // Export TasksService to be used in other modules
})
export class TasksModule {}
