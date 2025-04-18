/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
// import { Task } from 'src/tasks/entities/task.entity';
import { Task } from '../../tasks/schemas/task.schema';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  name: string;

  @Prop({required : true})
  password: string;

  @Prop({type: [{ type: Types.ObjectId, ref: Task.name }] })
    tasks: Types.Array<Task>;
}
export const UserSchema = SchemaFactory.createForClass(User);
// UserSchema.pre<User>('save', function (next) {
//     if (this.password){
//         this.password = hashSync(this.password, 10);
//     }
// }