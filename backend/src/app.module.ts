/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */
import { Module }                from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule }        from '@nestjs/mongoose';
import { UsersModule }           from './users/users.module';
import { TasksModule }           from './tasks/tasks.module';
import { AuthModule }            from './auth/auth.module';

@Module({
  imports: [
    // 1) load env + make ConfigService global
    ConfigModule.forRoot({ isGlobal: true }),

    // 2) establish the Mongo connection *before* any forFeature()
    MongooseModule.forRootAsync({
      imports:    [ConfigModule],
      inject:     [ConfigService],
      useFactory: (cs: ConfigService) => {
        const uri = cs.get<string>('MONGODB_URI');
        if (!uri) {
          throw new Error('MONGODB_URI must be defined');
        }
        console.log('🔌 Connecting to MongoDB at', uri);
        return { uri };
      },
    }),

    // 3) now your feature modules can safely call forFeature()
    UsersModule,
    TasksModule,
    AuthModule,
  ],
})
export class AppModule {}