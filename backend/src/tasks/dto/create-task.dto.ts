/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */
// import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsString, IsBoolean,IsOptional,IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
export class CreateTaskDto {
    @ApiProperty({ description: 'The title of the task', example: 'Buy groceries' })
    @IsString()
    title: string;
  
    @ApiProperty({ description: 'Detailed description', example: 'Milk, bread, eggs' })
    @IsString()
    description: string;
  
    @ApiProperty({ description: 'Due date of the task', example: '2023-10-01T12:00:00Z' })
    @IsDate()
    @Type(() => Date)
    dueDate: Date;

    @ApiProperty({
      description: 'Whether the task is completed',
      example: false,
      required: false,
      default: false,
    })
    @IsOptional()
    @Type(() => Boolean)
    @IsBoolean()
    completed = false;
  }