import "reflect-metadata";
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { User } from './users/user.entity';
import { Task } from './tasks/task.entity';
import {AuthModule} from "./auth/auth.module";
import {ConfigModule} from "@nestjs/config";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'POSTGRES_USERNAME',
      password: 'YOUR_PASSWORD',
      database: 'task_manager',
      entities: [User, Task],
      synchronize: true, // 🔥 Auto-create tables based on entities
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    TasksModule,
      AuthModule,
  ],
})
export class AppModule {}
