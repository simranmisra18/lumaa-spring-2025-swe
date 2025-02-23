import "reflect-metadata";
import {Controller, Post, Body, UnauthorizedException, BadRequestException} from '@nestjs/common';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth/auth.service';

@Controller('auth')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
        private readonly authService: AuthService,
    ) {}

    @Post('register')
    async register(@Body() body: { username: string; password: string; confirmPassword: string }) {
        // Validate password confirmation
        if (body.password !== body.confirmPassword) {
            throw new BadRequestException('Passwords do not match');
        }
        const hashedPassword = await bcrypt.hash(body.password, 10);
        return this.usersService.create(body.username, hashedPassword);
    }

    @Post('login')
    async login(@Body() body: { username: string; password: string }) {
        const user = await this.usersService.findByUsername(body.username);
        if (!user || !(await bcrypt.compare(body.password, user.password))) {
            throw new UnauthorizedException('Invalid credentials');
        }

        return this.authService.login(user);
    }
}
