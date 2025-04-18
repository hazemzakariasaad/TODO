/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
// import { User } from '../../users/schemas/user.schema';

export type TaskDocument = Task & Document;
@Schema({ timestamps: true })
export class Task {
    @Prop({ required: true })
    title?: string;
    
    @Prop({ required: true })
    description?: string;
    
    @Prop({ default: false })
    completed?: boolean;

    @Prop( {type: Date})
    Duedate? : Date;
    
    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    user!: Types.ObjectId;
    
    }
export const TaskSchema = SchemaFactory.createForClass(Task);
// TaskSchema.pre<Task>('save', function (next) {