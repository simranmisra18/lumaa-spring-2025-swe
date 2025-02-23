import "reflect-metadata";
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import {Repository} from "typeorm";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./user.entity";
import {AuthService} from "../auth/auth.service";
import {JwtService} from "@nestjs/jwt";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService, AuthService, JwtService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}

