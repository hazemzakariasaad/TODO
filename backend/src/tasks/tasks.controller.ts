/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards,Request } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('tasks')
@ApiBearerAuth('jwt') 
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto ,@Request() req: any) {
    return this.tasksService.create(createTaskDto,req.user.userId);
  }

  @Get()
  findAll(@Request() req: any) {
    return this.tasksService.findAll(req.user.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string , @Request() req: any) {
    return this.tasksService.findOne(id , req.user.userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto, @Request() req: any) {
    return this.tasksService.update(id, updateTaskDto ,req.user.userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string , @Request() req: any) {
    return this.tasksService.remove(id , req.user.userId);
  }
}
