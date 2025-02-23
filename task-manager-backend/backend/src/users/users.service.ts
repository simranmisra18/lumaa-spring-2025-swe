import "reflect-metadata";
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
    ) {}

    async create(username: string, password: string): Promise<User> {
        const user = this.usersRepository.create({ username, password });
        return this.usersRepository.save(user);
    }

    async findByUsername(username: string): Promise<User | null> {
        return this.usersRepository.findOne({ where: { username } });
    }
}
