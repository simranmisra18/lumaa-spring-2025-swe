import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import {ConfigService} from "@nestjs/config";

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
        private configService: ConfigService,
    ) {
    }

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findByUsername(username);
        if (user && (await bcrypt.compare(pass, user.password))) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = { username: user.username, sub: user.id };
        const secret = this.configService.get<string>('JWT_SECRET');
        return {
            access_token: this.jwtService.sign(payload, {
                secret: secret,
            }),
        };
    }
}

