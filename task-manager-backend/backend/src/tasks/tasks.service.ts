import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task)
        private readonly tasksRepository: Repository<Task>,
    ) {}

    async getTasks(userId: number): Promise<Task[]> {
        return this.tasksRepository.find({ where: { userId } });
    }

    async createTask(title: string, description: string, userId: number): Promise<Task> {
        const newTask = this.tasksRepository.create({ title, description, userId, isComplete: false });
        return this.tasksRepository.save(newTask);
    }

    async updateTask(id: number, userId: number, title?: string, description?: string, isComplete?: boolean): Promise<Task> {
        const task = await this.tasksRepository.findOne({ where: { id, userId } });

        if (!task) {
            throw new NotFoundException(`Task with ID ${id} not found or does not belong to the user`);
        }

        if (title !== undefined) task.title = title;
        if (description !== undefined) task.description = description;
        if (isComplete !== undefined) task.isComplete = isComplete;

        return this.tasksRepository.save(task);
    }

    async deleteTask(id: number, userId: number): Promise<void> {
        const task = await this.tasksRepository.findOne({ where: { id, userId } });

        if (!task) {
            throw new NotFoundException(`Task with ID ${id} not found or does not belong to the user`);
        }

        await this.tasksRepository.delete({ id, userId });
    }
}
